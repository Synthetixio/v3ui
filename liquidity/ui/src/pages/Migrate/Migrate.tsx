import { Box, Button, Divider, Flex, Heading, Link, Text, Input } from '@chakra-ui/react';
import { Balance } from '@snx-v3/Balance';
import { NumberInput } from '@snx-v3/NumberInput';
import { useTokenBalance, useTokenBalanceForChain } from '@snx-v3/useTokenBalance';
import { FC, useState } from 'react';
import Head from 'react-helmet';
import { BorderBox } from '@snx-v3/BorderBox';
import { DollarCircle } from '@snx-v3/icons';
import { Network, useNetwork, useWallet } from '@snx-v3/useBlockchain';
import { useConnectWallet } from '@web3-onboard/react';
import { useUSDProxy, useUSDProxyForChain } from '@snx-v3/useUSDProxy';
import Wei, { wei } from '@synthetixio/wei';
import { HomeLink } from '@snx-v3/HomeLink';

export const MigrateUi: FC<{
  connectedWallet?: string;
  amount: Wei;
  setAmount: (val: Wei) => void;
  activeNetwork: Network | null;
  setActiveNetwork: (networkId: number) => void;
  balance?: Wei;
  toBalance?: Wei;
  toNetworkBalance?: Wei;
  toNetwork?: Network;
  setToNetwork: (network?: Network) => void;
  onTeleportClick: () => void;
  usdProxyAddress?: string;
}> = ({ connectedWallet, amount, setAmount, balance, toNetworkBalance, usdProxyAddress }) => {
  const [_, connect] = useConnectWallet();

  const { snxCollateral, debt, mutate } = useGetMigrationInfo();

  return (
    <Box maxW="600px">
      <HomeLink />
      <Head>
        <title>Migrate from v2x</title>
      </Head>
      <Flex justifyContent="space-between">
        <Heading size="lg">Migrate</Heading>
      </Flex>
      <Text mt={2} color="gray.500">
        Converts a Synthetix v2x staking position to the equivalent on V3.{' '}
        <Link color="cyan.500" target="_blank" href="https://blog.synthetix.io/">
          Read more
        </Link>{' '}
        about migration to V3.
      </Text>
      <Divider mt={4} mb={4} />
      <BorderBox flexDirection="column" p="4">
        <BorderBox flexDirection="column" p="4" mt={4}>
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
              <Input
                flex="1"
                type="text"
                border="none"
                borderWidth="0px"
                textAlign="end"
                p={0}
                outline="none"
                fontFamily="heading"
                fontSize="xl"
                fontWeight="black"
                lineHeight="2xl"
                color="white"
                height="unset"
                placeholder="Loading..."
                _focus={{ boxShadow: 'none !important' }}
                _placeholder={{ color: 'whiteAlpha.700' }}
                value={snxCollateral}
                isDisabled={true}
              />
            </Flex>
            <Flex
              flexDirection="column"
              justifyContent="flex-end"
              alignItems="flex-end"
              flexGrow={1}
            >
              <Input
                flex="1"
                type="text"
                border="none"
                borderWidth="0px"
                textAlign="end"
                p={0}
                outline="none"
                fontFamily="heading"
                fontSize="xl"
                fontWeight="black"
                lineHeight="2xl"
                color="white"
                height="unset"
                placeholder="Loading..."
                _focus={{ boxShadow: 'none !important' }}
                _placeholder={{ color: 'whiteAlpha.700' }}
                value={debt}
                isDisabled={true}
              />
            </Flex>
          </Flex>
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
          <Button type="submit" onClick={() => connect()}>
            Connect Wallet
          </Button>
        ) : (
          <Button onClick={onMigrateClick} isDisabled={!Boolean(debt?.gt(0))}>
            Migrate to V3
          </Button>
        )}
      </BorderBox>
    </Box>
  );
};

export const Migrate = () => {
  const [amount, setAmount] = useState(wei(0));

  const { activeWallet } = useWallet();
  const { network: activeNetwork, setNetwork } = useNetwork();
  const [toNetwork, setToNetwork] = useState<Network | undefined>();

  const { data: USDProxy } = useUSDProxy();
  const { data: balance } = useTokenBalance(USDProxy?.address);

  const { data: USDProxyForChain } = useUSDProxyForChain(toNetwork);
  const { data: toBalance } = useTokenBalanceForChain(USDProxyForChain?.address, toNetwork);

  return (
    <>
      <MigrateUi
        connectedWallet={activeWallet?.address}
        activeNetwork={activeNetwork}
        balance={balance}
        amount={amount}
        setAmount={setAmount}
        toNetwork={toNetwork}
        setToNetwork={setToNetwork}
        setActiveNetwork={setNetwork}
        toNetworkBalance={toNetwork ? toBalance : undefined}
        usdProxyAddress={USDProxy?.address}
      />
    </>
  );
};
