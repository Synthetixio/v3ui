import { Text } from '@chakra-ui/react';
import { Amount } from '@snx-v3/Amount';
import Wei from '@synthetixio/wei';
import { FC } from 'react';

interface Props {
  debt: Wei;
  showPNL?: boolean;
}

export const DebtAmount: FC<Props> = ({ debt, showPNL }) => {
  const amount = showPNL ? debt.mul(-1) : debt;

  return (
    <Text
      color={debt.eq(0) ? 'white.500' : debt.lt(0) ? 'green.500' : 'red.500'}
      lineHeight="1.25rem"
      fontFamily="heading"
      fontSize="sm"
    >
      <Amount prefix={`${amount.gte(0) ? '' : '-'}$`} value={amount.abs()} />
    </Text>
  );
};
