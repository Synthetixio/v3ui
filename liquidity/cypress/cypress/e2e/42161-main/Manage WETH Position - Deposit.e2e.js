import { generatePath } from 'react-router-dom';

it('should deposit additional WETH collateral', () => {
  cy.connectWallet().then(({ address, privateKey }) => {
    cy.task('setEthBalance', { address, balance: 100 });
    cy.task('wrapEth', { privateKey: privateKey, amount: 50 });
    cy.task('approveCollateral', { privateKey: privateKey, symbol: 'WETH' });
    cy.task('createAccount', { privateKey }).then((accountId) => {
      cy.wrap(accountId).as('accountId');
    });
  });

  cy.get('@accountId').then(async (accountId) => {
    const path = generatePath('/positions/:collateralSymbol/:poolId', {
      collateralSymbol: 'WETH',
      poolId: 1,
    });
    cy.visit(`/#${path}?manageAction=deposit&accountId=${accountId}`);
    cy.wait(1000);
  });

  // Delegate first 10 WETH
  cy.get('[data-cy="manage stats collateral"]').should('include.text', '0 WETH');
  cy.get('[data-cy="manage action"][data-action="deposit"]').click();
  cy.get('[data-cy="deposit amount input"]').type('10');
  cy.get('[data-cy="deposit submit"]').should('be.enabled').click();
  cy.get('[data-cy="deposit-modal"]').should('exist').and('include.text', 'Complete this action');
  cy.get('[data-cy="deposit-modal"]')
    .should('include.text', 'Approve WETH transfer')
    .and('include.text', 'Delegate WETH')
    .and('include.text', 'This will deposit and delegate 10 WETH to Spartan Council Pool.');
  cy.get('[data-cy="deposit-confirm-button"]').should('include.text', 'Start').click();
  cy.get('[data-cy="deposit-confirm-button"]')
    .should('include.text', 'Done')
    .and('be.enabled')
    .click();
  cy.get('[data-cy="deposit-modal"]').should('not.exist');
  cy.get('[data-cy="manage stats collateral"]').should('include.text', '10 WETH');

  // Delegate 10 more to have 20
  cy.get('[data-cy="manage action"][data-action="deposit"]').click();
  cy.get('[data-cy="deposit amount input"]').type('10');
  cy.get('[data-cy="deposit submit"]').should('be.enabled').click();
  cy.get('[data-cy="deposit-modal"]').should('exist').and('include.text', 'Complete this action');
  cy.get('[data-cy="deposit-modal"]')
    .should('include.text', 'Approve WETH transfer')
    .and('include.text', 'Delegate WETH')
    .and('include.text', 'This will deposit and delegate 10 WETH to Spartan Council Pool.');
  cy.get('[data-cy="deposit-confirm-button"]').should('include.text', 'Start').click();
  cy.get('[data-cy="deposit-confirm-button"]')
    .should('include.text', 'Done')
    .and('be.enabled')
    .click();
  cy.get('[data-cy="deposit-modal"]').should('not.exist');
  cy.get('[data-cy="manage stats collateral"]').should('include.text', '20 WETH');

  // Delegate 10 more to have 30
  cy.get('[data-cy="[data-cy="manage action"][data-action="deposit"]').click();
  cy.get('[data-cy="deposit amount input"]').type('10');
  cy.get('[data-cy="deposit submit"]').should('be.enabled').click();
  cy.get('[data-cy="deposit-modal"]').should('exist').and('include.text', 'Complete this action');
  cy.get('[data-cy="deposit-modal"]')
    .should('include.text', 'Approve WETH transfer')
    .and('include.text', 'Delegate WETH')
    .and('include.text', 'This will deposit and delegate 10 WETH to Spartan Council Pool.');
  cy.get('[data-cy="deposit-confirm-button"]').should('include.text', 'Start').click();
  cy.get('[data-cy="deposit-confirm-button"]')
    .should('include.text', 'Done')
    .and('be.enabled')
    .click();
  cy.get('[data-cy="deposit-modal"]').should('not.exist');
  cy.get('[data-cy="manage stats collateral"]').should('include.text', '30 WETH');

  // Delegate 10 more to have 40
  cy.get('[data-cy="deposit amount input"]').type('10');
  cy.get('[data-cy="deposit submit"]').should('be.enabled').click();
  cy.get('[data-cy="deposit-modal"]').should('exist').and('include.text', 'Complete this action');
  cy.get('[data-cy="deposit-modal"]')
    .should('include.text', 'Approve WETH transfer')
    .and('include.text', 'Delegate WETH')
    .and('include.text', 'This will deposit and delegate 10 WETH to Spartan Council Pool.');
  cy.get('[data-cy="deposit-confirm-button"]').should('include.text', 'Start').click();
  cy.get('[data-cy="deposit-confirm-button"]')
    .should('include.text', 'Done')
    .and('be.enabled')
    .click();
  cy.get('[data-cy="deposit-modal"]').should('not.exist');
  cy.get('[data-cy="manage stats collateral"]').should('include.text', '40 WETH');
});
