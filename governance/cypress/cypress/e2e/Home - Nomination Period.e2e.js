it('shows council card and header in nomination period', () => {
  cy.on('window:before:load', (win) => {
    win.sessionStorage.TERMS_CONDITIONS_ACCEPTED = 'true';
    win.localStorage.setItem('connectedWallets', '["MetaMask"]');
    win.localStorage.setItem('defaultWallet', '"MetaMask"');
  });
  cy.connectWallet().then((signer) => {
    cy.task('setEthBalance', { address: signer.address, balance: 100 });
    cy.task('setToNominationPeriod');
  });
  cy.viewport(1100, 900);
  cy.visit('/');
  cy.get('[data-testid="period-countdown"]').contains('Voting starts');
});
