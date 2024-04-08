import { useParams } from '@snx-v3/useParams';
import {
  Claim,
  Deposit,
  FirstTimeDeposit,
  FirstTimeDepositBaseAndromeda,
  Remove,
  Repay,
  RepayBaseAndromeda,
  ClaimBaseAndromeda,
  Borrow,
} from '../../components/ManagePosition';
import { useLiquidityPosition } from '@snx-v3/useLiquidityPosition';
import { useNetwork } from '@snx-v3/useBlockchain';
import { isBaseAndromeda } from '@snx-v3/isBaseAndromeda';
import { Spinner } from '@chakra-ui/react';

export function Manage() {
  const { network } = useNetwork();
  const { collateralSymbol, poolId, collateralAddress, accountId, tab, tabAction } = useParams();
  const { data: liquidityPosition, isLoading: liquidityPositionIsLoading } = useLiquidityPosition({
    tokenAddress: collateralAddress,
    accountId,
    poolId,
  });

  if (liquidityPositionIsLoading) return <Spinner alignSelf="center" colorScheme="cyan" />;
  // first time depositing for pool for Andromeda
  if (
    (liquidityPosition?.debt.eq(0) &&
      isBaseAndromeda(network?.id, network?.preset) &&
      collateralAddress) ||
    (!liquidityPosition && collateralAddress && isBaseAndromeda(network?.id, network?.preset))
  ) {
    return (
      <FirstTimeDepositBaseAndromeda
        liquidityPosition={liquidityPosition}
        collateralSymbol={collateralSymbol}
        poolId={poolId}
        collateralAddress={collateralAddress}
        networkId={network?.id}
        accountId={accountId}
      />
    );
  }
  // first time depositing for pool
  if (
    (liquidityPosition?.debt.eq(0) && collateralAddress) ||
    (!liquidityPosition && collateralAddress)
  ) {
    return (
      <FirstTimeDeposit
        liquidityPosition={liquidityPosition}
        collateralSymbol={collateralSymbol}
        poolId={poolId}
        collateralAddress={collateralAddress}
        accountId={accountId}
      />
    );
  }

  // deposit more in an existing position
  if (tab === '0' && tabAction === 'deposit' && collateralAddress && liquidityPosition) {
    return (
      <Deposit
        liquidityPosition={liquidityPosition}
        collateralSymbol={collateralSymbol}
        poolId={poolId}
        collateralAddress={collateralAddress}
        accountId={accountId}
      />
    );
  }
  // remove collateral from an existing position
  if (tab === '0' && tabAction === 'remove' && collateralAddress && liquidityPosition) {
    return (
      <Remove
        liquidityPosition={liquidityPosition}
        collateralSymbol={collateralSymbol}
        poolId={poolId}
        collateralAddress={collateralAddress}
        accountId={accountId}
      />
    );
  }
  // Repay debt
  if (
    tab === '1' &&
    tabAction === 'repay' &&
    collateralAddress &&
    liquidityPosition &&
    isBaseAndromeda(network?.id, network?.preset)
  ) {
    return (
      <RepayBaseAndromeda
        liquidityPosition={liquidityPosition}
        collateralSymbol={collateralSymbol}
        poolId={poolId}
        collateralAddress={collateralAddress}
        accountId={accountId}
        networkId={network?.id}
      />
    );
  }
  // Repay debt
  if (tab === '1' && tabAction === 'repay' && collateralAddress && liquidityPosition) {
    return (
      <Repay
        liquidityPosition={liquidityPosition}
        collateralSymbol={collateralSymbol}
        poolId={poolId}
        collateralAddress={collateralAddress}
        accountId={accountId}
        networkId={network?.id}
      />
    );
  }

  // Claim debt
  if (
    tab === '1' &&
    tabAction === 'claim' &&
    collateralAddress &&
    liquidityPosition &&
    isBaseAndromeda(network?.id, network?.preset)
  ) {
    return (
      <ClaimBaseAndromeda
        liquidityPosition={liquidityPosition}
        collateralSymbol={collateralSymbol}
        poolId={poolId}
        collateralAddress={collateralAddress}
        accountId={accountId}
        networkId={network?.id}
      />
    );
  }
  // Claim debt
  if (tab === '1' && tabAction === 'claim' && collateralAddress && liquidityPosition) {
    return (
      <Claim
        liquidityPosition={liquidityPosition}
        collateralSymbol={collateralSymbol}
        poolId={poolId}
        collateralAddress={collateralAddress}
        accountId={accountId}
        networkId={network?.id}
      />
    );
  }
  if (tab === '1' && tabAction === 'borrow' && collateralAddress && liquidityPosition) {
    return (
      <Borrow
        liquidityPosition={liquidityPosition}
        collateralSymbol={collateralSymbol}
        poolId={poolId}
        collateralAddress={collateralAddress}
        accountId={accountId}
        networkId={network?.id}
      />
    );
  }
  return <>not found {JSON.stringify(liquidityPosition)}</>;
}
