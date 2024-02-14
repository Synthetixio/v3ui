import { RewardsModal } from './RewardsModal';
import injectedModule from '@web3-onboard/injected-wallets';
import { init, Web3OnboardProvider } from '@web3-onboard/react';

const onboard = init({ wallets: [injectedModule()], chains: [{ id: 1 }] });

describe('RewardsModal', () => {
  it('renders the component with the correct data', () => {
    const props = {
      collateralSymbol: 'ETH',
      amount: 100,
      txnStatus: 'prompting',
      txnHash: '0x123456789abcdef',
    };

    cy.mount(
      <Web3OnboardProvider web3Onboard={onboard}>
        <RewardsModal {...props} />
      </Web3OnboardProvider>
    );

    // Add assertions based on your component's UI.
    // For example, you can check if the modal content is displayed.
    cy.contains('Transaction Pending').should('exist');
    cy.contains('Claiming 100 ETH').should('exist');
    cy.contains('View Transaction').should('exist');
  });
});
