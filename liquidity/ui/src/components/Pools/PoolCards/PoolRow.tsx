import { Flex, Button, Text, Fade } from '@chakra-ui/react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  MAINNET,
  Network,
  NetworkIcon,
  SEPOLIA,
  useNetwork,
  useWallet,
} from '@snx-v3/useBlockchain';
import { wei } from '@synthetixio/wei';
import { BigNumberish } from 'ethers';
import { TokenIcon } from '../../TokenIcon';
import { CollateralType } from '@snx-v3/useCollateralTypes';
import { Sparkles } from '@snx-v3/icons';
import { formatNumber, formatNumberToUsd } from '@snx-v3/formatters';
import { formatApr } from '../CollateralSection';
import { Tooltip } from '@snx-v3/Tooltip';
import { useTokenBalanceForChain } from '@snx-v3/useTokenBalance';
import { getSpotMarketId, isBaseAndromeda } from '@snx-v3/isBaseAndromeda';
import { useGetWrapperToken } from '@snx-v3/useGetUSDTokens';
import { ZEROWEI } from '@snx-v3/constants';
import { MigrationBanner } from '../../Migration/MigrationBanner';
import { Specifics } from './Specifics';

interface CollateralTypeWithDeposited extends CollateralType {
  collateralDeposited: string;
}

export interface Props {
  collateralType: CollateralTypeWithDeposited;
  pool: {
    name: string;
    id: string;
  };
  network: Network;
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

export const PoolRow = ({ pool, network, apr, collateralType, collateralPrices }: Props) => {
  const { data: wrapperToken } = useGetWrapperToken(
    getSpotMarketId(collateralType.symbol),
    network
  );
  const isBase = isBaseAndromeda(network?.id, network?.preset);
  // TODO: This will need refactoring
  const balanceAddress = isBase ? wrapperToken : collateralType?.tokenAddress;

  const { data: balance } = useTokenBalanceForChain(balanceAddress, network);
  const navigate = useNavigate();
  const [queryParams] = useSearchParams();

  const { network: currentNetwork, setNetwork } = useNetwork();
  const { connect } = useWallet();

  const price = wei(
    collateralPrices?.find(
      (price) => price.symbol.toUpperCase() === collateralType.symbol.toUpperCase()
    )?.price || ZEROWEI
  );

  const collateralApr = apr.collateralAprs.find(
    (apr) => apr.collateralType === collateralType.tokenAddress.toLowerCase()
  ) || { apr28d: 0, apr28dRewards: 0, apr28dPnl: 0 };

  const { apr28d, apr28dRewards, apr28dPnl } = collateralApr;

  const onClick = async () => {
    try {
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
        pathname: `/positions/${collateralType.symbol}/${pool.id}`,
        search: queryParams.toString(),
      });
    } catch (error) {}
  };

  const buttonText = !currentNetwork ? 'Connect Wallet' : 'Deposit';

  return (
    <Fade in>
      <Flex
        flexDir="column"
        w="100%"
        border="1px solid"
        borderColor="gray.900"
        rounded="base"
        bg="navy.700"
        px={3}
        py={4}
      >
        <Flex px={4} flexDir="row" w="100%" gap={4}>
          <Flex width="190px" alignItems="center" _hover={{ cursor: 'pointer' }} onClick={onClick}>
            <Flex position="relative">
              <TokenIcon w={40} h={40} symbol={collateralType.symbol} />
              <NetworkIcon
                position="absolute"
                right={0}
                bottom={0}
                networkId={network.id}
                size="14px"
              />
            </Flex>
            <Flex flexDirection="column" ml={3} mr="auto">
              <Text
                fontSize="14px"
                color="white"
                fontWeight={700}
                lineHeight="1.25rem"
                fontFamily="heading"
              >
                {collateralType.symbol}
              </Text>
              <Text
                textTransform="capitalize"
                fontSize="xs"
                color="gray.500"
                fontFamily="heading"
                lineHeight="1rem"
              >
                {network.name} Network
              </Text>
            </Flex>
          </Flex>
          <Flex width="220px" direction="column" alignItems="flex-end">
            <Text
              fontFamily="heading"
              fontSize="14px"
              fontWeight={500}
              lineHeight="28px"
              color="white"
            >
              {balance ? formatNumberToUsd(balance.mul(price).toNumber()) : '-'}
            </Text>
            <Text color="gray.500" fontFamily="heading" fontSize="12px" lineHeight="16px">
              {balance ? formatNumber(balance.toNumber()) : ''} {collateralType.symbol}
            </Text>
          </Flex>
          <Flex width="189px" flexDir="column" justifyContent="cetner" alignItems="flex-end">
            <Text
              fontFamily="heading"
              fontSize="14px"
              fontWeight={500}
              lineHeight="28px"
              color="white"
            >
              SC Pool
            </Text>
            <Text color="gray.500" fontFamily="heading" fontSize="12px" lineHeight="16px">
              Spartan Council
            </Text>
          </Flex>
          <Flex width="144px" alignItems="center" justifyContent="flex-end">
            <Text
              fontFamily="heading"
              fontSize="14px"
              lineHeight="20px"
              fontWeight={500}
              color="white"
              textAlign="right"
            >
              {price
                ? formatNumberToUsd(
                    wei(collateralType.collateralDeposited, Number(collateralType.decimals), true)
                      .mul(price)
                      .toNumber()
                  )
                : 0}
            </Text>
          </Flex>
          <Flex width="144px" alignItems="center" justifyContent="flex-end">
            <Text
              fontFamily="heading"
              fontSize="14px"
              lineHeight="20px"
              fontWeight={500}
              color="white"
            >
              {formatApr(apr28d * 100, network?.id)}
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
                <Flex as="span" display="inline">
                  <Sparkles w="14px" h="14px" mb={1} ml="0.5px" mt="1px" />
                </Flex>
              </Tooltip>
            </Text>
          </Flex>
          <Flex alignItems="center" justifyContent="flex-end" width="121px" textAlign="right">
            <Specifics network={network} collateralType={collateralType} />
          </Flex>
          <Flex minW="159px" flex="1" justifyContent="flex-end">
            <Button
              onClick={onClick}
              size="sm"
              height="32px"
              py="10px"
              px={2}
              whiteSpace="nowrap"
              borderRadius="4px"
              fontFamily="heading"
              fontWeight={700}
              fontSize="14px"
              lineHeight="20px"
            >
              {buttonText}
            </Button>
          </Flex>
        </Flex>

        {[MAINNET.id, SEPOLIA.id].includes(network.id) && (
          <MigrationBanner network={network} type="banner" />
        )}
      </Flex>
    </Fade>
  );
};
