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
    cy.task('approveCollateral', { privateKey: wallet._signingKey().privateKey, symbol: 'WETH' });
    cy.task('wrapEth', { privateKey: wallet._signingKey().privateKey, amount: 1 });
    const accountId = cy.task('createAccount', { privateKey: wallet._signingKey().privateKey });
    cy.task('depositCollateral', {
      privateKey: wallet._signingKey().privateKey,
      amount: 1,
      symbol: 'WETH',
      accountId,
    });
    cy.task('delegateCollateral', {
      privateKey: wallet._signingKey().privateKey,
      amount: 1,
      accountId,
      poolId: 1,
      symbol: 'WETH',
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
    cy.wait(1000);
    cy.task('mineBlock');
    cy.get('[data-cy="sign-transaction-button"]').click();
    cy.get('[data-cy="liquidity-position-successfully-button"]').click();
  });
});
