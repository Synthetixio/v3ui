import { NETWORKS, useNetwork, useSigner } from '@snx-v3/useBlockchain';
import { useQuery } from '@tanstack/react-query';
import { getNodeModuleContract, hashId } from '../utils/contracts';
import { providers, utils } from 'ethers';
import { Node } from '../utils/types';
import { useRecoilState } from 'recoil';
import { nodesState } from '../state/nodes';
import { useState } from 'react';
import { useMulticall3 } from '@snx-v3/useMulticall3';
import { withERC7412 } from '@snx-v3/withERC7412';
import { useAllCollateralPriceUpdates } from '@snx-v3/useCollateralPriceUpdates';
import { isBaseAndromeda } from '@snx-v3/isBaseAndromeda';

export const findParentNode = (parentId: string, nodes: Node[]) => {
  const parentNode = nodes.find((node) => node.id === parentId);
  if (parentNode) {
    return hashId(parentNode, []);
  }
  return '';
};

const interval: Record<string, any> = {};

export function useFetchNodeState(networkParam: number, node: Node) {
  const [allNodes, setNodes] = useRecoilState(nodesState);
  const provider = new providers.JsonRpcProvider(
    NETWORKS.filter((network) => network.id === (networkParam || 1))[0].rpcUrl()
  );
  const signer = useSigner();
  const { network } = useNetwork();
  const [price, setPrice] = useState('0');
  const [date, setTime] = useState(new Date());
  const { data: multicall } = useMulticall3();

  return useQuery({
    enabled: !!multicall,
    queryKey: ['NodeState', networkParam, node.toString(), network?.toString()],
    queryFn: async () => {
      const fetchNodeState = async () => {
        if (network?.id) {
          try {
            const contract = await getNodeModuleContract(
              networkParam ? provider : signer!,
              network
            );
            const hashedId = hashId(
              node,
              node.parents.map((nodeId) => findParentNode(nodeId, allNodes))
            );
            const nodeFromChain = await contract.getNode(hashedId);
            if (nodeFromChain[0] > 0) {
              const nodeIdFromChain = await contract.getNodeId(
                nodeFromChain[0],
                nodeFromChain[1],
                nodeFromChain[2]
              );

              setNodes((state) => {
                return state.map((n) => {
                  if (n.id === nodeIdFromChain) {
                    return { ...n, isRegistered: true, network: network.id };
                  }
                  return n;
                });
              });

              const oracleManagerContract = await getNodeModuleContract(signer, network);

              const populatedTx = await contract.populateTransaction.process(nodeIdFromChain);
              populatedTx['from'] = '0x4200000000000000000000000000000000000006';
              const priceFromChain = isBaseAndromeda(network.id, network.preset)
                ? await withERC7412(
                    network,
                    [populatedTx],
                    'useFetchNodeState',
                    oracleManagerContract.interface
                  )
                : await contract.process(nodeIdFromChain);

              // setPrice(utils.formatEther(pr))
              const newDate = new Date(1970, 0, 1);
              newDate.setSeconds(priceFromChain[1].toNumber());
              setTime(newDate);

              interval[nodeIdFromChain] = setInterval(async () => {
                try {
                  const populatedTx = await contract.populateTransaction.process(nodeIdFromChain);
                  populatedTx['from'] = '0x4200000000000000000000000000000000000006';
                  const price = isBaseAndromeda(network.id, network.preset)
                    ? await withERC7412(
                        network,
                        [populatedTx],
                        'useFetchNodeState',
                        oracleManagerContract.interface
                      )
                    : await contract.process(nodeIdFromChain);

                  setTime(() => {
                    const newDate = new Date(1970, 0, 1);
                    newDate.setSeconds(price[1].toNumber());
                    return newDate;
                  });
                  setPrice(utils.formatEther(price[0]));
                } catch (error) {
                  console.error('interval for price fetching errored ', error);
                }
              }, 10000);

              return { price, date };
            } else {
              setPrice('?');
              setTime(new Date());
              clearInterval(interval[node.id]);
              return { price, date };
            }
          } catch (error) {
            setPrice('?');
            setTime(new Date());
            console.error(error);
            return { price, date };
          }
        }
        return { price, date };
      };
      return await fetchNodeState();
    },
  });
}
