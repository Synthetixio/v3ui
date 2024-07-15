import {
  Flex,
  Button,
  Text,
  Heading,
  Fade,
  Tag,
  Tr,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Link,
} from '@chakra-ui/react';
import { useNavigate, useSearchParams, Link as ReactRouterLink } from 'react-router-dom';
import { ZEROWEI } from '../../../utils/constants';
import {
  ARBITRUM,
  MAINNET,
  Network,
  NetworkIcon,
  useNetwork,
  useWallet,
} from '@snx-v3/useBlockchain';
import { compactInteger } from 'humanize-plus';
import { isBaseAndromeda } from '@snx-v3/isBaseAndromeda';
import Wei, { wei } from '@synthetixio/wei';
import { BigNumberish } from 'ethers';
import { TokenIcon } from '../../TokenIcon';
import { CollateralType } from '@snx-v3/useCollateralTypes';
import { Sparkles } from '@snx-v3/icons';
import { formatNumber, formatNumberToUsd } from '@snx-v3/formatters';
import { formatApr } from '../CollateralSection';
import { Tooltip } from '@snx-v3/Tooltip';

interface CollateralTypeWithDeposited extends CollateralType {
  collateralDeposited: string;
}

export interface PoolCardProps {
  pool: {
    name: string;
    id: string;
  };
  network: Network;
  collateralTypes?: CollateralTypeWithDeposited[];
  collateralPrices?: {
    symbol: string;
    price: BigNumberish;
  }[];
  apr: {
    combinedApr: number;
    cumulativePnl: number;
    collateralAprs: any[];
  };
  balances?: Wei[];
}

export const PoolCard = ({
  pool,
  network,
  apr,
  collateralTypes,
  collateralPrices,
  balances,
}: PoolCardProps) => {
  const navigate = useNavigate();
  const [queryParams] = useSearchParams();

  const { network: currentNetwork, setNetwork } = useNetwork();
  const { connect } = useWallet();

  const vaultTVL = collateralTypes?.reduce((acc, type) => {
    const price = wei(collateralPrices?.find((price) => price.symbol === type.symbol)?.price || 0);
    const amount = wei(type.collateralDeposited, Number(type.decimals), true);
    const value = price.mul(amount);
    return acc.add(value);
  }, ZEROWEI);

  const sanitizedCollateralTypes = collateralTypes?.map((collateralType) => {
    if (
      isBaseAndromeda(network.id, network.preset) &&
      collateralType.symbol.toUpperCase() === 'SUSDC'
    ) {
      return {
        ...collateralType,
        symbol: 'USDC',
        displaySymbol: 'USDC',
        name: 'USD Coin',
      };
    }

    return collateralType;
  });

  return (
    <Fade in>
      <Flex
        flexDir="column"
        w="100%"
        border="1px solid"
        borderColor="gray.900"
        rounded="base"
        bg="navy.700"
        p="6"
      >
        <Flex flexWrap="wrap" justifyContent="space-between" alignItems="center" gap={4}>
          <Flex>
            <Flex
              flexDir="column"
              gap={1}
              ml="12px"
              _hover={{ cursor: 'pointer', opacity: 0.9 }}
              onClick={() => navigate(`/pools/${network.id}/${pool.id}`)}
            >
              <Heading fontSize="xl" fontWeight={700} color="white">
                {pool?.name}
              </Heading>
              <Flex alignItems="center" fontSize="12px" color="gray.500" gap={1} fontWeight="bold">
                <NetworkIcon size="14px" networkId={network.id} mr={1} />
                {network.label} Network
              </Flex>
            </Flex>
            {[MAINNET.id, ARBITRUM.id].includes(network.id) && (
              <Tag
                ml={2}
                mt="2px"
                size="sm"
                bg="purple.500"
                mr="auto"
                color="white"
                height="fit-content"
              >
                Borrow Interest-Free
              </Tag>
            )}
          </Flex>
          <Flex flexWrap="wrap">
            <Flex alignItems="center" mr={6} gap={2}>
              <Text fontSize="20px" fontWeight="bold" color="gray.500">
                TVL
              </Text>
              <Text
                fontWeight="bold"
                fontSize="20px"
                color="white"
                display="flex"
                alignItems="center"
                lineHeight="36px"
              >
                {(vaultTVL?.toNumber() && `$${compactInteger(vaultTVL.toNumber(), 2)}`) || '-'}
              </Text>
            </Flex>
            <Flex alignItems="center" gap={2}>
              <Text fontSize="20px" fontWeight="bold" color="gray.500">
                APR
              </Text>
              <Text fontWeight="bold" fontSize="20px" color="white" lineHeight="36px">
                {apr.combinedApr > 0
                  ? `${network.id === ARBITRUM.id ? 'Up to ' : ''}${apr.combinedApr
                      .toFixed(2)
                      ?.concat('%')}`
                  : '-'}
              </Text>
              <Tooltip label="Apr is averaged over the trailing 28 days and is comprised of both performance and rewards.">
                <Flex>
                  <Sparkles w="18px" h="18px" mb={0.5} />
                </Flex>
              </Tooltip>
            </Flex>
            <Link
              px={3}
              py={2}
              fontSize="sm"
              fontWeight={700}
              lineHeight="20px"
              variant="outline"
              alignContent="center"
              as={ReactRouterLink}
              borderWidth="1px"
              borderColor="gray.900"
              _hover={{ textTransform: 'none', opacity: 0.9 }}
              borderRadius="4px"
              ml={3}
              to={`/pools/${network.id}/${pool.id}`}
              color="white"
            >
              Details
            </Link>
          </Flex>
        </Flex>
        <TableContainer mt={4}>
          <Table>
            <Thead>
              <Tr borderBottom="1px solid #2D2D38">
                <Th
                  textTransform="unset"
                  color="gray.600"
                  border="none"
                  fontFamily="heading"
                  fontSize="12px"
                  lineHeight="16px"
                  letterSpacing={0.6}
                  fontWeight={700}
                  px={4}
                  py={3}
                >
                  Collateral
                </Th>
                <Th
                  textTransform="unset"
                  color="gray.600"
                  border="none"
                  fontFamily="heading"
                  fontSize="12px"
                  lineHeight="16px"
                  letterSpacing={0.6}
                  fontWeight={700}
                  px={4}
                  py={3}
                >
                  Wallet Balance
                </Th>
                <Th
                  textTransform="unset"
                  color="gray.600"
                  border="none"
                  fontFamily="heading"
                  fontSize="12px"
                  lineHeight="16px"
                  letterSpacing={0.6}
                  fontWeight={700}
                  px={4}
                  py={3}
                >
                  TVL
                </Th>
                <Th
                  textTransform="unset"
                  color="gray.600"
                  border="none"
                  fontFamily="heading"
                  fontSize="12px"
                  lineHeight="16px"
                  letterSpacing={0.6}
                  fontWeight={700}
                  px={4}
                  py={3}
                >
                  APR
                </Th>
                <Th
                  textTransform="unset"
                  color="gray.600"
                  border="none"
                  fontFamily="heading"
                  fontSize="12px"
                  lineHeight="16px"
                  letterSpacing={0.6}
                  fontWeight={700}
                  px={4}
                  py={3}
                ></Th>
              </Tr>
            </Thead>
            <Tbody>
              {sanitizedCollateralTypes?.map((type, index) => {
                const price = wei(
                  collateralPrices?.find((price) => price.symbol === type.symbol)?.price
                );

                const collateralApr = apr.collateralAprs.find(
                  (apr) => apr.collateralType === type.tokenAddress.toLowerCase()
                );

                const { apr28d, apr28dRewards, apr28dPnl } = collateralApr;

                return (
                  <Tr key={type.tokenAddress}>
                    <Td border="none" px={4} w="20%">
                      <Flex alignItems="center">
                        <TokenIcon w={26} h={26} symbol={type.symbol} />
                        <Flex flexDirection="column" ml={3} mr="auto">
                          <Text
                            fontSize="14px"
                            color="white"
                            fontWeight={700}
                            lineHeight="1.25rem"
                            fontFamily="heading"
                          >
                            {type.symbol}
                          </Text>
                          <Text
                            fontSize="xs"
                            color="gray.500"
                            fontFamily="heading"
                            lineHeight="1rem"
                          >
                            {type.name}
                          </Text>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td border="none" textAlign="left" px={4}>
                      <Flex direction="column">
                        <Text
                          fontFamily="heading"
                          fontSize="14px"
                          fontWeight={500}
                          lineHeight="28px"
                          color="white"
                        >
                          {balances && balances[index]
                            ? formatNumberToUsd(balances[index].mul(price).toNumber())
                            : '-'}
                        </Text>
                        <Text
                          color="gray.500"
                          fontFamily="heading"
                          fontSize="12px"
                          lineHeight="16px"
                        >
                          {balances && balances[index]
                            ? formatNumber(balances[index].toNumber())
                            : ''}{' '}
                          {type.symbol}
                        </Text>
                      </Flex>
                    </Td>
                    <Td border="none" textAlign="left" px={4}>
                      <Text
                        fontFamily="heading"
                        fontSize="14px"
                        lineHeight="20px"
                        fontWeight={500}
                        color="white"
                      >
                        {price
                          ? formatNumberToUsd(
                              wei(type.collateralDeposited, Number(type.decimals), true)
                                .mul(price)
                                .toNumber()
                            )
                          : 0}
                      </Text>
                    </Td>
                    <Td border="none" textAlign="left" px={4}>
                      <Tooltip
                        label={
                          <Flex direction="column">
                            <Flex justifyContent="space-between">
                              <Text fontWeight={700} mr={2}>
                                Total APR:
                              </Text>
                              <Text fontWeight={700}>{formatApr(apr28d * 100, network?.id)}</Text>
                            </Flex>
                            <Flex justifyContent="space-between">
                              <Text mr={2}>Performance:</Text>
                              <Text>{formatApr(apr28dPnl * 100, network?.id)}</Text>
                            </Flex>
                            <Flex justifyContent="space-between">
                              <Text mr={2}>Rewards: </Text>
                              <Text>{formatApr(apr28dRewards * 100, network?.id)}</Text>
                            </Flex>
                          </Flex>
                        }
                      >
                        <Text
                          fontFamily="heading"
                          fontSize="14px"
                          lineHeight="20px"
                          fontWeight={500}
                          color="white"
                        >
                          {formatApr(apr28d * 100, network?.id)}
                          <Sparkles w="14px" h="14px" mb={1} ml="0.5px" mt="1px" />
                        </Text>
                      </Tooltip>
                    </Td>
                    <Td border="none" textAlign="right" pl={4} pr={0}>
                      <Button
                        onClick={async (e) => {
                          try {
                            e.stopPropagation();

                            if (!currentNetwork) {
                              connect();
                              return;
                            }

                            if (currentNetwork.id !== network.id) {
                              if (!(await setNetwork(network.id))) {
                                return;
                              }
                            }

                            queryParams.set('manageAction', 'deposit');
                            navigate({
                              pathname: `/positions/${type.symbol}/${pool.id}`,
                              search: queryParams.toString(),
                            });
                          } catch (error) {}
                        }}
                        size="sm"
                        height="32px"
                        py="10px"
                        px={3}
                        whiteSpace="nowrap"
                        borderRadius="4px"
                        fontFamily="heading"
                        fontWeight={700}
                        fontSize="14px"
                        lineHeight="20px"
                      >
                        Deposit
                      </Button>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </Fade>
  );
};
