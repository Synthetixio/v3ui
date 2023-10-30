import { Flex, Fade, Heading, Button, Table, Thead, Tr, Th, Tbody, Box } from '@chakra-ui/react';
import { BorderBox } from '@snx-v3/BorderBox';
import { CollateralType } from '@snx-v3/useCollateralTypes';
import { LiquidityPositionsById } from '@snx-v3/useLiquidityPositions';
import { Link, generatePath } from 'react-router-dom';
import { VaultRow } from './';
import { PoolType } from '@snx-v3/usePools';

interface PoolcardProps {
  pool: PoolType;
  collateralTypes?: CollateralType[];
  liquidityPositionsById?: LiquidityPositionsById;
}

export const PoolCard = ({ pool, collateralTypes, liquidityPositionsById }: PoolcardProps) => {
  return (
    <BorderBox p={4} mt={8} flexDir="column">
      <Flex
        justifyContent="space-between"
        flexWrap={{ base: 'wrap', md: 'nowrap' }}
        alignItems="center"
      >
        <Flex
          alignItems="baseline"
          justifyContent="flex-start"
          flexDirection={{ base: 'column', md: 'row' }}
        >
          <Fade in>
            <Heading fontSize="2xl">{pool.name}</Heading>
          </Fade>
        </Flex>
        {pool.id && (
          <Fade in>
            <Button
              as={Link}
              mt={{ base: 2, md: 0 }}
              size="sm"
              to={{
                pathname: generatePath('/pools/:poolId', { poolId: pool.id }),
                search: location.search,
              }}
              variant="outline"
            >
              Pool Info
            </Button>
          </Fade>
        )}
      </Flex>
      <Box overflowX="auto">
        <Table mt={8} size="sm" variant="unstyled" mb="9">
          <Thead sx={{ tr: { borderBottomColor: 'gray.900', borderBottomWidth: '1px' } }}>
            <Tr>
              <Th color="gray.500" fontSize="xs" lineHeight="4" pb="3" textTransform="initial">
                Collateral
              </Th>
              <Th color="gray.500" fontSize="xs" lineHeight="4" pb="3" textTransform="initial">
                Debt
              </Th>
              <Th color="gray.500" fontSize="xs" lineHeight="4" pb="3" textTransform="initial">
                C-Ratio
              </Th>
              <Th color="gray.500" fontSize="xs" lineHeight="4" pb="3" textTransform="initial">
                Issuance Ratio
              </Th>
              <Th color="gray.500" fontSize="xs" lineHeight="4" pb="3" textTransform="initial">
                Liquidation Ratio
              </Th>
              <Th color="gray.500" fontSize="xs" lineHeight="4" pb="2" textTransform="initial"></Th>
            </Tr>
          </Thead>
          <Tbody sx={{ tr: { borderBottomColor: 'gray.900', borderBottomWidth: '1px' } }}>
            <>
              {collateralTypes &&
                collateralTypes.map((c) => (
                  <VaultRow
                    key={c.tokenAddress}
                    collateralType={c}
                    poolId={pool.id}
                    liquidityPosition={liquidityPositionsById?.[`${pool.id}-${c.symbol}`]}
                  />
                ))}
            </>
          </Tbody>
        </Table>
      </Box>
    </BorderBox>
  );
};
