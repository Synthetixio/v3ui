import { Flex, Button, Text } from '@chakra-ui/react';
import { useWallet } from '@snx-v3/useBlockchain';

export const PositionsNotConnected = () => {
  const { connect } = useWallet();
  return (
    <Flex w="100%" justifyContent="space-between" alignItems="center">
      <Text color="gray.500" fontWeight={500} fontSize="14px" lineHeight="14px" my="4" pl="3">
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
  );
};
