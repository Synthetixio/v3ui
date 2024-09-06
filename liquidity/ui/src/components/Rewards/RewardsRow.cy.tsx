import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RewardsRow } from './RewardsRow'; // Replace with the actual path to your component
import { Table } from '@chakra-ui/react';
import injectedModule from '@web3-onboard/injected-wallets';
import { init, Web3OnboardProvider } from '@web3-onboard/react';

describe('RewardsRow', () => {
  it('should render RewardsRow', () => {
    const onboard = init({
      wallets: [injectedModule()],
      chains: [{ id: 1 }],
    });
    const queryClient = new QueryClient();
    cy.mount(
      <Web3OnboardProvider web3Onboard={onboard}>
        <QueryClientProvider client={queryClient}>
          <Table>
            <RewardsRow
              symbol="ETH"
              claimableAmount={50}
              lifetimeClaimed={25}
              address="0x123456789abcdef"
            />
          </Table>
        </QueryClientProvider>
      </Web3OnboardProvider>
    );
  });
});
