import { useQuery } from '@tanstack/react-query';
import { useBlockNumber } from '../useBlockNumber';
import { useMemo } from 'react';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { getsUSDCAddress } from '@snx-v3/isBaseAndromeda';
import { useNetwork } from '@snx-v3/useBlockchain';
import Wei, { wei } from '@synthetixio/wei';
import { useMulticall3 } from '@snx-v3/useMulticall3';

const BLOCKS = (60 * 60 * 24) / 2;

interface PnlData {
  pnlValue: Wei;
  collateralAmount: Wei;
}

export const useGetPNL = () => {
  const { data: block } = useBlockNumber();

  const { data: CoreProxy } = useCoreProxy();
  const { data: Multicall3 } = useMulticall3();

  const { network } = useNetwork();

  const blocks = useMemo(() => {
    if (!block) {
      return [];
    }

    // We take the last 8 blocks as the PnL is calculated between two blocks
    return [
      block - BLOCKS * 8,
      block - BLOCKS * 7,
      block - BLOCKS * 6,
      block - BLOCKS * 5,
      block - BLOCKS * 4,
      block - BLOCKS * 3,
      block - BLOCKS * 2,
      block - BLOCKS,
    ];
  }, [block]);

  return useQuery({
    queryKey: ['pnl', blocks.join(',')],
    queryFn: async () => {
      if (!CoreProxy || !Multicall3) throw 'Missing data required for useGetPNL';

      const returnValues = await Promise.all(
        blocks.map((block) => {
          return Multicall3.callStatic.aggregate(
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
    },
  });
};
