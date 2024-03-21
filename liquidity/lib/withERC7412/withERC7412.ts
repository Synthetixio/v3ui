/* eslint-disable no-console */
import { BigNumber, ethers, providers } from 'ethers';
import { EvmPriceServiceConnection } from '@pythnetwork/pyth-evm-js';
import { z } from 'zod';
import { ZodBigNumber } from '@snx-v3/zod';
import { offchainMainnetEndpoint, offchainTestnetEndpoint } from '@snx-v3/constants';
import { deploymentsWithERC7412, Network } from '@snx-v3/useBlockchain';
import type { Modify } from '@snx-v3/tsHelpers';
import { importCoreProxy, importMulticall3 } from '@synthetixio/v3-contracts';
import { withMemoryCache } from './withMemoryCache';
import * as viem from 'viem';
import { parseTxError } from '../parser';

export const ERC7412_ABI = [
  'error OracleDataRequired(address oracleContract, bytes oracleQuery)',
  'error FeeRequired(uint feeAmount)',
  'function oracleId() view external returns (bytes32)',
  'function fulfillOracleQuery(bytes calldata signedOffchainData) payable external',
];

type TransactionRequest = ethers.providers.TransactionRequest;
type TransactionRequestWithGasLimit = Modify<TransactionRequest, { gasLimit: ethers.BigNumber }>;

const PRICE_CACHE_LENGTH = 5000;

const fetchOffchainData = withMemoryCache(
  async (oracleQuery: string, isTestnet: boolean, logLabel: string) => {
    const priceService = new EvmPriceServiceConnection(
      isTestnet ? offchainTestnetEndpoint : offchainMainnetEndpoint
    );
    const OracleQuerySchema = z.tuple([z.number(), ZodBigNumber, z.array(z.string())]);
    const decoded = ethers.utils.defaultAbiCoder.decode(
      ['uint8', 'uint64', 'bytes32[]'],
      oracleQuery
    );
    const [updateType, stalenessTolerance, priceIds] = OracleQuerySchema.parse(decoded);
    console.log(`[${logLabel}] stale price for priceFeedId: ${priceIds[0]}`);
    if (updateType !== 1) {
      throw new Error(`update type ${updateType} not supported`);
    }
    const signedOffchainData = await priceService.getPriceFeedsUpdateData(priceIds);

    return ethers.utils.defaultAbiCoder.encode(
      ['uint8', 'uint64', 'bytes32[]', 'bytes[]'],
      [updateType, stalenessTolerance, priceIds, signedOffchainData]
    );
  },
  PRICE_CACHE_LENGTH
);

function makeMulticall(
  calls: TransactionRequest[],
  senderAddr: string,
  multicallAddress: string,
  multiCallAbi: string[]
): TransactionRequest {
  const multicallInterface = new ethers.utils.Interface(multiCallAbi);

  const encodedData = multicallInterface.encodeFunctionData('aggregate3Value', [
    calls.map((call) => ({
      target: call.to,
      callData: call.data,
      value: call.value || ethers.BigNumber.from(0),
      requireSuccess: true,
      allowFailure: false,
    })),
  ]);

  let totalValue = ethers.BigNumber.from(0);
  for (const call of calls) {
    totalValue = totalValue.add(call.value || ethers.BigNumber.from(0));
  }

  return {
    from: senderAddr,
    to: multicallAddress,
    data: encodedData,
    value: totalValue,
  };
}

// This should be used for networks that doesn't have a multicall setup as a trusted forwarder
// TODO remove when all networks have a trusted forwarder
const makeCoreProxyMulticall = (
  calls: TransactionRequest[],
  senderAddr: string,
  coreProxyAddress: string,
  coreProxyAbi: string[]
) => {
  const CoreProxyInterface = new ethers.utils.Interface(coreProxyAbi);
  const encodedData = CoreProxyInterface.encodeFunctionData('multicall', [
    calls.map((call) => call.data),
  ]);

  let totalValue = ethers.BigNumber.from(0);
  for (const call of calls) {
    totalValue = totalValue.add(call.value || ethers.BigNumber.from(0));
  }

  return {
    from: senderAddr,
    to: coreProxyAddress,
    data: encodedData,
    value: totalValue,
  };
};

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

const parseError = async (error: any, provider: providers.JsonRpcProvider) => {
  let errorData = error.data || error.error?.data?.data || error.error?.error?.data;

  if (!errorData) {
    try {
      console.log('Error is missing revert data, trying provider.call, instead of estimate gas..');
      // Some wallets swallows the revert reason when calling estimate gas,try to get the error by using provider.call
      // provider.call wont actually revert, instead the error data is just returned
      const lookedUpError = await provider.call(error.transaction);
      errorData = lookedUpError;
    } catch (newError: any) {
      console.log('provider.call(error.transaction) failed, trying to extract error');
      // I dont think we should end up here.. But it hard to know if some combo of wallets and rpc provider would....
      errorData = error.data || error.error?.data?.data || error.error?.error?.data;
      console.log('Error data: ', errorData);
    }
  }
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
const getDefaultFromAddress = (chainName: string) => {
  switch (chainName) {
    case 'cannon':
      return '0x4200000000000000000000000000000000000006'; // TODO, unclear what to put here
    case 'mainnet':
      return '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';
    case 'goerli':
      return '0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6';
    case 'sepolia':
      return '0x7b79995e5f793a07bc00c21412e50ecae098e7f9';
    case 'arbitrum':
      return '0x82af49447d8a07e3bd95bd0d56f35241523fbab1';
    case 'optimism-mainnet':
    case 'optimism-goerli':
    case 'base-goerli':
    case 'base-sepolia':
    case 'base':
    case 'base-sepolia':
      return '0x4200000000000000000000000000000000000006';

    default:
      throw new Error(`Unsupported chain ${chainName}`);
  }
};

/**
 * If a tx requires ERC7412 pattern, wrap your tx with this function.
 */
export const withERC7412 = async (
  network: Network,
  tx: TransactionRequest | TransactionRequest[],
  logLabel?: string,
  abi?: any
): Promise<TransactionRequestWithGasLimit> => {
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

  // Make sure we're always using JSONRpcProvider, the web3 provider coming from the signer might have bugs causing errors to miss revert data
  const jsonRpcProvider = new ethers.providers.JsonRpcProvider(network?.rpcUrl());

  // If from is set to the default address (wETH) we can assume it's a read rather than a write
  const isRead = from === getDefaultFromAddress(network.name);
  const networkHaveERC7412 = deploymentsWithERC7412.includes(`${network.id}-${network.preset}`);
  const useCoreProxy = !networkHaveERC7412 && !isRead;

  const { address: multicallAddress, abi: multiCallAbi } = useCoreProxy
    ? await importCoreProxy(network.id, network.preset)
    : await importMulticall3(network.id, network.preset);

  while (true) {
    try {
      if (multicallCalls.length == 1) {
        const initialCall = multicallCalls[0];
        // The normal flow would go in here, then if the estimate call fail, we catch the error and handle ERC7412
        const gasLimit = await jsonRpcProvider.estimateGas(initialCall);
        console.log(`Estimated gas succeeded, with no price updates`);
        return { ...initialCall, gasLimit };
      }
      // If we're here it means we now added a tx to do .
      // Some networks doesn't have ERC7412 and a trusted forwarder setup, on write calls we still need to use the coreproxy for those
      const multicallTxn = useCoreProxy
        ? makeCoreProxyMulticall(multicallCalls, from, multicallAddress, multiCallAbi)
        : makeMulticall(multicallCalls, from, multicallAddress, multiCallAbi);

      const gasLimit = await jsonRpcProvider.estimateGas(multicallTxn);

      console.log(
        `[${logLabel}] Estimated gas succeeded, with ${
          multicallCalls.length - initialMulticallLength
        } price updates`
      );

      return { ...multicallTxn, gasLimit };
    } catch (error: any) {
      const parsedError = await parseError(error, jsonRpcProvider);

      if (parsedError.name === 'OracleDataRequired') {
        const [oracleAddress, oracleQuery] = parsedError.args;
        const ignoreCache = !isRead;
        const signedRequiredData = await fetchOffchainData(
          oracleQuery,
          network.isTestnet,
          logLabel || '',
          ignoreCache ? 'no-cache' : undefined
        );
        const newTransactionRequest = {
          from,
          to: oracleAddress,
          data: new ethers.utils.Interface(ERC7412_ABI).encodeFunctionData('fulfillOracleQuery', [
            signedRequiredData,
          ]),
          // If from is set to the default address we can add a value directly, before getting FeeRequired revert.
          // This will be a static call so no money would be withdrawn either way.
          value: isRead ? ethers.utils.parseEther('0.1') : BigNumber.from(0),
        };

        // If we get OracleDataRequired, add an extra transaction request just before the last element
        multicallCalls.splice(
          multicallCalls.length - initialMulticallLength,
          0,
          newTransactionRequest
        );
      } else if (parsedError.name === 'FeeRequired') {
        const requiredFee = parsedError.args[0];

        const txToUpdate = multicallCalls.find(({ value }) => requiredFee.gt(value || 0)); // The first tx with value less than the required fee, is the one we need to update
        if (txToUpdate === undefined) {
          throw Error(
            `Didn't find any tx with a value less than the required fee ${multicallCalls}`
          );
        }
        txToUpdate.value = requiredFee;
      } else {
        const parsedError = parseTxError(error);
        if (parsedError && abi) {
          try {
            const errorResult = viem.decodeErrorResult({
              abi,
              data: parsedError,
            });
            console.log('error: ', errorResult.errorName, errorResult.args);
          } catch (_error) {}
        }
        throw error;
      }
    }
  }
};

/**
 * This can be used to do reads plus decoding. The return type will be whatever the type of the decode function is. And the arguments passed will have the multicall decoded and price updates removed
 */
export async function erc7412Call<T>(
  network: Network,
  provider: ethers.providers.Provider,
  txRequests: TransactionRequest | TransactionRequest[],
  decode: (x: string[] | string) => T,
  logLabel?: string
) {
  const { address: multicallAddress, abi: multicallAbi } = await importMulticall3(
    network.id,
    network.preset
  );

  const reqs = [txRequests].flat();
  for (const txRequest of reqs) {
    txRequest.from = getDefaultFromAddress(network.name); // Reads can always use WETH
  }
  const newCall = await withERC7412(network, reqs, logLabel);

  const res = await provider.call(newCall);

  if (newCall.to === multicallAddress) {
    // If this was a multicall, decode and remove price updates.
    const decodedMultiCall: { returnData: string }[] = new ethers.utils.Interface(
      multicallAbi
    ).decodeFunctionResult('aggregate3Value', res)[0];

    // Remove the price updates
    const responseWithoutPriceUpdates = decodedMultiCall.filter(
      ({ returnData }) => returnData !== '0x' // price updates have 0x as return data
    );
    return decode(responseWithoutPriceUpdates.map(({ returnData }) => returnData));
  }

  return decode(res);
}
