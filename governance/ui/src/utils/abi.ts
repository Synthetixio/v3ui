export const electionModuleABITest = [];

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
    inputs: [],
    name: 'OverflowUint256ToUint64',
    type: 'error',
  },
  {
    inputs: [],
    name: 'ValueAlreadyInSet',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint64',
        name: 'newChainId',
        type: 'uint64',
      },
    ],
    name: 'NewSupportedCrossChainNetwork',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'ccipRouter',
        type: 'address',
      },
    ],
    name: 'configureChainlinkCrossChain',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint64[]',
        name: 'supportedNetworks',
        type: 'uint64[]',
      },
      {
        internalType: 'uint64[]',
        name: 'ccipSelectors',
        type: 'uint64[]',
      },
    ],
    name: 'setSupportedCrossChainNetworks',
    outputs: [
      {
        internalType: 'uint256',
        name: 'numRegistered',
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
    inputs: [
      {
        internalType: 'uint256',
        name: 'requiredAmount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'availableAmount',
        type: 'uint256',
      },
    ],
    name: 'InsufficientCcipFee',
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
      {
        indexed: false,
        internalType: 'address[]',
        name: 'candidates',
        type: 'address[]',
      },
    ],
    name: 'VoteWithdrawn',
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
      {
        internalType: 'address[]',
        name: 'candidates',
        type: 'address[]',
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
    stateMutability: 'nonpayable',
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
    inputs: [],
    name: 'resolve',
    outputs: [],
    stateMutability: 'payable',
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
    stateMutability: 'nonpayable',
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
    inputs: [
      {
        internalType: 'address[]',
        name: 'candidates',
        type: 'address[]',
      },
    ],
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
        name: 'power',
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
    name: 'InvalidMessage',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'NotCcipRouter',
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
    inputs: [
      {
        components: [
          {
            internalType: 'bytes32',
            name: 'messageId',
            type: 'bytes32',
          },
          {
            internalType: 'uint64',
            name: 'sourceChainSelector',
            type: 'uint64',
          },
          {
            internalType: 'bytes',
            name: 'sender',
            type: 'bytes',
          },
          {
            internalType: 'bytes',
            name: 'data',
            type: 'bytes',
          },
          {
            components: [
              {
                internalType: 'address',
                name: 'token',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
              },
            ],
            internalType: 'struct CcipClient.EVMTokenAmount[]',
            name: 'tokenAmounts',
            type: 'tuple[]',
          },
        ],
        internalType: 'struct CcipClient.Any2EVMMessage',
        name: 'message',
        type: 'tuple',
      },
    ],
    name: 'ccipReceive',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
