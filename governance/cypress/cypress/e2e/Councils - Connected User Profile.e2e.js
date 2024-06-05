it('shows user profile card', () => {
  cy.connectWallet();
  cy.viewport(1300, 900);
  cy.visit('/');

  cy.get('@wallet').then((wallet) => {
    cy.visit(`/#/councils/spartan?view=${wallet.address}`);
    cy.get('[data-testid="user-wallet-profile-address"]').contains(
      `${wallet.address.substring(0, 4)}`
    );
  });
});
