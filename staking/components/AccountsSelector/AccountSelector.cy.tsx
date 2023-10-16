import { AccountsSelectorUi } from './AccountsSelector';

describe('AccountsSelectorUi', () => {
  it('should display account id shortened', () => {
    cy.viewport(200, 50);
    cy.mount(
      <AccountsSelectorUi
        createAccount={() => {
          return;
        }}
        isLoading={false}
        accountId="omg very long account id string"
      />
    );
    cy.get(`[data-testid="current account id"]`).should('include.text', 'omg...ing');
  });

  it('should not shorten short', () => {
    cy.viewport(200, 50);
    cy.mount(
      <AccountsSelectorUi
        isLoading={false}
        createAccount={() => {
          return;
        }}
        accountId="short"
      />
    );
    cy.get(`[data-testid="current account id"]`).should('include.text', 'short');
  });
});
