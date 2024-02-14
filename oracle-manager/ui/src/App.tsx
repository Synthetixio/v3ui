import { useEffect, FC, useState } from 'react';
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
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
import { encodeBytesByNodeType, getNodeModuleContract, hashId } from '../utils/contracts';
import { useIsConnected, useNetwork, useSigner } from '@snx-v3/useBlockchain';
import { ChevronDownIcon, ChevronUpIcon, SearchIcon } from '@chakra-ui/icons';
import { providers } from 'ethers';
import { useMulticall3 } from '@snx-v3/useMulticall3';
import { EthereumIcon, FailedIcon, OptimismIcon, BaseIcon } from '@snx-v3/icons';

const activeIcon = (currentNetwork: number) => {
  switch (currentNetwork) {
    case 1:
      return { icon: <EthereumIcon />, name: 'Ethereum' };
    case 10:
      return { icon: <OptimismIcon />, name: 'Optimism' };
    case 5:
      return { icon: <EthereumIcon />, name: 'Goerli Testnet' };
    case 420:
      return { icon: <OptimismIcon />, name: 'Optimistic Goerli' };
    case 84531:
      return {
        icon: <BaseIcon />,
        name: 'Base Goerli',
      };
    default:
      return { icon: <FailedIcon w="24px" h="24px" />, name: 'Unsupported Network' };
  }
};

export const App: FC = () => {
  const [currentNetwork, setNetwork] = useState(1);
  const [nodes, setNodes] = useRecoilState(nodesState);
  const { name, icon } = activeIcon(currentNetwork);
  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, getValues } = useForm({ defaultValues: { search: '' } });
  const navigate = useNavigate();
  const { network } = useNetwork();
  const signer = useSigner();
  const isWalletConnected = useIsConnected();
  const { data: contract } = useMulticall3();

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
              <Menu>
                {({ isOpen }) => (
                  <>
                    <MenuButton
                      as={Button}
                      pr="6"
                      variant="outline"
                      colorScheme="gray"
                      sx={{ '> span': { display: 'flex', alignItems: 'center' } }}
                      minW="150px"
                      mr="8px"
                    >
                      {icon}
                      <>
                        <Text variant="nav" fontSize="sm" fontWeight={700} ml={1.5} mr={2}>
                          {name}
                        </Text>
                        {isOpen ? (
                          <ChevronUpIcon color="cyan" />
                        ) : (
                          <ChevronDownIcon color="cyan.500" />
                        )}
                      </>
                    </MenuButton>
                    <MenuList>
                      <MenuItem onClick={() => setNetwork(1)}>
                        <EthereumIcon />
                        <Text variant="nav" ml={2}>
                          Ethereum Mainnet
                        </Text>
                      </MenuItem>
                      <MenuItem onClick={() => setNetwork(5)}>
                        <EthereumIcon />
                        <Text variant="nav" ml={2}>
                          Goerli
                        </Text>
                      </MenuItem>
                      <MenuItem onClick={() => setNetwork(10)}>
                        <OptimismIcon />
                        <Text variant="nav" ml={2}>
                          Optimism
                        </Text>
                      </MenuItem>
                      <MenuItem onClick={() => setNetwork(420)}>
                        <OptimismIcon />
                        <Text variant="nav" ml={2}>
                          Optimism Goerli
                        </Text>
                      </MenuItem>
                      <MenuItem onClick={() => setNetwork(84531)}>
                        <BaseIcon />
                        <Text variant="nav" ml={2}>
                          Base Goerli
                        </Text>
                      </MenuItem>
                    </MenuList>
                  </>
                )}
              </Menu>
            )}
            <Button
              variant="outline"
              colorScheme="gray"
              p="2"
              maxW="120px"
              minW="120px"
              leftIcon={<SearchIcon />}
              onClick={() => {
                navigate(
                  '/node/' +
                    (isWalletConnected ? network?.id.toString() : currentNetwork.toString()) +
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
          <Button
            variant="outline"
            colorScheme="gray"
            mr="16px"
            isDisabled={!isWalletConnected}
            onClick={() => {
              if (nodes.every((node) => node.isRegistered)) {
                toast({
                  title: 'All nodes are already registered',
                  status: 'info',
                  duration: 9000,
                  isClosable: true,
                });
              } else if (signer && network?.id && !!contract) {
                const oracleManagerContract = getNodeModuleContract(signer, network.id);
                const data = nodes
                  .slice()
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
                contract.aggregate(data).then((tx: providers.TransactionResponse) =>
                  tx.wait(1).then(() => {
                    setNodes((state) => {
                      return state.map((n) => ({ ...n, isRegistered: true }));
                    });
                  })
                );
                setNodes(nodes.map((node) => ({ ...node, network: network.id })));
              }
            }}
          >
            Register All Nodes
          </Button>
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
