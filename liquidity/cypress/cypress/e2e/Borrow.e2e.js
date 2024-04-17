import { providers } from 'ethers';

it('Borrow', () => {
  cy.on('window:before:load', (win) => {
    win.sessionStorage.TERMS_CONDITIONS_ACCEPTED = 'true';
  });
  cy.connectWallet().then(async (wallet) => {
    const provider = new providers.JsonRpcProvider('http://127.0.0.1:8545');
    const network = await provider.getNetwork();
    const isBase = network.chainId === 8453 || network.chainId === 84532;
    // cant borrow on andromeda
    if (isBase) return;
    cy.task('setEthBalance', { address: wallet.address, balance: 2 });
    cy.task('mineBlock');
    cy.task('approveCollateral', { privateKey: wallet._signingKey().privateKey, symbol: 'WETH' });
    cy.task('mineBlock');
    cy.task('wrapEth', { privateKey: wallet._signingKey().privateKey, amount: 1 });
    cy.task('mineBlock');
    cy.task('createAccount', {
      privateKey: wallet._signingKey().privateKey,
    }).then((accountId) => {
      cy.task('mineBlock');
      cy.task('depositCollateral', {
        privateKey: wallet._signingKey().privateKey,
        amount: 1,
        symbol: 'WETH',
        accountId,
      });
      cy.task('mineBlock');
      cy.task('delegateCollateral', {
        privateKey: wallet._signingKey().privateKey,
        amount: 1,
        accountId,
        poolId: 1,
        symbol: 'WETH',
      });
      cy.viewport(1200, 900);
      cy.visit('/');
      cy.task('mineBlock');
      cy.get('[data-cy="manage-position-row-button"]').click();
      cy.get('[data-cy="tab-button-debt"]').click();
      cy.get('[data-cy="tab-actions-button-borrow"]').click();
      cy.get('[data-cy="manage-input-ui-max-button"]').click();
      cy.get('[data-cy="manage-input-ui-button"]').click();
      cy.task('mineBlock');
      cy.get('[data-cy="sign-transaction-button"]').click();
      cy.get('[data-cy="liquidity-position-successfully-button"]').click();
      cy.get('[data-cy="tab-actions-button-borrow"]').should('exist');
      cy.get('[data-cy="position-overview-debt"]').should('not.contain', '0.00');
    });
  });
});
