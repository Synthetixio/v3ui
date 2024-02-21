it('shows homepage to a connected wallet', () => {
  cy.on('window:before:load', (win) => {
    win.sessionStorage.TERMS_CONDITIONS_ACCEPTED = 'true';
    win.localStorage.setItem('connectedWallets', '"MetaMask"');
  });
  cy.connectWallet().then(({ address }) => {
    cy.viewport(1100, 900);

    cy.visit('/');

    cy.get('[data-testid="user-wallet-address"]').contains('0x');
    cy.get('[data-testid="user-menu-button"]').click();
    cy.get('[data-testid="copy-user-wallet-address"]').click();
    cy.assertValueCopiedToClipboard(address);
  });
});
