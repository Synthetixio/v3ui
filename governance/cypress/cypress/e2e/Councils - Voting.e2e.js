it('Councils - Administration', () => {
  cy.task('changePeriod', { council: 'spartan', period: 'voting' });
  cy.task('mineBlock');
  cy.connectWallet();
  cy.viewport(1300, 900);
  cy.visit('/');
  cy.get('[data-cy="vote-council-button-spartan"]').should('exist');
  cy.get('[data-cy="council-period-badge"]').contains('Voting Open');
  cy.get('[data-cy="council-tab-vote-circle"]').should('not.exist');
  cy.get('[data-cy="vote-council-button-spartan"]').click();
  cy.get('[data-cy="period-countdown"]').should('exist');
  cy.get('[data-cy="period-countdown"]').contains('Voting ends');
  cy.get('[data-cy="name-table-header"]').click();
  cy.get('[data-cy="sort-arrow-up"]').should('exist');
  cy.get('[data-cy="sort-arrow-up"]').click();
  cy.get('[data-cy="sort-arrow-down"]').should('exist');
  cy.get('[data-cy="own-user-list-item"]').click();
  cy.get('[data-cy="nominate-self-button-user-profile-details-voting-period"]').click();
  cy.get('[data-cy="council-nomination-select-spartan"]').click();
  cy.get('[data-cy="nominate-self-cast-nomination-button"]').click();
  cy.get('[data-cy="nominate-self-done-button"]').click();
  cy.get('[data-cy="empty-state-user-action-box"]').contains(
    'Click on nominee to see their profile details'
  );
  cy.get('[data-cy="own-user-list-item"]').click();
  cy.get('[data-cy="select-user-to-vote-button"]').click();
  cy.get('[data-cy="my-votes-button"]').click();
  cy.get(
    '[data-cy="user-blockies-council-tabs-0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"]'
  ).should('exist');
});
