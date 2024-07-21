import { FC, ReactNode } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import Wei from '@synthetixio/wei';
import { ArrowForwardIcon } from '@chakra-ui/icons';

const styles = {
  sm: {
    fontSize: '12px',
    fontWeight: '700',
    lineHeight: '14px',
  },
  md: {
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '16px',
  },
  lg: {
    fontSize: '18px',
    fontWeight: '800',
    lineHeight: '32px',
  },
};
export const ChangeStat: FC<{
  value: Wei;
  newValue: Wei;
  hasChanges: boolean;
  dataTestId?: string;
  formatFn: (val: Wei) => ReactNode;
  withColor?: boolean;
  size?: 'sm' | 'md' | 'lg';
}> = ({ formatFn, value, newValue, hasChanges, dataTestId, withColor, size = 'lg' }) => {
  return (
    <Flex
      gap="1"
      alignItems="center"
      color="white"
      fontSize={styles[size].fontSize}
      fontWeight={styles[size].fontWeight}
      lineHeight={styles[size].lineHeight}
    >
      <Text
        data-cy={dataTestId}
        textAlign="center"
        color={withColor && value.gt(0) ? 'green.700' : value.lt(0) ? 'red.700' : 'gray.50'}
      >
        {formatFn(value)}
      </Text>
      {hasChanges && !value.eq(newValue) ? (
        <>
          <ArrowForwardIcon />
          <Text
            textAlign="center"
            color={
              withColor && newValue.gt(0) ? 'green.700' : newValue.lt(0) ? 'red.700' : 'gray.50'
            }
          >
            {formatFn(newValue)}
          </Text>
        </>
      ) : null}
    </Flex>
  );
};
