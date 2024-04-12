it('Deposit - First Time', () => {
  cy.on('window:before:load', (win) => {
    win.sessionStorage.TERMS_CONDITIONS_ACCEPTED = 'true';
  });
  cy.connectWallet().then((wallet) => {
    cy.task('setEthBalance', { address: wallet.address, balance: 2 });
    cy.task('approveCollateral', { privateKey: wallet._signingKey().privateKey, symbol: 'WETH' });
    cy.task('wrapEth', { privateKey: wallet._signingKey().privateKey, amount: 1 });
  });
  cy.viewport(1200, 900);
  cy.visit('#/pools');
  cy.get('[data-cy="pools-deposit-button"]').click();
  cy.url().should('include', 'tabAction=firstDeposit&tab=0');
  cy.url().should('include', 'manage');
  cy.url().should('not.include', 'deposit/');
  cy.get('[data-cy="manage-input-balance-max-button"]').contains('2.00');
  cy.get('[data-cy="manage-input"]').type('1');
  cy.get('[data-cy="position-overview-collateral"]').contains('0.00 WETH');
  cy.get('[data-cy="position-overview-collateral-arrow"]').contains('1.00 WETH');
  cy.get('[data-cy="manage-input-ui-button"]').click();
  cy.task('mineBlock');
  cy.get('[data-cy="sign-transaction-button"]').click();
  cy.task('mineBlock');
  cy.task('mineBlock');
  cy.get('[data-cy="sign-transaction-button"]').click();
  cy.task('mineBlock');
  cy.get('[data-cy="sign-transaction-button"]').click();
  cy.task('mineBlock');
  // cy.get('@wallet').then((wallet) => {
  // });
});
