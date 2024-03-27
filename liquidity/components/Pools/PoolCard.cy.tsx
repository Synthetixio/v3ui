import React from 'react';
import { PoolCard } from './PoolCard'; // Import your PoolCard component
import { wei } from '@synthetixio/wei';
import { Web3OnboardProvider, init } from '@web3-onboard/react';
import injectedModule from '@web3-onboard/injected-wallets';

const onboard = init({ wallets: [injectedModule()], chains: [{ id: 1 }] });

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
      name: 'Synthetix Network Token',
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
        cRatio: wei(300),
        collateralPrice: wei(1),
        isPreferred: true,
      },
    };

    cy.mount(
      <Web3OnboardProvider web3Onboard={onboard}>
        <PoolCard
          pool={pool}
          collateralTypes={collateralTypes}
          liquidityPositionsById={liquidityPositionsById}
        />
      </Web3OnboardProvider>
    );

    cy.get('table').should('exist');
    cy.get('[data-testid="liquidation-ratio"]').should('exist').should('contain', '150%');
    cy.get('[data-testid="issuance-ratio"]').should('exist').should('contain', '400%');
    cy.get('[data-testid="collateral-amount"]').should('exist').should('contain', '100 SNX');
    cy.get('[data-testid="collateral-value"]').should('exist').should('contain', '$100');
    cy.get('[data-testid="debt"]').should('exist').should('contain', '$100');
    cy.get('[data-testid="c-ratio"]').should('exist').should('contain', '100%');
  });
});
