import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { Balance } from '@snx-v3/Balance';
import { NumberInput } from '@snx-v3/NumberInput';
import { useTokenBalance } from '@snx-v3/useTokenBalance';
import { useState } from 'react';
import Head from 'react-helmet';
// import { TeleporterModal } from './TeleporterModal';
import { BorderBox } from '@snx-v3/BorderBox';
import { ChevronDown, ChevronUp, DollarCircle, CCIP } from '@snx-v3/icons';
import { NETWORKS, Network, useNetwork, useSetNetwork } from '@snx-v3/useBlockchain';
import { useUSDProxy } from '@snx-v3/useUSDProxy';
import { wei } from '@synthetixio/wei';
import { HomeLink } from '@snx-v3/HomeLink';

const NETWORKS_ARRAY = Object.values(NETWORKS).filter((network) => network.isSupported);

export const Teleporter = () => {
  const { data: USDProxy } = useUSDProxy();
  const [amount, setAmount] = useState(wei(0));

  const activeNetwork = useNetwork();
  const setNetwork = useSetNetwork();

  const [to, setTo] = useState<Network | undefined>();
  const { data: balance } = useTokenBalance(USDProxy?.address);
  // Only fetch when to is set
  const { data: toBalance } = useTokenBalance(to ? USDProxy?.address : undefined, to?.id);

  return (
    <Box maxW="600px">
      <HomeLink />
      <Head>
        <title>Teleport snxUSD</title>
      </Head>
      <Flex justifyContent="space-between">
        <Heading size="lg">Teleport snxUSD</Heading>
        <CCIP />
      </Flex>
      <Text mt={2} color="gray.500">
        Teleport your assets between layers using the teleporter. This transaction can take up to 30
        minutes. Read more about teleporter and CCIP.
      </Text>
      <Divider mt={4} mb={4} />
      <BorderBox flexDirection="column" p="4">
        <BorderBox flexDirection="column" p="4">
          <Menu>
            {({ isOpen }) => (
              <>
                <Flex alignItems="center" gap={2}>
                  <Text>From</Text>
                  <MenuButton
                    as={Button}
                    variant="outline"
                    colorScheme="gray"
                    sx={{ '> span': { display: 'flex', alignItems: 'center' } }}
                    mr={1}
                    width="fit-content"
                  >
                    <activeNetwork.Icon />
                    <Text
                      variant="nav"
                      fontSize="sm"
                      fontWeight={700}
                      ml={1.5}
                      mr={2}
                      display={{ base: 'none', md: 'initial' }}
                    >
                      {activeNetwork.label}
                    </Text>
                    <Flex display={{ base: 'none', md: 'initial' }}>
                      {isOpen ? <ChevronUp color="cyan" /> : <ChevronDown color="cyan.500" />}
                    </Flex>
                  </MenuButton>
                </Flex>
                <MenuList background="black">
                  {NETWORKS_ARRAY.filter((chain) => chain.id !== activeNetwork.id).map((chain) => {
                    return (
                      <MenuItem
                        onClick={() => {
                          setNetwork(chain);
                          if (chain.id === to?.id) {
                            setTo(undefined);
                          }
                        }}
                        display="flex"
                        alignItems="center"
                        key={chain.id}
                      >
                        <chain.Icon />
                        <Text variant="nav" ml={2}>
                          {chain.label}
                        </Text>
                      </MenuItem>
                    );
                  })}
                </MenuList>
              </>
            )}
          </Menu>

          <Flex>
            <Text display="flex" gap={2} alignItems="center" fontWeight="600">
              <DollarCircle width="35px" height="35px" />
              snxUSD
            </Text>
            <Flex
              flexDirection="column"
              justifyContent="flex-end"
              alignItems="flex-end"
              flexGrow={1}
            >
              <NumberInput
                InputProps={{
                  isRequired: true,
                  'data-max': balance?.toString(),
                  autoFocus: true,
                }}
                value={amount}
                onChange={(val) => setAmount(val)}
                max={balance}
              />
              <Balance
                onMax={setAmount}
                balance={balance}
                symbol="snxUSD"
                address={USDProxy?.address || ''}
              />
            </Flex>
          </Flex>

          <Flex alignItems="center" justifyContent="flex-end"></Flex>
        </BorderBox>

        <BorderBox flexDirection="column" p="4" mt={4}>
          <Menu>
            {({ isOpen }) => (
              <>
                <Flex alignItems="center" gap={2}>
                  <Text>To</Text>
                  <MenuButton
                    as={Button}
                    variant="outline"
                    colorScheme="gray"
                    sx={{ '> span': { display: 'flex', alignItems: 'center' } }}
                    mr={1}
                    width="fit-content"
                  >
                    {to ? (
                      <>
                        <to.Icon />
                        <Text
                          variant="nav"
                          fontSize="sm"
                          fontWeight={700}
                          ml={1.5}
                          mr={2}
                          display={{ base: 'none', md: 'initial' }}
                        >
                          {to.label}
                        </Text>
                      </>
                    ) : (
                      'Select Network'
                    )}
                    <Flex display={{ base: 'none', md: 'initial' }}>
                      {isOpen ? <ChevronUp color="cyan" /> : <ChevronDown color="cyan.500" />}
                    </Flex>
                  </MenuButton>
                </Flex>
                <MenuList background="black">
                  {NETWORKS_ARRAY.filter((chain) => chain.id !== activeNetwork.id)
                    .filter((chain) =>
                      activeNetwork.isTestnet ? chain.isTestnet : !chain.isTestnet
                    )
                    .map((chain) => {
                      return (
                        <MenuItem
                          onClick={() => {
                            setTo(chain);
                          }}
                          display="flex"
                          alignItems="center"
                          key={chain.id}
                        >
                          <chain.Icon />
                          <Text variant="nav" ml={2}>
                            {chain.label}
                          </Text>
                        </MenuItem>
                      );
                    })}
                </MenuList>
              </>
            )}
          </Menu>

          <Flex>
            <Text display="flex" gap={2} alignItems="center">
              <DollarCircle width="35px" height="35px" />
              snxUSD
            </Text>
            <Flex
              flexDirection="column"
              justifyContent="flex-end"
              alignItems="flex-end"
              flexGrow={1}
            >
              <NumberInput
                InputProps={{
                  isRequired: true,
                  'data-max': balance?.toString(),
                }}
                value={amount}
                onChange={(val) => setAmount(val)}
                max={toBalance}
              />
              <Balance
                onMax={setAmount}
                balance={toBalance}
                symbol="snxUSD"
                address={USDProxy?.address || ''}
              />
            </Flex>
          </Flex>
        </BorderBox>
        <Button type="submit" isDisabled={!Boolean(balance?.gt(0) && to)}>
          Teleport
        </Button>
      </BorderBox>
      {/* <Tele[porterModal amount={amount} isOpen={isOpen} setIsOpen={setIsOpen} /> */}
    </Box>
  );
};
