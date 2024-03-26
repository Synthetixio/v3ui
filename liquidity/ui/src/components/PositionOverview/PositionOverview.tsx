import { InfoIcon } from '@chakra-ui/icons';
import { Box, Flex, Heading, Text, Tooltip } from '@chakra-ui/react';
import { CRatioProgressBar } from '../CRatioProgressBar';
import { useRecoilState } from 'recoil';
import { depositState } from '../../state/deposit';
import Wei from '@synthetixio/wei';

export function PositionOverview({
  currentCollateral,
  collateralType,
  collateralValue,
  debt,
  poolPnl,
  isLoading,
  priceOfToDeposit,
  cRatio,
  liquidationCratioPercentage,
  targetCratioPercentage,
}: {
  currentCollateral: Wei;
  collateralType: string;
  collateralValue: string;
  debt: string;
  poolPnl: string;
  cRatio?: number;
  liquidationCratioPercentage?: number;
  targetCratioPercentage?: number;
  isLoading: boolean;
  priceOfToDeposit: Wei;
}) {
  const [amountToDeposit] = useRecoilState(depositState);
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
          <Text color="gray.500" fontSize="20px" fontWeight={800} display="flex" gap="1">
            {currentCollateral.toNumber().toFixed(2)} {collateralType}{' '}
            {amountToDeposit.gt(0) && (
              <>
                &rarr;
                <Text color="white" fontSize="20px" fontWeight={800}>
                  {currentCollateral.add(amountToDeposit).toNumber().toFixed(2)} {collateralType}
                </Text>
              </>
            )}
          </Text>
          <Text color="gray.500" fontSize="16px" display="flex" gap="1">
            ${collateralValue}{' '}
            {amountToDeposit.gt(0) && (
              <>
                &rarr;
                <Text color="white" fontSize="16px">
                  $
                  {currentCollateral
                    .add(amountToDeposit.mul(priceOfToDeposit))
                    .toNumber()
                    .toFixed(2)}
                </Text>
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
          <Text color="gray.500" fontSize="14px">
            ${debt}
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
          newCratioPercentage={cRatio}
          targetCratioPercentage={targetCratioPercentage}
          targetThreshold={1}
          isLoading={isLoading}
        />
      </Box>
    </Flex>
  );
}
