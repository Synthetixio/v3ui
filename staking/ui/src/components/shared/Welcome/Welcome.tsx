import { Flex, Box, Alert, AlertIcon, Text, Link } from '@chakra-ui/react';

export const Welcome = () => (
  <Flex alignItems="flex-end" flexWrap={{ base: 'wrap', md: 'nowrap' }}>
    <Box flexGrow={1}>
      <Alert status="warning">
        <AlertIcon />
        <Box>
          This is an experimental prototype for Synthetix V3.{' '}
          <Text fontWeight="bold" display="inline">
            Any incentives (including voting power) are exclusively determined based on
            participation in the{' '}
            <Link textDecoration="underline" href="https://staking.synthetix.io">
              Synthetix V2 system
            </Link>
            .
          </Text>
        </Box>
      </Alert>
    </Box>
  </Flex>
);
