import { useMutation } from '@tanstack/react-query';
import { useRecoilState } from 'recoil';
import { nodesState } from '../state/nodes';
import { encodeBytesByNodeType, getNodeModuleContract, hashId } from '../utils/contracts';
import { useNetwork, useSigner } from '@snx-v3/useBlockchain';
import { useMulticall3 } from '@snx-v3/useMulticall3';

export function useRegisterAllNodes() {
  const [nodes, setNodes] = useRecoilState(nodesState);
  const signer = useSigner();
  const { network } = useNetwork();
  const { data: multicall } = useMulticall3();

  return useMutation({
    mutationFn: async () => {
      if (multicall && network && signer) {
        const oracleManagerContract = await getNodeModuleContract(signer, network);
        const data = nodes
          .filter((node) => !node.isRegistered)
          .sort((a, b) => {
            if (a.parents.length > b.parents.length) return 1;
            if (a.parents.length < b.parents.length) return -1;
            return 0;
          })
          .map((node) => {
            return {
              target: oracleManagerContract.address,
              callData: oracleManagerContract.interface.encodeFunctionData('registerNode', [
                node.typeId,
                encodeBytesByNodeType(node.typeId, node.parameters),
                node.parents.map((parentId: string) => {
                  const parentNode = nodes.find((node) => node.id === parentId);
                  if (parentNode) {
                    return hashId(parentNode, []);
                  }
                  return '';
                }),
              ]),
            };
          });
        const tx = await multicall.aggregate(data);
        await tx.wait(1);
        setNodes((state) => {
          return state.map((n) => ({ ...n, isRegistered: true, network: network.id }));
        });
      }
    },
  });
}
