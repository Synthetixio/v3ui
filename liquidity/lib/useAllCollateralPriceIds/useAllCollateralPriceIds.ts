import { deploymentsWithERC7412, Network, useNetwork } from '@snx-v3/useBlockchain';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { useMulticall3 } from '@snx-v3/useMulticall3';
import { useCollateralTypes } from '@snx-v3/useCollateralTypes';
import { useOracleManagerProxy } from '@snx-v3/useOracleManagerProxy';
import { ZodBigNumber } from '@snx-v3/zod';
import { wei } from '@synthetixio/wei';
import { useQuery } from '@tanstack/react-query';
import { ethers } from 'ethers';
import { z } from 'zod';

const NodeSchema = z.object({
  nodeType: z.number(),
  parameters: z.string(),
  parents: z.array(z.string()),
});

const PythParametersSchema = z.object({
  address: z.string(),
  priceFeedId: z.string(),
  stalenessTolerance: ZodBigNumber.transform((x) => wei(x)),
});

const EXTERNAL_NODE_TYPE = 2;

export const useAllCollateralPriceIds = (customNetwork?: Network) => {
  const { network } = useNetwork();
  const targetNetwork = customNetwork || network;
  const { data: Multicall3 } = useMulticall3(customNetwork);
  const { data: OracleProxy } = useOracleManagerProxy(customNetwork);
  const { data: CoreProxy } = useCoreProxy({ customNetwork });
  const { data: collateralConfigs } = useCollateralTypes(false, customNetwork);

  return useQuery({
    enabled: Boolean(
      targetNetwork?.id &&
        targetNetwork?.preset &&
        Multicall3 &&
        OracleProxy &&
        CoreProxy &&
        !!collateralConfigs?.length
    ),
    staleTime: Infinity,
    queryKey: [`${targetNetwork?.id}-${targetNetwork?.preset}`, 'AllCollateralPriceIds'],
    queryFn: async () => {
      if (
        !(
          targetNetwork?.id &&
          targetNetwork?.preset &&
          Multicall3 &&
          OracleProxy &&
          CoreProxy &&
          collateralConfigs
        )
      ) {
        throw Error('useAllCollateralPriceIds should not be enabled ');
      }

      if (!deploymentsWithERC7412.includes(`${targetNetwork.id}-${targetNetwork.preset}`))
        return [];

      const oracleNodeIds = collateralConfigs.map((x: { oracleNodeId: string }) => x.oracleNodeId);

      const calls = oracleNodeIds.map((oracleNodeId: string) => ({
        target: OracleProxy.address,
        callData: OracleProxy.interface.encodeFunctionData('getNode', [oracleNodeId]),
      }));

      const { returnData } = await Multicall3.callStatic.aggregate(calls);

      const decoded = returnData
        .map((bytes: ethers.utils.BytesLike, i: number) => {
          const nodeResp = OracleProxy.interface.decodeFunctionResult('getNode', bytes)[0];

          const { nodeType, parameters } = NodeSchema.parse({ ...nodeResp });

          if (nodeType !== EXTERNAL_NODE_TYPE) return undefined;

          try {
            const [address, priceFeedId, stalenessTolerance] = ethers.utils.defaultAbiCoder.decode(
              ['address', 'bytes32', 'uint256'],
              parameters
            );
            const parametersDecoded = PythParametersSchema.parse({
              address,
              priceFeedId,
              stalenessTolerance,
            });
            return {
              parameters,
              priceFeedId: parametersDecoded.priceFeedId,
              address: parametersDecoded.address,
              stalenessTolerance: parametersDecoded.stalenessTolerance,
            };
          } catch (error) {
            console.error(`Decoding parameters failed, config:`, collateralConfigs[i]);
            console.error('parameters: ', parameters);
            console.error(error);
            return null;
          }
        })
        .filter(Boolean);

      const seen = new Set();
      return decoded.filter((item: { priceFeedId: string }) => {
        if (seen.has(item.priceFeedId)) {
          return false;
        }
        seen.add(item.priceFeedId);
        return true;
      });
    },
  });
};
