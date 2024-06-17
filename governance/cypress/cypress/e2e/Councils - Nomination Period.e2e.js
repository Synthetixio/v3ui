it('shows council card and header in nomination period', () => {
  cy.connectWallet().then((signer) => {
    cy.task('setEthBalance', { address: signer.address, balance: 100 });
    cy.task('setToNominationPeriod');
  });
  cy.viewport(1300, 900);
  cy.visit('/#/councils/spartan');
  cy.contains('[data-cy="period-countdown"]', 'Voting starts').should('exist');
});
