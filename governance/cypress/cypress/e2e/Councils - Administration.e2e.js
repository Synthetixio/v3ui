it('Councils - Administration', () => {
  cy.task('changePeriod', { council: 'spartan', period: 'admin' });
  cy.task('changePeriod', { council: 'ambassador', period: 'admin' });
  cy.task('changePeriod', { council: 'treasury', period: 'admin' });
  cy.task('mineBlock');
  cy.connectWallet();
  cy.viewport(1300, 900);
  cy.visit('/');
  cy.get('[data-cy="account-menu-button"]')
    .should('have.css', 'padding-left', '8px')
    .and('have.css', 'padding-right', '8px');
  cy.get('[data-cy="view-council-button-spartan"]').should('exist');
  cy.get('[data-cy="countdown-timer"]').should('exist');
  cy.get('[data-cy="council-period-badge"]').contains('Closed - Council Elected');
  cy.get('[data-cy="council-tab-vote-circle"]').should('not.exist');
  cy.get('[data-cy="view-council-button-spartan"]').click();
  cy.get('[data-cy="election-closed-tag"]').should('exist');
  cy.get('[data-cy="council-image-council-tabs-spartan"]').should('have.css', 'width', '32px');
  cy.get('[data-cy="user-action-box-unselected"]')
    .should('have.css', 'top', '105px')
    .and('have.css', 'position', 'sticky');
  cy.get('[data-cy="council-image-council-tabs-spartan-circle"]')
    .should('have.css', 'width', '40px')
    .and('have.css', 'height', '40px');
  cy.get('[data-cy="council-information-spartan"]').should('have.css', 'gap', '8px');
  cy.viewport(400, 800);
  cy.visit('#/councils');
  cy.get('[data-cy="my-votes-summary-text"]').should('have.css', 'font-size', '14px');
  cy.get('[data-cy="council-select-mobile"]').should('have.css', 'font-size', '12px');
  cy.get('[data-cy="menu-button-flex-council-select"]').should('have.css', 'height', '48px');
  cy.get('[data-cy="my-votes-button"]').should('have.css', 'height', '48px');
});
