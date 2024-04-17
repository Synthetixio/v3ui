import { InfoIcon } from '@chakra-ui/icons';
import { Badge, Box, Flex, Heading, Text, Tooltip } from '@chakra-ui/react';
import { CRatioProgressBar } from '../CRatioProgressBar';
import { useRecoilState } from 'recoil';
import { amountState } from '../../state/amount';
import Wei from '@synthetixio/wei';
import { useLocation } from 'react-router-dom';
import { calculateCRatio } from '@snx-v3/calculations';
import { useNetwork } from '@snx-v3/useBlockchain';
import { isBaseAndromeda } from '@snx-v3/isBaseAndromeda';
import { MAXUINT, ZEROWEI } from '../../utils/constants';

export function PositionOverview({
  currentCollateral,
  collateralType,
  collateralValue,
  debt,
  poolPnl,
  isLoading,
  cRatio,
  liquidationCratioPercentage,
  targetCratioPercentage,
  arithmeticOperations = 'add',
  price,
  dontUpdate = false,
}: {
  currentCollateral: Wei;
  collateralType: string;
  collateralValue: string;
  debt: Wei;
  poolPnl: string;
  cRatio?: number;
  liquidationCratioPercentage?: number;
  targetCratioPercentage?: number;
  isLoading: boolean;
  arithmeticOperations?: 'add' | 'sub' | 'none';
  price?: Wei;
  dontUpdate?: boolean;
}) {
  const [amountToDeposit] = useRecoilState(amountState);
  const { network } = useNetwork();
  const { pathname } = useLocation();
  const nextCRatio = isBaseAndromeda(network?.id, network?.preset)
    ? MAXUINT.toNumber()
    : debt.eq(0) && amountToDeposit.gt(0)
      ? MAXUINT.toNumber()
      : calculateCRatio(debt.abs(), new Wei(collateralValue).add(amountToDeposit)).toNumber();

  return (
    <Flex
      rounded="base"
      border="1px solid"
      borderColor="gray.900"
      p="6"
      bg="navy.700"
      flexDir="column"
      minW="710px"
    >
      <Heading fontSize="20px" mb="4">
        Overview
      </Heading>
      <Flex gap="4">
        <Flex
          rounded="base"
          border="1px solid"
          borderColor="gray.900"
          flexDir="column"
          gap="1"
          w="100%"
          p="4"
        >
          <Text color="gray.500" fontSize="16px">
            Collateral{' '}
            <Tooltip label="TODO" p="3">
              <InfoIcon w="12px" h="12px" />
            </Tooltip>
          </Text>
          <Text
            color="gray.500"
            fontSize="20px"
            fontWeight={800}
            display="flex"
            gap="1"
            data-cy="position-overview-collateral"
          >
            {currentCollateral.toNumber().toFixed(2)} {collateralType}{' '}
            {amountToDeposit.gt(0) && !dontUpdate && (
              <>
                {arithmeticOperations !== 'none' && (
                  <Text
                    color="white"
                    fontSize="20px"
                    fontWeight={800}
                    data-cy="position-overview-collateral-arrow"
                  >
                    &rarr;{' '}
                    {currentCollateral[arithmeticOperations](amountToDeposit).toNumber().toFixed(2)}{' '}
                    {collateralType}
                  </Text>
                )}
              </>
            )}
          </Text>
          <Text color="gray.500" fontSize="16px" display="flex" gap="1">
            ${collateralValue}{' '}
            {amountToDeposit.gt(0) && !dontUpdate && (
              <>
                {arithmeticOperations !== 'none' && (
                  <Text color="white" fontSize="16px">
                    &rarr; $
                    {currentCollateral[arithmeticOperations](amountToDeposit)
                      .mul(price || ZEROWEI)
                      .toNumber()
                      .toFixed(2)}
                  </Text>
                )}
              </>
            )}
          </Text>
        </Flex>
        <Flex
          rounded="base"
          border="1px solid"
          borderColor="gray.900"
          flexDir="column"
          gap="4"
          w="100%"
          p="4"
        >
          <Text color="gray.500" fontSize="14px">
            Debt{' '}
            <Tooltip label="TODO" p="3">
              <InfoIcon w="12px" h="12px" />
            </Tooltip>
          </Text>
          <Text
            color={debt.eq(0) ? 'gray.500' : 'white'}
            fontSize="20px"
            fontWeight={debt.eq(0) ? 400 : 700}
            display="flex"
            alignItems="center"
            gap="2"
            data-cy="position-overview-debt"
          >
            ${debt.toNumber().toLocaleString('en-US', { maximumFractionDigits: 2 })}
            {pathname.includes('repay') && debt.lt(0) && (
              <Badge variant="outline" colorScheme="green" bg="green.900">
                CREDIT AVAILABLE
              </Badge>
            )}
          </Text>
          <Text color="gray.500" fontSize="12px" display="flex" alignItems="center" gap="2">
            Pool PNL{' '}
            <Tooltip label="TODO" p="3">
              <InfoIcon w="12px" h="12px" />
            </Tooltip>
            <Text color="gray.500" fontSize="20px" fontWeight={800}>
              {poolPnl}
            </Text>
          </Text>
        </Flex>
      </Flex>
      <Box px="4" py="6" border="1px solid" borderColor="gray.900" rounded="base" mt="4">
        <CRatioProgressBar
          currentCRatioPercentage={cRatio}
          liquidationCratioPercentage={liquidationCratioPercentage}
          newCratioPercentage={nextCRatio}
          targetCratioPercentage={targetCratioPercentage}
          targetThreshold={1}
          isLoading={isLoading}
        />
      </Box>
    </Flex>
  );
}
