import { providers } from 'ethers';

it('Deposit - First Time', () => {
  cy.on('window:before:load', (win) => {
    win.sessionStorage.TERMS_CONDITIONS_ACCEPTED = 'true';
  });

  cy.connectWallet().then(async (wallet) => {
    const provider = new providers.JsonRpcProvider('http://127.0.0.1:8545');
    const network = await provider.getNetwork();
    const isBase = network.chainId === 8453 || network.chainId === 84532;

    cy.task('setEthBalance', { address: wallet.address, balance: 2 });

    if (isBase) {
      cy.task('getUSDC', { address: wallet.address, amount: 500 });
    } else {
      cy.task('approveCollateral', { privateKey: wallet._signingKey().privateKey, symbol: 'WETH' });
      cy.task('wrapEth', { privateKey: wallet._signingKey().privateKey, amount: 1 });
    }

    cy.viewport(1200, 900);
    cy.visit('/');

    // No account yet created
    cy.get('[data-cy="header-balance"]').contains((500).toFixed(2));
    cy.get('[data-cy="asset-wallet-balance"]').contains(`${(500).toFixed(2)} USDC`);

    // Create Account
    cy.get('[data-cy="header-wallet-address-button"]').click();
    cy.get('[data-cy="create-new-account-menu-item"]').click();
    cy.get('[data-cy="header-account-list"]').children().should('have.length', 1);
    cy.get('[data-cy="header-wallet-address-button"]').click();

    // Deposit
    cy.get('[data-cy="assets-deposit-button"]').click();
    cy.url().should('include', '/positions/');

    if (isBase) {
      cy.get('[data-cy="manage-position-title"]').contains('USDC Liquidity Position');
    } else {
      // Handle OP Case
    }

    // Debt and Collateral are 0
    cy.get('[data-cy="manage-stats-collateral-value"]').contains('0');
    cy.get('[data-cy="manage-stats-debt-value"]').contains('$0');

    // cy.get('[data-cy="pools-deposit-button"]').click();
    // cy.url().should('include', 'tabAction=firstDeposit&tab=0');
    // cy.url().should('include', 'manage');

    // if (isBase) {
    //   cy.get('[data-cy="manage-input-balance-max-button"]').contains('500.00');
    //   cy.get('[data-cy="manage-input"]').type('101');
    //   cy.get('[data-cy="position-overview-collateral"]').contains('0.00 USDC');
    //   cy.get('[data-cy="position-overview-collateral-arrow"]').contains('101.00 USDC');
    //   cy.get('[data-cy="manage-input-ui-button"]').click();
    //   cy.wait(1000);
    // } else {
    //   cy.get('[data-cy="manage-input"]').type('1');
    //   cy.get('[data-cy="position-overview-collateral"]').contains('0.00 WETH');
    //   cy.get('[data-cy="position-overview-collateral-arrow"]').contains('1.00 WETH');
    //   cy.get('[data-cy="manage-input-ui-button"]').click();
    //   cy.wait(1000);
    // }

    // cy.task('mineBlock');
    // cy.get('[data-cy="sign-transaction-button"]').click();
    // cy.get('[data-cy="liquidity-position-successfully-button"]').click();
    // cy.get('[data-cy="tab-button-debt"]').should('exist');
    // cy.get('[data-cy="tab-actions-button-repay"]').should('exist');
  });
});
