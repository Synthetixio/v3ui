it('shows user profile card', () => {
  cy.connectWallet();
  cy.viewport(1300, 900);
  cy.visit('/');

  cy.get('@wallet').then((wallet) => {
    cy.visit(`/#/councils/spartan?view=${wallet.address}`);
    cy.contains('[data-cy="user-wallet-profile-address"]', wallet.address.substring(0, 4)).should(
      'exist'
    );
  });
});
