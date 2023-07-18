import { GWEI_DECIMALS } from '@snx-v3/constants';
import { wei } from '@synthetixio/wei';

describe('useGasPrice', () => {
  let useGasPrice;
  let react;
  let reactQuery;
  let useNetwork;
  let provider;
  let useProvider;

  beforeEach(async () => {
    provider = {
      getNetwork: jest.fn(),
      getBlock: jest.fn(),
      getGasPrice: jest.fn(),
    };
    useNetwork = jest.fn(() => ({ id: 10, name: 'optimism-mainnet' }));
    useProvider = jest.fn(() => provider);

    reactQuery = {
      useQuery: jest.fn(() => 'useQuery'),
    };

    jest.doMock('react', () => react);
    jest.doMock('@tanstack/react-query', () => reactQuery);
    jest.doMock('@snx-v3/useBlockchain', () => ({ useNetwork, useProvider }));

    jest.doMock('@snx-v3/useGasPrice', () => ({ useGasPrice }));
    jest.doMock('@ethersproject/providers', () => ({}));

    ({ useGasPrice } = await import('./useGasPrice'));
  });

  afterEach(() => {
    jest.resetModules();
  });

  test('Returns gas prices for mainnet', async () => {
    useNetwork.mockReturnValue({ id: 1, name: 'mainnet' });
    provider.getNetwork.mockReturnValue({ chainId: 1 });

    const result = useGasPrice();
    const { queryKey, queryFn, enabled } = reactQuery.useQuery.mock.lastCall[0];

    expect(result.data).toEqual(undefined);
    expect(queryKey).toEqual(['mainnet', 'GasPrice']);
    expect(enabled).toEqual(true);

    provider.getBlock.mockReturnValue({ baseFeePerGas: wei(2, GWEI_DECIMALS).toBN() });
    const queryResult = await queryFn();
    expect(queryResult).toEqual({
      average: {
        baseFeePerGas: wei(2, GWEI_DECIMALS).toBN(),
        maxFeePerGas: wei(6, GWEI_DECIMALS).toBN(),
        maxPriorityFeePerGas: wei(2, GWEI_DECIMALS).toBN(),
      },
      fast: {
        baseFeePerGas: wei(2, GWEI_DECIMALS).toBN(),
        maxFeePerGas: wei(8, GWEI_DECIMALS).toBN(),
        maxPriorityFeePerGas: wei(4, GWEI_DECIMALS).toBN(),
      },
      fastest: {
        baseFeePerGas: wei(2, GWEI_DECIMALS).toBN(),
        maxFeePerGas: wei(10, GWEI_DECIMALS).toBN(),
        maxPriorityFeePerGas: wei(6, GWEI_DECIMALS).toBN(),
      },
    });
    expect(provider.getBlock).toBeCalledWith('latest');
  });

  test('Returns gas prices for optimism', async () => {
    provider.getNetwork.mockReturnValue({ chainId: 1234 });
    const result = useGasPrice();
    const { queryKey, queryFn, enabled } = reactQuery.useQuery.mock.lastCall[0];
    expect(result.data).toEqual(undefined);
    expect(queryKey).toEqual(['optimism-mainnet', 'GasPrice']);
    expect(enabled).toEqual(true);
    provider.getGasPrice.mockReturnValue(wei(2, GWEI_DECIMALS).toBN());
    const queryResult = await queryFn();
    expect(provider.getGasPrice).toBeCalled();

    expect(queryResult).toEqual({
      average: {
        gasPrice: wei(2, GWEI_DECIMALS).toBN(),
      },
      fast: {
        gasPrice: wei(2, GWEI_DECIMALS).toBN(),
      },
      fastest: {
        gasPrice: wei(2, GWEI_DECIMALS).toBN(),
      },
    });
  });
});
