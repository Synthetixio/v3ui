import { useQuery } from '@tanstack/react-query';
import { useBlockNumber } from '../useBlockNumber';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { getsUSDCAddress } from '@snx-v3/isBaseAndromeda';
import { useNetwork } from '@snx-v3/useBlockchain';
import Wei, { wei } from '@synthetixio/wei';
import { useMulticall3 } from '@snx-v3/useMulticall3';
import { providers } from 'ethers';

interface PnlData {
  pnlValue: Wei;
  collateralAmount: Wei;
}

export const useGetPnl = () => {
  const { data: block } = useBlockNumber();

  const { data: CoreProxy } = useCoreProxy();
  const { data: Multicall3 } = useMulticall3();

  const { network } = useNetwork();

  const blocks = block?.lastPeriodBlocks;

  return useQuery({
    queryKey: ['pnl', blocks?.join(',')],
    queryFn: async () => {
      if (!CoreProxy || !Multicall3 || !blocks) throw 'Missing data required for useGetPnl';

      try {
        const returnValues = await Promise.all(
          blocks.map((block: number) => {
            return Multicall3.connect(
              new providers.JsonRpcBatchProvider(network?.rpcUrl())
            ).callStatic.aggregate(
              [
                {
                  target: CoreProxy.address,
                  callData: CoreProxy.interface.encodeFunctionData('getVaultCollateral', [
                    1,
                    getsUSDCAddress(network?.id),
                  ]),
                },
                {
                  target: CoreProxy.address,
                  callData: CoreProxy.interface.encodeFunctionData('getVaultDebt', [
                    1,
                    getsUSDCAddress(network?.id),
                  ]),
                },
              ],
              { blockTag: block }
            );
          })
        );

        const decoded = returnValues.map((data) => {
          const [blockNumber, returnData] = data;

          const [debt] = CoreProxy.interface.decodeFunctionResult('getVaultDebt', returnData[1]);
          const [amount, value] = CoreProxy.interface.decodeFunctionResult(
            'getVaultCollateral',
            returnData[0]
          );

          return {
            blockNumber,
            amount,
            value,
            debt,
          };
        });

        const pnls: PnlData[] = [];

        decoded.forEach((data, i) => {
          if (i === 0) {
            return;
          }

          const previousDebt = wei(decoded[i - 1].debt, 18, true);
          // Take the previous collateral amount
          const collateralAmount = wei(decoded[i - 1].amount, 18, true);
          const currentDebt = wei(data.debt, 18, true);

          const pnlValue = previousDebt.sub(currentDebt);

          pnls.push({ pnlValue, collateralAmount });
        });

        return {
          pnls,
        };
      } catch (error) {
        console.error('Error fetching pnl', error);
        return { pnls: [] };
      }
    },
    enabled: Boolean(block && CoreProxy && Multicall3 && network),
  });
};
