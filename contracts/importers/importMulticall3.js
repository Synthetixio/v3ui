const abi = [
  'function aggregate(tuple(address target, bytes callData)[] calls) payable returns (uint256 blockNumber, bytes[] returnData)',
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

const multicall3Abi = [
  ...abi,
  'function aggregate3(tuple(address target, bool allowFailure, bytes callData)[] calls) payable returns (tuple(bool success, bytes returnData)[] returnData)',
  'function aggregate3Value(tuple(address target, bool allowFailure, uint256 value, bytes callData)[] calls) payable returns (tuple(bool success, bytes returnData)[] returnData)',
];

const trustedMulticallAbi = [
  ...abi,
  'function aggregate3(tuple(address target, bool requireSuccess, bytes callData)[] calls) payable returns (tuple(bool success, bytes returnData)[] returnData)',
  'function aggregate3Value(tuple(address target, bool requireSuccess, uint256 value, bytes callData)[] calls) payable returns (tuple(bool success, bytes returnData)[] returnData)',
];

const TrustedMulticallForwarder = '0xE2C5658cC5C448B48141168f3e475dF8f65A1e3e';

export async function importMulticall3(chainId, preset = 'main') {
  const deployment = `${Number(chainId).toFixed(0)}-${preset}`;
  switch (deployment) {
    case '1-main': {
      const { mainnet } = await import('viem/chains');
      return { address: mainnet.contracts.multicall3.address, abi: multicall3Abi };
    }
    case '11155111-main': {
      const { sepolia } = await import('viem/chains');
      return { address: sepolia.contracts.multicall3.address, abi: multicall3Abi };
    }
    case '10-main': {
      const { optimism } = await import('viem/chains');
      return { address: optimism.contracts.multicall3.address, abi: multicall3Abi };
    }
    case '8453-andromeda':
    case '84532-andromeda':
    case '42161-main':
    case '42161-arbthetix': {
      return { address: TrustedMulticallForwarder, abi: trustedMulticallAbi };
    }
    case '421614-main': {
      const { arbitrumSepolia } = await import('viem/chains');
      return { address: arbitrumSepolia.contracts.multicall3.address, abi: multicall3Abi };
    }
    default: {
      throw new Error(`Unsupported deployment ${deployment} for Multicall3`);
    }
  }
}
