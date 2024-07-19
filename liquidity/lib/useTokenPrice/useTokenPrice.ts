import { useOfflinePrices } from '@snx-v3/useCollateralPriceUpdates';
import { useCollateralTypes } from '@snx-v3/useCollateralTypes';
import { useMemo } from 'react';
import { ZEROWEI } from '../../ui/src/utils/constants';
import { wei } from '@synthetixio/wei';

export const useTokenPrice = (symbol: string) => {
  const { data: collateralTypes } = useCollateralTypes(true);

  const { data: collateralPrices } = useOfflinePrices(
    (collateralTypes || []).map((item) => ({
      id: item.tokenAddress,
      oracleId: item.oracleNodeId,
      symbol: item.symbol,
    }))
  );

  return useMemo(() => {
    if (!collateralTypes || !collateralPrices) {
      return ZEROWEI;
    }

    const price = wei(
      collateralPrices.find((price) => price.symbol.toUpperCase() === symbol.toUpperCase())
        ?.price || '0'
    );
    return price;
  }, [collateralPrices, collateralTypes, symbol]);
};
