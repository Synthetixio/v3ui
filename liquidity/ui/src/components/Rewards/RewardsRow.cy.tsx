import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RewardsRow } from './RewardsRow'; // Replace with the actual path to your component
import { Table } from '@chakra-ui/react';
import injectedModule from '@web3-onboard/injected-wallets';
import { init, Web3OnboardProvider } from '@web3-onboard/react';

const onboard = init({ wallets: [injectedModule()], chains: [{ id: 1 }] });

describe('RewardsRow', () => {
  let queryClient: QueryClient;

  before(() => {
    // Initialize a QueryClient instance before the tests
    queryClient = new QueryClient();
  });

  it('renders the component with the correct data', () => {
    const props = {
      symbol: 'ETH',
      projectedAmount: 100,
      frequency: 3600,
      claimableAmount: 50,
      lifetimeClaimed: 25,
      hasClaimed: false,
      address: '0x123456789abcdef',
      readOnly: false,
      total: 200,
    };

    cy.mount(
      <Web3OnboardProvider web3Onboard={onboard}>
        <QueryClientProvider client={queryClient}>
          <Table>
            <RewardsRow {...props} />
          </Table>
        </QueryClientProvider>
      </Web3OnboardProvider>
    );

    // Continue with your assertions and interactions
  });
});
