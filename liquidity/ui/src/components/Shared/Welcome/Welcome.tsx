import { Flex, Box, Alert, AlertIcon, Text, Link } from '@chakra-ui/react';

export const Welcome = () => (
  <Flex alignItems="flex-end" flexWrap={{ base: 'wrap', md: 'nowrap' }} mb="8">
    <Box flexGrow={1}>
      <Alert status="warning">
        <AlertIcon />
        <Box>
          This is an experimental prototype for Synthetix V3.{' '}
          <Text fontWeight="bold" display="inline">
            Governance voting power is still exclusively determined based on
            participation in{' '}
            <Link textDecoration="underline" href="https://staking.synthetix.io">
              Synthetix V2
            </Link>
            .
          </Text>
        </Box>
      </Alert>
    </Box>
  </Flex>
);
