it('shows homepage to a connected wallet', () => {
  cy.on('window:before:load', (win) => {
    win.sessionStorage.TERMS_CONDITIONS_ACCEPTED = 'true';
  });
  cy.connectWallet().then(({ address }) => {
    cy.task('setEthBalance', { address, balance: 100 });
  });
  cy.viewport(1100, 900);

  cy.visit('/');

  cy.get('#app').should('contain', 'Spartan Council Pool');
});
