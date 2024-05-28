it('Home Connected', () => {
  cy.on('window:before:load', (win) => {
    win.sessionStorage.TERMS_CONDITIONS_ACCEPTED = 'true';
  });

  cy.connectWallet().then((wallet) => {
    cy.viewport(1200, 900);
    cy.visit('/');

    cy.get('[data-cy="liquidity-home"]').contains('The Liquidity Layer of DeFi');
    cy.get('[data-cy="account-menu-button"]').click();
    cy.get('[data-cy="create-new-account-menu-item"]').contains('Create Account');

    // Create account
    cy.task('setEthBalance', { address: wallet.address, balance: 2 });
    cy.get('[data-cy="header-wallet-address-button"]').click();
    cy.get('[data-cy="create-new-account-menu-item"]').click();
    cy.get('[data-cy="header-account-list"]').children().should('have.length', 1);

    // The account id in the url should be the same as in the header
    cy.url().then((url) => {
      const [baseUrl, fragment] = url.split('/#/');
      const params = new URL(`${baseUrl}${fragment}`).searchParams;

      const accountId = params.get('accountId');

      cy.get(`[data-cy="account-${accountId}"]`).should('exist');
    });

    cy.get('@wallet').then((wallet) => {
      cy.get('[data-cy="header-wallet-address-display"]').contains(
        `${wallet.address.substring(0, 6)}...${wallet.address.substring(wallet.address.length - 4)}`
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
});
