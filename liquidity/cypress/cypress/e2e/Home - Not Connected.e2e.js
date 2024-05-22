it('Home Not Connected', () => {
  cy.on('window:before:load', (win) => {
    win.sessionStorage.TERMS_CONDITIONS_ACCEPTED = 'true';
  });
  cy.get('[data-cy="current-selected-network"]').contains('Not Connected');
});
