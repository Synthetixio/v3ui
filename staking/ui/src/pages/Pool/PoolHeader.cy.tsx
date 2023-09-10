import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { PoolHeader } from './PoolHeader';

const client = new QueryClient();

describe('Pool page / Header', () => {
  it('should render Pool Header', () => {
    cy.viewport(800, 500);
    cy.mount(
      <QueryClientProvider client={client}>
        <PoolHeader />
      </QueryClientProvider>
    );
    cy.get('#app').should('include.text', 'Unknown Pool');
  });
});
