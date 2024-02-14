import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { PoolHeader } from './PoolHeader';
import injectedModule from '@web3-onboard/injected-wallets';
import { init, Web3OnboardProvider } from '@web3-onboard/react';

const onboard = init({ wallets: [injectedModule()], chains: [{ id: 1 }] });

const client = new QueryClient();

describe('Pool page / Header', () => {
  it('should render Pool Header', () => {
    cy.viewport(800, 500);
    cy.mount(
      <Web3OnboardProvider web3Onboard={onboard}>
        <QueryClientProvider client={client}>
          <PoolHeader />
        </QueryClientProvider>
      </Web3OnboardProvider>
    );
    cy.get('#app').should('include.text', 'Unknown Pool');
  });
});
