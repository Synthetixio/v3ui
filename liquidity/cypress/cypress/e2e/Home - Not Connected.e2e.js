it('Home Not Connected', () => {
  cy.on('window:before:load', (win) => {
    win.sessionStorage.TERMS_CONDITIONS_ACCEPTED = 'true';
  });
  cy.viewport(1200, 900);
  cy.visit('/');

  cy.get('[data-cy="liquidity-dashboard"]').contains('Dashboard');
  cy.get('[data-cy="connect-button-asset-table"]').contains('Connect Wallet');
  cy.get('[data-cy="connect-button-position-table"]').contains('Connect Wallet');
  cy.get('[data-cy="Total Assets-stats-box"]').contains('$0.00');
  cy.get('[data-cy="Total Delegated-stats-box"]').contains('$0.00');
  cy.get('[data-cy="Total Debt-stats-box"]').contains('$0.00');
  cy.get('[data-cy="header-connect-wallet"]').contains('Connect Wallet');
  cy.get('[data-cy="current-selected-network"]').contains('Not Connected');
});
