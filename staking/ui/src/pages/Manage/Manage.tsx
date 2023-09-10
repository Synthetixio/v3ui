import { Box, Button, Flex, Heading, Spinner, Text } from '@chakra-ui/react';
import { BorderBox } from '@snx-v3/BorderBox';
import { useParams } from '@snx-v3/useParams';
import { CollateralType, useCollateralType } from '@snx-v3/useCollateralTypes';
import { FC } from 'react';
import { CollateralIcon } from '@snx-v3/icons';
import { ManageAction } from './ManageActions';
import { ManagePositionProvider } from '@snx-v3/ManagePositionContext';
import { ManageStats } from './ManageStats';
import { HomeLink } from '@snx-v3/HomeLink';
import { usePool } from '@snx-v3/usePools';
import { generatePath, NavigateFunction, useNavigate } from 'react-router-dom';
import { WithdrawIncrease } from '@snx-v3/WithdrawIncrease';

export const ManageUi: FC<{
  collateralType: CollateralType;
  poolName?: string;
  poolId?: string;
  navigate: NavigateFunction;
}> = ({ collateralType, poolName, poolId, navigate }) => {
  return (
    <Box>
      <WithdrawIncrease />
      <Box mb="4">
        <HomeLink />
      </Box>
      <Flex>
        <Heading
          fontWeight={700}
          fontSize="2xl"
          color="gray.50"
          display="flex"
          alignItems="center"
          mb="1"
        >
          {poolName} Liquidity Position
        </Heading>

        <Button
          ml="auto"
          size="sm"
          onClick={() =>
            navigate({
              pathname: generatePath('/pools/:poolId', { poolId: poolId! }),
            })
          }
          variant="outline"
        >
          Pool Info
        </Button>
      </Flex>
      <Flex mb={5} alignItems="top" gap={3.5}>
        <Heading
          fontSize="1xl"
          fontWeight="400"
          color="gray.200"
          display="inline-flex"
          alignItems="center"
        >
          Pool #{poolId}
        </Heading>
        <Heading
          fontSize="1xl"
          fontWeight="400"
          color="gray.200"
          display="inline-flex"
          alignItems="center"
        >
          <CollateralIcon
            symbol={collateralType.symbol}
            width="28px"
            height="28px"
            fill="#0B0B22"
            color="#00D1FF"
          />
          {collateralType.displaySymbol} Vault
        </Heading>
      </Flex>
      <Flex gap={4}>
        <BorderBox p={4} flexDirection="column" pb={5}>
          <Text fontWeight="700" fontSize="xl" color="gray.50" mb="1">
            Manage Position
          </Text>
          <Text color="gray.400" fontSize="sm" mb="2">
            The Collateralization Ratio (C-Ratio) is calculated by dividing the value of the
            position’s collateral by the value of the position’s debt.{' '}
            <Text fontWeight="700" display="inline" color="white">
              This position will be liquidated if the C-Ratio drops below the Liquidation C-Ratio.
            </Text>
          </Text>
          <ManageAction />
        </BorderBox>
        <Box minW="450px">
          <ManageStats />
        </Box>
      </Flex>
    </Box>
  );
};

export const Manage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const collateralType = useCollateralType(params.collateralSymbol);
  const pool = usePool(params.poolId);

  if (!collateralType) {
    return <Spinner />; // TODO skeleton
  }

  return (
    <ManagePositionProvider>
      <ManageUi
        collateralType={collateralType}
        navigate={navigate}
        poolName={pool?.name}
        poolId={pool?.id}
      />
    </ManagePositionProvider>
  );
};
