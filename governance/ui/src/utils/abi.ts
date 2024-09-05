export const profileAbi = [
  {
    inputs: [{ internalType: 'address', name: 'user', type: 'address' }],
    name: 'getProfile',
    outputs: [
      { internalType: 'string', name: 'username', type: 'string' },
      { internalType: 'string', name: 'about', type: 'string' },
      { internalType: 'string', name: 'twitter', type: 'string' },
      { internalType: 'string', name: 'github', type: 'string' },
      { internalType: 'string', name: 'discord', type: 'string' },
      { internalType: 'string', name: 'delegationPitch', type: 'string' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'string', name: 'username', type: 'string' },
          { internalType: 'string', name: 'about', type: 'string' },
          { internalType: 'string', name: 'twitter', type: 'string' },
          { internalType: 'string', name: 'github', type: 'string' },
          { internalType: 'string', name: 'discord', type: 'string' },
          { internalType: 'string', name: 'delegationPitch', type: 'string' },
        ],
        internalType: 'struct UserProfile.ProfileUpdate',
        name: 'update',
        type: 'tuple',
      },
    ],
    name: 'updateProfile',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

export const multicallABI = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'AddressInsufficientBalance',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint48',
        name: 'deadline',
        type: 'uint48',
      },
    ],
    name: 'ERC2771ForwarderExpiredRequest',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'signer',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
    ],
    name: 'ERC2771ForwarderInvalidSigner',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'requestedValue',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'msgValue',
        type: 'uint256',
      },
    ],
    name: 'ERC2771ForwarderMismatchedValue',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'target',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'forwarder',
        type: 'address',
      },
    ],
    name: 'ERC2771UntrustfulTarget',
    type: 'error',
  },
  {
    inputs: [],
    name: 'FailedInnerCall',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'currentNonce',
        type: 'uint256',
      },
    ],
    name: 'InvalidAccountNonce',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidShortString',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'str',
        type: 'string',
      },
    ],
    name: 'StringTooLong',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [],
    name: 'EIP712DomainChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'signer',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'nonce',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'success',
        type: 'bool',
      },
    ],
    name: 'ExecutedForwardRequest',
    type: 'event',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'target',
            type: 'address',
          },
          {
            internalType: 'bytes',
            name: 'callData',
            type: 'bytes',
          },
        ],
        internalType: 'struct TrustedMulticallForwarder.Call[]',
        name: 'calls',
        type: 'tuple[]',
      },
    ],
    name: 'aggregate',
    outputs: [
      {
        internalType: 'uint256',
        name: 'blockNumber',
        type: 'uint256',
      },
      {
        internalType: 'bytes[]',
        name: 'returnData',
        type: 'bytes[]',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'target',
            type: 'address',
          },
          {
            internalType: 'bool',
            name: 'requireSuccess',
            type: 'bool',
          },
          {
            internalType: 'bytes',
            name: 'callData',
            type: 'bytes',
          },
        ],
        internalType: 'struct TrustedMulticallForwarder.Call3[]',
        name: 'calls',
        type: 'tuple[]',
      },
    ],
    name: 'aggregate3',
    outputs: [
      {
        components: [
          {
            internalType: 'bool',
            name: 'success',
            type: 'bool',
          },
          {
            internalType: 'bytes',
            name: 'returnData',
            type: 'bytes',
          },
        ],
        internalType: 'struct TrustedMulticallForwarder.Result[]',
        name: 'returnData',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'target',
            type: 'address',
          },
          {
            internalType: 'bool',
            name: 'requireSuccess',
            type: 'bool',
          },
          {
            internalType: 'uint256',
            name: 'value',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'callData',
            type: 'bytes',
          },
        ],
        internalType: 'struct TrustedMulticallForwarder.Call3Value[]',
        name: 'calls',
        type: 'tuple[]',
      },
    ],
    name: 'aggregate3Value',
    outputs: [
      {
        components: [
          {
            internalType: 'bool',
            name: 'success',
            type: 'bool',
          },
          {
            internalType: 'bytes',
            name: 'returnData',
            type: 'bytes',
          },
        ],
        internalType: 'struct TrustedMulticallForwarder.Result[]',
        name: 'returnData',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'target',
            type: 'address',
          },
          {
            internalType: 'bytes',
            name: 'callData',
            type: 'bytes',
          },
        ],
        internalType: 'struct TrustedMulticallForwarder.Call[]',
        name: 'calls',
        type: 'tuple[]',
      },
    ],
    name: 'blockAndAggregate',
    outputs: [
      {
        internalType: 'uint256',
        name: 'blockNumber',
        type: 'uint256',
      },
      {
        internalType: 'bytes32',
        name: 'blockHash',
        type: 'bytes32',
      },
      {
        components: [
          {
            internalType: 'bool',
            name: 'success',
            type: 'bool',
          },
          {
            internalType: 'bytes',
            name: 'returnData',
            type: 'bytes',
          },
        ],
        internalType: 'struct TrustedMulticallForwarder.Result[]',
        name: 'returnData',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'eip712Domain',
    outputs: [
      {
        internalType: 'bytes1',
        name: 'fields',
        type: 'bytes1',
      },
      {
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'version',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'chainId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'verifyingContract',
        type: 'address',
      },
      {
        internalType: 'bytes32',
        name: 'salt',
        type: 'bytes32',
      },
      {
        internalType: 'uint256[]',
        name: 'extensions',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'value',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'gas',
            type: 'uint256',
          },
          {
            internalType: 'uint48',
            name: 'deadline',
            type: 'uint48',
          },
          {
            internalType: 'bytes',
            name: 'data',
            type: 'bytes',
          },
          {
            internalType: 'bytes',
            name: 'signature',
            type: 'bytes',
          },
        ],
        internalType: 'struct ERC2771Forwarder.ForwardRequestData',
        name: 'request',
        type: 'tuple',
      },
    ],
    name: 'execute',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'value',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'gas',
            type: 'uint256',
          },
          {
            internalType: 'uint48',
            name: 'deadline',
            type: 'uint48',
          },
          {
            internalType: 'bytes',
            name: 'data',
            type: 'bytes',
          },
          {
            internalType: 'bytes',
            name: 'signature',
            type: 'bytes',
          },
        ],
        internalType: 'struct ERC2771Forwarder.ForwardRequestData[]',
        name: 'requests',
        type: 'tuple[]',
      },
    ],
    name: 'executeBatch',
    outputs: [
      {
        components: [
          {
            internalType: 'bool',
            name: 'success',
            type: 'bool',
          },
          {
            internalType: 'bytes',
            name: 'returnData',
            type: 'bytes',
          },
        ],
        internalType: 'struct TrustedMulticallForwarder.Result[]',
        name: 'returnData',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'value',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'gas',
            type: 'uint256',
          },
          {
            internalType: 'uint48',
            name: 'deadline',
            type: 'uint48',
          },
          {
            internalType: 'bytes',
            name: 'data',
            type: 'bytes',
          },
          {
            internalType: 'bytes',
            name: 'signature',
            type: 'bytes',
          },
        ],
        internalType: 'struct ERC2771Forwarder.ForwardRequestData[]',
        name: 'requests',
        type: 'tuple[]',
      },
      {
        internalType: 'address payable',
        name: 'refundReceiver',
        type: 'address',
      },
    ],
    name: 'executeBatch',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getBasefee',
    outputs: [
      {
        internalType: 'uint256',
        name: 'basefee',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'blockNumber',
        type: 'uint256',
      },
    ],
    name: 'getBlockHash',
    outputs: [
      {
        internalType: 'bytes32',
        name: 'blockHash',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getBlockNumber',
    outputs: [
      {
        internalType: 'uint256',
        name: 'blockNumber',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getChainId',
    outputs: [
      {
        internalType: 'uint256',
        name: 'chainid',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getCurrentBlockCoinbase',
    outputs: [
      {
        internalType: 'address',
        name: 'coinbase',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getCurrentBlockGasLimit',
    outputs: [
      {
        internalType: 'uint256',
        name: 'gaslimit',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getCurrentBlockTimestamp',
    outputs: [
      {
        internalType: 'uint256',
        name: 'timestamp',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'addr',
        type: 'address',
      },
    ],
    name: 'getEthBalance',
    outputs: [
      {
        internalType: 'uint256',
        name: 'balance',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getLastBlockHash',
    outputs: [
      {
        internalType: 'bytes32',
        name: 'blockHash',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getPrevRandao',
    outputs: [
      {
        internalType: 'uint256',
        name: 'prevrandao',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'nonces',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bool',
        name: 'requireSuccess',
        type: 'bool',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'target',
            type: 'address',
          },
          {
            internalType: 'bytes',
            name: 'callData',
            type: 'bytes',
          },
        ],
        internalType: 'struct TrustedMulticallForwarder.Call[]',
        name: 'calls',
        type: 'tuple[]',
      },
    ],
    name: 'tryAggregate',
    outputs: [
      {
        components: [
          {
            internalType: 'bool',
            name: 'success',
            type: 'bool',
          },
          {
            internalType: 'bytes',
            name: 'returnData',
            type: 'bytes',
          },
        ],
        internalType: 'struct TrustedMulticallForwarder.Result[]',
        name: 'returnData',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bool',
        name: 'requireSuccess',
        type: 'bool',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'target',
            type: 'address',
          },
          {
            internalType: 'bytes',
            name: 'callData',
            type: 'bytes',
          },
        ],
        internalType: 'struct TrustedMulticallForwarder.Call[]',
        name: 'calls',
        type: 'tuple[]',
      },
    ],
    name: 'tryBlockAndAggregate',
    outputs: [
      {
        internalType: 'uint256',
        name: 'blockNumber',
        type: 'uint256',
      },
      {
        internalType: 'bytes32',
        name: 'blockHash',
        type: 'bytes32',
      },
      {
        components: [
          {
            internalType: 'bool',
            name: 'success',
            type: 'bool',
          },
          {
            internalType: 'bytes',
            name: 'returnData',
            type: 'bytes',
          },
        ],
        internalType: 'struct TrustedMulticallForwarder.Result[]',
        name: 'returnData',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'value',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'gas',
            type: 'uint256',
          },
          {
            internalType: 'uint48',
            name: 'deadline',
            type: 'uint48',
          },
          {
            internalType: 'bytes',
            name: 'data',
            type: 'bytes',
          },
          {
            internalType: 'bytes',
            name: 'signature',
            type: 'bytes',
          },
        ],
        internalType: 'struct ERC2771Forwarder.ForwardRequestData',
        name: 'request',
        type: 'tuple',
      },
    ],
    name: 'verify',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

export const electionModuleABI = [
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'expected',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'actual',
        type: 'bytes32',
      },
    ],
    name: 'MismatchAssociatedSystemKind',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'id',
        type: 'bytes32',
      },
    ],
    name: 'MissingAssociatedSystem',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'addr',
        type: 'address',
      },
    ],
    name: 'Unauthorized',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'kind',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'id',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'proxy',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'impl',
        type: 'address',
      },
    ],
    name: 'AssociatedSystemSet',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'id',
        type: 'bytes32',
      },
    ],
    name: 'getAssociatedSystem',
    outputs: [
      {
        internalType: 'address',
        name: 'addr',
        type: 'address',
      },
      {
        internalType: 'bytes32',
        name: 'kind',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'id',
        type: 'bytes32',
      },
      {
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'symbol',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'uri',
        type: 'string',
      },
      {
        internalType: 'address',
        name: 'impl',
        type: 'address',
      },
    ],
    name: 'initOrUpgradeNft',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'id',
        type: 'bytes32',
      },
      {
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'symbol',
        type: 'string',
      },
      {
        internalType: 'uint8',
        name: 'decimals',
        type: 'uint8',
      },
      {
        internalType: 'address',
        name: 'impl',
        type: 'address',
      },
    ],
    name: 'initOrUpgradeToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'id',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'endpoint',
        type: 'address',
      },
    ],
    name: 'registerUnmanagedSystem',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'candidate',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'epochIndex',
        type: 'uint256',
      },
    ],
    name: 'getCandidateVotesInEpoch',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'epochIndex',
        type: 'uint256',
      },
    ],
    name: 'getElectionWinnersInEpoch',
    outputs: [
      {
        internalType: 'address[]',
        name: '',
        type: 'address[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'epochIndex',
        type: 'uint256',
      },
    ],
    name: 'getEpochEndDateForIndex',
    outputs: [
      {
        internalType: 'uint64',
        name: '',
        type: 'uint64',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'epochIndex',
        type: 'uint256',
      },
    ],
    name: 'getEpochStartDateForIndex',
    outputs: [
      {
        internalType: 'uint64',
        name: '',
        type: 'uint64',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'epochIndex',
        type: 'uint256',
      },
    ],
    name: 'getNominationPeriodStartDateForIndex',
    outputs: [
      {
        internalType: 'uint64',
        name: '',
        type: 'uint64',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'epochIndex',
        type: 'uint256',
      },
    ],
    name: 'getNomineesAtEpoch',
    outputs: [
      {
        internalType: 'address[]',
        name: '',
        type: 'address[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'epochIndex',
        type: 'uint256',
      },
    ],
    name: 'getVotingPeriodStartDateForIndex',
    outputs: [
      {
        internalType: 'uint64',
        name: '',
        type: 'uint64',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'chainId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'epochIndex',
        type: 'uint256',
      },
    ],
    name: 'hasVotedInEpoch',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'candidate',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'epochIndex',
        type: 'uint256',
      },
    ],
    name: 'wasNominated',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'AlreadyACouncilMember',
    type: 'error',
  },
  {
    inputs: [],
    name: 'AlreadyNominated',
    type: 'error',
  },
  {
    inputs: [],
    name: 'ChangesCurrentPeriod',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'duplicatedCandidate',
        type: 'address',
      },
    ],
    name: 'DuplicateCandidates',
    type: 'error',
  },
  {
    inputs: [],
    name: 'ElectionAlreadyEvaluated',
    type: 'error',
  },
  {
    inputs: [],
    name: 'ElectionNotEvaluated',
    type: 'error',
  },
  {
    inputs: [],
    name: 'EmptyArray',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InsufficientValue',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidBallot',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidElectionSettings',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'code',
        type: 'uint256',
      },
      {
        internalType: 'uint64',
        name: 'v1',
        type: 'uint64',
      },
      {
        internalType: 'uint64',
        name: 'v2',
        type: 'uint64',
      },
    ],
    name: 'InvalidEpochConfiguration',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'parameter',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'reason',
        type: 'string',
      },
    ],
    name: 'InvalidParameter',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'reason',
        type: 'string',
      },
    ],
    name: 'InvalidVM',
    type: 'error',
  },
  {
    inputs: [],
    name: 'MessageAlreadyProcessed',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NoCandidates',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'currentEpoch',
        type: 'uint256',
      },
    ],
    name: 'NoVotingPower',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NotACouncilMember',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'enum Epoch.ElectionPeriod',
        name: 'currentPeriod',
        type: 'uint8',
      },
    ],
    name: 'NotCallableInCurrentPeriod',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NotImplemented',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NotNominated',
    type: 'error',
  },
  {
    inputs: [],
    name: 'OnlyRelayer',
    type: 'error',
  },
  {
    inputs: [],
    name: 'OverflowUint256ToUint16',
    type: 'error',
  },
  {
    inputs: [],
    name: 'OverflowUint256ToUint64',
    type: 'error',
  },
  {
    inputs: [],
    name: 'PositionOutOfBounds',
    type: 'error',
  },
  {
    inputs: [],
    name: 'TooManyMembers',
    type: 'error',
  },
  {
    inputs: [],
    name: 'UnregisteredEmitter',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint64',
        name: '',
        type: 'uint64',
      },
    ],
    name: 'UnsupportedNetwork',
    type: 'error',
  },
  {
    inputs: [],
    name: 'ValueAlreadyInSet',
    type: 'error',
  },
  {
    inputs: [],
    name: 'ValueNotInSet',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'candidate',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'epochId',
        type: 'uint256',
      },
    ],
    name: 'CandidateNominated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'member',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'epochIndex',
        type: 'uint256',
      },
    ],
    name: 'CouncilMemberAdded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'member',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'epochIndex',
        type: 'uint256',
      },
    ],
    name: 'CouncilMemberRemoved',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address[]',
        name: 'dismissedMembers',
        type: 'address[]',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'epochId',
        type: 'uint256',
      },
    ],
    name: 'CouncilMembersDismissed',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'epochId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'numEvaluatedBallots',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'totalBallots',
        type: 'uint256',
      },
    ],
    name: 'ElectionBatchEvaluated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'epochId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'ballotCount',
        type: 'uint256',
      },
    ],
    name: 'ElectionEvaluated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [],
    name: 'ElectionModuleInitialized',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'epochId',
        type: 'uint256',
      },
    ],
    name: 'EmergencyElectionStarted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'epochIndex',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: 'nominationPeriodStartDate',
        type: 'uint64',
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: 'votingPeriodStartDate',
        type: 'uint64',
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: 'epochEndDate',
        type: 'uint64',
      },
    ],
    name: 'EpochScheduleTweaked',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint64',
        name: 'epochId',
        type: 'uint64',
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: 'startDate',
        type: 'uint64',
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: 'endDate',
        type: 'uint64',
      },
    ],
    name: 'EpochScheduleUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'epochIndex',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: 'epochStartDate',
        type: 'uint64',
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: 'nominationPeriodStartDate',
        type: 'uint64',
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: 'votingPeriodStartDate',
        type: 'uint64',
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: 'epochEndDate',
        type: 'uint64',
      },
    ],
    name: 'EpochSetup',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'epochId',
        type: 'uint256',
      },
    ],
    name: 'EpochStarted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'gasLimit',
        type: 'uint256',
      },
    ],
    name: 'GasLimitSet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'epochIndex',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: 'epochStartDate',
        type: 'uint64',
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: 'nominationPeriodStartDate',
        type: 'uint64',
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: 'votingPeriodStartDate',
        type: 'uint64',
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: 'epochEndDate',
        type: 'uint64',
      },
      {
        indexed: false,
        internalType: 'address[]',
        name: 'councilMembers',
        type: 'address[]',
      },
    ],
    name: 'InitializedSatellite',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'string',
        name: 'message',
        type: 'string',
      },
    ],
    name: 'MessageReceived',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'candidate',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'epochId',
        type: 'uint256',
      },
    ],
    name: 'NominationWithdrawn',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address[]',
        name: 'candidates',
        type: 'address[]',
      },
      {
        indexed: false,
        internalType: 'uint256[]',
        name: 'amounts',
        type: 'uint256[]',
      },
    ],
    name: 'VoteCastSent',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'voter',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'chainId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'epochId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'votingPower',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address[]',
        name: 'candidates',
        type: 'address[]',
      },
    ],
    name: 'VoteRecorded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'voter',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'chainId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'epochId',
        type: 'uint256',
      },
    ],
    name: 'VoteWithdrawn',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
    ],
    name: 'VoteWithdrawnSent',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'epochIndex',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'voter',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'votingPower',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'chainId',
        type: 'uint256',
      },
      {
        internalType: 'address[]',
        name: 'candidates',
        type: 'address[]',
      },
      {
        internalType: 'uint256[]',
        name: 'amounts',
        type: 'uint256[]',
      },
    ],
    name: '_recvCast',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: 'membersToDismiss',
        type: 'address[]',
      },
      {
        internalType: 'uint256',
        name: 'epochIndex',
        type: 'uint256',
      },
    ],
    name: '_recvDismissMembers',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'epochIndex',
        type: 'uint256',
      },
      {
        internalType: 'uint64',
        name: 'epochStartDate',
        type: 'uint64',
      },
      {
        internalType: 'uint64',
        name: 'nominationPeriodStartDate',
        type: 'uint64',
      },
      {
        internalType: 'uint64',
        name: 'votingPeriodStartDate',
        type: 'uint64',
      },
      {
        internalType: 'uint64',
        name: 'epochEndDate',
        type: 'uint64',
      },
      {
        internalType: 'address[]',
        name: 'councilMembers',
        type: 'address[]',
      },
    ],
    name: '_recvResolve',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'epochIndex',
        type: 'uint256',
      },
      {
        internalType: 'uint64',
        name: 'nominationPeriodStartDate',
        type: 'uint64',
      },
      {
        internalType: 'uint64',
        name: 'votingPeriodStartDate',
        type: 'uint64',
      },
      {
        internalType: 'uint64',
        name: 'epochEndDate',
        type: 'uint64',
      },
    ],
    name: '_recvTweakEpochSchedule',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'epochIndex',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'voter',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'chainId',
        type: 'uint256',
      },
    ],
    name: '_recvWithdrawVote',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: 'candidates',
        type: 'address[]',
      },
      {
        internalType: 'uint256[]',
        name: 'amounts',
        type: 'uint256[]',
      },
    ],
    name: 'cast',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: 'membersToDismiss',
        type: 'address[]',
      },
    ],
    name: 'dismissMembers',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'numBallots',
        type: 'uint256',
      },
    ],
    name: 'evaluate',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'voter',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'chainId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'electionId',
        type: 'uint256',
      },
    ],
    name: 'getBallot',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'votingPower',
            type: 'uint256',
          },
          {
            internalType: 'address[]',
            name: 'votedCandidates',
            type: 'address[]',
          },
          {
            internalType: 'uint256[]',
            name: 'amounts',
            type: 'uint256[]',
          },
        ],
        internalType: 'struct Ballot.Data',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'voter',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'chainId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'electionId',
        type: 'uint256',
      },
    ],
    name: 'getBallotCandidates',
    outputs: [
      {
        internalType: 'address[]',
        name: '',
        type: 'address[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'candidate',
        type: 'address',
      },
    ],
    name: 'getCandidateVotes',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getCouncilMembers',
    outputs: [
      {
        internalType: 'address[]',
        name: '',
        type: 'address[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getCouncilToken',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getCurrentPeriod',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getElectionSettings',
    outputs: [
      {
        components: [
          {
            internalType: 'uint8',
            name: 'epochSeatCount',
            type: 'uint8',
          },
          {
            internalType: 'uint8',
            name: 'minimumActiveMembers',
            type: 'uint8',
          },
          {
            internalType: 'uint64',
            name: 'epochDuration',
            type: 'uint64',
          },
          {
            internalType: 'uint64',
            name: 'nominationPeriodDuration',
            type: 'uint64',
          },
          {
            internalType: 'uint64',
            name: 'votingPeriodDuration',
            type: 'uint64',
          },
          {
            internalType: 'uint64',
            name: 'maxDateAdjustmentTolerance',
            type: 'uint64',
          },
        ],
        internalType: 'struct ElectionSettings.Data',
        name: 'settings',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getElectionWinners',
    outputs: [
      {
        internalType: 'address[]',
        name: '',
        type: 'address[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getEpochIndex',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getEpochSchedule',
    outputs: [
      {
        components: [
          {
            internalType: 'uint64',
            name: 'startDate',
            type: 'uint64',
          },
          {
            internalType: 'uint64',
            name: 'nominationPeriodStartDate',
            type: 'uint64',
          },
          {
            internalType: 'uint64',
            name: 'votingPeriodStartDate',
            type: 'uint64',
          },
          {
            internalType: 'uint64',
            name: 'endDate',
            type: 'uint64',
          },
        ],
        internalType: 'struct Epoch.Data',
        name: 'epoch',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getGasLimit',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getNextElectionSettings',
    outputs: [
      {
        components: [
          {
            internalType: 'uint8',
            name: 'epochSeatCount',
            type: 'uint8',
          },
          {
            internalType: 'uint8',
            name: 'minimumActiveMembers',
            type: 'uint8',
          },
          {
            internalType: 'uint64',
            name: 'epochDuration',
            type: 'uint64',
          },
          {
            internalType: 'uint64',
            name: 'nominationPeriodDuration',
            type: 'uint64',
          },
          {
            internalType: 'uint64',
            name: 'votingPeriodDuration',
            type: 'uint64',
          },
          {
            internalType: 'uint64',
            name: 'maxDateAdjustmentTolerance',
            type: 'uint64',
          },
        ],
        internalType: 'struct ElectionSettings.Data',
        name: 'settings',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getNominees',
    outputs: [
      {
        internalType: 'address[]',
        name: '',
        type: 'address[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getNumOfBallots',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getRegisteredEmitters',
    outputs: [
      {
        internalType: 'bytes32[]',
        name: '',
        type: 'bytes32[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getSupportedNetworks',
    outputs: [
      {
        internalType: 'uint16[]',
        name: '',
        type: 'uint16[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'chainId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'electionId',
        type: 'uint256',
      },
    ],
    name: 'getVotePower',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getWormholeCore',
    outputs: [
      {
        internalType: 'contract IWormhole',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getWormholeRelayer',
    outputs: [
      {
        internalType: 'contract IWormholeRelayer',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'deliveryHash',
        type: 'bytes32',
      },
    ],
    name: 'hasProcessedMsg',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'chainId',
        type: 'uint256',
      },
    ],
    name: 'hasVoted',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'epochIndex',
        type: 'uint256',
      },
      {
        internalType: 'uint64',
        name: 'epochStartDate',
        type: 'uint64',
      },
      {
        internalType: 'uint64',
        name: 'nominationPeriodStartDate',
        type: 'uint64',
      },
      {
        internalType: 'uint64',
        name: 'votingPeriodStartDate',
        type: 'uint64',
      },
      {
        internalType: 'uint64',
        name: 'epochEndDate',
        type: 'uint64',
      },
      {
        internalType: 'contract IWormhole',
        name: 'wormholeCore',
        type: 'address',
      },
      {
        internalType: 'contract IWormholeRelayer',
        name: 'wormholeRelayer',
        type: 'address',
      },
      {
        internalType: 'address[]',
        name: 'councilMembers',
        type: 'address[]',
      },
    ],
    name: 'initElectionModuleSatellite',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'initElectionModuleSatellite',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: 'initialCouncil',
        type: 'address[]',
      },
      {
        internalType: 'contract IWormhole',
        name: 'wormholeCore',
        type: 'address',
      },
      {
        internalType: 'contract IWormholeRelayer',
        name: 'wormholeRelayer',
        type: 'address',
      },
      {
        internalType: 'uint8',
        name: 'minimumActiveMembers',
        type: 'uint8',
      },
      {
        internalType: 'uint64',
        name: 'initialNominationPeriodStartDate',
        type: 'uint64',
      },
      {
        internalType: 'uint64',
        name: 'administrationPeriodDuration',
        type: 'uint64',
      },
      {
        internalType: 'uint64',
        name: 'nominationPeriodDuration',
        type: 'uint64',
      },
      {
        internalType: 'uint64',
        name: 'votingPeriodDuration',
        type: 'uint64',
      },
    ],
    name: 'initOrUpdateElectionSettings',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'isElectionEvaluated',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'isElectionModuleInitialized',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'candidate',
        type: 'address',
      },
    ],
    name: 'isNominated',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'nominate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint16',
        name: 'targetChain',
        type: 'uint16',
      },
      {
        internalType: 'uint256',
        name: 'receiverValue',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'gasLimit',
        type: 'uint256',
      },
    ],
    name: 'quoteCrossChainDeliveryPrice',
    outputs: [
      {
        internalType: 'uint256',
        name: 'cost',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'payload',
        type: 'bytes',
      },
      {
        internalType: 'bytes[]',
        name: '',
        type: 'bytes[]',
      },
      {
        internalType: 'bytes32',
        name: 'sourceAddress',
        type: 'bytes32',
      },
      {
        internalType: 'uint16',
        name: 'sourceChain',
        type: 'uint16',
      },
      {
        internalType: 'bytes32',
        name: 'deliveryHash',
        type: 'bytes32',
      },
    ],
    name: 'receiveWormholeMessages',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint16[]',
        name: 'chainIds',
        type: 'uint16[]',
      },
    ],
    name: 'removeRegisteredEmitters',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'resolve',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'gasLimit',
        type: 'uint256',
      },
    ],
    name: 'setGasLimit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint8',
        name: 'epochSeatCount',
        type: 'uint8',
      },
      {
        internalType: 'uint8',
        name: 'minimumActiveMembers',
        type: 'uint8',
      },
      {
        internalType: 'uint64',
        name: 'epochDuration',
        type: 'uint64',
      },
      {
        internalType: 'uint64',
        name: 'nominationPeriodDuration',
        type: 'uint64',
      },
      {
        internalType: 'uint64',
        name: 'votingPeriodDuration',
        type: 'uint64',
      },
      {
        internalType: 'uint64',
        name: 'maxDateAdjustmentTolerance',
        type: 'uint64',
      },
    ],
    name: 'setNextElectionSettings',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint16[]',
        name: 'chainIds',
        type: 'uint16[]',
      },
      {
        internalType: 'address[]',
        name: 'emitters',
        type: 'address[]',
      },
    ],
    name: 'setRegisteredEmitters',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint64',
        name: 'newNominationPeriodStartDate',
        type: 'uint64',
      },
      {
        internalType: 'uint64',
        name: 'newVotingPeriodStartDate',
        type: 'uint64',
      },
      {
        internalType: 'uint64',
        name: 'newEpochEndDate',
        type: 'uint64',
      },
    ],
    name: 'tweakEpochSchedule',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'withdrawNomination',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'withdrawVote',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'voter',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'electionId',
        type: 'uint256',
      },
    ],
    name: 'BallotAlreadyPrepared',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidSnapshotContract',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidWeightType',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'NoPower',
    type: 'error',
  },
  {
    inputs: [],
    name: 'OverflowUint256ToUint128',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint128',
        name: 'snapshotId',
        type: 'uint128',
      },
    ],
    name: 'SnapshotAlreadyTaken',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'snapshotContract',
        type: 'address',
      },
      {
        internalType: 'uint128',
        name: 'electionId',
        type: 'uint128',
      },
    ],
    name: 'SnapshotNotTaken',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'snapshotContract',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'scale',
        type: 'uint256',
      },
    ],
    name: 'ScaleSet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'snapshotContract',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'bool',
        name: 'enabled',
        type: 'bool',
      },
      {
        indexed: false,
        internalType: 'enum SnapshotVotePower.WeightType',
        name: 'weight',
        type: 'uint8',
      },
    ],
    name: 'SnapshotContractSet',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'voter',
        type: 'address',
      },
    ],
    name: 'getPreparedBallot',
    outputs: [
      {
        internalType: 'uint256',
        name: 'power',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'snapshotContract',
        type: 'address',
      },
      {
        internalType: 'uint128',
        name: 'electionId',
        type: 'uint128',
      },
    ],
    name: 'getVotePowerSnapshotId',
    outputs: [
      {
        internalType: 'uint128',
        name: '',
        type: 'uint128',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'snapshotContract',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'voter',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'periodId',
        type: 'uint256',
      },
    ],
    name: 'getVotingPowerForUser',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'snapshotContract',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'voter',
        type: 'address',
      },
    ],
    name: 'prepareBallotWithSnapshot',
    outputs: [
      {
        internalType: 'uint256',
        name: 'votingPower',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'snapshotContract',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'scale',
        type: 'uint256',
      },
    ],
    name: 'setScale',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'snapshotContract',
        type: 'address',
      },
      {
        internalType: 'enum SnapshotVotePower.WeightType',
        name: 'weight',
        type: 'uint8',
      },
      {
        internalType: 'bool',
        name: 'enabled',
        type: 'bool',
      },
    ],
    name: 'setSnapshotContract',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'snapshotContract',
        type: 'address',
      },
    ],
    name: 'takeVotePowerSnapshot',
    outputs: [
      {
        internalType: 'uint128',
        name: 'snapshotId',
        type: 'uint128',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'implementation',
        type: 'address',
      },
    ],
    name: 'ImplementationIsSterile',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NoChange',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'contr',
        type: 'address',
      },
    ],
    name: 'NotAContract',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'addr',
        type: 'address',
      },
    ],
    name: 'NotNominated',
    type: 'error',
  },
  {
    inputs: [],
    name: 'UpgradeSimulationFailed',
    type: 'error',
  },
  {
    inputs: [],
    name: 'ZeroAddress',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'oldOwner',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnerChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnerNominated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'self',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'implementation',
        type: 'address',
      },
    ],
    name: 'Upgraded',
    type: 'event',
  },
  {
    inputs: [],
    name: 'acceptOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getImplementation',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newNominatedOwner',
        type: 'address',
      },
    ],
    name: 'nominateNewOwner',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'nominatedOwner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceNomination',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newImplementation',
        type: 'address',
      },
    ],
    name: 'simulateUpgradeTo',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newImplementation',
        type: 'address',
      },
    ],
    name: 'upgradeTo',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
export const electionModuleABITest = [
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'expected',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'actual',
        type: 'bytes32',
      },
    ],
    name: 'MismatchAssociatedSystemKind',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'id',
        type: 'bytes32',
      },
    ],
    name: 'MissingAssociatedSystem',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'addr',
        type: 'address',
      },
    ],
    name: 'Unauthorized',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'kind',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'id',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'proxy',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'impl',
        type: 'address',
      },
    ],
    name: 'AssociatedSystemSet',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'id',
        type: 'bytes32',
      },
    ],
    name: 'getAssociatedSystem',
    outputs: [
      {
        internalType: 'address',
        name: 'addr',
        type: 'address',
      },
      {
        internalType: 'bytes32',
        name: 'kind',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'id',
        type: 'bytes32',
      },
      {
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'symbol',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'uri',
        type: 'string',
      },
      {
        internalType: 'address',
        name: 'impl',
        type: 'address',
      },
    ],
    name: 'initOrUpgradeNft',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'id',
        type: 'bytes32',
      },
      {
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'symbol',
        type: 'string',
      },
      {
        internalType: 'uint8',
        name: 'decimals',
        type: 'uint8',
      },
      {
        internalType: 'address',
        name: 'impl',
        type: 'address',
      },
    ],
    name: 'initOrUpgradeToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'id',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'endpoint',
        type: 'address',
      },
    ],
    name: 'registerUnmanagedSystem',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'candidate',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'epochIndex',
        type: 'uint256',
      },
    ],
    name: 'getCandidateVotesInEpoch',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'epochIndex',
        type: 'uint256',
      },
    ],
    name: 'getElectionWinnersInEpoch',
    outputs: [
      {
        internalType: 'address[]',
        name: '',
        type: 'address[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'epochIndex',
        type: 'uint256',
      },
    ],
    name: 'getEpochEndDateForIndex',
    outputs: [
      {
        internalType: 'uint64',
        name: '',
        type: 'uint64',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'epochIndex',
        type: 'uint256',
      },
    ],
    name: 'getEpochStartDateForIndex',
    outputs: [
      {
        internalType: 'uint64',
        name: '',
        type: 'uint64',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'epochIndex',
        type: 'uint256',
      },
    ],
    name: 'getNominationPeriodStartDateForIndex',
    outputs: [
      {
        internalType: 'uint64',
        name: '',
        type: 'uint64',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'epochIndex',
        type: 'uint256',
      },
    ],
    name: 'getNomineesAtEpoch',
    outputs: [
      {
        internalType: 'address[]',
        name: '',
        type: 'address[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'epochIndex',
        type: 'uint256',
      },
    ],
    name: 'getVotingPeriodStartDateForIndex',
    outputs: [
      {
        internalType: 'uint64',
        name: '',
        type: 'uint64',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'chainId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'epochIndex',
        type: 'uint256',
      },
    ],
    name: 'hasVotedInEpoch',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'candidate',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'epochIndex',
        type: 'uint256',
      },
    ],
    name: 'wasNominated',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'AlreadyACouncilMember',
    type: 'error',
  },
  {
    inputs: [],
    name: 'AlreadyNominated',
    type: 'error',
  },
  {
    inputs: [],
    name: 'ChangesCurrentPeriod',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'duplicatedCandidate',
        type: 'address',
      },
    ],
    name: 'DuplicateCandidates',
    type: 'error',
  },
  {
    inputs: [],
    name: 'ElectionAlreadyEvaluated',
    type: 'error',
  },
  {
    inputs: [],
    name: 'ElectionNotEvaluated',
    type: 'error',
  },
  {
    inputs: [],
    name: 'EmptyArray',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InsufficientValue',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidBallot',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidElectionSettings',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'code',
        type: 'uint256',
      },
      {
        internalType: 'uint64',
        name: 'v1',
        type: 'uint64',
      },
      {
        internalType: 'uint64',
        name: 'v2',
        type: 'uint64',
      },
    ],
    name: 'InvalidEpochConfiguration',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'parameter',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'reason',
        type: 'string',
      },
    ],
    name: 'InvalidParameter',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'reason',
        type: 'string',
      },
    ],
    name: 'InvalidVM',
    type: 'error',
  },
  {
    inputs: [],
    name: 'MessageAlreadyProcessed',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NoCandidates',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'currentEpoch',
        type: 'uint256',
      },
    ],
    name: 'NoVotingPower',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NotACouncilMember',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NotCallableInCurrentPeriod',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NotImplemented',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NotNominated',
    type: 'error',
  },
  {
    inputs: [],
    name: 'OnlyRelayer',
    type: 'error',
  },
  {
    inputs: [],
    name: 'OverflowUint256ToUint16',
    type: 'error',
  },
  {
    inputs: [],
    name: 'OverflowUint256ToUint64',
    type: 'error',
  },
  {
    inputs: [],
    name: 'PositionOutOfBounds',
    type: 'error',
  },
  {
    inputs: [],
    name: 'TooManyMembers',
    type: 'error',
  },
  {
    inputs: [],
    name: 'UnregisteredEmitter',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint64',
        name: '',
        type: 'uint64',
      },
    ],
    name: 'UnsupportedNetwork',
    type: 'error',
  },
  {
    inputs: [],
    name: 'ValueAlreadyInSet',
    type: 'error',
  },
  {
    inputs: [],
    name: 'ValueNotInSet',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'candidate',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'epochId',
        type: 'uint256',
      },
    ],
    name: 'CandidateNominated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'member',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'epochIndex',
        type: 'uint256',
      },
    ],
    name: 'CouncilMemberAdded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'member',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'epochIndex',
        type: 'uint256',
      },
    ],
    name: 'CouncilMemberRemoved',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address[]',
        name: 'dismissedMembers',
        type: 'address[]',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'epochId',
        type: 'uint256',
      },
    ],
    name: 'CouncilMembersDismissed',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'epochId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'numEvaluatedBallots',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'totalBallots',
        type: 'uint256',
      },
    ],
    name: 'ElectionBatchEvaluated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'epochId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'ballotCount',
        type: 'uint256',
      },
    ],
    name: 'ElectionEvaluated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [],
    name: 'ElectionModuleInitialized',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'epochId',
        type: 'uint256',
      },
    ],
    name: 'EmergencyElectionStarted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'epochIndex',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: 'nominationPeriodStartDate',
        type: 'uint64',
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: 'votingPeriodStartDate',
        type: 'uint64',
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: 'epochEndDate',
        type: 'uint64',
      },
    ],
    name: 'EpochScheduleTweaked',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint64',
        name: 'epochId',
        type: 'uint64',
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: 'startDate',
        type: 'uint64',
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: 'endDate',
        type: 'uint64',
      },
    ],
    name: 'EpochScheduleUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'epochIndex',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: 'epochStartDate',
        type: 'uint64',
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: 'nominationPeriodStartDate',
        type: 'uint64',
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: 'votingPeriodStartDate',
        type: 'uint64',
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: 'epochEndDate',
        type: 'uint64',
      },
    ],
    name: 'EpochSetup',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'epochId',
        type: 'uint256',
      },
    ],
    name: 'EpochStarted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'gasLimit',
        type: 'uint256',
      },
    ],
    name: 'GasLimitSet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'epochIndex',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: 'epochStartDate',
        type: 'uint64',
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: 'nominationPeriodStartDate',
        type: 'uint64',
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: 'votingPeriodStartDate',
        type: 'uint64',
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: 'epochEndDate',
        type: 'uint64',
      },
      {
        indexed: false,
        internalType: 'address[]',
        name: 'councilMembers',
        type: 'address[]',
      },
    ],
    name: 'InitializedSatellite',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'string',
        name: 'message',
        type: 'string',
      },
    ],
    name: 'MessageReceived',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'candidate',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'epochId',
        type: 'uint256',
      },
    ],
    name: 'NominationWithdrawn',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address[]',
        name: 'candidates',
        type: 'address[]',
      },
      {
        indexed: false,
        internalType: 'uint256[]',
        name: 'amounts',
        type: 'uint256[]',
      },
    ],
    name: 'VoteCastSent',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'voter',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'chainId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'epochId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'votingPower',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address[]',
        name: 'candidates',
        type: 'address[]',
      },
    ],
    name: 'VoteRecorded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'voter',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'chainId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'epochId',
        type: 'uint256',
      },
    ],
    name: 'VoteWithdrawn',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
    ],
    name: 'VoteWithdrawnSent',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'epochIndex',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'voter',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'votingPower',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'chainId',
        type: 'uint256',
      },
      {
        internalType: 'address[]',
        name: 'candidates',
        type: 'address[]',
      },
      {
        internalType: 'uint256[]',
        name: 'amounts',
        type: 'uint256[]',
      },
    ],
    name: '_recvCast',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: 'membersToDismiss',
        type: 'address[]',
      },
      {
        internalType: 'uint256',
        name: 'epochIndex',
        type: 'uint256',
      },
    ],
    name: '_recvDismissMembers',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'epochIndex',
        type: 'uint256',
      },
      {
        internalType: 'uint64',
        name: 'epochStartDate',
        type: 'uint64',
      },
      {
        internalType: 'uint64',
        name: 'nominationPeriodStartDate',
        type: 'uint64',
      },
      {
        internalType: 'uint64',
        name: 'votingPeriodStartDate',
        type: 'uint64',
      },
      {
        internalType: 'uint64',
        name: 'epochEndDate',
        type: 'uint64',
      },
      {
        internalType: 'address[]',
        name: 'councilMembers',
        type: 'address[]',
      },
    ],
    name: '_recvResolve',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'epochIndex',
        type: 'uint256',
      },
      {
        internalType: 'uint64',
        name: 'nominationPeriodStartDate',
        type: 'uint64',
      },
      {
        internalType: 'uint64',
        name: 'votingPeriodStartDate',
        type: 'uint64',
      },
      {
        internalType: 'uint64',
        name: 'epochEndDate',
        type: 'uint64',
      },
    ],
    name: '_recvTweakEpochSchedule',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'epochIndex',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'voter',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'chainId',
        type: 'uint256',
      },
    ],
    name: '_recvWithdrawVote',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: 'candidates',
        type: 'address[]',
      },
      {
        internalType: 'uint256[]',
        name: 'amounts',
        type: 'uint256[]',
      },
    ],
    name: 'cast',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: 'membersToDismiss',
        type: 'address[]',
      },
    ],
    name: 'dismissMembers',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'numBallots',
        type: 'uint256',
      },
    ],
    name: 'evaluate',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'voter',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'chainId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'electionId',
        type: 'uint256',
      },
    ],
    name: 'getBallot',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'votingPower',
            type: 'uint256',
          },
          {
            internalType: 'address[]',
            name: 'votedCandidates',
            type: 'address[]',
          },
          {
            internalType: 'uint256[]',
            name: 'amounts',
            type: 'uint256[]',
          },
        ],
        internalType: 'struct Ballot.Data',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'voter',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'chainId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'electionId',
        type: 'uint256',
      },
    ],
    name: 'getBallotCandidates',
    outputs: [
      {
        internalType: 'address[]',
        name: '',
        type: 'address[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'candidate',
        type: 'address',
      },
    ],
    name: 'getCandidateVotes',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getCouncilMembers',
    outputs: [
      {
        internalType: 'address[]',
        name: '',
        type: 'address[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getCouncilToken',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getCurrentPeriod',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getElectionSettings',
    outputs: [
      {
        components: [
          {
            internalType: 'uint8',
            name: 'epochSeatCount',
            type: 'uint8',
          },
          {
            internalType: 'uint8',
            name: 'minimumActiveMembers',
            type: 'uint8',
          },
          {
            internalType: 'uint64',
            name: 'epochDuration',
            type: 'uint64',
          },
          {
            internalType: 'uint64',
            name: 'nominationPeriodDuration',
            type: 'uint64',
          },
          {
            internalType: 'uint64',
            name: 'votingPeriodDuration',
            type: 'uint64',
          },
          {
            internalType: 'uint64',
            name: 'maxDateAdjustmentTolerance',
            type: 'uint64',
          },
        ],
        internalType: 'struct ElectionSettings.Data',
        name: 'settings',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getElectionWinners',
    outputs: [
      {
        internalType: 'address[]',
        name: '',
        type: 'address[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getEpochIndex',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getEpochSchedule',
    outputs: [
      {
        components: [
          {
            internalType: 'uint64',
            name: 'startDate',
            type: 'uint64',
          },
          {
            internalType: 'uint64',
            name: 'nominationPeriodStartDate',
            type: 'uint64',
          },
          {
            internalType: 'uint64',
            name: 'votingPeriodStartDate',
            type: 'uint64',
          },
          {
            internalType: 'uint64',
            name: 'endDate',
            type: 'uint64',
          },
        ],
        internalType: 'struct Epoch.Data',
        name: 'epoch',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getGasLimit',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getNextElectionSettings',
    outputs: [
      {
        components: [
          {
            internalType: 'uint8',
            name: 'epochSeatCount',
            type: 'uint8',
          },
          {
            internalType: 'uint8',
            name: 'minimumActiveMembers',
            type: 'uint8',
          },
          {
            internalType: 'uint64',
            name: 'epochDuration',
            type: 'uint64',
          },
          {
            internalType: 'uint64',
            name: 'nominationPeriodDuration',
            type: 'uint64',
          },
          {
            internalType: 'uint64',
            name: 'votingPeriodDuration',
            type: 'uint64',
          },
          {
            internalType: 'uint64',
            name: 'maxDateAdjustmentTolerance',
            type: 'uint64',
          },
        ],
        internalType: 'struct ElectionSettings.Data',
        name: 'settings',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getNominees',
    outputs: [
      {
        internalType: 'address[]',
        name: '',
        type: 'address[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getRegisteredEmitters',
    outputs: [
      {
        internalType: 'bytes32[]',
        name: '',
        type: 'bytes32[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getSupportedNetworks',
    outputs: [
      {
        internalType: 'uint16[]',
        name: '',
        type: 'uint16[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'chainId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'electionId',
        type: 'uint256',
      },
    ],
    name: 'getVotePower',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getWormholeCore',
    outputs: [
      {
        internalType: 'contract IWormhole',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getWormholeRelayer',
    outputs: [
      {
        internalType: 'contract IWormholeRelayer',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'deliveryHash',
        type: 'bytes32',
      },
    ],
    name: 'hasProcessedMsg',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'chainId',
        type: 'uint256',
      },
    ],
    name: 'hasVoted',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'epochIndex',
        type: 'uint256',
      },
      {
        internalType: 'uint64',
        name: 'epochStartDate',
        type: 'uint64',
      },
      {
        internalType: 'uint64',
        name: 'nominationPeriodStartDate',
        type: 'uint64',
      },
      {
        internalType: 'uint64',
        name: 'votingPeriodStartDate',
        type: 'uint64',
      },
      {
        internalType: 'uint64',
        name: 'epochEndDate',
        type: 'uint64',
      },
      {
        internalType: 'contract IWormhole',
        name: 'wormholeCore',
        type: 'address',
      },
      {
        internalType: 'contract IWormholeRelayer',
        name: 'wormholeRelayer',
        type: 'address',
      },
      {
        internalType: 'address[]',
        name: 'councilMembers',
        type: 'address[]',
      },
    ],
    name: 'initElectionModuleSatellite',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'initElectionModuleSatellite',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: 'initialCouncil',
        type: 'address[]',
      },
      {
        internalType: 'contract IWormhole',
        name: 'wormholeCore',
        type: 'address',
      },
      {
        internalType: 'contract IWormholeRelayer',
        name: 'wormholeRelayer',
        type: 'address',
      },
      {
        internalType: 'uint8',
        name: 'minimumActiveMembers',
        type: 'uint8',
      },
      {
        internalType: 'uint64',
        name: 'initialNominationPeriodStartDate',
        type: 'uint64',
      },
      {
        internalType: 'uint64',
        name: 'administrationPeriodDuration',
        type: 'uint64',
      },
      {
        internalType: 'uint64',
        name: 'nominationPeriodDuration',
        type: 'uint64',
      },
      {
        internalType: 'uint64',
        name: 'votingPeriodDuration',
        type: 'uint64',
      },
    ],
    name: 'initOrUpdateElectionSettings',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'isElectionEvaluated',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'isElectionModuleInitialized',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'candidate',
        type: 'address',
      },
    ],
    name: 'isNominated',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'nominate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint16',
        name: 'targetChain',
        type: 'uint16',
      },
      {
        internalType: 'uint256',
        name: 'receiverValue',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'gasLimit',
        type: 'uint256',
      },
    ],
    name: 'quoteCrossChainDeliveryPrice',
    outputs: [
      {
        internalType: 'uint256',
        name: 'cost',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'payload',
        type: 'bytes',
      },
      {
        internalType: 'bytes[]',
        name: '',
        type: 'bytes[]',
      },
      {
        internalType: 'bytes32',
        name: 'sourceAddress',
        type: 'bytes32',
      },
      {
        internalType: 'uint16',
        name: 'sourceChain',
        type: 'uint16',
      },
      {
        internalType: 'bytes32',
        name: 'deliveryHash',
        type: 'bytes32',
      },
    ],
    name: 'receiveWormholeMessages',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint16[]',
        name: 'chainIds',
        type: 'uint16[]',
      },
    ],
    name: 'removeRegisteredEmitters',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'resolve',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'gasLimit',
        type: 'uint256',
      },
    ],
    name: 'setGasLimit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint8',
        name: 'epochSeatCount',
        type: 'uint8',
      },
      {
        internalType: 'uint8',
        name: 'minimumActiveMembers',
        type: 'uint8',
      },
      {
        internalType: 'uint64',
        name: 'epochDuration',
        type: 'uint64',
      },
      {
        internalType: 'uint64',
        name: 'nominationPeriodDuration',
        type: 'uint64',
      },
      {
        internalType: 'uint64',
        name: 'votingPeriodDuration',
        type: 'uint64',
      },
      {
        internalType: 'uint64',
        name: 'maxDateAdjustmentTolerance',
        type: 'uint64',
      },
    ],
    name: 'setNextElectionSettings',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint16[]',
        name: 'chainIds',
        type: 'uint16[]',
      },
      {
        internalType: 'address[]',
        name: 'emitters',
        type: 'address[]',
      },
    ],
    name: 'setRegisteredEmitters',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint64',
        name: 'newNominationPeriodStartDate',
        type: 'uint64',
      },
      {
        internalType: 'uint64',
        name: 'newVotingPeriodStartDate',
        type: 'uint64',
      },
      {
        internalType: 'uint64',
        name: 'newEpochEndDate',
        type: 'uint64',
      },
    ],
    name: 'tweakEpochSchedule',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'withdrawNomination',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'withdrawVote',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'voter',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'electionId',
        type: 'uint256',
      },
    ],
    name: 'BallotAlreadyPrepared',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidSnapshotContract',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidWeightType',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'NoPower',
    type: 'error',
  },
  {
    inputs: [],
    name: 'OverflowUint256ToUint128',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint128',
        name: 'snapshotId',
        type: 'uint128',
      },
    ],
    name: 'SnapshotAlreadyTaken',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'snapshotContract',
        type: 'address',
      },
      {
        internalType: 'uint128',
        name: 'electionId',
        type: 'uint128',
      },
    ],
    name: 'SnapshotNotTaken',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'snapshotContract',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'scale',
        type: 'uint256',
      },
    ],
    name: 'ScaleSet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'snapshotContract',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'bool',
        name: 'enabled',
        type: 'bool',
      },
      {
        indexed: false,
        internalType: 'enum SnapshotVotePower.WeightType',
        name: 'weight',
        type: 'uint8',
      },
    ],
    name: 'SnapshotContractSet',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'voter',
        type: 'address',
      },
    ],
    name: 'getPreparedBallot',
    outputs: [
      {
        internalType: 'uint256',
        name: 'power',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'snapshotContract',
        type: 'address',
      },
      {
        internalType: 'uint128',
        name: 'electionId',
        type: 'uint128',
      },
    ],
    name: 'getVotePowerSnapshotId',
    outputs: [
      {
        internalType: 'uint128',
        name: '',
        type: 'uint128',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'snapshotContract',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'voter',
        type: 'address',
      },
    ],
    name: 'prepareBallotWithSnapshot',
    outputs: [
      {
        internalType: 'uint256',
        name: 'votingPower',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'snapshotContract',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'scale',
        type: 'uint256',
      },
    ],
    name: 'setScale',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'snapshotContract',
        type: 'address',
      },
      {
        internalType: 'enum SnapshotVotePower.WeightType',
        name: 'weight',
        type: 'uint8',
      },
      {
        internalType: 'bool',
        name: 'enabled',
        type: 'bool',
      },
    ],
    name: 'setSnapshotContract',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'snapshotContract',
        type: 'address',
      },
    ],
    name: 'takeVotePowerSnapshot',
    outputs: [
      {
        internalType: 'uint128',
        name: 'snapshotId',
        type: 'uint128',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'implementation',
        type: 'address',
      },
    ],
    name: 'ImplementationIsSterile',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NoChange',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'contr',
        type: 'address',
      },
    ],
    name: 'NotAContract',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'addr',
        type: 'address',
      },
    ],
    name: 'NotNominated',
    type: 'error',
  },
  {
    inputs: [],
    name: 'UpgradeSimulationFailed',
    type: 'error',
  },
  {
    inputs: [],
    name: 'ZeroAddress',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'oldOwner',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnerChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnerNominated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'self',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'implementation',
        type: 'address',
      },
    ],
    name: 'Upgraded',
    type: 'event',
  },
  {
    inputs: [],
    name: 'acceptOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getImplementation',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newNominatedOwner',
        type: 'address',
      },
    ],
    name: 'nominateNewOwner',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'nominatedOwner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceNomination',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newImplementation',
        type: 'address',
      },
    ],
    name: 'simulateUpgradeTo',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newImplementation',
        type: 'address',
      },
    ],
    name: 'upgradeTo',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'Council_get_currentElectionId',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'Council_get_initialized',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'Council_jumpToNominationPeriod',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'Council_newElection',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'enum Epoch.ElectionPeriod',
        name: 'period',
        type: 'uint8',
      },
    ],
    name: 'Council_onlyInPeriod',
    outputs: [],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'enum Epoch.ElectionPeriod',
        name: 'period1',
        type: 'uint8',
      },
      {
        internalType: 'enum Epoch.ElectionPeriod',
        name: 'period2',
        type: 'uint8',
      },
    ],
    name: 'Council_onlyInPeriods',
    outputs: [],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'val',
        type: 'uint256',
      },
    ],
    name: 'Council_set_currentElectionId',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bool',
        name: 'val',
        type: 'bool',
      },
    ],
    name: 'Council_set_initialized',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint64',
        name: 'epochStartDate',
        type: 'uint64',
      },
      {
        internalType: 'uint64',
        name: 'nominationPeriodStartDate',
        type: 'uint64',
      },
      {
        internalType: 'uint64',
        name: 'votingPeriodStartDate',
        type: 'uint64',
      },
      {
        internalType: 'uint64',
        name: 'epochEndDate',
        type: 'uint64',
      },
    ],
    name: 'Council_validateEpochSchedule',
    outputs: [],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_load_electionId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '_load_voter',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_load_chainId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'idx',
        type: 'uint256',
      },
    ],
    name: 'Ballot_get_amounts',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_load_electionId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '_load_voter',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_load_chainId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'idx',
        type: 'uint256',
      },
    ],
    name: 'Ballot_get_votedCandidates',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_load_electionId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '_load_voter',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_load_chainId',
        type: 'uint256',
      },
    ],
    name: 'Ballot_get_votingPower',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_load_electionId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '_load_voter',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_load_chainId',
        type: 'uint256',
      },
    ],
    name: 'Ballot_hasVoted',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_load_electionId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '_load_voter',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_load_chainId',
        type: 'uint256',
      },
    ],
    name: 'Ballot_isValid',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_load_electionId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '_load_voter',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_load_chainId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'idx',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'val',
        type: 'uint256',
      },
    ],
    name: 'Ballot_set_amounts',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_load_electionId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '_load_voter',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_load_chainId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'idx',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'val',
        type: 'address',
      },
    ],
    name: 'Ballot_set_votedCandidates',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_load_electionId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '_load_voter',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_load_chainId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'val',
        type: 'uint256',
      },
    ],
    name: 'Ballot_set_votingPower',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_load_electionId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '_load_voter',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_load_chainId',
        type: 'uint256',
      },
    ],
    name: 'Ballot_validate',
    outputs: [],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_load_snapshotContract',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'ballotBalance',
        type: 'uint256',
      },
    ],
    name: 'SnapshotVotePower_calculateVotingPower',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_load_snapshotContract',
        type: 'address',
      },
    ],
    name: 'SnapshotVotePower_get_enabled',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_load_snapshotContract',
        type: 'address',
      },
    ],
    name: 'SnapshotVotePower_get_scale',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_load_snapshotContract',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: 'val',
        type: 'bool',
      },
    ],
    name: 'SnapshotVotePower_set_enabled',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_load_snapshotContract',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'val',
        type: 'uint256',
      },
    ],
    name: 'SnapshotVotePower_set_scale',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_load_epochIndex',
        type: 'uint256',
      },
    ],
    name: 'ElectionSettings_get_epochDuration',
    outputs: [
      {
        internalType: 'uint64',
        name: '',
        type: 'uint64',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_load_epochIndex',
        type: 'uint256',
      },
    ],
    name: 'ElectionSettings_get_epochSeatCount',
    outputs: [
      {
        internalType: 'uint8',
        name: '',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_load_epochIndex',
        type: 'uint256',
      },
    ],
    name: 'ElectionSettings_get_maxDateAdjustmentTolerance',
    outputs: [
      {
        internalType: 'uint64',
        name: '',
        type: 'uint64',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_load_epochIndex',
        type: 'uint256',
      },
    ],
    name: 'ElectionSettings_get_minimumActiveMembers',
    outputs: [
      {
        internalType: 'uint8',
        name: '',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_load_epochIndex',
        type: 'uint256',
      },
    ],
    name: 'ElectionSettings_get_nominationPeriodDuration',
    outputs: [
      {
        internalType: 'uint64',
        name: '',
        type: 'uint64',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_load_epochIndex',
        type: 'uint256',
      },
    ],
    name: 'ElectionSettings_get_votingPeriodDuration',
    outputs: [
      {
        internalType: 'uint64',
        name: '',
        type: 'uint64',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_load_epochIndex',
        type: 'uint256',
      },
    ],
    name: 'ElectionSettings_minimumElectionPeriodDuration',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_load_epochIndex',
        type: 'uint256',
      },
      {
        internalType: 'uint8',
        name: 'epochSeatCount',
        type: 'uint8',
      },
      {
        internalType: 'uint8',
        name: 'minimumActiveMembers',
        type: 'uint8',
      },
      {
        internalType: 'uint64',
        name: 'epochDuration',
        type: 'uint64',
      },
      {
        internalType: 'uint64',
        name: 'nominationPeriodDuration',
        type: 'uint64',
      },
      {
        internalType: 'uint64',
        name: 'votingPeriodDuration',
        type: 'uint64',
      },
      {
        internalType: 'uint64',
        name: 'maxDateAdjustmentTolerance',
        type: 'uint64',
      },
    ],
    name: 'ElectionSettings_setElectionSettings',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_load_epochIndex',
        type: 'uint256',
      },
      {
        internalType: 'uint64',
        name: 'val',
        type: 'uint64',
      },
    ],
    name: 'ElectionSettings_set_epochDuration',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_load_epochIndex',
        type: 'uint256',
      },
      {
        internalType: 'uint8',
        name: 'val',
        type: 'uint8',
      },
    ],
    name: 'ElectionSettings_set_epochSeatCount',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_load_epochIndex',
        type: 'uint256',
      },
      {
        internalType: 'uint64',
        name: 'val',
        type: 'uint64',
      },
    ],
    name: 'ElectionSettings_set_maxDateAdjustmentTolerance',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_load_epochIndex',
        type: 'uint256',
      },
      {
        internalType: 'uint8',
        name: 'val',
        type: 'uint8',
      },
    ],
    name: 'ElectionSettings_set_minimumActiveMembers',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_load_epochIndex',
        type: 'uint256',
      },
      {
        internalType: 'uint64',
        name: 'val',
        type: 'uint64',
      },
    ],
    name: 'ElectionSettings_set_nominationPeriodDuration',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_load_epochIndex',
        type: 'uint256',
      },
      {
        internalType: 'uint64',
        name: 'val',
        type: 'uint64',
      },
    ],
    name: 'ElectionSettings_set_votingPeriodDuration',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_load_epochIndex',
        type: 'uint256',
      },
    ],
    name: 'ElectionSettings_validate',
    outputs: [],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_load_epochIndex',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'idx',
        type: 'address',
      },
    ],
    name: 'Election_get_candidateVoteTotals',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_load_epochIndex',
        type: 'uint256',
      },
    ],
    name: 'Election_get_evaluated',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_load_epochIndex',
        type: 'uint256',
      },
    ],
    name: 'Election_get_numEvaluatedBallots',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_load_epochIndex',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'idx',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'val',
        type: 'uint256',
      },
    ],
    name: 'Election_set_candidateVoteTotals',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_load_epochIndex',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'val',
        type: 'bool',
      },
    ],
    name: 'Election_set_evaluated',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_load_epochIndex',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'val',
        type: 'uint256',
      },
    ],
    name: 'Election_set_numEvaluatedBallots',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_load_epochIndex',
        type: 'uint256',
      },
    ],
    name: 'Epoch_getCurrentPeriod',
    outputs: [
      {
        internalType: 'enum Epoch.ElectionPeriod',
        name: '',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_load_epochIndex',
        type: 'uint256',
      },
    ],
    name: 'Epoch_get_endDate',
    outputs: [
      {
        internalType: 'uint64',
        name: '',
        type: 'uint64',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_load_epochIndex',
        type: 'uint256',
      },
    ],
    name: 'Epoch_get_nominationPeriodStartDate',
    outputs: [
      {
        internalType: 'uint64',
        name: '',
        type: 'uint64',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_load_epochIndex',
        type: 'uint256',
      },
    ],
    name: 'Epoch_get_startDate',
    outputs: [
      {
        internalType: 'uint64',
        name: '',
        type: 'uint64',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_load_epochIndex',
        type: 'uint256',
      },
    ],
    name: 'Epoch_get_votingPeriodStartDate',
    outputs: [
      {
        internalType: 'uint64',
        name: '',
        type: 'uint64',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_load_epochIndex',
        type: 'uint256',
      },
      {
        internalType: 'uint64',
        name: 'startDate',
        type: 'uint64',
      },
      {
        internalType: 'uint64',
        name: 'nominationPeriodStartDate',
        type: 'uint64',
      },
      {
        internalType: 'uint64',
        name: 'votingPeriodStartDate',
        type: 'uint64',
      },
      {
        internalType: 'uint64',
        name: 'endDate',
        type: 'uint64',
      },
    ],
    name: 'Epoch_setEpochDates',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_load_epochIndex',
        type: 'uint256',
      },
      {
        internalType: 'uint64',
        name: 'val',
        type: 'uint64',
      },
    ],
    name: 'Epoch_set_endDate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_load_epochIndex',
        type: 'uint256',
      },
      {
        internalType: 'uint64',
        name: 'val',
        type: 'uint64',
      },
    ],
    name: 'Epoch_set_nominationPeriodStartDate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_load_epochIndex',
        type: 'uint256',
      },
      {
        internalType: 'uint64',
        name: 'val',
        type: 'uint64',
      },
    ],
    name: 'Epoch_set_startDate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_load_epochIndex',
        type: 'uint256',
      },
      {
        internalType: 'uint64',
        name: 'val',
        type: 'uint64',
      },
    ],
    name: 'Epoch_set_votingPeriodStartDate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
