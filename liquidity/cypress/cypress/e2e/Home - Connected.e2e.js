it('Home Not Connected', () => {
  cy.on('window:before:load', (win) => {
    win.sessionStorage.TERMS_CONDITIONS_ACCEPTED = 'true';
  });

  cy.connectWallet();
  cy.viewport(1200, 900);
  cy.visit('/');
  cy.get('[data-cy="liquidity-dashboard"]').contains('Dashboard');
  cy.get('[data-cy="asset-list-wallet-balance"]').contains('$0.00');
  cy.get('[data-cy="asset-list-account-balance"]').contains('$0.00');
  cy.get('[data-cy="asset-list-delegated-balance"]').contains('$0.00');
  cy.get('[data-cy="asset-list-deposit-button"]').contains('Deposit');
  cy.get('[data-cy="Total Assets-stats-box"]').contains('$0.00');
  cy.get('[data-cy="Total Delegated-stats-box"]').contains('$0.00');
  cy.get('[data-cy="Total Debt-stats-box"]').contains('$0.00');
  cy.get('[data-cy="position-empty-button"]').contains('Explore all Pools');
  cy.get('[data-cy="account-menu-button"]').click();
  cy.get('[data-cy="create-new-account-menu-item"]').contains('Create Account');

  cy.get('@wallet').then((wallet) => {
    cy.get('[data-cy="header-wallet-address-display"]').contains(
      `${wallet.address.substring(0, 6)}...${wallet.address.substring(wallet.address.length - 4)}`
    );
  });
});
