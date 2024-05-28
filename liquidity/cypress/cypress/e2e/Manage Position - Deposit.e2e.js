import { generatePath } from 'react-router-dom';

it('should deposit additional collateral', () => {
  cy.on('window:before:load', (win) => {
    win.sessionStorage.TERMS_CONDITIONS_ACCEPTED = 'true';
  });

  cy.task('isBase').then((isBase) => {
    cy.connectWallet().then(({ address, privateKey }) => {
      cy.task('setEthBalance', { address, balance: 100 });
      if (isBase) {
        cy.task('getUSDC', { address: address, amount: 500 });
      } else {
        cy.task('wrapEth', { privateKey: privateKey, amount: 50 });
        cy.task('approveCollateral', { privateKey: privateKey, symbol: 'WETH' });
      }
      cy.task('createAccount', { privateKey }).then((accountId) => {
        cy.wrap(accountId).as('accountId');
      });

      cy.get('@accountId').then(async (accountId) => {
        const path = generatePath('/positions/:collateralSymbol/:poolId', {
          collateralSymbol: isBase ? 'USDC' : 'WETH',
          poolId: 1,
        });
        cy.visit(`/#${path}?manageAction=deposit&accountId=${accountId}`);
        cy.wait(1000);
      });
      cy.task('mineBlock');
      cy.get('[data-cy="manage-action-deposit"]').click();

      cy.wait(5000);

      cy.get('[data-testid="deposit amount input"]').type(isBase ? '101' : '10');

      cy.get('[data-testid="deposit submit"]').should('be.enabled').click();

      cy.get('[data-cy="deposit-modal"]')
        .should('exist')
        .and('include.text', 'Complete this action');

      cy.get('[data-cy="deposit-modal"]')
        .should('include.text', isBase ? 'Approve USDC transfer' : 'Approve WETH transfer')
        .and('include.text', isBase ? 'Delegate USDC' : 'Delegate WETH')
        .and(
          'include.text',
          isBase
            ? 'This will deposit and delegate 101 USDC to Spartan Council Pool'
            : 'This will deposit and delegate 10 WETH to Spartan Council Pool.'
        );

      cy.get('[data-cy="deposit-confirm-button"]').should('include.text', 'Start').click();

      cy.get('[data-cy="deposit-confirm-button"]')
        .should('include.text', 'Done')
        .and('be.enabled')
        .click();

      cy.get('[data-cy="manage stats collateral"]').should(
        'include.text',
        isBase ? '101 USDC' : '10 WETH'
      );

      cy.get('[data-testid="deposit amount input"]').type(isBase ? '101' : '10');

      cy.get('[data-testid="deposit submit"]').should('be.enabled').click();

      cy.get('[data-cy="deposit-modal"]')
        .should('exist')
        .and('include.text', 'Complete this action');

      cy.get('[data-cy="deposit-modal"]')
        .should('include.text', isBase ? 'Approve USDC transfer' : 'Approve WETH transfer')
        .and('include.text', isBase ? 'Delegate USDC' : 'Delegate WETH')
        .and(
          'include.text',
          isBase
            ? 'This will deposit and delegate 101 USDC to Spartan Council Pool'
            : 'This will deposit and delegate 10 WETH to Spartan Council Pool.'
        );

      cy.get('[data-cy="deposit-confirm-button"]').should('include.text', 'Start').click();

      cy.get('[data-cy="deposit-confirm-button"]')
        .should('include.text', 'Done')
        .and('be.enabled')
        .click();

      cy.get('[data-cy="deposit-modal"]').should('not.exist');

      cy.get('[data-cy="manage stats collateral"]').should(
        'include.text',
        isBase ? '202 USDC' : '20 WETH'
      );
    });
  });
});
