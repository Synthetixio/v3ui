import { generatePath } from 'react-router-dom';

it('should repay borrowed snxUSD and get back SNX collateral', () => {
  cy.on('window:before:load', (win) => {
    win.sessionStorage.TERMS_CONDITIONS_ACCEPTED = 'true';
  });
  cy.connectWallet().then(({ address, privateKey }) => {
    cy.task('setEthBalance', { address, balance: 100 });
    cy.task('getSnx', { address, amount: 20 });
    cy.task('approveCollateral', { privateKey, symbol: 'SNX' });
    cy.task('createAccount', { privateKey }).then((accountId) => {
      cy.wrap(accountId).as('accountId');
      cy.task('depositCollateral', { privateKey, symbol: 'SNX', accountId, amount: 10 });
      cy.task('delegateCollateral', {
        privateKey,
        symbol: 'SNX',
        accountId,
        amount: 10,
        poolId: 1,
      });
      cy.task('borrowUsd', {
        privateKey,
        symbol: 'SNX',
        accountId,
        amount: 10,
        poolId: 1,
      }).then((debt) => cy.wrap(debt).as('debt'));
    });
  });

  cy.viewport(1000, 800);
  cy.get('@accountId').then((accountId) => {
    const path = generatePath('/accounts/:accountId/positions/:collateralSymbol/:poolId', {
      accountId,
      collateralSymbol: 'SNX',
      poolId: 1,
    });
    cy.visit(`${path}?manageAction=repay`);
  });

  // Need to wait for max repay amount to be fetched
  cy.get('[data-testid="repay amount input"]')
    .should('have.attr', 'data-max')
    .and('not.match', /^0\.00/); // .and ensures both assertions are waiting for resolution

  // Unfortunatrly on Borrow and Repay we default to 0 and no longer show `-` for unfetched data
  //  cy.get('[data-testid="current debt"]').should('not.have.text', '-');
  //  cy.get('[data-testid="available snxUSD balance"]').should('not.have.text', '-');

  cy.get('@debt').then((debt) => {
    cy.get('[data-testid="repay amount input"]').type(`${debt}`);
  });

  cy.get('[data-testid="repay submit"]').should('be.enabled').click();

  cy.get('[data-testid="repay modal"]').should('exist').and('include.text', 'Complete this action');

  cy.get('@debt').then((debt) => {
    cy.get('[data-testid="repay modal"]').should('include.text', `Repay ${debt} snxUSD`);
  });

  cy.get('[data-testid="repay confirm button"]').should('include.text', 'Start').click();

  cy.get('[data-testid="repay confirm button"]')
    .should('include.text', 'Processing...')
    .and('be.disabled');

  cy.get('[data-testid="repay confirm button"]')
    .should('include.text', 'Done')
    .and('be.enabled')
    .click();

  cy.get('[data-testid="repay modal"]').should('not.exist');

  cy.get('[data-testid="manage stats debt"]').should('have.text', `$0`);
});
