it('shows homepage to a not connected wallet', () => {
  cy.viewport(1300, 900);

  cy.visit('/');

  cy.get('[data-testid="council-card-header-spartan"]').should('contain', 'Spartan Council');
  cy.get('[data-testid="council-card-header-grants"]').should('contain', 'Grants Council');
  cy.get('[data-testid="council-card-header-ambassador"]').should('contain', 'Ambassador Council');
  cy.get('[data-testid="council-card-header-treasury"]').should('contain', 'Treasury Council');
  cy.get('#connect-wallet-button').should('contain', 'Connect Wallet');
});
