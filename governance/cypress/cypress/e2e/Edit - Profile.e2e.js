it('should let user edit their profile', () => {
  cy.connectWallet();
  cy.viewport(1300, 900);
  cy.visit('/');
  cy.get("[data-cy='header-wallet-address-button']").click();
  cy.get("[data-cy='edit-profile-button-link-header']").click();

  cy.get("[data-cy='username-input']").type('test username');
  cy.get("[data-cy='username-preview']").contains('test username');

  cy.get("[data-cy='about-input']").type('its me, the test account');
  cy.get("[data-cy='about-preview']").contains('its me, the test account');

  cy.get("[data-cy='discord-input']").type('kaiynne');
  cy.get("[data-cy='discord-social-link']").should(
    'have.attr',
    'href',
    'https://discord.com/user/kaiynne'
  );

  cy.get("[data-cy='twitter-input']").type('kaiynne');
  cy.get("[data-cy='twitter-social-link']").should('have.attr', 'href', 'https://x.com/kaiynne');

  cy.get("[data-cy='github-input']").type('kaiynne');
  cy.get("[data-cy='github-social-link']").should(
    'have.attr',
    'href',
    'https://github.com/kaiynne'
  );

  cy.get("[data-cy='governance-pitch-input']").type('sup its me kaiynne');
  cy.get("[data-cy='governance-pitch-preview']").contains('sup its me kaiynne');
  cy.get("[data-cy='save-profile-changes-button']").should('exist');
});
