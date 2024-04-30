import { Button, Spinner, Toast } from '@chakra-ui/react';
import { useIsConnected } from '@snx-v3/useBlockchain';
import { nodesState } from '../state/nodes';
import { useRecoilState } from 'recoil';
import { useRegisterAllNodes } from '../mutations/useRegisterAllNodes';

export function RegisterAllNodesButton() {
  const isWalletConnected = useIsConnected();
  const [nodes] = useRecoilState(nodesState);
  const { mutateAsync, isPending } = useRegisterAllNodes();

  if (isPending) return <Spinner alignSelf="center" mr="4" colorScheme="cyan" />;

  return (
    <Button
      variant="outline"
      colorScheme="gray"
      mr="4"
      isDisabled={!isWalletConnected || nodes.length === 0}
      onClick={async () => {
        if (nodes.every((node) => node.isRegistered)) {
          Toast({
            title: 'All nodes are already registered',
            status: 'info',
            duration: 9000,
            isClosable: true,
          });
        } else {
          await mutateAsync();
        }
      }}
    >
      Register All Nodes
    </Button>
  );
}
