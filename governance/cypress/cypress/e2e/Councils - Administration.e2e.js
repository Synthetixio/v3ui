it('Councils - Administration', () => {
  cy.connectWallet();
  cy.viewport(1300, 900);
  cy.visit('/');
  cy.get('[data-cy="view-council-button-spartan"]').click();
  cy.get('[data-cy="council-tab-vote-circle"]').should('not.exist');
  cy.get('[data-cy="election-closed-tag"]').should('exist');
});
