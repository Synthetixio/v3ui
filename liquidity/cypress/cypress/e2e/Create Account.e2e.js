it('Create Account', () => {
  cy.connectWallet().then((wallet) => {
    cy.task('setEthBalance', { address: wallet.address, balance: 2 });
  });

  cy.viewport(1200, 900);
  cy.visit('/');

  // Create account
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
});
