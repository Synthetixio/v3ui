import { RewardsModal } from './RewardsModal';

describe('RewardsModal', () => {
  it('renders the component with the correct data', () => {
    const props = {
      collateralSymbol: 'ETH',
      amount: 100,
      txnStatus: 'prompting',
      txnHash: '0x123456789abcdef',
    };

    cy.mount(<RewardsModal {...props} />);

    // Add assertions based on your component's UI.
    // For example, you can check if the modal content is displayed.
    cy.contains('Transaction Pending').should('exist');
    cy.contains('Claiming 100 ETH').should('exist');
    cy.contains('View Transaction').should('exist');
  });
});
