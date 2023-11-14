// !!! DO NOT EDIT !!! Automatically generated file

export const address = '0xAE788aaf52780741E12BF79Ad684B91Bb0EF4D92';
export const abi = [
  'error InvalidShortString()',
  'error StringTooLong(string str)',
  'event EIP712DomainChanged()',
  'function aggregate(tuple(address target, bytes callData)[] calls) payable returns (uint256 blockNumber, bytes[] returnData)',
  'function aggregate3(tuple(address target, bool allowFailure, bytes callData)[] calls) payable returns (tuple(bool success, bytes returnData)[] returnData)',
  'function aggregate3Value(tuple(address target, bool allowFailure, uint256 value, bytes callData)[] calls) payable returns (tuple(bool success, bytes returnData)[] returnData)',
  'function blockAndAggregate(tuple(address target, bytes callData)[] calls) payable returns (uint256 blockNumber, bytes32 blockHash, tuple(bool success, bytes returnData)[] returnData)',
  'function eip712Domain() view returns (bytes1 fields, string name, string version, uint256 chainId, address verifyingContract, bytes32 salt, uint256[] extensions)',
  'function execute(tuple(address from, address to, uint256 value, uint256 gas, uint256 nonce, bytes data) req, bytes signature) payable returns (bool, bytes)',
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
  'function getNonce(address from) view returns (uint256)',
  'function tryAggregate(bool requireSuccess, tuple(address target, bytes callData)[] calls) payable returns (tuple(bool success, bytes returnData)[] returnData)',
  'function tryBlockAndAggregate(bool requireSuccess, tuple(address target, bytes callData)[] calls) payable returns (uint256 blockNumber, bytes32 blockHash, tuple(bool success, bytes returnData)[] returnData)',
  'function verify(tuple(address from, address to, uint256 value, uint256 gas, uint256 nonce, bytes data) req, bytes signature) view returns (bool)',
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
import type { FunctionFragment, Result, EventFragment } from '@ethersproject/abi';
import type { Listener, Provider } from '@ethersproject/providers';
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from './common';

export declare namespace TrustedMulticallForwarder {
  export type CallStruct = { target: string; callData: BytesLike };

  export type CallStructOutput = [string, string] & { target: string; callData: string };

  export type Call3Struct = { target: string; allowFailure: boolean; callData: BytesLike };

  export type Call3StructOutput = [string, boolean, string] & {
    target: string;
    allowFailure: boolean;
    callData: string;
  };

  export type ResultStruct = { success: boolean; returnData: BytesLike };

  export type ResultStructOutput = [boolean, string] & { success: boolean; returnData: string };

  export type Call3ValueStruct = {
    target: string;
    allowFailure: boolean;
    value: BigNumberish;
    callData: BytesLike;
  };

  export type Call3ValueStructOutput = [string, boolean, BigNumber, string] & {
    target: string;
    allowFailure: boolean;
    value: BigNumber;
    callData: string;
  };
}

export declare namespace MinimalForwarder {
  export type ForwardRequestStruct = {
    from: string;
    to: string;
    value: BigNumberish;
    gas: BigNumberish;
    nonce: BigNumberish;
    data: BytesLike;
  };

  export type ForwardRequestStructOutput = [
    string,
    string,
    BigNumber,
    BigNumber,
    BigNumber,
    string
  ] & {
    from: string;
    to: string;
    value: BigNumber;
    gas: BigNumber;
    nonce: BigNumber;
    data: string;
  };
}

export interface TrustedMulticallForwarderInterface extends utils.Interface {
  functions: {
    'aggregate((address,bytes)[])': FunctionFragment;
    'aggregate3((address,bool,bytes)[])': FunctionFragment;
    'aggregate3Value((address,bool,uint256,bytes)[])': FunctionFragment;
    'blockAndAggregate((address,bytes)[])': FunctionFragment;
    'eip712Domain()': FunctionFragment;
    'execute((address,address,uint256,uint256,uint256,bytes),bytes)': FunctionFragment;
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
    'getNonce(address)': FunctionFragment;
    'tryAggregate(bool,(address,bytes)[])': FunctionFragment;
    'tryBlockAndAggregate(bool,(address,bytes)[])': FunctionFragment;
    'verify((address,address,uint256,uint256,uint256,bytes),bytes)': FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | 'aggregate'
      | 'aggregate3'
      | 'aggregate3Value'
      | 'blockAndAggregate'
      | 'eip712Domain'
      | 'execute'
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
      | 'getNonce'
      | 'tryAggregate'
      | 'tryBlockAndAggregate'
      | 'verify'
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: 'aggregate',
    values: [TrustedMulticallForwarder.CallStruct[]]
  ): string;
  encodeFunctionData(
    functionFragment: 'aggregate3',
    values: [TrustedMulticallForwarder.Call3Struct[]]
  ): string;
  encodeFunctionData(
    functionFragment: 'aggregate3Value',
    values: [TrustedMulticallForwarder.Call3ValueStruct[]]
  ): string;
  encodeFunctionData(
    functionFragment: 'blockAndAggregate',
    values: [TrustedMulticallForwarder.CallStruct[]]
  ): string;
  encodeFunctionData(functionFragment: 'eip712Domain', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'execute',
    values: [MinimalForwarder.ForwardRequestStruct, BytesLike]
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
  encodeFunctionData(functionFragment: 'getNonce', values: [string]): string;
  encodeFunctionData(
    functionFragment: 'tryAggregate',
    values: [boolean, TrustedMulticallForwarder.CallStruct[]]
  ): string;
  encodeFunctionData(
    functionFragment: 'tryBlockAndAggregate',
    values: [boolean, TrustedMulticallForwarder.CallStruct[]]
  ): string;
  encodeFunctionData(
    functionFragment: 'verify',
    values: [MinimalForwarder.ForwardRequestStruct, BytesLike]
  ): string;

  decodeFunctionResult(functionFragment: 'aggregate', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'aggregate3', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'aggregate3Value', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'blockAndAggregate', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'eip712Domain', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'execute', data: BytesLike): Result;
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
  decodeFunctionResult(functionFragment: 'getNonce', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'tryAggregate', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'tryBlockAndAggregate', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'verify', data: BytesLike): Result;

  events: {
    'EIP712DomainChanged()': EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: 'EIP712DomainChanged'): EventFragment;
}

export interface EIP712DomainChangedEventObject {}
export type EIP712DomainChangedEvent = TypedEvent<[], EIP712DomainChangedEventObject>;

export type EIP712DomainChangedEventFilter = TypedEventFilter<EIP712DomainChangedEvent>;

export interface TrustedMulticallForwarder extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: TrustedMulticallForwarderInterface;

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
      calls: TrustedMulticallForwarder.CallStruct[],
      overrides?: PayableOverrides & { from?: string }
    ): Promise<ContractTransaction>;

    aggregate3(
      calls: TrustedMulticallForwarder.Call3Struct[],
      overrides?: PayableOverrides & { from?: string }
    ): Promise<ContractTransaction>;

    aggregate3Value(
      calls: TrustedMulticallForwarder.Call3ValueStruct[],
      overrides?: PayableOverrides & { from?: string }
    ): Promise<ContractTransaction>;

    blockAndAggregate(
      calls: TrustedMulticallForwarder.CallStruct[],
      overrides?: PayableOverrides & { from?: string }
    ): Promise<ContractTransaction>;

    eip712Domain(
      overrides?: CallOverrides
    ): Promise<
      [string, string, string, BigNumber, string, string, BigNumber[]] & {
        fields: string;
        name: string;
        version: string;
        chainId: BigNumber;
        verifyingContract: string;
        salt: string;
        extensions: BigNumber[];
      }
    >;

    execute(
      req: MinimalForwarder.ForwardRequestStruct,
      signature: BytesLike,
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

    getNonce(from: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    tryAggregate(
      requireSuccess: boolean,
      calls: TrustedMulticallForwarder.CallStruct[],
      overrides?: PayableOverrides & { from?: string }
    ): Promise<ContractTransaction>;

    tryBlockAndAggregate(
      requireSuccess: boolean,
      calls: TrustedMulticallForwarder.CallStruct[],
      overrides?: PayableOverrides & { from?: string }
    ): Promise<ContractTransaction>;

    verify(
      req: MinimalForwarder.ForwardRequestStruct,
      signature: BytesLike,
      overrides?: CallOverrides
    ): Promise<[boolean]>;
  };

  aggregate(
    calls: TrustedMulticallForwarder.CallStruct[],
    overrides?: PayableOverrides & { from?: string }
  ): Promise<ContractTransaction>;

  aggregate3(
    calls: TrustedMulticallForwarder.Call3Struct[],
    overrides?: PayableOverrides & { from?: string }
  ): Promise<ContractTransaction>;

  aggregate3Value(
    calls: TrustedMulticallForwarder.Call3ValueStruct[],
    overrides?: PayableOverrides & { from?: string }
  ): Promise<ContractTransaction>;

  blockAndAggregate(
    calls: TrustedMulticallForwarder.CallStruct[],
    overrides?: PayableOverrides & { from?: string }
  ): Promise<ContractTransaction>;

  eip712Domain(
    overrides?: CallOverrides
  ): Promise<
    [string, string, string, BigNumber, string, string, BigNumber[]] & {
      fields: string;
      name: string;
      version: string;
      chainId: BigNumber;
      verifyingContract: string;
      salt: string;
      extensions: BigNumber[];
    }
  >;

  execute(
    req: MinimalForwarder.ForwardRequestStruct,
    signature: BytesLike,
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

  getNonce(from: string, overrides?: CallOverrides): Promise<BigNumber>;

  tryAggregate(
    requireSuccess: boolean,
    calls: TrustedMulticallForwarder.CallStruct[],
    overrides?: PayableOverrides & { from?: string }
  ): Promise<ContractTransaction>;

  tryBlockAndAggregate(
    requireSuccess: boolean,
    calls: TrustedMulticallForwarder.CallStruct[],
    overrides?: PayableOverrides & { from?: string }
  ): Promise<ContractTransaction>;

  verify(
    req: MinimalForwarder.ForwardRequestStruct,
    signature: BytesLike,
    overrides?: CallOverrides
  ): Promise<boolean>;

  callStatic: {
    aggregate(
      calls: TrustedMulticallForwarder.CallStruct[],
      overrides?: CallOverrides
    ): Promise<[BigNumber, string[]] & { blockNumber: BigNumber; returnData: string[] }>;

    aggregate3(
      calls: TrustedMulticallForwarder.Call3Struct[],
      overrides?: CallOverrides
    ): Promise<TrustedMulticallForwarder.ResultStructOutput[]>;

    aggregate3Value(
      calls: TrustedMulticallForwarder.Call3ValueStruct[],
      overrides?: CallOverrides
    ): Promise<TrustedMulticallForwarder.ResultStructOutput[]>;

    blockAndAggregate(
      calls: TrustedMulticallForwarder.CallStruct[],
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, string, TrustedMulticallForwarder.ResultStructOutput[]] & {
        blockNumber: BigNumber;
        blockHash: string;
        returnData: TrustedMulticallForwarder.ResultStructOutput[];
      }
    >;

    eip712Domain(
      overrides?: CallOverrides
    ): Promise<
      [string, string, string, BigNumber, string, string, BigNumber[]] & {
        fields: string;
        name: string;
        version: string;
        chainId: BigNumber;
        verifyingContract: string;
        salt: string;
        extensions: BigNumber[];
      }
    >;

    execute(
      req: MinimalForwarder.ForwardRequestStruct,
      signature: BytesLike,
      overrides?: CallOverrides
    ): Promise<[boolean, string]>;

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

    getNonce(from: string, overrides?: CallOverrides): Promise<BigNumber>;

    tryAggregate(
      requireSuccess: boolean,
      calls: TrustedMulticallForwarder.CallStruct[],
      overrides?: CallOverrides
    ): Promise<TrustedMulticallForwarder.ResultStructOutput[]>;

    tryBlockAndAggregate(
      requireSuccess: boolean,
      calls: TrustedMulticallForwarder.CallStruct[],
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, string, TrustedMulticallForwarder.ResultStructOutput[]] & {
        blockNumber: BigNumber;
        blockHash: string;
        returnData: TrustedMulticallForwarder.ResultStructOutput[];
      }
    >;

    verify(
      req: MinimalForwarder.ForwardRequestStruct,
      signature: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };

  filters: {
    'EIP712DomainChanged()'(): EIP712DomainChangedEventFilter;
    EIP712DomainChanged(): EIP712DomainChangedEventFilter;
  };

  estimateGas: {
    aggregate(
      calls: TrustedMulticallForwarder.CallStruct[],
      overrides?: PayableOverrides & { from?: string }
    ): Promise<BigNumber>;

    aggregate3(
      calls: TrustedMulticallForwarder.Call3Struct[],
      overrides?: PayableOverrides & { from?: string }
    ): Promise<BigNumber>;

    aggregate3Value(
      calls: TrustedMulticallForwarder.Call3ValueStruct[],
      overrides?: PayableOverrides & { from?: string }
    ): Promise<BigNumber>;

    blockAndAggregate(
      calls: TrustedMulticallForwarder.CallStruct[],
      overrides?: PayableOverrides & { from?: string }
    ): Promise<BigNumber>;

    eip712Domain(overrides?: CallOverrides): Promise<BigNumber>;

    execute(
      req: MinimalForwarder.ForwardRequestStruct,
      signature: BytesLike,
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

    getNonce(from: string, overrides?: CallOverrides): Promise<BigNumber>;

    tryAggregate(
      requireSuccess: boolean,
      calls: TrustedMulticallForwarder.CallStruct[],
      overrides?: PayableOverrides & { from?: string }
    ): Promise<BigNumber>;

    tryBlockAndAggregate(
      requireSuccess: boolean,
      calls: TrustedMulticallForwarder.CallStruct[],
      overrides?: PayableOverrides & { from?: string }
    ): Promise<BigNumber>;

    verify(
      req: MinimalForwarder.ForwardRequestStruct,
      signature: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    aggregate(
      calls: TrustedMulticallForwarder.CallStruct[],
      overrides?: PayableOverrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    aggregate3(
      calls: TrustedMulticallForwarder.Call3Struct[],
      overrides?: PayableOverrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    aggregate3Value(
      calls: TrustedMulticallForwarder.Call3ValueStruct[],
      overrides?: PayableOverrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    blockAndAggregate(
      calls: TrustedMulticallForwarder.CallStruct[],
      overrides?: PayableOverrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    eip712Domain(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    execute(
      req: MinimalForwarder.ForwardRequestStruct,
      signature: BytesLike,
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

    getNonce(from: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    tryAggregate(
      requireSuccess: boolean,
      calls: TrustedMulticallForwarder.CallStruct[],
      overrides?: PayableOverrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    tryBlockAndAggregate(
      requireSuccess: boolean,
      calls: TrustedMulticallForwarder.CallStruct[],
      overrides?: PayableOverrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    verify(
      req: MinimalForwarder.ForwardRequestStruct,
      signature: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}

