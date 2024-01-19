// !!! DO NOT EDIT !!! Automatically generated file

export const address = '0x3a0B49f5B93a95453BdaCfc3653E15F982A0187A';
export const abi = [
  'error ImplementationIsSterile(address implementation)',
  'error NoChange()',
  'error NotAContract(address contr)',
  'error NotNominated(address addr)',
  'error Unauthorized(address addr)',
  'error UpgradeSimulationFailed()',
  'error ZeroAddress()',
  'event OwnerChanged(address oldOwner, address newOwner)',
  'event OwnerNominated(address newOwner)',
  'event Upgraded(address indexed self, address implementation)',
  'function acceptOwnership()',
  'function getImplementation() view returns (address)',
  'function nominateNewOwner(address newNominatedOwner)',
  'function nominatedOwner() view returns (address)',
  'function owner() view returns (address)',
  'function renounceNomination()',
  'function simulateUpgradeTo(address newImplementation)',
  'function upgradeTo(address newImplementation)',
  'error ValueAlreadyInSet()',
  'error ValueNotInSet()',
  'event FeatureFlagAllowAllSet(bytes32 indexed feature, bool allowAll)',
  'event FeatureFlagAllowlistAdded(bytes32 indexed feature, address account)',
  'event FeatureFlagAllowlistRemoved(bytes32 indexed feature, address account)',
  'event FeatureFlagDeniersReset(bytes32 indexed feature, address[] deniers)',
  'event FeatureFlagDenyAllSet(bytes32 indexed feature, bool denyAll)',
  'function addToFeatureFlagAllowlist(bytes32 feature, address account)',
  'function getDeniers(bytes32 feature) view returns (address[])',
  'function getFeatureFlagAllowAll(bytes32 feature) view returns (bool)',
  'function getFeatureFlagAllowlist(bytes32 feature) view returns (address[])',
  'function getFeatureFlagDenyAll(bytes32 feature) view returns (bool)',
  'function isFeatureAllowed(bytes32 feature, address account) view returns (bool)',
  'function removeFromFeatureFlagAllowlist(bytes32 feature, address account)',
  'function setDeniers(bytes32 feature, address[] deniers)',
  'function setFeatureFlagAllowAll(bytes32 feature, bool allowAll)',
  'function setFeatureFlagDenyAll(bytes32 feature, bool denyAll)',
  'error FeatureUnavailable(bytes32 which)',
  'error InvalidAccountId(uint128 accountId)',
  'error InvalidPermission(bytes32 permission)',
  'error OnlyAccountTokenProxy(address origin)',
  'error PermissionDenied(uint128 accountId, bytes32 permission, address target)',
  'error PermissionNotGranted(uint128 accountId, bytes32 permission, address user)',
  'error PositionOutOfBounds()',
  'event AccountCreated(uint128 indexed accountId, address indexed owner)',
  'event PermissionGranted(uint128 indexed accountId, bytes32 indexed permission, address indexed user, address sender)',
  'event PermissionRevoked(uint128 indexed accountId, bytes32 indexed permission, address indexed user, address sender)',
  'function createAccount() returns (uint128 accountId)',
  'function createAccount(uint128 requestedAccountId)',
  'function getAccountLastInteraction(uint128 accountId) view returns (uint256)',
  'function getAccountOwner(uint128 accountId) view returns (address)',
  'function getAccountPermissions(uint128 accountId) view returns (tuple(address user, bytes32[] permissions)[] accountPerms)',
  'function getAccountTokenAddress() view returns (address)',
  'function grantPermission(uint128 accountId, bytes32 permission, address user)',
  'function hasPermission(uint128 accountId, bytes32 permission, address user) view returns (bool)',
  'function isAuthorized(uint128 accountId, bytes32 permission, address user) view returns (bool)',
  'function notifyAccountTransfer(address to, uint128 accountId)',
  'function renouncePermission(uint128 accountId, bytes32 permission)',
  'function revokePermission(uint128 accountId, bytes32 permission, address user)',
  'error AccountNotFound(uint128 accountId)',
  'error EmptyDistribution()',
  'error InsufficientCollateralRatio(uint256 collateralValue, uint256 debt, uint256 ratio, uint256 minRatio)',
  'error MarketNotFound(uint128 marketId)',
  'error NotFundedByPool(uint256 marketId, uint256 poolId)',
  'error OverflowInt256ToInt128()',
  'error OverflowInt256ToUint256()',
  'error OverflowUint128ToInt128()',
  'error OverflowUint256ToInt256()',
  'error OverflowUint256ToUint128()',
  'event DebtAssociated(uint128 indexed marketId, uint128 indexed poolId, address indexed collateralType, uint128 accountId, uint256 amount, int256 updatedDebt)',
  'function associateDebt(uint128 marketId, uint128 poolId, address collateralType, uint128 accountId, uint256 amount) returns (int256)',
  'error MismatchAssociatedSystemKind(bytes32 expected, bytes32 actual)',
  'error MissingAssociatedSystem(bytes32 id)',
  'event AssociatedSystemSet(bytes32 indexed kind, bytes32 indexed id, address proxy, address impl)',
  'function getAssociatedSystem(bytes32 id) view returns (address addr, bytes32 kind)',
  'function initOrUpgradeNft(bytes32 id, string name, string symbol, string uri, address impl)',
  'function initOrUpgradeToken(bytes32 id, string name, string symbol, uint8 decimals, address impl)',
  'function registerUnmanagedSystem(bytes32 id, address endpoint)',
  'error InvalidMessage()',
  'error NotCcipRouter(address)',
  'error UnsupportedNetwork(uint64)',
  'function ccipReceive(tuple(bytes32 messageId, uint64 sourceChainSelector, bytes sender, bytes data, tuple(address token, uint256 amount)[] tokenAmounts) message)',
  'error AccountActivityTimeoutPending(uint128 accountId, uint256 currentTime, uint256 requiredTime)',
  'error CollateralDepositDisabled(address collateralType)',
  'error CollateralNotFound()',
  'error FailedTransfer(address from, address to, uint256 value)',
  'error InsufficentAvailableCollateral(uint256 amountAvailableForDelegationD18, uint256 amountD18)',
  'error InsufficientAccountCollateral(uint256 amount)',
  'error InsufficientAllowance(uint256 required, uint256 existing)',
  'error InvalidParameter(string parameter, string reason)',
  'error OverflowUint256ToUint64()',
  'error PrecisionLost(uint256 tokenAmount, uint8 decimals)',
  'event CollateralLockCreated(uint128 indexed accountId, address indexed collateralType, uint256 tokenAmount, uint64 expireTimestamp)',
  'event CollateralLockExpired(uint128 indexed accountId, address indexed collateralType, uint256 tokenAmount, uint64 expireTimestamp)',
  'event Deposited(uint128 indexed accountId, address indexed collateralType, uint256 tokenAmount, address indexed sender)',
  'event Withdrawn(uint128 indexed accountId, address indexed collateralType, uint256 tokenAmount, address indexed sender)',
  'function cleanExpiredLocks(uint128 accountId, address collateralType, uint256 offset, uint256 count) returns (uint256 cleared)',
  'function createLock(uint128 accountId, address collateralType, uint256 amount, uint64 expireTimestamp)',
  'function deposit(uint128 accountId, address collateralType, uint256 tokenAmount)',
  'function getAccountAvailableCollateral(uint128 accountId, address collateralType) view returns (uint256)',
  'function getAccountCollateral(uint128 accountId, address collateralType) view returns (uint256 totalDeposited, uint256 totalAssigned, uint256 totalLocked)',
  'function getLocks(uint128 accountId, address collateralType, uint256 offset, uint256 count) view returns (tuple(uint128 amountD18, uint64 lockExpirationTime)[] locks)',
  'function withdraw(uint128 accountId, address collateralType, uint256 tokenAmount)',
  'event CollateralConfigured(address indexed collateralType, tuple(bool depositingEnabled, uint256 issuanceRatioD18, uint256 liquidationRatioD18, uint256 liquidationRewardD18, bytes32 oracleNodeId, address tokenAddress, uint256 minDelegationD18) config)',
  'function configureCollateral(tuple(bool depositingEnabled, uint256 issuanceRatioD18, uint256 liquidationRatioD18, uint256 liquidationRewardD18, bytes32 oracleNodeId, address tokenAddress, uint256 minDelegationD18) config)',
  'function getCollateralConfiguration(address collateralType) pure returns (tuple(bool depositingEnabled, uint256 issuanceRatioD18, uint256 liquidationRatioD18, uint256 liquidationRewardD18, bytes32 oracleNodeId, address tokenAddress, uint256 minDelegationD18))',
  'function getCollateralConfigurations(bool hideDisabled) view returns (tuple(bool depositingEnabled, uint256 issuanceRatioD18, uint256 liquidationRatioD18, uint256 liquidationRewardD18, bytes32 oracleNodeId, address tokenAddress, uint256 minDelegationD18)[])',
  'function getCollateralPrice(address collateralType) view returns (uint256)',
  'error InsufficientCcipFee(uint256 requiredAmount, uint256 availableAmount)',
  'event TransferCrossChainInitiated(uint64 indexed destChainId, uint256 indexed amount, address sender)',
  'function transferCrossChain(uint64 destChainId, uint256 amount) payable returns (uint256 gasTokenUsed)',
  'error InsufficientDebt(int256 currentDebt)',
  'error PoolNotFound(uint128 poolId)',
  'event IssuanceFeePaid(uint128 indexed accountId, uint128 indexed poolId, address collateralType, uint256 feeAmount)',
  'event UsdBurned(uint128 indexed accountId, uint128 indexed poolId, address collateralType, uint256 amount, address indexed sender)',
  'event UsdMinted(uint128 indexed accountId, uint128 indexed poolId, address collateralType, uint256 amount, address indexed sender)',
  'function burnUsd(uint128 accountId, uint128 poolId, address collateralType, uint256 amount)',
  'function mintUsd(uint128 accountId, uint128 poolId, address collateralType, uint256 amount)',
  'error CannotScaleEmptyMapping()',
  'error IneligibleForLiquidation(uint256 collateralValue, int256 debt, uint256 currentCRatio, uint256 cratio)',
  'error InsufficientMappedAmount()',
  'error MustBeVaultLiquidated()',
  'error OverflowInt128ToUint128()',
  'event Liquidation(uint128 indexed accountId, uint128 indexed poolId, address indexed collateralType, tuple(uint256 debtLiquidated, uint256 collateralLiquidated, uint256 amountRewarded) liquidationData, uint128 liquidateAsAccountId, address sender)',
  'event VaultLiquidation(uint128 indexed poolId, address indexed collateralType, tuple(uint256 debtLiquidated, uint256 collateralLiquidated, uint256 amountRewarded) liquidationData, uint128 liquidateAsAccountId, address sender)',
  'function isPositionLiquidatable(uint128 accountId, uint128 poolId, address collateralType) returns (bool)',
  'function isVaultLiquidatable(uint128 poolId, address collateralType) returns (bool)',
  'function liquidate(uint128 accountId, uint128 poolId, address collateralType, uint128 liquidateAsAccountId) returns (tuple(uint256 debtLiquidated, uint256 collateralLiquidated, uint256 amountRewarded) liquidationData)',
  'function liquidateVault(uint128 poolId, address collateralType, uint128 liquidateAsAccountId, uint256 maxUsd) returns (tuple(uint256 debtLiquidated, uint256 collateralLiquidated, uint256 amountRewarded) liquidationData)',
  'error InsufficientMarketCollateralDepositable(uint128 marketId, address collateralType, uint256 tokenAmountToDeposit)',
  'error InsufficientMarketCollateralWithdrawable(uint128 marketId, address collateralType, uint256 tokenAmountToWithdraw)',
  'event MarketCollateralDeposited(uint128 indexed marketId, address indexed collateralType, uint256 tokenAmount, address indexed sender)',
  'event MarketCollateralWithdrawn(uint128 indexed marketId, address indexed collateralType, uint256 tokenAmount, address indexed sender)',
  'event MaximumMarketCollateralConfigured(uint128 indexed marketId, address indexed collateralType, uint256 systemAmount, address indexed owner)',
  'function configureMaximumMarketCollateral(uint128 marketId, address collateralType, uint256 amount)',
  'function depositMarketCollateral(uint128 marketId, address collateralType, uint256 tokenAmount)',
  'function getMarketCollateralAmount(uint128 marketId, address collateralType) view returns (uint256 collateralAmountD18)',
  'function getMarketCollateralValue(uint128 marketId) view returns (uint256)',
  'function getMaximumMarketCollateral(uint128 marketId, address collateralType) view returns (uint256)',
  'function withdrawMarketCollateral(uint128 marketId, address collateralType, uint256 tokenAmount)',
  'error IncorrectMarketInterface(address market)',
  'error NotEnoughLiquidity(uint128 marketId, uint256 amount)',
  'event MarketRegistered(address indexed market, uint128 indexed marketId, address indexed sender)',
  'event MarketSystemFeePaid(uint128 indexed marketId, uint256 feeAmount)',
  'event MarketUsdDeposited(uint128 indexed marketId, address indexed target, uint256 amount, address indexed market)',
  'event MarketUsdWithdrawn(uint128 indexed marketId, address indexed target, uint256 amount, address indexed market)',
  'event SetMarketMinLiquidityRatio(uint128 indexed marketId, uint256 minLiquidityRatio)',
  'event SetMinDelegateTime(uint128 indexed marketId, uint32 minDelegateTime)',
  'function depositMarketUsd(uint128 marketId, address target, uint256 amount) returns (uint256 feeAmount)',
  'function distributeDebtToPools(uint128 marketId, uint256 maxIter) returns (bool)',
  'function getMarketAddress(uint128 marketId) view returns (address)',
  'function getMarketCollateral(uint128 marketId) view returns (uint256)',
  'function getMarketDebtPerShare(uint128 marketId) returns (int256)',
  'function getMarketFees(uint128, uint256 amount) view returns (uint256 depositFeeAmount, uint256 withdrawFeeAmount)',
  'function getMarketMinDelegateTime(uint128 marketId) view returns (uint32)',
  'function getMarketNetIssuance(uint128 marketId) view returns (int128)',
  'function getMarketPoolDebtDistribution(uint128 marketId, uint128 poolId) returns (uint256 sharesD18, uint128 totalSharesD18, int128 valuePerShareD27)',
  'function getMarketPools(uint128 marketId) returns (uint128[] inRangePoolIds, uint128[] outRangePoolIds)',
  'function getMarketReportedDebt(uint128 marketId) view returns (uint256)',
  'function getMarketTotalDebt(uint128 marketId) view returns (int256)',
  'function getMinLiquidityRatio(uint128 marketId) view returns (uint256)',
  'function getOracleManager() view returns (address)',
  'function getUsdToken() view returns (address)',
  'function getWithdrawableMarketUsd(uint128 marketId) view returns (uint256)',
  'function isMarketCapacityLocked(uint128 marketId) view returns (bool)',
  'function registerMarket(address market) returns (uint128 marketId)',
  'function setMarketMinDelegateTime(uint128 marketId, uint32 minDelegateTime)',
  'function setMinLiquidityRatio(uint128 marketId, uint256 minLiquidityRatio)',
  'function withdrawMarketUsd(uint128 marketId, address target, uint256 amount) returns (uint256 feeAmount)',
  'error DeniedMulticallTarget(address)',
  'error RecursiveMulticall(address)',
  'function getMessageSender() view returns (address)',
  'function multicall(bytes[] data) returns (bytes[] results)',
  'function multicallThrough(address[] to, bytes[] data, uint256[] values) payable returns (bytes[] results)',
  'function setAllowlistedMulticallTarget(address target, bool allowlisted)',
  'event PoolApprovedAdded(uint256 poolId)',
  'event PoolApprovedRemoved(uint256 poolId)',
  'event PreferredPoolSet(uint256 poolId)',
  'function addApprovedPool(uint128 poolId)',
  'function getApprovedPools() view returns (uint256[])',
  'function getPreferredPool() view returns (uint128)',
  'function removeApprovedPool(uint128 poolId)',
  'function setPreferredPool(uint128 poolId)',
  'error CapacityLocked(uint256 marketId)',
  'error MinDelegationTimeoutPending(uint128 poolId, uint32 timeRemaining)',
  'error PoolAlreadyExists(uint128 poolId)',
  'event PoolCollateralConfigurationUpdated(uint128 indexed poolId, address collateralType, tuple(uint256 collateralLimitD18, uint256 issuanceRatioD18) config)',
  'event PoolCollateralDisabledByDefaultSet(uint128 poolId, bool disabled)',
  'event PoolConfigurationSet(uint128 indexed poolId, tuple(uint128 marketId, uint128 weightD18, int128 maxDebtShareValueD18)[] markets, address indexed sender)',
  'event PoolCreated(uint128 indexed poolId, address indexed owner, address indexed sender)',
  'event PoolNameUpdated(uint128 indexed poolId, string name, address indexed sender)',
  'event PoolNominationRenounced(uint128 indexed poolId, address indexed owner)',
  'event PoolNominationRevoked(uint128 indexed poolId, address indexed owner)',
  'event PoolOwnerNominated(uint128 indexed poolId, address indexed nominatedOwner, address indexed owner)',
  'event PoolOwnershipAccepted(uint128 indexed poolId, address indexed owner)',
  'event SetMinLiquidityRatio(uint256 minLiquidityRatio)',
  'function acceptPoolOwnership(uint128 poolId)',
  'function createPool(uint128 requestedPoolId, address owner)',
  'function getMinLiquidityRatio() view returns (uint256)',
  'function getNominatedPoolOwner(uint128 poolId) view returns (address)',
  'function getPoolCollateralIssuanceRatio(uint128 poolId, address collateral) view returns (uint256)',
  'function getPoolConfiguration(uint128 poolId) view returns (tuple(uint128 marketId, uint128 weightD18, int128 maxDebtShareValueD18)[])',
  'function getPoolName(uint128 poolId) view returns (string poolName)',
  'function getPoolOwner(uint128 poolId) view returns (address)',
  'function nominatePoolOwner(address nominatedOwner, uint128 poolId)',
  'function rebalancePool(uint128 poolId, address optionalCollateralType)',
  'function renouncePoolNomination(uint128 poolId)',
  'function revokePoolNomination(uint128 poolId)',
  'function setMinLiquidityRatio(uint256 minLiquidityRatio)',
  'function setPoolCollateralConfiguration(uint128 poolId, address collateralType, tuple(uint256 collateralLimitD18, uint256 issuanceRatioD18) newConfig)',
  'function setPoolCollateralDisabledByDefault(uint128 poolId, bool disabled)',
  'function setPoolConfiguration(uint128 poolId, tuple(uint128 marketId, uint128 weightD18, int128 maxDebtShareValueD18)[] newMarketConfigurations)',
  'function setPoolName(uint128 poolId, string name)',
  'error OverflowUint256ToUint32()',
  'error OverflowUint32ToInt32()',
  'error OverflowUint64ToInt64()',
  'error RewardDistributorNotFound()',
  'error RewardUnavailable(address distributor)',
  'event RewardsClaimed(uint128 indexed accountId, uint128 indexed poolId, address indexed collateralType, address distributor, uint256 amount)',
  'event RewardsDistributed(uint128 indexed poolId, address indexed collateralType, address distributor, uint256 amount, uint256 start, uint256 duration)',
  'event RewardsDistributorRegistered(uint128 indexed poolId, address indexed collateralType, address indexed distributor)',
  'event RewardsDistributorRemoved(uint128 indexed poolId, address indexed collateralType, address indexed distributor)',
  'function claimRewards(uint128 accountId, uint128 poolId, address collateralType, address distributor) returns (uint256)',
  'function distributeRewards(uint128 poolId, address collateralType, uint256 amount, uint64 start, uint32 duration)',
  'function getRewardRate(uint128 poolId, address collateralType, address distributor) view returns (uint256)',
  'function registerRewardsDistributor(uint128 poolId, address collateralType, address distributor)',
  'function removeRewardsDistributor(uint128 poolId, address collateralType, address distributor)',
  'function updateRewards(uint128 poolId, address collateralType, uint128 accountId) returns (uint256[], address[])',
  'event NewSupportedCrossChainNetwork(uint64 newChainId)',
  'function configureChainlinkCrossChain(address ccipRouter, address ccipTokenPool)',
  'function configureOracleManager(address oracleManagerAddress)',
  'function getConfig(bytes32 k) view returns (bytes32 v)',
  'function getConfigAddress(bytes32 k) view returns (address v)',
  'function getConfigUint(bytes32 k) view returns (uint256 v)',
  'function setConfig(bytes32 k, bytes32 v)',
  'function setSupportedCrossChainNetworks(uint64[] supportedNetworks, uint64[] ccipSelectors) returns (uint256 numRegistered)',
  'function supportsInterface(bytes4 interfaceId) view returns (bool)',
  'error InsufficientDelegation(uint256 minDelegation)',
  'error InvalidCollateralAmount()',
  'error InvalidLeverage(uint256 leverage)',
  'error PoolCollateralLimitExceeded(uint128 poolId, address collateralType, uint256 currentCollateral, uint256 maxCollateral)',
  'event DelegationUpdated(uint128 indexed accountId, uint128 indexed poolId, address collateralType, uint256 amount, uint256 leverage, address indexed sender)',
  'function delegateCollateral(uint128 accountId, uint128 poolId, address collateralType, uint256 newCollateralAmountD18, uint256 leverage)',
  'function getPosition(uint128 accountId, uint128 poolId, address collateralType) returns (uint256 collateralAmount, uint256 collateralValue, int256 debt, uint256 collateralizationRatio)',
  'function getPositionCollateral(uint128 accountId, uint128 poolId, address collateralType) view returns (uint256 amount, uint256 value)',
  'function getPositionCollateralRatio(uint128 accountId, uint128 poolId, address collateralType) returns (uint256)',
  'function getPositionDebt(uint128 accountId, uint128 poolId, address collateralType) returns (int256 debt)',
  'function getVaultCollateral(uint128 poolId, address collateralType) view returns (uint256 amount, uint256 value)',
  'function getVaultCollateralRatio(uint128 poolId, address collateralType) returns (uint256)',
  'function getVaultDebt(uint128 poolId, address collateralType) returns (int256)',
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
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from 'ethers';
import type { FunctionFragment, Result, EventFragment } from '@ethersproject/abi';
import type { Listener, Provider } from '@ethersproject/providers';
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from './common';

export declare namespace IAccountModule {
  export type AccountPermissionsStruct = { user: string; permissions: BytesLike[] };

  export type AccountPermissionsStructOutput = [string, string[]] & {
    user: string;
    permissions: string[];
  };
}

export declare namespace CcipClient {
  export type EVMTokenAmountStruct = { token: string; amount: BigNumberish };

  export type EVMTokenAmountStructOutput = [string, BigNumber] & {
    token: string;
    amount: BigNumber;
  };

  export type Any2EVMMessageStruct = {
    messageId: BytesLike;
    sourceChainSelector: BigNumberish;
    sender: BytesLike;
    data: BytesLike;
    tokenAmounts: CcipClient.EVMTokenAmountStruct[];
  };

  export type Any2EVMMessageStructOutput = [
    string,
    BigNumber,
    string,
    string,
    CcipClient.EVMTokenAmountStructOutput[]
  ] & {
    messageId: string;
    sourceChainSelector: BigNumber;
    sender: string;
    data: string;
    tokenAmounts: CcipClient.EVMTokenAmountStructOutput[];
  };
}

export declare namespace CollateralLock {
  export type DataStruct = { amountD18: BigNumberish; lockExpirationTime: BigNumberish };

  export type DataStructOutput = [BigNumber, BigNumber] & {
    amountD18: BigNumber;
    lockExpirationTime: BigNumber;
  };
}

export declare namespace CollateralConfiguration {
  export type DataStruct = {
    depositingEnabled: boolean;
    issuanceRatioD18: BigNumberish;
    liquidationRatioD18: BigNumberish;
    liquidationRewardD18: BigNumberish;
    oracleNodeId: BytesLike;
    tokenAddress: string;
    minDelegationD18: BigNumberish;
  };

  export type DataStructOutput = [
    boolean,
    BigNumber,
    BigNumber,
    BigNumber,
    string,
    string,
    BigNumber
  ] & {
    depositingEnabled: boolean;
    issuanceRatioD18: BigNumber;
    liquidationRatioD18: BigNumber;
    liquidationRewardD18: BigNumber;
    oracleNodeId: string;
    tokenAddress: string;
    minDelegationD18: BigNumber;
  };
}

export declare namespace ILiquidationModule {
  export type LiquidationDataStruct = {
    debtLiquidated: BigNumberish;
    collateralLiquidated: BigNumberish;
    amountRewarded: BigNumberish;
  };

  export type LiquidationDataStructOutput = [BigNumber, BigNumber, BigNumber] & {
    debtLiquidated: BigNumber;
    collateralLiquidated: BigNumber;
    amountRewarded: BigNumber;
  };
}

export declare namespace PoolCollateralConfiguration {
  export type DataStruct = { collateralLimitD18: BigNumberish; issuanceRatioD18: BigNumberish };

  export type DataStructOutput = [BigNumber, BigNumber] & {
    collateralLimitD18: BigNumber;
    issuanceRatioD18: BigNumber;
  };
}

export declare namespace MarketConfiguration {
  export type DataStruct = {
    marketId: BigNumberish;
    weightD18: BigNumberish;
    maxDebtShareValueD18: BigNumberish;
  };

  export type DataStructOutput = [BigNumber, BigNumber, BigNumber] & {
    marketId: BigNumber;
    weightD18: BigNumber;
    maxDebtShareValueD18: BigNumber;
  };
}

export interface CoreProxyInterface extends utils.Interface {
  functions: {
    'acceptOwnership()': FunctionFragment;
    'getImplementation()': FunctionFragment;
    'nominateNewOwner(address)': FunctionFragment;
    'nominatedOwner()': FunctionFragment;
    'owner()': FunctionFragment;
    'renounceNomination()': FunctionFragment;
    'simulateUpgradeTo(address)': FunctionFragment;
    'upgradeTo(address)': FunctionFragment;
    'addToFeatureFlagAllowlist(bytes32,address)': FunctionFragment;
    'getDeniers(bytes32)': FunctionFragment;
    'getFeatureFlagAllowAll(bytes32)': FunctionFragment;
    'getFeatureFlagAllowlist(bytes32)': FunctionFragment;
    'getFeatureFlagDenyAll(bytes32)': FunctionFragment;
    'isFeatureAllowed(bytes32,address)': FunctionFragment;
    'removeFromFeatureFlagAllowlist(bytes32,address)': FunctionFragment;
    'setDeniers(bytes32,address[])': FunctionFragment;
    'setFeatureFlagAllowAll(bytes32,bool)': FunctionFragment;
    'setFeatureFlagDenyAll(bytes32,bool)': FunctionFragment;
    'createAccount()': FunctionFragment;
    'createAccount(uint128)': FunctionFragment;
    'getAccountLastInteraction(uint128)': FunctionFragment;
    'getAccountOwner(uint128)': FunctionFragment;
    'getAccountPermissions(uint128)': FunctionFragment;
    'getAccountTokenAddress()': FunctionFragment;
    'grantPermission(uint128,bytes32,address)': FunctionFragment;
    'hasPermission(uint128,bytes32,address)': FunctionFragment;
    'isAuthorized(uint128,bytes32,address)': FunctionFragment;
    'notifyAccountTransfer(address,uint128)': FunctionFragment;
    'renouncePermission(uint128,bytes32)': FunctionFragment;
    'revokePermission(uint128,bytes32,address)': FunctionFragment;
    'associateDebt(uint128,uint128,address,uint128,uint256)': FunctionFragment;
    'getAssociatedSystem(bytes32)': FunctionFragment;
    'initOrUpgradeNft(bytes32,string,string,string,address)': FunctionFragment;
    'initOrUpgradeToken(bytes32,string,string,uint8,address)': FunctionFragment;
    'registerUnmanagedSystem(bytes32,address)': FunctionFragment;
    'ccipReceive((bytes32,uint64,bytes,bytes,(address,uint256)[]))': FunctionFragment;
    'cleanExpiredLocks(uint128,address,uint256,uint256)': FunctionFragment;
    'createLock(uint128,address,uint256,uint64)': FunctionFragment;
    'deposit(uint128,address,uint256)': FunctionFragment;
    'getAccountAvailableCollateral(uint128,address)': FunctionFragment;
    'getAccountCollateral(uint128,address)': FunctionFragment;
    'getLocks(uint128,address,uint256,uint256)': FunctionFragment;
    'withdraw(uint128,address,uint256)': FunctionFragment;
    'configureCollateral((bool,uint256,uint256,uint256,bytes32,address,uint256))': FunctionFragment;
    'getCollateralConfiguration(address)': FunctionFragment;
    'getCollateralConfigurations(bool)': FunctionFragment;
    'getCollateralPrice(address)': FunctionFragment;
    'transferCrossChain(uint64,uint256)': FunctionFragment;
    'burnUsd(uint128,uint128,address,uint256)': FunctionFragment;
    'mintUsd(uint128,uint128,address,uint256)': FunctionFragment;
    'isPositionLiquidatable(uint128,uint128,address)': FunctionFragment;
    'isVaultLiquidatable(uint128,address)': FunctionFragment;
    'liquidate(uint128,uint128,address,uint128)': FunctionFragment;
    'liquidateVault(uint128,address,uint128,uint256)': FunctionFragment;
    'configureMaximumMarketCollateral(uint128,address,uint256)': FunctionFragment;
    'depositMarketCollateral(uint128,address,uint256)': FunctionFragment;
    'getMarketCollateralAmount(uint128,address)': FunctionFragment;
    'getMarketCollateralValue(uint128)': FunctionFragment;
    'getMaximumMarketCollateral(uint128,address)': FunctionFragment;
    'withdrawMarketCollateral(uint128,address,uint256)': FunctionFragment;
    'depositMarketUsd(uint128,address,uint256)': FunctionFragment;
    'distributeDebtToPools(uint128,uint256)': FunctionFragment;
    'getMarketAddress(uint128)': FunctionFragment;
    'getMarketCollateral(uint128)': FunctionFragment;
    'getMarketDebtPerShare(uint128)': FunctionFragment;
    'getMarketFees(uint128,uint256)': FunctionFragment;
    'getMarketMinDelegateTime(uint128)': FunctionFragment;
    'getMarketNetIssuance(uint128)': FunctionFragment;
    'getMarketPoolDebtDistribution(uint128,uint128)': FunctionFragment;
    'getMarketPools(uint128)': FunctionFragment;
    'getMarketReportedDebt(uint128)': FunctionFragment;
    'getMarketTotalDebt(uint128)': FunctionFragment;
    'getMinLiquidityRatio(uint128)': FunctionFragment;
    'getMinLiquidityRatio()': FunctionFragment;
    'getOracleManager()': FunctionFragment;
    'getUsdToken()': FunctionFragment;
    'getWithdrawableMarketUsd(uint128)': FunctionFragment;
    'isMarketCapacityLocked(uint128)': FunctionFragment;
    'registerMarket(address)': FunctionFragment;
    'setMarketMinDelegateTime(uint128,uint32)': FunctionFragment;
    'setMinLiquidityRatio(uint128,uint256)': FunctionFragment;
    'setMinLiquidityRatio(uint256)': FunctionFragment;
    'withdrawMarketUsd(uint128,address,uint256)': FunctionFragment;
    'getMessageSender()': FunctionFragment;
    'multicall(bytes[])': FunctionFragment;
    'multicallThrough(address[],bytes[],uint256[])': FunctionFragment;
    'setAllowlistedMulticallTarget(address,bool)': FunctionFragment;
    'addApprovedPool(uint128)': FunctionFragment;
    'getApprovedPools()': FunctionFragment;
    'getPreferredPool()': FunctionFragment;
    'removeApprovedPool(uint128)': FunctionFragment;
    'setPreferredPool(uint128)': FunctionFragment;
    'acceptPoolOwnership(uint128)': FunctionFragment;
    'createPool(uint128,address)': FunctionFragment;
    'getNominatedPoolOwner(uint128)': FunctionFragment;
    'getPoolCollateralIssuanceRatio(uint128,address)': FunctionFragment;
    'getPoolConfiguration(uint128)': FunctionFragment;
    'getPoolName(uint128)': FunctionFragment;
    'getPoolOwner(uint128)': FunctionFragment;
    'nominatePoolOwner(address,uint128)': FunctionFragment;
    'rebalancePool(uint128,address)': FunctionFragment;
    'renouncePoolNomination(uint128)': FunctionFragment;
    'revokePoolNomination(uint128)': FunctionFragment;
    'setPoolCollateralConfiguration(uint128,address,(uint256,uint256))': FunctionFragment;
    'setPoolCollateralDisabledByDefault(uint128,bool)': FunctionFragment;
    'setPoolConfiguration(uint128,(uint128,uint128,int128)[])': FunctionFragment;
    'setPoolName(uint128,string)': FunctionFragment;
    'claimRewards(uint128,uint128,address,address)': FunctionFragment;
    'distributeRewards(uint128,address,uint256,uint64,uint32)': FunctionFragment;
    'getRewardRate(uint128,address,address)': FunctionFragment;
    'registerRewardsDistributor(uint128,address,address)': FunctionFragment;
    'removeRewardsDistributor(uint128,address,address)': FunctionFragment;
    'updateRewards(uint128,address,uint128)': FunctionFragment;
    'configureChainlinkCrossChain(address,address)': FunctionFragment;
    'configureOracleManager(address)': FunctionFragment;
    'getConfig(bytes32)': FunctionFragment;
    'getConfigAddress(bytes32)': FunctionFragment;
    'getConfigUint(bytes32)': FunctionFragment;
    'setConfig(bytes32,bytes32)': FunctionFragment;
    'setSupportedCrossChainNetworks(uint64[],uint64[])': FunctionFragment;
    'supportsInterface(bytes4)': FunctionFragment;
    'delegateCollateral(uint128,uint128,address,uint256,uint256)': FunctionFragment;
    'getPosition(uint128,uint128,address)': FunctionFragment;
    'getPositionCollateral(uint128,uint128,address)': FunctionFragment;
    'getPositionCollateralRatio(uint128,uint128,address)': FunctionFragment;
    'getPositionDebt(uint128,uint128,address)': FunctionFragment;
    'getVaultCollateral(uint128,address)': FunctionFragment;
    'getVaultCollateralRatio(uint128,address)': FunctionFragment;
    'getVaultDebt(uint128,address)': FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | 'acceptOwnership'
      | 'getImplementation'
      | 'nominateNewOwner'
      | 'nominatedOwner'
      | 'owner'
      | 'renounceNomination'
      | 'simulateUpgradeTo'
      | 'upgradeTo'
      | 'addToFeatureFlagAllowlist'
      | 'getDeniers'
      | 'getFeatureFlagAllowAll'
      | 'getFeatureFlagAllowlist'
      | 'getFeatureFlagDenyAll'
      | 'isFeatureAllowed'
      | 'removeFromFeatureFlagAllowlist'
      | 'setDeniers'
      | 'setFeatureFlagAllowAll'
      | 'setFeatureFlagDenyAll'
      | 'createAccount()'
      | 'createAccount(uint128)'
      | 'getAccountLastInteraction'
      | 'getAccountOwner'
      | 'getAccountPermissions'
      | 'getAccountTokenAddress'
      | 'grantPermission'
      | 'hasPermission'
      | 'isAuthorized'
      | 'notifyAccountTransfer'
      | 'renouncePermission'
      | 'revokePermission'
      | 'associateDebt'
      | 'getAssociatedSystem'
      | 'initOrUpgradeNft'
      | 'initOrUpgradeToken'
      | 'registerUnmanagedSystem'
      | 'ccipReceive'
      | 'cleanExpiredLocks'
      | 'createLock'
      | 'deposit'
      | 'getAccountAvailableCollateral'
      | 'getAccountCollateral'
      | 'getLocks'
      | 'withdraw'
      | 'configureCollateral'
      | 'getCollateralConfiguration'
      | 'getCollateralConfigurations'
      | 'getCollateralPrice'
      | 'transferCrossChain'
      | 'burnUsd'
      | 'mintUsd'
      | 'isPositionLiquidatable'
      | 'isVaultLiquidatable'
      | 'liquidate'
      | 'liquidateVault'
      | 'configureMaximumMarketCollateral'
      | 'depositMarketCollateral'
      | 'getMarketCollateralAmount'
      | 'getMarketCollateralValue'
      | 'getMaximumMarketCollateral'
      | 'withdrawMarketCollateral'
      | 'depositMarketUsd'
      | 'distributeDebtToPools'
      | 'getMarketAddress'
      | 'getMarketCollateral'
      | 'getMarketDebtPerShare'
      | 'getMarketFees'
      | 'getMarketMinDelegateTime'
      | 'getMarketNetIssuance'
      | 'getMarketPoolDebtDistribution'
      | 'getMarketPools'
      | 'getMarketReportedDebt'
      | 'getMarketTotalDebt'
      | 'getMinLiquidityRatio(uint128)'
      | 'getMinLiquidityRatio()'
      | 'getOracleManager'
      | 'getUsdToken'
      | 'getWithdrawableMarketUsd'
      | 'isMarketCapacityLocked'
      | 'registerMarket'
      | 'setMarketMinDelegateTime'
      | 'setMinLiquidityRatio(uint128,uint256)'
      | 'setMinLiquidityRatio(uint256)'
      | 'withdrawMarketUsd'
      | 'getMessageSender'
      | 'multicall'
      | 'multicallThrough'
      | 'setAllowlistedMulticallTarget'
      | 'addApprovedPool'
      | 'getApprovedPools'
      | 'getPreferredPool'
      | 'removeApprovedPool'
      | 'setPreferredPool'
      | 'acceptPoolOwnership'
      | 'createPool'
      | 'getNominatedPoolOwner'
      | 'getPoolCollateralIssuanceRatio'
      | 'getPoolConfiguration'
      | 'getPoolName'
      | 'getPoolOwner'
      | 'nominatePoolOwner'
      | 'rebalancePool'
      | 'renouncePoolNomination'
      | 'revokePoolNomination'
      | 'setPoolCollateralConfiguration'
      | 'setPoolCollateralDisabledByDefault'
      | 'setPoolConfiguration'
      | 'setPoolName'
      | 'claimRewards'
      | 'distributeRewards'
      | 'getRewardRate'
      | 'registerRewardsDistributor'
      | 'removeRewardsDistributor'
      | 'updateRewards'
      | 'configureChainlinkCrossChain'
      | 'configureOracleManager'
      | 'getConfig'
      | 'getConfigAddress'
      | 'getConfigUint'
      | 'setConfig'
      | 'setSupportedCrossChainNetworks'
      | 'supportsInterface'
      | 'delegateCollateral'
      | 'getPosition'
      | 'getPositionCollateral'
      | 'getPositionCollateralRatio'
      | 'getPositionDebt'
      | 'getVaultCollateral'
      | 'getVaultCollateralRatio'
      | 'getVaultDebt'
  ): FunctionFragment;

  encodeFunctionData(functionFragment: 'acceptOwnership', values?: undefined): string;
  encodeFunctionData(functionFragment: 'getImplementation', values?: undefined): string;
  encodeFunctionData(functionFragment: 'nominateNewOwner', values: [string]): string;
  encodeFunctionData(functionFragment: 'nominatedOwner', values?: undefined): string;
  encodeFunctionData(functionFragment: 'owner', values?: undefined): string;
  encodeFunctionData(functionFragment: 'renounceNomination', values?: undefined): string;
  encodeFunctionData(functionFragment: 'simulateUpgradeTo', values: [string]): string;
  encodeFunctionData(functionFragment: 'upgradeTo', values: [string]): string;
  encodeFunctionData(
    functionFragment: 'addToFeatureFlagAllowlist',
    values: [BytesLike, string]
  ): string;
  encodeFunctionData(functionFragment: 'getDeniers', values: [BytesLike]): string;
  encodeFunctionData(functionFragment: 'getFeatureFlagAllowAll', values: [BytesLike]): string;
  encodeFunctionData(functionFragment: 'getFeatureFlagAllowlist', values: [BytesLike]): string;
  encodeFunctionData(functionFragment: 'getFeatureFlagDenyAll', values: [BytesLike]): string;
  encodeFunctionData(functionFragment: 'isFeatureAllowed', values: [BytesLike, string]): string;
  encodeFunctionData(
    functionFragment: 'removeFromFeatureFlagAllowlist',
    values: [BytesLike, string]
  ): string;
  encodeFunctionData(functionFragment: 'setDeniers', values: [BytesLike, string[]]): string;
  encodeFunctionData(
    functionFragment: 'setFeatureFlagAllowAll',
    values: [BytesLike, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: 'setFeatureFlagDenyAll',
    values: [BytesLike, boolean]
  ): string;
  encodeFunctionData(functionFragment: 'createAccount()', values?: undefined): string;
  encodeFunctionData(functionFragment: 'createAccount(uint128)', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'getAccountLastInteraction', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'getAccountOwner', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'getAccountPermissions', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'getAccountTokenAddress', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'grantPermission',
    values: [BigNumberish, BytesLike, string]
  ): string;
  encodeFunctionData(
    functionFragment: 'hasPermission',
    values: [BigNumberish, BytesLike, string]
  ): string;
  encodeFunctionData(
    functionFragment: 'isAuthorized',
    values: [BigNumberish, BytesLike, string]
  ): string;
  encodeFunctionData(
    functionFragment: 'notifyAccountTransfer',
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: 'renouncePermission',
    values: [BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: 'revokePermission',
    values: [BigNumberish, BytesLike, string]
  ): string;
  encodeFunctionData(
    functionFragment: 'associateDebt',
    values: [BigNumberish, BigNumberish, string, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: 'getAssociatedSystem', values: [BytesLike]): string;
  encodeFunctionData(
    functionFragment: 'initOrUpgradeNft',
    values: [BytesLike, string, string, string, string]
  ): string;
  encodeFunctionData(
    functionFragment: 'initOrUpgradeToken',
    values: [BytesLike, string, string, BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: 'registerUnmanagedSystem',
    values: [BytesLike, string]
  ): string;
  encodeFunctionData(
    functionFragment: 'ccipReceive',
    values: [CcipClient.Any2EVMMessageStruct]
  ): string;
  encodeFunctionData(
    functionFragment: 'cleanExpiredLocks',
    values: [BigNumberish, string, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: 'createLock',
    values: [BigNumberish, string, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: 'deposit',
    values: [BigNumberish, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: 'getAccountAvailableCollateral',
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: 'getAccountCollateral',
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: 'getLocks',
    values: [BigNumberish, string, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: 'withdraw',
    values: [BigNumberish, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: 'configureCollateral',
    values: [CollateralConfiguration.DataStruct]
  ): string;
  encodeFunctionData(functionFragment: 'getCollateralConfiguration', values: [string]): string;
  encodeFunctionData(functionFragment: 'getCollateralConfigurations', values: [boolean]): string;
  encodeFunctionData(functionFragment: 'getCollateralPrice', values: [string]): string;
  encodeFunctionData(
    functionFragment: 'transferCrossChain',
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: 'burnUsd',
    values: [BigNumberish, BigNumberish, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: 'mintUsd',
    values: [BigNumberish, BigNumberish, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: 'isPositionLiquidatable',
    values: [BigNumberish, BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: 'isVaultLiquidatable',
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: 'liquidate',
    values: [BigNumberish, BigNumberish, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: 'liquidateVault',
    values: [BigNumberish, string, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: 'configureMaximumMarketCollateral',
    values: [BigNumberish, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: 'depositMarketCollateral',
    values: [BigNumberish, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: 'getMarketCollateralAmount',
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(functionFragment: 'getMarketCollateralValue', values: [BigNumberish]): string;
  encodeFunctionData(
    functionFragment: 'getMaximumMarketCollateral',
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: 'withdrawMarketCollateral',
    values: [BigNumberish, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: 'depositMarketUsd',
    values: [BigNumberish, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: 'distributeDebtToPools',
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: 'getMarketAddress', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'getMarketCollateral', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'getMarketDebtPerShare', values: [BigNumberish]): string;
  encodeFunctionData(
    functionFragment: 'getMarketFees',
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: 'getMarketMinDelegateTime', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'getMarketNetIssuance', values: [BigNumberish]): string;
  encodeFunctionData(
    functionFragment: 'getMarketPoolDebtDistribution',
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: 'getMarketPools', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'getMarketReportedDebt', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'getMarketTotalDebt', values: [BigNumberish]): string;
  encodeFunctionData(
    functionFragment: 'getMinLiquidityRatio(uint128)',
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: 'getMinLiquidityRatio()', values?: undefined): string;
  encodeFunctionData(functionFragment: 'getOracleManager', values?: undefined): string;
  encodeFunctionData(functionFragment: 'getUsdToken', values?: undefined): string;
  encodeFunctionData(functionFragment: 'getWithdrawableMarketUsd', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'isMarketCapacityLocked', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'registerMarket', values: [string]): string;
  encodeFunctionData(
    functionFragment: 'setMarketMinDelegateTime',
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: 'setMinLiquidityRatio(uint128,uint256)',
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: 'setMinLiquidityRatio(uint256)',
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: 'withdrawMarketUsd',
    values: [BigNumberish, string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: 'getMessageSender', values?: undefined): string;
  encodeFunctionData(functionFragment: 'multicall', values: [BytesLike[]]): string;
  encodeFunctionData(
    functionFragment: 'multicallThrough',
    values: [string[], BytesLike[], BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: 'setAllowlistedMulticallTarget',
    values: [string, boolean]
  ): string;
  encodeFunctionData(functionFragment: 'addApprovedPool', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'getApprovedPools', values?: undefined): string;
  encodeFunctionData(functionFragment: 'getPreferredPool', values?: undefined): string;
  encodeFunctionData(functionFragment: 'removeApprovedPool', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'setPreferredPool', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'acceptPoolOwnership', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'createPool', values: [BigNumberish, string]): string;
  encodeFunctionData(functionFragment: 'getNominatedPoolOwner', values: [BigNumberish]): string;
  encodeFunctionData(
    functionFragment: 'getPoolCollateralIssuanceRatio',
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(functionFragment: 'getPoolConfiguration', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'getPoolName', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'getPoolOwner', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'nominatePoolOwner', values: [string, BigNumberish]): string;
  encodeFunctionData(functionFragment: 'rebalancePool', values: [BigNumberish, string]): string;
  encodeFunctionData(functionFragment: 'renouncePoolNomination', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'revokePoolNomination', values: [BigNumberish]): string;
  encodeFunctionData(
    functionFragment: 'setPoolCollateralConfiguration',
    values: [BigNumberish, string, PoolCollateralConfiguration.DataStruct]
  ): string;
  encodeFunctionData(
    functionFragment: 'setPoolCollateralDisabledByDefault',
    values: [BigNumberish, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: 'setPoolConfiguration',
    values: [BigNumberish, MarketConfiguration.DataStruct[]]
  ): string;
  encodeFunctionData(functionFragment: 'setPoolName', values: [BigNumberish, string]): string;
  encodeFunctionData(
    functionFragment: 'claimRewards',
    values: [BigNumberish, BigNumberish, string, string]
  ): string;
  encodeFunctionData(
    functionFragment: 'distributeRewards',
    values: [BigNumberish, string, BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: 'getRewardRate',
    values: [BigNumberish, string, string]
  ): string;
  encodeFunctionData(
    functionFragment: 'registerRewardsDistributor',
    values: [BigNumberish, string, string]
  ): string;
  encodeFunctionData(
    functionFragment: 'removeRewardsDistributor',
    values: [BigNumberish, string, string]
  ): string;
  encodeFunctionData(
    functionFragment: 'updateRewards',
    values: [BigNumberish, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: 'configureChainlinkCrossChain',
    values: [string, string]
  ): string;
  encodeFunctionData(functionFragment: 'configureOracleManager', values: [string]): string;
  encodeFunctionData(functionFragment: 'getConfig', values: [BytesLike]): string;
  encodeFunctionData(functionFragment: 'getConfigAddress', values: [BytesLike]): string;
  encodeFunctionData(functionFragment: 'getConfigUint', values: [BytesLike]): string;
  encodeFunctionData(functionFragment: 'setConfig', values: [BytesLike, BytesLike]): string;
  encodeFunctionData(
    functionFragment: 'setSupportedCrossChainNetworks',
    values: [BigNumberish[], BigNumberish[]]
  ): string;
  encodeFunctionData(functionFragment: 'supportsInterface', values: [BytesLike]): string;
  encodeFunctionData(
    functionFragment: 'delegateCollateral',
    values: [BigNumberish, BigNumberish, string, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: 'getPosition',
    values: [BigNumberish, BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: 'getPositionCollateral',
    values: [BigNumberish, BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: 'getPositionCollateralRatio',
    values: [BigNumberish, BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: 'getPositionDebt',
    values: [BigNumberish, BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: 'getVaultCollateral',
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: 'getVaultCollateralRatio',
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(functionFragment: 'getVaultDebt', values: [BigNumberish, string]): string;

  decodeFunctionResult(functionFragment: 'acceptOwnership', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getImplementation', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'nominateNewOwner', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'nominatedOwner', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'owner', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'renounceNomination', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'simulateUpgradeTo', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'upgradeTo', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'addToFeatureFlagAllowlist', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getDeniers', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getFeatureFlagAllowAll', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getFeatureFlagAllowlist', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getFeatureFlagDenyAll', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'isFeatureAllowed', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'removeFromFeatureFlagAllowlist', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setDeniers', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setFeatureFlagAllowAll', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setFeatureFlagDenyAll', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'createAccount()', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'createAccount(uint128)', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getAccountLastInteraction', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getAccountOwner', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getAccountPermissions', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getAccountTokenAddress', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'grantPermission', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'hasPermission', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'isAuthorized', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'notifyAccountTransfer', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'renouncePermission', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'revokePermission', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'associateDebt', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getAssociatedSystem', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'initOrUpgradeNft', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'initOrUpgradeToken', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'registerUnmanagedSystem', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'ccipReceive', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'cleanExpiredLocks', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'createLock', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'deposit', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getAccountAvailableCollateral', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getAccountCollateral', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getLocks', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'withdraw', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'configureCollateral', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getCollateralConfiguration', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getCollateralConfigurations', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getCollateralPrice', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'transferCrossChain', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'burnUsd', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'mintUsd', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'isPositionLiquidatable', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'isVaultLiquidatable', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'liquidate', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'liquidateVault', data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: 'configureMaximumMarketCollateral',
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: 'depositMarketCollateral', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getMarketCollateralAmount', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getMarketCollateralValue', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getMaximumMarketCollateral', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'withdrawMarketCollateral', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'depositMarketUsd', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'distributeDebtToPools', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getMarketAddress', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getMarketCollateral', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getMarketDebtPerShare', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getMarketFees', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getMarketMinDelegateTime', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getMarketNetIssuance', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getMarketPoolDebtDistribution', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getMarketPools', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getMarketReportedDebt', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getMarketTotalDebt', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getMinLiquidityRatio(uint128)', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getMinLiquidityRatio()', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getOracleManager', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getUsdToken', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getWithdrawableMarketUsd', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'isMarketCapacityLocked', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'registerMarket', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setMarketMinDelegateTime', data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: 'setMinLiquidityRatio(uint128,uint256)',
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: 'setMinLiquidityRatio(uint256)', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'withdrawMarketUsd', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getMessageSender', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'multicall', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'multicallThrough', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setAllowlistedMulticallTarget', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'addApprovedPool', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getApprovedPools', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getPreferredPool', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'removeApprovedPool', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setPreferredPool', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'acceptPoolOwnership', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'createPool', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getNominatedPoolOwner', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getPoolCollateralIssuanceRatio', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getPoolConfiguration', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getPoolName', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getPoolOwner', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'nominatePoolOwner', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'rebalancePool', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'renouncePoolNomination', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'revokePoolNomination', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setPoolCollateralConfiguration', data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: 'setPoolCollateralDisabledByDefault',
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: 'setPoolConfiguration', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setPoolName', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'claimRewards', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'distributeRewards', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getRewardRate', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'registerRewardsDistributor', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'removeRewardsDistributor', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'updateRewards', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'configureChainlinkCrossChain', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'configureOracleManager', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getConfig', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getConfigAddress', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getConfigUint', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setConfig', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setSupportedCrossChainNetworks', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'supportsInterface', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'delegateCollateral', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getPosition', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getPositionCollateral', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getPositionCollateralRatio', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getPositionDebt', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getVaultCollateral', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getVaultCollateralRatio', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getVaultDebt', data: BytesLike): Result;

  events: {
    'OwnerChanged(address,address)': EventFragment;
    'OwnerNominated(address)': EventFragment;
    'Upgraded(address,address)': EventFragment;
    'FeatureFlagAllowAllSet(bytes32,bool)': EventFragment;
    'FeatureFlagAllowlistAdded(bytes32,address)': EventFragment;
    'FeatureFlagAllowlistRemoved(bytes32,address)': EventFragment;
    'FeatureFlagDeniersReset(bytes32,address[])': EventFragment;
    'FeatureFlagDenyAllSet(bytes32,bool)': EventFragment;
    'AccountCreated(uint128,address)': EventFragment;
    'PermissionGranted(uint128,bytes32,address,address)': EventFragment;
    'PermissionRevoked(uint128,bytes32,address,address)': EventFragment;
    'DebtAssociated(uint128,uint128,address,uint128,uint256,int256)': EventFragment;
    'AssociatedSystemSet(bytes32,bytes32,address,address)': EventFragment;
    'CollateralLockCreated(uint128,address,uint256,uint64)': EventFragment;
    'CollateralLockExpired(uint128,address,uint256,uint64)': EventFragment;
    'Deposited(uint128,address,uint256,address)': EventFragment;
    'Withdrawn(uint128,address,uint256,address)': EventFragment;
    'CollateralConfigured(address,(bool,uint256,uint256,uint256,bytes32,address,uint256))': EventFragment;
    'TransferCrossChainInitiated(uint64,uint256,address)': EventFragment;
    'IssuanceFeePaid(uint128,uint128,address,uint256)': EventFragment;
    'UsdBurned(uint128,uint128,address,uint256,address)': EventFragment;
    'UsdMinted(uint128,uint128,address,uint256,address)': EventFragment;
    'Liquidation(uint128,uint128,address,(uint256,uint256,uint256),uint128,address)': EventFragment;
    'VaultLiquidation(uint128,address,(uint256,uint256,uint256),uint128,address)': EventFragment;
    'MarketCollateralDeposited(uint128,address,uint256,address)': EventFragment;
    'MarketCollateralWithdrawn(uint128,address,uint256,address)': EventFragment;
    'MaximumMarketCollateralConfigured(uint128,address,uint256,address)': EventFragment;
    'MarketRegistered(address,uint128,address)': EventFragment;
    'MarketSystemFeePaid(uint128,uint256)': EventFragment;
    'MarketUsdDeposited(uint128,address,uint256,address)': EventFragment;
    'MarketUsdWithdrawn(uint128,address,uint256,address)': EventFragment;
    'SetMarketMinLiquidityRatio(uint128,uint256)': EventFragment;
    'SetMinDelegateTime(uint128,uint32)': EventFragment;
    'PoolApprovedAdded(uint256)': EventFragment;
    'PoolApprovedRemoved(uint256)': EventFragment;
    'PreferredPoolSet(uint256)': EventFragment;
    'PoolCollateralConfigurationUpdated(uint128,address,(uint256,uint256))': EventFragment;
    'PoolCollateralDisabledByDefaultSet(uint128,bool)': EventFragment;
    'PoolConfigurationSet(uint128,(uint128,uint128,int128)[],address)': EventFragment;
    'PoolCreated(uint128,address,address)': EventFragment;
    'PoolNameUpdated(uint128,string,address)': EventFragment;
    'PoolNominationRenounced(uint128,address)': EventFragment;
    'PoolNominationRevoked(uint128,address)': EventFragment;
    'PoolOwnerNominated(uint128,address,address)': EventFragment;
    'PoolOwnershipAccepted(uint128,address)': EventFragment;
    'SetMinLiquidityRatio(uint256)': EventFragment;
    'RewardsClaimed(uint128,uint128,address,address,uint256)': EventFragment;
    'RewardsDistributed(uint128,address,address,uint256,uint256,uint256)': EventFragment;
    'RewardsDistributorRegistered(uint128,address,address)': EventFragment;
    'RewardsDistributorRemoved(uint128,address,address)': EventFragment;
    'NewSupportedCrossChainNetwork(uint64)': EventFragment;
    'DelegationUpdated(uint128,uint128,address,uint256,uint256,address)': EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: 'OwnerChanged'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'OwnerNominated'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'Upgraded'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'FeatureFlagAllowAllSet'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'FeatureFlagAllowlistAdded'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'FeatureFlagAllowlistRemoved'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'FeatureFlagDeniersReset'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'FeatureFlagDenyAllSet'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'AccountCreated'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'PermissionGranted'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'PermissionRevoked'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'DebtAssociated'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'AssociatedSystemSet'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'CollateralLockCreated'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'CollateralLockExpired'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'Deposited'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'Withdrawn'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'CollateralConfigured'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'TransferCrossChainInitiated'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'IssuanceFeePaid'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'UsdBurned'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'UsdMinted'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'Liquidation'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'VaultLiquidation'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'MarketCollateralDeposited'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'MarketCollateralWithdrawn'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'MaximumMarketCollateralConfigured'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'MarketRegistered'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'MarketSystemFeePaid'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'MarketUsdDeposited'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'MarketUsdWithdrawn'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'SetMarketMinLiquidityRatio'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'SetMinDelegateTime'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'PoolApprovedAdded'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'PoolApprovedRemoved'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'PreferredPoolSet'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'PoolCollateralConfigurationUpdated'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'PoolCollateralDisabledByDefaultSet'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'PoolConfigurationSet'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'PoolCreated'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'PoolNameUpdated'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'PoolNominationRenounced'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'PoolNominationRevoked'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'PoolOwnerNominated'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'PoolOwnershipAccepted'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'SetMinLiquidityRatio'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'RewardsClaimed'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'RewardsDistributed'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'RewardsDistributorRegistered'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'RewardsDistributorRemoved'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'NewSupportedCrossChainNetwork'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'DelegationUpdated'): EventFragment;
}

export interface OwnerChangedEventObject {
  oldOwner: string;
  newOwner: string;
}
export type OwnerChangedEvent = TypedEvent<[string, string], OwnerChangedEventObject>;

export type OwnerChangedEventFilter = TypedEventFilter<OwnerChangedEvent>;

export interface OwnerNominatedEventObject {
  newOwner: string;
}
export type OwnerNominatedEvent = TypedEvent<[string], OwnerNominatedEventObject>;

export type OwnerNominatedEventFilter = TypedEventFilter<OwnerNominatedEvent>;

export interface UpgradedEventObject {
  self: string;
  implementation: string;
}
export type UpgradedEvent = TypedEvent<[string, string], UpgradedEventObject>;

export type UpgradedEventFilter = TypedEventFilter<UpgradedEvent>;

export interface FeatureFlagAllowAllSetEventObject {
  feature: string;
  allowAll: boolean;
}
export type FeatureFlagAllowAllSetEvent = TypedEvent<
  [string, boolean],
  FeatureFlagAllowAllSetEventObject
>;

export type FeatureFlagAllowAllSetEventFilter = TypedEventFilter<FeatureFlagAllowAllSetEvent>;

export interface FeatureFlagAllowlistAddedEventObject {
  feature: string;
  account: string;
}
export type FeatureFlagAllowlistAddedEvent = TypedEvent<
  [string, string],
  FeatureFlagAllowlistAddedEventObject
>;

export type FeatureFlagAllowlistAddedEventFilter = TypedEventFilter<FeatureFlagAllowlistAddedEvent>;

export interface FeatureFlagAllowlistRemovedEventObject {
  feature: string;
  account: string;
}
export type FeatureFlagAllowlistRemovedEvent = TypedEvent<
  [string, string],
  FeatureFlagAllowlistRemovedEventObject
>;

export type FeatureFlagAllowlistRemovedEventFilter =
  TypedEventFilter<FeatureFlagAllowlistRemovedEvent>;

export interface FeatureFlagDeniersResetEventObject {
  feature: string;
  deniers: string[];
}
export type FeatureFlagDeniersResetEvent = TypedEvent<
  [string, string[]],
  FeatureFlagDeniersResetEventObject
>;

export type FeatureFlagDeniersResetEventFilter = TypedEventFilter<FeatureFlagDeniersResetEvent>;

export interface FeatureFlagDenyAllSetEventObject {
  feature: string;
  denyAll: boolean;
}
export type FeatureFlagDenyAllSetEvent = TypedEvent<
  [string, boolean],
  FeatureFlagDenyAllSetEventObject
>;

export type FeatureFlagDenyAllSetEventFilter = TypedEventFilter<FeatureFlagDenyAllSetEvent>;

export interface AccountCreatedEventObject {
  accountId: BigNumber;
  owner: string;
}
export type AccountCreatedEvent = TypedEvent<[BigNumber, string], AccountCreatedEventObject>;

export type AccountCreatedEventFilter = TypedEventFilter<AccountCreatedEvent>;

export interface PermissionGrantedEventObject {
  accountId: BigNumber;
  permission: string;
  user: string;
  sender: string;
}
export type PermissionGrantedEvent = TypedEvent<
  [BigNumber, string, string, string],
  PermissionGrantedEventObject
>;

export type PermissionGrantedEventFilter = TypedEventFilter<PermissionGrantedEvent>;

export interface PermissionRevokedEventObject {
  accountId: BigNumber;
  permission: string;
  user: string;
  sender: string;
}
export type PermissionRevokedEvent = TypedEvent<
  [BigNumber, string, string, string],
  PermissionRevokedEventObject
>;

export type PermissionRevokedEventFilter = TypedEventFilter<PermissionRevokedEvent>;

export interface DebtAssociatedEventObject {
  marketId: BigNumber;
  poolId: BigNumber;
  collateralType: string;
  accountId: BigNumber;
  amount: BigNumber;
  updatedDebt: BigNumber;
}
export type DebtAssociatedEvent = TypedEvent<
  [BigNumber, BigNumber, string, BigNumber, BigNumber, BigNumber],
  DebtAssociatedEventObject
>;

export type DebtAssociatedEventFilter = TypedEventFilter<DebtAssociatedEvent>;

export interface AssociatedSystemSetEventObject {
  kind: string;
  id: string;
  proxy: string;
  impl: string;
}
export type AssociatedSystemSetEvent = TypedEvent<
  [string, string, string, string],
  AssociatedSystemSetEventObject
>;

export type AssociatedSystemSetEventFilter = TypedEventFilter<AssociatedSystemSetEvent>;

export interface CollateralLockCreatedEventObject {
  accountId: BigNumber;
  collateralType: string;
  tokenAmount: BigNumber;
  expireTimestamp: BigNumber;
}
export type CollateralLockCreatedEvent = TypedEvent<
  [BigNumber, string, BigNumber, BigNumber],
  CollateralLockCreatedEventObject
>;

export type CollateralLockCreatedEventFilter = TypedEventFilter<CollateralLockCreatedEvent>;

export interface CollateralLockExpiredEventObject {
  accountId: BigNumber;
  collateralType: string;
  tokenAmount: BigNumber;
  expireTimestamp: BigNumber;
}
export type CollateralLockExpiredEvent = TypedEvent<
  [BigNumber, string, BigNumber, BigNumber],
  CollateralLockExpiredEventObject
>;

export type CollateralLockExpiredEventFilter = TypedEventFilter<CollateralLockExpiredEvent>;

export interface DepositedEventObject {
  accountId: BigNumber;
  collateralType: string;
  tokenAmount: BigNumber;
  sender: string;
}
export type DepositedEvent = TypedEvent<
  [BigNumber, string, BigNumber, string],
  DepositedEventObject
>;

export type DepositedEventFilter = TypedEventFilter<DepositedEvent>;

export interface WithdrawnEventObject {
  accountId: BigNumber;
  collateralType: string;
  tokenAmount: BigNumber;
  sender: string;
}
export type WithdrawnEvent = TypedEvent<
  [BigNumber, string, BigNumber, string],
  WithdrawnEventObject
>;

export type WithdrawnEventFilter = TypedEventFilter<WithdrawnEvent>;

export interface CollateralConfiguredEventObject {
  collateralType: string;
  config: CollateralConfiguration.DataStructOutput;
}
export type CollateralConfiguredEvent = TypedEvent<
  [string, CollateralConfiguration.DataStructOutput],
  CollateralConfiguredEventObject
>;

export type CollateralConfiguredEventFilter = TypedEventFilter<CollateralConfiguredEvent>;

export interface TransferCrossChainInitiatedEventObject {
  destChainId: BigNumber;
  amount: BigNumber;
  sender: string;
}
export type TransferCrossChainInitiatedEvent = TypedEvent<
  [BigNumber, BigNumber, string],
  TransferCrossChainInitiatedEventObject
>;

export type TransferCrossChainInitiatedEventFilter =
  TypedEventFilter<TransferCrossChainInitiatedEvent>;

export interface IssuanceFeePaidEventObject {
  accountId: BigNumber;
  poolId: BigNumber;
  collateralType: string;
  feeAmount: BigNumber;
}
export type IssuanceFeePaidEvent = TypedEvent<
  [BigNumber, BigNumber, string, BigNumber],
  IssuanceFeePaidEventObject
>;

export type IssuanceFeePaidEventFilter = TypedEventFilter<IssuanceFeePaidEvent>;

export interface UsdBurnedEventObject {
  accountId: BigNumber;
  poolId: BigNumber;
  collateralType: string;
  amount: BigNumber;
  sender: string;
}
export type UsdBurnedEvent = TypedEvent<
  [BigNumber, BigNumber, string, BigNumber, string],
  UsdBurnedEventObject
>;

export type UsdBurnedEventFilter = TypedEventFilter<UsdBurnedEvent>;

export interface UsdMintedEventObject {
  accountId: BigNumber;
  poolId: BigNumber;
  collateralType: string;
  amount: BigNumber;
  sender: string;
}
export type UsdMintedEvent = TypedEvent<
  [BigNumber, BigNumber, string, BigNumber, string],
  UsdMintedEventObject
>;

export type UsdMintedEventFilter = TypedEventFilter<UsdMintedEvent>;

export interface LiquidationEventObject {
  accountId: BigNumber;
  poolId: BigNumber;
  collateralType: string;
  liquidationData: ILiquidationModule.LiquidationDataStructOutput;
  liquidateAsAccountId: BigNumber;
  sender: string;
}
export type LiquidationEvent = TypedEvent<
  [BigNumber, BigNumber, string, ILiquidationModule.LiquidationDataStructOutput, BigNumber, string],
  LiquidationEventObject
>;

export type LiquidationEventFilter = TypedEventFilter<LiquidationEvent>;

export interface VaultLiquidationEventObject {
  poolId: BigNumber;
  collateralType: string;
  liquidationData: ILiquidationModule.LiquidationDataStructOutput;
  liquidateAsAccountId: BigNumber;
  sender: string;
}
export type VaultLiquidationEvent = TypedEvent<
  [BigNumber, string, ILiquidationModule.LiquidationDataStructOutput, BigNumber, string],
  VaultLiquidationEventObject
>;

export type VaultLiquidationEventFilter = TypedEventFilter<VaultLiquidationEvent>;

export interface MarketCollateralDepositedEventObject {
  marketId: BigNumber;
  collateralType: string;
  tokenAmount: BigNumber;
  sender: string;
}
export type MarketCollateralDepositedEvent = TypedEvent<
  [BigNumber, string, BigNumber, string],
  MarketCollateralDepositedEventObject
>;

export type MarketCollateralDepositedEventFilter = TypedEventFilter<MarketCollateralDepositedEvent>;

export interface MarketCollateralWithdrawnEventObject {
  marketId: BigNumber;
  collateralType: string;
  tokenAmount: BigNumber;
  sender: string;
}
export type MarketCollateralWithdrawnEvent = TypedEvent<
  [BigNumber, string, BigNumber, string],
  MarketCollateralWithdrawnEventObject
>;

export type MarketCollateralWithdrawnEventFilter = TypedEventFilter<MarketCollateralWithdrawnEvent>;

export interface MaximumMarketCollateralConfiguredEventObject {
  marketId: BigNumber;
  collateralType: string;
  systemAmount: BigNumber;
  owner: string;
}
export type MaximumMarketCollateralConfiguredEvent = TypedEvent<
  [BigNumber, string, BigNumber, string],
  MaximumMarketCollateralConfiguredEventObject
>;

export type MaximumMarketCollateralConfiguredEventFilter =
  TypedEventFilter<MaximumMarketCollateralConfiguredEvent>;

export interface MarketRegisteredEventObject {
  market: string;
  marketId: BigNumber;
  sender: string;
}
export type MarketRegisteredEvent = TypedEvent<
  [string, BigNumber, string],
  MarketRegisteredEventObject
>;

export type MarketRegisteredEventFilter = TypedEventFilter<MarketRegisteredEvent>;

export interface MarketSystemFeePaidEventObject {
  marketId: BigNumber;
  feeAmount: BigNumber;
}
export type MarketSystemFeePaidEvent = TypedEvent<
  [BigNumber, BigNumber],
  MarketSystemFeePaidEventObject
>;

export type MarketSystemFeePaidEventFilter = TypedEventFilter<MarketSystemFeePaidEvent>;

export interface MarketUsdDepositedEventObject {
  marketId: BigNumber;
  target: string;
  amount: BigNumber;
  market: string;
}
export type MarketUsdDepositedEvent = TypedEvent<
  [BigNumber, string, BigNumber, string],
  MarketUsdDepositedEventObject
>;

export type MarketUsdDepositedEventFilter = TypedEventFilter<MarketUsdDepositedEvent>;

export interface MarketUsdWithdrawnEventObject {
  marketId: BigNumber;
  target: string;
  amount: BigNumber;
  market: string;
}
export type MarketUsdWithdrawnEvent = TypedEvent<
  [BigNumber, string, BigNumber, string],
  MarketUsdWithdrawnEventObject
>;

export type MarketUsdWithdrawnEventFilter = TypedEventFilter<MarketUsdWithdrawnEvent>;

export interface SetMarketMinLiquidityRatioEventObject {
  marketId: BigNumber;
  minLiquidityRatio: BigNumber;
}
export type SetMarketMinLiquidityRatioEvent = TypedEvent<
  [BigNumber, BigNumber],
  SetMarketMinLiquidityRatioEventObject
>;

export type SetMarketMinLiquidityRatioEventFilter =
  TypedEventFilter<SetMarketMinLiquidityRatioEvent>;

export interface SetMinDelegateTimeEventObject {
  marketId: BigNumber;
  minDelegateTime: number;
}
export type SetMinDelegateTimeEvent = TypedEvent<
  [BigNumber, number],
  SetMinDelegateTimeEventObject
>;

export type SetMinDelegateTimeEventFilter = TypedEventFilter<SetMinDelegateTimeEvent>;

export interface PoolApprovedAddedEventObject {
  poolId: BigNumber;
}
export type PoolApprovedAddedEvent = TypedEvent<[BigNumber], PoolApprovedAddedEventObject>;

export type PoolApprovedAddedEventFilter = TypedEventFilter<PoolApprovedAddedEvent>;

export interface PoolApprovedRemovedEventObject {
  poolId: BigNumber;
}
export type PoolApprovedRemovedEvent = TypedEvent<[BigNumber], PoolApprovedRemovedEventObject>;

export type PoolApprovedRemovedEventFilter = TypedEventFilter<PoolApprovedRemovedEvent>;

export interface PreferredPoolSetEventObject {
  poolId: BigNumber;
}
export type PreferredPoolSetEvent = TypedEvent<[BigNumber], PreferredPoolSetEventObject>;

export type PreferredPoolSetEventFilter = TypedEventFilter<PreferredPoolSetEvent>;

export interface PoolCollateralConfigurationUpdatedEventObject {
  poolId: BigNumber;
  collateralType: string;
  config: PoolCollateralConfiguration.DataStructOutput;
}
export type PoolCollateralConfigurationUpdatedEvent = TypedEvent<
  [BigNumber, string, PoolCollateralConfiguration.DataStructOutput],
  PoolCollateralConfigurationUpdatedEventObject
>;

export type PoolCollateralConfigurationUpdatedEventFilter =
  TypedEventFilter<PoolCollateralConfigurationUpdatedEvent>;

export interface PoolCollateralDisabledByDefaultSetEventObject {
  poolId: BigNumber;
  disabled: boolean;
}
export type PoolCollateralDisabledByDefaultSetEvent = TypedEvent<
  [BigNumber, boolean],
  PoolCollateralDisabledByDefaultSetEventObject
>;

export type PoolCollateralDisabledByDefaultSetEventFilter =
  TypedEventFilter<PoolCollateralDisabledByDefaultSetEvent>;

export interface PoolConfigurationSetEventObject {
  poolId: BigNumber;
  markets: MarketConfiguration.DataStructOutput[];
  sender: string;
}
export type PoolConfigurationSetEvent = TypedEvent<
  [BigNumber, MarketConfiguration.DataStructOutput[], string],
  PoolConfigurationSetEventObject
>;

export type PoolConfigurationSetEventFilter = TypedEventFilter<PoolConfigurationSetEvent>;

export interface PoolCreatedEventObject {
  poolId: BigNumber;
  owner: string;
  sender: string;
}
export type PoolCreatedEvent = TypedEvent<[BigNumber, string, string], PoolCreatedEventObject>;

export type PoolCreatedEventFilter = TypedEventFilter<PoolCreatedEvent>;

export interface PoolNameUpdatedEventObject {
  poolId: BigNumber;
  name: string;
  sender: string;
}
export type PoolNameUpdatedEvent = TypedEvent<
  [BigNumber, string, string],
  PoolNameUpdatedEventObject
>;

export type PoolNameUpdatedEventFilter = TypedEventFilter<PoolNameUpdatedEvent>;

export interface PoolNominationRenouncedEventObject {
  poolId: BigNumber;
  owner: string;
}
export type PoolNominationRenouncedEvent = TypedEvent<
  [BigNumber, string],
  PoolNominationRenouncedEventObject
>;

export type PoolNominationRenouncedEventFilter = TypedEventFilter<PoolNominationRenouncedEvent>;

export interface PoolNominationRevokedEventObject {
  poolId: BigNumber;
  owner: string;
}
export type PoolNominationRevokedEvent = TypedEvent<
  [BigNumber, string],
  PoolNominationRevokedEventObject
>;

export type PoolNominationRevokedEventFilter = TypedEventFilter<PoolNominationRevokedEvent>;

export interface PoolOwnerNominatedEventObject {
  poolId: BigNumber;
  nominatedOwner: string;
  owner: string;
}
export type PoolOwnerNominatedEvent = TypedEvent<
  [BigNumber, string, string],
  PoolOwnerNominatedEventObject
>;

export type PoolOwnerNominatedEventFilter = TypedEventFilter<PoolOwnerNominatedEvent>;

export interface PoolOwnershipAcceptedEventObject {
  poolId: BigNumber;
  owner: string;
}
export type PoolOwnershipAcceptedEvent = TypedEvent<
  [BigNumber, string],
  PoolOwnershipAcceptedEventObject
>;

export type PoolOwnershipAcceptedEventFilter = TypedEventFilter<PoolOwnershipAcceptedEvent>;

export interface SetMinLiquidityRatioEventObject {
  minLiquidityRatio: BigNumber;
}
export type SetMinLiquidityRatioEvent = TypedEvent<[BigNumber], SetMinLiquidityRatioEventObject>;

export type SetMinLiquidityRatioEventFilter = TypedEventFilter<SetMinLiquidityRatioEvent>;

export interface RewardsClaimedEventObject {
  accountId: BigNumber;
  poolId: BigNumber;
  collateralType: string;
  distributor: string;
  amount: BigNumber;
}
export type RewardsClaimedEvent = TypedEvent<
  [BigNumber, BigNumber, string, string, BigNumber],
  RewardsClaimedEventObject
>;

export type RewardsClaimedEventFilter = TypedEventFilter<RewardsClaimedEvent>;

export interface RewardsDistributedEventObject {
  poolId: BigNumber;
  collateralType: string;
  distributor: string;
  amount: BigNumber;
  start: BigNumber;
  duration: BigNumber;
}
export type RewardsDistributedEvent = TypedEvent<
  [BigNumber, string, string, BigNumber, BigNumber, BigNumber],
  RewardsDistributedEventObject
>;

export type RewardsDistributedEventFilter = TypedEventFilter<RewardsDistributedEvent>;

export interface RewardsDistributorRegisteredEventObject {
  poolId: BigNumber;
  collateralType: string;
  distributor: string;
}
export type RewardsDistributorRegisteredEvent = TypedEvent<
  [BigNumber, string, string],
  RewardsDistributorRegisteredEventObject
>;

export type RewardsDistributorRegisteredEventFilter =
  TypedEventFilter<RewardsDistributorRegisteredEvent>;

export interface RewardsDistributorRemovedEventObject {
  poolId: BigNumber;
  collateralType: string;
  distributor: string;
}
export type RewardsDistributorRemovedEvent = TypedEvent<
  [BigNumber, string, string],
  RewardsDistributorRemovedEventObject
>;

export type RewardsDistributorRemovedEventFilter = TypedEventFilter<RewardsDistributorRemovedEvent>;

export interface NewSupportedCrossChainNetworkEventObject {
  newChainId: BigNumber;
}
export type NewSupportedCrossChainNetworkEvent = TypedEvent<
  [BigNumber],
  NewSupportedCrossChainNetworkEventObject
>;

export type NewSupportedCrossChainNetworkEventFilter =
  TypedEventFilter<NewSupportedCrossChainNetworkEvent>;

export interface DelegationUpdatedEventObject {
  accountId: BigNumber;
  poolId: BigNumber;
  collateralType: string;
  amount: BigNumber;
  leverage: BigNumber;
  sender: string;
}
export type DelegationUpdatedEvent = TypedEvent<
  [BigNumber, BigNumber, string, BigNumber, BigNumber, string],
  DelegationUpdatedEventObject
>;

export type DelegationUpdatedEventFilter = TypedEventFilter<DelegationUpdatedEvent>;

export interface CoreProxy extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: CoreProxyInterface;

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
    acceptOwnership(overrides?: Overrides & { from?: string }): Promise<ContractTransaction>;

    getImplementation(overrides?: CallOverrides): Promise<[string]>;

    nominateNewOwner(
      newNominatedOwner: string,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    nominatedOwner(overrides?: CallOverrides): Promise<[string]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    renounceNomination(overrides?: Overrides & { from?: string }): Promise<ContractTransaction>;

    simulateUpgradeTo(
      newImplementation: string,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    upgradeTo(
      newImplementation: string,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    addToFeatureFlagAllowlist(
      feature: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    getDeniers(feature: BytesLike, overrides?: CallOverrides): Promise<[string[]]>;

    getFeatureFlagAllowAll(feature: BytesLike, overrides?: CallOverrides): Promise<[boolean]>;

    getFeatureFlagAllowlist(feature: BytesLike, overrides?: CallOverrides): Promise<[string[]]>;

    getFeatureFlagDenyAll(feature: BytesLike, overrides?: CallOverrides): Promise<[boolean]>;

    isFeatureAllowed(
      feature: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    removeFromFeatureFlagAllowlist(
      feature: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    setDeniers(
      feature: BytesLike,
      deniers: string[],
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    setFeatureFlagAllowAll(
      feature: BytesLike,
      allowAll: boolean,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    setFeatureFlagDenyAll(
      feature: BytesLike,
      denyAll: boolean,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    'createAccount()'(overrides?: Overrides & { from?: string }): Promise<ContractTransaction>;

    'createAccount(uint128)'(
      requestedAccountId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    getAccountLastInteraction(
      accountId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getAccountOwner(accountId: BigNumberish, overrides?: CallOverrides): Promise<[string]>;

    getAccountPermissions(
      accountId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [IAccountModule.AccountPermissionsStructOutput[]] & {
        accountPerms: IAccountModule.AccountPermissionsStructOutput[];
      }
    >;

    getAccountTokenAddress(overrides?: CallOverrides): Promise<[string]>;

    grantPermission(
      accountId: BigNumberish,
      permission: BytesLike,
      user: string,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    hasPermission(
      accountId: BigNumberish,
      permission: BytesLike,
      user: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    isAuthorized(
      accountId: BigNumberish,
      permission: BytesLike,
      user: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    notifyAccountTransfer(
      to: string,
      accountId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    renouncePermission(
      accountId: BigNumberish,
      permission: BytesLike,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    revokePermission(
      accountId: BigNumberish,
      permission: BytesLike,
      user: string,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    associateDebt(
      marketId: BigNumberish,
      poolId: BigNumberish,
      collateralType: string,
      accountId: BigNumberish,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    getAssociatedSystem(
      id: BytesLike,
      overrides?: CallOverrides
    ): Promise<[string, string] & { addr: string; kind: string }>;

    initOrUpgradeNft(
      id: BytesLike,
      name: string,
      symbol: string,
      uri: string,
      impl: string,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    initOrUpgradeToken(
      id: BytesLike,
      name: string,
      symbol: string,
      decimals: BigNumberish,
      impl: string,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    registerUnmanagedSystem(
      id: BytesLike,
      endpoint: string,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    ccipReceive(
      message: CcipClient.Any2EVMMessageStruct,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    cleanExpiredLocks(
      accountId: BigNumberish,
      collateralType: string,
      offset: BigNumberish,
      count: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    createLock(
      accountId: BigNumberish,
      collateralType: string,
      amount: BigNumberish,
      expireTimestamp: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    deposit(
      accountId: BigNumberish,
      collateralType: string,
      tokenAmount: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    getAccountAvailableCollateral(
      accountId: BigNumberish,
      collateralType: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getAccountCollateral(
      accountId: BigNumberish,
      collateralType: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber] & {
        totalDeposited: BigNumber;
        totalAssigned: BigNumber;
        totalLocked: BigNumber;
      }
    >;

    getLocks(
      accountId: BigNumberish,
      collateralType: string,
      offset: BigNumberish,
      count: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[CollateralLock.DataStructOutput[]] & { locks: CollateralLock.DataStructOutput[] }>;

    withdraw(
      accountId: BigNumberish,
      collateralType: string,
      tokenAmount: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    configureCollateral(
      config: CollateralConfiguration.DataStruct,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    getCollateralConfiguration(
      collateralType: string,
      overrides?: CallOverrides
    ): Promise<[CollateralConfiguration.DataStructOutput]>;

    getCollateralConfigurations(
      hideDisabled: boolean,
      overrides?: CallOverrides
    ): Promise<[CollateralConfiguration.DataStructOutput[]]>;

    getCollateralPrice(collateralType: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    transferCrossChain(
      destChainId: BigNumberish,
      amount: BigNumberish,
      overrides?: PayableOverrides & { from?: string }
    ): Promise<ContractTransaction>;

    burnUsd(
      accountId: BigNumberish,
      poolId: BigNumberish,
      collateralType: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    mintUsd(
      accountId: BigNumberish,
      poolId: BigNumberish,
      collateralType: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    isPositionLiquidatable(
      accountId: BigNumberish,
      poolId: BigNumberish,
      collateralType: string,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    isVaultLiquidatable(
      poolId: BigNumberish,
      collateralType: string,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    liquidate(
      accountId: BigNumberish,
      poolId: BigNumberish,
      collateralType: string,
      liquidateAsAccountId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    liquidateVault(
      poolId: BigNumberish,
      collateralType: string,
      liquidateAsAccountId: BigNumberish,
      maxUsd: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    configureMaximumMarketCollateral(
      marketId: BigNumberish,
      collateralType: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    depositMarketCollateral(
      marketId: BigNumberish,
      collateralType: string,
      tokenAmount: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    getMarketCollateralAmount(
      marketId: BigNumberish,
      collateralType: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { collateralAmountD18: BigNumber }>;

    getMarketCollateralValue(
      marketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getMaximumMarketCollateral(
      marketId: BigNumberish,
      collateralType: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    withdrawMarketCollateral(
      marketId: BigNumberish,
      collateralType: string,
      tokenAmount: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    depositMarketUsd(
      marketId: BigNumberish,
      target: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    distributeDebtToPools(
      marketId: BigNumberish,
      maxIter: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    getMarketAddress(marketId: BigNumberish, overrides?: CallOverrides): Promise<[string]>;

    getMarketCollateral(marketId: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber]>;

    getMarketDebtPerShare(
      marketId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    getMarketFees(
      arg0: BigNumberish,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { depositFeeAmount: BigNumber; withdrawFeeAmount: BigNumber }
    >;

    getMarketMinDelegateTime(marketId: BigNumberish, overrides?: CallOverrides): Promise<[number]>;

    getMarketNetIssuance(marketId: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber]>;

    getMarketPoolDebtDistribution(
      marketId: BigNumberish,
      poolId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    getMarketPools(
      marketId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    getMarketReportedDebt(marketId: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber]>;

    getMarketTotalDebt(marketId: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber]>;

    'getMinLiquidityRatio(uint128)'(
      marketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    'getMinLiquidityRatio()'(overrides?: CallOverrides): Promise<[BigNumber]>;

    getOracleManager(overrides?: CallOverrides): Promise<[string]>;

    getUsdToken(overrides?: CallOverrides): Promise<[string]>;

    getWithdrawableMarketUsd(
      marketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    isMarketCapacityLocked(marketId: BigNumberish, overrides?: CallOverrides): Promise<[boolean]>;

    registerMarket(
      market: string,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    setMarketMinDelegateTime(
      marketId: BigNumberish,
      minDelegateTime: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    'setMinLiquidityRatio(uint128,uint256)'(
      marketId: BigNumberish,
      minLiquidityRatio: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    'setMinLiquidityRatio(uint256)'(
      minLiquidityRatio: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    withdrawMarketUsd(
      marketId: BigNumberish,
      target: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    getMessageSender(overrides?: CallOverrides): Promise<[string]>;

    multicall(
      data: BytesLike[],
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    multicallThrough(
      to: string[],
      data: BytesLike[],
      values: BigNumberish[],
      overrides?: PayableOverrides & { from?: string }
    ): Promise<ContractTransaction>;

    setAllowlistedMulticallTarget(
      target: string,
      allowlisted: boolean,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    addApprovedPool(
      poolId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    getApprovedPools(overrides?: CallOverrides): Promise<[BigNumber[]]>;

    getPreferredPool(overrides?: CallOverrides): Promise<[BigNumber]>;

    removeApprovedPool(
      poolId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    setPreferredPool(
      poolId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    acceptPoolOwnership(
      poolId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    createPool(
      requestedPoolId: BigNumberish,
      owner: string,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    getNominatedPoolOwner(poolId: BigNumberish, overrides?: CallOverrides): Promise<[string]>;

    getPoolCollateralIssuanceRatio(
      poolId: BigNumberish,
      collateral: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getPoolConfiguration(
      poolId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[MarketConfiguration.DataStructOutput[]]>;

    getPoolName(
      poolId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string] & { poolName: string }>;

    getPoolOwner(poolId: BigNumberish, overrides?: CallOverrides): Promise<[string]>;

    nominatePoolOwner(
      nominatedOwner: string,
      poolId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    rebalancePool(
      poolId: BigNumberish,
      optionalCollateralType: string,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    renouncePoolNomination(
      poolId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    revokePoolNomination(
      poolId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    setPoolCollateralConfiguration(
      poolId: BigNumberish,
      collateralType: string,
      newConfig: PoolCollateralConfiguration.DataStruct,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    setPoolCollateralDisabledByDefault(
      poolId: BigNumberish,
      disabled: boolean,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    setPoolConfiguration(
      poolId: BigNumberish,
      newMarketConfigurations: MarketConfiguration.DataStruct[],
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    setPoolName(
      poolId: BigNumberish,
      name: string,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    claimRewards(
      accountId: BigNumberish,
      poolId: BigNumberish,
      collateralType: string,
      distributor: string,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    distributeRewards(
      poolId: BigNumberish,
      collateralType: string,
      amount: BigNumberish,
      start: BigNumberish,
      duration: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    getRewardRate(
      poolId: BigNumberish,
      collateralType: string,
      distributor: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    registerRewardsDistributor(
      poolId: BigNumberish,
      collateralType: string,
      distributor: string,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    removeRewardsDistributor(
      poolId: BigNumberish,
      collateralType: string,
      distributor: string,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    updateRewards(
      poolId: BigNumberish,
      collateralType: string,
      accountId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    configureChainlinkCrossChain(
      ccipRouter: string,
      ccipTokenPool: string,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    configureOracleManager(
      oracleManagerAddress: string,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    getConfig(k: BytesLike, overrides?: CallOverrides): Promise<[string] & { v: string }>;

    getConfigAddress(k: BytesLike, overrides?: CallOverrides): Promise<[string] & { v: string }>;

    getConfigUint(k: BytesLike, overrides?: CallOverrides): Promise<[BigNumber] & { v: BigNumber }>;

    setConfig(
      k: BytesLike,
      v: BytesLike,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    setSupportedCrossChainNetworks(
      supportedNetworks: BigNumberish[],
      ccipSelectors: BigNumberish[],
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    supportsInterface(interfaceId: BytesLike, overrides?: CallOverrides): Promise<[boolean]>;

    delegateCollateral(
      accountId: BigNumberish,
      poolId: BigNumberish,
      collateralType: string,
      newCollateralAmountD18: BigNumberish,
      leverage: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    getPosition(
      accountId: BigNumberish,
      poolId: BigNumberish,
      collateralType: string,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    getPositionCollateral(
      accountId: BigNumberish,
      poolId: BigNumberish,
      collateralType: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber] & { amount: BigNumber; value: BigNumber }>;

    getPositionCollateralRatio(
      accountId: BigNumberish,
      poolId: BigNumberish,
      collateralType: string,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    getPositionDebt(
      accountId: BigNumberish,
      poolId: BigNumberish,
      collateralType: string,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    getVaultCollateral(
      poolId: BigNumberish,
      collateralType: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber] & { amount: BigNumber; value: BigNumber }>;

    getVaultCollateralRatio(
      poolId: BigNumberish,
      collateralType: string,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    getVaultDebt(
      poolId: BigNumberish,
      collateralType: string,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;
  };

  acceptOwnership(overrides?: Overrides & { from?: string }): Promise<ContractTransaction>;

  getImplementation(overrides?: CallOverrides): Promise<string>;

  nominateNewOwner(
    newNominatedOwner: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  nominatedOwner(overrides?: CallOverrides): Promise<string>;

  owner(overrides?: CallOverrides): Promise<string>;

  renounceNomination(overrides?: Overrides & { from?: string }): Promise<ContractTransaction>;

  simulateUpgradeTo(
    newImplementation: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  upgradeTo(
    newImplementation: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  addToFeatureFlagAllowlist(
    feature: BytesLike,
    account: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  getDeniers(feature: BytesLike, overrides?: CallOverrides): Promise<string[]>;

  getFeatureFlagAllowAll(feature: BytesLike, overrides?: CallOverrides): Promise<boolean>;

  getFeatureFlagAllowlist(feature: BytesLike, overrides?: CallOverrides): Promise<string[]>;

  getFeatureFlagDenyAll(feature: BytesLike, overrides?: CallOverrides): Promise<boolean>;

  isFeatureAllowed(
    feature: BytesLike,
    account: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  removeFromFeatureFlagAllowlist(
    feature: BytesLike,
    account: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  setDeniers(
    feature: BytesLike,
    deniers: string[],
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  setFeatureFlagAllowAll(
    feature: BytesLike,
    allowAll: boolean,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  setFeatureFlagDenyAll(
    feature: BytesLike,
    denyAll: boolean,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  'createAccount()'(overrides?: Overrides & { from?: string }): Promise<ContractTransaction>;

  'createAccount(uint128)'(
    requestedAccountId: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  getAccountLastInteraction(accountId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

  getAccountOwner(accountId: BigNumberish, overrides?: CallOverrides): Promise<string>;

  getAccountPermissions(
    accountId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<IAccountModule.AccountPermissionsStructOutput[]>;

  getAccountTokenAddress(overrides?: CallOverrides): Promise<string>;

  grantPermission(
    accountId: BigNumberish,
    permission: BytesLike,
    user: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  hasPermission(
    accountId: BigNumberish,
    permission: BytesLike,
    user: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  isAuthorized(
    accountId: BigNumberish,
    permission: BytesLike,
    user: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  notifyAccountTransfer(
    to: string,
    accountId: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  renouncePermission(
    accountId: BigNumberish,
    permission: BytesLike,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  revokePermission(
    accountId: BigNumberish,
    permission: BytesLike,
    user: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  associateDebt(
    marketId: BigNumberish,
    poolId: BigNumberish,
    collateralType: string,
    accountId: BigNumberish,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  getAssociatedSystem(
    id: BytesLike,
    overrides?: CallOverrides
  ): Promise<[string, string] & { addr: string; kind: string }>;

  initOrUpgradeNft(
    id: BytesLike,
    name: string,
    symbol: string,
    uri: string,
    impl: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  initOrUpgradeToken(
    id: BytesLike,
    name: string,
    symbol: string,
    decimals: BigNumberish,
    impl: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  registerUnmanagedSystem(
    id: BytesLike,
    endpoint: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  ccipReceive(
    message: CcipClient.Any2EVMMessageStruct,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  cleanExpiredLocks(
    accountId: BigNumberish,
    collateralType: string,
    offset: BigNumberish,
    count: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  createLock(
    accountId: BigNumberish,
    collateralType: string,
    amount: BigNumberish,
    expireTimestamp: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  deposit(
    accountId: BigNumberish,
    collateralType: string,
    tokenAmount: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  getAccountAvailableCollateral(
    accountId: BigNumberish,
    collateralType: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getAccountCollateral(
    accountId: BigNumberish,
    collateralType: string,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber, BigNumber] & {
      totalDeposited: BigNumber;
      totalAssigned: BigNumber;
      totalLocked: BigNumber;
    }
  >;

  getLocks(
    accountId: BigNumberish,
    collateralType: string,
    offset: BigNumberish,
    count: BigNumberish,
    overrides?: CallOverrides
  ): Promise<CollateralLock.DataStructOutput[]>;

  withdraw(
    accountId: BigNumberish,
    collateralType: string,
    tokenAmount: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  configureCollateral(
    config: CollateralConfiguration.DataStruct,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  getCollateralConfiguration(
    collateralType: string,
    overrides?: CallOverrides
  ): Promise<CollateralConfiguration.DataStructOutput>;

  getCollateralConfigurations(
    hideDisabled: boolean,
    overrides?: CallOverrides
  ): Promise<CollateralConfiguration.DataStructOutput[]>;

  getCollateralPrice(collateralType: string, overrides?: CallOverrides): Promise<BigNumber>;

  transferCrossChain(
    destChainId: BigNumberish,
    amount: BigNumberish,
    overrides?: PayableOverrides & { from?: string }
  ): Promise<ContractTransaction>;

  burnUsd(
    accountId: BigNumberish,
    poolId: BigNumberish,
    collateralType: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  mintUsd(
    accountId: BigNumberish,
    poolId: BigNumberish,
    collateralType: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  isPositionLiquidatable(
    accountId: BigNumberish,
    poolId: BigNumberish,
    collateralType: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  isVaultLiquidatable(
    poolId: BigNumberish,
    collateralType: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  liquidate(
    accountId: BigNumberish,
    poolId: BigNumberish,
    collateralType: string,
    liquidateAsAccountId: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  liquidateVault(
    poolId: BigNumberish,
    collateralType: string,
    liquidateAsAccountId: BigNumberish,
    maxUsd: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  configureMaximumMarketCollateral(
    marketId: BigNumberish,
    collateralType: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  depositMarketCollateral(
    marketId: BigNumberish,
    collateralType: string,
    tokenAmount: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  getMarketCollateralAmount(
    marketId: BigNumberish,
    collateralType: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getMarketCollateralValue(marketId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

  getMaximumMarketCollateral(
    marketId: BigNumberish,
    collateralType: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  withdrawMarketCollateral(
    marketId: BigNumberish,
    collateralType: string,
    tokenAmount: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  depositMarketUsd(
    marketId: BigNumberish,
    target: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  distributeDebtToPools(
    marketId: BigNumberish,
    maxIter: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  getMarketAddress(marketId: BigNumberish, overrides?: CallOverrides): Promise<string>;

  getMarketCollateral(marketId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

  getMarketDebtPerShare(
    marketId: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  getMarketFees(
    arg0: BigNumberish,
    amount: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber] & { depositFeeAmount: BigNumber; withdrawFeeAmount: BigNumber }
  >;

  getMarketMinDelegateTime(marketId: BigNumberish, overrides?: CallOverrides): Promise<number>;

  getMarketNetIssuance(marketId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

  getMarketPoolDebtDistribution(
    marketId: BigNumberish,
    poolId: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  getMarketPools(
    marketId: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  getMarketReportedDebt(marketId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

  getMarketTotalDebt(marketId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

  'getMinLiquidityRatio(uint128)'(
    marketId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  'getMinLiquidityRatio()'(overrides?: CallOverrides): Promise<BigNumber>;

  getOracleManager(overrides?: CallOverrides): Promise<string>;

  getUsdToken(overrides?: CallOverrides): Promise<string>;

  getWithdrawableMarketUsd(marketId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

  isMarketCapacityLocked(marketId: BigNumberish, overrides?: CallOverrides): Promise<boolean>;

  registerMarket(
    market: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  setMarketMinDelegateTime(
    marketId: BigNumberish,
    minDelegateTime: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  'setMinLiquidityRatio(uint128,uint256)'(
    marketId: BigNumberish,
    minLiquidityRatio: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  'setMinLiquidityRatio(uint256)'(
    minLiquidityRatio: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  withdrawMarketUsd(
    marketId: BigNumberish,
    target: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  getMessageSender(overrides?: CallOverrides): Promise<string>;

  multicall(
    data: BytesLike[],
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  multicallThrough(
    to: string[],
    data: BytesLike[],
    values: BigNumberish[],
    overrides?: PayableOverrides & { from?: string }
  ): Promise<ContractTransaction>;

  setAllowlistedMulticallTarget(
    target: string,
    allowlisted: boolean,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  addApprovedPool(
    poolId: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  getApprovedPools(overrides?: CallOverrides): Promise<BigNumber[]>;

  getPreferredPool(overrides?: CallOverrides): Promise<BigNumber>;

  removeApprovedPool(
    poolId: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  setPreferredPool(
    poolId: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  acceptPoolOwnership(
    poolId: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  createPool(
    requestedPoolId: BigNumberish,
    owner: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  getNominatedPoolOwner(poolId: BigNumberish, overrides?: CallOverrides): Promise<string>;

  getPoolCollateralIssuanceRatio(
    poolId: BigNumberish,
    collateral: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getPoolConfiguration(
    poolId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<MarketConfiguration.DataStructOutput[]>;

  getPoolName(poolId: BigNumberish, overrides?: CallOverrides): Promise<string>;

  getPoolOwner(poolId: BigNumberish, overrides?: CallOverrides): Promise<string>;

  nominatePoolOwner(
    nominatedOwner: string,
    poolId: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  rebalancePool(
    poolId: BigNumberish,
    optionalCollateralType: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  renouncePoolNomination(
    poolId: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  revokePoolNomination(
    poolId: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  setPoolCollateralConfiguration(
    poolId: BigNumberish,
    collateralType: string,
    newConfig: PoolCollateralConfiguration.DataStruct,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  setPoolCollateralDisabledByDefault(
    poolId: BigNumberish,
    disabled: boolean,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  setPoolConfiguration(
    poolId: BigNumberish,
    newMarketConfigurations: MarketConfiguration.DataStruct[],
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  setPoolName(
    poolId: BigNumberish,
    name: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  claimRewards(
    accountId: BigNumberish,
    poolId: BigNumberish,
    collateralType: string,
    distributor: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  distributeRewards(
    poolId: BigNumberish,
    collateralType: string,
    amount: BigNumberish,
    start: BigNumberish,
    duration: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  getRewardRate(
    poolId: BigNumberish,
    collateralType: string,
    distributor: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  registerRewardsDistributor(
    poolId: BigNumberish,
    collateralType: string,
    distributor: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  removeRewardsDistributor(
    poolId: BigNumberish,
    collateralType: string,
    distributor: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  updateRewards(
    poolId: BigNumberish,
    collateralType: string,
    accountId: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  configureChainlinkCrossChain(
    ccipRouter: string,
    ccipTokenPool: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  configureOracleManager(
    oracleManagerAddress: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  getConfig(k: BytesLike, overrides?: CallOverrides): Promise<string>;

  getConfigAddress(k: BytesLike, overrides?: CallOverrides): Promise<string>;

  getConfigUint(k: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;

  setConfig(
    k: BytesLike,
    v: BytesLike,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  setSupportedCrossChainNetworks(
    supportedNetworks: BigNumberish[],
    ccipSelectors: BigNumberish[],
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  supportsInterface(interfaceId: BytesLike, overrides?: CallOverrides): Promise<boolean>;

  delegateCollateral(
    accountId: BigNumberish,
    poolId: BigNumberish,
    collateralType: string,
    newCollateralAmountD18: BigNumberish,
    leverage: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  getPosition(
    accountId: BigNumberish,
    poolId: BigNumberish,
    collateralType: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  getPositionCollateral(
    accountId: BigNumberish,
    poolId: BigNumberish,
    collateralType: string,
    overrides?: CallOverrides
  ): Promise<[BigNumber, BigNumber] & { amount: BigNumber; value: BigNumber }>;

  getPositionCollateralRatio(
    accountId: BigNumberish,
    poolId: BigNumberish,
    collateralType: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  getPositionDebt(
    accountId: BigNumberish,
    poolId: BigNumberish,
    collateralType: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  getVaultCollateral(
    poolId: BigNumberish,
    collateralType: string,
    overrides?: CallOverrides
  ): Promise<[BigNumber, BigNumber] & { amount: BigNumber; value: BigNumber }>;

  getVaultCollateralRatio(
    poolId: BigNumberish,
    collateralType: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  getVaultDebt(
    poolId: BigNumberish,
    collateralType: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  callStatic: {
    acceptOwnership(overrides?: CallOverrides): Promise<void>;

    getImplementation(overrides?: CallOverrides): Promise<string>;

    nominateNewOwner(newNominatedOwner: string, overrides?: CallOverrides): Promise<void>;

    nominatedOwner(overrides?: CallOverrides): Promise<string>;

    owner(overrides?: CallOverrides): Promise<string>;

    renounceNomination(overrides?: CallOverrides): Promise<void>;

    simulateUpgradeTo(newImplementation: string, overrides?: CallOverrides): Promise<void>;

    upgradeTo(newImplementation: string, overrides?: CallOverrides): Promise<void>;

    addToFeatureFlagAllowlist(
      feature: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<void>;

    getDeniers(feature: BytesLike, overrides?: CallOverrides): Promise<string[]>;

    getFeatureFlagAllowAll(feature: BytesLike, overrides?: CallOverrides): Promise<boolean>;

    getFeatureFlagAllowlist(feature: BytesLike, overrides?: CallOverrides): Promise<string[]>;

    getFeatureFlagDenyAll(feature: BytesLike, overrides?: CallOverrides): Promise<boolean>;

    isFeatureAllowed(
      feature: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    removeFromFeatureFlagAllowlist(
      feature: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<void>;

    setDeniers(feature: BytesLike, deniers: string[], overrides?: CallOverrides): Promise<void>;

    setFeatureFlagAllowAll(
      feature: BytesLike,
      allowAll: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    setFeatureFlagDenyAll(
      feature: BytesLike,
      denyAll: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    'createAccount()'(overrides?: CallOverrides): Promise<BigNumber>;

    'createAccount(uint128)'(
      requestedAccountId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    getAccountLastInteraction(
      accountId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getAccountOwner(accountId: BigNumberish, overrides?: CallOverrides): Promise<string>;

    getAccountPermissions(
      accountId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<IAccountModule.AccountPermissionsStructOutput[]>;

    getAccountTokenAddress(overrides?: CallOverrides): Promise<string>;

    grantPermission(
      accountId: BigNumberish,
      permission: BytesLike,
      user: string,
      overrides?: CallOverrides
    ): Promise<void>;

    hasPermission(
      accountId: BigNumberish,
      permission: BytesLike,
      user: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    isAuthorized(
      accountId: BigNumberish,
      permission: BytesLike,
      user: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    notifyAccountTransfer(
      to: string,
      accountId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    renouncePermission(
      accountId: BigNumberish,
      permission: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    revokePermission(
      accountId: BigNumberish,
      permission: BytesLike,
      user: string,
      overrides?: CallOverrides
    ): Promise<void>;

    associateDebt(
      marketId: BigNumberish,
      poolId: BigNumberish,
      collateralType: string,
      accountId: BigNumberish,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getAssociatedSystem(
      id: BytesLike,
      overrides?: CallOverrides
    ): Promise<[string, string] & { addr: string; kind: string }>;

    initOrUpgradeNft(
      id: BytesLike,
      name: string,
      symbol: string,
      uri: string,
      impl: string,
      overrides?: CallOverrides
    ): Promise<void>;

    initOrUpgradeToken(
      id: BytesLike,
      name: string,
      symbol: string,
      decimals: BigNumberish,
      impl: string,
      overrides?: CallOverrides
    ): Promise<void>;

    registerUnmanagedSystem(
      id: BytesLike,
      endpoint: string,
      overrides?: CallOverrides
    ): Promise<void>;

    ccipReceive(message: CcipClient.Any2EVMMessageStruct, overrides?: CallOverrides): Promise<void>;

    cleanExpiredLocks(
      accountId: BigNumberish,
      collateralType: string,
      offset: BigNumberish,
      count: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    createLock(
      accountId: BigNumberish,
      collateralType: string,
      amount: BigNumberish,
      expireTimestamp: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    deposit(
      accountId: BigNumberish,
      collateralType: string,
      tokenAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    getAccountAvailableCollateral(
      accountId: BigNumberish,
      collateralType: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getAccountCollateral(
      accountId: BigNumberish,
      collateralType: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber] & {
        totalDeposited: BigNumber;
        totalAssigned: BigNumber;
        totalLocked: BigNumber;
      }
    >;

    getLocks(
      accountId: BigNumberish,
      collateralType: string,
      offset: BigNumberish,
      count: BigNumberish,
      overrides?: CallOverrides
    ): Promise<CollateralLock.DataStructOutput[]>;

    withdraw(
      accountId: BigNumberish,
      collateralType: string,
      tokenAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    configureCollateral(
      config: CollateralConfiguration.DataStruct,
      overrides?: CallOverrides
    ): Promise<void>;

    getCollateralConfiguration(
      collateralType: string,
      overrides?: CallOverrides
    ): Promise<CollateralConfiguration.DataStructOutput>;

    getCollateralConfigurations(
      hideDisabled: boolean,
      overrides?: CallOverrides
    ): Promise<CollateralConfiguration.DataStructOutput[]>;

    getCollateralPrice(collateralType: string, overrides?: CallOverrides): Promise<BigNumber>;

    transferCrossChain(
      destChainId: BigNumberish,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    burnUsd(
      accountId: BigNumberish,
      poolId: BigNumberish,
      collateralType: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    mintUsd(
      accountId: BigNumberish,
      poolId: BigNumberish,
      collateralType: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    isPositionLiquidatable(
      accountId: BigNumberish,
      poolId: BigNumberish,
      collateralType: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    isVaultLiquidatable(
      poolId: BigNumberish,
      collateralType: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    liquidate(
      accountId: BigNumberish,
      poolId: BigNumberish,
      collateralType: string,
      liquidateAsAccountId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<ILiquidationModule.LiquidationDataStructOutput>;

    liquidateVault(
      poolId: BigNumberish,
      collateralType: string,
      liquidateAsAccountId: BigNumberish,
      maxUsd: BigNumberish,
      overrides?: CallOverrides
    ): Promise<ILiquidationModule.LiquidationDataStructOutput>;

    configureMaximumMarketCollateral(
      marketId: BigNumberish,
      collateralType: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    depositMarketCollateral(
      marketId: BigNumberish,
      collateralType: string,
      tokenAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    getMarketCollateralAmount(
      marketId: BigNumberish,
      collateralType: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getMarketCollateralValue(marketId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    getMaximumMarketCollateral(
      marketId: BigNumberish,
      collateralType: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    withdrawMarketCollateral(
      marketId: BigNumberish,
      collateralType: string,
      tokenAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    depositMarketUsd(
      marketId: BigNumberish,
      target: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    distributeDebtToPools(
      marketId: BigNumberish,
      maxIter: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    getMarketAddress(marketId: BigNumberish, overrides?: CallOverrides): Promise<string>;

    getMarketCollateral(marketId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    getMarketDebtPerShare(marketId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    getMarketFees(
      arg0: BigNumberish,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { depositFeeAmount: BigNumber; withdrawFeeAmount: BigNumber }
    >;

    getMarketMinDelegateTime(marketId: BigNumberish, overrides?: CallOverrides): Promise<number>;

    getMarketNetIssuance(marketId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    getMarketPoolDebtDistribution(
      marketId: BigNumberish,
      poolId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber] & {
        sharesD18: BigNumber;
        totalSharesD18: BigNumber;
        valuePerShareD27: BigNumber;
      }
    >;

    getMarketPools(
      marketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber[], BigNumber[]] & { inRangePoolIds: BigNumber[]; outRangePoolIds: BigNumber[] }
    >;

    getMarketReportedDebt(marketId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    getMarketTotalDebt(marketId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    'getMinLiquidityRatio(uint128)'(
      marketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    'getMinLiquidityRatio()'(overrides?: CallOverrides): Promise<BigNumber>;

    getOracleManager(overrides?: CallOverrides): Promise<string>;

    getUsdToken(overrides?: CallOverrides): Promise<string>;

    getWithdrawableMarketUsd(marketId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    isMarketCapacityLocked(marketId: BigNumberish, overrides?: CallOverrides): Promise<boolean>;

    registerMarket(market: string, overrides?: CallOverrides): Promise<BigNumber>;

    setMarketMinDelegateTime(
      marketId: BigNumberish,
      minDelegateTime: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    'setMinLiquidityRatio(uint128,uint256)'(
      marketId: BigNumberish,
      minLiquidityRatio: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    'setMinLiquidityRatio(uint256)'(
      minLiquidityRatio: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    withdrawMarketUsd(
      marketId: BigNumberish,
      target: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getMessageSender(overrides?: CallOverrides): Promise<string>;

    multicall(data: BytesLike[], overrides?: CallOverrides): Promise<string[]>;

    multicallThrough(
      to: string[],
      data: BytesLike[],
      values: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<string[]>;

    setAllowlistedMulticallTarget(
      target: string,
      allowlisted: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    addApprovedPool(poolId: BigNumberish, overrides?: CallOverrides): Promise<void>;

    getApprovedPools(overrides?: CallOverrides): Promise<BigNumber[]>;

    getPreferredPool(overrides?: CallOverrides): Promise<BigNumber>;

    removeApprovedPool(poolId: BigNumberish, overrides?: CallOverrides): Promise<void>;

    setPreferredPool(poolId: BigNumberish, overrides?: CallOverrides): Promise<void>;

    acceptPoolOwnership(poolId: BigNumberish, overrides?: CallOverrides): Promise<void>;

    createPool(
      requestedPoolId: BigNumberish,
      owner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    getNominatedPoolOwner(poolId: BigNumberish, overrides?: CallOverrides): Promise<string>;

    getPoolCollateralIssuanceRatio(
      poolId: BigNumberish,
      collateral: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getPoolConfiguration(
      poolId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<MarketConfiguration.DataStructOutput[]>;

    getPoolName(poolId: BigNumberish, overrides?: CallOverrides): Promise<string>;

    getPoolOwner(poolId: BigNumberish, overrides?: CallOverrides): Promise<string>;

    nominatePoolOwner(
      nominatedOwner: string,
      poolId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    rebalancePool(
      poolId: BigNumberish,
      optionalCollateralType: string,
      overrides?: CallOverrides
    ): Promise<void>;

    renouncePoolNomination(poolId: BigNumberish, overrides?: CallOverrides): Promise<void>;

    revokePoolNomination(poolId: BigNumberish, overrides?: CallOverrides): Promise<void>;

    setPoolCollateralConfiguration(
      poolId: BigNumberish,
      collateralType: string,
      newConfig: PoolCollateralConfiguration.DataStruct,
      overrides?: CallOverrides
    ): Promise<void>;

    setPoolCollateralDisabledByDefault(
      poolId: BigNumberish,
      disabled: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    setPoolConfiguration(
      poolId: BigNumberish,
      newMarketConfigurations: MarketConfiguration.DataStruct[],
      overrides?: CallOverrides
    ): Promise<void>;

    setPoolName(poolId: BigNumberish, name: string, overrides?: CallOverrides): Promise<void>;

    claimRewards(
      accountId: BigNumberish,
      poolId: BigNumberish,
      collateralType: string,
      distributor: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    distributeRewards(
      poolId: BigNumberish,
      collateralType: string,
      amount: BigNumberish,
      start: BigNumberish,
      duration: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    getRewardRate(
      poolId: BigNumberish,
      collateralType: string,
      distributor: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    registerRewardsDistributor(
      poolId: BigNumberish,
      collateralType: string,
      distributor: string,
      overrides?: CallOverrides
    ): Promise<void>;

    removeRewardsDistributor(
      poolId: BigNumberish,
      collateralType: string,
      distributor: string,
      overrides?: CallOverrides
    ): Promise<void>;

    updateRewards(
      poolId: BigNumberish,
      collateralType: string,
      accountId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber[], string[]]>;

    configureChainlinkCrossChain(
      ccipRouter: string,
      ccipTokenPool: string,
      overrides?: CallOverrides
    ): Promise<void>;

    configureOracleManager(oracleManagerAddress: string, overrides?: CallOverrides): Promise<void>;

    getConfig(k: BytesLike, overrides?: CallOverrides): Promise<string>;

    getConfigAddress(k: BytesLike, overrides?: CallOverrides): Promise<string>;

    getConfigUint(k: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;

    setConfig(k: BytesLike, v: BytesLike, overrides?: CallOverrides): Promise<void>;

    setSupportedCrossChainNetworks(
      supportedNetworks: BigNumberish[],
      ccipSelectors: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    supportsInterface(interfaceId: BytesLike, overrides?: CallOverrides): Promise<boolean>;

    delegateCollateral(
      accountId: BigNumberish,
      poolId: BigNumberish,
      collateralType: string,
      newCollateralAmountD18: BigNumberish,
      leverage: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    getPosition(
      accountId: BigNumberish,
      poolId: BigNumberish,
      collateralType: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, BigNumber] & {
        collateralAmount: BigNumber;
        collateralValue: BigNumber;
        debt: BigNumber;
        collateralizationRatio: BigNumber;
      }
    >;

    getPositionCollateral(
      accountId: BigNumberish,
      poolId: BigNumberish,
      collateralType: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber] & { amount: BigNumber; value: BigNumber }>;

    getPositionCollateralRatio(
      accountId: BigNumberish,
      poolId: BigNumberish,
      collateralType: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getPositionDebt(
      accountId: BigNumberish,
      poolId: BigNumberish,
      collateralType: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getVaultCollateral(
      poolId: BigNumberish,
      collateralType: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber] & { amount: BigNumber; value: BigNumber }>;

    getVaultCollateralRatio(
      poolId: BigNumberish,
      collateralType: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getVaultDebt(
      poolId: BigNumberish,
      collateralType: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  filters: {
    'OwnerChanged(address,address)'(oldOwner?: null, newOwner?: null): OwnerChangedEventFilter;
    OwnerChanged(oldOwner?: null, newOwner?: null): OwnerChangedEventFilter;

    'OwnerNominated(address)'(newOwner?: null): OwnerNominatedEventFilter;
    OwnerNominated(newOwner?: null): OwnerNominatedEventFilter;

    'Upgraded(address,address)'(self?: string | null, implementation?: null): UpgradedEventFilter;
    Upgraded(self?: string | null, implementation?: null): UpgradedEventFilter;

    'FeatureFlagAllowAllSet(bytes32,bool)'(
      feature?: BytesLike | null,
      allowAll?: null
    ): FeatureFlagAllowAllSetEventFilter;
    FeatureFlagAllowAllSet(
      feature?: BytesLike | null,
      allowAll?: null
    ): FeatureFlagAllowAllSetEventFilter;

    'FeatureFlagAllowlistAdded(bytes32,address)'(
      feature?: BytesLike | null,
      account?: null
    ): FeatureFlagAllowlistAddedEventFilter;
    FeatureFlagAllowlistAdded(
      feature?: BytesLike | null,
      account?: null
    ): FeatureFlagAllowlistAddedEventFilter;

    'FeatureFlagAllowlistRemoved(bytes32,address)'(
      feature?: BytesLike | null,
      account?: null
    ): FeatureFlagAllowlistRemovedEventFilter;
    FeatureFlagAllowlistRemoved(
      feature?: BytesLike | null,
      account?: null
    ): FeatureFlagAllowlistRemovedEventFilter;

    'FeatureFlagDeniersReset(bytes32,address[])'(
      feature?: BytesLike | null,
      deniers?: null
    ): FeatureFlagDeniersResetEventFilter;
    FeatureFlagDeniersReset(
      feature?: BytesLike | null,
      deniers?: null
    ): FeatureFlagDeniersResetEventFilter;

    'FeatureFlagDenyAllSet(bytes32,bool)'(
      feature?: BytesLike | null,
      denyAll?: null
    ): FeatureFlagDenyAllSetEventFilter;
    FeatureFlagDenyAllSet(
      feature?: BytesLike | null,
      denyAll?: null
    ): FeatureFlagDenyAllSetEventFilter;

    'AccountCreated(uint128,address)'(
      accountId?: BigNumberish | null,
      owner?: string | null
    ): AccountCreatedEventFilter;
    AccountCreated(
      accountId?: BigNumberish | null,
      owner?: string | null
    ): AccountCreatedEventFilter;

    'PermissionGranted(uint128,bytes32,address,address)'(
      accountId?: BigNumberish | null,
      permission?: BytesLike | null,
      user?: string | null,
      sender?: null
    ): PermissionGrantedEventFilter;
    PermissionGranted(
      accountId?: BigNumberish | null,
      permission?: BytesLike | null,
      user?: string | null,
      sender?: null
    ): PermissionGrantedEventFilter;

    'PermissionRevoked(uint128,bytes32,address,address)'(
      accountId?: BigNumberish | null,
      permission?: BytesLike | null,
      user?: string | null,
      sender?: null
    ): PermissionRevokedEventFilter;
    PermissionRevoked(
      accountId?: BigNumberish | null,
      permission?: BytesLike | null,
      user?: string | null,
      sender?: null
    ): PermissionRevokedEventFilter;

    'DebtAssociated(uint128,uint128,address,uint128,uint256,int256)'(
      marketId?: BigNumberish | null,
      poolId?: BigNumberish | null,
      collateralType?: string | null,
      accountId?: null,
      amount?: null,
      updatedDebt?: null
    ): DebtAssociatedEventFilter;
    DebtAssociated(
      marketId?: BigNumberish | null,
      poolId?: BigNumberish | null,
      collateralType?: string | null,
      accountId?: null,
      amount?: null,
      updatedDebt?: null
    ): DebtAssociatedEventFilter;

    'AssociatedSystemSet(bytes32,bytes32,address,address)'(
      kind?: BytesLike | null,
      id?: BytesLike | null,
      proxy?: null,
      impl?: null
    ): AssociatedSystemSetEventFilter;
    AssociatedSystemSet(
      kind?: BytesLike | null,
      id?: BytesLike | null,
      proxy?: null,
      impl?: null
    ): AssociatedSystemSetEventFilter;

    'CollateralLockCreated(uint128,address,uint256,uint64)'(
      accountId?: BigNumberish | null,
      collateralType?: string | null,
      tokenAmount?: null,
      expireTimestamp?: null
    ): CollateralLockCreatedEventFilter;
    CollateralLockCreated(
      accountId?: BigNumberish | null,
      collateralType?: string | null,
      tokenAmount?: null,
      expireTimestamp?: null
    ): CollateralLockCreatedEventFilter;

    'CollateralLockExpired(uint128,address,uint256,uint64)'(
      accountId?: BigNumberish | null,
      collateralType?: string | null,
      tokenAmount?: null,
      expireTimestamp?: null
    ): CollateralLockExpiredEventFilter;
    CollateralLockExpired(
      accountId?: BigNumberish | null,
      collateralType?: string | null,
      tokenAmount?: null,
      expireTimestamp?: null
    ): CollateralLockExpiredEventFilter;

    'Deposited(uint128,address,uint256,address)'(
      accountId?: BigNumberish | null,
      collateralType?: string | null,
      tokenAmount?: null,
      sender?: string | null
    ): DepositedEventFilter;
    Deposited(
      accountId?: BigNumberish | null,
      collateralType?: string | null,
      tokenAmount?: null,
      sender?: string | null
    ): DepositedEventFilter;

    'Withdrawn(uint128,address,uint256,address)'(
      accountId?: BigNumberish | null,
      collateralType?: string | null,
      tokenAmount?: null,
      sender?: string | null
    ): WithdrawnEventFilter;
    Withdrawn(
      accountId?: BigNumberish | null,
      collateralType?: string | null,
      tokenAmount?: null,
      sender?: string | null
    ): WithdrawnEventFilter;

    'CollateralConfigured(address,(bool,uint256,uint256,uint256,bytes32,address,uint256))'(
      collateralType?: string | null,
      config?: null
    ): CollateralConfiguredEventFilter;
    CollateralConfigured(
      collateralType?: string | null,
      config?: null
    ): CollateralConfiguredEventFilter;

    'TransferCrossChainInitiated(uint64,uint256,address)'(
      destChainId?: BigNumberish | null,
      amount?: BigNumberish | null,
      sender?: null
    ): TransferCrossChainInitiatedEventFilter;
    TransferCrossChainInitiated(
      destChainId?: BigNumberish | null,
      amount?: BigNumberish | null,
      sender?: null
    ): TransferCrossChainInitiatedEventFilter;

    'IssuanceFeePaid(uint128,uint128,address,uint256)'(
      accountId?: BigNumberish | null,
      poolId?: BigNumberish | null,
      collateralType?: null,
      feeAmount?: null
    ): IssuanceFeePaidEventFilter;
    IssuanceFeePaid(
      accountId?: BigNumberish | null,
      poolId?: BigNumberish | null,
      collateralType?: null,
      feeAmount?: null
    ): IssuanceFeePaidEventFilter;

    'UsdBurned(uint128,uint128,address,uint256,address)'(
      accountId?: BigNumberish | null,
      poolId?: BigNumberish | null,
      collateralType?: null,
      amount?: null,
      sender?: string | null
    ): UsdBurnedEventFilter;
    UsdBurned(
      accountId?: BigNumberish | null,
      poolId?: BigNumberish | null,
      collateralType?: null,
      amount?: null,
      sender?: string | null
    ): UsdBurnedEventFilter;

    'UsdMinted(uint128,uint128,address,uint256,address)'(
      accountId?: BigNumberish | null,
      poolId?: BigNumberish | null,
      collateralType?: null,
      amount?: null,
      sender?: string | null
    ): UsdMintedEventFilter;
    UsdMinted(
      accountId?: BigNumberish | null,
      poolId?: BigNumberish | null,
      collateralType?: null,
      amount?: null,
      sender?: string | null
    ): UsdMintedEventFilter;

    'Liquidation(uint128,uint128,address,(uint256,uint256,uint256),uint128,address)'(
      accountId?: BigNumberish | null,
      poolId?: BigNumberish | null,
      collateralType?: string | null,
      liquidationData?: null,
      liquidateAsAccountId?: null,
      sender?: null
    ): LiquidationEventFilter;
    Liquidation(
      accountId?: BigNumberish | null,
      poolId?: BigNumberish | null,
      collateralType?: string | null,
      liquidationData?: null,
      liquidateAsAccountId?: null,
      sender?: null
    ): LiquidationEventFilter;

    'VaultLiquidation(uint128,address,(uint256,uint256,uint256),uint128,address)'(
      poolId?: BigNumberish | null,
      collateralType?: string | null,
      liquidationData?: null,
      liquidateAsAccountId?: null,
      sender?: null
    ): VaultLiquidationEventFilter;
    VaultLiquidation(
      poolId?: BigNumberish | null,
      collateralType?: string | null,
      liquidationData?: null,
      liquidateAsAccountId?: null,
      sender?: null
    ): VaultLiquidationEventFilter;

    'MarketCollateralDeposited(uint128,address,uint256,address)'(
      marketId?: BigNumberish | null,
      collateralType?: string | null,
      tokenAmount?: null,
      sender?: string | null
    ): MarketCollateralDepositedEventFilter;
    MarketCollateralDeposited(
      marketId?: BigNumberish | null,
      collateralType?: string | null,
      tokenAmount?: null,
      sender?: string | null
    ): MarketCollateralDepositedEventFilter;

    'MarketCollateralWithdrawn(uint128,address,uint256,address)'(
      marketId?: BigNumberish | null,
      collateralType?: string | null,
      tokenAmount?: null,
      sender?: string | null
    ): MarketCollateralWithdrawnEventFilter;
    MarketCollateralWithdrawn(
      marketId?: BigNumberish | null,
      collateralType?: string | null,
      tokenAmount?: null,
      sender?: string | null
    ): MarketCollateralWithdrawnEventFilter;

    'MaximumMarketCollateralConfigured(uint128,address,uint256,address)'(
      marketId?: BigNumberish | null,
      collateralType?: string | null,
      systemAmount?: null,
      owner?: string | null
    ): MaximumMarketCollateralConfiguredEventFilter;
    MaximumMarketCollateralConfigured(
      marketId?: BigNumberish | null,
      collateralType?: string | null,
      systemAmount?: null,
      owner?: string | null
    ): MaximumMarketCollateralConfiguredEventFilter;

    'MarketRegistered(address,uint128,address)'(
      market?: string | null,
      marketId?: BigNumberish | null,
      sender?: string | null
    ): MarketRegisteredEventFilter;
    MarketRegistered(
      market?: string | null,
      marketId?: BigNumberish | null,
      sender?: string | null
    ): MarketRegisteredEventFilter;

    'MarketSystemFeePaid(uint128,uint256)'(
      marketId?: BigNumberish | null,
      feeAmount?: null
    ): MarketSystemFeePaidEventFilter;
    MarketSystemFeePaid(
      marketId?: BigNumberish | null,
      feeAmount?: null
    ): MarketSystemFeePaidEventFilter;

    'MarketUsdDeposited(uint128,address,uint256,address)'(
      marketId?: BigNumberish | null,
      target?: string | null,
      amount?: null,
      market?: string | null
    ): MarketUsdDepositedEventFilter;
    MarketUsdDeposited(
      marketId?: BigNumberish | null,
      target?: string | null,
      amount?: null,
      market?: string | null
    ): MarketUsdDepositedEventFilter;

    'MarketUsdWithdrawn(uint128,address,uint256,address)'(
      marketId?: BigNumberish | null,
      target?: string | null,
      amount?: null,
      market?: string | null
    ): MarketUsdWithdrawnEventFilter;
    MarketUsdWithdrawn(
      marketId?: BigNumberish | null,
      target?: string | null,
      amount?: null,
      market?: string | null
    ): MarketUsdWithdrawnEventFilter;

    'SetMarketMinLiquidityRatio(uint128,uint256)'(
      marketId?: BigNumberish | null,
      minLiquidityRatio?: null
    ): SetMarketMinLiquidityRatioEventFilter;
    SetMarketMinLiquidityRatio(
      marketId?: BigNumberish | null,
      minLiquidityRatio?: null
    ): SetMarketMinLiquidityRatioEventFilter;

    'SetMinDelegateTime(uint128,uint32)'(
      marketId?: BigNumberish | null,
      minDelegateTime?: null
    ): SetMinDelegateTimeEventFilter;
    SetMinDelegateTime(
      marketId?: BigNumberish | null,
      minDelegateTime?: null
    ): SetMinDelegateTimeEventFilter;

    'PoolApprovedAdded(uint256)'(poolId?: null): PoolApprovedAddedEventFilter;
    PoolApprovedAdded(poolId?: null): PoolApprovedAddedEventFilter;

    'PoolApprovedRemoved(uint256)'(poolId?: null): PoolApprovedRemovedEventFilter;
    PoolApprovedRemoved(poolId?: null): PoolApprovedRemovedEventFilter;

    'PreferredPoolSet(uint256)'(poolId?: null): PreferredPoolSetEventFilter;
    PreferredPoolSet(poolId?: null): PreferredPoolSetEventFilter;

    'PoolCollateralConfigurationUpdated(uint128,address,(uint256,uint256))'(
      poolId?: BigNumberish | null,
      collateralType?: null,
      config?: null
    ): PoolCollateralConfigurationUpdatedEventFilter;
    PoolCollateralConfigurationUpdated(
      poolId?: BigNumberish | null,
      collateralType?: null,
      config?: null
    ): PoolCollateralConfigurationUpdatedEventFilter;

    'PoolCollateralDisabledByDefaultSet(uint128,bool)'(
      poolId?: null,
      disabled?: null
    ): PoolCollateralDisabledByDefaultSetEventFilter;
    PoolCollateralDisabledByDefaultSet(
      poolId?: null,
      disabled?: null
    ): PoolCollateralDisabledByDefaultSetEventFilter;

    'PoolConfigurationSet(uint128,(uint128,uint128,int128)[],address)'(
      poolId?: BigNumberish | null,
      markets?: null,
      sender?: string | null
    ): PoolConfigurationSetEventFilter;
    PoolConfigurationSet(
      poolId?: BigNumberish | null,
      markets?: null,
      sender?: string | null
    ): PoolConfigurationSetEventFilter;

    'PoolCreated(uint128,address,address)'(
      poolId?: BigNumberish | null,
      owner?: string | null,
      sender?: string | null
    ): PoolCreatedEventFilter;
    PoolCreated(
      poolId?: BigNumberish | null,
      owner?: string | null,
      sender?: string | null
    ): PoolCreatedEventFilter;

    'PoolNameUpdated(uint128,string,address)'(
      poolId?: BigNumberish | null,
      name?: null,
      sender?: string | null
    ): PoolNameUpdatedEventFilter;
    PoolNameUpdated(
      poolId?: BigNumberish | null,
      name?: null,
      sender?: string | null
    ): PoolNameUpdatedEventFilter;

    'PoolNominationRenounced(uint128,address)'(
      poolId?: BigNumberish | null,
      owner?: string | null
    ): PoolNominationRenouncedEventFilter;
    PoolNominationRenounced(
      poolId?: BigNumberish | null,
      owner?: string | null
    ): PoolNominationRenouncedEventFilter;

    'PoolNominationRevoked(uint128,address)'(
      poolId?: BigNumberish | null,
      owner?: string | null
    ): PoolNominationRevokedEventFilter;
    PoolNominationRevoked(
      poolId?: BigNumberish | null,
      owner?: string | null
    ): PoolNominationRevokedEventFilter;

    'PoolOwnerNominated(uint128,address,address)'(
      poolId?: BigNumberish | null,
      nominatedOwner?: string | null,
      owner?: string | null
    ): PoolOwnerNominatedEventFilter;
    PoolOwnerNominated(
      poolId?: BigNumberish | null,
      nominatedOwner?: string | null,
      owner?: string | null
    ): PoolOwnerNominatedEventFilter;

    'PoolOwnershipAccepted(uint128,address)'(
      poolId?: BigNumberish | null,
      owner?: string | null
    ): PoolOwnershipAcceptedEventFilter;
    PoolOwnershipAccepted(
      poolId?: BigNumberish | null,
      owner?: string | null
    ): PoolOwnershipAcceptedEventFilter;

    'SetMinLiquidityRatio(uint256)'(minLiquidityRatio?: null): SetMinLiquidityRatioEventFilter;
    SetMinLiquidityRatio(minLiquidityRatio?: null): SetMinLiquidityRatioEventFilter;

    'RewardsClaimed(uint128,uint128,address,address,uint256)'(
      accountId?: BigNumberish | null,
      poolId?: BigNumberish | null,
      collateralType?: string | null,
      distributor?: null,
      amount?: null
    ): RewardsClaimedEventFilter;
    RewardsClaimed(
      accountId?: BigNumberish | null,
      poolId?: BigNumberish | null,
      collateralType?: string | null,
      distributor?: null,
      amount?: null
    ): RewardsClaimedEventFilter;

    'RewardsDistributed(uint128,address,address,uint256,uint256,uint256)'(
      poolId?: BigNumberish | null,
      collateralType?: string | null,
      distributor?: null,
      amount?: null,
      start?: null,
      duration?: null
    ): RewardsDistributedEventFilter;
    RewardsDistributed(
      poolId?: BigNumberish | null,
      collateralType?: string | null,
      distributor?: null,
      amount?: null,
      start?: null,
      duration?: null
    ): RewardsDistributedEventFilter;

    'RewardsDistributorRegistered(uint128,address,address)'(
      poolId?: BigNumberish | null,
      collateralType?: string | null,
      distributor?: string | null
    ): RewardsDistributorRegisteredEventFilter;
    RewardsDistributorRegistered(
      poolId?: BigNumberish | null,
      collateralType?: string | null,
      distributor?: string | null
    ): RewardsDistributorRegisteredEventFilter;

    'RewardsDistributorRemoved(uint128,address,address)'(
      poolId?: BigNumberish | null,
      collateralType?: string | null,
      distributor?: string | null
    ): RewardsDistributorRemovedEventFilter;
    RewardsDistributorRemoved(
      poolId?: BigNumberish | null,
      collateralType?: string | null,
      distributor?: string | null
    ): RewardsDistributorRemovedEventFilter;

    'NewSupportedCrossChainNetwork(uint64)'(
      newChainId?: null
    ): NewSupportedCrossChainNetworkEventFilter;
    NewSupportedCrossChainNetwork(newChainId?: null): NewSupportedCrossChainNetworkEventFilter;

    'DelegationUpdated(uint128,uint128,address,uint256,uint256,address)'(
      accountId?: BigNumberish | null,
      poolId?: BigNumberish | null,
      collateralType?: null,
      amount?: null,
      leverage?: null,
      sender?: string | null
    ): DelegationUpdatedEventFilter;
    DelegationUpdated(
      accountId?: BigNumberish | null,
      poolId?: BigNumberish | null,
      collateralType?: null,
      amount?: null,
      leverage?: null,
      sender?: string | null
    ): DelegationUpdatedEventFilter;
  };

  estimateGas: {
    acceptOwnership(overrides?: Overrides & { from?: string }): Promise<BigNumber>;

    getImplementation(overrides?: CallOverrides): Promise<BigNumber>;

    nominateNewOwner(
      newNominatedOwner: string,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    nominatedOwner(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    renounceNomination(overrides?: Overrides & { from?: string }): Promise<BigNumber>;

    simulateUpgradeTo(
      newImplementation: string,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    upgradeTo(
      newImplementation: string,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    addToFeatureFlagAllowlist(
      feature: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    getDeniers(feature: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;

    getFeatureFlagAllowAll(feature: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;

    getFeatureFlagAllowlist(feature: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;

    getFeatureFlagDenyAll(feature: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;

    isFeatureAllowed(
      feature: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    removeFromFeatureFlagAllowlist(
      feature: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    setDeniers(
      feature: BytesLike,
      deniers: string[],
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    setFeatureFlagAllowAll(
      feature: BytesLike,
      allowAll: boolean,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    setFeatureFlagDenyAll(
      feature: BytesLike,
      denyAll: boolean,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    'createAccount()'(overrides?: Overrides & { from?: string }): Promise<BigNumber>;

    'createAccount(uint128)'(
      requestedAccountId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    getAccountLastInteraction(
      accountId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getAccountOwner(accountId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    getAccountPermissions(accountId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    getAccountTokenAddress(overrides?: CallOverrides): Promise<BigNumber>;

    grantPermission(
      accountId: BigNumberish,
      permission: BytesLike,
      user: string,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    hasPermission(
      accountId: BigNumberish,
      permission: BytesLike,
      user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isAuthorized(
      accountId: BigNumberish,
      permission: BytesLike,
      user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    notifyAccountTransfer(
      to: string,
      accountId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    renouncePermission(
      accountId: BigNumberish,
      permission: BytesLike,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    revokePermission(
      accountId: BigNumberish,
      permission: BytesLike,
      user: string,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    associateDebt(
      marketId: BigNumberish,
      poolId: BigNumberish,
      collateralType: string,
      accountId: BigNumberish,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    getAssociatedSystem(id: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;

    initOrUpgradeNft(
      id: BytesLike,
      name: string,
      symbol: string,
      uri: string,
      impl: string,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    initOrUpgradeToken(
      id: BytesLike,
      name: string,
      symbol: string,
      decimals: BigNumberish,
      impl: string,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    registerUnmanagedSystem(
      id: BytesLike,
      endpoint: string,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    ccipReceive(
      message: CcipClient.Any2EVMMessageStruct,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    cleanExpiredLocks(
      accountId: BigNumberish,
      collateralType: string,
      offset: BigNumberish,
      count: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    createLock(
      accountId: BigNumberish,
      collateralType: string,
      amount: BigNumberish,
      expireTimestamp: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    deposit(
      accountId: BigNumberish,
      collateralType: string,
      tokenAmount: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    getAccountAvailableCollateral(
      accountId: BigNumberish,
      collateralType: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getAccountCollateral(
      accountId: BigNumberish,
      collateralType: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getLocks(
      accountId: BigNumberish,
      collateralType: string,
      offset: BigNumberish,
      count: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    withdraw(
      accountId: BigNumberish,
      collateralType: string,
      tokenAmount: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    configureCollateral(
      config: CollateralConfiguration.DataStruct,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    getCollateralConfiguration(
      collateralType: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getCollateralConfigurations(
      hideDisabled: boolean,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getCollateralPrice(collateralType: string, overrides?: CallOverrides): Promise<BigNumber>;

    transferCrossChain(
      destChainId: BigNumberish,
      amount: BigNumberish,
      overrides?: PayableOverrides & { from?: string }
    ): Promise<BigNumber>;

    burnUsd(
      accountId: BigNumberish,
      poolId: BigNumberish,
      collateralType: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    mintUsd(
      accountId: BigNumberish,
      poolId: BigNumberish,
      collateralType: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    isPositionLiquidatable(
      accountId: BigNumberish,
      poolId: BigNumberish,
      collateralType: string,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    isVaultLiquidatable(
      poolId: BigNumberish,
      collateralType: string,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    liquidate(
      accountId: BigNumberish,
      poolId: BigNumberish,
      collateralType: string,
      liquidateAsAccountId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    liquidateVault(
      poolId: BigNumberish,
      collateralType: string,
      liquidateAsAccountId: BigNumberish,
      maxUsd: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    configureMaximumMarketCollateral(
      marketId: BigNumberish,
      collateralType: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    depositMarketCollateral(
      marketId: BigNumberish,
      collateralType: string,
      tokenAmount: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    getMarketCollateralAmount(
      marketId: BigNumberish,
      collateralType: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getMarketCollateralValue(marketId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    getMaximumMarketCollateral(
      marketId: BigNumberish,
      collateralType: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    withdrawMarketCollateral(
      marketId: BigNumberish,
      collateralType: string,
      tokenAmount: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    depositMarketUsd(
      marketId: BigNumberish,
      target: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    distributeDebtToPools(
      marketId: BigNumberish,
      maxIter: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    getMarketAddress(marketId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    getMarketCollateral(marketId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    getMarketDebtPerShare(
      marketId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    getMarketFees(
      arg0: BigNumberish,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getMarketMinDelegateTime(marketId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    getMarketNetIssuance(marketId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    getMarketPoolDebtDistribution(
      marketId: BigNumberish,
      poolId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    getMarketPools(
      marketId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    getMarketReportedDebt(marketId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    getMarketTotalDebt(marketId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    'getMinLiquidityRatio(uint128)'(
      marketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    'getMinLiquidityRatio()'(overrides?: CallOverrides): Promise<BigNumber>;

    getOracleManager(overrides?: CallOverrides): Promise<BigNumber>;

    getUsdToken(overrides?: CallOverrides): Promise<BigNumber>;

    getWithdrawableMarketUsd(marketId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    isMarketCapacityLocked(marketId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    registerMarket(market: string, overrides?: Overrides & { from?: string }): Promise<BigNumber>;

    setMarketMinDelegateTime(
      marketId: BigNumberish,
      minDelegateTime: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    'setMinLiquidityRatio(uint128,uint256)'(
      marketId: BigNumberish,
      minLiquidityRatio: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    'setMinLiquidityRatio(uint256)'(
      minLiquidityRatio: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    withdrawMarketUsd(
      marketId: BigNumberish,
      target: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    getMessageSender(overrides?: CallOverrides): Promise<BigNumber>;

    multicall(data: BytesLike[], overrides?: Overrides & { from?: string }): Promise<BigNumber>;

    multicallThrough(
      to: string[],
      data: BytesLike[],
      values: BigNumberish[],
      overrides?: PayableOverrides & { from?: string }
    ): Promise<BigNumber>;

    setAllowlistedMulticallTarget(
      target: string,
      allowlisted: boolean,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    addApprovedPool(
      poolId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    getApprovedPools(overrides?: CallOverrides): Promise<BigNumber>;

    getPreferredPool(overrides?: CallOverrides): Promise<BigNumber>;

    removeApprovedPool(
      poolId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    setPreferredPool(
      poolId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    acceptPoolOwnership(
      poolId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    createPool(
      requestedPoolId: BigNumberish,
      owner: string,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    getNominatedPoolOwner(poolId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    getPoolCollateralIssuanceRatio(
      poolId: BigNumberish,
      collateral: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getPoolConfiguration(poolId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    getPoolName(poolId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    getPoolOwner(poolId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    nominatePoolOwner(
      nominatedOwner: string,
      poolId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    rebalancePool(
      poolId: BigNumberish,
      optionalCollateralType: string,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    renouncePoolNomination(
      poolId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    revokePoolNomination(
      poolId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    setPoolCollateralConfiguration(
      poolId: BigNumberish,
      collateralType: string,
      newConfig: PoolCollateralConfiguration.DataStruct,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    setPoolCollateralDisabledByDefault(
      poolId: BigNumberish,
      disabled: boolean,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    setPoolConfiguration(
      poolId: BigNumberish,
      newMarketConfigurations: MarketConfiguration.DataStruct[],
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    setPoolName(
      poolId: BigNumberish,
      name: string,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    claimRewards(
      accountId: BigNumberish,
      poolId: BigNumberish,
      collateralType: string,
      distributor: string,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    distributeRewards(
      poolId: BigNumberish,
      collateralType: string,
      amount: BigNumberish,
      start: BigNumberish,
      duration: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    getRewardRate(
      poolId: BigNumberish,
      collateralType: string,
      distributor: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    registerRewardsDistributor(
      poolId: BigNumberish,
      collateralType: string,
      distributor: string,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    removeRewardsDistributor(
      poolId: BigNumberish,
      collateralType: string,
      distributor: string,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    updateRewards(
      poolId: BigNumberish,
      collateralType: string,
      accountId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    configureChainlinkCrossChain(
      ccipRouter: string,
      ccipTokenPool: string,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    configureOracleManager(
      oracleManagerAddress: string,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    getConfig(k: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;

    getConfigAddress(k: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;

    getConfigUint(k: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;

    setConfig(
      k: BytesLike,
      v: BytesLike,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    setSupportedCrossChainNetworks(
      supportedNetworks: BigNumberish[],
      ccipSelectors: BigNumberish[],
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    supportsInterface(interfaceId: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;

    delegateCollateral(
      accountId: BigNumberish,
      poolId: BigNumberish,
      collateralType: string,
      newCollateralAmountD18: BigNumberish,
      leverage: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    getPosition(
      accountId: BigNumberish,
      poolId: BigNumberish,
      collateralType: string,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    getPositionCollateral(
      accountId: BigNumberish,
      poolId: BigNumberish,
      collateralType: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getPositionCollateralRatio(
      accountId: BigNumberish,
      poolId: BigNumberish,
      collateralType: string,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    getPositionDebt(
      accountId: BigNumberish,
      poolId: BigNumberish,
      collateralType: string,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    getVaultCollateral(
      poolId: BigNumberish,
      collateralType: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getVaultCollateralRatio(
      poolId: BigNumberish,
      collateralType: string,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    getVaultDebt(
      poolId: BigNumberish,
      collateralType: string,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    acceptOwnership(overrides?: Overrides & { from?: string }): Promise<PopulatedTransaction>;

    getImplementation(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    nominateNewOwner(
      newNominatedOwner: string,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    nominatedOwner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceNomination(overrides?: Overrides & { from?: string }): Promise<PopulatedTransaction>;

    simulateUpgradeTo(
      newImplementation: string,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    upgradeTo(
      newImplementation: string,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    addToFeatureFlagAllowlist(
      feature: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    getDeniers(feature: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getFeatureFlagAllowAll(
      feature: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getFeatureFlagAllowlist(
      feature: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getFeatureFlagDenyAll(
      feature: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isFeatureAllowed(
      feature: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    removeFromFeatureFlagAllowlist(
      feature: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    setDeniers(
      feature: BytesLike,
      deniers: string[],
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    setFeatureFlagAllowAll(
      feature: BytesLike,
      allowAll: boolean,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    setFeatureFlagDenyAll(
      feature: BytesLike,
      denyAll: boolean,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    'createAccount()'(overrides?: Overrides & { from?: string }): Promise<PopulatedTransaction>;

    'createAccount(uint128)'(
      requestedAccountId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    getAccountLastInteraction(
      accountId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getAccountOwner(
      accountId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getAccountPermissions(
      accountId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getAccountTokenAddress(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    grantPermission(
      accountId: BigNumberish,
      permission: BytesLike,
      user: string,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    hasPermission(
      accountId: BigNumberish,
      permission: BytesLike,
      user: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isAuthorized(
      accountId: BigNumberish,
      permission: BytesLike,
      user: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    notifyAccountTransfer(
      to: string,
      accountId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    renouncePermission(
      accountId: BigNumberish,
      permission: BytesLike,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    revokePermission(
      accountId: BigNumberish,
      permission: BytesLike,
      user: string,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    associateDebt(
      marketId: BigNumberish,
      poolId: BigNumberish,
      collateralType: string,
      accountId: BigNumberish,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    getAssociatedSystem(id: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    initOrUpgradeNft(
      id: BytesLike,
      name: string,
      symbol: string,
      uri: string,
      impl: string,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    initOrUpgradeToken(
      id: BytesLike,
      name: string,
      symbol: string,
      decimals: BigNumberish,
      impl: string,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    registerUnmanagedSystem(
      id: BytesLike,
      endpoint: string,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    ccipReceive(
      message: CcipClient.Any2EVMMessageStruct,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    cleanExpiredLocks(
      accountId: BigNumberish,
      collateralType: string,
      offset: BigNumberish,
      count: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    createLock(
      accountId: BigNumberish,
      collateralType: string,
      amount: BigNumberish,
      expireTimestamp: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    deposit(
      accountId: BigNumberish,
      collateralType: string,
      tokenAmount: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    getAccountAvailableCollateral(
      accountId: BigNumberish,
      collateralType: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getAccountCollateral(
      accountId: BigNumberish,
      collateralType: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getLocks(
      accountId: BigNumberish,
      collateralType: string,
      offset: BigNumberish,
      count: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    withdraw(
      accountId: BigNumberish,
      collateralType: string,
      tokenAmount: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    configureCollateral(
      config: CollateralConfiguration.DataStruct,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    getCollateralConfiguration(
      collateralType: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getCollateralConfigurations(
      hideDisabled: boolean,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getCollateralPrice(
      collateralType: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    transferCrossChain(
      destChainId: BigNumberish,
      amount: BigNumberish,
      overrides?: PayableOverrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    burnUsd(
      accountId: BigNumberish,
      poolId: BigNumberish,
      collateralType: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    mintUsd(
      accountId: BigNumberish,
      poolId: BigNumberish,
      collateralType: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    isPositionLiquidatable(
      accountId: BigNumberish,
      poolId: BigNumberish,
      collateralType: string,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    isVaultLiquidatable(
      poolId: BigNumberish,
      collateralType: string,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    liquidate(
      accountId: BigNumberish,
      poolId: BigNumberish,
      collateralType: string,
      liquidateAsAccountId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    liquidateVault(
      poolId: BigNumberish,
      collateralType: string,
      liquidateAsAccountId: BigNumberish,
      maxUsd: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    configureMaximumMarketCollateral(
      marketId: BigNumberish,
      collateralType: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    depositMarketCollateral(
      marketId: BigNumberish,
      collateralType: string,
      tokenAmount: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    getMarketCollateralAmount(
      marketId: BigNumberish,
      collateralType: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getMarketCollateralValue(
      marketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getMaximumMarketCollateral(
      marketId: BigNumberish,
      collateralType: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    withdrawMarketCollateral(
      marketId: BigNumberish,
      collateralType: string,
      tokenAmount: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    depositMarketUsd(
      marketId: BigNumberish,
      target: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    distributeDebtToPools(
      marketId: BigNumberish,
      maxIter: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    getMarketAddress(
      marketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getMarketCollateral(
      marketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getMarketDebtPerShare(
      marketId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    getMarketFees(
      arg0: BigNumberish,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getMarketMinDelegateTime(
      marketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getMarketNetIssuance(
      marketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getMarketPoolDebtDistribution(
      marketId: BigNumberish,
      poolId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    getMarketPools(
      marketId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    getMarketReportedDebt(
      marketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getMarketTotalDebt(
      marketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    'getMinLiquidityRatio(uint128)'(
      marketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    'getMinLiquidityRatio()'(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getOracleManager(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getUsdToken(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getWithdrawableMarketUsd(
      marketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isMarketCapacityLocked(
      marketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    registerMarket(
      market: string,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    setMarketMinDelegateTime(
      marketId: BigNumberish,
      minDelegateTime: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    'setMinLiquidityRatio(uint128,uint256)'(
      marketId: BigNumberish,
      minLiquidityRatio: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    'setMinLiquidityRatio(uint256)'(
      minLiquidityRatio: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    withdrawMarketUsd(
      marketId: BigNumberish,
      target: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    getMessageSender(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    multicall(
      data: BytesLike[],
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    multicallThrough(
      to: string[],
      data: BytesLike[],
      values: BigNumberish[],
      overrides?: PayableOverrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    setAllowlistedMulticallTarget(
      target: string,
      allowlisted: boolean,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    addApprovedPool(
      poolId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    getApprovedPools(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getPreferredPool(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    removeApprovedPool(
      poolId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    setPreferredPool(
      poolId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    acceptPoolOwnership(
      poolId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    createPool(
      requestedPoolId: BigNumberish,
      owner: string,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    getNominatedPoolOwner(
      poolId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getPoolCollateralIssuanceRatio(
      poolId: BigNumberish,
      collateral: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getPoolConfiguration(
      poolId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getPoolName(poolId: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getPoolOwner(poolId: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    nominatePoolOwner(
      nominatedOwner: string,
      poolId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    rebalancePool(
      poolId: BigNumberish,
      optionalCollateralType: string,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    renouncePoolNomination(
      poolId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    revokePoolNomination(
      poolId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    setPoolCollateralConfiguration(
      poolId: BigNumberish,
      collateralType: string,
      newConfig: PoolCollateralConfiguration.DataStruct,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    setPoolCollateralDisabledByDefault(
      poolId: BigNumberish,
      disabled: boolean,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    setPoolConfiguration(
      poolId: BigNumberish,
      newMarketConfigurations: MarketConfiguration.DataStruct[],
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    setPoolName(
      poolId: BigNumberish,
      name: string,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    claimRewards(
      accountId: BigNumberish,
      poolId: BigNumberish,
      collateralType: string,
      distributor: string,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    distributeRewards(
      poolId: BigNumberish,
      collateralType: string,
      amount: BigNumberish,
      start: BigNumberish,
      duration: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    getRewardRate(
      poolId: BigNumberish,
      collateralType: string,
      distributor: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    registerRewardsDistributor(
      poolId: BigNumberish,
      collateralType: string,
      distributor: string,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    removeRewardsDistributor(
      poolId: BigNumberish,
      collateralType: string,
      distributor: string,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    updateRewards(
      poolId: BigNumberish,
      collateralType: string,
      accountId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    configureChainlinkCrossChain(
      ccipRouter: string,
      ccipTokenPool: string,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    configureOracleManager(
      oracleManagerAddress: string,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    getConfig(k: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getConfigAddress(k: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getConfigUint(k: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setConfig(
      k: BytesLike,
      v: BytesLike,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    setSupportedCrossChainNetworks(
      supportedNetworks: BigNumberish[],
      ccipSelectors: BigNumberish[],
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    delegateCollateral(
      accountId: BigNumberish,
      poolId: BigNumberish,
      collateralType: string,
      newCollateralAmountD18: BigNumberish,
      leverage: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    getPosition(
      accountId: BigNumberish,
      poolId: BigNumberish,
      collateralType: string,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    getPositionCollateral(
      accountId: BigNumberish,
      poolId: BigNumberish,
      collateralType: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getPositionCollateralRatio(
      accountId: BigNumberish,
      poolId: BigNumberish,
      collateralType: string,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    getPositionDebt(
      accountId: BigNumberish,
      poolId: BigNumberish,
      collateralType: string,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    getVaultCollateral(
      poolId: BigNumberish,
      collateralType: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getVaultCollateralRatio(
      poolId: BigNumberish,
      collateralType: string,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    getVaultDebt(
      poolId: BigNumberish,
      collateralType: string,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;
  };
}

