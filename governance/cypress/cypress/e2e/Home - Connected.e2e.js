it('shows homepage to a connected wallet', () => {
  cy.connectWallet();
  cy.viewport(1300, 900);
  cy.visit('/');

  cy.get('@wallet').then((wallet) => {
    cy.get('[data-testid="user-wallet-address"]').contains(`${wallet.address.substring(0, 6)}`);
  });
});
