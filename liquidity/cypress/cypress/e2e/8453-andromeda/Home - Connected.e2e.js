it('Home Connected', () => {
  cy.connectWallet().then(({ address, privateKey }) => {
    cy.task('setEthBalance', { address, balance: 100 });
    cy.task('createAccount', { privateKey }).then((accountId) => {
      cy.wrap(accountId).as('accountId');
    });
  });

  cy.viewport(1200, 900);
  cy.visit('/');

  cy.get('[data-cy="liquidity-home"]').contains('The Liquidity Layer of DeFi');

  cy.get('@wallet').then(({ address }) => {
    cy.get('[data-cy="header-wallet-address-display"]').contains(
      `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
    );
  });

  // Check the dashboard
  cy.visit('/#/dashboard');
  cy.get('[data-cy="liquidity-dashboard"]').contains('Dashboard');
  cy.get('[data-cy="asset-list-wallet-balance"]').contains('$0.00');
  cy.get('[data-cy="asset-list-account-balance"]').contains('$0.00');
  cy.get('[data-cy="asset-list-delegated-balance"]').contains('$0.00');
  cy.get('[data-cy="assets-deposit-button"]').contains('Deposit');
  cy.get('[data-cy="Total Assets-stats-box"]').contains('$0.00');
  cy.get('[data-cy="Total Delegated-stats-box"]').contains('$0.00');
  cy.get('[data-cy="Total Debt-stats-box"]').contains('$0.00');
});
