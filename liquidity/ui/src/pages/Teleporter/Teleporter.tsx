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
  Link,
} from '@chakra-ui/react';
import { Balance } from '@snx-v3/Balance';
import { NumberInput } from '@snx-v3/NumberInput';
import { useTokenBalance } from '@snx-v3/useTokenBalance';
import { FC, useState } from 'react';
import Head from 'react-helmet';
import { TeleporterModal } from './TeleporterModal';
import { BorderBox } from '@snx-v3/BorderBox';
import { ChevronDown, ChevronUp, DollarCircle, CCIP } from '@snx-v3/icons';
import {
  NETWORKS,
  Network,
  onboard,
  useNetwork,
  useSetNetwork,
  useWallet,
} from '@snx-v3/useBlockchain';
import { useUSDProxy } from '@snx-v3/useUSDProxy';
import Wei, { wei } from '@synthetixio/wei';
import { HomeLink } from '@snx-v3/HomeLink';
import { providers } from 'ethers';

const SUPPORTED_NETWORKS = NETWORKS.filter((network) => network.isSupported);

export const TeleporterUi: FC<{
  connectedWallet?: string;
  amount: Wei;
  setAmount: (val: Wei) => void;
  activeNetwork: Network;
  setActiveNetwork: (network: Network) => void;
  balance?: Wei;
  toBalance?: Wei;
  toNetworkBalance?: Wei;
  toNetwork?: Network;
  setToNetwork: (network?: Network) => void;
  onTeleportClick: () => void;
  usdProxyAddress?: string;
}> = ({
  connectedWallet,
  amount,
  setAmount,
  activeNetwork,
  setActiveNetwork,
  balance,
  toNetworkBalance,
  toNetwork,
  setToNetwork,
  usdProxyAddress,
  onTeleportClick,
}) => {
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
        minutes.{' '}
        <Link
          color="cyan.500"
          target="_blank"
          href="https://blog.synthetix.io/synthetix-launches-teleporters-with-chainlinks-ccip"
        >
          Read more
        </Link>{' '}
        about teleporter and CCIP.
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
                  {SUPPORTED_NETWORKS.filter((item) => item.name !== 'goerli')
                    .filter((chain) => chain.id !== activeNetwork.id)
                    .map((chain) => {
                      return (
                        <MenuItem
                          onClick={() => {
                            setActiveNetwork(chain);
                            if (chain.id === toNetwork?.id) {
                              // If user pick the same network as to, reset toNetwork
                              setToNetwork(undefined);
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
                address={usdProxyAddress || ''}
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
                    {toNetwork ? (
                      <>
                        <toNetwork.Icon />
                        <Text
                          variant="nav"
                          fontSize="sm"
                          fontWeight={700}
                          ml={1.5}
                          mr={2}
                          display={{ base: 'none', md: 'initial' }}
                        >
                          {toNetwork.label}
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
                  {SUPPORTED_NETWORKS.filter((item) => item.name !== 'goerli')
                    .filter((chain) => chain.id !== activeNetwork.id)
                    .filter((chain) =>
                      activeNetwork.isTestnet ? chain.isTestnet : !chain.isTestnet
                    )
                    .map((chain) => {
                      return (
                        <MenuItem
                          onClick={() => {
                            setToNetwork(chain);
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
                max={balance} // max is still the from balance
              />
              <Balance
                hideBuyButton
                onMax={setAmount}
                balance={toNetworkBalance}
                symbol="snxUSD"
                address={usdProxyAddress || ''}
              />
            </Flex>
          </Flex>
        </BorderBox>
        {!connectedWallet ? (
          <Button type="submit" onClick={() => onboard.connectWallet()}>
            Connect Wallet
          </Button>
        ) : (
          <Button onClick={onTeleportClick} isDisabled={!Boolean(balance?.gt(0) && toNetwork)}>
            Teleport
          </Button>
        )}
      </BorderBox>
    </Box>
  );
};

export const Teleporter = () => {
  const { data: USDProxy } = useUSDProxy();

  const [amount, setAmount] = useState(wei(0));
  const [txnModalOpen, setTxnModalOpen] = useState(false);

  const connectedWallet = useWallet();
  const activeNetwork = useNetwork();
  const setNetwork = useSetNetwork();
  const [toNetwork, setToNetwork] = useState<Network | undefined>();

  const { data: USDProxyTNetwork } = useUSDProxy(
    toNetwork?.id
      ? new providers.InfuraProvider(toNetwork?.id, process.env.NEXT_PUBLIC_INFURA_PROJECT_ID)
      : undefined
  );
  const { data: balance } = useTokenBalance(USDProxy?.address);
  const { data: toBalance } = useTokenBalance(USDProxyTNetwork?.address, toNetwork?.id);

  return (
    <>
      <TeleporterUi
        connectedWallet={connectedWallet?.address}
        activeNetwork={activeNetwork}
        balance={balance}
        amount={amount}
        setAmount={setAmount}
        toNetwork={toNetwork}
        setToNetwork={setToNetwork}
        setActiveNetwork={setNetwork}
        toNetworkBalance={toNetwork ? toBalance : undefined}
        usdProxyAddress={USDProxy?.address}
        onTeleportClick={() => setTxnModalOpen(true)}
      />
      {toNetwork && (
        <TeleporterModal
          isOpen={txnModalOpen}
          onClose={() => {
            setTxnModalOpen(false);
            setAmount(wei(0));
          }}
          toNetworkId={toNetwork.id}
          toNetworkName={toNetwork.name}
          amount={amount}
        />
      )}
    </>
  );
};
