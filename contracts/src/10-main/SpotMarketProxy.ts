// !!! DO NOT EDIT !!! Automatically generated file

export const address = '0x38908Ee087D7db73A1Bd1ecab9AAb8E8c9C74595';
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
  'error FeatureUnavailable(bytes32 which)',
  'error InvalidMarketOwner()',
  'error InvalidSynthImplementation(uint256 synthImplementation)',
  'error MismatchAssociatedSystemKind(bytes32 expected, bytes32 actual)',
  'error MissingAssociatedSystem(bytes32 id)',
  'error OnlyMarketOwner(address marketOwner, address sender)',
  'error OverflowInt256ToUint256()',
  'event AssociatedSystemSet(bytes32 indexed kind, bytes32 indexed id, address proxy, address impl)',
  'event DecayRateUpdated(uint128 indexed marketId, uint256 rate)',
  'event MarketNominationRenounced(uint128 indexed marketId, address nominee)',
  'event MarketOwnerChanged(uint128 indexed marketId, address oldOwner, address newOwner)',
  'event MarketOwnerNominated(uint128 indexed marketId, address newOwner)',
  'event SynthImplementationSet(address synthImplementation)',
  'event SynthImplementationUpgraded(uint256 indexed synthMarketId, address indexed proxy, address implementation)',
  'event SynthPriceDataUpdated(uint256 indexed synthMarketId, bytes32 indexed buyFeedId, bytes32 indexed sellFeedId)',
  'event SynthRegistered(uint256 indexed synthMarketId, address synthTokenAddress)',
  'event SynthetixSystemSet(address synthetix, address usdTokenAddress, address oracleManager)',
  'function acceptMarketOwnership(uint128 synthMarketId)',
  'function createSynth(string tokenName, string tokenSymbol, address synthOwner) returns (uint128 synthMarketId)',
  'function getAssociatedSystem(bytes32 id) view returns (address addr, bytes32 kind)',
  'function getMarketOwner(uint128 synthMarketId) view returns (address marketOwner)',
  'function getSynth(uint128 marketId) view returns (address synthAddress)',
  'function getSynthImpl(uint128 marketId) view returns (address implAddress)',
  'function initOrUpgradeNft(bytes32 id, string name, string symbol, string uri, address impl)',
  'function initOrUpgradeToken(bytes32 id, string name, string symbol, uint8 decimals, address impl)',
  'function minimumCredit(uint128 marketId) view returns (uint256 lockedAmount)',
  'function name(uint128 marketId) view returns (string marketName)',
  'function nominateMarketOwner(uint128 synthMarketId, address newNominatedOwner)',
  'function registerUnmanagedSystem(bytes32 id, address endpoint)',
  'function renounceMarketNomination(uint128 synthMarketId)',
  'function renounceMarketOwnership(uint128 synthMarketId)',
  'function reportedDebt(uint128 marketId) view returns (uint256 reportedDebtAmount)',
  'function setDecayRate(uint128 marketId, uint256 rate)',
  'function setSynthImplementation(address synthImplementation)',
  'function setSynthetix(address synthetix)',
  'function supportsInterface(bytes4 interfaceId) view returns (bool isSupported)',
  'function updatePriceData(uint128 synthMarketId, bytes32 buyFeedId, bytes32 sellFeedId)',
  'function upgradeSynthImpl(uint128 marketId)',
  'error ExceedsMaxSynthAmount(uint256 maxSynthAmount, uint256 synthAmountCharged)',
  'error ExceedsMaxUsdAmount(uint256 maxUsdAmount, uint256 usdAmountCharged)',
  'error InsufficientAmountReceived(uint256 expected, uint256 current)',
  'error InvalidMarket(uint128 marketId)',
  'error InvalidPrices()',
  'error OverflowUint256ToInt256()',
  'event SynthBought(uint256 indexed synthMarketId, uint256 synthReturned, tuple(uint256 fixedFees, uint256 utilizationFees, int256 skewFees, int256 wrapperFees) fees, uint256 collectedFees, address referrer, uint256 price)',
  'event SynthSold(uint256 indexed synthMarketId, uint256 amountReturned, tuple(uint256 fixedFees, uint256 utilizationFees, int256 skewFees, int256 wrapperFees) fees, uint256 collectedFees, address referrer, uint256 price)',
  'function buy(uint128 marketId, uint256 usdAmount, uint256 minAmountReceived, address referrer) returns (uint256 synthAmount, tuple(uint256 fixedFees, uint256 utilizationFees, int256 skewFees, int256 wrapperFees) fees)',
  'function buyExactIn(uint128 marketId, uint256 usdAmount, uint256 minAmountReceived, address referrer) returns (uint256 synthAmount, tuple(uint256 fixedFees, uint256 utilizationFees, int256 skewFees, int256 wrapperFees) fees)',
  'function buyExactOut(uint128 marketId, uint256 synthAmount, uint256 maxUsdAmount, address referrer) returns (uint256 usdAmountCharged, tuple(uint256 fixedFees, uint256 utilizationFees, int256 skewFees, int256 wrapperFees) fees)',
  'function quoteBuyExactIn(uint128 marketId, uint256 usdAmount) view returns (uint256 synthAmount, tuple(uint256 fixedFees, uint256 utilizationFees, int256 skewFees, int256 wrapperFees) fees)',
  'function quoteBuyExactOut(uint128 marketId, uint256 synthAmount) view returns (uint256 usdAmountCharged, tuple(uint256 fixedFees, uint256 utilizationFees, int256 skewFees, int256 wrapperFees) fees)',
  'function quoteSellExactIn(uint128 marketId, uint256 synthAmount) view returns (uint256 returnAmount, tuple(uint256 fixedFees, uint256 utilizationFees, int256 skewFees, int256 wrapperFees) fees)',
  'function quoteSellExactOut(uint128 marketId, uint256 usdAmount) view returns (uint256 synthToBurn, tuple(uint256 fixedFees, uint256 utilizationFees, int256 skewFees, int256 wrapperFees) fees)',
  'function sell(uint128 marketId, uint256 synthAmount, uint256 minUsdAmount, address referrer) returns (uint256 usdAmountReceived, tuple(uint256 fixedFees, uint256 utilizationFees, int256 skewFees, int256 wrapperFees) fees)',
  'function sellExactIn(uint128 marketId, uint256 synthAmount, uint256 minAmountReceived, address referrer) returns (uint256 returnAmount, tuple(uint256 fixedFees, uint256 utilizationFees, int256 skewFees, int256 wrapperFees) fees)',
  'function sellExactOut(uint128 marketId, uint256 usdAmount, uint256 maxSynthAmount, address referrer) returns (uint256 synthToBurn, tuple(uint256 fixedFees, uint256 utilizationFees, int256 skewFees, int256 wrapperFees) fees)',
  'error IneligibleForCancellation(uint256 timestamp, uint256 expirationTime)',
  'error InsufficientSharesAmount(uint256 expected, uint256 actual)',
  'error InvalidAsyncTransactionType(uint8 transactionType)',
  'error InvalidClaim(uint256 asyncOrderId)',
  'error InvalidCommitmentAmount(uint256 minimumAmount, uint256 amount)',
  'error InvalidSettlementStrategy(uint256 settlementStrategyId)',
  'error OrderAlreadySettled(uint256 asyncOrderId, uint256 settledAt)',
  'event OrderCancelled(uint128 indexed marketId, uint128 indexed asyncOrderId, tuple(uint128 id, address owner, uint8 orderType, uint256 amountEscrowed, uint256 settlementStrategyId, uint256 settlementTime, uint256 minimumSettlementAmount, uint256 settledAt, address referrer) asyncOrderClaim, address indexed sender)',
  'event OrderCommitted(uint128 indexed marketId, uint8 indexed orderType, uint256 amountProvided, uint128 asyncOrderId, address indexed sender, address referrer)',
  'function cancelOrder(uint128 marketId, uint128 asyncOrderId)',
  'function commitOrder(uint128 marketId, uint8 orderType, uint256 amountProvided, uint256 settlementStrategyId, uint256 minimumSettlementAmount, address referrer) returns (tuple(uint128 id, address owner, uint8 orderType, uint256 amountEscrowed, uint256 settlementStrategyId, uint256 settlementTime, uint256 minimumSettlementAmount, uint256 settledAt, address referrer) asyncOrderClaim)',
  'function getAsyncOrderClaim(uint128 marketId, uint128 asyncOrderId) pure returns (tuple(uint128 id, address owner, uint8 orderType, uint256 amountEscrowed, uint256 settlementStrategyId, uint256 settlementTime, uint256 minimumSettlementAmount, uint256 settledAt, address referrer) asyncOrderClaim)',
  'error InvalidSettlementStrategy(uint8 strategyType)',
  'error InvalidVerificationResponse()',
  'error MinimumSettlementAmountNotMet(uint256 minimum, uint256 actual)',
  'error OffchainLookup(address sender, string[] urls, bytes callData, bytes4 callbackFunction, bytes extraData)',
  'error OutsideSettlementWindow(uint256 timestamp, uint256 startTime, uint256 expirationTime)',
  'error OverflowUint256ToUint64()',
  'error PriceDeviationToleranceExceeded(uint256 deviation, uint256 tolerance)',
  'error SettlementStrategyNotFound(uint8 strategyType)',
  'event OrderSettled(uint128 indexed marketId, uint128 indexed asyncOrderId, uint256 finalOrderAmount, tuple(uint256 fixedFees, uint256 utilizationFees, int256 skewFees, int256 wrapperFees) fees, uint256 collectedFees, address indexed settler, uint256 price, uint8 orderType)',
  'function PRECISION() view returns (int256)',
  'function settleOrder(uint128 marketId, uint128 asyncOrderId) returns (uint256 finalOrderAmount, tuple(uint256 fixedFees, uint256 utilizationFees, int256 skewFees, int256 wrapperFees) fees)',
  'function settlePythOrder(bytes result, bytes extraData) payable returns (uint256 finalOrderAmount, tuple(uint256 fixedFees, uint256 utilizationFees, int256 skewFees, int256 wrapperFees) fees)',
  'event SettlementStrategyAdded(uint128 indexed synthMarketId, uint256 indexed strategyId)',
  'event SettlementStrategyUpdated(uint128 indexed synthMarketId, uint256 indexed strategyId, bool enabled)',
  'function addSettlementStrategy(uint128 marketId, tuple(uint8 strategyType, uint256 settlementDelay, uint256 settlementWindowDuration, address priceVerificationContract, bytes32 feedId, string url, uint256 settlementReward, uint256 priceDeviationTolerance, uint256 minimumUsdExchangeAmount, uint256 maxRoundingLoss, bool disabled) strategy) returns (uint256 strategyId)',
  'function getSettlementStrategy(uint128 marketId, uint256 strategyId) view returns (tuple(uint8 strategyType, uint256 settlementDelay, uint256 settlementWindowDuration, address priceVerificationContract, bytes32 feedId, string url, uint256 settlementReward, uint256 priceDeviationTolerance, uint256 minimumUsdExchangeAmount, uint256 maxRoundingLoss, bool disabled) settlementStrategy)',
  'function setSettlementStrategyEnabled(uint128 marketId, uint256 strategyId, bool enabled)',
  'error FailedTransfer(address from, address to, uint256 value)',
  'error InvalidCollateralType(bytes32 message)',
  'error WrapperExceedsMaxAmount(uint256 maxWrappableAmount, uint256 currentSupply, uint256 amountToWrap)',
  'event SynthUnwrapped(uint256 indexed synthMarketId, uint256 amountUnwrapped, tuple(uint256 fixedFees, uint256 utilizationFees, int256 skewFees, int256 wrapperFees) fees, uint256 feesCollected)',
  'event SynthWrapped(uint256 indexed synthMarketId, uint256 amountWrapped, tuple(uint256 fixedFees, uint256 utilizationFees, int256 skewFees, int256 wrapperFees) fees, uint256 feesCollected)',
  'event WrapperSet(uint256 indexed synthMarketId, address indexed wrapCollateralType, uint256 maxWrappableAmount)',
  'function setWrapper(uint128 marketId, address wrapCollateralType, uint256 maxWrappableAmount)',
  'function unwrap(uint128 marketId, uint256 unwrapAmount, uint256 minAmountReceived) returns (uint256 returnCollateralAmount, tuple(uint256 fixedFees, uint256 utilizationFees, int256 skewFees, int256 wrapperFees) fees)',
  'function wrap(uint128 marketId, uint256 wrapAmount, uint256 minAmountReceived) returns (uint256 amountToMint, tuple(uint256 fixedFees, uint256 utilizationFees, int256 skewFees, int256 wrapperFees) fees)',
  'error InvalidCollateralLeverage(uint256)',
  'error InvalidFeeCollectorInterface(address invalidFeeCollector)',
  'error InvalidWrapperFees()',
  'event AsyncFixedFeeSet(uint256 indexed synthMarketId, uint256 asyncFixedFee)',
  'event AtomicFixedFeeSet(uint256 indexed synthMarketId, uint256 atomicFixedFee)',
  'event CollateralLeverageSet(uint256 indexed synthMarketId, uint256 collateralLeverage)',
  'event FeeCollectorSet(uint256 indexed synthMarketId, address feeCollector)',
  'event MarketSkewScaleSet(uint256 indexed synthMarketId, uint256 skewScale)',
  'event MarketUtilizationFeesSet(uint256 indexed synthMarketId, uint256 utilizationFeeRate)',
  'event ReferrerShareUpdated(uint128 indexed marketId, address referrer, uint256 sharePercentage)',
  'event TransactorFixedFeeSet(uint256 indexed synthMarketId, address transactor, uint256 fixedFeeAmount)',
  'event WrapperFeesSet(uint256 indexed synthMarketId, int256 wrapFee, int256 unwrapFee)',
  'function getCollateralLeverage(uint128 synthMarketId) view returns (uint256 collateralLeverage)',
  'function getCustomTransactorFees(uint128 synthMarketId, address transactor) view returns (uint256 fixedFeeAmount)',
  'function getFeeCollector(uint128 synthMarketId) view returns (address feeCollector)',
  'function getMarketFees(uint128 synthMarketId) view returns (uint256 atomicFixedFee, uint256 asyncFixedFee, int256 wrapFee, int256 unwrapFee)',
  'function getMarketSkewScale(uint128 synthMarketId) view returns (uint256 skewScale)',
  'function getMarketUtilizationFees(uint128 synthMarketId) view returns (uint256 utilizationFeeRate)',
  'function getReferrerShare(uint128 synthMarketId, address referrer) view returns (uint256 sharePercentage)',
  'function setAsyncFixedFee(uint128 synthMarketId, uint256 asyncFixedFee)',
  'function setAtomicFixedFee(uint128 synthMarketId, uint256 atomicFixedFee)',
  'function setCollateralLeverage(uint128 synthMarketId, uint256 collateralLeverage)',
  'function setCustomTransactorFees(uint128 synthMarketId, address transactor, uint256 fixedFeeAmount)',
  'function setFeeCollector(uint128 synthMarketId, address feeCollector)',
  'function setMarketSkewScale(uint128 synthMarketId, uint256 skewScale)',
  'function setMarketUtilizationFees(uint128 synthMarketId, uint256 utilizationFeeRate)',
  'function setWrapperFees(uint128 synthMarketId, int256 wrapFee, int256 unwrapFee)',
  'function updateReferrerShare(uint128 synthMarketId, address referrer, uint256 sharePercentage)',
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

export interface SpotMarketProxyInterface extends utils.Interface {
  functions: {
    'acceptOwnership()': FunctionFragment;
    'getImplementation()': FunctionFragment;
    'nominateNewOwner(address)': FunctionFragment;
    'nominatedOwner()': FunctionFragment;
    'owner()': FunctionFragment;
    'renounceNomination()': FunctionFragment;
    'simulateUpgradeTo(address)': FunctionFragment;
    'upgradeTo(address)': FunctionFragment;
    'acceptMarketOwnership(uint128)': FunctionFragment;
    'createSynth(string,string,address)': FunctionFragment;
    'getAssociatedSystem(bytes32)': FunctionFragment;
    'getMarketOwner(uint128)': FunctionFragment;
    'getSynth(uint128)': FunctionFragment;
    'getSynthImpl(uint128)': FunctionFragment;
    'initOrUpgradeNft(bytes32,string,string,string,address)': FunctionFragment;
    'initOrUpgradeToken(bytes32,string,string,uint8,address)': FunctionFragment;
    'minimumCredit(uint128)': FunctionFragment;
    'name(uint128)': FunctionFragment;
    'nominateMarketOwner(uint128,address)': FunctionFragment;
    'registerUnmanagedSystem(bytes32,address)': FunctionFragment;
    'renounceMarketNomination(uint128)': FunctionFragment;
    'renounceMarketOwnership(uint128)': FunctionFragment;
    'reportedDebt(uint128)': FunctionFragment;
    'setDecayRate(uint128,uint256)': FunctionFragment;
    'setSynthImplementation(address)': FunctionFragment;
    'setSynthetix(address)': FunctionFragment;
    'supportsInterface(bytes4)': FunctionFragment;
    'updatePriceData(uint128,bytes32,bytes32)': FunctionFragment;
    'upgradeSynthImpl(uint128)': FunctionFragment;
    'buy(uint128,uint256,uint256,address)': FunctionFragment;
    'buyExactIn(uint128,uint256,uint256,address)': FunctionFragment;
    'buyExactOut(uint128,uint256,uint256,address)': FunctionFragment;
    'quoteBuyExactIn(uint128,uint256)': FunctionFragment;
    'quoteBuyExactOut(uint128,uint256)': FunctionFragment;
    'quoteSellExactIn(uint128,uint256)': FunctionFragment;
    'quoteSellExactOut(uint128,uint256)': FunctionFragment;
    'sell(uint128,uint256,uint256,address)': FunctionFragment;
    'sellExactIn(uint128,uint256,uint256,address)': FunctionFragment;
    'sellExactOut(uint128,uint256,uint256,address)': FunctionFragment;
    'cancelOrder(uint128,uint128)': FunctionFragment;
    'commitOrder(uint128,uint8,uint256,uint256,uint256,address)': FunctionFragment;
    'getAsyncOrderClaim(uint128,uint128)': FunctionFragment;
    'PRECISION()': FunctionFragment;
    'settleOrder(uint128,uint128)': FunctionFragment;
    'settlePythOrder(bytes,bytes)': FunctionFragment;
    'addSettlementStrategy(uint128,(uint8,uint256,uint256,address,bytes32,string,uint256,uint256,uint256,uint256,bool))': FunctionFragment;
    'getSettlementStrategy(uint128,uint256)': FunctionFragment;
    'setSettlementStrategyEnabled(uint128,uint256,bool)': FunctionFragment;
    'setWrapper(uint128,address,uint256)': FunctionFragment;
    'unwrap(uint128,uint256,uint256)': FunctionFragment;
    'wrap(uint128,uint256,uint256)': FunctionFragment;
    'getCollateralLeverage(uint128)': FunctionFragment;
    'getCustomTransactorFees(uint128,address)': FunctionFragment;
    'getFeeCollector(uint128)': FunctionFragment;
    'getMarketFees(uint128)': FunctionFragment;
    'getMarketSkewScale(uint128)': FunctionFragment;
    'getMarketUtilizationFees(uint128)': FunctionFragment;
    'getReferrerShare(uint128,address)': FunctionFragment;
    'setAsyncFixedFee(uint128,uint256)': FunctionFragment;
    'setAtomicFixedFee(uint128,uint256)': FunctionFragment;
    'setCollateralLeverage(uint128,uint256)': FunctionFragment;
    'setCustomTransactorFees(uint128,address,uint256)': FunctionFragment;
    'setFeeCollector(uint128,address)': FunctionFragment;
    'setMarketSkewScale(uint128,uint256)': FunctionFragment;
    'setMarketUtilizationFees(uint128,uint256)': FunctionFragment;
    'setWrapperFees(uint128,int256,int256)': FunctionFragment;
    'updateReferrerShare(uint128,address,uint256)': FunctionFragment;
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
      | 'acceptMarketOwnership'
      | 'createSynth'
      | 'getAssociatedSystem'
      | 'getMarketOwner'
      | 'getSynth'
      | 'getSynthImpl'
      | 'initOrUpgradeNft'
      | 'initOrUpgradeToken'
      | 'minimumCredit'
      | 'name'
      | 'nominateMarketOwner'
      | 'registerUnmanagedSystem'
      | 'renounceMarketNomination'
      | 'renounceMarketOwnership'
      | 'reportedDebt'
      | 'setDecayRate'
      | 'setSynthImplementation'
      | 'setSynthetix'
      | 'supportsInterface'
      | 'updatePriceData'
      | 'upgradeSynthImpl'
      | 'buy'
      | 'buyExactIn'
      | 'buyExactOut'
      | 'quoteBuyExactIn'
      | 'quoteBuyExactOut'
      | 'quoteSellExactIn'
      | 'quoteSellExactOut'
      | 'sell'
      | 'sellExactIn'
      | 'sellExactOut'
      | 'cancelOrder'
      | 'commitOrder'
      | 'getAsyncOrderClaim'
      | 'PRECISION'
      | 'settleOrder'
      | 'settlePythOrder'
      | 'addSettlementStrategy'
      | 'getSettlementStrategy'
      | 'setSettlementStrategyEnabled'
      | 'setWrapper'
      | 'unwrap'
      | 'wrap'
      | 'getCollateralLeverage'
      | 'getCustomTransactorFees'
      | 'getFeeCollector'
      | 'getMarketFees'
      | 'getMarketSkewScale'
      | 'getMarketUtilizationFees'
      | 'getReferrerShare'
      | 'setAsyncFixedFee'
      | 'setAtomicFixedFee'
      | 'setCollateralLeverage'
      | 'setCustomTransactorFees'
      | 'setFeeCollector'
      | 'setMarketSkewScale'
      | 'setMarketUtilizationFees'
      | 'setWrapperFees'
      | 'updateReferrerShare'
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
  ): FunctionFragment;

  encodeFunctionData(functionFragment: 'acceptOwnership', values?: undefined): string;
  encodeFunctionData(functionFragment: 'getImplementation', values?: undefined): string;
  encodeFunctionData(functionFragment: 'nominateNewOwner', values: [string]): string;
  encodeFunctionData(functionFragment: 'nominatedOwner', values?: undefined): string;
  encodeFunctionData(functionFragment: 'owner', values?: undefined): string;
  encodeFunctionData(functionFragment: 'renounceNomination', values?: undefined): string;
  encodeFunctionData(functionFragment: 'simulateUpgradeTo', values: [string]): string;
  encodeFunctionData(functionFragment: 'upgradeTo', values: [string]): string;
  encodeFunctionData(functionFragment: 'acceptMarketOwnership', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'createSynth', values: [string, string, string]): string;
  encodeFunctionData(functionFragment: 'getAssociatedSystem', values: [BytesLike]): string;
  encodeFunctionData(functionFragment: 'getMarketOwner', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'getSynth', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'getSynthImpl', values: [BigNumberish]): string;
  encodeFunctionData(
    functionFragment: 'initOrUpgradeNft',
    values: [BytesLike, string, string, string, string]
  ): string;
  encodeFunctionData(
    functionFragment: 'initOrUpgradeToken',
    values: [BytesLike, string, string, BigNumberish, string]
  ): string;
  encodeFunctionData(functionFragment: 'minimumCredit', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'name', values: [BigNumberish]): string;
  encodeFunctionData(
    functionFragment: 'nominateMarketOwner',
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: 'registerUnmanagedSystem',
    values: [BytesLike, string]
  ): string;
  encodeFunctionData(functionFragment: 'renounceMarketNomination', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'renounceMarketOwnership', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'reportedDebt', values: [BigNumberish]): string;
  encodeFunctionData(
    functionFragment: 'setDecayRate',
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: 'setSynthImplementation', values: [string]): string;
  encodeFunctionData(functionFragment: 'setSynthetix', values: [string]): string;
  encodeFunctionData(functionFragment: 'supportsInterface', values: [BytesLike]): string;
  encodeFunctionData(
    functionFragment: 'updatePriceData',
    values: [BigNumberish, BytesLike, BytesLike]
  ): string;
  encodeFunctionData(functionFragment: 'upgradeSynthImpl', values: [BigNumberish]): string;
  encodeFunctionData(
    functionFragment: 'buy',
    values: [BigNumberish, BigNumberish, BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: 'buyExactIn',
    values: [BigNumberish, BigNumberish, BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: 'buyExactOut',
    values: [BigNumberish, BigNumberish, BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: 'quoteBuyExactIn',
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: 'quoteBuyExactOut',
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: 'quoteSellExactIn',
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: 'quoteSellExactOut',
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: 'sell',
    values: [BigNumberish, BigNumberish, BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: 'sellExactIn',
    values: [BigNumberish, BigNumberish, BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: 'sellExactOut',
    values: [BigNumberish, BigNumberish, BigNumberish, string]
  ): string;
  encodeFunctionData(functionFragment: 'cancelOrder', values: [BigNumberish, BigNumberish]): string;
  encodeFunctionData(
    functionFragment: 'commitOrder',
    values: [BigNumberish, BigNumberish, BigNumberish, BigNumberish, BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: 'getAsyncOrderClaim',
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: 'PRECISION', values?: undefined): string;
  encodeFunctionData(functionFragment: 'settleOrder', values: [BigNumberish, BigNumberish]): string;
  encodeFunctionData(functionFragment: 'settlePythOrder', values: [BytesLike, BytesLike]): string;
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
        url: string;
        settlementReward: BigNumberish;
        priceDeviationTolerance: BigNumberish;
        minimumUsdExchangeAmount: BigNumberish;
        maxRoundingLoss: BigNumberish;
        disabled: boolean;
      }
    ]
  ): string;
  encodeFunctionData(
    functionFragment: 'getSettlementStrategy',
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: 'setSettlementStrategyEnabled',
    values: [BigNumberish, BigNumberish, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: 'setWrapper',
    values: [BigNumberish, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: 'unwrap',
    values: [BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: 'wrap',
    values: [BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: 'getCollateralLeverage', values: [BigNumberish]): string;
  encodeFunctionData(
    functionFragment: 'getCustomTransactorFees',
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(functionFragment: 'getFeeCollector', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'getMarketFees', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'getMarketSkewScale', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'getMarketUtilizationFees', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'getReferrerShare', values: [BigNumberish, string]): string;
  encodeFunctionData(
    functionFragment: 'setAsyncFixedFee',
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: 'setAtomicFixedFee',
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: 'setCollateralLeverage',
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: 'setCustomTransactorFees',
    values: [BigNumberish, string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: 'setFeeCollector', values: [BigNumberish, string]): string;
  encodeFunctionData(
    functionFragment: 'setMarketSkewScale',
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: 'setMarketUtilizationFees',
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: 'setWrapperFees',
    values: [BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: 'updateReferrerShare',
    values: [BigNumberish, string, BigNumberish]
  ): string;
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

  decodeFunctionResult(functionFragment: 'acceptOwnership', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getImplementation', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'nominateNewOwner', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'nominatedOwner', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'owner', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'renounceNomination', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'simulateUpgradeTo', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'upgradeTo', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'acceptMarketOwnership', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'createSynth', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getAssociatedSystem', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getMarketOwner', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getSynth', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getSynthImpl', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'initOrUpgradeNft', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'initOrUpgradeToken', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'minimumCredit', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'name', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'nominateMarketOwner', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'registerUnmanagedSystem', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'renounceMarketNomination', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'renounceMarketOwnership', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'reportedDebt', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setDecayRate', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setSynthImplementation', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setSynthetix', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'supportsInterface', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'updatePriceData', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'upgradeSynthImpl', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'buy', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'buyExactIn', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'buyExactOut', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'quoteBuyExactIn', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'quoteBuyExactOut', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'quoteSellExactIn', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'quoteSellExactOut', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'sell', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'sellExactIn', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'sellExactOut', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'cancelOrder', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'commitOrder', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getAsyncOrderClaim', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'PRECISION', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'settleOrder', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'settlePythOrder', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'addSettlementStrategy', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getSettlementStrategy', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setSettlementStrategyEnabled', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setWrapper', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'unwrap', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'wrap', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getCollateralLeverage', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getCustomTransactorFees', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getFeeCollector', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getMarketFees', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getMarketSkewScale', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getMarketUtilizationFees', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getReferrerShare', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setAsyncFixedFee', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setAtomicFixedFee', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setCollateralLeverage', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setCustomTransactorFees', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setFeeCollector', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setMarketSkewScale', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setMarketUtilizationFees', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setWrapperFees', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'updateReferrerShare', data: BytesLike): Result;
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

  events: {
    'OwnerChanged(address,address)': EventFragment;
    'OwnerNominated(address)': EventFragment;
    'Upgraded(address,address)': EventFragment;
    'AssociatedSystemSet(bytes32,bytes32,address,address)': EventFragment;
    'DecayRateUpdated(uint128,uint256)': EventFragment;
    'MarketNominationRenounced(uint128,address)': EventFragment;
    'MarketOwnerChanged(uint128,address,address)': EventFragment;
    'MarketOwnerNominated(uint128,address)': EventFragment;
    'SynthImplementationSet(address)': EventFragment;
    'SynthImplementationUpgraded(uint256,address,address)': EventFragment;
    'SynthPriceDataUpdated(uint256,bytes32,bytes32)': EventFragment;
    'SynthRegistered(uint256,address)': EventFragment;
    'SynthetixSystemSet(address,address,address)': EventFragment;
    'SynthBought(uint256,uint256,(uint256,uint256,int256,int256),uint256,address,uint256)': EventFragment;
    'SynthSold(uint256,uint256,(uint256,uint256,int256,int256),uint256,address,uint256)': EventFragment;
    'OrderCancelled(uint128,uint128,(uint128,address,uint8,uint256,uint256,uint256,uint256,uint256,address),address)': EventFragment;
    'OrderCommitted(uint128,uint8,uint256,uint128,address,address)': EventFragment;
    'OrderSettled(uint128,uint128,uint256,(uint256,uint256,int256,int256),uint256,address,uint256,uint8)': EventFragment;
    'SettlementStrategyAdded(uint128,uint256)': EventFragment;
    'SettlementStrategyUpdated(uint128,uint256,bool)': EventFragment;
    'SynthUnwrapped(uint256,uint256,(uint256,uint256,int256,int256),uint256)': EventFragment;
    'SynthWrapped(uint256,uint256,(uint256,uint256,int256,int256),uint256)': EventFragment;
    'WrapperSet(uint256,address,uint256)': EventFragment;
    'AsyncFixedFeeSet(uint256,uint256)': EventFragment;
    'AtomicFixedFeeSet(uint256,uint256)': EventFragment;
    'CollateralLeverageSet(uint256,uint256)': EventFragment;
    'FeeCollectorSet(uint256,address)': EventFragment;
    'MarketSkewScaleSet(uint256,uint256)': EventFragment;
    'MarketUtilizationFeesSet(uint256,uint256)': EventFragment;
    'ReferrerShareUpdated(uint128,address,uint256)': EventFragment;
    'TransactorFixedFeeSet(uint256,address,uint256)': EventFragment;
    'WrapperFeesSet(uint256,int256,int256)': EventFragment;
    'FeatureFlagAllowAllSet(bytes32,bool)': EventFragment;
    'FeatureFlagAllowlistAdded(bytes32,address)': EventFragment;
    'FeatureFlagAllowlistRemoved(bytes32,address)': EventFragment;
    'FeatureFlagDeniersReset(bytes32,address[])': EventFragment;
    'FeatureFlagDenyAllSet(bytes32,bool)': EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: 'OwnerChanged'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'OwnerNominated'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'Upgraded'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'AssociatedSystemSet'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'DecayRateUpdated'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'MarketNominationRenounced'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'MarketOwnerChanged'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'MarketOwnerNominated'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'SynthImplementationSet'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'SynthImplementationUpgraded'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'SynthPriceDataUpdated'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'SynthRegistered'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'SynthetixSystemSet'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'SynthBought'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'SynthSold'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'OrderCancelled'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'OrderCommitted'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'OrderSettled'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'SettlementStrategyAdded'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'SettlementStrategyUpdated'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'SynthUnwrapped'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'SynthWrapped'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'WrapperSet'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'AsyncFixedFeeSet'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'AtomicFixedFeeSet'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'CollateralLeverageSet'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'FeeCollectorSet'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'MarketSkewScaleSet'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'MarketUtilizationFeesSet'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'ReferrerShareUpdated'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'TransactorFixedFeeSet'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'WrapperFeesSet'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'FeatureFlagAllowAllSet'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'FeatureFlagAllowlistAdded'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'FeatureFlagAllowlistRemoved'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'FeatureFlagDeniersReset'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'FeatureFlagDenyAllSet'): EventFragment;
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

export interface DecayRateUpdatedEventObject {
  marketId: BigNumber;
  rate: BigNumber;
}
export type DecayRateUpdatedEvent = TypedEvent<[BigNumber, BigNumber], DecayRateUpdatedEventObject>;

export type DecayRateUpdatedEventFilter = TypedEventFilter<DecayRateUpdatedEvent>;

export interface MarketNominationRenouncedEventObject {
  marketId: BigNumber;
  nominee: string;
}
export type MarketNominationRenouncedEvent = TypedEvent<
  [BigNumber, string],
  MarketNominationRenouncedEventObject
>;

export type MarketNominationRenouncedEventFilter = TypedEventFilter<MarketNominationRenouncedEvent>;

export interface MarketOwnerChangedEventObject {
  marketId: BigNumber;
  oldOwner: string;
  newOwner: string;
}
export type MarketOwnerChangedEvent = TypedEvent<
  [BigNumber, string, string],
  MarketOwnerChangedEventObject
>;

export type MarketOwnerChangedEventFilter = TypedEventFilter<MarketOwnerChangedEvent>;

export interface MarketOwnerNominatedEventObject {
  marketId: BigNumber;
  newOwner: string;
}
export type MarketOwnerNominatedEvent = TypedEvent<
  [BigNumber, string],
  MarketOwnerNominatedEventObject
>;

export type MarketOwnerNominatedEventFilter = TypedEventFilter<MarketOwnerNominatedEvent>;

export interface SynthImplementationSetEventObject {
  synthImplementation: string;
}
export type SynthImplementationSetEvent = TypedEvent<[string], SynthImplementationSetEventObject>;

export type SynthImplementationSetEventFilter = TypedEventFilter<SynthImplementationSetEvent>;

export interface SynthImplementationUpgradedEventObject {
  synthMarketId: BigNumber;
  proxy: string;
  implementation: string;
}
export type SynthImplementationUpgradedEvent = TypedEvent<
  [BigNumber, string, string],
  SynthImplementationUpgradedEventObject
>;

export type SynthImplementationUpgradedEventFilter =
  TypedEventFilter<SynthImplementationUpgradedEvent>;

export interface SynthPriceDataUpdatedEventObject {
  synthMarketId: BigNumber;
  buyFeedId: string;
  sellFeedId: string;
}
export type SynthPriceDataUpdatedEvent = TypedEvent<
  [BigNumber, string, string],
  SynthPriceDataUpdatedEventObject
>;

export type SynthPriceDataUpdatedEventFilter = TypedEventFilter<SynthPriceDataUpdatedEvent>;

export interface SynthRegisteredEventObject {
  synthMarketId: BigNumber;
  synthTokenAddress: string;
}
export type SynthRegisteredEvent = TypedEvent<[BigNumber, string], SynthRegisteredEventObject>;

export type SynthRegisteredEventFilter = TypedEventFilter<SynthRegisteredEvent>;

export interface SynthetixSystemSetEventObject {
  synthetix: string;
  usdTokenAddress: string;
  oracleManager: string;
}
export type SynthetixSystemSetEvent = TypedEvent<
  [string, string, string],
  SynthetixSystemSetEventObject
>;

export type SynthetixSystemSetEventFilter = TypedEventFilter<SynthetixSystemSetEvent>;

export interface SynthBoughtEventObject {
  synthMarketId: BigNumber;
  synthReturned: BigNumber;
  fees: [BigNumber, BigNumber, BigNumber, BigNumber] & {
    fixedFees: BigNumber;
    utilizationFees: BigNumber;
    skewFees: BigNumber;
    wrapperFees: BigNumber;
  };
  collectedFees: BigNumber;
  referrer: string;
  price: BigNumber;
}
export type SynthBoughtEvent = TypedEvent<
  [
    BigNumber,
    BigNumber,
    [BigNumber, BigNumber, BigNumber, BigNumber] & {
      fixedFees: BigNumber;
      utilizationFees: BigNumber;
      skewFees: BigNumber;
      wrapperFees: BigNumber;
    },
    BigNumber,
    string,
    BigNumber
  ],
  SynthBoughtEventObject
>;

export type SynthBoughtEventFilter = TypedEventFilter<SynthBoughtEvent>;

export interface SynthSoldEventObject {
  synthMarketId: BigNumber;
  amountReturned: BigNumber;
  fees: [BigNumber, BigNumber, BigNumber, BigNumber] & {
    fixedFees: BigNumber;
    utilizationFees: BigNumber;
    skewFees: BigNumber;
    wrapperFees: BigNumber;
  };
  collectedFees: BigNumber;
  referrer: string;
  price: BigNumber;
}
export type SynthSoldEvent = TypedEvent<
  [
    BigNumber,
    BigNumber,
    [BigNumber, BigNumber, BigNumber, BigNumber] & {
      fixedFees: BigNumber;
      utilizationFees: BigNumber;
      skewFees: BigNumber;
      wrapperFees: BigNumber;
    },
    BigNumber,
    string,
    BigNumber
  ],
  SynthSoldEventObject
>;

export type SynthSoldEventFilter = TypedEventFilter<SynthSoldEvent>;

export interface OrderCancelledEventObject {
  marketId: BigNumber;
  asyncOrderId: BigNumber;
  asyncOrderClaim: [
    BigNumber,
    string,
    number,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    string
  ] & {
    id: BigNumber;
    owner: string;
    orderType: number;
    amountEscrowed: BigNumber;
    settlementStrategyId: BigNumber;
    settlementTime: BigNumber;
    minimumSettlementAmount: BigNumber;
    settledAt: BigNumber;
    referrer: string;
  };
  sender: string;
}
export type OrderCancelledEvent = TypedEvent<
  [
    BigNumber,
    BigNumber,
    [BigNumber, string, number, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, string] & {
      id: BigNumber;
      owner: string;
      orderType: number;
      amountEscrowed: BigNumber;
      settlementStrategyId: BigNumber;
      settlementTime: BigNumber;
      minimumSettlementAmount: BigNumber;
      settledAt: BigNumber;
      referrer: string;
    },
    string
  ],
  OrderCancelledEventObject
>;

export type OrderCancelledEventFilter = TypedEventFilter<OrderCancelledEvent>;

export interface OrderCommittedEventObject {
  marketId: BigNumber;
  orderType: number;
  amountProvided: BigNumber;
  asyncOrderId: BigNumber;
  sender: string;
  referrer: string;
}
export type OrderCommittedEvent = TypedEvent<
  [BigNumber, number, BigNumber, BigNumber, string, string],
  OrderCommittedEventObject
>;

export type OrderCommittedEventFilter = TypedEventFilter<OrderCommittedEvent>;

export interface OrderSettledEventObject {
  marketId: BigNumber;
  asyncOrderId: BigNumber;
  finalOrderAmount: BigNumber;
  fees: [BigNumber, BigNumber, BigNumber, BigNumber] & {
    fixedFees: BigNumber;
    utilizationFees: BigNumber;
    skewFees: BigNumber;
    wrapperFees: BigNumber;
  };
  collectedFees: BigNumber;
  settler: string;
  price: BigNumber;
  orderType: number;
}
export type OrderSettledEvent = TypedEvent<
  [
    BigNumber,
    BigNumber,
    BigNumber,
    [BigNumber, BigNumber, BigNumber, BigNumber] & {
      fixedFees: BigNumber;
      utilizationFees: BigNumber;
      skewFees: BigNumber;
      wrapperFees: BigNumber;
    },
    BigNumber,
    string,
    BigNumber,
    number
  ],
  OrderSettledEventObject
>;

export type OrderSettledEventFilter = TypedEventFilter<OrderSettledEvent>;

export interface SettlementStrategyAddedEventObject {
  synthMarketId: BigNumber;
  strategyId: BigNumber;
}
export type SettlementStrategyAddedEvent = TypedEvent<
  [BigNumber, BigNumber],
  SettlementStrategyAddedEventObject
>;

export type SettlementStrategyAddedEventFilter = TypedEventFilter<SettlementStrategyAddedEvent>;

export interface SettlementStrategyUpdatedEventObject {
  synthMarketId: BigNumber;
  strategyId: BigNumber;
  enabled: boolean;
}
export type SettlementStrategyUpdatedEvent = TypedEvent<
  [BigNumber, BigNumber, boolean],
  SettlementStrategyUpdatedEventObject
>;

export type SettlementStrategyUpdatedEventFilter = TypedEventFilter<SettlementStrategyUpdatedEvent>;

export interface SynthUnwrappedEventObject {
  synthMarketId: BigNumber;
  amountUnwrapped: BigNumber;
  fees: [BigNumber, BigNumber, BigNumber, BigNumber] & {
    fixedFees: BigNumber;
    utilizationFees: BigNumber;
    skewFees: BigNumber;
    wrapperFees: BigNumber;
  };
  feesCollected: BigNumber;
}
export type SynthUnwrappedEvent = TypedEvent<
  [
    BigNumber,
    BigNumber,
    [BigNumber, BigNumber, BigNumber, BigNumber] & {
      fixedFees: BigNumber;
      utilizationFees: BigNumber;
      skewFees: BigNumber;
      wrapperFees: BigNumber;
    },
    BigNumber
  ],
  SynthUnwrappedEventObject
>;

export type SynthUnwrappedEventFilter = TypedEventFilter<SynthUnwrappedEvent>;

export interface SynthWrappedEventObject {
  synthMarketId: BigNumber;
  amountWrapped: BigNumber;
  fees: [BigNumber, BigNumber, BigNumber, BigNumber] & {
    fixedFees: BigNumber;
    utilizationFees: BigNumber;
    skewFees: BigNumber;
    wrapperFees: BigNumber;
  };
  feesCollected: BigNumber;
}
export type SynthWrappedEvent = TypedEvent<
  [
    BigNumber,
    BigNumber,
    [BigNumber, BigNumber, BigNumber, BigNumber] & {
      fixedFees: BigNumber;
      utilizationFees: BigNumber;
      skewFees: BigNumber;
      wrapperFees: BigNumber;
    },
    BigNumber
  ],
  SynthWrappedEventObject
>;

export type SynthWrappedEventFilter = TypedEventFilter<SynthWrappedEvent>;

export interface WrapperSetEventObject {
  synthMarketId: BigNumber;
  wrapCollateralType: string;
  maxWrappableAmount: BigNumber;
}
export type WrapperSetEvent = TypedEvent<[BigNumber, string, BigNumber], WrapperSetEventObject>;

export type WrapperSetEventFilter = TypedEventFilter<WrapperSetEvent>;

export interface AsyncFixedFeeSetEventObject {
  synthMarketId: BigNumber;
  asyncFixedFee: BigNumber;
}
export type AsyncFixedFeeSetEvent = TypedEvent<[BigNumber, BigNumber], AsyncFixedFeeSetEventObject>;

export type AsyncFixedFeeSetEventFilter = TypedEventFilter<AsyncFixedFeeSetEvent>;

export interface AtomicFixedFeeSetEventObject {
  synthMarketId: BigNumber;
  atomicFixedFee: BigNumber;
}
export type AtomicFixedFeeSetEvent = TypedEvent<
  [BigNumber, BigNumber],
  AtomicFixedFeeSetEventObject
>;

export type AtomicFixedFeeSetEventFilter = TypedEventFilter<AtomicFixedFeeSetEvent>;

export interface CollateralLeverageSetEventObject {
  synthMarketId: BigNumber;
  collateralLeverage: BigNumber;
}
export type CollateralLeverageSetEvent = TypedEvent<
  [BigNumber, BigNumber],
  CollateralLeverageSetEventObject
>;

export type CollateralLeverageSetEventFilter = TypedEventFilter<CollateralLeverageSetEvent>;

export interface FeeCollectorSetEventObject {
  synthMarketId: BigNumber;
  feeCollector: string;
}
export type FeeCollectorSetEvent = TypedEvent<[BigNumber, string], FeeCollectorSetEventObject>;

export type FeeCollectorSetEventFilter = TypedEventFilter<FeeCollectorSetEvent>;

export interface MarketSkewScaleSetEventObject {
  synthMarketId: BigNumber;
  skewScale: BigNumber;
}
export type MarketSkewScaleSetEvent = TypedEvent<
  [BigNumber, BigNumber],
  MarketSkewScaleSetEventObject
>;

export type MarketSkewScaleSetEventFilter = TypedEventFilter<MarketSkewScaleSetEvent>;

export interface MarketUtilizationFeesSetEventObject {
  synthMarketId: BigNumber;
  utilizationFeeRate: BigNumber;
}
export type MarketUtilizationFeesSetEvent = TypedEvent<
  [BigNumber, BigNumber],
  MarketUtilizationFeesSetEventObject
>;

export type MarketUtilizationFeesSetEventFilter = TypedEventFilter<MarketUtilizationFeesSetEvent>;

export interface ReferrerShareUpdatedEventObject {
  marketId: BigNumber;
  referrer: string;
  sharePercentage: BigNumber;
}
export type ReferrerShareUpdatedEvent = TypedEvent<
  [BigNumber, string, BigNumber],
  ReferrerShareUpdatedEventObject
>;

export type ReferrerShareUpdatedEventFilter = TypedEventFilter<ReferrerShareUpdatedEvent>;

export interface TransactorFixedFeeSetEventObject {
  synthMarketId: BigNumber;
  transactor: string;
  fixedFeeAmount: BigNumber;
}
export type TransactorFixedFeeSetEvent = TypedEvent<
  [BigNumber, string, BigNumber],
  TransactorFixedFeeSetEventObject
>;

export type TransactorFixedFeeSetEventFilter = TypedEventFilter<TransactorFixedFeeSetEvent>;

export interface WrapperFeesSetEventObject {
  synthMarketId: BigNumber;
  wrapFee: BigNumber;
  unwrapFee: BigNumber;
}
export type WrapperFeesSetEvent = TypedEvent<
  [BigNumber, BigNumber, BigNumber],
  WrapperFeesSetEventObject
>;

export type WrapperFeesSetEventFilter = TypedEventFilter<WrapperFeesSetEvent>;

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

export interface SpotMarketProxy extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: SpotMarketProxyInterface;

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

    acceptMarketOwnership(
      synthMarketId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    createSynth(
      tokenName: string,
      tokenSymbol: string,
      synthOwner: string,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    getAssociatedSystem(
      id: BytesLike,
      overrides?: CallOverrides
    ): Promise<[string, string] & { addr: string; kind: string }>;

    getMarketOwner(
      synthMarketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string] & { marketOwner: string }>;

    getSynth(
      marketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string] & { synthAddress: string }>;

    getSynthImpl(
      marketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string] & { implAddress: string }>;

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

    minimumCredit(
      marketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { lockedAmount: BigNumber }>;

    name(
      marketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string] & { marketName: string }>;

    nominateMarketOwner(
      synthMarketId: BigNumberish,
      newNominatedOwner: string,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    registerUnmanagedSystem(
      id: BytesLike,
      endpoint: string,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    renounceMarketNomination(
      synthMarketId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    renounceMarketOwnership(
      synthMarketId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    reportedDebt(
      marketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { reportedDebtAmount: BigNumber }>;

    setDecayRate(
      marketId: BigNumberish,
      rate: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    setSynthImplementation(
      synthImplementation: string,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    setSynthetix(
      synthetix: string,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<[boolean] & { isSupported: boolean }>;

    updatePriceData(
      synthMarketId: BigNumberish,
      buyFeedId: BytesLike,
      sellFeedId: BytesLike,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    upgradeSynthImpl(
      marketId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    buy(
      marketId: BigNumberish,
      usdAmount: BigNumberish,
      minAmountReceived: BigNumberish,
      referrer: string,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    buyExactIn(
      marketId: BigNumberish,
      usdAmount: BigNumberish,
      minAmountReceived: BigNumberish,
      referrer: string,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    buyExactOut(
      marketId: BigNumberish,
      synthAmount: BigNumberish,
      maxUsdAmount: BigNumberish,
      referrer: string,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    quoteBuyExactIn(
      marketId: BigNumberish,
      usdAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [
        BigNumber,
        [BigNumber, BigNumber, BigNumber, BigNumber] & {
          fixedFees: BigNumber;
          utilizationFees: BigNumber;
          skewFees: BigNumber;
          wrapperFees: BigNumber;
        }
      ] & {
        synthAmount: BigNumber;
        fees: [BigNumber, BigNumber, BigNumber, BigNumber] & {
          fixedFees: BigNumber;
          utilizationFees: BigNumber;
          skewFees: BigNumber;
          wrapperFees: BigNumber;
        };
      }
    >;

    quoteBuyExactOut(
      marketId: BigNumberish,
      synthAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [
        BigNumber,
        [BigNumber, BigNumber, BigNumber, BigNumber] & {
          fixedFees: BigNumber;
          utilizationFees: BigNumber;
          skewFees: BigNumber;
          wrapperFees: BigNumber;
        }
      ] & {
        usdAmountCharged: BigNumber;
        fees: [BigNumber, BigNumber, BigNumber, BigNumber] & {
          fixedFees: BigNumber;
          utilizationFees: BigNumber;
          skewFees: BigNumber;
          wrapperFees: BigNumber;
        };
      }
    >;

    quoteSellExactIn(
      marketId: BigNumberish,
      synthAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [
        BigNumber,
        [BigNumber, BigNumber, BigNumber, BigNumber] & {
          fixedFees: BigNumber;
          utilizationFees: BigNumber;
          skewFees: BigNumber;
          wrapperFees: BigNumber;
        }
      ] & {
        returnAmount: BigNumber;
        fees: [BigNumber, BigNumber, BigNumber, BigNumber] & {
          fixedFees: BigNumber;
          utilizationFees: BigNumber;
          skewFees: BigNumber;
          wrapperFees: BigNumber;
        };
      }
    >;

    quoteSellExactOut(
      marketId: BigNumberish,
      usdAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [
        BigNumber,
        [BigNumber, BigNumber, BigNumber, BigNumber] & {
          fixedFees: BigNumber;
          utilizationFees: BigNumber;
          skewFees: BigNumber;
          wrapperFees: BigNumber;
        }
      ] & {
        synthToBurn: BigNumber;
        fees: [BigNumber, BigNumber, BigNumber, BigNumber] & {
          fixedFees: BigNumber;
          utilizationFees: BigNumber;
          skewFees: BigNumber;
          wrapperFees: BigNumber;
        };
      }
    >;

    sell(
      marketId: BigNumberish,
      synthAmount: BigNumberish,
      minUsdAmount: BigNumberish,
      referrer: string,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    sellExactIn(
      marketId: BigNumberish,
      synthAmount: BigNumberish,
      minAmountReceived: BigNumberish,
      referrer: string,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    sellExactOut(
      marketId: BigNumberish,
      usdAmount: BigNumberish,
      maxSynthAmount: BigNumberish,
      referrer: string,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    cancelOrder(
      marketId: BigNumberish,
      asyncOrderId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    commitOrder(
      marketId: BigNumberish,
      orderType: BigNumberish,
      amountProvided: BigNumberish,
      settlementStrategyId: BigNumberish,
      minimumSettlementAmount: BigNumberish,
      referrer: string,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    getAsyncOrderClaim(
      marketId: BigNumberish,
      asyncOrderId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [
        [
          BigNumber,
          string,
          number,
          BigNumber,
          BigNumber,
          BigNumber,
          BigNumber,
          BigNumber,
          string
        ] & {
          id: BigNumber;
          owner: string;
          orderType: number;
          amountEscrowed: BigNumber;
          settlementStrategyId: BigNumber;
          settlementTime: BigNumber;
          minimumSettlementAmount: BigNumber;
          settledAt: BigNumber;
          referrer: string;
        }
      ] & {
        asyncOrderClaim: [
          BigNumber,
          string,
          number,
          BigNumber,
          BigNumber,
          BigNumber,
          BigNumber,
          BigNumber,
          string
        ] & {
          id: BigNumber;
          owner: string;
          orderType: number;
          amountEscrowed: BigNumber;
          settlementStrategyId: BigNumber;
          settlementTime: BigNumber;
          minimumSettlementAmount: BigNumber;
          settledAt: BigNumber;
          referrer: string;
        };
      }
    >;

    PRECISION(overrides?: CallOverrides): Promise<[BigNumber]>;

    settleOrder(
      marketId: BigNumberish,
      asyncOrderId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    settlePythOrder(
      result: BytesLike,
      extraData: BytesLike,
      overrides?: PayableOverrides & { from?: string }
    ): Promise<ContractTransaction>;

    addSettlementStrategy(
      marketId: BigNumberish,
      strategy: {
        strategyType: BigNumberish;
        settlementDelay: BigNumberish;
        settlementWindowDuration: BigNumberish;
        priceVerificationContract: string;
        feedId: BytesLike;
        url: string;
        settlementReward: BigNumberish;
        priceDeviationTolerance: BigNumberish;
        minimumUsdExchangeAmount: BigNumberish;
        maxRoundingLoss: BigNumberish;
        disabled: boolean;
      },
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    getSettlementStrategy(
      marketId: BigNumberish,
      strategyId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [
        [
          number,
          BigNumber,
          BigNumber,
          string,
          string,
          string,
          BigNumber,
          BigNumber,
          BigNumber,
          BigNumber,
          boolean
        ] & {
          strategyType: number;
          settlementDelay: BigNumber;
          settlementWindowDuration: BigNumber;
          priceVerificationContract: string;
          feedId: string;
          url: string;
          settlementReward: BigNumber;
          priceDeviationTolerance: BigNumber;
          minimumUsdExchangeAmount: BigNumber;
          maxRoundingLoss: BigNumber;
          disabled: boolean;
        }
      ] & {
        settlementStrategy: [
          number,
          BigNumber,
          BigNumber,
          string,
          string,
          string,
          BigNumber,
          BigNumber,
          BigNumber,
          BigNumber,
          boolean
        ] & {
          strategyType: number;
          settlementDelay: BigNumber;
          settlementWindowDuration: BigNumber;
          priceVerificationContract: string;
          feedId: string;
          url: string;
          settlementReward: BigNumber;
          priceDeviationTolerance: BigNumber;
          minimumUsdExchangeAmount: BigNumber;
          maxRoundingLoss: BigNumber;
          disabled: boolean;
        };
      }
    >;

    setSettlementStrategyEnabled(
      marketId: BigNumberish,
      strategyId: BigNumberish,
      enabled: boolean,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    setWrapper(
      marketId: BigNumberish,
      wrapCollateralType: string,
      maxWrappableAmount: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    unwrap(
      marketId: BigNumberish,
      unwrapAmount: BigNumberish,
      minAmountReceived: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    wrap(
      marketId: BigNumberish,
      wrapAmount: BigNumberish,
      minAmountReceived: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    getCollateralLeverage(
      synthMarketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { collateralLeverage: BigNumber }>;

    getCustomTransactorFees(
      synthMarketId: BigNumberish,
      transactor: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { fixedFeeAmount: BigNumber }>;

    getFeeCollector(
      synthMarketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string] & { feeCollector: string }>;

    getMarketFees(
      synthMarketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, BigNumber] & {
        atomicFixedFee: BigNumber;
        asyncFixedFee: BigNumber;
        wrapFee: BigNumber;
        unwrapFee: BigNumber;
      }
    >;

    getMarketSkewScale(
      synthMarketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { skewScale: BigNumber }>;

    getMarketUtilizationFees(
      synthMarketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { utilizationFeeRate: BigNumber }>;

    getReferrerShare(
      synthMarketId: BigNumberish,
      referrer: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { sharePercentage: BigNumber }>;

    setAsyncFixedFee(
      synthMarketId: BigNumberish,
      asyncFixedFee: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    setAtomicFixedFee(
      synthMarketId: BigNumberish,
      atomicFixedFee: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    setCollateralLeverage(
      synthMarketId: BigNumberish,
      collateralLeverage: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    setCustomTransactorFees(
      synthMarketId: BigNumberish,
      transactor: string,
      fixedFeeAmount: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    setFeeCollector(
      synthMarketId: BigNumberish,
      feeCollector: string,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    setMarketSkewScale(
      synthMarketId: BigNumberish,
      skewScale: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    setMarketUtilizationFees(
      synthMarketId: BigNumberish,
      utilizationFeeRate: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    setWrapperFees(
      synthMarketId: BigNumberish,
      wrapFee: BigNumberish,
      unwrapFee: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    updateReferrerShare(
      synthMarketId: BigNumberish,
      referrer: string,
      sharePercentage: BigNumberish,
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

  acceptMarketOwnership(
    synthMarketId: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  createSynth(
    tokenName: string,
    tokenSymbol: string,
    synthOwner: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  getAssociatedSystem(
    id: BytesLike,
    overrides?: CallOverrides
  ): Promise<[string, string] & { addr: string; kind: string }>;

  getMarketOwner(synthMarketId: BigNumberish, overrides?: CallOverrides): Promise<string>;

  getSynth(marketId: BigNumberish, overrides?: CallOverrides): Promise<string>;

  getSynthImpl(marketId: BigNumberish, overrides?: CallOverrides): Promise<string>;

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

  minimumCredit(marketId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

  name(marketId: BigNumberish, overrides?: CallOverrides): Promise<string>;

  nominateMarketOwner(
    synthMarketId: BigNumberish,
    newNominatedOwner: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  registerUnmanagedSystem(
    id: BytesLike,
    endpoint: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  renounceMarketNomination(
    synthMarketId: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  renounceMarketOwnership(
    synthMarketId: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  reportedDebt(marketId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

  setDecayRate(
    marketId: BigNumberish,
    rate: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  setSynthImplementation(
    synthImplementation: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  setSynthetix(
    synthetix: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  supportsInterface(interfaceId: BytesLike, overrides?: CallOverrides): Promise<boolean>;

  updatePriceData(
    synthMarketId: BigNumberish,
    buyFeedId: BytesLike,
    sellFeedId: BytesLike,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  upgradeSynthImpl(
    marketId: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  buy(
    marketId: BigNumberish,
    usdAmount: BigNumberish,
    minAmountReceived: BigNumberish,
    referrer: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  buyExactIn(
    marketId: BigNumberish,
    usdAmount: BigNumberish,
    minAmountReceived: BigNumberish,
    referrer: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  buyExactOut(
    marketId: BigNumberish,
    synthAmount: BigNumberish,
    maxUsdAmount: BigNumberish,
    referrer: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  quoteBuyExactIn(
    marketId: BigNumberish,
    usdAmount: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [
      BigNumber,
      [BigNumber, BigNumber, BigNumber, BigNumber] & {
        fixedFees: BigNumber;
        utilizationFees: BigNumber;
        skewFees: BigNumber;
        wrapperFees: BigNumber;
      }
    ] & {
      synthAmount: BigNumber;
      fees: [BigNumber, BigNumber, BigNumber, BigNumber] & {
        fixedFees: BigNumber;
        utilizationFees: BigNumber;
        skewFees: BigNumber;
        wrapperFees: BigNumber;
      };
    }
  >;

  quoteBuyExactOut(
    marketId: BigNumberish,
    synthAmount: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [
      BigNumber,
      [BigNumber, BigNumber, BigNumber, BigNumber] & {
        fixedFees: BigNumber;
        utilizationFees: BigNumber;
        skewFees: BigNumber;
        wrapperFees: BigNumber;
      }
    ] & {
      usdAmountCharged: BigNumber;
      fees: [BigNumber, BigNumber, BigNumber, BigNumber] & {
        fixedFees: BigNumber;
        utilizationFees: BigNumber;
        skewFees: BigNumber;
        wrapperFees: BigNumber;
      };
    }
  >;

  quoteSellExactIn(
    marketId: BigNumberish,
    synthAmount: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [
      BigNumber,
      [BigNumber, BigNumber, BigNumber, BigNumber] & {
        fixedFees: BigNumber;
        utilizationFees: BigNumber;
        skewFees: BigNumber;
        wrapperFees: BigNumber;
      }
    ] & {
      returnAmount: BigNumber;
      fees: [BigNumber, BigNumber, BigNumber, BigNumber] & {
        fixedFees: BigNumber;
        utilizationFees: BigNumber;
        skewFees: BigNumber;
        wrapperFees: BigNumber;
      };
    }
  >;

  quoteSellExactOut(
    marketId: BigNumberish,
    usdAmount: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [
      BigNumber,
      [BigNumber, BigNumber, BigNumber, BigNumber] & {
        fixedFees: BigNumber;
        utilizationFees: BigNumber;
        skewFees: BigNumber;
        wrapperFees: BigNumber;
      }
    ] & {
      synthToBurn: BigNumber;
      fees: [BigNumber, BigNumber, BigNumber, BigNumber] & {
        fixedFees: BigNumber;
        utilizationFees: BigNumber;
        skewFees: BigNumber;
        wrapperFees: BigNumber;
      };
    }
  >;

  sell(
    marketId: BigNumberish,
    synthAmount: BigNumberish,
    minUsdAmount: BigNumberish,
    referrer: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  sellExactIn(
    marketId: BigNumberish,
    synthAmount: BigNumberish,
    minAmountReceived: BigNumberish,
    referrer: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  sellExactOut(
    marketId: BigNumberish,
    usdAmount: BigNumberish,
    maxSynthAmount: BigNumberish,
    referrer: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  cancelOrder(
    marketId: BigNumberish,
    asyncOrderId: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  commitOrder(
    marketId: BigNumberish,
    orderType: BigNumberish,
    amountProvided: BigNumberish,
    settlementStrategyId: BigNumberish,
    minimumSettlementAmount: BigNumberish,
    referrer: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  getAsyncOrderClaim(
    marketId: BigNumberish,
    asyncOrderId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, string, number, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, string] & {
      id: BigNumber;
      owner: string;
      orderType: number;
      amountEscrowed: BigNumber;
      settlementStrategyId: BigNumber;
      settlementTime: BigNumber;
      minimumSettlementAmount: BigNumber;
      settledAt: BigNumber;
      referrer: string;
    }
  >;

  PRECISION(overrides?: CallOverrides): Promise<BigNumber>;

  settleOrder(
    marketId: BigNumberish,
    asyncOrderId: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  settlePythOrder(
    result: BytesLike,
    extraData: BytesLike,
    overrides?: PayableOverrides & { from?: string }
  ): Promise<ContractTransaction>;

  addSettlementStrategy(
    marketId: BigNumberish,
    strategy: {
      strategyType: BigNumberish;
      settlementDelay: BigNumberish;
      settlementWindowDuration: BigNumberish;
      priceVerificationContract: string;
      feedId: BytesLike;
      url: string;
      settlementReward: BigNumberish;
      priceDeviationTolerance: BigNumberish;
      minimumUsdExchangeAmount: BigNumberish;
      maxRoundingLoss: BigNumberish;
      disabled: boolean;
    },
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  getSettlementStrategy(
    marketId: BigNumberish,
    strategyId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [
      number,
      BigNumber,
      BigNumber,
      string,
      string,
      string,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      boolean
    ] & {
      strategyType: number;
      settlementDelay: BigNumber;
      settlementWindowDuration: BigNumber;
      priceVerificationContract: string;
      feedId: string;
      url: string;
      settlementReward: BigNumber;
      priceDeviationTolerance: BigNumber;
      minimumUsdExchangeAmount: BigNumber;
      maxRoundingLoss: BigNumber;
      disabled: boolean;
    }
  >;

  setSettlementStrategyEnabled(
    marketId: BigNumberish,
    strategyId: BigNumberish,
    enabled: boolean,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  setWrapper(
    marketId: BigNumberish,
    wrapCollateralType: string,
    maxWrappableAmount: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  unwrap(
    marketId: BigNumberish,
    unwrapAmount: BigNumberish,
    minAmountReceived: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  wrap(
    marketId: BigNumberish,
    wrapAmount: BigNumberish,
    minAmountReceived: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  getCollateralLeverage(synthMarketId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

  getCustomTransactorFees(
    synthMarketId: BigNumberish,
    transactor: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getFeeCollector(synthMarketId: BigNumberish, overrides?: CallOverrides): Promise<string>;

  getMarketFees(
    synthMarketId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber, BigNumber, BigNumber] & {
      atomicFixedFee: BigNumber;
      asyncFixedFee: BigNumber;
      wrapFee: BigNumber;
      unwrapFee: BigNumber;
    }
  >;

  getMarketSkewScale(synthMarketId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

  getMarketUtilizationFees(
    synthMarketId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getReferrerShare(
    synthMarketId: BigNumberish,
    referrer: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  setAsyncFixedFee(
    synthMarketId: BigNumberish,
    asyncFixedFee: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  setAtomicFixedFee(
    synthMarketId: BigNumberish,
    atomicFixedFee: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  setCollateralLeverage(
    synthMarketId: BigNumberish,
    collateralLeverage: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  setCustomTransactorFees(
    synthMarketId: BigNumberish,
    transactor: string,
    fixedFeeAmount: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  setFeeCollector(
    synthMarketId: BigNumberish,
    feeCollector: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  setMarketSkewScale(
    synthMarketId: BigNumberish,
    skewScale: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  setMarketUtilizationFees(
    synthMarketId: BigNumberish,
    utilizationFeeRate: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  setWrapperFees(
    synthMarketId: BigNumberish,
    wrapFee: BigNumberish,
    unwrapFee: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  updateReferrerShare(
    synthMarketId: BigNumberish,
    referrer: string,
    sharePercentage: BigNumberish,
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

  callStatic: {
    acceptOwnership(overrides?: CallOverrides): Promise<void>;

    getImplementation(overrides?: CallOverrides): Promise<string>;

    nominateNewOwner(newNominatedOwner: string, overrides?: CallOverrides): Promise<void>;

    nominatedOwner(overrides?: CallOverrides): Promise<string>;

    owner(overrides?: CallOverrides): Promise<string>;

    renounceNomination(overrides?: CallOverrides): Promise<void>;

    simulateUpgradeTo(newImplementation: string, overrides?: CallOverrides): Promise<void>;

    upgradeTo(newImplementation: string, overrides?: CallOverrides): Promise<void>;

    acceptMarketOwnership(synthMarketId: BigNumberish, overrides?: CallOverrides): Promise<void>;

    createSynth(
      tokenName: string,
      tokenSymbol: string,
      synthOwner: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getAssociatedSystem(
      id: BytesLike,
      overrides?: CallOverrides
    ): Promise<[string, string] & { addr: string; kind: string }>;

    getMarketOwner(synthMarketId: BigNumberish, overrides?: CallOverrides): Promise<string>;

    getSynth(marketId: BigNumberish, overrides?: CallOverrides): Promise<string>;

    getSynthImpl(marketId: BigNumberish, overrides?: CallOverrides): Promise<string>;

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

    minimumCredit(marketId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    name(marketId: BigNumberish, overrides?: CallOverrides): Promise<string>;

    nominateMarketOwner(
      synthMarketId: BigNumberish,
      newNominatedOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    registerUnmanagedSystem(
      id: BytesLike,
      endpoint: string,
      overrides?: CallOverrides
    ): Promise<void>;

    renounceMarketNomination(synthMarketId: BigNumberish, overrides?: CallOverrides): Promise<void>;

    renounceMarketOwnership(synthMarketId: BigNumberish, overrides?: CallOverrides): Promise<void>;

    reportedDebt(marketId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    setDecayRate(
      marketId: BigNumberish,
      rate: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setSynthImplementation(synthImplementation: string, overrides?: CallOverrides): Promise<void>;

    setSynthetix(synthetix: string, overrides?: CallOverrides): Promise<void>;

    supportsInterface(interfaceId: BytesLike, overrides?: CallOverrides): Promise<boolean>;

    updatePriceData(
      synthMarketId: BigNumberish,
      buyFeedId: BytesLike,
      sellFeedId: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    upgradeSynthImpl(marketId: BigNumberish, overrides?: CallOverrides): Promise<void>;

    buy(
      marketId: BigNumberish,
      usdAmount: BigNumberish,
      minAmountReceived: BigNumberish,
      referrer: string,
      overrides?: CallOverrides
    ): Promise<
      [
        BigNumber,
        [BigNumber, BigNumber, BigNumber, BigNumber] & {
          fixedFees: BigNumber;
          utilizationFees: BigNumber;
          skewFees: BigNumber;
          wrapperFees: BigNumber;
        }
      ] & {
        synthAmount: BigNumber;
        fees: [BigNumber, BigNumber, BigNumber, BigNumber] & {
          fixedFees: BigNumber;
          utilizationFees: BigNumber;
          skewFees: BigNumber;
          wrapperFees: BigNumber;
        };
      }
    >;

    buyExactIn(
      marketId: BigNumberish,
      usdAmount: BigNumberish,
      minAmountReceived: BigNumberish,
      referrer: string,
      overrides?: CallOverrides
    ): Promise<
      [
        BigNumber,
        [BigNumber, BigNumber, BigNumber, BigNumber] & {
          fixedFees: BigNumber;
          utilizationFees: BigNumber;
          skewFees: BigNumber;
          wrapperFees: BigNumber;
        }
      ] & {
        synthAmount: BigNumber;
        fees: [BigNumber, BigNumber, BigNumber, BigNumber] & {
          fixedFees: BigNumber;
          utilizationFees: BigNumber;
          skewFees: BigNumber;
          wrapperFees: BigNumber;
        };
      }
    >;

    buyExactOut(
      marketId: BigNumberish,
      synthAmount: BigNumberish,
      maxUsdAmount: BigNumberish,
      referrer: string,
      overrides?: CallOverrides
    ): Promise<
      [
        BigNumber,
        [BigNumber, BigNumber, BigNumber, BigNumber] & {
          fixedFees: BigNumber;
          utilizationFees: BigNumber;
          skewFees: BigNumber;
          wrapperFees: BigNumber;
        }
      ] & {
        usdAmountCharged: BigNumber;
        fees: [BigNumber, BigNumber, BigNumber, BigNumber] & {
          fixedFees: BigNumber;
          utilizationFees: BigNumber;
          skewFees: BigNumber;
          wrapperFees: BigNumber;
        };
      }
    >;

    quoteBuyExactIn(
      marketId: BigNumberish,
      usdAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [
        BigNumber,
        [BigNumber, BigNumber, BigNumber, BigNumber] & {
          fixedFees: BigNumber;
          utilizationFees: BigNumber;
          skewFees: BigNumber;
          wrapperFees: BigNumber;
        }
      ] & {
        synthAmount: BigNumber;
        fees: [BigNumber, BigNumber, BigNumber, BigNumber] & {
          fixedFees: BigNumber;
          utilizationFees: BigNumber;
          skewFees: BigNumber;
          wrapperFees: BigNumber;
        };
      }
    >;

    quoteBuyExactOut(
      marketId: BigNumberish,
      synthAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [
        BigNumber,
        [BigNumber, BigNumber, BigNumber, BigNumber] & {
          fixedFees: BigNumber;
          utilizationFees: BigNumber;
          skewFees: BigNumber;
          wrapperFees: BigNumber;
        }
      ] & {
        usdAmountCharged: BigNumber;
        fees: [BigNumber, BigNumber, BigNumber, BigNumber] & {
          fixedFees: BigNumber;
          utilizationFees: BigNumber;
          skewFees: BigNumber;
          wrapperFees: BigNumber;
        };
      }
    >;

    quoteSellExactIn(
      marketId: BigNumberish,
      synthAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [
        BigNumber,
        [BigNumber, BigNumber, BigNumber, BigNumber] & {
          fixedFees: BigNumber;
          utilizationFees: BigNumber;
          skewFees: BigNumber;
          wrapperFees: BigNumber;
        }
      ] & {
        returnAmount: BigNumber;
        fees: [BigNumber, BigNumber, BigNumber, BigNumber] & {
          fixedFees: BigNumber;
          utilizationFees: BigNumber;
          skewFees: BigNumber;
          wrapperFees: BigNumber;
        };
      }
    >;

    quoteSellExactOut(
      marketId: BigNumberish,
      usdAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [
        BigNumber,
        [BigNumber, BigNumber, BigNumber, BigNumber] & {
          fixedFees: BigNumber;
          utilizationFees: BigNumber;
          skewFees: BigNumber;
          wrapperFees: BigNumber;
        }
      ] & {
        synthToBurn: BigNumber;
        fees: [BigNumber, BigNumber, BigNumber, BigNumber] & {
          fixedFees: BigNumber;
          utilizationFees: BigNumber;
          skewFees: BigNumber;
          wrapperFees: BigNumber;
        };
      }
    >;

    sell(
      marketId: BigNumberish,
      synthAmount: BigNumberish,
      minUsdAmount: BigNumberish,
      referrer: string,
      overrides?: CallOverrides
    ): Promise<
      [
        BigNumber,
        [BigNumber, BigNumber, BigNumber, BigNumber] & {
          fixedFees: BigNumber;
          utilizationFees: BigNumber;
          skewFees: BigNumber;
          wrapperFees: BigNumber;
        }
      ] & {
        usdAmountReceived: BigNumber;
        fees: [BigNumber, BigNumber, BigNumber, BigNumber] & {
          fixedFees: BigNumber;
          utilizationFees: BigNumber;
          skewFees: BigNumber;
          wrapperFees: BigNumber;
        };
      }
    >;

    sellExactIn(
      marketId: BigNumberish,
      synthAmount: BigNumberish,
      minAmountReceived: BigNumberish,
      referrer: string,
      overrides?: CallOverrides
    ): Promise<
      [
        BigNumber,
        [BigNumber, BigNumber, BigNumber, BigNumber] & {
          fixedFees: BigNumber;
          utilizationFees: BigNumber;
          skewFees: BigNumber;
          wrapperFees: BigNumber;
        }
      ] & {
        returnAmount: BigNumber;
        fees: [BigNumber, BigNumber, BigNumber, BigNumber] & {
          fixedFees: BigNumber;
          utilizationFees: BigNumber;
          skewFees: BigNumber;
          wrapperFees: BigNumber;
        };
      }
    >;

    sellExactOut(
      marketId: BigNumberish,
      usdAmount: BigNumberish,
      maxSynthAmount: BigNumberish,
      referrer: string,
      overrides?: CallOverrides
    ): Promise<
      [
        BigNumber,
        [BigNumber, BigNumber, BigNumber, BigNumber] & {
          fixedFees: BigNumber;
          utilizationFees: BigNumber;
          skewFees: BigNumber;
          wrapperFees: BigNumber;
        }
      ] & {
        synthToBurn: BigNumber;
        fees: [BigNumber, BigNumber, BigNumber, BigNumber] & {
          fixedFees: BigNumber;
          utilizationFees: BigNumber;
          skewFees: BigNumber;
          wrapperFees: BigNumber;
        };
      }
    >;

    cancelOrder(
      marketId: BigNumberish,
      asyncOrderId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    commitOrder(
      marketId: BigNumberish,
      orderType: BigNumberish,
      amountProvided: BigNumberish,
      settlementStrategyId: BigNumberish,
      minimumSettlementAmount: BigNumberish,
      referrer: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, string, number, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, string] & {
        id: BigNumber;
        owner: string;
        orderType: number;
        amountEscrowed: BigNumber;
        settlementStrategyId: BigNumber;
        settlementTime: BigNumber;
        minimumSettlementAmount: BigNumber;
        settledAt: BigNumber;
        referrer: string;
      }
    >;

    getAsyncOrderClaim(
      marketId: BigNumberish,
      asyncOrderId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, string, number, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, string] & {
        id: BigNumber;
        owner: string;
        orderType: number;
        amountEscrowed: BigNumber;
        settlementStrategyId: BigNumber;
        settlementTime: BigNumber;
        minimumSettlementAmount: BigNumber;
        settledAt: BigNumber;
        referrer: string;
      }
    >;

    PRECISION(overrides?: CallOverrides): Promise<BigNumber>;

    settleOrder(
      marketId: BigNumberish,
      asyncOrderId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [
        BigNumber,
        [BigNumber, BigNumber, BigNumber, BigNumber] & {
          fixedFees: BigNumber;
          utilizationFees: BigNumber;
          skewFees: BigNumber;
          wrapperFees: BigNumber;
        }
      ] & {
        finalOrderAmount: BigNumber;
        fees: [BigNumber, BigNumber, BigNumber, BigNumber] & {
          fixedFees: BigNumber;
          utilizationFees: BigNumber;
          skewFees: BigNumber;
          wrapperFees: BigNumber;
        };
      }
    >;

    settlePythOrder(
      result: BytesLike,
      extraData: BytesLike,
      overrides?: CallOverrides
    ): Promise<
      [
        BigNumber,
        [BigNumber, BigNumber, BigNumber, BigNumber] & {
          fixedFees: BigNumber;
          utilizationFees: BigNumber;
          skewFees: BigNumber;
          wrapperFees: BigNumber;
        }
      ] & {
        finalOrderAmount: BigNumber;
        fees: [BigNumber, BigNumber, BigNumber, BigNumber] & {
          fixedFees: BigNumber;
          utilizationFees: BigNumber;
          skewFees: BigNumber;
          wrapperFees: BigNumber;
        };
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
        url: string;
        settlementReward: BigNumberish;
        priceDeviationTolerance: BigNumberish;
        minimumUsdExchangeAmount: BigNumberish;
        maxRoundingLoss: BigNumberish;
        disabled: boolean;
      },
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getSettlementStrategy(
      marketId: BigNumberish,
      strategyId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [
        number,
        BigNumber,
        BigNumber,
        string,
        string,
        string,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        boolean
      ] & {
        strategyType: number;
        settlementDelay: BigNumber;
        settlementWindowDuration: BigNumber;
        priceVerificationContract: string;
        feedId: string;
        url: string;
        settlementReward: BigNumber;
        priceDeviationTolerance: BigNumber;
        minimumUsdExchangeAmount: BigNumber;
        maxRoundingLoss: BigNumber;
        disabled: boolean;
      }
    >;

    setSettlementStrategyEnabled(
      marketId: BigNumberish,
      strategyId: BigNumberish,
      enabled: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    setWrapper(
      marketId: BigNumberish,
      wrapCollateralType: string,
      maxWrappableAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    unwrap(
      marketId: BigNumberish,
      unwrapAmount: BigNumberish,
      minAmountReceived: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [
        BigNumber,
        [BigNumber, BigNumber, BigNumber, BigNumber] & {
          fixedFees: BigNumber;
          utilizationFees: BigNumber;
          skewFees: BigNumber;
          wrapperFees: BigNumber;
        }
      ] & {
        returnCollateralAmount: BigNumber;
        fees: [BigNumber, BigNumber, BigNumber, BigNumber] & {
          fixedFees: BigNumber;
          utilizationFees: BigNumber;
          skewFees: BigNumber;
          wrapperFees: BigNumber;
        };
      }
    >;

    wrap(
      marketId: BigNumberish,
      wrapAmount: BigNumberish,
      minAmountReceived: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [
        BigNumber,
        [BigNumber, BigNumber, BigNumber, BigNumber] & {
          fixedFees: BigNumber;
          utilizationFees: BigNumber;
          skewFees: BigNumber;
          wrapperFees: BigNumber;
        }
      ] & {
        amountToMint: BigNumber;
        fees: [BigNumber, BigNumber, BigNumber, BigNumber] & {
          fixedFees: BigNumber;
          utilizationFees: BigNumber;
          skewFees: BigNumber;
          wrapperFees: BigNumber;
        };
      }
    >;

    getCollateralLeverage(
      synthMarketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getCustomTransactorFees(
      synthMarketId: BigNumberish,
      transactor: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getFeeCollector(synthMarketId: BigNumberish, overrides?: CallOverrides): Promise<string>;

    getMarketFees(
      synthMarketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, BigNumber] & {
        atomicFixedFee: BigNumber;
        asyncFixedFee: BigNumber;
        wrapFee: BigNumber;
        unwrapFee: BigNumber;
      }
    >;

    getMarketSkewScale(synthMarketId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    getMarketUtilizationFees(
      synthMarketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getReferrerShare(
      synthMarketId: BigNumberish,
      referrer: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    setAsyncFixedFee(
      synthMarketId: BigNumberish,
      asyncFixedFee: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setAtomicFixedFee(
      synthMarketId: BigNumberish,
      atomicFixedFee: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setCollateralLeverage(
      synthMarketId: BigNumberish,
      collateralLeverage: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setCustomTransactorFees(
      synthMarketId: BigNumberish,
      transactor: string,
      fixedFeeAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setFeeCollector(
      synthMarketId: BigNumberish,
      feeCollector: string,
      overrides?: CallOverrides
    ): Promise<void>;

    setMarketSkewScale(
      synthMarketId: BigNumberish,
      skewScale: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setMarketUtilizationFees(
      synthMarketId: BigNumberish,
      utilizationFeeRate: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setWrapperFees(
      synthMarketId: BigNumberish,
      wrapFee: BigNumberish,
      unwrapFee: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    updateReferrerShare(
      synthMarketId: BigNumberish,
      referrer: string,
      sharePercentage: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

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
  };

  filters: {
    'OwnerChanged(address,address)'(oldOwner?: null, newOwner?: null): OwnerChangedEventFilter;
    OwnerChanged(oldOwner?: null, newOwner?: null): OwnerChangedEventFilter;

    'OwnerNominated(address)'(newOwner?: null): OwnerNominatedEventFilter;
    OwnerNominated(newOwner?: null): OwnerNominatedEventFilter;

    'Upgraded(address,address)'(self?: string | null, implementation?: null): UpgradedEventFilter;
    Upgraded(self?: string | null, implementation?: null): UpgradedEventFilter;

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

    'DecayRateUpdated(uint128,uint256)'(
      marketId?: BigNumberish | null,
      rate?: null
    ): DecayRateUpdatedEventFilter;
    DecayRateUpdated(marketId?: BigNumberish | null, rate?: null): DecayRateUpdatedEventFilter;

    'MarketNominationRenounced(uint128,address)'(
      marketId?: BigNumberish | null,
      nominee?: null
    ): MarketNominationRenouncedEventFilter;
    MarketNominationRenounced(
      marketId?: BigNumberish | null,
      nominee?: null
    ): MarketNominationRenouncedEventFilter;

    'MarketOwnerChanged(uint128,address,address)'(
      marketId?: BigNumberish | null,
      oldOwner?: null,
      newOwner?: null
    ): MarketOwnerChangedEventFilter;
    MarketOwnerChanged(
      marketId?: BigNumberish | null,
      oldOwner?: null,
      newOwner?: null
    ): MarketOwnerChangedEventFilter;

    'MarketOwnerNominated(uint128,address)'(
      marketId?: BigNumberish | null,
      newOwner?: null
    ): MarketOwnerNominatedEventFilter;
    MarketOwnerNominated(
      marketId?: BigNumberish | null,
      newOwner?: null
    ): MarketOwnerNominatedEventFilter;

    'SynthImplementationSet(address)'(
      synthImplementation?: null
    ): SynthImplementationSetEventFilter;
    SynthImplementationSet(synthImplementation?: null): SynthImplementationSetEventFilter;

    'SynthImplementationUpgraded(uint256,address,address)'(
      synthMarketId?: BigNumberish | null,
      proxy?: string | null,
      implementation?: null
    ): SynthImplementationUpgradedEventFilter;
    SynthImplementationUpgraded(
      synthMarketId?: BigNumberish | null,
      proxy?: string | null,
      implementation?: null
    ): SynthImplementationUpgradedEventFilter;

    'SynthPriceDataUpdated(uint256,bytes32,bytes32)'(
      synthMarketId?: BigNumberish | null,
      buyFeedId?: BytesLike | null,
      sellFeedId?: BytesLike | null
    ): SynthPriceDataUpdatedEventFilter;
    SynthPriceDataUpdated(
      synthMarketId?: BigNumberish | null,
      buyFeedId?: BytesLike | null,
      sellFeedId?: BytesLike | null
    ): SynthPriceDataUpdatedEventFilter;

    'SynthRegistered(uint256,address)'(
      synthMarketId?: BigNumberish | null,
      synthTokenAddress?: null
    ): SynthRegisteredEventFilter;
    SynthRegistered(
      synthMarketId?: BigNumberish | null,
      synthTokenAddress?: null
    ): SynthRegisteredEventFilter;

    'SynthetixSystemSet(address,address,address)'(
      synthetix?: null,
      usdTokenAddress?: null,
      oracleManager?: null
    ): SynthetixSystemSetEventFilter;
    SynthetixSystemSet(
      synthetix?: null,
      usdTokenAddress?: null,
      oracleManager?: null
    ): SynthetixSystemSetEventFilter;

    'SynthBought(uint256,uint256,(uint256,uint256,int256,int256),uint256,address,uint256)'(
      synthMarketId?: BigNumberish | null,
      synthReturned?: null,
      fees?: null,
      collectedFees?: null,
      referrer?: null,
      price?: null
    ): SynthBoughtEventFilter;
    SynthBought(
      synthMarketId?: BigNumberish | null,
      synthReturned?: null,
      fees?: null,
      collectedFees?: null,
      referrer?: null,
      price?: null
    ): SynthBoughtEventFilter;

    'SynthSold(uint256,uint256,(uint256,uint256,int256,int256),uint256,address,uint256)'(
      synthMarketId?: BigNumberish | null,
      amountReturned?: null,
      fees?: null,
      collectedFees?: null,
      referrer?: null,
      price?: null
    ): SynthSoldEventFilter;
    SynthSold(
      synthMarketId?: BigNumberish | null,
      amountReturned?: null,
      fees?: null,
      collectedFees?: null,
      referrer?: null,
      price?: null
    ): SynthSoldEventFilter;

    'OrderCancelled(uint128,uint128,(uint128,address,uint8,uint256,uint256,uint256,uint256,uint256,address),address)'(
      marketId?: BigNumberish | null,
      asyncOrderId?: BigNumberish | null,
      asyncOrderClaim?: null,
      sender?: string | null
    ): OrderCancelledEventFilter;
    OrderCancelled(
      marketId?: BigNumberish | null,
      asyncOrderId?: BigNumberish | null,
      asyncOrderClaim?: null,
      sender?: string | null
    ): OrderCancelledEventFilter;

    'OrderCommitted(uint128,uint8,uint256,uint128,address,address)'(
      marketId?: BigNumberish | null,
      orderType?: BigNumberish | null,
      amountProvided?: null,
      asyncOrderId?: null,
      sender?: string | null,
      referrer?: null
    ): OrderCommittedEventFilter;
    OrderCommitted(
      marketId?: BigNumberish | null,
      orderType?: BigNumberish | null,
      amountProvided?: null,
      asyncOrderId?: null,
      sender?: string | null,
      referrer?: null
    ): OrderCommittedEventFilter;

    'OrderSettled(uint128,uint128,uint256,(uint256,uint256,int256,int256),uint256,address,uint256,uint8)'(
      marketId?: BigNumberish | null,
      asyncOrderId?: BigNumberish | null,
      finalOrderAmount?: null,
      fees?: null,
      collectedFees?: null,
      settler?: string | null,
      price?: null,
      orderType?: null
    ): OrderSettledEventFilter;
    OrderSettled(
      marketId?: BigNumberish | null,
      asyncOrderId?: BigNumberish | null,
      finalOrderAmount?: null,
      fees?: null,
      collectedFees?: null,
      settler?: string | null,
      price?: null,
      orderType?: null
    ): OrderSettledEventFilter;

    'SettlementStrategyAdded(uint128,uint256)'(
      synthMarketId?: BigNumberish | null,
      strategyId?: BigNumberish | null
    ): SettlementStrategyAddedEventFilter;
    SettlementStrategyAdded(
      synthMarketId?: BigNumberish | null,
      strategyId?: BigNumberish | null
    ): SettlementStrategyAddedEventFilter;

    'SettlementStrategyUpdated(uint128,uint256,bool)'(
      synthMarketId?: BigNumberish | null,
      strategyId?: BigNumberish | null,
      enabled?: null
    ): SettlementStrategyUpdatedEventFilter;
    SettlementStrategyUpdated(
      synthMarketId?: BigNumberish | null,
      strategyId?: BigNumberish | null,
      enabled?: null
    ): SettlementStrategyUpdatedEventFilter;

    'SynthUnwrapped(uint256,uint256,(uint256,uint256,int256,int256),uint256)'(
      synthMarketId?: BigNumberish | null,
      amountUnwrapped?: null,
      fees?: null,
      feesCollected?: null
    ): SynthUnwrappedEventFilter;
    SynthUnwrapped(
      synthMarketId?: BigNumberish | null,
      amountUnwrapped?: null,
      fees?: null,
      feesCollected?: null
    ): SynthUnwrappedEventFilter;

    'SynthWrapped(uint256,uint256,(uint256,uint256,int256,int256),uint256)'(
      synthMarketId?: BigNumberish | null,
      amountWrapped?: null,
      fees?: null,
      feesCollected?: null
    ): SynthWrappedEventFilter;
    SynthWrapped(
      synthMarketId?: BigNumberish | null,
      amountWrapped?: null,
      fees?: null,
      feesCollected?: null
    ): SynthWrappedEventFilter;

    'WrapperSet(uint256,address,uint256)'(
      synthMarketId?: BigNumberish | null,
      wrapCollateralType?: string | null,
      maxWrappableAmount?: null
    ): WrapperSetEventFilter;
    WrapperSet(
      synthMarketId?: BigNumberish | null,
      wrapCollateralType?: string | null,
      maxWrappableAmount?: null
    ): WrapperSetEventFilter;

    'AsyncFixedFeeSet(uint256,uint256)'(
      synthMarketId?: BigNumberish | null,
      asyncFixedFee?: null
    ): AsyncFixedFeeSetEventFilter;
    AsyncFixedFeeSet(
      synthMarketId?: BigNumberish | null,
      asyncFixedFee?: null
    ): AsyncFixedFeeSetEventFilter;

    'AtomicFixedFeeSet(uint256,uint256)'(
      synthMarketId?: BigNumberish | null,
      atomicFixedFee?: null
    ): AtomicFixedFeeSetEventFilter;
    AtomicFixedFeeSet(
      synthMarketId?: BigNumberish | null,
      atomicFixedFee?: null
    ): AtomicFixedFeeSetEventFilter;

    'CollateralLeverageSet(uint256,uint256)'(
      synthMarketId?: BigNumberish | null,
      collateralLeverage?: null
    ): CollateralLeverageSetEventFilter;
    CollateralLeverageSet(
      synthMarketId?: BigNumberish | null,
      collateralLeverage?: null
    ): CollateralLeverageSetEventFilter;

    'FeeCollectorSet(uint256,address)'(
      synthMarketId?: BigNumberish | null,
      feeCollector?: null
    ): FeeCollectorSetEventFilter;
    FeeCollectorSet(
      synthMarketId?: BigNumberish | null,
      feeCollector?: null
    ): FeeCollectorSetEventFilter;

    'MarketSkewScaleSet(uint256,uint256)'(
      synthMarketId?: BigNumberish | null,
      skewScale?: null
    ): MarketSkewScaleSetEventFilter;
    MarketSkewScaleSet(
      synthMarketId?: BigNumberish | null,
      skewScale?: null
    ): MarketSkewScaleSetEventFilter;

    'MarketUtilizationFeesSet(uint256,uint256)'(
      synthMarketId?: BigNumberish | null,
      utilizationFeeRate?: null
    ): MarketUtilizationFeesSetEventFilter;
    MarketUtilizationFeesSet(
      synthMarketId?: BigNumberish | null,
      utilizationFeeRate?: null
    ): MarketUtilizationFeesSetEventFilter;

    'ReferrerShareUpdated(uint128,address,uint256)'(
      marketId?: BigNumberish | null,
      referrer?: null,
      sharePercentage?: null
    ): ReferrerShareUpdatedEventFilter;
    ReferrerShareUpdated(
      marketId?: BigNumberish | null,
      referrer?: null,
      sharePercentage?: null
    ): ReferrerShareUpdatedEventFilter;

    'TransactorFixedFeeSet(uint256,address,uint256)'(
      synthMarketId?: BigNumberish | null,
      transactor?: null,
      fixedFeeAmount?: null
    ): TransactorFixedFeeSetEventFilter;
    TransactorFixedFeeSet(
      synthMarketId?: BigNumberish | null,
      transactor?: null,
      fixedFeeAmount?: null
    ): TransactorFixedFeeSetEventFilter;

    'WrapperFeesSet(uint256,int256,int256)'(
      synthMarketId?: BigNumberish | null,
      wrapFee?: null,
      unwrapFee?: null
    ): WrapperFeesSetEventFilter;
    WrapperFeesSet(
      synthMarketId?: BigNumberish | null,
      wrapFee?: null,
      unwrapFee?: null
    ): WrapperFeesSetEventFilter;

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

    acceptMarketOwnership(
      synthMarketId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    createSynth(
      tokenName: string,
      tokenSymbol: string,
      synthOwner: string,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    getAssociatedSystem(id: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;

    getMarketOwner(synthMarketId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    getSynth(marketId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    getSynthImpl(marketId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

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

    minimumCredit(marketId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    name(marketId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    nominateMarketOwner(
      synthMarketId: BigNumberish,
      newNominatedOwner: string,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    registerUnmanagedSystem(
      id: BytesLike,
      endpoint: string,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    renounceMarketNomination(
      synthMarketId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    renounceMarketOwnership(
      synthMarketId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    reportedDebt(marketId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    setDecayRate(
      marketId: BigNumberish,
      rate: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    setSynthImplementation(
      synthImplementation: string,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    setSynthetix(synthetix: string, overrides?: Overrides & { from?: string }): Promise<BigNumber>;

    supportsInterface(interfaceId: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;

    updatePriceData(
      synthMarketId: BigNumberish,
      buyFeedId: BytesLike,
      sellFeedId: BytesLike,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    upgradeSynthImpl(
      marketId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    buy(
      marketId: BigNumberish,
      usdAmount: BigNumberish,
      minAmountReceived: BigNumberish,
      referrer: string,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    buyExactIn(
      marketId: BigNumberish,
      usdAmount: BigNumberish,
      minAmountReceived: BigNumberish,
      referrer: string,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    buyExactOut(
      marketId: BigNumberish,
      synthAmount: BigNumberish,
      maxUsdAmount: BigNumberish,
      referrer: string,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    quoteBuyExactIn(
      marketId: BigNumberish,
      usdAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    quoteBuyExactOut(
      marketId: BigNumberish,
      synthAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    quoteSellExactIn(
      marketId: BigNumberish,
      synthAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    quoteSellExactOut(
      marketId: BigNumberish,
      usdAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    sell(
      marketId: BigNumberish,
      synthAmount: BigNumberish,
      minUsdAmount: BigNumberish,
      referrer: string,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    sellExactIn(
      marketId: BigNumberish,
      synthAmount: BigNumberish,
      minAmountReceived: BigNumberish,
      referrer: string,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    sellExactOut(
      marketId: BigNumberish,
      usdAmount: BigNumberish,
      maxSynthAmount: BigNumberish,
      referrer: string,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    cancelOrder(
      marketId: BigNumberish,
      asyncOrderId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    commitOrder(
      marketId: BigNumberish,
      orderType: BigNumberish,
      amountProvided: BigNumberish,
      settlementStrategyId: BigNumberish,
      minimumSettlementAmount: BigNumberish,
      referrer: string,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    getAsyncOrderClaim(
      marketId: BigNumberish,
      asyncOrderId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    PRECISION(overrides?: CallOverrides): Promise<BigNumber>;

    settleOrder(
      marketId: BigNumberish,
      asyncOrderId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    settlePythOrder(
      result: BytesLike,
      extraData: BytesLike,
      overrides?: PayableOverrides & { from?: string }
    ): Promise<BigNumber>;

    addSettlementStrategy(
      marketId: BigNumberish,
      strategy: {
        strategyType: BigNumberish;
        settlementDelay: BigNumberish;
        settlementWindowDuration: BigNumberish;
        priceVerificationContract: string;
        feedId: BytesLike;
        url: string;
        settlementReward: BigNumberish;
        priceDeviationTolerance: BigNumberish;
        minimumUsdExchangeAmount: BigNumberish;
        maxRoundingLoss: BigNumberish;
        disabled: boolean;
      },
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    getSettlementStrategy(
      marketId: BigNumberish,
      strategyId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    setSettlementStrategyEnabled(
      marketId: BigNumberish,
      strategyId: BigNumberish,
      enabled: boolean,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    setWrapper(
      marketId: BigNumberish,
      wrapCollateralType: string,
      maxWrappableAmount: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    unwrap(
      marketId: BigNumberish,
      unwrapAmount: BigNumberish,
      minAmountReceived: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    wrap(
      marketId: BigNumberish,
      wrapAmount: BigNumberish,
      minAmountReceived: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    getCollateralLeverage(
      synthMarketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getCustomTransactorFees(
      synthMarketId: BigNumberish,
      transactor: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getFeeCollector(synthMarketId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    getMarketFees(synthMarketId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    getMarketSkewScale(synthMarketId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    getMarketUtilizationFees(
      synthMarketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getReferrerShare(
      synthMarketId: BigNumberish,
      referrer: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    setAsyncFixedFee(
      synthMarketId: BigNumberish,
      asyncFixedFee: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    setAtomicFixedFee(
      synthMarketId: BigNumberish,
      atomicFixedFee: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    setCollateralLeverage(
      synthMarketId: BigNumberish,
      collateralLeverage: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    setCustomTransactorFees(
      synthMarketId: BigNumberish,
      transactor: string,
      fixedFeeAmount: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    setFeeCollector(
      synthMarketId: BigNumberish,
      feeCollector: string,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    setMarketSkewScale(
      synthMarketId: BigNumberish,
      skewScale: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    setMarketUtilizationFees(
      synthMarketId: BigNumberish,
      utilizationFeeRate: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    setWrapperFees(
      synthMarketId: BigNumberish,
      wrapFee: BigNumberish,
      unwrapFee: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    updateReferrerShare(
      synthMarketId: BigNumberish,
      referrer: string,
      sharePercentage: BigNumberish,
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

    acceptMarketOwnership(
      synthMarketId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    createSynth(
      tokenName: string,
      tokenSymbol: string,
      synthOwner: string,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    getAssociatedSystem(id: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getMarketOwner(
      synthMarketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getSynth(marketId: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getSynthImpl(marketId: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;

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

    minimumCredit(marketId: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    name(marketId: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    nominateMarketOwner(
      synthMarketId: BigNumberish,
      newNominatedOwner: string,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    registerUnmanagedSystem(
      id: BytesLike,
      endpoint: string,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    renounceMarketNomination(
      synthMarketId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    renounceMarketOwnership(
      synthMarketId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    reportedDebt(marketId: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setDecayRate(
      marketId: BigNumberish,
      rate: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    setSynthImplementation(
      synthImplementation: string,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    setSynthetix(
      synthetix: string,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    updatePriceData(
      synthMarketId: BigNumberish,
      buyFeedId: BytesLike,
      sellFeedId: BytesLike,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    upgradeSynthImpl(
      marketId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    buy(
      marketId: BigNumberish,
      usdAmount: BigNumberish,
      minAmountReceived: BigNumberish,
      referrer: string,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    buyExactIn(
      marketId: BigNumberish,
      usdAmount: BigNumberish,
      minAmountReceived: BigNumberish,
      referrer: string,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    buyExactOut(
      marketId: BigNumberish,
      synthAmount: BigNumberish,
      maxUsdAmount: BigNumberish,
      referrer: string,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    quoteBuyExactIn(
      marketId: BigNumberish,
      usdAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    quoteBuyExactOut(
      marketId: BigNumberish,
      synthAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    quoteSellExactIn(
      marketId: BigNumberish,
      synthAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    quoteSellExactOut(
      marketId: BigNumberish,
      usdAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    sell(
      marketId: BigNumberish,
      synthAmount: BigNumberish,
      minUsdAmount: BigNumberish,
      referrer: string,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    sellExactIn(
      marketId: BigNumberish,
      synthAmount: BigNumberish,
      minAmountReceived: BigNumberish,
      referrer: string,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    sellExactOut(
      marketId: BigNumberish,
      usdAmount: BigNumberish,
      maxSynthAmount: BigNumberish,
      referrer: string,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    cancelOrder(
      marketId: BigNumberish,
      asyncOrderId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    commitOrder(
      marketId: BigNumberish,
      orderType: BigNumberish,
      amountProvided: BigNumberish,
      settlementStrategyId: BigNumberish,
      minimumSettlementAmount: BigNumberish,
      referrer: string,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    getAsyncOrderClaim(
      marketId: BigNumberish,
      asyncOrderId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    PRECISION(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    settleOrder(
      marketId: BigNumberish,
      asyncOrderId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    settlePythOrder(
      result: BytesLike,
      extraData: BytesLike,
      overrides?: PayableOverrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    addSettlementStrategy(
      marketId: BigNumberish,
      strategy: {
        strategyType: BigNumberish;
        settlementDelay: BigNumberish;
        settlementWindowDuration: BigNumberish;
        priceVerificationContract: string;
        feedId: BytesLike;
        url: string;
        settlementReward: BigNumberish;
        priceDeviationTolerance: BigNumberish;
        minimumUsdExchangeAmount: BigNumberish;
        maxRoundingLoss: BigNumberish;
        disabled: boolean;
      },
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    getSettlementStrategy(
      marketId: BigNumberish,
      strategyId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    setSettlementStrategyEnabled(
      marketId: BigNumberish,
      strategyId: BigNumberish,
      enabled: boolean,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    setWrapper(
      marketId: BigNumberish,
      wrapCollateralType: string,
      maxWrappableAmount: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    unwrap(
      marketId: BigNumberish,
      unwrapAmount: BigNumberish,
      minAmountReceived: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    wrap(
      marketId: BigNumberish,
      wrapAmount: BigNumberish,
      minAmountReceived: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    getCollateralLeverage(
      synthMarketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getCustomTransactorFees(
      synthMarketId: BigNumberish,
      transactor: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getFeeCollector(
      synthMarketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getMarketFees(
      synthMarketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getMarketSkewScale(
      synthMarketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getMarketUtilizationFees(
      synthMarketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getReferrerShare(
      synthMarketId: BigNumberish,
      referrer: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    setAsyncFixedFee(
      synthMarketId: BigNumberish,
      asyncFixedFee: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    setAtomicFixedFee(
      synthMarketId: BigNumberish,
      atomicFixedFee: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    setCollateralLeverage(
      synthMarketId: BigNumberish,
      collateralLeverage: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    setCustomTransactorFees(
      synthMarketId: BigNumberish,
      transactor: string,
      fixedFeeAmount: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    setFeeCollector(
      synthMarketId: BigNumberish,
      feeCollector: string,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    setMarketSkewScale(
      synthMarketId: BigNumberish,
      skewScale: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    setMarketUtilizationFees(
      synthMarketId: BigNumberish,
      utilizationFeeRate: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    setWrapperFees(
      synthMarketId: BigNumberish,
      wrapFee: BigNumberish,
      unwrapFee: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    updateReferrerShare(
      synthMarketId: BigNumberish,
      referrer: string,
      sharePercentage: BigNumberish,
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
  };
}

