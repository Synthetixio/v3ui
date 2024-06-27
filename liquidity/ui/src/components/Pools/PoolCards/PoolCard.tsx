import { Flex, Button, Text, Divider, Heading, Fade, Tag } from '@chakra-ui/react';
import { useNavigate, useSearchParams } from 'react-router-dom';
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
import { useMemo } from 'react';
import { wei } from '@synthetixio/wei';
import { BigNumberish } from 'ethers';
import { TokenIcon } from '../../TokenIcon';
import { CollateralType } from '@snx-v3/useCollateralTypes';

interface CollateralTypeWithDeposited extends CollateralType {
  collateralDeposited: string;
}

export interface PoolCardProps {
  pool: {
    name: string;
    id: string;
  };
  network: Network;
  collaterals: string[];
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
}

export const PoolCard = ({
  pool,
  network,
  collaterals,
  apr,
  collateralTypes,
  collateralPrices,
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

  const isCollateralFiltered = useMemo(
    () =>
      collateralTypes?.some((collateralType) =>
        collaterals.length
          ? !!collaterals.find((collateral) => {
              if (
                isBaseAndromeda(network.id, network.preset) &&
                collateralType.symbol.toUpperCase() === 'SUSDC'
              ) {
                return collateral.toUpperCase() === 'USDC';
              }
              return collateral.toUpperCase() === collateralType.symbol.toUpperCase();
            })
          : true
      ),
    [collateralTypes, collaterals, network.id, network.preset]
  );

  if (!isCollateralFiltered) {
    return null;
  }

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
        _hover={{ cursor: 'pointer', bg: 'whiteAlpha.50' }}
        onClick={() => navigate(`/pools/${network.id}/${pool.id}`)}
      >
        <Flex flexWrap="wrap" justifyContent="space-between" alignItems="center" gap={4}>
          <Flex>
            <Flex flexDir="column" gap={1}>
              <Heading fontSize="20px" fontWeight={700} color="white">
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
            </Flex>
          </Flex>
        </Flex>
        <Divider mt="18px" mb="10px" />
        <Flex flexWrap="wrap" gap={6}>
          {sanitizedCollateralTypes?.map((type) => {
            const collateralApr = apr.collateralAprs.find(
              (item) => item.collateralType === type.tokenAddress
            );

            return (
              <Flex alignItems="center" key={type.oracleNodeId} gap={4} mt={3}>
                <Flex alignItems="center" justifyContent="space-between">
                  <TokenIcon width={26} height={26} symbol={type.symbol} />
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
                    <Text fontSize="12px" color="gray.500" fontFamily="heading" lineHeight="1rem">
                      {type.symbol}
                    </Text>
                  </Flex>
                  {network.id === ARBITRUM.id && collateralApr && (
                    <Flex flexDirection="column" ml={6} mr={4}>
                      <Text fontSize="12px" color="gray.500" fontFamily="heading" lineHeight="1rem">
                        APR
                      </Text>
                      <Text color="white" fontFamily="heading" fontSize="14px" fontWeight={700}>
                        {`${(100 * collateralApr.apr24h).toFixed(2)}`}%
                      </Text>
                    </Flex>
                  )}
                </Flex>
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
                  variant="outline"
                  colorScheme="gray"
                  height="32px"
                  py="10px"
                  px="12px"
                  whiteSpace="nowrap"
                  borderRadius="4px"
                  color="white"
                  fontFamily="heading"
                  fontWeight={700}
                  fontSize="14px"
                  lineHeight="20px"
                >
                  Deposit
                </Button>
              </Flex>
            );
          })}
        </Flex>
      </Flex>
    </Fade>
  );
};
