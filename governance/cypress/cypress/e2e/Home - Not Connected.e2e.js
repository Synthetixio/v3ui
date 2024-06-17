it('shows homepage to a not connected wallet', () => {
  cy.viewport(1300, 900);
  cy.visit('/');

  cy.contains('[data-cy="council-card-header-spartan"]', 'Spartan Council').should('exist');
  cy.contains('[data-cy="council-card-header-grants"]', 'Grants Council').should('exist');
  cy.contains('[data-cy="council-card-header-ambassador"]', 'Ambassador Council').should('exist');
  cy.contains('[data-cy="council-card-header-treasury"]', 'Treasury Council').should('exist');
  cy.contains('[data-cy="council-card-header-treasury"]', 'Treasury Council').should('exist');
  cy.contains('[data-cy="connect-wallet-button"]', 'Connect Wallet').should('exist');
});
