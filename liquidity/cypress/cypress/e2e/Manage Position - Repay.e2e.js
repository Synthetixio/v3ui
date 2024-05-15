import { generatePath } from 'react-router-dom';

it('should repay borrowed snxUSD and get back SNX collateral', () => {
  cy.on('window:before:load', (win) => {
    win.sessionStorage.TERMS_CONDITIONS_ACCEPTED = 'true';
  });

  cy.task('isBase').then((isBase) => {
    if (isBase) {
      return;
    } else {
      cy.connectWallet().then(({ address, privateKey }) => {
        cy.task('setEthBalance', { address, balance: 105 });

        cy.task('approveCollateral', { privateKey: privateKey, symbol: 'WETH' });
        cy.task('wrapEth', { privateKey: privateKey, amount: 20 });

        cy.task('createAccount', { privateKey }).then((accountId) => {
          cy.wrap(accountId).as('accountId');
          cy.task('depositCollateral', {
            privateKey,
            symbol: 'WETH',
            accountId,
            amount: 10,
          });
          cy.task('delegateCollateral', {
            privateKey,
            symbol: 'WETH',
            accountId,
            amount: 10,
            poolId: 1,
          });
          cy.task('borrowUsd', {
            privateKey,
            symbol: 'WETH',
            accountId,
            amount: 10,
            poolId: 1,
          }).then((debt) => cy.wrap(debt).as('debt'));
        });
      });

      cy.viewport(1000, 800);

      cy.get('@accountId').then((accountId) => {
        const path = generatePath('/positions/:collateralSymbol/:poolId', {
          collateralSymbol: 'WETH',
          poolId: 1,
        });
        cy.visit(`/#${path}?manageAction=repay&accountId=${accountId}`);
      });

      cy.get('[data-cy="manage-action-repay"]').click();

      cy.wait(5000);
      // Need to wait for max repay amount to be fetched
      cy.get('[data-testid="repay amount input"]')
        .should('have.attr', 'data-max')
        .and('not.match', /^0\.00/); // .and ensures both assertions are waiting for resolution

      cy.get('@debt').then((debt) => {
        cy.get('[data-testid="repay amount input"]').type(`${debt}`);
      });

      cy.get('[data-testid="repay submit"]').should('be.enabled').click();

      cy.get('[data-testid="repay modal"]')
        .should('exist')
        .and('include.text', 'Complete this action');
      cy.get('[data-testid="repay modal"]')
        .should('exist')
        .and('include.text', 'Approve sUSD transfer');

      cy.get('@debt').then((debt) => {
        cy.get('[data-testid="repay modal"]').should('include.text', `Repay ${debt} sUSD`);
      });

      // Repay
      cy.get('[data-testid="repay confirm button"]').should('include.text', 'Start').click();
      cy.get('[data-testid="repay confirm button"]')
        .should('include.text', 'Processing...')
        .and('be.disabled');

      cy.get('[data-testid="repay confirm button"]')
        .should('include.text', 'Done')
        .and('be.enabled')
        .click();

      cy.get('[data-testid="repay modal"]').should('not.exist');

      cy.get('[data-cy="manage-stats-debt-value"]').should('have.text', `$0`);
    }
  });
});
