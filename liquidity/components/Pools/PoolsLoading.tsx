import { Box, Fade, Flex, Heading, Table, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import { BorderBox } from '@snx-v3/BorderBox';
import { VaultRowLoading } from './';

export const PoolsLoading = () => {
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
            <Heading fontSize="2xl">Loading Pools...</Heading>
          </Fade>
        </Flex>
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
            {Array.from({ length: 2 }).map((_, i) => (
              <VaultRowLoading
                key={i}
                startColor={i % 2 ? 'whiteAlpha.200' : 'whiteAlpha.500'}
                endColor={i % 2 ? 'whiteAlpha.500' : 'whiteAlpha.200'}
              />
            ))}
          </Tbody>
        </Table>
      </Box>
    </BorderBox>
  );
};
