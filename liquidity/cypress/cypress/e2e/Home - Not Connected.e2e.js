it('shows homepage to not connected wallet', () => {
  cy.on('window:before:load', (win) => {
    win.sessionStorage.TERMS_CONDITIONS_ACCEPTED = 'true';
  });

  cy.visit('/');

  cy.get('#app').should('contain', 'Not Connected');
});
