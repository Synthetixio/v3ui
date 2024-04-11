it('Deposit - First Time', () => {
  cy.on('window:before:load', (win) => {
    win.sessionStorage.TERMS_CONDITIONS_ACCEPTED = 'true';
  });
  cy.connectWallet().then((wallet) => {
    cy.task('setEthBalance', { address: wallet.address, balance: 100 });
  });
  cy.viewport(1200, 900);
  cy.visit('#/pools');
  cy.get('[data-cy="pools-deposit-button"]').click();
  cy.url().should('include', 'tabAction=firstDeposit&tab=0');
  cy.url().should('include', 'manage');
  cy.url().should('not.include', 'deposit/');
  cy.get('[data-cy="manage-input-balance-max-button"]').contains('100.00');
  cy.get('[data-cy="manage-input"]').type('1');
  cy.get('[data-cy="position-overview-collateral"]').contains('0.00 WETH');
  cy.get('[data-cy="position-overview-collateral-arrow"]').contains('1.00 WETH');
  cy.get('[data-cy="manage-input-ui-button"]').click();

  //BUG state is not updating, we stuck in account creation page
  cy.get('[data-cy="create-account-button"]').click();
  cy.wait(1000);
  cy.get('[data-cy="account-created-button"]').click();
  cy.get('[data-cy="sign-transaction-button"]').click();
  cy.wait(5000);
  cy.get('[data-cy="sign-transaction-button"]').click();
  cy.wait(5000);
  cy.get('[data-cy="sign-transaction-button"]').click();
  // cy.get('@wallet').then((wallet) => {
  // });
});
