import { FC, ReactNode } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import Wei from '@synthetixio/wei';
import { ArrowForwardIcon } from '@chakra-ui/icons';

export const ChangeStat: FC<{
  value: Wei;
  newValue: Wei;
  hasChanges: boolean;
  dataTestId?: string;
  formatFn: (val: Wei) => ReactNode;
  withColor?: boolean;
  size?: 'sm' | 'lg';
}> = ({ formatFn, value, newValue, hasChanges, dataTestId, withColor, size = 'lg' }) => {
  return (
    <Flex
      gap={1.5}
      alignItems="center"
      color="white"
      fontSize={size === 'lg' ? '20px' : '12px'}
      fontWeight={size === 'lg' ? '800' : '700'}
      lineHeight={size === 'lg' ? '32px' : '14px'}
    >
      <Text
        data-cy={dataTestId}
        color={withColor && value.gt(0) ? 'green.700' : value.lt(0) ? 'red.700' : 'gray.50'}
      >
        {formatFn(value)}
      </Text>
      {hasChanges && !value.eq(newValue) ? (
        <>
          <ArrowForwardIcon />
          <Text
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
