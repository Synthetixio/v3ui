it('shows Spartan Pool page to not connected wallet', () => {
  cy.on('window:before:load', (win) => {
    win.sessionStorage.TERMS_CONDITIONS_ACCEPTED = 'true';
  });

  cy.visit('/#/pools/1');

  cy.get('[data-testid="pool collateral types"]').should('contain', 'Pool Collateralization');
  cy.get('[data-testid="pool collateral"][data-collateral="SNX"]').should('exist');

  cy.get('[data-testid="pool markets"]').should('contain', 'Markets');
});
