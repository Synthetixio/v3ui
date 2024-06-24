import { generatePath } from 'react-router-dom';

it.skip('should deposit additional USDC collateral', () => {
  cy.connectWallet().then(({ address, privateKey }) => {
    cy.task('setEthBalance', { address, balance: 100 });
    cy.task('getUSDC', { address: address, amount: 500 });
    cy.task('createAccount', { privateKey }).then((accountId) => {
      cy.wrap(accountId).as('accountId');
    });
  });

  cy.get('@accountId').then(async (accountId) => {
    const path = generatePath('/positions/:collateralSymbol/:poolId', {
      collateralSymbol: 'USDC',
      poolId: 1,
    });
    cy.visit(`/#${path}?manageAction=deposit&accountId=${accountId}`);
    cy.wait(1000);
  });

  cy.task('mineBlock');

  cy.get('[data-cy="manage action"][data-action="deposit"]').click();
  cy.get('[data-cy="deposit amount input"]').type('101');
  cy.get('[data-cy="deposit submit"]').should('be.enabled').click();

  cy.get('[data-cy="deposit-modal"]').should('exist').and('include.text', 'Complete this action');

  cy.get('[data-cy="deposit-modal"]')
    .should('include.text', 'Approve USDC transfer')
    .and('include.text', 'Delegate USDC')
    .and('include.text', 'This will deposit and delegate 101 USDC to Spartan Council Pool');

  cy.get('[data-cy="deposit-confirm-button"]').should('include.text', 'Start').click();

  cy.get('[data-cy="deposit-confirm-button"]')
    .should('include.text', 'Done')
    .and('be.enabled')
    .click();

  cy.get('[data-cy="manage stats collateral"]').should('include.text', '101 USDC');
  cy.get('[data-cy="deposit amount input"]').type('101');

  cy.get('[data-cy="deposit submit"]').should('be.enabled').click();

  cy.get('[data-cy="deposit-modal"]').should('exist').and('include.text', 'Complete this action');

  cy.get('[data-cy="deposit-modal"]')
    .should('include.text', 'Approve USDC transfer')
    .and('include.text', 'Delegate USDC')
    .and('include.text', 'This will deposit and delegate 101 USDC to Spartan Council Pool');

  cy.get('[data-cy="deposit-confirm-button"]').should('include.text', 'Start').click();

  cy.get('[data-cy="deposit-confirm-button"]')
    .should('include.text', 'Done')
    .and('be.enabled')
    .click();

  cy.get('[data-cy="deposit-modal"]').should('not.exist');

  cy.get('[data-cy="manage stats collateral"]').should('include.text', '202 USDC');
});
