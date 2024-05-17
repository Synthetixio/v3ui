import { useEffect, FC, useState } from 'react';
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Input,
  Text,
  useColorMode,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { Chart } from '../components/Chart';
import { useRecoilState } from 'recoil';
import { nodesState } from '../state/nodes';
import { convertStateToQueryParam } from '../utils/url';
import { NodeFormModule } from '../components/NodeFormModule';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useIsConnected, useNetwork } from '@snx-v3/useBlockchain';
import { SearchIcon } from '@chakra-ui/icons';
import NetworkSelect from '../components/NetworkSelect';
import { RegisterAllNodesButton } from '../components/RegisterAllNodesButton';

export const App: FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [currentNetwork, setNetwork] = useState({ id: 1, name: 'Ethereum' });
  const [nodes] = useRecoilState(nodesState);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, getValues } = useForm({ defaultValues: { search: '' } });
  const navigate = useNavigate();
  const { network } = useNetwork();
  const isWalletConnected = useIsConnected();

  useEffect(() => {
    if (colorMode === 'light') {
      toggleColorMode();
    }
  }, [colorMode, toggleColorMode]);

  return (
    <Box px="10" py="5">
      <Flex justifyContent="space-between" mb="5">
        <Box>
          <Heading fontWeight="light">Welcome to</Heading>
          <Heading>Synthetix Oracle Manager</Heading>
        </Box>
        <Flex flexDirection="column" gap="4">
          <Text fontSize="sm" color="whiteAlpha.600">
            Search for existing Nodes here:
          </Text>
          <Flex w="100%">
            <Input placeholder="Enter Node ID" maxW="230px" {...register('search')} mr="16px" />
            {!isWalletConnected && (
              <NetworkSelect
                id={currentNetwork.id}
                name={currentNetwork.name}
                setNetwork={(network) => setNetwork({ id: network.id, name: network.name })}
              />
            )}
            <Button
              ml="2"
              variant="outline"
              colorScheme="gray"
              p="2"
              maxW="120px"
              minW="120px"
              leftIcon={<SearchIcon />}
              onClick={() => {
                navigate(
                  '/node/' +
                    (isWalletConnected ? network?.id.toString() : currentNetwork.id.toString()) +
                    '/' +
                    getValues('search').trim()
                );
              }}
            >
              Search
            </Button>
          </Flex>
        </Flex>
      </Flex>
      <Divider color="gray.900" mb="5" />
      <Flex justifyContent="space-between" mb="5">
        <Text fontSize="sm" color="whiteAlpha.600">
          The bottom of the node is always the downstream output and the top is the receiving end.
          <br />
          Click on the black connection lines to disconnect a parent node from a child node.
        </Text>
        <Flex justifyContent="center">
          <RegisterAllNodesButton />
          <Button
            mr="16px"
            variant="outline"
            colorScheme="gray"
            onClick={() => {
              toast({
                title: 'Saved to local storage',
                status: 'success',
                duration: 9000,
                isClosable: true,
              });
              localStorage.setItem('oracleManagerUI', JSON.stringify(nodes));
            }}
          >
            Save
          </Button>
          <Button
            mr="16px"
            disabled={!nodes.length}
            variant="outline"
            colorScheme="gray"
            onClick={() => {
              localStorage.setItem('oracleManagerUI', JSON.stringify(nodes));
              convertStateToQueryParam(nodes);
              toast({
                title: 'Generated link copied to your clipboard”',
                status: 'success',
                duration: 9000,
                isClosable: true,
              });
            }}
          >
            Save & Share
          </Button>
          <Button onClick={onOpen} variant="solid" colorScheme="cyan">
            Add Node
          </Button>
        </Flex>
      </Flex>
      <NodeFormModule isOpen={isOpen} onClose={onClose} />
      <Chart />
    </Box>
  );
};
