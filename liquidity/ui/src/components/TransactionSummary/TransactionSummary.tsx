import { Flex, FlexProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface Props extends FlexProps {
  items: {
    label: ReactNode;
    value: ReactNode;
  }[];
}

export const TransactionSummary = ({ items, ...props }: Props) => (
  <Flex p={3.5} borderRadius="4px" background="#1F1F34" flexDir="column" gap={3} {...props}>
    {items.map(({ value, label }, i) => (
      <Flex fontWeight={700} fontSize="12px" key={i} flex={1} width="100%">
        <Flex alignItems="center" justify="flex-start" textAlign="left" flexGrow={1}>
          {label}
        </Flex>
        <Flex alignItems="center" justify="flex-end" textAlign="right" flexGrow={1}>
          {value}
        </Flex>
      </Flex>
    ))}
  </Flex>
);
