import { PoolHeader } from './PoolHeader';

describe('Pool page / Header', () => {
  it('should render Pool Header', () => {
    cy.viewport(800, 500);
    cy.mount(<PoolHeader />);
    cy.get('#app').should('include.text', 'TEST_POOL');
  });
});
