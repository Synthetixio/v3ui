import { useMemo } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { StatBox } from './StatBox';
import { useSearchParams } from 'react-router-dom';
import { useAccountCollateral } from '@snx-v3/useAccountCollateral';
import { useCollateralPrices } from '@snx-v3/useCollateralPrices';
import { useLiquidityPositions } from '@snx-v3/useLiquidityPositions';
import { useTokenBalances } from '@snx-v3/useTokenBalance';
import {
  calculateAssets,
  calculateTotalAssetsAvailable,
  calculateTotalAssetsDelegated,
} from '../../utils/assets';
import { calculateDebt } from '../../utils/positions';
import { useNetwork } from '@snx-v3/useBlockchain';
import { isBaseAndromeda } from '@snx-v3/isBaseAndromeda';
import { useCollateralTypes } from '@snx-v3/useCollateralTypes';
import { useGetUSDTokens } from '@snx-v3/useGetUSDTokens';
import { useSystemToken } from '@snx-v3/useSystemToken';
import { Amount } from '@snx-v3/Amount';
import { ZEROWEI } from '../../utils/constants';
import { wei } from '@synthetixio/wei';

export const StatsList = () => {
  const [params] = useSearchParams();
  const { network } = useNetwork();

  const { data: usdTokens } = useGetUSDTokens();

  const { data: positions, isLoading: isLiquidityPositionLoading } = useLiquidityPositions({
    accountId: params.get('accountId') || undefined,
  });

  const { data: collateralTypes, isLoading: isCollateralTypesLoading } = useCollateralTypes();

  const { data: accountCollaterals, isLoading: isAccountCollateralsLoading } = useAccountCollateral(
    {
      accountId: params.get('accountId') || undefined,
    }
  );

  const collateralAddresses =
    isBaseAndromeda(network?.id, network?.preset) && usdTokens?.USDC
      ? accountCollaterals?.map((collateral) => collateral.tokenAddress).concat(usdTokens.USDC) ||
        []
      : accountCollaterals?.map((collateral) => collateral.tokenAddress) || [];

  const { data: userTokenBalances, isLoading: tokenBalancesIsLoading } =
    useTokenBalances(collateralAddresses);

  const associatedUserBalances = userTokenBalances?.map((balance, index) => {
    return {
      balance,
      tokenAddress: collateralAddresses[index],
    };
  });

  const { data: collateralPrices, isLoading: isCollateralPricesLoading } = useCollateralPrices();

  const isBase = isBaseAndromeda(network?.id, network?.preset);

  const { data: systemToken } = useSystemToken();
  const assets = useMemo(
    () =>
      calculateAssets(
        accountCollaterals,
        associatedUserBalances,
        collateralPrices,
        collateralTypes,
        isBase,
        usdTokens?.USDC,
        systemToken
      ),
    [
      accountCollaterals,
      associatedUserBalances,
      collateralPrices,
      collateralTypes,
      isBase,
      usdTokens?.USDC,
      systemToken,
    ]
  );

  const debt = calculateDebt(positions);
  const totalAssets = calculateTotalAssetsAvailable(assets);
  const totalDelegated = calculateTotalAssetsDelegated(assets);

  const isLoading =
    isAccountCollateralsLoading ||
    tokenBalancesIsLoading ||
    isCollateralPricesLoading ||
    isLiquidityPositionLoading ||
    isCollateralTypesLoading;

  return (
    <Flex flexWrap="wrap" w="100%" gap="4" mt={6}>
      <StatBox
        title="Available to Lock"
        isLoading={isLoading}
        value={<Amount prefix="$" value={wei(totalAssets || '0')} />}
        label={
          <>
            <Text textAlign="left">
              Total assets that can be Locked, including:
              <br /> - Unlocked assets not yet withdrawn
              <br /> - Available assets in your wallet
            </Text>
          </>
        }
      />
      <StatBox
        title="Total Locked"
        isLoading={isLoading}
        value={<Amount prefix="$" value={wei(totalDelegated || '0')} />}
        label={
          <>
            <Text textAlign="left">All assets locked in Positions </Text>
          </>
        }
      />
      <StatBox
        title={`Total ${isBase ? 'PNL' : 'Debt'}`}
        isLoading={isLoading}
        value={<Amount prefix="$" value={debt?.abs() || ZEROWEI} />}
        label={
          <>
            <Text textAlign="left">
              Aggregated {isBase ? 'PNL' : 'Debt'} of all your open Positions
            </Text>
          </>
        }
      />
    </Flex>
  );
};
