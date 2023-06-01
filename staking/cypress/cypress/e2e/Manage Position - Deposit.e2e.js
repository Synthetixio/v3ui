import { generatePath } from 'react-router-dom';

it('should deposit additional SNX collateral', () => {
  cy.on('window:before:load', (win) => {
    win.sessionStorage.TERMS_CONDITIONS_ACCEPTED = 'true';
  });
  cy.connectWallet().then(({ address, privateKey }) => {
    cy.task('setEthBalance', { address, balance: 100 });
    cy.task('getSnx', { address, amount: 100 });
    cy.task('approveCollateral', { privateKey, symbol: 'SNX' });
    cy.task('createAccount', { privateKey }).then((accountId) => {
      cy.wrap(accountId).as('accountId');
      cy.task('depositCollateral', { privateKey, symbol: 'SNX', accountId, amount: 20 });
      cy.task('delegateCollateral', {
        privateKey,
        symbol: 'SNX',
        accountId,
        amount: 20,
        poolId: 1,
      });
    });
  });

  cy.viewport(1000, 800);
  cy.get('@accountId').then((accountId) => {
    cy.visit(
      generatePath('/accounts/:accountId/positions/:collateralSymbol/:poolId', {
        accountId,
        collateralSymbol: 'SNX',
        poolId: 1,
      })
    );
  });

  cy.get('[data-testid="manage action"][data-action="deposit"]')
    .should('exist')
    .click()
    .should('have.attr', 'data-active', 'true');
  cy.location().should((loc) => {
    expect(loc.search).to.include('manageAction=deposit');
  });

  cy.get('[data-testid="manage stats collateral"]').should('include.text', '20 SNX');

  cy.get('[data-testid="deposit amount input"]').type('10');

  cy.get('[data-testid="deposit submit"]').should('be.enabled').click();

  cy.get('[data-testid="deposit modal"]')
    .should('exist')
    .and('include.text', 'Complete this action');

  cy.get('[data-testid="deposit modal"]')
    .should('include.text', 'Approve SNX transfer')
    .and('include.text', 'Delegate SNX')
    .and('include.text', 'This will deposit and delegate 10 SNX to TEST_POOL.');

  cy.get('[data-testid="deposit confirm button"]').should('include.text', 'Start').click();

  cy.get('[data-testid="deposit confirm button"]')
    .should('include.text', 'Processing...')
    .and('be.disabled');

  cy.get('[data-testid="deposit confirm button"]')
    .should('include.text', 'Done')
    .and('be.enabled')
    .click();

  cy.get('[data-testid="deposit modal"]').should('not.exist');

  cy.get('[data-testid="manage stats collateral"]').should('include.text', '30 SNX');
});
