import {
  Button,
  Fade,
  Flex,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
} from '@chakra-ui/react';
import Wei from '@synthetixio/wei';
import PositionRow from './PositionsRow';
import PositionTableHeader from './PositionTableHeader';
import PositionsRowLoading from './PositionsRowLoading';
import { Link, generatePath } from 'react-router-dom';
import { useWallet } from '@snx-v3/useBlockchain';
import { LiquidityPositionType } from '@snx-v3/useLiquidityPositions';

interface PositionsTableInterface {
  isLoading: boolean;
  positionsByKey?: Record<`${string}-${string}`, LiquidityPositionType>;
}

export const PositionsTable = ({ isLoading, positionsByKey }: PositionsTableInterface) => {
  const { activeWallet, connect } = useWallet();
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
        <Flex w="100%" justifyContent="space-between">
          <Text color="gray.500" fontWeight={500} fontSize="14px" mt="4">
            Please connect wallet to view assets
          </Text>
          <Button
            size="sm"
            onClick={() => {
              connect();
            }}
          >
            Connect Wallet
          </Button>
        </Flex>
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
              <Tr border="none" borderTop="1px" borderTopColor="gray.900" width="100%" height="0px">
                <Td height="0px" border="none" px={0} pt={0} pb={4} />
                <Td height="0px" border="none" px={0} pt={0} pb={4} />
                <Td height="0px" border="none" px={0} pt={0} pb={4} />
                <Td height="0px" border="none" px={0} pt={0} pb={4} />
                <Td height="0px" border="none" px={0} pt={0} pb={4} />
                <Td height="0px" border="none" px={0} pt={0} pb={4} />
                <Td height="0px" border="none" px={0} pt={0} pb={4} />
                <Td height="0px" border="none" px={0} pt={0} pb={4} />
              </Tr>
              {isLoading ? (
                <>
                  <PositionsRowLoading />
                  <PositionsRowLoading />
                </>
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
