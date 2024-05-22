import { providers } from 'ethers';

it('Redeposit', () => {
  cy.on('window:before:load', (win) => {
    win.sessionStorage.TERMS_CONDITIONS_ACCEPTED = 'true';
  });
  cy.connectWallet().then(async (wallet) => {
    const provider = new providers.JsonRpcProvider('http://127.0.0.1:8545');
    const network = await provider.getNetwork();
    const isBase = network.chainId === 8453 || network.chainId === 84532;
    cy.task('setEthBalance', { address: wallet.address, balance: 3 });
    if (isBase) {
      cy.task('getSUSDC', { address: wallet.address, amount: 500 });
    } else {
      cy.task('approveCollateral', { privateKey: wallet._signingKey().privateKey, symbol: 'WETH' });
      cy.task('wrapEth', { privateKey: wallet._signingKey().privateKey, amount: 1 });
    }
    cy.viewport(1200, 900);
    cy.visit('#/pools');
    cy.get('[data-cy="pools-deposit-button"]').click();
    cy.url().should('include', 'tabAction=firstDeposit&tab=0');
    cy.url().should('include', 'manage');
    if (isBase) {
      cy.get('[data-cy="manage-input-balance-max-button"]').contains('500.00');
      cy.get('[data-cy="manage-input"]').type('101');
      cy.get('[data-cy="position-overview-collateral"]').contains('0.00 USDC');
      cy.get('[data-cy="position-overview-collateral-arrow"]').contains('101.00 USDC');
      cy.get('[data-cy="manage-input-ui-button"]').click();
      cy.wait(1000);
    } else {
      cy.get('[data-cy="manage-input"]').type('1');
      cy.get('[data-cy="position-overview-collateral"]').contains('0.00 WETH');
      cy.get('[data-cy="position-overview-collateral-arrow"]').contains('1.00 WETH');
      cy.get('[data-cy="manage-input-ui-button"]').click();
      cy.wait(1000);
    }
    cy.task('mineBlock');
    cy.get('[data-cy="sign-transaction-button"]').click();
    cy.get('[data-cy="liquidity-position-successfully-button"]').click();
    cy.get('[data-cy="tab-button-collateral"]').click();
    cy.get('[data-cy="collateral-action-deposit"]').click();
    if (isBase) {
      cy.get('[data-cy="manage-input"]').type('101');
      cy.get('[data-cy="position-overview-collateral"]').contains('101.00 USDC');
      cy.get('[data-cy="position-overview-collateral-arrow"]').contains('202.00 USDC');
      cy.get('[data-cy="manage-input-ui-button"]').click();
      cy.wait(1000);
    } else {
      cy.get('[data-cy="manage-input"]').type('0.5');
      cy.get('[data-cy="position-overview-collateral"]').contains('1.00 WETH');
      cy.get('[data-cy="position-overview-collateral-arrow"]').contains('1.50 WETH');
      cy.get('[data-cy="manage-input-ui-button"]').click();
      cy.wait(1000);
      cy.task('mineBlock');
      cy.get('[data-cy="sign-transaction-button"]').click();
      cy.wait(1000);
      cy.task('mineBlock');
      cy.get('[data-cy="sign-transaction-button"]').click();
    }
    cy.get('[data-cy="liquidity-position-successfully-button"]').click();
    cy.get('[data-cy="tab-button-collateral"]').click();
    cy.get('[data-cy="collateral-action-deposit"]').click();
  });
});
