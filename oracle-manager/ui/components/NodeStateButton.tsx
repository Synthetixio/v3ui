import { Button, Flex, Spinner, Text, useToast } from '@chakra-ui/react';
import { providers } from 'ethers';
import { FC, useCallback, useState } from 'react';
import { useConnectWallet } from '@web3-onboard/react';
import { encodeBytesByNodeType, getNodeModuleContract } from '../utils/contracts';
import { Node } from '../utils/types';
import { useRecoilState } from 'recoil';
import { nodesState } from '../state/nodes';
import { shortAddress } from '../utils/addresses';
import { useIsConnected, useNetwork, useSigner } from '@snx-v3/useBlockchain';
import { useParams } from 'react-router-dom';
import { findParentNode, useFetchNodeState } from '../hooks/useFetchNodeState';

export const NodeStateButton: FC<{ node: Node }> = ({ node }) => {
  const [nodes, setNodes] = useRecoilState(nodesState);
  const [isLoading, setIsLoading] = useState(false);
  const [, connect] = useConnectWallet();
  const signer = useSigner();
  const isWalletConnected = useIsConnected();
  const { network, setNetwork } = useNetwork();
  const toast = useToast();
  const param = useParams();
  const networkParam = param?.network ? Number(param.network) : undefined;
  const { data: nodeStateFetched } = useFetchNodeState(networkParam, node);
  console.log(nodeStateFetched);
  const handleButtonClick = async () => {
    if (!isWalletConnected) {
      await connect();
      if (network && node?.network) {
        setNetwork(node.network);
      }
    } else if (node.isRegistered) {
      try {
        setIsLoading(true);
        if (network?.id && signer) {
          const contract = await getNodeModuleContract(signer, network);
          const tx: providers.TransactionResponse = await contract.registerNode(
            node.typeId,
            encodeBytesByNodeType(node.typeId, node.parameters),
            node.parents.map((id) => findParentNode(id, nodes))
          );
          await tx.wait(1);
          const nodeID = await contract.getNodeId(
            node.typeId,
            encodeBytesByNodeType(node.typeId, node.parameters),
            node.parents.map((id) => findParentNode(id, nodes))
          );
          if (nodeID) {
            setNodes((state) => {
              return state.map((n) => {
                if (n.id === nodeID) {
                  return { ...n, isRegistered: true, network: network?.id };
                }
                return n;
              });
            });
          }
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error(error);
      }
    }
  };

  const renderText = useCallback(() => {
    if (!isWalletConnected) return <Text>Please connect your wallet</Text>;
    if (node.isRegistered) return <Text>Register Node</Text>;
    if (!node.isRegistered) return '';
    return 'Something went wrong';
  }, [node.isRegistered, isWalletConnected]);

  return (
    <Flex flexDir="column" alignItems="center">
      {isLoading ? (
        <Spinner colorScheme="cyan" />
      ) : node.isRegistered ? (
        <Button
          border="1px solid white"
          size="xs"
          variant="outline"
          colorScheme="gray"
          onClick={(e) => {
            e.stopPropagation();
            handleButtonClick();
          }}
        >
          {renderText()}
        </Button>
      ) : nodeStateFetched?.price !== '0' && !!nodeStateFetched?.price ? (
        <Flex gap="2" flexDir="column">
          <Text fontWeight="bold" color="whiteAlpha.800" fontSize="xs">
            Price:
          </Text>
          <Text fontSize="xs" color="whiteAlpha.800">
            {nodeStateFetched?.price}
          </Text>
          <Text fontWeight="bold" color="whiteAlpha.800" fontSize="xs">
            Timestamp:
          </Text>
          <Text fontSize="xs" color="whiteAlpha.800">
            {nodeStateFetched?.date.toLocaleTimeString()} -{' '}
            {nodeStateFetched?.date.toLocaleDateString()}
          </Text>
        </Flex>
      ) : (
        'Something went wrong'
      )}
      <Text
        fontSize="xx-small"
        mt="2"
        _hover={{ opacity: 0.5 }}
        onClick={(e) => {
          e.stopPropagation();
          navigator.clipboard.writeText(node.id);
          toast({
            description: 'Copy ID to clipboard',
            status: 'success',
            duration: 9000,
            isClosable: true,
          });
        }}
      >
        {!!node.id && <Text>Node ID: {shortAddress(node.id)}</Text>}
      </Text>
    </Flex>
  );
};
