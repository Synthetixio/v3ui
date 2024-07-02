import { generatePath } from 'react-router-dom';

it.skip('should borrow against WETH position', () => {
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
    });
  });

  cy.viewport(1000, 800);

  cy.get('@accountId').then((accountId) => {
    const path = generatePath('/positions/:collateralSymbol/:poolId', {
      collateralSymbol: 'WETH',
      poolId: 1,
    });
    cy.visit(`/#${path}?manageAction=borrow&accountId=${accountId}`);
  });

  cy.get('[data-cy="manage action"][data-action="borrow"]').click();

  // Need to wait for max borrow amount to be fetched
  cy.get('[data-cy="borrow amount input"]')
    .should('have.attr', 'data-max')
    .and('not.match', /^0\.00/); // .and ensures both assertions are waiting for resolution
  cy.get('[data-cy="borrow amount input"]').type(`100`);

  cy.get('[data-cy="borrow submit"]').should('be.enabled').click();

  cy.get('[data-cy="borrow modal"]').should('exist').and('include.text', 'Complete this action');
  cy.get('[data-cy="borrow modal"]').should('include.text', `Borrow 100`);
  cy.get('[data-cy="borrow confirm button"]').should('include.text', 'Start').click();
  cy.get('[data-cy="borrow confirm button"]')
    .should('include.text', 'Processing...')
    .and('be.disabled');

  cy.get('[data-cy="borrow confirm button"]')
    .should('include.text', 'Done')
    .and('be.enabled')
    .click();

  cy.get('[data-cy="borrow modal"]').should('not.exist');

  cy.get('[data-cy="manage stats debt value"]').should('have.text', `-$100`);
});
