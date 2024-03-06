import { Button, Fade, Flex, Heading, Table, TableContainer, Tbody } from '@chakra-ui/react';
import { Link, generatePath } from 'react-router-dom';
import { useWallet } from '@snx-v3/useBlockchain';
import { LiquidityPositionType } from '@snx-v3/useLiquidityPositions';
import {
  PositionsNotConnected,
  PositionRow,
  PositionTableHeader,
  PositionsRowLoading,
  PositionsEmpty,
  TableDivider,
} from './';

interface PositionsTableInterface {
  isLoading: boolean;
  positionsByKey?: Record<`${string}-${string}`, LiquidityPositionType>;
}

export const PositionsTable = ({ isLoading, positionsByKey }: PositionsTableInterface) => {
  const { activeWallet } = useWallet();

  const positionsIds = !!positionsByKey
    ? (Object.keys(positionsByKey) as `${string}-${string}`[])
    : [];

  const positions = positionsByKey && positionsIds.map((id) => positionsByKey[id]);

  return (
    <TableContainer
      maxW="100%"
      mt={4}
      borderColor="gray.900"
      borderWidth="1px"
      borderRadius="5px"
      p={6}
      sx={{
        borderCollapse: 'separate !important',
        borderSpacing: 0,
      }}
      bg="navy.700"
    >
      {!activeWallet?.address ? (
        <PositionsNotConnected />
      ) : positionsIds?.length === 0 && !isLoading ? (
        <PositionsEmpty />
      ) : (
        <>
          <Flex alignItems="center" justifyContent="space-between">
            <Heading fontSize="18px" fontWeight={700} lineHeight="28px" color="gray.50">
              Spartan Council Pool
            </Heading>
            <Fade in>
              <Button
                as={Link}
                mt={{ base: 2, md: 0 }}
                size="sm"
                to={{
                  pathname: generatePath('/pools/:poolId', { poolId: '1' }),
                  search: location.search,
                }}
                variant="outline"
              >
                Pool Info
              </Button>
            </Fade>
          </Flex>
          <Table variant="simple">
            <PositionTableHeader />
            <Tbody>
              <TableDivider />
              {isLoading ? (
                <PositionsRowLoading />
              ) : (
                <>
                  {positions?.map((position, index) => (
                    <PositionRow
                      key={position.poolName.concat(index.toString())}
                      {...position}
                      final={index === positions.length - 1}
                    />
                  ))}
                </>
              )}
            </Tbody>
          </Table>
        </>
      )}
    </TableContainer>
  );
};
