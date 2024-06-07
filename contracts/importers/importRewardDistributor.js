const abi = [
  'constructor(address rewardManager_, uint128 poolId_, address collateralType_, address payoutToken_, uint8 payoutTokenDecimals_, string name_)',
  'function SYSTEM_PRECISION() view returns (uint256)',
  'function collateralType() view returns (address)',
  'function distributeRewards(uint128 poolId_, address collateralType_, uint256 amount_, uint64 start_, uint32 duration_)',
  'function name() view returns (string)',
  'function onPositionUpdated(uint128, uint128, address, uint256)',
  'function payout(uint128, uint128 poolId_, address collateralType_, address payoutTarget_, uint256 payoutAmount_) returns (bool)',
  'function payoutToken() view returns (address)',
  'function poolId() view returns (uint128)',
  'function precision() view returns (uint256)',
  'function rewardManager() view returns (address)',
  'function rewardsAmount() view returns (uint256)',
  'function setShouldFailPayout(bool shouldFailPayout_)',
  'function shouldFailPayout() view returns (bool)',
  'function supportsInterface(bytes4 interfaceId) view returns (bool)',
  'function token() view returns (address)',
  'error FailedTransfer(address from, address to, uint256 value)',
  'error InvalidParameter(string parameter, string reason)',
  'error NotEnoughBalance(uint256 amountRequested, uint256 currentBalance)',
  'error NotEnoughRewardsLeft(uint256 amountRequested, uint256 amountLeft)',
  'error Unauthorized(address addr)',
];

export async function importRewardDistributor(chainId, preset) {
  if (!preset) {
    throw new Error(`Missing preset`);
  }
  switch (`${chainId}-${preset}`) {
    case '1-main': {
      return { address: null, abi };
    }
    case '11155111-main': {
      return { address: null, abi };
    }
    case '10-main': {
      return { address: null, abi };
    }
    case '8453-andromeda': {
      return { address: null, abi };
    }
    case '84532-andromeda': {
      return { address: null, abi };
    }
    case '42161-main': {
      return { address: null, abi };
    }
    case '421614-main': {
      return { address: null, abi };
    }
    case '42161-arbthetix': {
      return { address: null, abi };
    }
    default: {
      throw new Error(`Unsupported chain ${chainId} for RewardsDistributor`);
    }
  }
}
