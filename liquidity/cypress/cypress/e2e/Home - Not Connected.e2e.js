it('Home Not Connected', () => {
  cy.viewport(1200, 900);
  cy.visit('/');
  cy.get('[data-cy="header-connect-wallet"]').contains('Connect Wallet');
  cy.get('[data-cy="liquidity-home"]').contains('The Liquidity Layer of DeFi');

  cy.visit('/#/dashboard');

  cy.get('[data-cy="liquidity-dashboard"]').contains('Dashboard');
  // Assets are temporarily disabled
  // cy.get('[data-cy="connect-button-asset-table"]').contains('Connect Wallet');
  cy.get('[data-cy="connect-button-position-table"]').contains('Connect Wallet');
  cy.get('[data-cy="Total Locked-stats-box"]').contains('$0.00');
  // cy.get('[data-cy="Total Unlocked-stats-box"]').contains('$0.00');
  // cy.get('[data-cy="Total Debt-stats-box"]').contains('$0.00');
});
