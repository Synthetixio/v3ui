import { RewardsModal } from './RewardsModal';
import injectedModule from '@web3-onboard/injected-wallets';
import { init, Web3OnboardProvider } from '@web3-onboard/react';

describe('RewardsModal', () => {
  it('should render RewardsModal', () => {
    const onboard = init({
      wallets: [injectedModule()],
      chains: [{ id: 1 }],
    });

    cy.mount(
      <Web3OnboardProvider web3Onboard={onboard}>
        <RewardsModal
          collateralSymbol="ETH"
          amount={100}
          txnStatus="prompting"
          txnHash="0x123456789abcdef"
        />
      </Web3OnboardProvider>
    );

    // Add assertions based on your component's UI.
    // For example, you can check if the modal content is displayed.
    cy.contains('Claiming Rewards').should('exist');
    cy.contains('Claiming 100 ETH').should('exist');
    cy.contains('View Transaction').should('exist');
  });
});
