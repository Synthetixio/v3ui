// !!! DO NOT EDIT !!! Automatically generated file

export const address = '0xAE788aaf52780741E12BF79Ad684B91Bb0EF4D92';
export const abi = [
  'function aggregate(tuple(address target, bytes callData)[] calls) payable returns (uint256 blockNumber, bytes[] returnData)',
  'function aggregate3(tuple(address target, bool allowFailure, bytes callData)[] calls) payable returns (tuple(bool success, bytes returnData)[] returnData)',
  'function aggregate3Value(tuple(address target, bool allowFailure, uint256 value, bytes callData)[] calls) payable returns (tuple(bool success, bytes returnData)[] returnData)',
  'function blockAndAggregate(tuple(address target, bytes callData)[] calls) payable returns (uint256 blockNumber, bytes32 blockHash, tuple(bool success, bytes returnData)[] returnData)',
  'function getBasefee() view returns (uint256 basefee)',
  'function getBlockHash(uint256 blockNumber) view returns (bytes32 blockHash)',
  'function getBlockNumber() view returns (uint256 blockNumber)',
  'function getChainId() view returns (uint256 chainid)',
  'function getCurrentBlockCoinbase() view returns (address coinbase)',
  'function getCurrentBlockDifficulty() view returns (uint256 difficulty)',
  'function getCurrentBlockGasLimit() view returns (uint256 gaslimit)',
  'function getCurrentBlockTimestamp() view returns (uint256 timestamp)',
  'function getEthBalance(address addr) view returns (uint256 balance)',
  'function getLastBlockHash() view returns (bytes32 blockHash)',
  'function tryAggregate(bool requireSuccess, tuple(address target, bytes callData)[] calls) payable returns (tuple(bool success, bytes returnData)[] returnData)',
  'function tryBlockAndAggregate(bool requireSuccess, tuple(address target, bytes callData)[] calls) payable returns (uint256 blockNumber, bytes32 blockHash, tuple(bool success, bytes returnData)[] returnData)',
];
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from 'ethers';
import type { FunctionFragment, Result } from '@ethersproject/abi';
import type { Listener, Provider } from '@ethersproject/providers';
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from './common';

export interface Multicall3Interface extends utils.Interface {
  functions: {
    'aggregate((address,bytes)[])': FunctionFragment;
    'aggregate3((address,bool,bytes)[])': FunctionFragment;
    'aggregate3Value((address,bool,uint256,bytes)[])': FunctionFragment;
    'blockAndAggregate((address,bytes)[])': FunctionFragment;
    'getBasefee()': FunctionFragment;
    'getBlockHash(uint256)': FunctionFragment;
    'getBlockNumber()': FunctionFragment;
    'getChainId()': FunctionFragment;
    'getCurrentBlockCoinbase()': FunctionFragment;
    'getCurrentBlockDifficulty()': FunctionFragment;
    'getCurrentBlockGasLimit()': FunctionFragment;
    'getCurrentBlockTimestamp()': FunctionFragment;
    'getEthBalance(address)': FunctionFragment;
    'getLastBlockHash()': FunctionFragment;
    'tryAggregate(bool,(address,bytes)[])': FunctionFragment;
    'tryBlockAndAggregate(bool,(address,bytes)[])': FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | 'aggregate'
      | 'aggregate3'
      | 'aggregate3Value'
      | 'blockAndAggregate'
      | 'getBasefee'
      | 'getBlockHash'
      | 'getBlockNumber'
      | 'getChainId'
      | 'getCurrentBlockCoinbase'
      | 'getCurrentBlockDifficulty'
      | 'getCurrentBlockGasLimit'
      | 'getCurrentBlockTimestamp'
      | 'getEthBalance'
      | 'getLastBlockHash'
      | 'tryAggregate'
      | 'tryBlockAndAggregate'
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: 'aggregate',
    values: [{ target: string; callData: BytesLike }[]]
  ): string;
  encodeFunctionData(
    functionFragment: 'aggregate3',
    values: [{ target: string; allowFailure: boolean; callData: BytesLike }[]]
  ): string;
  encodeFunctionData(
    functionFragment: 'aggregate3Value',
    values: [{ target: string; allowFailure: boolean; value: BigNumberish; callData: BytesLike }[]]
  ): string;
  encodeFunctionData(
    functionFragment: 'blockAndAggregate',
    values: [{ target: string; callData: BytesLike }[]]
  ): string;
  encodeFunctionData(functionFragment: 'getBasefee', values?: undefined): string;
  encodeFunctionData(functionFragment: 'getBlockHash', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'getBlockNumber', values?: undefined): string;
  encodeFunctionData(functionFragment: 'getChainId', values?: undefined): string;
  encodeFunctionData(functionFragment: 'getCurrentBlockCoinbase', values?: undefined): string;
  encodeFunctionData(functionFragment: 'getCurrentBlockDifficulty', values?: undefined): string;
  encodeFunctionData(functionFragment: 'getCurrentBlockGasLimit', values?: undefined): string;
  encodeFunctionData(functionFragment: 'getCurrentBlockTimestamp', values?: undefined): string;
  encodeFunctionData(functionFragment: 'getEthBalance', values: [string]): string;
  encodeFunctionData(functionFragment: 'getLastBlockHash', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'tryAggregate',
    values: [boolean, { target: string; callData: BytesLike }[]]
  ): string;
  encodeFunctionData(
    functionFragment: 'tryBlockAndAggregate',
    values: [boolean, { target: string; callData: BytesLike }[]]
  ): string;

  decodeFunctionResult(functionFragment: 'aggregate', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'aggregate3', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'aggregate3Value', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'blockAndAggregate', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getBasefee', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getBlockHash', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getBlockNumber', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getChainId', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getCurrentBlockCoinbase', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getCurrentBlockDifficulty', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getCurrentBlockGasLimit', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getCurrentBlockTimestamp', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getEthBalance', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getLastBlockHash', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'tryAggregate', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'tryBlockAndAggregate', data: BytesLike): Result;

  events: {};
}

export interface Multicall3 extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: Multicall3Interface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    aggregate(
      calls: { target: string; callData: BytesLike }[],
      overrides?: PayableOverrides & { from?: string }
    ): Promise<ContractTransaction>;

    aggregate3(
      calls: { target: string; allowFailure: boolean; callData: BytesLike }[],
      overrides?: PayableOverrides & { from?: string }
    ): Promise<ContractTransaction>;

    aggregate3Value(
      calls: { target: string; allowFailure: boolean; value: BigNumberish; callData: BytesLike }[],
      overrides?: PayableOverrides & { from?: string }
    ): Promise<ContractTransaction>;

    blockAndAggregate(
      calls: { target: string; callData: BytesLike }[],
      overrides?: PayableOverrides & { from?: string }
    ): Promise<ContractTransaction>;

    getBasefee(overrides?: CallOverrides): Promise<[BigNumber] & { basefee: BigNumber }>;

    getBlockHash(
      blockNumber: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string] & { blockHash: string }>;

    getBlockNumber(overrides?: CallOverrides): Promise<[BigNumber] & { blockNumber: BigNumber }>;

    getChainId(overrides?: CallOverrides): Promise<[BigNumber] & { chainid: BigNumber }>;

    getCurrentBlockCoinbase(overrides?: CallOverrides): Promise<[string] & { coinbase: string }>;

    getCurrentBlockDifficulty(
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { difficulty: BigNumber }>;

    getCurrentBlockGasLimit(
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { gaslimit: BigNumber }>;

    getCurrentBlockTimestamp(
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { timestamp: BigNumber }>;

    getEthBalance(
      addr: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { balance: BigNumber }>;

    getLastBlockHash(overrides?: CallOverrides): Promise<[string] & { blockHash: string }>;

    tryAggregate(
      requireSuccess: boolean,
      calls: { target: string; callData: BytesLike }[],
      overrides?: PayableOverrides & { from?: string }
    ): Promise<ContractTransaction>;

    tryBlockAndAggregate(
      requireSuccess: boolean,
      calls: { target: string; callData: BytesLike }[],
      overrides?: PayableOverrides & { from?: string }
    ): Promise<ContractTransaction>;
  };

  aggregate(
    calls: { target: string; callData: BytesLike }[],
    overrides?: PayableOverrides & { from?: string }
  ): Promise<ContractTransaction>;

  aggregate3(
    calls: { target: string; allowFailure: boolean; callData: BytesLike }[],
    overrides?: PayableOverrides & { from?: string }
  ): Promise<ContractTransaction>;

  aggregate3Value(
    calls: { target: string; allowFailure: boolean; value: BigNumberish; callData: BytesLike }[],
    overrides?: PayableOverrides & { from?: string }
  ): Promise<ContractTransaction>;

  blockAndAggregate(
    calls: { target: string; callData: BytesLike }[],
    overrides?: PayableOverrides & { from?: string }
  ): Promise<ContractTransaction>;

  getBasefee(overrides?: CallOverrides): Promise<BigNumber>;

  getBlockHash(blockNumber: BigNumberish, overrides?: CallOverrides): Promise<string>;

  getBlockNumber(overrides?: CallOverrides): Promise<BigNumber>;

  getChainId(overrides?: CallOverrides): Promise<BigNumber>;

  getCurrentBlockCoinbase(overrides?: CallOverrides): Promise<string>;

  getCurrentBlockDifficulty(overrides?: CallOverrides): Promise<BigNumber>;

  getCurrentBlockGasLimit(overrides?: CallOverrides): Promise<BigNumber>;

  getCurrentBlockTimestamp(overrides?: CallOverrides): Promise<BigNumber>;

  getEthBalance(addr: string, overrides?: CallOverrides): Promise<BigNumber>;

  getLastBlockHash(overrides?: CallOverrides): Promise<string>;

  tryAggregate(
    requireSuccess: boolean,
    calls: { target: string; callData: BytesLike }[],
    overrides?: PayableOverrides & { from?: string }
  ): Promise<ContractTransaction>;

  tryBlockAndAggregate(
    requireSuccess: boolean,
    calls: { target: string; callData: BytesLike }[],
    overrides?: PayableOverrides & { from?: string }
  ): Promise<ContractTransaction>;

  callStatic: {
    aggregate(
      calls: { target: string; callData: BytesLike }[],
      overrides?: CallOverrides
    ): Promise<[BigNumber, string[]] & { blockNumber: BigNumber; returnData: string[] }>;

    aggregate3(
      calls: { target: string; allowFailure: boolean; callData: BytesLike }[],
      overrides?: CallOverrides
    ): Promise<[boolean, string] & { success: boolean; returnData: string }[]>;

    aggregate3Value(
      calls: { target: string; allowFailure: boolean; value: BigNumberish; callData: BytesLike }[],
      overrides?: CallOverrides
    ): Promise<[boolean, string] & { success: boolean; returnData: string }[]>;

    blockAndAggregate(
      calls: { target: string; callData: BytesLike }[],
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, string, [boolean, string] & { success: boolean; returnData: string }[]] & {
        blockNumber: BigNumber;
        blockHash: string;
        returnData: [boolean, string] & { success: boolean; returnData: string }[];
      }
    >;

    getBasefee(overrides?: CallOverrides): Promise<BigNumber>;

    getBlockHash(blockNumber: BigNumberish, overrides?: CallOverrides): Promise<string>;

    getBlockNumber(overrides?: CallOverrides): Promise<BigNumber>;

    getChainId(overrides?: CallOverrides): Promise<BigNumber>;

    getCurrentBlockCoinbase(overrides?: CallOverrides): Promise<string>;

    getCurrentBlockDifficulty(overrides?: CallOverrides): Promise<BigNumber>;

    getCurrentBlockGasLimit(overrides?: CallOverrides): Promise<BigNumber>;

    getCurrentBlockTimestamp(overrides?: CallOverrides): Promise<BigNumber>;

    getEthBalance(addr: string, overrides?: CallOverrides): Promise<BigNumber>;

    getLastBlockHash(overrides?: CallOverrides): Promise<string>;

    tryAggregate(
      requireSuccess: boolean,
      calls: { target: string; callData: BytesLike }[],
      overrides?: CallOverrides
    ): Promise<[boolean, string] & { success: boolean; returnData: string }[]>;

    tryBlockAndAggregate(
      requireSuccess: boolean,
      calls: { target: string; callData: BytesLike }[],
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, string, [boolean, string] & { success: boolean; returnData: string }[]] & {
        blockNumber: BigNumber;
        blockHash: string;
        returnData: [boolean, string] & { success: boolean; returnData: string }[];
      }
    >;
  };

  filters: {};

  estimateGas: {
    aggregate(
      calls: { target: string; callData: BytesLike }[],
      overrides?: PayableOverrides & { from?: string }
    ): Promise<BigNumber>;

    aggregate3(
      calls: { target: string; allowFailure: boolean; callData: BytesLike }[],
      overrides?: PayableOverrides & { from?: string }
    ): Promise<BigNumber>;

    aggregate3Value(
      calls: { target: string; allowFailure: boolean; value: BigNumberish; callData: BytesLike }[],
      overrides?: PayableOverrides & { from?: string }
    ): Promise<BigNumber>;

    blockAndAggregate(
      calls: { target: string; callData: BytesLike }[],
      overrides?: PayableOverrides & { from?: string }
    ): Promise<BigNumber>;

    getBasefee(overrides?: CallOverrides): Promise<BigNumber>;

    getBlockHash(blockNumber: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    getBlockNumber(overrides?: CallOverrides): Promise<BigNumber>;

    getChainId(overrides?: CallOverrides): Promise<BigNumber>;

    getCurrentBlockCoinbase(overrides?: CallOverrides): Promise<BigNumber>;

    getCurrentBlockDifficulty(overrides?: CallOverrides): Promise<BigNumber>;

    getCurrentBlockGasLimit(overrides?: CallOverrides): Promise<BigNumber>;

    getCurrentBlockTimestamp(overrides?: CallOverrides): Promise<BigNumber>;

    getEthBalance(addr: string, overrides?: CallOverrides): Promise<BigNumber>;

    getLastBlockHash(overrides?: CallOverrides): Promise<BigNumber>;

    tryAggregate(
      requireSuccess: boolean,
      calls: { target: string; callData: BytesLike }[],
      overrides?: PayableOverrides & { from?: string }
    ): Promise<BigNumber>;

    tryBlockAndAggregate(
      requireSuccess: boolean,
      calls: { target: string; callData: BytesLike }[],
      overrides?: PayableOverrides & { from?: string }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    aggregate(
      calls: { target: string; callData: BytesLike }[],
      overrides?: PayableOverrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    aggregate3(
      calls: { target: string; allowFailure: boolean; callData: BytesLike }[],
      overrides?: PayableOverrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    aggregate3Value(
      calls: { target: string; allowFailure: boolean; value: BigNumberish; callData: BytesLike }[],
      overrides?: PayableOverrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    blockAndAggregate(
      calls: { target: string; callData: BytesLike }[],
      overrides?: PayableOverrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    getBasefee(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getBlockHash(
      blockNumber: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getBlockNumber(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getChainId(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getCurrentBlockCoinbase(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getCurrentBlockDifficulty(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getCurrentBlockGasLimit(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getCurrentBlockTimestamp(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getEthBalance(addr: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getLastBlockHash(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    tryAggregate(
      requireSuccess: boolean,
      calls: { target: string; callData: BytesLike }[],
      overrides?: PayableOverrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    tryBlockAndAggregate(
      requireSuccess: boolean,
      calls: { target: string; callData: BytesLike }[],
      overrides?: PayableOverrides & { from?: string }
    ): Promise<PopulatedTransaction>;
  };
}
