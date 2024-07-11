it('shows homepage to a connected wallet', () => {
  cy.connectWallet();
  cy.viewport(1300, 900);
  cy.visit('/');

  cy.get('@wallet').then((wallet) => {
    cy.contains('[data-cy="user-wallet-address"]', wallet.address.substring(0, 6)).should('exist');
  });
});
