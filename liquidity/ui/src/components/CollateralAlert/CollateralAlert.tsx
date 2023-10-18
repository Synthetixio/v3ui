import { Alert, AlertIcon, AlertProps, Link, Text } from '@chakra-ui/react';
import Wei from '@synthetixio/wei';

interface CollateralAlertProps extends AlertProps {
  tokenBalance: Wei;
}

export const CollateralAlert = ({ tokenBalance, ...props }: CollateralAlertProps) => {
  return (
    <Alert borderLeftColor="cyan.500" borderRadius="6px" {...props}>
      <AlertIcon color="cyan.500" />
      <Text color="white" fontFamily="heading" fontSize="16px" lineHeight="24px">
        You have a {tokenBalance.toString(2)} SNX active staking position on V2. You&lsquo;ll need
        to unstake on V2 before being able to deposit on V3.{' '}
        <Link textDecor="underline" href="https://staking.synthetix.io/" target="_blank">
          Go to V2
        </Link>
      </Text>
    </Alert>
  );
};
