it('Home Connected', () => {
  cy.connectWallet();

  cy.viewport(1200, 900);
  cy.visit('/');

  cy.contains('[data-cy="liquidity-dashboard"]', 'Dashboard').should('exist');
  cy.contains('[data-cy="asset-list-wallet-balance"]', '$0.00').should('exist');
  cy.contains('[data-cy="asset-list-account-balance"]', '$0.00').should('exist');
  cy.contains('[data-cy="asset-list-delegated-balance"]', '$0.00').should('exist');
  cy.get('[data-cy="assets-deposit-button"]').should('exist');
  cy.contains('[data-cy="Total Assets-stats-box"]', '$0.00').should('exist');
  cy.contains('[data-cy="Total Delegated-stats-box"]', '$0.00').should('exist');
  cy.contains('[data-cy="Total Debt-stats-box"]', '$0.00').should('exist');
  cy.contains('[data-cy="position-empty-button"]', 'Explore all Pools').should('exist');

  cy.get('@wallet').then((wallet) => {
    cy.contains('[data-cy="header-wallet-address-display"]', wallet.address.substring(0, 6)).should(
      'exist'
    );
  });
});
