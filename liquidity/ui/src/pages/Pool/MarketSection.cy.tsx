import { MarketSectionUi } from './MarketSection';
import { wei } from '@synthetixio/wei';
import { PoolType } from '@snx-v3/usePoolData';

function mockMarket(i: number) {
  return {
    id: `MARKET_${i}`,
    address: 'MARKET_ADDRESS',
    usd_deposited: wei('10000'),
    usd_withdrawn: wei('9000'),
    net_issuance: wei('1000'),
    reported_debt: wei('100'),
    pnl: wei('0.2'),
    updated_at: 'updated at for 2',
    market_snapshots_by_week: [
      {
        id: '2',
        usd_deposited: wei('10000'),
        usd_withdrawn: wei('9000'),
        net_issuance: wei('1000'),
        reported_debt: wei('100'),
        pnl: wei('0.2'),
        updated_at: 'updated at for 2',
        updates_in_period: '2',
      },
      {
        id: '1',
        usd_withdrawn: wei('1000'),
        usd_deposited: wei('1500'),
        net_issuance: wei('500'),
        reported_debt: wei('50'),
        pnl: wei('0.1'),
        updated_at: 'updated at for 1',
        updates_in_period: '2',
      },
    ],
  };
}

describe('Pool page / Market section', () => {
  it('should render without markets', () => {
    cy.viewport(800, 500);
    cy.mount(
      <MarketSectionUi
        poolId="POOL_ID"
        poolDataFetched={true}
        poolData={{
          id: 'POOL_ID',
          name: 'POOL_NAME',
          total_weight: null,
          configurations: [],
          registered_distributors: [],
        }}
      />
    );
    cy.get('#app')
      .should('include.text', 'Markets')
      .and('include.text', 'No markets configured for the pool');
  });

  it('should render when pool does not exist', () => {
    cy.viewport(800, 500);
    cy.mount(<MarketSectionUi poolId="POOL_ID" poolDataFetched={true} />);
    cy.get('#app').and('include.text', 'Pool with id: POOL_ID does not exist');
  });

  it('should render when pool has incomplete data', () => {
    cy.viewport(800, 500);
    cy.mount(
      <MarketSectionUi
        poolId="POOL_ID"
        poolDataFetched={true}
        poolData={{
          id: 'POOL_ID',
          name: 'POOL_NAME',
          total_weight: null,
          registered_distributors: [],
          configurations: [
            {
              id: 'MARKET_ID',
              market: {
                id: 'MARKET_ID',
                address: 'MARKET_ADDRESS',
                usd_deposited: wei('0'),
                usd_withdrawn: wei('0'),
                net_issuance: wei('0'),
                reported_debt: wei('0'),
                pnl: wei('0'),
                updated_at: 'market creation date',
                market_snapshots_by_week: [],
              },
              weight: wei('10'),
              max_debt_share_value: wei('50'),
            },
          ],
        }}
      />
    );
    cy.get('[data-testid="market name"]').and('have.text', '-');
    cy.get('[data-testid="pool allocation"]').and('have.text', '-');
  });

  it('should render one snapshot', () => {
    cy.viewport(800, 500);
    cy.mount(
      <MarketSectionUi
        poolId="POOL_ID"
        poolDataFetched={true}
        poolData={{
          id: 'POOL_ID',
          name: 'POOL_NAME',
          registered_distributors: [],
          total_weight: wei(10),
          configurations: [
            {
              id: 'MARKET_ID',
              market: {
                id: 'MARKET_ID',
                address: 'MARKET_ADDRESS',
                usd_deposited: wei('10000'),
                usd_withdrawn: wei('9000'),
                net_issuance: wei('1000'),
                reported_debt: wei('100'),
                pnl: wei('0.2'),
                updated_at: 'updated at for 2',
                market_snapshots_by_week: [
                  {
                    id: '2',
                    usd_deposited: wei('10000'),
                    usd_withdrawn: wei('9000'),
                    net_issuance: wei('1000'),
                    reported_debt: wei('100'),
                    pnl: wei('0.2'),
                    updated_at: 'updated at for 2',
                    updates_in_period: '2',
                  },
                ],
              },
              weight: wei('10'),
              max_debt_share_value: wei('50'),
            },
          ],
        }}
        marketNamesById={{
          MARKET_ID: 'MARKET_NAME',
        }}
      />
    );

    cy.get('[data-testid="pool market"][data-market="MARKET_ID"]')
      .should('exist')
      .within(() => {
        cy.get('[data-testid="market name"]').should('have.text', 'MARKET_NAME');
        cy.get('[data-testid="market id"]').should('have.text', 'ID: MARKET_ID');
        cy.get('[data-testid="pool allocation"]').should('include.text', '100%');
        // growth is undefined, because we have only one snapshot
        cy.get('[data-testid="market growth percentage"]').should('not.exist');
      });
  });

  it('should render with markets', () => {
    cy.viewport(800, 500);

    cy.mount(
      <MarketSectionUi
        poolId="POOL_ID"
        poolDataFetched={true}
        poolData={
          {
            id: 'POOL_ID',
            name: 'POOL_NAME',
            total_weight: wei('20'),
            configurations: [
              {
                id: 'MARKET_1',
                market: mockMarket(1),
                weight: wei('10'),
                max_debt_share_value: wei('50'),
              },
              {
                id: 'MARKET_2',
                market: mockMarket(2),
                weight: wei('10'),
                max_debt_share_value: wei('50'),
              },
            ],
          } as PoolType
        }
        marketNamesById={{
          MARKET_1: 'MARKET_NAME_1',
          MARKET_2: 'MARKET_NAME_2',
        }}
      />
    );

    cy.get('[data-testid="pool market"][data-market="MARKET_1"]')
      .should('exist')
      .within(() => {
        cy.get('[data-testid="market name"]').should('have.text', 'MARKET_NAME_1');
        cy.get('[data-testid="market id"]').should('have.text', 'ID: MARKET_1');
        cy.get('[data-testid="pool allocation"]').should('include.text', '50%');
        // growth rendered, because we have at least 2 snapshots available
      });

    cy.get('[data-testid="pool market"][data-market="MARKET_2"]')
      .should('exist')
      .within(() => {
        cy.get('[data-testid="market name"]').should('have.text', 'MARKET_NAME_2');
        cy.get('[data-testid="market id"]').should('have.text', 'ID: MARKET_2');
        cy.get('[data-testid="pool allocation"]').should('include.text', '50%');
      });
  });
});
