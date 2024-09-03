import { Alert, AlertIcon, AlertProps, Text } from '@chakra-ui/react';
import Wei from '@synthetixio/wei';

interface CollateralAlertProps extends AlertProps {
  tokenBalance: Wei;
}

export const CollateralAlert = ({ tokenBalance, ...props }: CollateralAlertProps) => {
  return (
    <Alert borderLeftColor="cyan.500" borderRadius="6px" {...props}>
      <AlertIcon color="cyan.500" />
      <Text color="white" fontFamily="heading" fontSize="16px" lineHeight="24px">
        You have a {tokenBalance.toString(2)} SNX active staking position on V2.
        <Text as="span" color="cyan.500" cursor="pointer">
          &nbsp;Migrate to V3
        </Text>
      </Text>
    </Alert>
  );
};
