import React from 'react';
import { AvailableCollateralUi } from './AvailableCollateral';
import { wei } from '@synthetixio/wei';
import { AvailableCollateralRow } from './AvailableCollateralRow';

describe('AvailableCollateral Component', () => {
  const accountCollaterals = [
    {
      tokenAddress: 'snxAddress',
      symbol: 'SNX',
      availableCollateral: wei(100),
      totalAssigned: wei(100),
      totalDeposited: wei(50),
      totalLocked: wei(40),
    },
  ];

  it('renders loading state initially', () => {
    cy.mount(
      <AvailableCollateralUi
        isLoading={true}
        accountCollaterals={[]}
        AvailableCollateralRow={AvailableCollateralRow}
      />
    );
    cy.get('h2').should('contain', 'Loading Collateral...');
  });

  it('renders available collateral when not in loading state', () => {
    cy.mount(
      <AvailableCollateralUi
        isLoading={false}
        accountCollaterals={accountCollaterals}
        AvailableCollateralRow={AvailableCollateralRow}
      />
    );

    cy.get('h2').should('contain', 'Available Collateral');
    cy.get('[data-testid="available-collateral"]').should('exist').should('contain', '100 SNX');
  });

  it('displays withdrawal information when not in loading state', () => {
    const currentDate = new Date(); // Replace with a valid unlock date
    const unlockDate = new Date(currentDate);
    unlockDate.setDate(currentDate.getDate() + 3);

    cy.mount(
      <AvailableCollateralUi
        isLoading={false}
        accountCollaterals={accountCollaterals}
        unlockDate={unlockDate}
        unlockDateString="3 days"
        timeToUnlock="in about 3 days"
        AvailableCollateralRow={AvailableCollateralRow}
      />
    );

    // Check that the unlock date is displayed
    cy.get('[data-testid="time-to-unlock"]').should('exist').should('contain', 'in about 3 days');
    // Ensure button is disabled pre lock date
    cy.get('[data-testid="withdraw-button"]').should('be.disabled');
  });
});
