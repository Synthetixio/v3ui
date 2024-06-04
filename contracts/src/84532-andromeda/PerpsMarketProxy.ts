// !!! DO NOT EDIT !!! Automatically generated file

export const address = '0xf53Ca60F031FAf0E347D44FbaA4870da68250c8d';
export const abi = [
  'error FeatureUnavailable(bytes32 which)',
  'error InvalidAccountId(uint128 accountId)',
  'error InvalidPermission(bytes32 permission)',
  'error OnlyAccountTokenProxy(address origin)',
  'error PermissionDenied(uint128 accountId, bytes32 permission, address target)',
  'error PermissionNotGranted(uint128 accountId, bytes32 permission, address user)',
  'error PositionOutOfBounds()',
  'error ValueAlreadyInSet()',
  'error ValueNotInSet()',
  'error ZeroAddress()',
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
  'error MismatchAssociatedSystemKind(bytes32 expected, bytes32 actual)',
  'error MissingAssociatedSystem(bytes32 id)',
  'error Unauthorized(address addr)',
  'event AssociatedSystemSet(bytes32 indexed kind, bytes32 indexed id, address proxy, address impl)',
  'function getAssociatedSystem(bytes32 id) view returns (address addr, bytes32 kind)',
  'function initOrUpgradeNft(bytes32 id, string name, string symbol, string uri, address impl)',
  'function initOrUpgradeToken(bytes32 id, string name, string symbol, uint8 decimals, address impl)',
  'function registerUnmanagedSystem(bytes32 id, address endpoint)',
  'error ImplementationIsSterile(address implementation)',
  'error NoChange()',
  'error NotAContract(address contr)',
  'error NotNominated(address addr)',
  'error UpgradeSimulationFailed()',
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
  'error InvalidMarket(uint128 marketId)',
  'error InvalidParameter(string parameter, string reason)',
  'error OverflowInt256ToUint256()',
  'error OverflowUint256ToInt256()',
  'error OverflowUint256ToUint128()',
  'error PerpsMarketAlreadyInitialized()',
  'error PerpsMarketNotInitialized()',
  'event FactoryInitialized(uint128 globalPerpsMarketId)',
  'event MarketCreated(uint128 indexed perpsMarketId, string marketName, string marketSymbol)',
  'function createMarket(uint128 requestedMarketId, string marketName, string marketSymbol) returns (uint128)',
  'function initializeFactory(address synthetix, address spotMarket) returns (uint128)',
  'function interestRate() view returns (uint128)',
  'function minimumCredit(uint128 perpsMarketId) view returns (uint256)',
  'function name(uint128 perpsMarketId) view returns (string)',
  'function reportedDebt(uint128 perpsMarketId) view returns (uint256)',
  'function setPerpsMarketName(string marketName)',
  'function supportsInterface(bytes4 interfaceId) view returns (bool)',
  'function utilizationRate() view returns (uint256 rate, uint256 delegatedCollateral, uint256 lockedCredit)',
  'error AccountLiquidatable(uint128 accountId)',
  'error AccountNotFound(uint128 accountId)',
  'error InsufficientCollateral(uint128 synthMarketId, uint256 collateralAmount, uint256 withdrawAmount)',
  'error InsufficientCollateralAvailableForWithdraw(uint256 availableUsdDenominated, uint256 requiredUsdDenominated)',
  'error InsufficientSynthCollateral(uint128 synthMarketId, uint256 collateralAmount, uint256 withdrawAmount)',
  'error InvalidAmountDelta(int256 amountDelta)',
  'error KeeperCostsNotSet()',
  'error MaxCollateralExceeded(uint128 synthMarketId, uint256 maxAmount, uint256 collateralAmount, uint256 depositAmount)',
  'error MaxCollateralsPerAccountReached(uint128 maxCollateralsPerAccount)',
  'error OverflowUint128ToInt128()',
  'error PendingOrderExists()',
  'error PriceFeedNotSet(uint128 marketId)',
  'error SynthNotEnabledForCollateral(uint128 synthMarketId)',
  'event CollateralModified(uint128 indexed accountId, uint128 indexed synthMarketId, int256 amountDelta, address indexed sender)',
  'function getAccountCollateralIds(uint128 accountId) view returns (uint256[])',
  'function getAccountOpenPositions(uint128 accountId) view returns (uint256[])',
  'function getAvailableMargin(uint128 accountId) view returns (int256 availableMargin)',
  'function getCollateralAmount(uint128 accountId, uint128 synthMarketId) view returns (uint256)',
  'function getOpenPosition(uint128 accountId, uint128 marketId) view returns (int256 totalPnl, int256 accruedFunding, int128 positionSize, uint256 owedInterest)',
  'function getOpenPositionSize(uint128 accountId, uint128 marketId) view returns (int128 positionSize)',
  'function getRequiredMargins(uint128 accountId) view returns (uint256 requiredInitialMargin, uint256 requiredMaintenanceMargin, uint256 maxLiquidationReward)',
  'function getWithdrawableMargin(uint128 accountId) view returns (int256 withdrawableMargin)',
  'function modifyCollateral(uint128 accountId, uint128 synthMarketId, int256 amountDelta)',
  'function totalAccountOpenInterest(uint128 accountId) view returns (uint256)',
  'function totalCollateralValue(uint128 accountId) view returns (uint256)',
  'function currentFundingRate(uint128 marketId) view returns (int256)',
  'function currentFundingVelocity(uint128 marketId) view returns (int256)',
  'function fillPrice(uint128 marketId, int128 orderSize, uint256 price) view returns (uint256)',
  'function getMarketSummary(uint128 marketId) view returns (tuple(int256 skew, uint256 size, uint256 maxOpenInterest, int256 currentFundingRate, int256 currentFundingVelocity, uint256 indexPrice) summary)',
  'function indexPrice(uint128 marketId) view returns (uint256)',
  'function maxOpenInterest(uint128 marketId) view returns (uint256)',
  'function metadata(uint128 marketId) view returns (string name, string symbol)',
  'function size(uint128 marketId) view returns (uint256)',
  'function skew(uint128 marketId) view returns (int256)',
  'error AcceptablePriceExceeded(uint256 fillPrice, uint256 acceptablePrice)',
  'error InsufficientMargin(int256 availableMargin, uint256 minMargin)',
  'error InvalidSettlementStrategy(uint256 settlementStrategyId)',
  'error MaxOpenInterestReached(uint128 marketId, uint256 maxMarketSize, int256 newSideSize)',
  'error MaxPositionsPerAccountReached(uint128 maxPositionsPerAccount)',
  'error MaxUSDOpenInterestReached(uint128 marketId, uint256 maxMarketValue, int256 newSideSize, uint256 price)',
  'error OverflowInt256ToInt128()',
  'error ZeroSizeOrder()',
  'event OrderCommitted(uint128 indexed marketId, uint128 indexed accountId, uint8 orderType, int128 sizeDelta, uint256 acceptablePrice, uint256 commitmentTime, uint256 expectedPriceTime, uint256 settlementTime, uint256 expirationTime, bytes32 indexed trackingCode, address sender)',
  'event PreviousOrderExpired(uint128 indexed marketId, uint128 indexed accountId, int128 sizeDelta, uint256 acceptablePrice, uint256 commitmentTime, bytes32 indexed trackingCode)',
  'function commitOrder(tuple(uint128 marketId, uint128 accountId, int128 sizeDelta, uint128 settlementStrategyId, uint256 acceptablePrice, bytes32 trackingCode, address referrer) commitment) returns (tuple(uint256 commitmentTime, tuple(uint128 marketId, uint128 accountId, int128 sizeDelta, uint128 settlementStrategyId, uint256 acceptablePrice, bytes32 trackingCode, address referrer) request) retOrder, uint256 fees)',
  'function computeOrderFees(uint128 marketId, int128 sizeDelta) view returns (uint256 orderFees, uint256 fillPrice)',
  'function computeOrderFeesWithPrice(uint128 marketId, int128 sizeDelta, uint256 price) view returns (uint256 orderFees, uint256 fillPrice)',
  'function getOrder(uint128 accountId) view returns (tuple(uint256 commitmentTime, tuple(uint128 marketId, uint128 accountId, int128 sizeDelta, uint128 settlementStrategyId, uint256 acceptablePrice, bytes32 trackingCode, address referrer) request) order)',
  'function getSettlementRewardCost(uint128 marketId, uint128 settlementStrategyId) view returns (uint256)',
  'function requiredMarginForOrder(uint128 accountId, uint128 marketId, int128 sizeDelta) view returns (uint256 requiredMargin)',
  'function requiredMarginForOrderWithPrice(uint128 accountId, uint128 marketId, int128 sizeDelta, uint256 price) view returns (uint256 requiredMargin)',
  'error InsufficientAccountMargin(uint256 leftover)',
  'error OrderNotValid()',
  'error OverflowInt128ToUint128()',
  'error OverflowUint256ToUint64()',
  'error SettlementStrategyNotFound(uint8 strategyType)',
  'error SettlementWindowExpired(uint256 timestamp, uint256 settlementTime, uint256 settlementExpiration)',
  'error SettlementWindowNotOpen(uint256 timestamp, uint256 settlementTime)',
  'event CollateralDeducted(uint256 account, uint128 synthMarketId, uint256 amount)',
  'event InterestCharged(uint128 indexed accountId, uint256 interest)',
  'event MarketUpdated(uint128 marketId, uint256 price, int256 skew, uint256 size, int256 sizeDelta, int256 currentFundingRate, int256 currentFundingVelocity, uint128 interestRate)',
  'event OrderSettled(uint128 indexed marketId, uint128 indexed accountId, uint256 fillPrice, int256 pnl, int256 accruedFunding, int128 sizeDelta, int128 newSize, uint256 totalFees, uint256 referralFees, uint256 collectedFees, uint256 settlementReward, bytes32 indexed trackingCode, address settler)',
  'function settleOrder(uint128 accountId)',
  'error AcceptablePriceNotExceeded(uint256 fillPrice, uint256 acceptablePrice)',
  'event OrderCancelled(uint128 indexed marketId, uint128 indexed accountId, uint256 desiredPrice, uint256 fillPrice, int128 sizeDelta, uint256 settlementReward, bytes32 indexed trackingCode, address settler)',
  'function cancelOrder(uint128 accountId)',
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
  'error NotEligibleForLiquidation(uint128 accountId)',
  'event AccountFlaggedForLiquidation(uint128 indexed accountId, int256 availableMargin, uint256 requiredMaintenanceMargin, uint256 liquidationReward, uint256 flagReward)',
  'event AccountLiquidationAttempt(uint128 indexed accountId, uint256 reward, bool fullLiquidation)',
  'event PositionLiquidated(uint128 indexed accountId, uint128 indexed marketId, uint256 amountLiquidated, int128 currentPositionSize)',
  'function canLiquidate(uint128 accountId) view returns (bool isEligible)',
  'function flaggedAccounts() view returns (uint256[] accountIds)',
  'function liquidate(uint128 accountId) returns (uint256 liquidationReward)',
  'function liquidateFlagged(uint256 maxNumberOfAccounts) returns (uint256 liquidationReward)',
  'function liquidateFlaggedAccounts(uint128[] accountIds) returns (uint256 liquidationReward)',
  'function liquidationCapacity(uint128 marketId) view returns (uint256 capacity, uint256 maxLiquidationInWindow, uint256 latestLiquidationTimestamp)',
  'error InvalidSettlementWindowDuration(uint256 duration)',
  'event FundingParametersSet(uint128 indexed marketId, uint256 skewScale, uint256 maxFundingVelocity)',
  'event LiquidationParametersSet(uint128 indexed marketId, uint256 initialMarginRatioD18, uint256 maintenanceMarginRatioD18, uint256 minimumInitialMarginRatioD18, uint256 flagRewardRatioD18, uint256 minimumPositionMargin)',
  'event LockedOiRatioSet(uint128 indexed marketId, uint256 lockedOiRatioD18)',
  'event MarketPriceDataUpdated(uint128 indexed marketId, bytes32 feedId, uint256 strictStalenessTolerance)',
  'event MaxLiquidationParametersSet(uint128 indexed marketId, uint256 maxLiquidationLimitAccumulationMultiplier, uint256 maxSecondsInLiquidationWindow, uint256 maxLiquidationPd, address endorsedLiquidator)',
  'event MaxMarketSizeSet(uint128 indexed marketId, uint256 maxMarketSize)',
  'event MaxMarketValueSet(uint128 indexed marketId, uint256 maxMarketValue)',
  'event OrderFeesSet(uint128 indexed marketId, uint256 makerFeeRatio, uint256 takerFeeRatio)',
  'event SettlementStrategyAdded(uint128 indexed marketId, tuple(uint8 strategyType, uint256 settlementDelay, uint256 settlementWindowDuration, address priceVerificationContract, bytes32 feedId, uint256 settlementReward, bool disabled, uint256 commitmentPriceDelay) strategy, uint256 indexed strategyId)',
  'event SettlementStrategySet(uint128 indexed marketId, uint256 indexed strategyId, tuple(uint8 strategyType, uint256 settlementDelay, uint256 settlementWindowDuration, address priceVerificationContract, bytes32 feedId, uint256 settlementReward, bool disabled, uint256 commitmentPriceDelay) strategy)',
  'function addSettlementStrategy(uint128 marketId, tuple(uint8 strategyType, uint256 settlementDelay, uint256 settlementWindowDuration, address priceVerificationContract, bytes32 feedId, uint256 settlementReward, bool disabled, uint256 commitmentPriceDelay) strategy) returns (uint256 strategyId)',
  'function getFundingParameters(uint128 marketId) view returns (uint256 skewScale, uint256 maxFundingVelocity)',
  'function getLiquidationParameters(uint128 marketId) view returns (uint256 initialMarginRatioD18, uint256 minimumInitialMarginRatioD18, uint256 maintenanceMarginScalarD18, uint256 flagRewardRatioD18, uint256 minimumPositionMargin)',
  'function getLockedOiRatio(uint128 marketId) view returns (uint256)',
  'function getMaxLiquidationParameters(uint128 marketId) view returns (uint256 maxLiquidationLimitAccumulationMultiplier, uint256 maxSecondsInLiquidationWindow, uint256 maxLiquidationPd, address endorsedLiquidator)',
  'function getMaxMarketSize(uint128 marketId) view returns (uint256 maxMarketSize)',
  'function getMaxMarketValue(uint128 marketId) view returns (uint256 maxMarketValue)',
  'function getOrderFees(uint128 marketId) view returns (uint256 makerFee, uint256 takerFee)',
  'function getPriceData(uint128 perpsMarketId) view returns (bytes32 feedId, uint256 strictStalenessTolerance)',
  'function getSettlementStrategy(uint128 marketId, uint256 strategyId) view returns (tuple(uint8 strategyType, uint256 settlementDelay, uint256 settlementWindowDuration, address priceVerificationContract, bytes32 feedId, uint256 settlementReward, bool disabled, uint256 commitmentPriceDelay) settlementStrategy)',
  'function setFundingParameters(uint128 marketId, uint256 skewScale, uint256 maxFundingVelocity)',
  'function setLiquidationParameters(uint128 marketId, uint256 initialMarginRatioD18, uint256 minimumInitialMarginRatioD18, uint256 maintenanceMarginScalarD18, uint256 flagRewardRatioD18, uint256 minimumPositionMargin)',
  'function setLockedOiRatio(uint128 marketId, uint256 lockedOiRatioD18)',
  'function setMaxLiquidationParameters(uint128 marketId, uint256 maxLiquidationLimitAccumulationMultiplier, uint256 maxSecondsInLiquidationWindow, uint256 maxLiquidationPd, address endorsedLiquidator)',
  'function setMaxMarketSize(uint128 marketId, uint256 maxMarketSize)',
  'function setMaxMarketValue(uint128 marketId, uint256 maxMarketValue)',
  'function setOrderFees(uint128 marketId, uint256 makerFeeRatio, uint256 takerFeeRatio)',
  'function setSettlementStrategy(uint128 marketId, uint256 strategyId, tuple(uint8 strategyType, uint256 settlementDelay, uint256 settlementWindowDuration, address priceVerificationContract, bytes32 feedId, uint256 settlementReward, bool disabled, uint256 commitmentPriceDelay) strategy)',
  'function setSettlementStrategyEnabled(uint128 marketId, uint256 strategyId, bool enabled)',
  'function updatePriceData(uint128 perpsMarketId, bytes32 feedId, uint256 strictStalenessTolerance)',
  'error InvalidFeeCollectorInterface(address invalidFeeCollector)',
  'error InvalidInterestRateParameters(uint128 lowUtilizationInterestRateGradient, uint128 highUtilizationInterestRateGradient)',
  'error InvalidReferrerShareRatio(uint256 shareRatioD18)',
  'event CollateralConfigurationSet(uint128 indexed synthMarketId, uint256 maxCollateralAmount)',
  'event FeeCollectorSet(address feeCollector)',
  'event InterestRateParametersSet(uint256 lowUtilizationInterestRateGradient, uint256 interestRateGradientBreakpoint, uint256 highUtilizationInterestRateGradient)',
  'event InterestRateUpdated(uint128 indexed superMarketId, uint128 interestRate)',
  'event KeeperCostNodeIdUpdated(bytes32 keeperCostNodeId)',
  'event KeeperRewardGuardsSet(uint256 minKeeperRewardUsd, uint256 minKeeperProfitRatioD18, uint256 maxKeeperRewardUsd, uint256 maxKeeperScalingRatioD18)',
  'event PerAccountCapsSet(uint128 maxPositionsPerAccount, uint128 maxCollateralsPerAccount)',
  'event ReferrerShareUpdated(address referrer, uint256 shareRatioD18)',
  'event SynthDeductionPrioritySet(uint128[] newSynthDeductionPriority)',
  'function getCollateralConfiguration(uint128 synthMarketId) view returns (uint256 maxCollateralAmount)',
  'function getFeeCollector() view returns (address feeCollector)',
  'function getInterestRateParameters() view returns (uint128 lowUtilizationInterestRateGradient, uint128 interestRateGradientBreakpoint, uint128 highUtilizationInterestRateGradient)',
  'function getKeeperCostNodeId() view returns (bytes32 keeperCostNodeId)',
  'function getKeeperRewardGuards() view returns (uint256 minKeeperRewardUsd, uint256 minKeeperProfitRatioD18, uint256 maxKeeperRewardUsd, uint256 maxKeeperScalingRatioD18)',
  'function getMarkets() view returns (uint256[] marketIds)',
  'function getPerAccountCaps() view returns (uint128 maxPositionsPerAccount, uint128 maxCollateralsPerAccount)',
  'function getReferrerShare(address referrer) view returns (uint256 shareRatioD18)',
  'function getSupportedCollaterals() view returns (uint256[] supportedCollaterals)',
  'function getSynthDeductionPriority() view returns (uint128[])',
  'function setCollateralConfiguration(uint128 synthMarketId, uint256 maxCollateralAmount)',
  'function setFeeCollector(address feeCollector)',
  'function setInterestRateParameters(uint128 lowUtilizationInterestRateGradient, uint128 interestRateGradientBreakpoint, uint128 highUtilizationInterestRateGradient)',
  'function setKeeperRewardGuards(uint256 minKeeperRewardUsd, uint256 minKeeperProfitRatioD18, uint256 maxKeeperRewardUsd, uint256 maxKeeperScalingRatioD18)',
  'function setPerAccountCaps(uint128 maxPositionsPerAccount, uint128 maxCollateralsPerAccount)',
  'function setSynthDeductionPriority(uint128[] newSynthDeductionPriority)',
  'function totalGlobalCollateralValue() view returns (uint256 totalCollateralValue)',
  'function updateInterestRate()',
  'function updateKeeperCostNodeId(bytes32 keeperCostNodeId)',
  'function updateReferrerShare(address referrer, uint256 shareRatioD18)',
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
  PopulatedTransaction,
  Signer,
  utils,
} from 'ethers';
import type { FunctionFragment, Result, EventFragment } from '@ethersproject/abi';
import type { Listener, Provider } from '@ethersproject/providers';
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from './common';

export interface PerpsMarketProxyInterface extends utils.Interface {
  functions: {
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
    'getAssociatedSystem(bytes32)': FunctionFragment;
    'initOrUpgradeNft(bytes32,string,string,string,address)': FunctionFragment;
    'initOrUpgradeToken(bytes32,string,string,uint8,address)': FunctionFragment;
    'registerUnmanagedSystem(bytes32,address)': FunctionFragment;
    'acceptOwnership()': FunctionFragment;
    'getImplementation()': FunctionFragment;
    'nominateNewOwner(address)': FunctionFragment;
    'nominatedOwner()': FunctionFragment;
    'owner()': FunctionFragment;
    'renounceNomination()': FunctionFragment;
    'simulateUpgradeTo(address)': FunctionFragment;
    'upgradeTo(address)': FunctionFragment;
    'createMarket(uint128,string,string)': FunctionFragment;
    'initializeFactory(address,address)': FunctionFragment;
    'interestRate()': FunctionFragment;
    'minimumCredit(uint128)': FunctionFragment;
    'name(uint128)': FunctionFragment;
    'reportedDebt(uint128)': FunctionFragment;
    'setPerpsMarketName(string)': FunctionFragment;
    'supportsInterface(bytes4)': FunctionFragment;
    'utilizationRate()': FunctionFragment;
    'getAccountCollateralIds(uint128)': FunctionFragment;
    'getAccountOpenPositions(uint128)': FunctionFragment;
    'getAvailableMargin(uint128)': FunctionFragment;
    'getCollateralAmount(uint128,uint128)': FunctionFragment;
    'getOpenPosition(uint128,uint128)': FunctionFragment;
    'getOpenPositionSize(uint128,uint128)': FunctionFragment;
    'getRequiredMargins(uint128)': FunctionFragment;
    'getWithdrawableMargin(uint128)': FunctionFragment;
    'modifyCollateral(uint128,uint128,int256)': FunctionFragment;
    'totalAccountOpenInterest(uint128)': FunctionFragment;
    'totalCollateralValue(uint128)': FunctionFragment;
    'currentFundingRate(uint128)': FunctionFragment;
    'currentFundingVelocity(uint128)': FunctionFragment;
    'fillPrice(uint128,int128,uint256)': FunctionFragment;
    'getMarketSummary(uint128)': FunctionFragment;
    'indexPrice(uint128)': FunctionFragment;
    'maxOpenInterest(uint128)': FunctionFragment;
    'metadata(uint128)': FunctionFragment;
    'size(uint128)': FunctionFragment;
    'skew(uint128)': FunctionFragment;
    'commitOrder((uint128,uint128,int128,uint128,uint256,bytes32,address))': FunctionFragment;
    'computeOrderFees(uint128,int128)': FunctionFragment;
    'computeOrderFeesWithPrice(uint128,int128,uint256)': FunctionFragment;
    'getOrder(uint128)': FunctionFragment;
    'getSettlementRewardCost(uint128,uint128)': FunctionFragment;
    'requiredMarginForOrder(uint128,uint128,int128)': FunctionFragment;
    'requiredMarginForOrderWithPrice(uint128,uint128,int128,uint256)': FunctionFragment;
    'settleOrder(uint128)': FunctionFragment;
    'cancelOrder(uint128)': FunctionFragment;
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
    'canLiquidate(uint128)': FunctionFragment;
    'flaggedAccounts()': FunctionFragment;
    'liquidate(uint128)': FunctionFragment;
    'liquidateFlagged(uint256)': FunctionFragment;
    'liquidateFlaggedAccounts(uint128[])': FunctionFragment;
    'liquidationCapacity(uint128)': FunctionFragment;
    'addSettlementStrategy(uint128,(uint8,uint256,uint256,address,bytes32,uint256,bool,uint256))': FunctionFragment;
    'getFundingParameters(uint128)': FunctionFragment;
    'getLiquidationParameters(uint128)': FunctionFragment;
    'getLockedOiRatio(uint128)': FunctionFragment;
    'getMaxLiquidationParameters(uint128)': FunctionFragment;
    'getMaxMarketSize(uint128)': FunctionFragment;
    'getMaxMarketValue(uint128)': FunctionFragment;
    'getOrderFees(uint128)': FunctionFragment;
    'getPriceData(uint128)': FunctionFragment;
    'getSettlementStrategy(uint128,uint256)': FunctionFragment;
    'setFundingParameters(uint128,uint256,uint256)': FunctionFragment;
    'setLiquidationParameters(uint128,uint256,uint256,uint256,uint256,uint256)': FunctionFragment;
    'setLockedOiRatio(uint128,uint256)': FunctionFragment;
    'setMaxLiquidationParameters(uint128,uint256,uint256,uint256,address)': FunctionFragment;
    'setMaxMarketSize(uint128,uint256)': FunctionFragment;
    'setMaxMarketValue(uint128,uint256)': FunctionFragment;
    'setOrderFees(uint128,uint256,uint256)': FunctionFragment;
    'setSettlementStrategy(uint128,uint256,(uint8,uint256,uint256,address,bytes32,uint256,bool,uint256))': FunctionFragment;
    'setSettlementStrategyEnabled(uint128,uint256,bool)': FunctionFragment;
    'updatePriceData(uint128,bytes32,uint256)': FunctionFragment;
    'getCollateralConfiguration(uint128)': FunctionFragment;
    'getFeeCollector()': FunctionFragment;
    'getInterestRateParameters()': FunctionFragment;
    'getKeeperCostNodeId()': FunctionFragment;
    'getKeeperRewardGuards()': FunctionFragment;
    'getMarkets()': FunctionFragment;
    'getPerAccountCaps()': FunctionFragment;
    'getReferrerShare(address)': FunctionFragment;
    'getSupportedCollaterals()': FunctionFragment;
    'getSynthDeductionPriority()': FunctionFragment;
    'setCollateralConfiguration(uint128,uint256)': FunctionFragment;
    'setFeeCollector(address)': FunctionFragment;
    'setInterestRateParameters(uint128,uint128,uint128)': FunctionFragment;
    'setKeeperRewardGuards(uint256,uint256,uint256,uint256)': FunctionFragment;
    'setPerAccountCaps(uint128,uint128)': FunctionFragment;
    'setSynthDeductionPriority(uint128[])': FunctionFragment;
    'totalGlobalCollateralValue()': FunctionFragment;
    'updateInterestRate()': FunctionFragment;
    'updateKeeperCostNodeId(bytes32)': FunctionFragment;
    'updateReferrerShare(address,uint256)': FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
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
      | 'getAssociatedSystem'
      | 'initOrUpgradeNft'
      | 'initOrUpgradeToken'
      | 'registerUnmanagedSystem'
      | 'acceptOwnership'
      | 'getImplementation'
      | 'nominateNewOwner'
      | 'nominatedOwner'
      | 'owner'
      | 'renounceNomination'
      | 'simulateUpgradeTo'
      | 'upgradeTo'
      | 'createMarket'
      | 'initializeFactory'
      | 'interestRate'
      | 'minimumCredit'
      | 'name'
      | 'reportedDebt'
      | 'setPerpsMarketName'
      | 'supportsInterface'
      | 'utilizationRate'
      | 'getAccountCollateralIds'
      | 'getAccountOpenPositions'
      | 'getAvailableMargin'
      | 'getCollateralAmount'
      | 'getOpenPosition'
      | 'getOpenPositionSize'
      | 'getRequiredMargins'
      | 'getWithdrawableMargin'
      | 'modifyCollateral'
      | 'totalAccountOpenInterest'
      | 'totalCollateralValue'
      | 'currentFundingRate'
      | 'currentFundingVelocity'
      | 'fillPrice'
      | 'getMarketSummary'
      | 'indexPrice'
      | 'maxOpenInterest'
      | 'metadata'
      | 'size'
      | 'skew'
      | 'commitOrder'
      | 'computeOrderFees'
      | 'computeOrderFeesWithPrice'
      | 'getOrder'
      | 'getSettlementRewardCost'
      | 'requiredMarginForOrder'
      | 'requiredMarginForOrderWithPrice'
      | 'settleOrder'
      | 'cancelOrder'
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
      | 'canLiquidate'
      | 'flaggedAccounts'
      | 'liquidate'
      | 'liquidateFlagged'
      | 'liquidateFlaggedAccounts'
      | 'liquidationCapacity'
      | 'addSettlementStrategy'
      | 'getFundingParameters'
      | 'getLiquidationParameters'
      | 'getLockedOiRatio'
      | 'getMaxLiquidationParameters'
      | 'getMaxMarketSize'
      | 'getMaxMarketValue'
      | 'getOrderFees'
      | 'getPriceData'
      | 'getSettlementStrategy'
      | 'setFundingParameters'
      | 'setLiquidationParameters'
      | 'setLockedOiRatio'
      | 'setMaxLiquidationParameters'
      | 'setMaxMarketSize'
      | 'setMaxMarketValue'
      | 'setOrderFees'
      | 'setSettlementStrategy'
      | 'setSettlementStrategyEnabled'
      | 'updatePriceData'
      | 'getCollateralConfiguration'
      | 'getFeeCollector'
      | 'getInterestRateParameters'
      | 'getKeeperCostNodeId'
      | 'getKeeperRewardGuards'
      | 'getMarkets'
      | 'getPerAccountCaps'
      | 'getReferrerShare'
      | 'getSupportedCollaterals'
      | 'getSynthDeductionPriority'
      | 'setCollateralConfiguration'
      | 'setFeeCollector'
      | 'setInterestRateParameters'
      | 'setKeeperRewardGuards'
      | 'setPerAccountCaps'
      | 'setSynthDeductionPriority'
      | 'totalGlobalCollateralValue'
      | 'updateInterestRate'
      | 'updateKeeperCostNodeId'
      | 'updateReferrerShare'
  ): FunctionFragment;

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
  encodeFunctionData(functionFragment: 'acceptOwnership', values?: undefined): string;
  encodeFunctionData(functionFragment: 'getImplementation', values?: undefined): string;
  encodeFunctionData(functionFragment: 'nominateNewOwner', values: [string]): string;
  encodeFunctionData(functionFragment: 'nominatedOwner', values?: undefined): string;
  encodeFunctionData(functionFragment: 'owner', values?: undefined): string;
  encodeFunctionData(functionFragment: 'renounceNomination', values?: undefined): string;
  encodeFunctionData(functionFragment: 'simulateUpgradeTo', values: [string]): string;
  encodeFunctionData(functionFragment: 'upgradeTo', values: [string]): string;
  encodeFunctionData(
    functionFragment: 'createMarket',
    values: [BigNumberish, string, string]
  ): string;
  encodeFunctionData(functionFragment: 'initializeFactory', values: [string, string]): string;
  encodeFunctionData(functionFragment: 'interestRate', values?: undefined): string;
  encodeFunctionData(functionFragment: 'minimumCredit', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'name', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'reportedDebt', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'setPerpsMarketName', values: [string]): string;
  encodeFunctionData(functionFragment: 'supportsInterface', values: [BytesLike]): string;
  encodeFunctionData(functionFragment: 'utilizationRate', values?: undefined): string;
  encodeFunctionData(functionFragment: 'getAccountCollateralIds', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'getAccountOpenPositions', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'getAvailableMargin', values: [BigNumberish]): string;
  encodeFunctionData(
    functionFragment: 'getCollateralAmount',
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: 'getOpenPosition',
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: 'getOpenPositionSize',
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: 'getRequiredMargins', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'getWithdrawableMargin', values: [BigNumberish]): string;
  encodeFunctionData(
    functionFragment: 'modifyCollateral',
    values: [BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: 'totalAccountOpenInterest', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'totalCollateralValue', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'currentFundingRate', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'currentFundingVelocity', values: [BigNumberish]): string;
  encodeFunctionData(
    functionFragment: 'fillPrice',
    values: [BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: 'getMarketSummary', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'indexPrice', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'maxOpenInterest', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'metadata', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'size', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'skew', values: [BigNumberish]): string;
  encodeFunctionData(
    functionFragment: 'commitOrder',
    values: [
      {
        marketId: BigNumberish;
        accountId: BigNumberish;
        sizeDelta: BigNumberish;
        settlementStrategyId: BigNumberish;
        acceptablePrice: BigNumberish;
        trackingCode: BytesLike;
        referrer: string;
      }
    ]
  ): string;
  encodeFunctionData(
    functionFragment: 'computeOrderFees',
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: 'computeOrderFeesWithPrice',
    values: [BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: 'getOrder', values: [BigNumberish]): string;
  encodeFunctionData(
    functionFragment: 'getSettlementRewardCost',
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: 'requiredMarginForOrder',
    values: [BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: 'requiredMarginForOrderWithPrice',
    values: [BigNumberish, BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: 'settleOrder', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'cancelOrder', values: [BigNumberish]): string;
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
  encodeFunctionData(functionFragment: 'canLiquidate', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'flaggedAccounts', values?: undefined): string;
  encodeFunctionData(functionFragment: 'liquidate', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'liquidateFlagged', values: [BigNumberish]): string;
  encodeFunctionData(
    functionFragment: 'liquidateFlaggedAccounts',
    values: [BigNumberish[]]
  ): string;
  encodeFunctionData(functionFragment: 'liquidationCapacity', values: [BigNumberish]): string;
  encodeFunctionData(
    functionFragment: 'addSettlementStrategy',
    values: [
      BigNumberish,
      {
        strategyType: BigNumberish;
        settlementDelay: BigNumberish;
        settlementWindowDuration: BigNumberish;
        priceVerificationContract: string;
        feedId: BytesLike;
        settlementReward: BigNumberish;
        disabled: boolean;
        commitmentPriceDelay: BigNumberish;
      }
    ]
  ): string;
  encodeFunctionData(functionFragment: 'getFundingParameters', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'getLiquidationParameters', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'getLockedOiRatio', values: [BigNumberish]): string;
  encodeFunctionData(
    functionFragment: 'getMaxLiquidationParameters',
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: 'getMaxMarketSize', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'getMaxMarketValue', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'getOrderFees', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'getPriceData', values: [BigNumberish]): string;
  encodeFunctionData(
    functionFragment: 'getSettlementStrategy',
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: 'setFundingParameters',
    values: [BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: 'setLiquidationParameters',
    values: [BigNumberish, BigNumberish, BigNumberish, BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: 'setLockedOiRatio',
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: 'setMaxLiquidationParameters',
    values: [BigNumberish, BigNumberish, BigNumberish, BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: 'setMaxMarketSize',
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: 'setMaxMarketValue',
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: 'setOrderFees',
    values: [BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: 'setSettlementStrategy',
    values: [
      BigNumberish,
      BigNumberish,
      {
        strategyType: BigNumberish;
        settlementDelay: BigNumberish;
        settlementWindowDuration: BigNumberish;
        priceVerificationContract: string;
        feedId: BytesLike;
        settlementReward: BigNumberish;
        disabled: boolean;
        commitmentPriceDelay: BigNumberish;
      }
    ]
  ): string;
  encodeFunctionData(
    functionFragment: 'setSettlementStrategyEnabled',
    values: [BigNumberish, BigNumberish, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: 'updatePriceData',
    values: [BigNumberish, BytesLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: 'getCollateralConfiguration',
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: 'getFeeCollector', values?: undefined): string;
  encodeFunctionData(functionFragment: 'getInterestRateParameters', values?: undefined): string;
  encodeFunctionData(functionFragment: 'getKeeperCostNodeId', values?: undefined): string;
  encodeFunctionData(functionFragment: 'getKeeperRewardGuards', values?: undefined): string;
  encodeFunctionData(functionFragment: 'getMarkets', values?: undefined): string;
  encodeFunctionData(functionFragment: 'getPerAccountCaps', values?: undefined): string;
  encodeFunctionData(functionFragment: 'getReferrerShare', values: [string]): string;
  encodeFunctionData(functionFragment: 'getSupportedCollaterals', values?: undefined): string;
  encodeFunctionData(functionFragment: 'getSynthDeductionPriority', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'setCollateralConfiguration',
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: 'setFeeCollector', values: [string]): string;
  encodeFunctionData(
    functionFragment: 'setInterestRateParameters',
    values: [BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: 'setKeeperRewardGuards',
    values: [BigNumberish, BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: 'setPerAccountCaps',
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: 'setSynthDeductionPriority',
    values: [BigNumberish[]]
  ): string;
  encodeFunctionData(functionFragment: 'totalGlobalCollateralValue', values?: undefined): string;
  encodeFunctionData(functionFragment: 'updateInterestRate', values?: undefined): string;
  encodeFunctionData(functionFragment: 'updateKeeperCostNodeId', values: [BytesLike]): string;
  encodeFunctionData(
    functionFragment: 'updateReferrerShare',
    values: [string, BigNumberish]
  ): string;

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
  decodeFunctionResult(functionFragment: 'getAssociatedSystem', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'initOrUpgradeNft', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'initOrUpgradeToken', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'registerUnmanagedSystem', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'acceptOwnership', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getImplementation', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'nominateNewOwner', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'nominatedOwner', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'owner', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'renounceNomination', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'simulateUpgradeTo', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'upgradeTo', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'createMarket', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'initializeFactory', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'interestRate', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'minimumCredit', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'name', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'reportedDebt', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setPerpsMarketName', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'supportsInterface', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'utilizationRate', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getAccountCollateralIds', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getAccountOpenPositions', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getAvailableMargin', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getCollateralAmount', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getOpenPosition', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getOpenPositionSize', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getRequiredMargins', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getWithdrawableMargin', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'modifyCollateral', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'totalAccountOpenInterest', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'totalCollateralValue', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'currentFundingRate', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'currentFundingVelocity', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'fillPrice', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getMarketSummary', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'indexPrice', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'maxOpenInterest', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'metadata', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'size', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'skew', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'commitOrder', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'computeOrderFees', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'computeOrderFeesWithPrice', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getOrder', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getSettlementRewardCost', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'requiredMarginForOrder', data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: 'requiredMarginForOrderWithPrice',
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: 'settleOrder', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'cancelOrder', data: BytesLike): Result;
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
  decodeFunctionResult(functionFragment: 'canLiquidate', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'flaggedAccounts', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'liquidate', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'liquidateFlagged', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'liquidateFlaggedAccounts', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'liquidationCapacity', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'addSettlementStrategy', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getFundingParameters', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getLiquidationParameters', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getLockedOiRatio', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getMaxLiquidationParameters', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getMaxMarketSize', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getMaxMarketValue', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getOrderFees', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getPriceData', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getSettlementStrategy', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setFundingParameters', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setLiquidationParameters', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setLockedOiRatio', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setMaxLiquidationParameters', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setMaxMarketSize', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setMaxMarketValue', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setOrderFees', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setSettlementStrategy', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setSettlementStrategyEnabled', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'updatePriceData', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getCollateralConfiguration', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getFeeCollector', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getInterestRateParameters', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getKeeperCostNodeId', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getKeeperRewardGuards', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getMarkets', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getPerAccountCaps', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getReferrerShare', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getSupportedCollaterals', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getSynthDeductionPriority', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setCollateralConfiguration', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setFeeCollector', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setInterestRateParameters', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setKeeperRewardGuards', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setPerAccountCaps', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setSynthDeductionPriority', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'totalGlobalCollateralValue', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'updateInterestRate', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'updateKeeperCostNodeId', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'updateReferrerShare', data: BytesLike): Result;

  events: {
    'AccountCreated(uint128,address)': EventFragment;
    'PermissionGranted(uint128,bytes32,address,address)': EventFragment;
    'PermissionRevoked(uint128,bytes32,address,address)': EventFragment;
    'AssociatedSystemSet(bytes32,bytes32,address,address)': EventFragment;
    'OwnerChanged(address,address)': EventFragment;
    'OwnerNominated(address)': EventFragment;
    'Upgraded(address,address)': EventFragment;
    'FactoryInitialized(uint128)': EventFragment;
    'MarketCreated(uint128,string,string)': EventFragment;
    'CollateralModified(uint128,uint128,int256,address)': EventFragment;
    'OrderCommitted(uint128,uint128,uint8,int128,uint256,uint256,uint256,uint256,uint256,bytes32,address)': EventFragment;
    'PreviousOrderExpired(uint128,uint128,int128,uint256,uint256,bytes32)': EventFragment;
    'CollateralDeducted(uint256,uint128,uint256)': EventFragment;
    'InterestCharged(uint128,uint256)': EventFragment;
    'MarketUpdated(uint128,uint256,int256,uint256,int256,int256,int256,uint128)': EventFragment;
    'OrderSettled(uint128,uint128,uint256,int256,int256,int128,int128,uint256,uint256,uint256,uint256,bytes32,address)': EventFragment;
    'OrderCancelled(uint128,uint128,uint256,uint256,int128,uint256,bytes32,address)': EventFragment;
    'FeatureFlagAllowAllSet(bytes32,bool)': EventFragment;
    'FeatureFlagAllowlistAdded(bytes32,address)': EventFragment;
    'FeatureFlagAllowlistRemoved(bytes32,address)': EventFragment;
    'FeatureFlagDeniersReset(bytes32,address[])': EventFragment;
    'FeatureFlagDenyAllSet(bytes32,bool)': EventFragment;
    'AccountFlaggedForLiquidation(uint128,int256,uint256,uint256,uint256)': EventFragment;
    'AccountLiquidationAttempt(uint128,uint256,bool)': EventFragment;
    'PositionLiquidated(uint128,uint128,uint256,int128)': EventFragment;
    'FundingParametersSet(uint128,uint256,uint256)': EventFragment;
    'LiquidationParametersSet(uint128,uint256,uint256,uint256,uint256,uint256)': EventFragment;
    'LockedOiRatioSet(uint128,uint256)': EventFragment;
    'MarketPriceDataUpdated(uint128,bytes32,uint256)': EventFragment;
    'MaxLiquidationParametersSet(uint128,uint256,uint256,uint256,address)': EventFragment;
    'MaxMarketSizeSet(uint128,uint256)': EventFragment;
    'MaxMarketValueSet(uint128,uint256)': EventFragment;
    'OrderFeesSet(uint128,uint256,uint256)': EventFragment;
    'SettlementStrategyAdded(uint128,(uint8,uint256,uint256,address,bytes32,uint256,bool,uint256),uint256)': EventFragment;
    'SettlementStrategySet(uint128,uint256,(uint8,uint256,uint256,address,bytes32,uint256,bool,uint256))': EventFragment;
    'CollateralConfigurationSet(uint128,uint256)': EventFragment;
    'FeeCollectorSet(address)': EventFragment;
    'InterestRateParametersSet(uint256,uint256,uint256)': EventFragment;
    'InterestRateUpdated(uint128,uint128)': EventFragment;
    'KeeperCostNodeIdUpdated(bytes32)': EventFragment;
    'KeeperRewardGuardsSet(uint256,uint256,uint256,uint256)': EventFragment;
    'PerAccountCapsSet(uint128,uint128)': EventFragment;
    'ReferrerShareUpdated(address,uint256)': EventFragment;
    'SynthDeductionPrioritySet(uint128[])': EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: 'AccountCreated'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'PermissionGranted'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'PermissionRevoked'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'AssociatedSystemSet'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'OwnerChanged'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'OwnerNominated'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'Upgraded'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'FactoryInitialized'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'MarketCreated'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'CollateralModified'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'OrderCommitted'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'PreviousOrderExpired'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'CollateralDeducted'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'InterestCharged'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'MarketUpdated'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'OrderSettled'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'OrderCancelled'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'FeatureFlagAllowAllSet'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'FeatureFlagAllowlistAdded'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'FeatureFlagAllowlistRemoved'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'FeatureFlagDeniersReset'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'FeatureFlagDenyAllSet'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'AccountFlaggedForLiquidation'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'AccountLiquidationAttempt'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'PositionLiquidated'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'FundingParametersSet'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'LiquidationParametersSet'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'LockedOiRatioSet'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'MarketPriceDataUpdated'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'MaxLiquidationParametersSet'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'MaxMarketSizeSet'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'MaxMarketValueSet'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'OrderFeesSet'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'SettlementStrategyAdded'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'SettlementStrategySet'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'CollateralConfigurationSet'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'FeeCollectorSet'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'InterestRateParametersSet'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'InterestRateUpdated'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'KeeperCostNodeIdUpdated'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'KeeperRewardGuardsSet'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'PerAccountCapsSet'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'ReferrerShareUpdated'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'SynthDeductionPrioritySet'): EventFragment;
}

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

export interface FactoryInitializedEventObject {
  globalPerpsMarketId: BigNumber;
}
export type FactoryInitializedEvent = TypedEvent<[BigNumber], FactoryInitializedEventObject>;

export type FactoryInitializedEventFilter = TypedEventFilter<FactoryInitializedEvent>;

export interface MarketCreatedEventObject {
  perpsMarketId: BigNumber;
  marketName: string;
  marketSymbol: string;
}
export type MarketCreatedEvent = TypedEvent<[BigNumber, string, string], MarketCreatedEventObject>;

export type MarketCreatedEventFilter = TypedEventFilter<MarketCreatedEvent>;

export interface CollateralModifiedEventObject {
  accountId: BigNumber;
  synthMarketId: BigNumber;
  amountDelta: BigNumber;
  sender: string;
}
export type CollateralModifiedEvent = TypedEvent<
  [BigNumber, BigNumber, BigNumber, string],
  CollateralModifiedEventObject
>;

export type CollateralModifiedEventFilter = TypedEventFilter<CollateralModifiedEvent>;

export interface OrderCommittedEventObject {
  marketId: BigNumber;
  accountId: BigNumber;
  orderType: number;
  sizeDelta: BigNumber;
  acceptablePrice: BigNumber;
  commitmentTime: BigNumber;
  expectedPriceTime: BigNumber;
  settlementTime: BigNumber;
  expirationTime: BigNumber;
  trackingCode: string;
  sender: string;
}
export type OrderCommittedEvent = TypedEvent<
  [
    BigNumber,
    BigNumber,
    number,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    string,
    string
  ],
  OrderCommittedEventObject
>;

export type OrderCommittedEventFilter = TypedEventFilter<OrderCommittedEvent>;

export interface PreviousOrderExpiredEventObject {
  marketId: BigNumber;
  accountId: BigNumber;
  sizeDelta: BigNumber;
  acceptablePrice: BigNumber;
  commitmentTime: BigNumber;
  trackingCode: string;
}
export type PreviousOrderExpiredEvent = TypedEvent<
  [BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, string],
  PreviousOrderExpiredEventObject
>;

export type PreviousOrderExpiredEventFilter = TypedEventFilter<PreviousOrderExpiredEvent>;

export interface CollateralDeductedEventObject {
  account: BigNumber;
  synthMarketId: BigNumber;
  amount: BigNumber;
}
export type CollateralDeductedEvent = TypedEvent<
  [BigNumber, BigNumber, BigNumber],
  CollateralDeductedEventObject
>;

export type CollateralDeductedEventFilter = TypedEventFilter<CollateralDeductedEvent>;

export interface InterestChargedEventObject {
  accountId: BigNumber;
  interest: BigNumber;
}
export type InterestChargedEvent = TypedEvent<[BigNumber, BigNumber], InterestChargedEventObject>;

export type InterestChargedEventFilter = TypedEventFilter<InterestChargedEvent>;

export interface MarketUpdatedEventObject {
  marketId: BigNumber;
  price: BigNumber;
  skew: BigNumber;
  size: BigNumber;
  sizeDelta: BigNumber;
  currentFundingRate: BigNumber;
  currentFundingVelocity: BigNumber;
  interestRate: BigNumber;
}
export type MarketUpdatedEvent = TypedEvent<
  [BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber],
  MarketUpdatedEventObject
>;

export type MarketUpdatedEventFilter = TypedEventFilter<MarketUpdatedEvent>;

export interface OrderSettledEventObject {
  marketId: BigNumber;
  accountId: BigNumber;
  fillPrice: BigNumber;
  pnl: BigNumber;
  accruedFunding: BigNumber;
  sizeDelta: BigNumber;
  newSize: BigNumber;
  totalFees: BigNumber;
  referralFees: BigNumber;
  collectedFees: BigNumber;
  settlementReward: BigNumber;
  trackingCode: string;
  settler: string;
}
export type OrderSettledEvent = TypedEvent<
  [
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    string,
    string
  ],
  OrderSettledEventObject
>;

export type OrderSettledEventFilter = TypedEventFilter<OrderSettledEvent>;

export interface OrderCancelledEventObject {
  marketId: BigNumber;
  accountId: BigNumber;
  desiredPrice: BigNumber;
  fillPrice: BigNumber;
  sizeDelta: BigNumber;
  settlementReward: BigNumber;
  trackingCode: string;
  settler: string;
}
export type OrderCancelledEvent = TypedEvent<
  [BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, string, string],
  OrderCancelledEventObject
>;

export type OrderCancelledEventFilter = TypedEventFilter<OrderCancelledEvent>;

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

export interface AccountFlaggedForLiquidationEventObject {
  accountId: BigNumber;
  availableMargin: BigNumber;
  requiredMaintenanceMargin: BigNumber;
  liquidationReward: BigNumber;
  flagReward: BigNumber;
}
export type AccountFlaggedForLiquidationEvent = TypedEvent<
  [BigNumber, BigNumber, BigNumber, BigNumber, BigNumber],
  AccountFlaggedForLiquidationEventObject
>;

export type AccountFlaggedForLiquidationEventFilter =
  TypedEventFilter<AccountFlaggedForLiquidationEvent>;

export interface AccountLiquidationAttemptEventObject {
  accountId: BigNumber;
  reward: BigNumber;
  fullLiquidation: boolean;
}
export type AccountLiquidationAttemptEvent = TypedEvent<
  [BigNumber, BigNumber, boolean],
  AccountLiquidationAttemptEventObject
>;

export type AccountLiquidationAttemptEventFilter = TypedEventFilter<AccountLiquidationAttemptEvent>;

export interface PositionLiquidatedEventObject {
  accountId: BigNumber;
  marketId: BigNumber;
  amountLiquidated: BigNumber;
  currentPositionSize: BigNumber;
}
export type PositionLiquidatedEvent = TypedEvent<
  [BigNumber, BigNumber, BigNumber, BigNumber],
  PositionLiquidatedEventObject
>;

export type PositionLiquidatedEventFilter = TypedEventFilter<PositionLiquidatedEvent>;

export interface FundingParametersSetEventObject {
  marketId: BigNumber;
  skewScale: BigNumber;
  maxFundingVelocity: BigNumber;
}
export type FundingParametersSetEvent = TypedEvent<
  [BigNumber, BigNumber, BigNumber],
  FundingParametersSetEventObject
>;

export type FundingParametersSetEventFilter = TypedEventFilter<FundingParametersSetEvent>;

export interface LiquidationParametersSetEventObject {
  marketId: BigNumber;
  initialMarginRatioD18: BigNumber;
  maintenanceMarginRatioD18: BigNumber;
  minimumInitialMarginRatioD18: BigNumber;
  flagRewardRatioD18: BigNumber;
  minimumPositionMargin: BigNumber;
}
export type LiquidationParametersSetEvent = TypedEvent<
  [BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber],
  LiquidationParametersSetEventObject
>;

export type LiquidationParametersSetEventFilter = TypedEventFilter<LiquidationParametersSetEvent>;

export interface LockedOiRatioSetEventObject {
  marketId: BigNumber;
  lockedOiRatioD18: BigNumber;
}
export type LockedOiRatioSetEvent = TypedEvent<[BigNumber, BigNumber], LockedOiRatioSetEventObject>;

export type LockedOiRatioSetEventFilter = TypedEventFilter<LockedOiRatioSetEvent>;

export interface MarketPriceDataUpdatedEventObject {
  marketId: BigNumber;
  feedId: string;
  strictStalenessTolerance: BigNumber;
}
export type MarketPriceDataUpdatedEvent = TypedEvent<
  [BigNumber, string, BigNumber],
  MarketPriceDataUpdatedEventObject
>;

export type MarketPriceDataUpdatedEventFilter = TypedEventFilter<MarketPriceDataUpdatedEvent>;

export interface MaxLiquidationParametersSetEventObject {
  marketId: BigNumber;
  maxLiquidationLimitAccumulationMultiplier: BigNumber;
  maxSecondsInLiquidationWindow: BigNumber;
  maxLiquidationPd: BigNumber;
  endorsedLiquidator: string;
}
export type MaxLiquidationParametersSetEvent = TypedEvent<
  [BigNumber, BigNumber, BigNumber, BigNumber, string],
  MaxLiquidationParametersSetEventObject
>;

export type MaxLiquidationParametersSetEventFilter =
  TypedEventFilter<MaxLiquidationParametersSetEvent>;

export interface MaxMarketSizeSetEventObject {
  marketId: BigNumber;
  maxMarketSize: BigNumber;
}
export type MaxMarketSizeSetEvent = TypedEvent<[BigNumber, BigNumber], MaxMarketSizeSetEventObject>;

export type MaxMarketSizeSetEventFilter = TypedEventFilter<MaxMarketSizeSetEvent>;

export interface MaxMarketValueSetEventObject {
  marketId: BigNumber;
  maxMarketValue: BigNumber;
}
export type MaxMarketValueSetEvent = TypedEvent<
  [BigNumber, BigNumber],
  MaxMarketValueSetEventObject
>;

export type MaxMarketValueSetEventFilter = TypedEventFilter<MaxMarketValueSetEvent>;

export interface OrderFeesSetEventObject {
  marketId: BigNumber;
  makerFeeRatio: BigNumber;
  takerFeeRatio: BigNumber;
}
export type OrderFeesSetEvent = TypedEvent<
  [BigNumber, BigNumber, BigNumber],
  OrderFeesSetEventObject
>;

export type OrderFeesSetEventFilter = TypedEventFilter<OrderFeesSetEvent>;

export interface SettlementStrategyAddedEventObject {
  marketId: BigNumber;
  strategy: [number, BigNumber, BigNumber, string, string, BigNumber, boolean, BigNumber] & {
    strategyType: number;
    settlementDelay: BigNumber;
    settlementWindowDuration: BigNumber;
    priceVerificationContract: string;
    feedId: string;
    settlementReward: BigNumber;
    disabled: boolean;
    commitmentPriceDelay: BigNumber;
  };
  strategyId: BigNumber;
}
export type SettlementStrategyAddedEvent = TypedEvent<
  [
    BigNumber,
    [number, BigNumber, BigNumber, string, string, BigNumber, boolean, BigNumber] & {
      strategyType: number;
      settlementDelay: BigNumber;
      settlementWindowDuration: BigNumber;
      priceVerificationContract: string;
      feedId: string;
      settlementReward: BigNumber;
      disabled: boolean;
      commitmentPriceDelay: BigNumber;
    },
    BigNumber
  ],
  SettlementStrategyAddedEventObject
>;

export type SettlementStrategyAddedEventFilter = TypedEventFilter<SettlementStrategyAddedEvent>;

export interface SettlementStrategySetEventObject {
  marketId: BigNumber;
  strategyId: BigNumber;
  strategy: [number, BigNumber, BigNumber, string, string, BigNumber, boolean, BigNumber] & {
    strategyType: number;
    settlementDelay: BigNumber;
    settlementWindowDuration: BigNumber;
    priceVerificationContract: string;
    feedId: string;
    settlementReward: BigNumber;
    disabled: boolean;
    commitmentPriceDelay: BigNumber;
  };
}
export type SettlementStrategySetEvent = TypedEvent<
  [
    BigNumber,
    BigNumber,
    [number, BigNumber, BigNumber, string, string, BigNumber, boolean, BigNumber] & {
      strategyType: number;
      settlementDelay: BigNumber;
      settlementWindowDuration: BigNumber;
      priceVerificationContract: string;
      feedId: string;
      settlementReward: BigNumber;
      disabled: boolean;
      commitmentPriceDelay: BigNumber;
    }
  ],
  SettlementStrategySetEventObject
>;

export type SettlementStrategySetEventFilter = TypedEventFilter<SettlementStrategySetEvent>;

export interface CollateralConfigurationSetEventObject {
  synthMarketId: BigNumber;
  maxCollateralAmount: BigNumber;
}
export type CollateralConfigurationSetEvent = TypedEvent<
  [BigNumber, BigNumber],
  CollateralConfigurationSetEventObject
>;

export type CollateralConfigurationSetEventFilter =
  TypedEventFilter<CollateralConfigurationSetEvent>;

export interface FeeCollectorSetEventObject {
  feeCollector: string;
}
export type FeeCollectorSetEvent = TypedEvent<[string], FeeCollectorSetEventObject>;

export type FeeCollectorSetEventFilter = TypedEventFilter<FeeCollectorSetEvent>;

export interface InterestRateParametersSetEventObject {
  lowUtilizationInterestRateGradient: BigNumber;
  interestRateGradientBreakpoint: BigNumber;
  highUtilizationInterestRateGradient: BigNumber;
}
export type InterestRateParametersSetEvent = TypedEvent<
  [BigNumber, BigNumber, BigNumber],
  InterestRateParametersSetEventObject
>;

export type InterestRateParametersSetEventFilter = TypedEventFilter<InterestRateParametersSetEvent>;

export interface InterestRateUpdatedEventObject {
  superMarketId: BigNumber;
  interestRate: BigNumber;
}
export type InterestRateUpdatedEvent = TypedEvent<
  [BigNumber, BigNumber],
  InterestRateUpdatedEventObject
>;

export type InterestRateUpdatedEventFilter = TypedEventFilter<InterestRateUpdatedEvent>;

export interface KeeperCostNodeIdUpdatedEventObject {
  keeperCostNodeId: string;
}
export type KeeperCostNodeIdUpdatedEvent = TypedEvent<[string], KeeperCostNodeIdUpdatedEventObject>;

export type KeeperCostNodeIdUpdatedEventFilter = TypedEventFilter<KeeperCostNodeIdUpdatedEvent>;

export interface KeeperRewardGuardsSetEventObject {
  minKeeperRewardUsd: BigNumber;
  minKeeperProfitRatioD18: BigNumber;
  maxKeeperRewardUsd: BigNumber;
  maxKeeperScalingRatioD18: BigNumber;
}
export type KeeperRewardGuardsSetEvent = TypedEvent<
  [BigNumber, BigNumber, BigNumber, BigNumber],
  KeeperRewardGuardsSetEventObject
>;

export type KeeperRewardGuardsSetEventFilter = TypedEventFilter<KeeperRewardGuardsSetEvent>;

export interface PerAccountCapsSetEventObject {
  maxPositionsPerAccount: BigNumber;
  maxCollateralsPerAccount: BigNumber;
}
export type PerAccountCapsSetEvent = TypedEvent<
  [BigNumber, BigNumber],
  PerAccountCapsSetEventObject
>;

export type PerAccountCapsSetEventFilter = TypedEventFilter<PerAccountCapsSetEvent>;

export interface ReferrerShareUpdatedEventObject {
  referrer: string;
  shareRatioD18: BigNumber;
}
export type ReferrerShareUpdatedEvent = TypedEvent<
  [string, BigNumber],
  ReferrerShareUpdatedEventObject
>;

export type ReferrerShareUpdatedEventFilter = TypedEventFilter<ReferrerShareUpdatedEvent>;

export interface SynthDeductionPrioritySetEventObject {
  newSynthDeductionPriority: BigNumber[];
}
export type SynthDeductionPrioritySetEvent = TypedEvent<
  [BigNumber[]],
  SynthDeductionPrioritySetEventObject
>;

export type SynthDeductionPrioritySetEventFilter = TypedEventFilter<SynthDeductionPrioritySetEvent>;

export interface PerpsMarketProxy extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: PerpsMarketProxyInterface;

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
      [[string, string[]] & { user: string; permissions: string[] }[]] & {
        accountPerms: [string, string[]] & { user: string; permissions: string[] }[];
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

    createMarket(
      requestedMarketId: BigNumberish,
      marketName: string,
      marketSymbol: string,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    initializeFactory(
      synthetix: string,
      spotMarket: string,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    interestRate(overrides?: CallOverrides): Promise<[BigNumber]>;

    minimumCredit(perpsMarketId: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber]>;

    name(perpsMarketId: BigNumberish, overrides?: CallOverrides): Promise<[string]>;

    reportedDebt(perpsMarketId: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber]>;

    setPerpsMarketName(
      marketName: string,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    supportsInterface(interfaceId: BytesLike, overrides?: CallOverrides): Promise<[boolean]>;

    utilizationRate(
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber] & {
        rate: BigNumber;
        delegatedCollateral: BigNumber;
        lockedCredit: BigNumber;
      }
    >;

    getAccountCollateralIds(
      accountId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber[]]>;

    getAccountOpenPositions(
      accountId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber[]]>;

    getAvailableMargin(
      accountId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { availableMargin: BigNumber }>;

    getCollateralAmount(
      accountId: BigNumberish,
      synthMarketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getOpenPosition(
      accountId: BigNumberish,
      marketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, BigNumber] & {
        totalPnl: BigNumber;
        accruedFunding: BigNumber;
        positionSize: BigNumber;
        owedInterest: BigNumber;
      }
    >;

    getOpenPositionSize(
      accountId: BigNumberish,
      marketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { positionSize: BigNumber }>;

    getRequiredMargins(
      accountId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber] & {
        requiredInitialMargin: BigNumber;
        requiredMaintenanceMargin: BigNumber;
        maxLiquidationReward: BigNumber;
      }
    >;

    getWithdrawableMargin(
      accountId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { withdrawableMargin: BigNumber }>;

    modifyCollateral(
      accountId: BigNumberish,
      synthMarketId: BigNumberish,
      amountDelta: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    totalAccountOpenInterest(
      accountId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    totalCollateralValue(accountId: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber]>;

    currentFundingRate(marketId: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber]>;

    currentFundingVelocity(marketId: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber]>;

    fillPrice(
      marketId: BigNumberish,
      orderSize: BigNumberish,
      price: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getMarketSummary(
      marketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [
        [BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber] & {
          skew: BigNumber;
          size: BigNumber;
          maxOpenInterest: BigNumber;
          currentFundingRate: BigNumber;
          currentFundingVelocity: BigNumber;
          indexPrice: BigNumber;
        }
      ] & {
        summary: [BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber] & {
          skew: BigNumber;
          size: BigNumber;
          maxOpenInterest: BigNumber;
          currentFundingRate: BigNumber;
          currentFundingVelocity: BigNumber;
          indexPrice: BigNumber;
        };
      }
    >;

    indexPrice(marketId: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber]>;

    maxOpenInterest(marketId: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber]>;

    metadata(
      marketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string, string] & { name: string; symbol: string }>;

    size(marketId: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber]>;

    skew(marketId: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber]>;

    commitOrder(
      commitment: {
        marketId: BigNumberish;
        accountId: BigNumberish;
        sizeDelta: BigNumberish;
        settlementStrategyId: BigNumberish;
        acceptablePrice: BigNumberish;
        trackingCode: BytesLike;
        referrer: string;
      },
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    computeOrderFees(
      marketId: BigNumberish,
      sizeDelta: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber] & { orderFees: BigNumber; fillPrice: BigNumber }>;

    computeOrderFeesWithPrice(
      marketId: BigNumberish,
      sizeDelta: BigNumberish,
      price: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber] & { orderFees: BigNumber; fillPrice: BigNumber }>;

    getOrder(
      accountId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [
        [
          BigNumber,
          [BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, string, string] & {
            marketId: BigNumber;
            accountId: BigNumber;
            sizeDelta: BigNumber;
            settlementStrategyId: BigNumber;
            acceptablePrice: BigNumber;
            trackingCode: string;
            referrer: string;
          }
        ] & {
          commitmentTime: BigNumber;
          request: [BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, string, string] & {
            marketId: BigNumber;
            accountId: BigNumber;
            sizeDelta: BigNumber;
            settlementStrategyId: BigNumber;
            acceptablePrice: BigNumber;
            trackingCode: string;
            referrer: string;
          };
        }
      ] & {
        order: [
          BigNumber,
          [BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, string, string] & {
            marketId: BigNumber;
            accountId: BigNumber;
            sizeDelta: BigNumber;
            settlementStrategyId: BigNumber;
            acceptablePrice: BigNumber;
            trackingCode: string;
            referrer: string;
          }
        ] & {
          commitmentTime: BigNumber;
          request: [BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, string, string] & {
            marketId: BigNumber;
            accountId: BigNumber;
            sizeDelta: BigNumber;
            settlementStrategyId: BigNumber;
            acceptablePrice: BigNumber;
            trackingCode: string;
            referrer: string;
          };
        };
      }
    >;

    getSettlementRewardCost(
      marketId: BigNumberish,
      settlementStrategyId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    requiredMarginForOrder(
      accountId: BigNumberish,
      marketId: BigNumberish,
      sizeDelta: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { requiredMargin: BigNumber }>;

    requiredMarginForOrderWithPrice(
      accountId: BigNumberish,
      marketId: BigNumberish,
      sizeDelta: BigNumberish,
      price: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { requiredMargin: BigNumber }>;

    settleOrder(
      accountId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    cancelOrder(
      accountId: BigNumberish,
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

    canLiquidate(
      accountId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean] & { isEligible: boolean }>;

    flaggedAccounts(
      overrides?: CallOverrides
    ): Promise<[BigNumber[]] & { accountIds: BigNumber[] }>;

    liquidate(
      accountId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    liquidateFlagged(
      maxNumberOfAccounts: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    liquidateFlaggedAccounts(
      accountIds: BigNumberish[],
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    liquidationCapacity(
      marketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber] & {
        capacity: BigNumber;
        maxLiquidationInWindow: BigNumber;
        latestLiquidationTimestamp: BigNumber;
      }
    >;

    addSettlementStrategy(
      marketId: BigNumberish,
      strategy: {
        strategyType: BigNumberish;
        settlementDelay: BigNumberish;
        settlementWindowDuration: BigNumberish;
        priceVerificationContract: string;
        feedId: BytesLike;
        settlementReward: BigNumberish;
        disabled: boolean;
        commitmentPriceDelay: BigNumberish;
      },
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    getFundingParameters(
      marketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber] & { skewScale: BigNumber; maxFundingVelocity: BigNumber }>;

    getLiquidationParameters(
      marketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, BigNumber, BigNumber] & {
        initialMarginRatioD18: BigNumber;
        minimumInitialMarginRatioD18: BigNumber;
        maintenanceMarginScalarD18: BigNumber;
        flagRewardRatioD18: BigNumber;
        minimumPositionMargin: BigNumber;
      }
    >;

    getLockedOiRatio(marketId: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber]>;

    getMaxLiquidationParameters(
      marketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, string] & {
        maxLiquidationLimitAccumulationMultiplier: BigNumber;
        maxSecondsInLiquidationWindow: BigNumber;
        maxLiquidationPd: BigNumber;
        endorsedLiquidator: string;
      }
    >;

    getMaxMarketSize(
      marketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { maxMarketSize: BigNumber }>;

    getMaxMarketValue(
      marketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { maxMarketValue: BigNumber }>;

    getOrderFees(
      marketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber] & { makerFee: BigNumber; takerFee: BigNumber }>;

    getPriceData(
      perpsMarketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string, BigNumber] & { feedId: string; strictStalenessTolerance: BigNumber }>;

    getSettlementStrategy(
      marketId: BigNumberish,
      strategyId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [
        [number, BigNumber, BigNumber, string, string, BigNumber, boolean, BigNumber] & {
          strategyType: number;
          settlementDelay: BigNumber;
          settlementWindowDuration: BigNumber;
          priceVerificationContract: string;
          feedId: string;
          settlementReward: BigNumber;
          disabled: boolean;
          commitmentPriceDelay: BigNumber;
        }
      ] & {
        settlementStrategy: [
          number,
          BigNumber,
          BigNumber,
          string,
          string,
          BigNumber,
          boolean,
          BigNumber
        ] & {
          strategyType: number;
          settlementDelay: BigNumber;
          settlementWindowDuration: BigNumber;
          priceVerificationContract: string;
          feedId: string;
          settlementReward: BigNumber;
          disabled: boolean;
          commitmentPriceDelay: BigNumber;
        };
      }
    >;

    setFundingParameters(
      marketId: BigNumberish,
      skewScale: BigNumberish,
      maxFundingVelocity: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    setLiquidationParameters(
      marketId: BigNumberish,
      initialMarginRatioD18: BigNumberish,
      minimumInitialMarginRatioD18: BigNumberish,
      maintenanceMarginScalarD18: BigNumberish,
      flagRewardRatioD18: BigNumberish,
      minimumPositionMargin: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    setLockedOiRatio(
      marketId: BigNumberish,
      lockedOiRatioD18: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    setMaxLiquidationParameters(
      marketId: BigNumberish,
      maxLiquidationLimitAccumulationMultiplier: BigNumberish,
      maxSecondsInLiquidationWindow: BigNumberish,
      maxLiquidationPd: BigNumberish,
      endorsedLiquidator: string,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    setMaxMarketSize(
      marketId: BigNumberish,
      maxMarketSize: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    setMaxMarketValue(
      marketId: BigNumberish,
      maxMarketValue: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    setOrderFees(
      marketId: BigNumberish,
      makerFeeRatio: BigNumberish,
      takerFeeRatio: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    setSettlementStrategy(
      marketId: BigNumberish,
      strategyId: BigNumberish,
      strategy: {
        strategyType: BigNumberish;
        settlementDelay: BigNumberish;
        settlementWindowDuration: BigNumberish;
        priceVerificationContract: string;
        feedId: BytesLike;
        settlementReward: BigNumberish;
        disabled: boolean;
        commitmentPriceDelay: BigNumberish;
      },
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    setSettlementStrategyEnabled(
      marketId: BigNumberish,
      strategyId: BigNumberish,
      enabled: boolean,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    updatePriceData(
      perpsMarketId: BigNumberish,
      feedId: BytesLike,
      strictStalenessTolerance: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    getCollateralConfiguration(
      synthMarketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { maxCollateralAmount: BigNumber }>;

    getFeeCollector(overrides?: CallOverrides): Promise<[string] & { feeCollector: string }>;

    getInterestRateParameters(
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber] & {
        lowUtilizationInterestRateGradient: BigNumber;
        interestRateGradientBreakpoint: BigNumber;
        highUtilizationInterestRateGradient: BigNumber;
      }
    >;

    getKeeperCostNodeId(
      overrides?: CallOverrides
    ): Promise<[string] & { keeperCostNodeId: string }>;

    getKeeperRewardGuards(
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, BigNumber] & {
        minKeeperRewardUsd: BigNumber;
        minKeeperProfitRatioD18: BigNumber;
        maxKeeperRewardUsd: BigNumber;
        maxKeeperScalingRatioD18: BigNumber;
      }
    >;

    getMarkets(overrides?: CallOverrides): Promise<[BigNumber[]] & { marketIds: BigNumber[] }>;

    getPerAccountCaps(
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & {
        maxPositionsPerAccount: BigNumber;
        maxCollateralsPerAccount: BigNumber;
      }
    >;

    getReferrerShare(
      referrer: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { shareRatioD18: BigNumber }>;

    getSupportedCollaterals(
      overrides?: CallOverrides
    ): Promise<[BigNumber[]] & { supportedCollaterals: BigNumber[] }>;

    getSynthDeductionPriority(overrides?: CallOverrides): Promise<[BigNumber[]]>;

    setCollateralConfiguration(
      synthMarketId: BigNumberish,
      maxCollateralAmount: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    setFeeCollector(
      feeCollector: string,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    setInterestRateParameters(
      lowUtilizationInterestRateGradient: BigNumberish,
      interestRateGradientBreakpoint: BigNumberish,
      highUtilizationInterestRateGradient: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    setKeeperRewardGuards(
      minKeeperRewardUsd: BigNumberish,
      minKeeperProfitRatioD18: BigNumberish,
      maxKeeperRewardUsd: BigNumberish,
      maxKeeperScalingRatioD18: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    setPerAccountCaps(
      maxPositionsPerAccount: BigNumberish,
      maxCollateralsPerAccount: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    setSynthDeductionPriority(
      newSynthDeductionPriority: BigNumberish[],
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    totalGlobalCollateralValue(
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { totalCollateralValue: BigNumber }>;

    updateInterestRate(overrides?: Overrides & { from?: string }): Promise<ContractTransaction>;

    updateKeeperCostNodeId(
      keeperCostNodeId: BytesLike,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    updateReferrerShare(
      referrer: string,
      shareRatioD18: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;
  };

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
  ): Promise<[string, string[]] & { user: string; permissions: string[] }[]>;

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

  createMarket(
    requestedMarketId: BigNumberish,
    marketName: string,
    marketSymbol: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  initializeFactory(
    synthetix: string,
    spotMarket: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  interestRate(overrides?: CallOverrides): Promise<BigNumber>;

  minimumCredit(perpsMarketId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

  name(perpsMarketId: BigNumberish, overrides?: CallOverrides): Promise<string>;

  reportedDebt(perpsMarketId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

  setPerpsMarketName(
    marketName: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  supportsInterface(interfaceId: BytesLike, overrides?: CallOverrides): Promise<boolean>;

  utilizationRate(
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber, BigNumber] & {
      rate: BigNumber;
      delegatedCollateral: BigNumber;
      lockedCredit: BigNumber;
    }
  >;

  getAccountCollateralIds(accountId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber[]>;

  getAccountOpenPositions(accountId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber[]>;

  getAvailableMargin(accountId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

  getCollateralAmount(
    accountId: BigNumberish,
    synthMarketId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getOpenPosition(
    accountId: BigNumberish,
    marketId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber, BigNumber, BigNumber] & {
      totalPnl: BigNumber;
      accruedFunding: BigNumber;
      positionSize: BigNumber;
      owedInterest: BigNumber;
    }
  >;

  getOpenPositionSize(
    accountId: BigNumberish,
    marketId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getRequiredMargins(
    accountId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber, BigNumber] & {
      requiredInitialMargin: BigNumber;
      requiredMaintenanceMargin: BigNumber;
      maxLiquidationReward: BigNumber;
    }
  >;

  getWithdrawableMargin(accountId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

  modifyCollateral(
    accountId: BigNumberish,
    synthMarketId: BigNumberish,
    amountDelta: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  totalAccountOpenInterest(accountId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

  totalCollateralValue(accountId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

  currentFundingRate(marketId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

  currentFundingVelocity(marketId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

  fillPrice(
    marketId: BigNumberish,
    orderSize: BigNumberish,
    price: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getMarketSummary(
    marketId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber] & {
      skew: BigNumber;
      size: BigNumber;
      maxOpenInterest: BigNumber;
      currentFundingRate: BigNumber;
      currentFundingVelocity: BigNumber;
      indexPrice: BigNumber;
    }
  >;

  indexPrice(marketId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

  maxOpenInterest(marketId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

  metadata(
    marketId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<[string, string] & { name: string; symbol: string }>;

  size(marketId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

  skew(marketId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

  commitOrder(
    commitment: {
      marketId: BigNumberish;
      accountId: BigNumberish;
      sizeDelta: BigNumberish;
      settlementStrategyId: BigNumberish;
      acceptablePrice: BigNumberish;
      trackingCode: BytesLike;
      referrer: string;
    },
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  computeOrderFees(
    marketId: BigNumberish,
    sizeDelta: BigNumberish,
    overrides?: CallOverrides
  ): Promise<[BigNumber, BigNumber] & { orderFees: BigNumber; fillPrice: BigNumber }>;

  computeOrderFeesWithPrice(
    marketId: BigNumberish,
    sizeDelta: BigNumberish,
    price: BigNumberish,
    overrides?: CallOverrides
  ): Promise<[BigNumber, BigNumber] & { orderFees: BigNumber; fillPrice: BigNumber }>;

  getOrder(
    accountId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [
      BigNumber,
      [BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, string, string] & {
        marketId: BigNumber;
        accountId: BigNumber;
        sizeDelta: BigNumber;
        settlementStrategyId: BigNumber;
        acceptablePrice: BigNumber;
        trackingCode: string;
        referrer: string;
      }
    ] & {
      commitmentTime: BigNumber;
      request: [BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, string, string] & {
        marketId: BigNumber;
        accountId: BigNumber;
        sizeDelta: BigNumber;
        settlementStrategyId: BigNumber;
        acceptablePrice: BigNumber;
        trackingCode: string;
        referrer: string;
      };
    }
  >;

  getSettlementRewardCost(
    marketId: BigNumberish,
    settlementStrategyId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  requiredMarginForOrder(
    accountId: BigNumberish,
    marketId: BigNumberish,
    sizeDelta: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  requiredMarginForOrderWithPrice(
    accountId: BigNumberish,
    marketId: BigNumberish,
    sizeDelta: BigNumberish,
    price: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  settleOrder(
    accountId: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  cancelOrder(
    accountId: BigNumberish,
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

  canLiquidate(accountId: BigNumberish, overrides?: CallOverrides): Promise<boolean>;

  flaggedAccounts(overrides?: CallOverrides): Promise<BigNumber[]>;

  liquidate(
    accountId: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  liquidateFlagged(
    maxNumberOfAccounts: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  liquidateFlaggedAccounts(
    accountIds: BigNumberish[],
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  liquidationCapacity(
    marketId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber, BigNumber] & {
      capacity: BigNumber;
      maxLiquidationInWindow: BigNumber;
      latestLiquidationTimestamp: BigNumber;
    }
  >;

  addSettlementStrategy(
    marketId: BigNumberish,
    strategy: {
      strategyType: BigNumberish;
      settlementDelay: BigNumberish;
      settlementWindowDuration: BigNumberish;
      priceVerificationContract: string;
      feedId: BytesLike;
      settlementReward: BigNumberish;
      disabled: boolean;
      commitmentPriceDelay: BigNumberish;
    },
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  getFundingParameters(
    marketId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<[BigNumber, BigNumber] & { skewScale: BigNumber; maxFundingVelocity: BigNumber }>;

  getLiquidationParameters(
    marketId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber, BigNumber, BigNumber, BigNumber] & {
      initialMarginRatioD18: BigNumber;
      minimumInitialMarginRatioD18: BigNumber;
      maintenanceMarginScalarD18: BigNumber;
      flagRewardRatioD18: BigNumber;
      minimumPositionMargin: BigNumber;
    }
  >;

  getLockedOiRatio(marketId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

  getMaxLiquidationParameters(
    marketId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber, BigNumber, string] & {
      maxLiquidationLimitAccumulationMultiplier: BigNumber;
      maxSecondsInLiquidationWindow: BigNumber;
      maxLiquidationPd: BigNumber;
      endorsedLiquidator: string;
    }
  >;

  getMaxMarketSize(marketId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

  getMaxMarketValue(marketId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

  getOrderFees(
    marketId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<[BigNumber, BigNumber] & { makerFee: BigNumber; takerFee: BigNumber }>;

  getPriceData(
    perpsMarketId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<[string, BigNumber] & { feedId: string; strictStalenessTolerance: BigNumber }>;

  getSettlementStrategy(
    marketId: BigNumberish,
    strategyId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [number, BigNumber, BigNumber, string, string, BigNumber, boolean, BigNumber] & {
      strategyType: number;
      settlementDelay: BigNumber;
      settlementWindowDuration: BigNumber;
      priceVerificationContract: string;
      feedId: string;
      settlementReward: BigNumber;
      disabled: boolean;
      commitmentPriceDelay: BigNumber;
    }
  >;

  setFundingParameters(
    marketId: BigNumberish,
    skewScale: BigNumberish,
    maxFundingVelocity: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  setLiquidationParameters(
    marketId: BigNumberish,
    initialMarginRatioD18: BigNumberish,
    minimumInitialMarginRatioD18: BigNumberish,
    maintenanceMarginScalarD18: BigNumberish,
    flagRewardRatioD18: BigNumberish,
    minimumPositionMargin: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  setLockedOiRatio(
    marketId: BigNumberish,
    lockedOiRatioD18: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  setMaxLiquidationParameters(
    marketId: BigNumberish,
    maxLiquidationLimitAccumulationMultiplier: BigNumberish,
    maxSecondsInLiquidationWindow: BigNumberish,
    maxLiquidationPd: BigNumberish,
    endorsedLiquidator: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  setMaxMarketSize(
    marketId: BigNumberish,
    maxMarketSize: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  setMaxMarketValue(
    marketId: BigNumberish,
    maxMarketValue: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  setOrderFees(
    marketId: BigNumberish,
    makerFeeRatio: BigNumberish,
    takerFeeRatio: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  setSettlementStrategy(
    marketId: BigNumberish,
    strategyId: BigNumberish,
    strategy: {
      strategyType: BigNumberish;
      settlementDelay: BigNumberish;
      settlementWindowDuration: BigNumberish;
      priceVerificationContract: string;
      feedId: BytesLike;
      settlementReward: BigNumberish;
      disabled: boolean;
      commitmentPriceDelay: BigNumberish;
    },
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  setSettlementStrategyEnabled(
    marketId: BigNumberish,
    strategyId: BigNumberish,
    enabled: boolean,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  updatePriceData(
    perpsMarketId: BigNumberish,
    feedId: BytesLike,
    strictStalenessTolerance: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  getCollateralConfiguration(
    synthMarketId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getFeeCollector(overrides?: CallOverrides): Promise<string>;

  getInterestRateParameters(
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber, BigNumber] & {
      lowUtilizationInterestRateGradient: BigNumber;
      interestRateGradientBreakpoint: BigNumber;
      highUtilizationInterestRateGradient: BigNumber;
    }
  >;

  getKeeperCostNodeId(overrides?: CallOverrides): Promise<string>;

  getKeeperRewardGuards(
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber, BigNumber, BigNumber] & {
      minKeeperRewardUsd: BigNumber;
      minKeeperProfitRatioD18: BigNumber;
      maxKeeperRewardUsd: BigNumber;
      maxKeeperScalingRatioD18: BigNumber;
    }
  >;

  getMarkets(overrides?: CallOverrides): Promise<BigNumber[]>;

  getPerAccountCaps(
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber] & {
      maxPositionsPerAccount: BigNumber;
      maxCollateralsPerAccount: BigNumber;
    }
  >;

  getReferrerShare(referrer: string, overrides?: CallOverrides): Promise<BigNumber>;

  getSupportedCollaterals(overrides?: CallOverrides): Promise<BigNumber[]>;

  getSynthDeductionPriority(overrides?: CallOverrides): Promise<BigNumber[]>;

  setCollateralConfiguration(
    synthMarketId: BigNumberish,
    maxCollateralAmount: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  setFeeCollector(
    feeCollector: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  setInterestRateParameters(
    lowUtilizationInterestRateGradient: BigNumberish,
    interestRateGradientBreakpoint: BigNumberish,
    highUtilizationInterestRateGradient: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  setKeeperRewardGuards(
    minKeeperRewardUsd: BigNumberish,
    minKeeperProfitRatioD18: BigNumberish,
    maxKeeperRewardUsd: BigNumberish,
    maxKeeperScalingRatioD18: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  setPerAccountCaps(
    maxPositionsPerAccount: BigNumberish,
    maxCollateralsPerAccount: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  setSynthDeductionPriority(
    newSynthDeductionPriority: BigNumberish[],
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  totalGlobalCollateralValue(overrides?: CallOverrides): Promise<BigNumber>;

  updateInterestRate(overrides?: Overrides & { from?: string }): Promise<ContractTransaction>;

  updateKeeperCostNodeId(
    keeperCostNodeId: BytesLike,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  updateReferrerShare(
    referrer: string,
    shareRatioD18: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  callStatic: {
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
    ): Promise<[string, string[]] & { user: string; permissions: string[] }[]>;

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

    acceptOwnership(overrides?: CallOverrides): Promise<void>;

    getImplementation(overrides?: CallOverrides): Promise<string>;

    nominateNewOwner(newNominatedOwner: string, overrides?: CallOverrides): Promise<void>;

    nominatedOwner(overrides?: CallOverrides): Promise<string>;

    owner(overrides?: CallOverrides): Promise<string>;

    renounceNomination(overrides?: CallOverrides): Promise<void>;

    simulateUpgradeTo(newImplementation: string, overrides?: CallOverrides): Promise<void>;

    upgradeTo(newImplementation: string, overrides?: CallOverrides): Promise<void>;

    createMarket(
      requestedMarketId: BigNumberish,
      marketName: string,
      marketSymbol: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    initializeFactory(
      synthetix: string,
      spotMarket: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    interestRate(overrides?: CallOverrides): Promise<BigNumber>;

    minimumCredit(perpsMarketId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    name(perpsMarketId: BigNumberish, overrides?: CallOverrides): Promise<string>;

    reportedDebt(perpsMarketId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    setPerpsMarketName(marketName: string, overrides?: CallOverrides): Promise<void>;

    supportsInterface(interfaceId: BytesLike, overrides?: CallOverrides): Promise<boolean>;

    utilizationRate(
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber] & {
        rate: BigNumber;
        delegatedCollateral: BigNumber;
        lockedCredit: BigNumber;
      }
    >;

    getAccountCollateralIds(
      accountId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    getAccountOpenPositions(
      accountId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    getAvailableMargin(accountId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    getCollateralAmount(
      accountId: BigNumberish,
      synthMarketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getOpenPosition(
      accountId: BigNumberish,
      marketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, BigNumber] & {
        totalPnl: BigNumber;
        accruedFunding: BigNumber;
        positionSize: BigNumber;
        owedInterest: BigNumber;
      }
    >;

    getOpenPositionSize(
      accountId: BigNumberish,
      marketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getRequiredMargins(
      accountId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber] & {
        requiredInitialMargin: BigNumber;
        requiredMaintenanceMargin: BigNumber;
        maxLiquidationReward: BigNumber;
      }
    >;

    getWithdrawableMargin(accountId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    modifyCollateral(
      accountId: BigNumberish,
      synthMarketId: BigNumberish,
      amountDelta: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    totalAccountOpenInterest(
      accountId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    totalCollateralValue(accountId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    currentFundingRate(marketId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    currentFundingVelocity(marketId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    fillPrice(
      marketId: BigNumberish,
      orderSize: BigNumberish,
      price: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getMarketSummary(
      marketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber] & {
        skew: BigNumber;
        size: BigNumber;
        maxOpenInterest: BigNumber;
        currentFundingRate: BigNumber;
        currentFundingVelocity: BigNumber;
        indexPrice: BigNumber;
      }
    >;

    indexPrice(marketId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    maxOpenInterest(marketId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    metadata(
      marketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string, string] & { name: string; symbol: string }>;

    size(marketId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    skew(marketId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    commitOrder(
      commitment: {
        marketId: BigNumberish;
        accountId: BigNumberish;
        sizeDelta: BigNumberish;
        settlementStrategyId: BigNumberish;
        acceptablePrice: BigNumberish;
        trackingCode: BytesLike;
        referrer: string;
      },
      overrides?: CallOverrides
    ): Promise<
      [
        [
          BigNumber,
          [BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, string, string] & {
            marketId: BigNumber;
            accountId: BigNumber;
            sizeDelta: BigNumber;
            settlementStrategyId: BigNumber;
            acceptablePrice: BigNumber;
            trackingCode: string;
            referrer: string;
          }
        ] & {
          commitmentTime: BigNumber;
          request: [BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, string, string] & {
            marketId: BigNumber;
            accountId: BigNumber;
            sizeDelta: BigNumber;
            settlementStrategyId: BigNumber;
            acceptablePrice: BigNumber;
            trackingCode: string;
            referrer: string;
          };
        },
        BigNumber
      ] & {
        retOrder: [
          BigNumber,
          [BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, string, string] & {
            marketId: BigNumber;
            accountId: BigNumber;
            sizeDelta: BigNumber;
            settlementStrategyId: BigNumber;
            acceptablePrice: BigNumber;
            trackingCode: string;
            referrer: string;
          }
        ] & {
          commitmentTime: BigNumber;
          request: [BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, string, string] & {
            marketId: BigNumber;
            accountId: BigNumber;
            sizeDelta: BigNumber;
            settlementStrategyId: BigNumber;
            acceptablePrice: BigNumber;
            trackingCode: string;
            referrer: string;
          };
        };
        fees: BigNumber;
      }
    >;

    computeOrderFees(
      marketId: BigNumberish,
      sizeDelta: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber] & { orderFees: BigNumber; fillPrice: BigNumber }>;

    computeOrderFeesWithPrice(
      marketId: BigNumberish,
      sizeDelta: BigNumberish,
      price: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber] & { orderFees: BigNumber; fillPrice: BigNumber }>;

    getOrder(
      accountId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [
        BigNumber,
        [BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, string, string] & {
          marketId: BigNumber;
          accountId: BigNumber;
          sizeDelta: BigNumber;
          settlementStrategyId: BigNumber;
          acceptablePrice: BigNumber;
          trackingCode: string;
          referrer: string;
        }
      ] & {
        commitmentTime: BigNumber;
        request: [BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, string, string] & {
          marketId: BigNumber;
          accountId: BigNumber;
          sizeDelta: BigNumber;
          settlementStrategyId: BigNumber;
          acceptablePrice: BigNumber;
          trackingCode: string;
          referrer: string;
        };
      }
    >;

    getSettlementRewardCost(
      marketId: BigNumberish,
      settlementStrategyId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    requiredMarginForOrder(
      accountId: BigNumberish,
      marketId: BigNumberish,
      sizeDelta: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    requiredMarginForOrderWithPrice(
      accountId: BigNumberish,
      marketId: BigNumberish,
      sizeDelta: BigNumberish,
      price: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    settleOrder(accountId: BigNumberish, overrides?: CallOverrides): Promise<void>;

    cancelOrder(accountId: BigNumberish, overrides?: CallOverrides): Promise<void>;

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

    canLiquidate(accountId: BigNumberish, overrides?: CallOverrides): Promise<boolean>;

    flaggedAccounts(overrides?: CallOverrides): Promise<BigNumber[]>;

    liquidate(accountId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    liquidateFlagged(
      maxNumberOfAccounts: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    liquidateFlaggedAccounts(
      accountIds: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    liquidationCapacity(
      marketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber] & {
        capacity: BigNumber;
        maxLiquidationInWindow: BigNumber;
        latestLiquidationTimestamp: BigNumber;
      }
    >;

    addSettlementStrategy(
      marketId: BigNumberish,
      strategy: {
        strategyType: BigNumberish;
        settlementDelay: BigNumberish;
        settlementWindowDuration: BigNumberish;
        priceVerificationContract: string;
        feedId: BytesLike;
        settlementReward: BigNumberish;
        disabled: boolean;
        commitmentPriceDelay: BigNumberish;
      },
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getFundingParameters(
      marketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber] & { skewScale: BigNumber; maxFundingVelocity: BigNumber }>;

    getLiquidationParameters(
      marketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, BigNumber, BigNumber] & {
        initialMarginRatioD18: BigNumber;
        minimumInitialMarginRatioD18: BigNumber;
        maintenanceMarginScalarD18: BigNumber;
        flagRewardRatioD18: BigNumber;
        minimumPositionMargin: BigNumber;
      }
    >;

    getLockedOiRatio(marketId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    getMaxLiquidationParameters(
      marketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, string] & {
        maxLiquidationLimitAccumulationMultiplier: BigNumber;
        maxSecondsInLiquidationWindow: BigNumber;
        maxLiquidationPd: BigNumber;
        endorsedLiquidator: string;
      }
    >;

    getMaxMarketSize(marketId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    getMaxMarketValue(marketId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    getOrderFees(
      marketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber] & { makerFee: BigNumber; takerFee: BigNumber }>;

    getPriceData(
      perpsMarketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string, BigNumber] & { feedId: string; strictStalenessTolerance: BigNumber }>;

    getSettlementStrategy(
      marketId: BigNumberish,
      strategyId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [number, BigNumber, BigNumber, string, string, BigNumber, boolean, BigNumber] & {
        strategyType: number;
        settlementDelay: BigNumber;
        settlementWindowDuration: BigNumber;
        priceVerificationContract: string;
        feedId: string;
        settlementReward: BigNumber;
        disabled: boolean;
        commitmentPriceDelay: BigNumber;
      }
    >;

    setFundingParameters(
      marketId: BigNumberish,
      skewScale: BigNumberish,
      maxFundingVelocity: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setLiquidationParameters(
      marketId: BigNumberish,
      initialMarginRatioD18: BigNumberish,
      minimumInitialMarginRatioD18: BigNumberish,
      maintenanceMarginScalarD18: BigNumberish,
      flagRewardRatioD18: BigNumberish,
      minimumPositionMargin: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setLockedOiRatio(
      marketId: BigNumberish,
      lockedOiRatioD18: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setMaxLiquidationParameters(
      marketId: BigNumberish,
      maxLiquidationLimitAccumulationMultiplier: BigNumberish,
      maxSecondsInLiquidationWindow: BigNumberish,
      maxLiquidationPd: BigNumberish,
      endorsedLiquidator: string,
      overrides?: CallOverrides
    ): Promise<void>;

    setMaxMarketSize(
      marketId: BigNumberish,
      maxMarketSize: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setMaxMarketValue(
      marketId: BigNumberish,
      maxMarketValue: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setOrderFees(
      marketId: BigNumberish,
      makerFeeRatio: BigNumberish,
      takerFeeRatio: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setSettlementStrategy(
      marketId: BigNumberish,
      strategyId: BigNumberish,
      strategy: {
        strategyType: BigNumberish;
        settlementDelay: BigNumberish;
        settlementWindowDuration: BigNumberish;
        priceVerificationContract: string;
        feedId: BytesLike;
        settlementReward: BigNumberish;
        disabled: boolean;
        commitmentPriceDelay: BigNumberish;
      },
      overrides?: CallOverrides
    ): Promise<void>;

    setSettlementStrategyEnabled(
      marketId: BigNumberish,
      strategyId: BigNumberish,
      enabled: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    updatePriceData(
      perpsMarketId: BigNumberish,
      feedId: BytesLike,
      strictStalenessTolerance: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    getCollateralConfiguration(
      synthMarketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getFeeCollector(overrides?: CallOverrides): Promise<string>;

    getInterestRateParameters(
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber] & {
        lowUtilizationInterestRateGradient: BigNumber;
        interestRateGradientBreakpoint: BigNumber;
        highUtilizationInterestRateGradient: BigNumber;
      }
    >;

    getKeeperCostNodeId(overrides?: CallOverrides): Promise<string>;

    getKeeperRewardGuards(
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, BigNumber] & {
        minKeeperRewardUsd: BigNumber;
        minKeeperProfitRatioD18: BigNumber;
        maxKeeperRewardUsd: BigNumber;
        maxKeeperScalingRatioD18: BigNumber;
      }
    >;

    getMarkets(overrides?: CallOverrides): Promise<BigNumber[]>;

    getPerAccountCaps(
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & {
        maxPositionsPerAccount: BigNumber;
        maxCollateralsPerAccount: BigNumber;
      }
    >;

    getReferrerShare(referrer: string, overrides?: CallOverrides): Promise<BigNumber>;

    getSupportedCollaterals(overrides?: CallOverrides): Promise<BigNumber[]>;

    getSynthDeductionPriority(overrides?: CallOverrides): Promise<BigNumber[]>;

    setCollateralConfiguration(
      synthMarketId: BigNumberish,
      maxCollateralAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setFeeCollector(feeCollector: string, overrides?: CallOverrides): Promise<void>;

    setInterestRateParameters(
      lowUtilizationInterestRateGradient: BigNumberish,
      interestRateGradientBreakpoint: BigNumberish,
      highUtilizationInterestRateGradient: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setKeeperRewardGuards(
      minKeeperRewardUsd: BigNumberish,
      minKeeperProfitRatioD18: BigNumberish,
      maxKeeperRewardUsd: BigNumberish,
      maxKeeperScalingRatioD18: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setPerAccountCaps(
      maxPositionsPerAccount: BigNumberish,
      maxCollateralsPerAccount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setSynthDeductionPriority(
      newSynthDeductionPriority: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<void>;

    totalGlobalCollateralValue(overrides?: CallOverrides): Promise<BigNumber>;

    updateInterestRate(overrides?: CallOverrides): Promise<void>;

    updateKeeperCostNodeId(keeperCostNodeId: BytesLike, overrides?: CallOverrides): Promise<void>;

    updateReferrerShare(
      referrer: string,
      shareRatioD18: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
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

    'OwnerChanged(address,address)'(oldOwner?: null, newOwner?: null): OwnerChangedEventFilter;
    OwnerChanged(oldOwner?: null, newOwner?: null): OwnerChangedEventFilter;

    'OwnerNominated(address)'(newOwner?: null): OwnerNominatedEventFilter;
    OwnerNominated(newOwner?: null): OwnerNominatedEventFilter;

    'Upgraded(address,address)'(self?: string | null, implementation?: null): UpgradedEventFilter;
    Upgraded(self?: string | null, implementation?: null): UpgradedEventFilter;

    'FactoryInitialized(uint128)'(globalPerpsMarketId?: null): FactoryInitializedEventFilter;
    FactoryInitialized(globalPerpsMarketId?: null): FactoryInitializedEventFilter;

    'MarketCreated(uint128,string,string)'(
      perpsMarketId?: BigNumberish | null,
      marketName?: null,
      marketSymbol?: null
    ): MarketCreatedEventFilter;
    MarketCreated(
      perpsMarketId?: BigNumberish | null,
      marketName?: null,
      marketSymbol?: null
    ): MarketCreatedEventFilter;

    'CollateralModified(uint128,uint128,int256,address)'(
      accountId?: BigNumberish | null,
      synthMarketId?: BigNumberish | null,
      amountDelta?: null,
      sender?: string | null
    ): CollateralModifiedEventFilter;
    CollateralModified(
      accountId?: BigNumberish | null,
      synthMarketId?: BigNumberish | null,
      amountDelta?: null,
      sender?: string | null
    ): CollateralModifiedEventFilter;

    'OrderCommitted(uint128,uint128,uint8,int128,uint256,uint256,uint256,uint256,uint256,bytes32,address)'(
      marketId?: BigNumberish | null,
      accountId?: BigNumberish | null,
      orderType?: null,
      sizeDelta?: null,
      acceptablePrice?: null,
      commitmentTime?: null,
      expectedPriceTime?: null,
      settlementTime?: null,
      expirationTime?: null,
      trackingCode?: BytesLike | null,
      sender?: null
    ): OrderCommittedEventFilter;
    OrderCommitted(
      marketId?: BigNumberish | null,
      accountId?: BigNumberish | null,
      orderType?: null,
      sizeDelta?: null,
      acceptablePrice?: null,
      commitmentTime?: null,
      expectedPriceTime?: null,
      settlementTime?: null,
      expirationTime?: null,
      trackingCode?: BytesLike | null,
      sender?: null
    ): OrderCommittedEventFilter;

    'PreviousOrderExpired(uint128,uint128,int128,uint256,uint256,bytes32)'(
      marketId?: BigNumberish | null,
      accountId?: BigNumberish | null,
      sizeDelta?: null,
      acceptablePrice?: null,
      commitmentTime?: null,
      trackingCode?: BytesLike | null
    ): PreviousOrderExpiredEventFilter;
    PreviousOrderExpired(
      marketId?: BigNumberish | null,
      accountId?: BigNumberish | null,
      sizeDelta?: null,
      acceptablePrice?: null,
      commitmentTime?: null,
      trackingCode?: BytesLike | null
    ): PreviousOrderExpiredEventFilter;

    'CollateralDeducted(uint256,uint128,uint256)'(
      account?: null,
      synthMarketId?: null,
      amount?: null
    ): CollateralDeductedEventFilter;
    CollateralDeducted(
      account?: null,
      synthMarketId?: null,
      amount?: null
    ): CollateralDeductedEventFilter;

    'InterestCharged(uint128,uint256)'(
      accountId?: BigNumberish | null,
      interest?: null
    ): InterestChargedEventFilter;
    InterestCharged(accountId?: BigNumberish | null, interest?: null): InterestChargedEventFilter;

    'MarketUpdated(uint128,uint256,int256,uint256,int256,int256,int256,uint128)'(
      marketId?: null,
      price?: null,
      skew?: null,
      size?: null,
      sizeDelta?: null,
      currentFundingRate?: null,
      currentFundingVelocity?: null,
      interestRate?: null
    ): MarketUpdatedEventFilter;
    MarketUpdated(
      marketId?: null,
      price?: null,
      skew?: null,
      size?: null,
      sizeDelta?: null,
      currentFundingRate?: null,
      currentFundingVelocity?: null,
      interestRate?: null
    ): MarketUpdatedEventFilter;

    'OrderSettled(uint128,uint128,uint256,int256,int256,int128,int128,uint256,uint256,uint256,uint256,bytes32,address)'(
      marketId?: BigNumberish | null,
      accountId?: BigNumberish | null,
      fillPrice?: null,
      pnl?: null,
      accruedFunding?: null,
      sizeDelta?: null,
      newSize?: null,
      totalFees?: null,
      referralFees?: null,
      collectedFees?: null,
      settlementReward?: null,
      trackingCode?: BytesLike | null,
      settler?: null
    ): OrderSettledEventFilter;
    OrderSettled(
      marketId?: BigNumberish | null,
      accountId?: BigNumberish | null,
      fillPrice?: null,
      pnl?: null,
      accruedFunding?: null,
      sizeDelta?: null,
      newSize?: null,
      totalFees?: null,
      referralFees?: null,
      collectedFees?: null,
      settlementReward?: null,
      trackingCode?: BytesLike | null,
      settler?: null
    ): OrderSettledEventFilter;

    'OrderCancelled(uint128,uint128,uint256,uint256,int128,uint256,bytes32,address)'(
      marketId?: BigNumberish | null,
      accountId?: BigNumberish | null,
      desiredPrice?: null,
      fillPrice?: null,
      sizeDelta?: null,
      settlementReward?: null,
      trackingCode?: BytesLike | null,
      settler?: null
    ): OrderCancelledEventFilter;
    OrderCancelled(
      marketId?: BigNumberish | null,
      accountId?: BigNumberish | null,
      desiredPrice?: null,
      fillPrice?: null,
      sizeDelta?: null,
      settlementReward?: null,
      trackingCode?: BytesLike | null,
      settler?: null
    ): OrderCancelledEventFilter;

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

    'AccountFlaggedForLiquidation(uint128,int256,uint256,uint256,uint256)'(
      accountId?: BigNumberish | null,
      availableMargin?: null,
      requiredMaintenanceMargin?: null,
      liquidationReward?: null,
      flagReward?: null
    ): AccountFlaggedForLiquidationEventFilter;
    AccountFlaggedForLiquidation(
      accountId?: BigNumberish | null,
      availableMargin?: null,
      requiredMaintenanceMargin?: null,
      liquidationReward?: null,
      flagReward?: null
    ): AccountFlaggedForLiquidationEventFilter;

    'AccountLiquidationAttempt(uint128,uint256,bool)'(
      accountId?: BigNumberish | null,
      reward?: null,
      fullLiquidation?: null
    ): AccountLiquidationAttemptEventFilter;
    AccountLiquidationAttempt(
      accountId?: BigNumberish | null,
      reward?: null,
      fullLiquidation?: null
    ): AccountLiquidationAttemptEventFilter;

    'PositionLiquidated(uint128,uint128,uint256,int128)'(
      accountId?: BigNumberish | null,
      marketId?: BigNumberish | null,
      amountLiquidated?: null,
      currentPositionSize?: null
    ): PositionLiquidatedEventFilter;
    PositionLiquidated(
      accountId?: BigNumberish | null,
      marketId?: BigNumberish | null,
      amountLiquidated?: null,
      currentPositionSize?: null
    ): PositionLiquidatedEventFilter;

    'FundingParametersSet(uint128,uint256,uint256)'(
      marketId?: BigNumberish | null,
      skewScale?: null,
      maxFundingVelocity?: null
    ): FundingParametersSetEventFilter;
    FundingParametersSet(
      marketId?: BigNumberish | null,
      skewScale?: null,
      maxFundingVelocity?: null
    ): FundingParametersSetEventFilter;

    'LiquidationParametersSet(uint128,uint256,uint256,uint256,uint256,uint256)'(
      marketId?: BigNumberish | null,
      initialMarginRatioD18?: null,
      maintenanceMarginRatioD18?: null,
      minimumInitialMarginRatioD18?: null,
      flagRewardRatioD18?: null,
      minimumPositionMargin?: null
    ): LiquidationParametersSetEventFilter;
    LiquidationParametersSet(
      marketId?: BigNumberish | null,
      initialMarginRatioD18?: null,
      maintenanceMarginRatioD18?: null,
      minimumInitialMarginRatioD18?: null,
      flagRewardRatioD18?: null,
      minimumPositionMargin?: null
    ): LiquidationParametersSetEventFilter;

    'LockedOiRatioSet(uint128,uint256)'(
      marketId?: BigNumberish | null,
      lockedOiRatioD18?: null
    ): LockedOiRatioSetEventFilter;
    LockedOiRatioSet(
      marketId?: BigNumberish | null,
      lockedOiRatioD18?: null
    ): LockedOiRatioSetEventFilter;

    'MarketPriceDataUpdated(uint128,bytes32,uint256)'(
      marketId?: BigNumberish | null,
      feedId?: null,
      strictStalenessTolerance?: null
    ): MarketPriceDataUpdatedEventFilter;
    MarketPriceDataUpdated(
      marketId?: BigNumberish | null,
      feedId?: null,
      strictStalenessTolerance?: null
    ): MarketPriceDataUpdatedEventFilter;

    'MaxLiquidationParametersSet(uint128,uint256,uint256,uint256,address)'(
      marketId?: BigNumberish | null,
      maxLiquidationLimitAccumulationMultiplier?: null,
      maxSecondsInLiquidationWindow?: null,
      maxLiquidationPd?: null,
      endorsedLiquidator?: null
    ): MaxLiquidationParametersSetEventFilter;
    MaxLiquidationParametersSet(
      marketId?: BigNumberish | null,
      maxLiquidationLimitAccumulationMultiplier?: null,
      maxSecondsInLiquidationWindow?: null,
      maxLiquidationPd?: null,
      endorsedLiquidator?: null
    ): MaxLiquidationParametersSetEventFilter;

    'MaxMarketSizeSet(uint128,uint256)'(
      marketId?: BigNumberish | null,
      maxMarketSize?: null
    ): MaxMarketSizeSetEventFilter;
    MaxMarketSizeSet(
      marketId?: BigNumberish | null,
      maxMarketSize?: null
    ): MaxMarketSizeSetEventFilter;

    'MaxMarketValueSet(uint128,uint256)'(
      marketId?: BigNumberish | null,
      maxMarketValue?: null
    ): MaxMarketValueSetEventFilter;
    MaxMarketValueSet(
      marketId?: BigNumberish | null,
      maxMarketValue?: null
    ): MaxMarketValueSetEventFilter;

    'OrderFeesSet(uint128,uint256,uint256)'(
      marketId?: BigNumberish | null,
      makerFeeRatio?: null,
      takerFeeRatio?: null
    ): OrderFeesSetEventFilter;
    OrderFeesSet(
      marketId?: BigNumberish | null,
      makerFeeRatio?: null,
      takerFeeRatio?: null
    ): OrderFeesSetEventFilter;

    'SettlementStrategyAdded(uint128,(uint8,uint256,uint256,address,bytes32,uint256,bool,uint256),uint256)'(
      marketId?: BigNumberish | null,
      strategy?: null,
      strategyId?: BigNumberish | null
    ): SettlementStrategyAddedEventFilter;
    SettlementStrategyAdded(
      marketId?: BigNumberish | null,
      strategy?: null,
      strategyId?: BigNumberish | null
    ): SettlementStrategyAddedEventFilter;

    'SettlementStrategySet(uint128,uint256,(uint8,uint256,uint256,address,bytes32,uint256,bool,uint256))'(
      marketId?: BigNumberish | null,
      strategyId?: BigNumberish | null,
      strategy?: null
    ): SettlementStrategySetEventFilter;
    SettlementStrategySet(
      marketId?: BigNumberish | null,
      strategyId?: BigNumberish | null,
      strategy?: null
    ): SettlementStrategySetEventFilter;

    'CollateralConfigurationSet(uint128,uint256)'(
      synthMarketId?: BigNumberish | null,
      maxCollateralAmount?: null
    ): CollateralConfigurationSetEventFilter;
    CollateralConfigurationSet(
      synthMarketId?: BigNumberish | null,
      maxCollateralAmount?: null
    ): CollateralConfigurationSetEventFilter;

    'FeeCollectorSet(address)'(feeCollector?: null): FeeCollectorSetEventFilter;
    FeeCollectorSet(feeCollector?: null): FeeCollectorSetEventFilter;

    'InterestRateParametersSet(uint256,uint256,uint256)'(
      lowUtilizationInterestRateGradient?: null,
      interestRateGradientBreakpoint?: null,
      highUtilizationInterestRateGradient?: null
    ): InterestRateParametersSetEventFilter;
    InterestRateParametersSet(
      lowUtilizationInterestRateGradient?: null,
      interestRateGradientBreakpoint?: null,
      highUtilizationInterestRateGradient?: null
    ): InterestRateParametersSetEventFilter;

    'InterestRateUpdated(uint128,uint128)'(
      superMarketId?: BigNumberish | null,
      interestRate?: null
    ): InterestRateUpdatedEventFilter;
    InterestRateUpdated(
      superMarketId?: BigNumberish | null,
      interestRate?: null
    ): InterestRateUpdatedEventFilter;

    'KeeperCostNodeIdUpdated(bytes32)'(keeperCostNodeId?: null): KeeperCostNodeIdUpdatedEventFilter;
    KeeperCostNodeIdUpdated(keeperCostNodeId?: null): KeeperCostNodeIdUpdatedEventFilter;

    'KeeperRewardGuardsSet(uint256,uint256,uint256,uint256)'(
      minKeeperRewardUsd?: null,
      minKeeperProfitRatioD18?: null,
      maxKeeperRewardUsd?: null,
      maxKeeperScalingRatioD18?: null
    ): KeeperRewardGuardsSetEventFilter;
    KeeperRewardGuardsSet(
      minKeeperRewardUsd?: null,
      minKeeperProfitRatioD18?: null,
      maxKeeperRewardUsd?: null,
      maxKeeperScalingRatioD18?: null
    ): KeeperRewardGuardsSetEventFilter;

    'PerAccountCapsSet(uint128,uint128)'(
      maxPositionsPerAccount?: null,
      maxCollateralsPerAccount?: null
    ): PerAccountCapsSetEventFilter;
    PerAccountCapsSet(
      maxPositionsPerAccount?: null,
      maxCollateralsPerAccount?: null
    ): PerAccountCapsSetEventFilter;

    'ReferrerShareUpdated(address,uint256)'(
      referrer?: null,
      shareRatioD18?: null
    ): ReferrerShareUpdatedEventFilter;
    ReferrerShareUpdated(referrer?: null, shareRatioD18?: null): ReferrerShareUpdatedEventFilter;

    'SynthDeductionPrioritySet(uint128[])'(
      newSynthDeductionPriority?: null
    ): SynthDeductionPrioritySetEventFilter;
    SynthDeductionPrioritySet(
      newSynthDeductionPriority?: null
    ): SynthDeductionPrioritySetEventFilter;
  };

  estimateGas: {
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

    createMarket(
      requestedMarketId: BigNumberish,
      marketName: string,
      marketSymbol: string,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    initializeFactory(
      synthetix: string,
      spotMarket: string,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    interestRate(overrides?: CallOverrides): Promise<BigNumber>;

    minimumCredit(perpsMarketId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    name(perpsMarketId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    reportedDebt(perpsMarketId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    setPerpsMarketName(
      marketName: string,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    supportsInterface(interfaceId: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;

    utilizationRate(overrides?: CallOverrides): Promise<BigNumber>;

    getAccountCollateralIds(accountId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    getAccountOpenPositions(accountId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    getAvailableMargin(accountId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    getCollateralAmount(
      accountId: BigNumberish,
      synthMarketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getOpenPosition(
      accountId: BigNumberish,
      marketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getOpenPositionSize(
      accountId: BigNumberish,
      marketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getRequiredMargins(accountId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    getWithdrawableMargin(accountId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    modifyCollateral(
      accountId: BigNumberish,
      synthMarketId: BigNumberish,
      amountDelta: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    totalAccountOpenInterest(
      accountId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    totalCollateralValue(accountId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    currentFundingRate(marketId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    currentFundingVelocity(marketId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    fillPrice(
      marketId: BigNumberish,
      orderSize: BigNumberish,
      price: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getMarketSummary(marketId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    indexPrice(marketId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    maxOpenInterest(marketId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    metadata(marketId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    size(marketId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    skew(marketId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    commitOrder(
      commitment: {
        marketId: BigNumberish;
        accountId: BigNumberish;
        sizeDelta: BigNumberish;
        settlementStrategyId: BigNumberish;
        acceptablePrice: BigNumberish;
        trackingCode: BytesLike;
        referrer: string;
      },
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    computeOrderFees(
      marketId: BigNumberish,
      sizeDelta: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    computeOrderFeesWithPrice(
      marketId: BigNumberish,
      sizeDelta: BigNumberish,
      price: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getOrder(accountId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    getSettlementRewardCost(
      marketId: BigNumberish,
      settlementStrategyId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    requiredMarginForOrder(
      accountId: BigNumberish,
      marketId: BigNumberish,
      sizeDelta: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    requiredMarginForOrderWithPrice(
      accountId: BigNumberish,
      marketId: BigNumberish,
      sizeDelta: BigNumberish,
      price: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    settleOrder(
      accountId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    cancelOrder(
      accountId: BigNumberish,
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

    canLiquidate(accountId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    flaggedAccounts(overrides?: CallOverrides): Promise<BigNumber>;

    liquidate(
      accountId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    liquidateFlagged(
      maxNumberOfAccounts: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    liquidateFlaggedAccounts(
      accountIds: BigNumberish[],
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    liquidationCapacity(marketId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    addSettlementStrategy(
      marketId: BigNumberish,
      strategy: {
        strategyType: BigNumberish;
        settlementDelay: BigNumberish;
        settlementWindowDuration: BigNumberish;
        priceVerificationContract: string;
        feedId: BytesLike;
        settlementReward: BigNumberish;
        disabled: boolean;
        commitmentPriceDelay: BigNumberish;
      },
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    getFundingParameters(marketId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    getLiquidationParameters(marketId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    getLockedOiRatio(marketId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    getMaxLiquidationParameters(
      marketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getMaxMarketSize(marketId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    getMaxMarketValue(marketId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    getOrderFees(marketId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    getPriceData(perpsMarketId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    getSettlementStrategy(
      marketId: BigNumberish,
      strategyId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    setFundingParameters(
      marketId: BigNumberish,
      skewScale: BigNumberish,
      maxFundingVelocity: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    setLiquidationParameters(
      marketId: BigNumberish,
      initialMarginRatioD18: BigNumberish,
      minimumInitialMarginRatioD18: BigNumberish,
      maintenanceMarginScalarD18: BigNumberish,
      flagRewardRatioD18: BigNumberish,
      minimumPositionMargin: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    setLockedOiRatio(
      marketId: BigNumberish,
      lockedOiRatioD18: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    setMaxLiquidationParameters(
      marketId: BigNumberish,
      maxLiquidationLimitAccumulationMultiplier: BigNumberish,
      maxSecondsInLiquidationWindow: BigNumberish,
      maxLiquidationPd: BigNumberish,
      endorsedLiquidator: string,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    setMaxMarketSize(
      marketId: BigNumberish,
      maxMarketSize: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    setMaxMarketValue(
      marketId: BigNumberish,
      maxMarketValue: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    setOrderFees(
      marketId: BigNumberish,
      makerFeeRatio: BigNumberish,
      takerFeeRatio: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    setSettlementStrategy(
      marketId: BigNumberish,
      strategyId: BigNumberish,
      strategy: {
        strategyType: BigNumberish;
        settlementDelay: BigNumberish;
        settlementWindowDuration: BigNumberish;
        priceVerificationContract: string;
        feedId: BytesLike;
        settlementReward: BigNumberish;
        disabled: boolean;
        commitmentPriceDelay: BigNumberish;
      },
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    setSettlementStrategyEnabled(
      marketId: BigNumberish,
      strategyId: BigNumberish,
      enabled: boolean,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    updatePriceData(
      perpsMarketId: BigNumberish,
      feedId: BytesLike,
      strictStalenessTolerance: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    getCollateralConfiguration(
      synthMarketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getFeeCollector(overrides?: CallOverrides): Promise<BigNumber>;

    getInterestRateParameters(overrides?: CallOverrides): Promise<BigNumber>;

    getKeeperCostNodeId(overrides?: CallOverrides): Promise<BigNumber>;

    getKeeperRewardGuards(overrides?: CallOverrides): Promise<BigNumber>;

    getMarkets(overrides?: CallOverrides): Promise<BigNumber>;

    getPerAccountCaps(overrides?: CallOverrides): Promise<BigNumber>;

    getReferrerShare(referrer: string, overrides?: CallOverrides): Promise<BigNumber>;

    getSupportedCollaterals(overrides?: CallOverrides): Promise<BigNumber>;

    getSynthDeductionPriority(overrides?: CallOverrides): Promise<BigNumber>;

    setCollateralConfiguration(
      synthMarketId: BigNumberish,
      maxCollateralAmount: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    setFeeCollector(
      feeCollector: string,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    setInterestRateParameters(
      lowUtilizationInterestRateGradient: BigNumberish,
      interestRateGradientBreakpoint: BigNumberish,
      highUtilizationInterestRateGradient: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    setKeeperRewardGuards(
      minKeeperRewardUsd: BigNumberish,
      minKeeperProfitRatioD18: BigNumberish,
      maxKeeperRewardUsd: BigNumberish,
      maxKeeperScalingRatioD18: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    setPerAccountCaps(
      maxPositionsPerAccount: BigNumberish,
      maxCollateralsPerAccount: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    setSynthDeductionPriority(
      newSynthDeductionPriority: BigNumberish[],
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    totalGlobalCollateralValue(overrides?: CallOverrides): Promise<BigNumber>;

    updateInterestRate(overrides?: Overrides & { from?: string }): Promise<BigNumber>;

    updateKeeperCostNodeId(
      keeperCostNodeId: BytesLike,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    updateReferrerShare(
      referrer: string,
      shareRatioD18: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
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

    createMarket(
      requestedMarketId: BigNumberish,
      marketName: string,
      marketSymbol: string,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    initializeFactory(
      synthetix: string,
      spotMarket: string,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    interestRate(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    minimumCredit(
      perpsMarketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    name(perpsMarketId: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    reportedDebt(
      perpsMarketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    setPerpsMarketName(
      marketName: string,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    utilizationRate(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getAccountCollateralIds(
      accountId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getAccountOpenPositions(
      accountId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getAvailableMargin(
      accountId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getCollateralAmount(
      accountId: BigNumberish,
      synthMarketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getOpenPosition(
      accountId: BigNumberish,
      marketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getOpenPositionSize(
      accountId: BigNumberish,
      marketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getRequiredMargins(
      accountId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getWithdrawableMargin(
      accountId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    modifyCollateral(
      accountId: BigNumberish,
      synthMarketId: BigNumberish,
      amountDelta: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    totalAccountOpenInterest(
      accountId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    totalCollateralValue(
      accountId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    currentFundingRate(
      marketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    currentFundingVelocity(
      marketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    fillPrice(
      marketId: BigNumberish,
      orderSize: BigNumberish,
      price: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getMarketSummary(
      marketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    indexPrice(marketId: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    maxOpenInterest(
      marketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    metadata(marketId: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    size(marketId: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    skew(marketId: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    commitOrder(
      commitment: {
        marketId: BigNumberish;
        accountId: BigNumberish;
        sizeDelta: BigNumberish;
        settlementStrategyId: BigNumberish;
        acceptablePrice: BigNumberish;
        trackingCode: BytesLike;
        referrer: string;
      },
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    computeOrderFees(
      marketId: BigNumberish,
      sizeDelta: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    computeOrderFeesWithPrice(
      marketId: BigNumberish,
      sizeDelta: BigNumberish,
      price: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getOrder(accountId: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getSettlementRewardCost(
      marketId: BigNumberish,
      settlementStrategyId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    requiredMarginForOrder(
      accountId: BigNumberish,
      marketId: BigNumberish,
      sizeDelta: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    requiredMarginForOrderWithPrice(
      accountId: BigNumberish,
      marketId: BigNumberish,
      sizeDelta: BigNumberish,
      price: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    settleOrder(
      accountId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    cancelOrder(
      accountId: BigNumberish,
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

    canLiquidate(accountId: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    flaggedAccounts(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    liquidate(
      accountId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    liquidateFlagged(
      maxNumberOfAccounts: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    liquidateFlaggedAccounts(
      accountIds: BigNumberish[],
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    liquidationCapacity(
      marketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    addSettlementStrategy(
      marketId: BigNumberish,
      strategy: {
        strategyType: BigNumberish;
        settlementDelay: BigNumberish;
        settlementWindowDuration: BigNumberish;
        priceVerificationContract: string;
        feedId: BytesLike;
        settlementReward: BigNumberish;
        disabled: boolean;
        commitmentPriceDelay: BigNumberish;
      },
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    getFundingParameters(
      marketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getLiquidationParameters(
      marketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getLockedOiRatio(
      marketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getMaxLiquidationParameters(
      marketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getMaxMarketSize(
      marketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getMaxMarketValue(
      marketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getOrderFees(marketId: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getPriceData(
      perpsMarketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getSettlementStrategy(
      marketId: BigNumberish,
      strategyId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    setFundingParameters(
      marketId: BigNumberish,
      skewScale: BigNumberish,
      maxFundingVelocity: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    setLiquidationParameters(
      marketId: BigNumberish,
      initialMarginRatioD18: BigNumberish,
      minimumInitialMarginRatioD18: BigNumberish,
      maintenanceMarginScalarD18: BigNumberish,
      flagRewardRatioD18: BigNumberish,
      minimumPositionMargin: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    setLockedOiRatio(
      marketId: BigNumberish,
      lockedOiRatioD18: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    setMaxLiquidationParameters(
      marketId: BigNumberish,
      maxLiquidationLimitAccumulationMultiplier: BigNumberish,
      maxSecondsInLiquidationWindow: BigNumberish,
      maxLiquidationPd: BigNumberish,
      endorsedLiquidator: string,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    setMaxMarketSize(
      marketId: BigNumberish,
      maxMarketSize: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    setMaxMarketValue(
      marketId: BigNumberish,
      maxMarketValue: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    setOrderFees(
      marketId: BigNumberish,
      makerFeeRatio: BigNumberish,
      takerFeeRatio: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    setSettlementStrategy(
      marketId: BigNumberish,
      strategyId: BigNumberish,
      strategy: {
        strategyType: BigNumberish;
        settlementDelay: BigNumberish;
        settlementWindowDuration: BigNumberish;
        priceVerificationContract: string;
        feedId: BytesLike;
        settlementReward: BigNumberish;
        disabled: boolean;
        commitmentPriceDelay: BigNumberish;
      },
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    setSettlementStrategyEnabled(
      marketId: BigNumberish,
      strategyId: BigNumberish,
      enabled: boolean,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    updatePriceData(
      perpsMarketId: BigNumberish,
      feedId: BytesLike,
      strictStalenessTolerance: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    getCollateralConfiguration(
      synthMarketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getFeeCollector(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getInterestRateParameters(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getKeeperCostNodeId(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getKeeperRewardGuards(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getMarkets(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getPerAccountCaps(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getReferrerShare(referrer: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getSupportedCollaterals(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getSynthDeductionPriority(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setCollateralConfiguration(
      synthMarketId: BigNumberish,
      maxCollateralAmount: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    setFeeCollector(
      feeCollector: string,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    setInterestRateParameters(
      lowUtilizationInterestRateGradient: BigNumberish,
      interestRateGradientBreakpoint: BigNumberish,
      highUtilizationInterestRateGradient: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    setKeeperRewardGuards(
      minKeeperRewardUsd: BigNumberish,
      minKeeperProfitRatioD18: BigNumberish,
      maxKeeperRewardUsd: BigNumberish,
      maxKeeperScalingRatioD18: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    setPerAccountCaps(
      maxPositionsPerAccount: BigNumberish,
      maxCollateralsPerAccount: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    setSynthDeductionPriority(
      newSynthDeductionPriority: BigNumberish[],
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    totalGlobalCollateralValue(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    updateInterestRate(overrides?: Overrides & { from?: string }): Promise<PopulatedTransaction>;

    updateKeeperCostNodeId(
      keeperCostNodeId: BytesLike,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    updateReferrerShare(
      referrer: string,
      shareRatioD18: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;
  };
}

