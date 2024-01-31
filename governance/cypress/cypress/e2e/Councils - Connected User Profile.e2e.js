it('shows user profile card', () => {
  cy.on('window:before:load', (win) => {
    win.sessionStorage.TERMS_CONDITIONS_ACCEPTED = 'true';
    win.localStorage.setItem('connectedWallets', '["MetaMask"]');
    win.localStorage.setItem('defaultWallet', '"MetaMask"');
  });
  cy.connectWallet().then(({ address }) => {
    cy.viewport(1100, 900);

    cy.visit('/#/councils/spartan?view=' + address);
    cy.get('[data-cy="user-wallet-profile-address"]').contains(
      address
        .substring(0, 4)
        .concat('...')
        .concat(address.substring(address.length - 4))
    );
  });
});
