const abi = [
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

export async function importMulticall3(chainId, preset = 'main') {
  switch (`${chainId}-${preset}`) {
    case '1-main': {
      const { mainnet } = await import('viem/chains');
      return { address: mainnet.contracts.multicall3.address, abi };
    }
    case '11155111-main': {
      const { sepolia } = await import('viem/chains');
      return { address: sepolia.contracts.multicall3.address, abi };
    }
    case '10-main': {
      const { optimism } = await import('viem/chains');
      return { address: optimism.contracts.multicall3.address, abi };
    }
    case '8453-andromeda': {
      const { base } = await import('viem/chains');
      return { address: base.contracts.multicall3.address, abi };
    }
    case '84532-andromeda': {
      const { baseSepolia } = await import('viem/chains');
      return { address: baseSepolia.contracts.multicall3.address, abi };
    }
    case '42161-main':
    case '42161-arbthetix': {
      const { arbitrum } = await import('viem/chains');
      return { address: arbitrum.contracts.multicall3.address, abi };
    }
    case '421614-main': {
      const { arbitrumSepolia } = await import('viem/chains');
      return { address: arbitrumSepolia.contracts.multicall3.address, abi };
    }
    default: {
      throw new Error(`Unsupported chain ${chainId} for Multicall3`);
    }
  }
}
