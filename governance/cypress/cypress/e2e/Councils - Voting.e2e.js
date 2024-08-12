it('Councils - Administration', () => {
  cy.task('changePeriod', { council: 'spartan', period: 'admin' });
  cy.task('changePeriod', { council: 'ambassador', period: 'admin' });
  cy.task('changePeriod', { council: 'treasury', period: 'admin' });
  cy.task('prepareVotingPower', { council: 'spartan' });
  cy.task('prepareVotingPower', { council: 'ambassador' });
  cy.task('prepareVotingPower', { council: 'treasury' });
  cy.task('mineBlock');
  cy.connectWallet();
  cy.viewport(1300, 900);
  cy.visit('/');
  cy.get('[data-cy="vote-council-button-spartan"]').should('exist');
  cy.get('[data-cy="council-period-badge"]').contains('Voting Open');
  cy.get('[data-cy="account-menu-button"]').click();
  cy.get('[data-cy="network-controller-switch"]').click();
  cy.get('[data-cy="network-menu-button-11155420"]').click();
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
    'Click on a nominee to see their profile details'
  );
  cy.get('[data-cy="own-user-list-item"]').click();
  cy.get('[data-cy="select-user-to-vote-button"]').contains('Select');
  cy.get('[data-cy="select-user-to-vote-button"]').click();
  cy.get('[data-cy="my-votes-button"]').click();
  cy.get(
    '[data-cy="user-blockies-council-tabs-0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"]'
  ).should('exist');
  cy.reload();
  cy.get(
    '[data-cy="user-blockies-council-tabs-0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"]'
  ).should('exist');
  cy.wait(3000);
  cy.get('[data-cy="my-votes-voting-power"]').contains('100.00');
  cy.get('[data-cy="cast-my-vote-button"]').click();
  cy.wait(3000);
  cy.window().then((win) => {
    win.localStorage.clear();
  });
  cy.reload({ cache: false });
  cy.get(
    '[data-cy="user-blockies-council-tabs-0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"]'
  ).should('exist');
  cy.wait(3000);
  cy.get('[data-cy="remove-vote-button"]').click();
  cy.get('[data-cy="cast-my-vote-button"]').click();
  cy.wait(3000);

  cy.get('[data-cy="account-menu-button"]').click();
  cy.get('[data-cy="network-controller-switch"]').click();
  cy.get('[data-cy="network-menu-button-421614"]').click();
  cy.get('[data-cy="council-tab-button-spartan"]').click();
  cy.get('[data-cy="own-user-list-item"]').click();
  cy.get('[data-cy="select-user-to-vote-button"]').contains('Select');
  cy.get('[data-cy="select-user-to-vote-button"]').click();
  cy.get('[data-cy="my-votes-button"]').click();
  cy.get('[data-cy="my-votes-total-votes"]').contains('0/3');
  cy.get('[data-cy="my-votes-box-total-votes"]').contains('0/3');
});
