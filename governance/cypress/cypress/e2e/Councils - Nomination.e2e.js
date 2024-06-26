it('Councils - Administration', () => {
  cy.connectWallet();
  cy.viewport(1300, 900);
  cy.visit('/');
  cy.get('[data-cy="view-council-button-spartan"]').should('exist');
  cy.get('[data-cy="council-period-badge"]').contains('Nomination Open');
  cy.get('[data-cy="council-tab-vote-circle"]').should('not.exist');
  cy.get('[data-cy="view-council-button-spartan"]').click();
  cy.get('[data-cy="period-countdown"]').should('exist');
  cy.get('[data-cy="period-countdown"]').contains('Voting starts');
  cy.get('[data-cy="name-table-header"]').click();
  cy.get('[data-cy="sort-arrow-up"]').should('exist');
  cy.get('[data-cy="sort-arrow-up"]').click();
  cy.get('[data-cy="sort-arrow-down"]').should('exist');
  cy.get('[data-cy="own-user-list-item"]').click();
  cy.get('[data-cy="nominate-self-button-user-profile-details"]').click();
  cy.get('[data-cy="council-nomination-select-spartan"]').click();
  cy.get('[data-cy="nominate-self-cast-nomination-button"]').click();
  cy.get('[data-cy="nominate-self-done-button"]').click();
  cy.get('[data-cy="empty-state-user-action-box"]').contains(
    'Click on nominee to see their profile details'
  );
  cy.get('[data-cy="user-table-view-button"]').click();
});
