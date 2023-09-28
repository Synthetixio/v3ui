import { BigNumber, ethers } from 'ethers';
import { EvmPriceServiceConnection } from '@pythnetwork/pyth-evm-js';
import { z } from 'zod';
import { ZodBigNumber } from '@snx-v3/zod';
import {
  multiCallAbi,
  multiCallAddress,
  offchainMainnetEndpoint,
  offchainTestnetEndpoint,
} from '@snx-v3/constants';
import { NETWORKS } from '@snx-v3/useBlockchain';
import type { Modify } from '@snx-v3/tsHelpers';

export const ERC7412_ABI = [
  'error OracleDataRequired(address oracleContract, bytes oracleQuery)',
  'error FeeRequired(uint feeAmount)',
  'function oracleId() view external returns (bytes32)',
  'function fulfillOracleQuery(bytes calldata signedOffchainData) payable external',
];

type TransactionRequest = ethers.providers.TransactionRequest;
type TransactionRequestWithGasLimit = Modify<TransactionRequest, { gasLimit: ethers.BigNumber }>;

const fetchOffchainData = async (oracleQuery: string, isTestnet = false) => {
  const priceService = new EvmPriceServiceConnection(
    isTestnet ? offchainTestnetEndpoint : offchainMainnetEndpoint
  );
  const OracleQuerySchema = z.tuple([z.number(), ZodBigNumber, z.array(z.string())]);
  const decoded = ethers.utils.defaultAbiCoder.decode(
    ['uint8', 'uint64', 'bytes32[]'],
    oracleQuery
  );
  const [updateType, stalenessTolerance, priceIds] = OracleQuerySchema.parse(decoded);

  if (updateType !== 1) {
    throw new Error(`update type ${updateType} not supported`);
  }
  const signedOffchainData = await priceService.getPriceFeedsUpdateData(priceIds);

  return ethers.utils.defaultAbiCoder.encode(
    ['uint8', 'uint64', 'bytes32[]', 'bytes[]'],
    [updateType, stalenessTolerance, priceIds, signedOffchainData]
  );
};

function makeMulticall(calls: TransactionRequest[], senderAddr: string): TransactionRequest {
  const encodedData = multicallInterface.encodeFunctionData('aggregate3Value', [
    calls.map((call) => ({
      target: call.to,
      callData: call.data,
      value: call.value || ethers.BigNumber.from(0),
      allowFailure: false,
    })),
  ]);

  let totalValue = ethers.BigNumber.from(0);
  for (const call of calls) {
    totalValue = totalValue.add(call.value || ethers.BigNumber.from(0));
  }

  return {
    from: senderAddr,
    to: multiCallAddress,
    data: encodedData,
    value: totalValue,
  };
}

const ERC7412ErrorSchema = z.union([
  z.object({
    name: z.literal('OracleDataRequired'),
    args: z.tuple([z.string(), z.string()]),
  }),
  z.object({
    name: z.literal('FeeRequired'),
    args: z.tuple([ZodBigNumber]),
  }),
]);
const erc7412Interface = new ethers.utils.Interface(ERC7412_ABI);

const parseError = (error: any) => {
  const errorData = error.data || error.error.data.data;

  try {
    const decodedError = erc7412Interface.parseError(errorData);
    return ERC7412ErrorSchema.parse(decodedError);
  } catch (parseError) {
    console.error(
      'Error is not a ERC7412 error, re-throwing original error, for better parsing. Parse error reason: ',
      parseError
    );
    // If we cant parse it, throw the original error
    throw error;
  }
};

// simulate w/ wETH contract because it will have eth balance
// This is useful when we do read/static calls but still need an balance for the price update
// TODO: this probably need to be network aware, maybe look into a different solution even.
const getDefaultFromAddress = () => '0x4200000000000000000000000000000000000006';

/**
 * If a tx requires ERC7412 pattern, wrap your tx with this function.
 */
export const withERC7412 = async (
  provider: ethers.providers.Provider,
  tx: TransactionRequest | TransactionRequest[],
  isTestnet?: boolean,
  logLabel?: string
): Promise<TransactionRequestWithGasLimit> => {
  console.log('withERC7412');
  if (!logLabel) {
    console.trace('who called');
  }
  const initialMulticallLength = Array.isArray(tx) ? tx.length : 1;
  // eslint-disable-next-line prefer-const
  let multicallCalls = [tx].flat(); // Use let to communicate that we mutate this array

  if (multicallCalls.some((x) => !x.to)) {
    throw Error(`Make sure all txs have 'to' field set`);
  }
  if (multicallCalls.some((x) => !x.from)) {
    throw Error(`Make sure all txs have 'from' field set`);
  }
  const from = multicallCalls[0].from as string;

  while (true) {
    console.log(logLabel, ': while loop iteration');

    try {
      if (isTestnet === undefined) {
        const network = await provider.getNetwork();
        isTestnet = Object.values(NETWORKS).find((x) => x.id === network.chainId)?.isTestnet;
      }
      if (multicallCalls.length == 1) {
        const initialCall = multicallCalls[0];
        // The normal flow would go in here, then if the estimate call fail, we catch the error and handle ERC7412
        const gasLimit = await provider.estimateGas(initialCall);

        return { ...initialCall, gasLimit };
      }
      // If we're here it means we now added a tx to do .
      const multicallTxn = makeMulticall(multicallCalls, from);
      const gasLimit = await provider.estimateGas(multicallTxn);
      return { ...multicallTxn, gasLimit };
    } catch (error: any) {
      const parsedError = parseError(error);

      if (parsedError.name === 'OracleDataRequired') {
        const [oracleAddress, oracleQuery] = parsedError.args;

        const signedRequiredData = await fetchOffchainData(oracleQuery, isTestnet);
        const newTransactionRequest = {
          from,
          to: oracleAddress,
          data: new ethers.utils.Interface(ERC7412_ABI).encodeFunctionData('fulfillOracleQuery', [
            signedRequiredData,
          ]),
          // If from is set to the default address we can add a value directly, before getting FeeRequired revert.
          // This will be a static call so no money would be withdrawn either way.
          value:
            from === getDefaultFromAddress() ? ethers.utils.parseEther('0.1') : BigNumber.from(0),
        };

        // If we get OracleDataRequired, add an extra transaction request just before the last element
        multicallCalls.splice(
          multicallCalls.length - initialMulticallLength,
          0,
          newTransactionRequest
        );
      } else if (parsedError.name === 'FeeRequired') {
        const requiredFee = parsedError.args[0];
        const txToUpdate = multicallCalls[multicallCalls.length - initialMulticallLength - 1];
        txToUpdate.value = txToUpdate.value ? requiredFee.add(txToUpdate.value) : requiredFee;
      } else {
        throw error;
      }
    }
  }
};
export const multicallInterface = new ethers.utils.Interface(multiCallAbi);

/**
 * This can be used to do reads plus decoding. The return type will be whatever the type of the decode function is. And the arguments passed will have the multicall decoded and price updates removed
 */
export async function erc7412Call<T>(
  provider: ethers.providers.Provider,
  txRequests: TransactionRequest | TransactionRequest[],
  decode: (x: string[] | string) => T,
  logLabel?: string
) {
  const reqs = [txRequests].flat();
  for (const txRequest of reqs) {
    txRequest.from = txRequest.from || getDefaultFromAddress();
  }

  const newCall = await withERC7412(provider, reqs, true, logLabel);

  const res = await provider.call(newCall);

  if (newCall.to === multiCallAddress) {
    // If this was a multicall, deode and remove price updates.
    // Since nesting multicalls dont work, we can assume that txRequests would have a non multicall call "to", if no price update was needed
    const decodedMultiCall: { returnData: string }[] = multicallInterface.decodeFunctionResult(
      'aggregate3Value',
      res
    )[0];

    // Now we wanna remove the price updates
    const startIndex = decodedMultiCall.length - reqs.length;
    return decode(decodedMultiCall.slice(startIndex).map((x) => x.returnData));
  }

  return decode(res);
}
