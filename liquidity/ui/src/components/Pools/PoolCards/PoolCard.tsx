import { Network } from '@snx-v3/useBlockchain';
import { BigNumberish } from 'ethers';
import { CollateralType } from '@snx-v3/useCollateralTypes';
import { PoolRow } from './PoolRow';

interface CollateralTypeWithDeposited extends CollateralType {
  collateralDeposited: string;
}

export interface PoolCardProps {
  pool: {
    name: string;
    id: string;
  };
  network: Network;
  collateralTypes?: CollateralTypeWithDeposited[];
  collateralPrices?: {
    symbol: string;
    price: BigNumberish;
  }[];
  apr: {
    combinedApr: number;
    cumulativePnl: number;
    collateralAprs: any[];
  };
  rewardsPayoutTokens?: string[];
}

export const PoolCard = ({
  pool,
  network,
  apr,
  collateralTypes,
  collateralPrices,
}: PoolCardProps) => {
  return (
    <>
      {collateralTypes?.map((collateralType) => {
        return (
          <PoolRow
            key={collateralType.tokenAddress + network.id}
            pool={pool}
            network={network}
            apr={apr}
            collateralType={collateralType}
            collateralPrices={collateralPrices}
          />
        );
      })}
    </>
  );
};
