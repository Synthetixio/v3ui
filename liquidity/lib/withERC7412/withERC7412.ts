/* eslint-disable no-console */
import { BigNumber, ethers, providers } from 'ethers';
import { EvmPriceServiceConnection } from '@pythnetwork/pyth-evm-js';
import { z } from 'zod';
import { ZodBigNumber } from '@snx-v3/zod';
import { offchainMainnetEndpoint, offchainTestnetEndpoint } from '@snx-v3/constants';
import { deploymentsWithERC7412, Network } from '@snx-v3/useBlockchain';
import type { Modify } from '@snx-v3/tsHelpers';
import { importCoreProxy, importMulticall3, importAllErrors } from '@snx-v3/contracts';
import { withMemoryCache } from './withMemoryCache';
import * as viem from 'viem';
import { parseTxError } from '../parser';

export const ERC7412_ABI = [
  'error OracleDataRequired(address oracleContract, bytes oracleQuery)',
  'error FeeRequired(uint feeAmount)',
  'function oracleId() view external returns (bytes32)',
  'function fulfillOracleQuery(bytes calldata signedOffchainData) payable external',
];

export const PYTH_ERRORS = [
  // Function arguments are invalid (e.g., the arguments lengths mismatch)
  // Signature: 0xa9cb9e0d
  'error InvalidArgument()',
  // Update data is coming from an invalid data source.
  // Signature: 0xe60dce71
  'error InvalidUpdateDataSource()',
  // Update data is invalid (e.g., deserialization error)
  // Signature: 0xe69ffece
  'error InvalidUpdateData()',
  // Insufficient fee is paid to the method.
  // Signature: 0x025dbdd4
  'error InsufficientFee()',
  // There is no fresh update, whereas expected fresh updates.
  // Signature: 0xde2c57fa
  'error NoFreshUpdate()',
  // There is no price feed found within the given range or it does not exists.
  // Signature: 0x45805f5d
  'error PriceFeedNotFoundWithinRange()',
  // Price feed not found or it is not pushed on-chain yet.
  // Signature: 0x14aebe68
  'error PriceFeedNotFound()',
  // Requested price is stale.
  // Signature: 0x19abf40e
  'error StalePrice()',
  // Given message is not a valid Wormhole VAA.
  // Signature: 0x2acbe915
  'error InvalidWormholeVaa()',
  // Governance message is invalid (e.g., deserialization error).
  // Signature: 0x97363b35
  'error InvalidGovernanceMessage()',
  // Governance message is not for this contract.
  // Signature: 0x63daeb77
  'error InvalidGovernanceTarget()',
  // Governance message is coming from an invalid data source.
  // Signature: 0x360f2d87
  'error InvalidGovernanceDataSource()',
  // Governance message is old.
  // Signature: 0x88d1b847
  'error OldGovernanceMessage()',
  // The wormhole address to set in SetWormholeAddress governance is invalid.
  // Signature: 0x13d3ed82
  'error InvalidWormholeAddressToSet()',
];

export type TransactionRequest = ethers.providers.TransactionRequest & {
  requireSuccess?: boolean;
};
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
      requireSuccess: call.requireSuccess ?? true,
      allowFailure: !(call.requireSuccess ?? true),
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

const parseError = async (error: any, provider: providers.JsonRpcProvider, network: Network) => {
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
      console.log('Error data: ', errorData);
    }
  }

  if (`${errorData}`.startsWith('0x08c379a0')) {
    const content = `0x${errorData.substring(10)}`;
    // reason: string; for standard revert error string
    const reason = ethers.utils.defaultAbiCoder.decode(['string'], content);
    console.log(`Reason`, reason);
    return {
      name: reason[0],
      args: [],
    };
  }

  try {
    const AllErrors = await importAllErrors(network.id, network.preset);
    const AllErrorsInterface = new ethers.utils.Interface([...AllErrors.abi, ...PYTH_ERRORS]);
    const decodedError = AllErrorsInterface.parseError(errorData);
    return decodedError;
    // return ERC7412ErrorSchema.parse(decodedError);
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
    case 'sepolia':
      return '0x7b79995e5f793a07bc00c21412e50ecae098e7f9';
    case 'arbitrum':
      return '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1';
    case 'arbitrum-sepolia':
      return '0x980B62Da83eFf3D4576C647993b0c1D7faf17c73';
    case 'optimism-mainnet':
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
  _from?: string
): Promise<TransactionRequestWithGasLimit> => {
  const initialMulticallLength = Array.isArray(tx) ? tx.length : 1;

  const from = ([tx].flat()[0].from || _from) as string;
  // eslint-disable-next-line prefer-const
  let multicallCalls = [...[tx].flat()].map((tx) => ({ from, ...tx })); // Use let to communicate that we mutate this array

  if (multicallCalls.some((x) => !x.to)) {
    throw Error(`Make sure all txs have 'to' field set`);
  }
  if (multicallCalls.some((x) => !x.from)) {
    throw Error(`Make sure all txs have 'from' field set`);
  }

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
      if (window.localStorage.getItem('DEBUG') === 'true') {
        const CoryProxyInfo = await importCoreProxy(network.id, network.preset);
        const CoreProxyInterface = new ethers.utils.Interface(CoryProxyInfo.abi);
        console.log(
          `withERC7412`,
          multicallCalls.map(({ data, value, ...rest }) => {
            try {
              // @ts-ignore
              const { name, args } = CoreProxyInterface.parseTransaction({ data, value });
              if (Object.keys(args).filter(([key]) => `${key}` !== `${parseInt(key)}`).length > 0) {
                const namedArgs = Object.fromEntries(
                  Object.entries(args).filter(([key]) => `${key}` !== `${parseInt(key)}`)
                );
                return { $: name, ...namedArgs };
              }

              const unnamedArgs = Object.entries(args)
                .filter(([key]) => `${key}` === `${parseInt(key)}`)
                .map(([, value]) => value);
              return { $: name, ...unnamedArgs };
            } catch {
              return { $: 'unknown', data, value, ...rest };
            }
          })
        );
      }

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
      console.error(error);
      const parsedError = await parseError(error, jsonRpcProvider, network);
      if (window.localStorage.getItem('DEBUG') === 'true') {
        console.error('withERC7412', parsedError);
      }
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

        if (parsedError) {
          const AllErrors = await importAllErrors(network.id, network.preset);
          try {
            const errorResult = viem.decodeErrorResult({
              abi: [...AllErrors.abi, ...PYTH_ERRORS],
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

  if (newCall.to?.toLowerCase() === multicallAddress.toLowerCase()) {
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
