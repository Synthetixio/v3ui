import { generatePath } from 'react-router-dom';

it('should withdraw borrowed snxUSD and get back SNX collateral', () => {
  cy.on('window:before:load', (win) => {
    win.sessionStorage.TERMS_CONDITIONS_ACCEPTED = 'true';
  });

  cy.connectWallet().then(({ address, privateKey }) => {
    cy.task('setEthBalance', { address, balance: 100 });
    cy.task('getSnx', { address, amount: 100_500 });
    cy.task('approveCollateral', { privateKey, symbol: 'SNX' });
    cy.task('createAccount', { privateKey }).then((accountId) => {
      cy.wrap(accountId).as('accountId');
      cy.task('depositCollateral', { privateKey, symbol: 'SNX', accountId, amount: 100_500 });
      cy.task('delegateCollateral', {
        privateKey,
        symbol: 'SNX',
        accountId,
        amount: 100_500,
        poolId: 1,
      });
    });
  });

  cy.viewport(1000, 800);
  cy.get('@accountId').then((accountId) => {
    const path = generatePath('/positions/:collateralSymbol/:poolId', {
      collateralSymbol: 'SNX',
      poolId: 1,
    });
    cy.visit(`${path}?manageAction=undelegate&accountId=${accountId}`);
  });

  // Need to wait for max undelegate amount to be fetched
  cy.get('[data-testid="undelegate amount input"]')
    .should('have.attr', 'data-max')
    .and('not.match', /^0\.00/); // .and ensures both assertions are waiting for resolution

  // on Undelegate page we still show `-` for yet unfetched data, unlike Borrow/Repay
  cy.get('[data-testid="available to undelegate"]').should('not.have.text', '-');

  // undelegate only half of the collateral provided
  cy.get('[data-testid="undelegate amount input"]').type('500');

  cy.get('[data-testid="undelegate submit"]').should('be.enabled').click();

  cy.get('[data-testid="undelegate modal"]')
    .should('exist')
    .and('include.text', 'Complete this action');

  cy.get('[data-testid="undelegate modal"]')
    .should('include.text', `Remove collateral`)
    .and('include.text', `500 SNX will be removed`);

  cy.get('[data-testid="undelegate confirm button"]').should('include.text', 'Start').click();

  cy.get('[data-testid="undelegate confirm button"]')
    .should('include.text', 'Processing...')
    .and('be.disabled');

  cy.get('[data-testid="undelegate confirm button"]')
    .should('include.text', 'Done')
    .and('be.enabled')
    .click();

  cy.get('[data-testid="undelegate modal"]').should('not.exist');

  cy.get('[data-testid="manage stats collateral"]').should('include.text', `100,000 SNX`);
  // cy.get('[data-testid="available to undelegate"]').should('have.text', '100,000 SNX');

  // Assert that we have 500 snx to withdraw, even though it's still blocked by timeout
  cy.visit(`/`);
  cy.get('[data-testid="available collateral row"]').should('include.text', `500 SNX`);
});
