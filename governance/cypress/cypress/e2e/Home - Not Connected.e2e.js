it('shows homepage to a not connected wallet', () => {
  cy.on('window:before:load', (win) => {
    win.sessionStorage.TERMS_CONDITIONS_ACCEPTED = 'true';
  });

  cy.viewport(1100, 900);

  cy.visit('/');

  cy.get('[data-cy="council-card-header-spartan"]').should('contain', 'Spartan Council');
  cy.get('[data-cy="council-card-header-grants"]').should('contain', 'Grants Council');
  cy.get('[data-cy="council-card-header-ambassador"]').should('contain', 'Ambassador Council');
  cy.get('[data-cy="council-card-header-treasury"]').should('contain', 'Treasury Council');
  cy.get('#connect-wallet-button').should('contain', 'Connect Wallet');
});
