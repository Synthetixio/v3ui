import { Contract } from '@ethersproject/contracts';
import { ethers } from 'ethers';
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

export const ERC7412_ABI = [
  'error OracleDataRequired(address oracleContract, bytes oracleQuery)',
  'error FeeRequired(uint feeAmount)',
  'function oracleId() view external returns (bytes32)',
  'function fulfillOracleQuery(bytes calldata signedOffchainData) payable external',
];

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

function makeMulticall(calls: TransactionRequest[], senderAddr: string) {
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

type TransactionRequest = { to?: string; from?: string; value?: ethers.BigNumber; data?: string };

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
// simulate w/ wETH contract because it will have eth balance
// This is useful when we do read/static calls but still need an balance for the price update
// TODO: this probably need to be network aware, maybe look into a different solution even.
const getDefaultFromAddress = () => '0x4200000000000000000000000000000000000006';

/**
 * If a tx requires ERC7412 pattern, wrap your tx with this function.
 */
export const withERC7412 = async (
  provider: ethers.providers.Provider,
  tx: TransactionRequest,
  isTestnet?: boolean
): Promise<TransactionRequest> => {
  tx.from = tx.from || getDefaultFromAddress();
  if (tx.to === undefined) {
    throw Error('tx missing to or from');
  }
  let multicallCalls: TransactionRequest[] = [tx];
  while (true) {
    try {
      if (isTestnet === undefined) {
        const network = await provider.getNetwork();
        isTestnet = Object.values(NETWORKS).find((x) => x.id === network.chainId)?.isTestnet;
      }
      if (multicallCalls.length == 1) {
        // The normal flow would go in here, then if the estimate call fail, we catch the error and handle ERC7412
        await provider.estimateGas(multicallCalls[0]);

        return multicallCalls[0];
      }
      // If we're here it means we now added a tx to do .
      const multicallTxn = makeMulticall(multicallCalls, tx.from);
      await provider.estimateGas(multicallTxn);
      return multicallTxn;
    } catch (error: any) {
      const errorData = error.data || error.error.data.data;

      const contract = new Contract(tx.to, ERC7412_ABI, provider);
      const parseResult = ERC7412ErrorSchema.safeParse(contract.interface.parseError(errorData));
      if (!parseResult.success) throw error;

      const parsedError = parseResult.data;
      if (parsedError.name === 'OracleDataRequired') {
        const [oracleAddress, oracleQuery] = parsedError.args;

        const signedRequiredData = await fetchOffchainData(oracleQuery, isTestnet);

        const newTransactionRequest = {
          from: tx.from,
          to: oracleAddress,
          data: new ethers.utils.Interface(ERC7412_ABI).encodeFunctionData('fulfillOracleQuery', [
            signedRequiredData,
          ]),
          // If from is set to the default address we can add a value directly, before getting FeeRequired revert.
          // This will be a static call so no money would be withdrawn either way.
          value: tx.from === getDefaultFromAddress() ? ethers.utils.parseEther('0.1') : undefined,
        };
        const lastElementIndex = multicallCalls.length - 1;
        const initialElements = multicallCalls.slice(0, lastElementIndex);
        const lastElement = multicallCalls[lastElementIndex];
        // If we get OracleDataRequired, add an extra transaction request just before the last element
        multicallCalls = [...initialElements, newTransactionRequest, lastElement];
      } else if (parsedError.name === 'FeeRequired') {
        const requiredFee = parsedError.args[0];
        const secondLastIndex = multicallCalls.length - 2;
        // If we got a FeeRequired revert we need to add fee to the fulfillOracleQuery call
        multicallCalls[secondLastIndex].value = requiredFee;
      } else {
        throw error;
      }
    }
  }
};
export const multicallInterface = new ethers.utils.Interface(multiCallAbi);

/**
 * This can be used to to reads plus decoding simple
 */
export async function erc7412Call<T>(
  provider: ethers.providers.Provider,
  txRequest: TransactionRequest,
  decode: (x: string) => T
) {
  const newCall = await withERC7412(provider, txRequest);
  const res = await provider.call(newCall);
  const encoded =
    newCall.to === multiCallAddress
      ? multicallInterface.decodeFunctionResult('aggregate3Value', res)[0].at(-1).returnData // We only return the last call, no need to return the price update calls
      : res;

  return decode(encoded);
}
