it('Councils - Administration', () => {
  cy.task('changePeriod', { council: 'spartan', period: 'nomination' });
  cy.task('mineBlock');
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
  cy.get('[data-cy="own-user-list-item"]').should(
    'have.css',
    'border-top',
    '0px solid rgb(48, 48, 55)'
  );
  cy.get('[data-cy="own-user-list-item"]').click();
  cy.get('[data-cy="edit-icon-user-profile-details"]').should('exist');
  cy.get('[data-cy="user-profile-wallet-address"]').should('have.css', 'font-size', '12px');
  cy.get('[data-cy="nominate-self-button-user-profile-details"]')
    .should('have.css', 'color', 'rgb(0, 0, 0)')
    .click();
  cy.get('[data-cy="nominate-self-username"]').should('exist');
  cy.get('[data-cy="council-select-button-text-nominate-self"]').should(
    'have.css',
    'font-size',
    '14px'
  );
  cy.get('[data-cy="council-nomination-select-spartan"]').click();
  cy.get('[data-cy="nominate-self-cast-nomination-button"]').click();
  cy.get('[data-cy="nominate-self-done-button"]').click();
  cy.get('[data-cy="empty-state-user-action-box"]').contains(
    'Click on a nominee to see their profile details'
  );
  cy.get('[data-cy="user-table-view-0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"]').should(
    'have.css',
    'textOverflow',
    'ellipsis'
  );
  cy.get('[data-cy="user-table-view-button-0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"]').click();
  cy.get('[data-cy="nominate-self-button-user-profile-details"]').click();
  cy.get('[data-cy="withdraw-vote-select"]').click();
  cy.get('[data-cy="edit-nomination-button"]').click();
  cy.get('[data-cy="confirm-edit-nomination-button"]').click();
  cy.get('[data-cy="empty-state-user-action-box"]').contains(
    'Click on a nominee to see their profile details'
  );
  cy.get('[data-cy="user-table-view-button-0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"]').should(
    'not.exist'
  );
});
