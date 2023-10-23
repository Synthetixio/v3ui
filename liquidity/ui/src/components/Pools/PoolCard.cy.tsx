import React from 'react';

import { PoolCard } from './PoolCard'; // Import your PoolCard component
import { wei } from '@synthetixio/wei';

describe('PoolCard Component', () => {
  const pool = {
    name: 'Spartan Council Pool',
    id: '1',
    isPreferred: true,
  };

  const collateralTypes = [
    {
      tokenAddress: 'address1',
      symbol: 'SNX',
      depositingEnabled: true,
      issuanceRatioD18: wei(400, 2, true),
      liquidationRatioD18: wei(150, 2, true),
      liquidationRewardD18: wei(5, 2, true),
      oracleNodeId: '1',
      minDelegationD18: wei(1, 2, true),
      displaySymbol: 'SNX',
    },
  ];

  it('renders pool name and "Pool Info" button', () => {
    cy.mount(<PoolCard pool={pool} />);

    cy.get('h2').should('contain', 'Spartan Council Pool');
    cy.get('a').should('contain', 'Pool Info');
  });

  it('renders a table with collateral information', () => {
    cy.mount(<PoolCard pool={pool} collateralTypes={collateralTypes} />);

    cy.get('table').should('exist');

    cy.get('[data-testid="liquidation-ratio"]').should('exist').should('contain', '150%');
    cy.get('[data-testid="issuance-ratio"]').should('exist').should('contain', '400%');
  });

  it('renders a table with collateral and liquidity information', () => {
    const liquidityPositionsById = {
      '1-SNX': {
        id: `1-SNX` as `${string}-${string}`,
        poolId: '1',
        collateralType: collateralTypes[0],
        accountId: '12344',
        collateralAmount: wei(100),
        collateralValue: wei(100),
        debt: wei(100),
        poolName: 'Spartan Council Pool',
        cRatio: wei(100),
        collateralPrice: wei(1),
      },
    };

    cy.mount(
      <PoolCard
        pool={pool}
        collateralTypes={collateralTypes}
        liquidityPositionsById={liquidityPositionsById}
      />
    );

    cy.get('table').should('exist');
  });
});
