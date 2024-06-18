it('Councils - Administration', () => {
  cy.connectWallet();
  cy.viewport(1300, 900);
  cy.visit('/');
  cy.get('[data-cy="view-council-button-spartan"]').click();
  cy.get('[data-cy="council-tab-vote-circle"]').should('not.exist');
  cy.get('[data-cy="election-closed-tag"]').should('exist');
  cy.get('[data-cy="number-table-header"]').click();
  cy.get('[data-cy="sort-arrow-up"]').should('exist');
  cy.get('[data-cy="sort-arrow-up"]').click();
  cy.get('[data-cy="sort-arrow-down"]').should('exist');
  cy.get('[data-cy="name-table-header"]').click();
  cy.get('[data-cy="sort-arrow-up"]').should('exist');
  cy.get('[data-cy="sort-arrow-up"]').click();
  cy.get('[data-cy="sort-arrow-down"]').should('exist');
  cy.get('[data-cy="votes-table-header"]').click();
  cy.get('[data-cy="sort-arrow-up"]').should('exist');
  cy.get('[data-cy="sort-arrow-up"]').click();
  cy.get('[data-cy="sort-arrow-down"]').should('exist');
  cy.get('[data-cy="voting-power-table-header"]').click();
  cy.get('[data-cy="sort-arrow-up"]').should('exist');
  cy.get('[data-cy="sort-arrow-up"]').click();
  cy.get('[data-cy="sort-arrow-down"]').should('exist');
  cy.get('[data-cy="user-table-row-0"]').click();
  cy.url().then((url) => {
    console.log(url);
    cy.get(`[data-cy="user-profile-card-${url.split('view=')[1]}"]`);
  });
});
