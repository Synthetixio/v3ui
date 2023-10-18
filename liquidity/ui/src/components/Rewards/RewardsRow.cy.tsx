import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RewardsRow } from './RewardsRow'; // Replace with the actual path to your component
import { Table } from '@chakra-ui/react';

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
      <QueryClientProvider client={queryClient}>
        <Table>
          <RewardsRow {...props} />
        </Table>
      </QueryClientProvider>
    );

    // Continue with your assertions and interactions
  });
});
