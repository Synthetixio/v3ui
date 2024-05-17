import { useQuery } from '@tanstack/react-query';
import { useMulticall3 } from '@snx-v3/useMulticall3';
import { ethers } from 'ethers';
import { useOracleManagerProxy } from '@snx-v3/useOracleManagerProxy';
import { z } from 'zod';
import { notNil } from '@snx-v3/tsHelpers';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { CoreProxyType } from '@synthetixio/v3-contracts';
import { Network, deploymentsWithERC7412, useNetwork } from '@snx-v3/useBlockchain';
import { ZodBigNumber } from '@snx-v3/zod';
import { wei } from '@synthetixio/wei';

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

const loadConfigs = async ({ CoreProxy }: { CoreProxy: CoreProxyType }) => {
  const hideDisabled = false;
  return await CoreProxy.getCollateralConfigurations(hideDisabled);
};

function removeDuplicatesByProp<T, K extends keyof T>(arr: T[], prop: K): T[] {
  const seen = new Set<T[K]>();
  return arr.filter((item) => {
    const value = item[prop];
    if (seen.has(value)) {
      return false;
    } else {
      seen.add(value);
      return true;
    }
  });
}

export const useAllCollateralPriceIds = (customNetwork?: Network) => {
  const { data: Multicall3 } = useMulticall3(customNetwork);
  const { data: OracleProxy } = useOracleManagerProxy(customNetwork);
  const { data: CoreProxy } = useCoreProxy(customNetwork);
  const { network } = useNetwork();

  return useQuery({
    enabled: Boolean(Multicall3 && OracleProxy && CoreProxy),
    staleTime: Infinity,
    queryKey: [`${network?.id}-${network?.preset}`, 'AllCollateralPriceIds'],
    queryFn: async () => {
      if (!CoreProxy || !Multicall3 || !OracleProxy || !network) {
        throw Error('useAllCollateralPriceIds should not be enabled ');
      }

      if (!deploymentsWithERC7412.includes(`${network?.id}-${network?.preset}`)) return [];

      const configs = await loadConfigs({ CoreProxy });

      const oracleNodeIds = configs.map((x) => x.oracleNodeId);

      const calls = oracleNodeIds.map((oracleNodeId) => ({
        target: OracleProxy.address,
        callData: OracleProxy.interface.encodeFunctionData('getNode', [oracleNodeId]),
      }));

      const { returnData } = await Multicall3.callStatic.aggregate(calls);

      const decoded = returnData
        .map((bytes, i) => {
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
            console.error(`Decoding parameters failed, config:`, configs[i]);
            console.error('parameters: ', parameters);
            console.error(error);
            return null;
          }
        })
        .filter(notNil);

      return removeDuplicatesByProp(decoded, 'priceFeedId');
    },
  });
};
