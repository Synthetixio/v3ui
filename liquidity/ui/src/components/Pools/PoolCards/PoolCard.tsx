import { Flex, Button, Text, Divider, Heading, Fade, Tag } from '@chakra-ui/react';

import { useNavigate, useSearchParams } from 'react-router-dom';
import { ZEROWEI } from '../../../utils/constants';
import { Network, NetworkIcon, useNetwork, useWallet } from '@snx-v3/useBlockchain';
import { compactInteger } from 'humanize-plus';
import { isBaseAndromeda } from '@snx-v3/isBaseAndromeda';
import { CollateralIcon } from '@snx-v3/icons';
import { useMemo } from 'react';
import { wei } from '@synthetixio/wei';

export interface PoolCardProps {
  pool: {
    name: string;
    id: string;
  };
  network: Network;
  collaterals: string[];
  collateralTypes: {
    oracle_node_id: string;
    name: string;
    decimals: number;
    symbol: string;
    total_amount_deposited: string;
  }[];
  apr: {
    combinedApr: number;
    cumulativePnl: number;
  };
}

export const PoolCard = ({ pool, network, collaterals, apr, collateralTypes }: PoolCardProps) => {
  const navigate = useNavigate();
  const [queryParams] = useSearchParams();

  const { network: currentNetwork, setNetwork } = useNetwork();
  const { connect } = useWallet();

  const vaultTVL = collateralTypes.reduce((acc, type) => {
    const amount = wei(type.total_amount_deposited, type.decimals, true);
    return acc.add(amount);
  }, ZEROWEI);

  const sanitizedCollateralTypes = collateralTypes.map((collateralType) => {
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
        onClick={() => {
          navigate(`/pools/${pool.id}`, { state: { networkId: network.id } });
        }}
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
            {[1, 42161].includes(network.id) && (
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
                {(vaultTVL?.toNumber() && `$${compactInteger(vaultTVL.toNumber(), 1)}`) || '-'}
              </Text>
            </Flex>
            <Flex alignItems="center" gap={2}>
              <Text fontSize="20px" fontWeight="bold" color="gray.500">
                APR
              </Text>
              <Text fontWeight="bold" fontSize="20px" color="white" lineHeight="36px">
                {apr.combinedApr > 0 ? apr.combinedApr.toFixed(2)?.concat('%') : '-'}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Divider mt="18px" mb="10px" />
        <Flex flexWrap="wrap" gap={6}>
          {sanitizedCollateralTypes?.map((type) => (
            <Flex alignItems="center" key={type.oracle_node_id} gap={4} mt={3}>
              <Flex alignItems="center">
                <CollateralIcon width="26px" height="26px" symbol={type.symbol} />
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
              </Flex>
              <Button
                onClick={async (e) => {
                  try {
                    e.stopPropagation();
                    if (!currentNetwork) {
                      connect();
                      setNetwork(network.id);
                      queryParams.set('manageAction', 'deposit');
                      navigate({
                        pathname: `/positions/${type.symbol}/${pool.id}`,
                        search: queryParams.toString(),
                      });
                      return;
                    }

                    if (currentNetwork?.id !== network.id) {
                      if (!(await setNetwork(network.id))) {
                        queryParams.set('manageAction', 'deposit');
                        navigate({
                          pathname: `/positions/${type.symbol}/${pool.id}`,
                          search: queryParams.toString(),
                        });
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
          ))}
        </Flex>
      </Flex>
    </Fade>
  );
};
