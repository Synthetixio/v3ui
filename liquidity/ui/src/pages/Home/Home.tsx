import { Flex, Heading } from '@chakra-ui/react';
import { useLiquidityPositions } from '@snx-v3/useLiquidityPositions';
import Wei from '@synthetixio/wei';
import { Helmet } from 'react-helmet';
import { useSearchParams } from 'react-router-dom';
import { AssetsList, PositionsList, StatBox } from '../../components';
import { AccountCollateralType, useAccountCollateral } from '@snx-v3/useAccountCollateral';
import { useTokenBalances } from '@snx-v3/useTokenBalance';
import { useCollateralPrices } from '@snx-v3/useCollateralPrices';

export function Home() {
  const [params] = useSearchParams();

  const { data: positions, isLoading: isLoquidityPositionLoading } = useLiquidityPositions({
    accountId: params.get('accountId') || undefined,
  });

  const { data: accountCollaterals, isLoading: isAccountCollateralsLoading } = useAccountCollateral(
    {
      accountId: params.get('accountId') || undefined,
    }
  );

  const { data: userTokenBalances, isLoading: tokenBalancesIsLoading } = useTokenBalances(
    accountCollaterals?.map((collateral) => collateral.tokenAddress) || []
  );

  const { data: collateralPrices, isLoading: isCollateralPricesLoading } = useCollateralPrices();

  const assets = calculateAssets(accountCollaterals, userTokenBalances, collateralPrices);

  const debt =
    positions && Object.values(positions).reduce((prev, cur) => prev.add(cur.debt), new Wei(0));

  const totalDelegated = assets
    ?.map((asset) => asset.collateral.totalAssigned.mul(asset.price))
    .reduce((prev, cur) => prev.add(cur), new Wei(0))
    .toNumber()
    .toFixed(2);

  const totalAssets = assets
    ?.map((asset) => {
      const assigned = asset.collateral.totalAssigned.mul(asset.price);
      const deposited = asset.collateral.totalDeposited.mul(asset.price);
      const wallet = asset.balance.mul(asset.price);
      return assigned.add(deposited).add(wallet);
    })
    .reduce((prev, cur) => prev.add(cur), new Wei(0))
    .toNumber()
    .toFixed(2);
  const isLoading =
    isAccountCollateralsLoading ||
    tokenBalancesIsLoading ||
    isCollateralPricesLoading ||
    isLoquidityPositionLoading;

  return (
    <>
      <Helmet>
        <title>Synthetix V3</title>
        <meta name="description" content="Synthetix V3 - Dashboard" />
      </Helmet>
      <Flex flexDir="column">
        <Heading color="gray.50" fontSize="1.5rem">
          Dashboard
        </Heading>
        <Flex w="100%" gap="4" mt={6}>
          <StatBox
            title="Total Assets"
            isLoading={isLoading}
            value={'$ ' + totalAssets?.toString() || '00.00'}
            label="All assets in your Wallet and in your Synthetix Account."
          />
          <StatBox
            title="Total Delegated"
            isLoading={isLoading}
            value={'$ '.concat(totalDelegated?.toString() || '00.00')}
            label="All assets in your Account that have been Delegated to a Pool."
          />
          <StatBox
            title="Total Debt"
            isLoading={isLoading}
            value={debt?.toNumber().toFixed(2) || '-'}
            label="Aggregated Debt of all your Open Positions."
          />
          <StatBox
            title="APY"
            isLoading={isLoading}
            value="14%"
            label="Aggregated APY from all your positions."
          />
        </Flex>
        <AssetsList isLoading={isLoading} assets={assets} />
        <PositionsList />
      </Flex>
    </>
  );
}

export interface Asset {
  collateral: AccountCollateralType;
  balance: Wei;
  price: Wei | undefined;
}

function calculateAssets(
  accountCollaterals?: AccountCollateralType[],
  userTokenBalances?: Wei[] | undefined,
  collateralPrices?: Record<string, Wei | undefined>
): Asset[] | undefined {
  if (!accountCollaterals || !userTokenBalances || !collateralPrices) return;

  return accountCollaterals.map((collateral, index) => {
    const balance = userTokenBalances[index];
    const price = collateralPrices[collateral.tokenAddress];

    return {
      collateral,
      balance,
      price,
    };
  });
}
