import { InfoIcon } from '@chakra-ui/icons';
import { Flex, Text, Tooltip, Fade } from '@chakra-ui/react';
import { SynthSkeleton as Skeleton } from '../Shared';
import { ReactNode } from 'react';

interface StatBoxProps {
  isLoading: boolean;
  title: string;
  label?: string | ReactNode;
  value?: string;
}

export const StatBox = ({ isLoading, title, label, value }: StatBoxProps) => {
  return (
    <Flex
      bg="navy.700"
      border="1px solid"
      borderColor="gray.900"
      rounded="base"
      flexDir="column"
      alignItems="center"
      justifyContent="space-between"
      w="297px"
      height="88px"
      px={6}
      py={4}
    >
      <Flex alignItems="center" mb={1}>
        <Text fontSize="14px" color="gray.500" mr={1}>
          {title}
        </Text>
        {label && (
          <Tooltip label={label} p={3} mt={1}>
            <InfoIcon w="10px" h="10px" />
          </Tooltip>
        )}
      </Flex>
      <Flex w="100%" justifyContent="center" height="36px" alignItems="center">
        <Skeleton
          isLoaded={!isLoading}
          height="24px"
          minWidth={isLoading ? '40%' : 'initial'}
          startColor="gray.700"
          endColor="navy.800"
        >
          <Fade in>
            <Text fontSize="24px" lineHeight="24px" fontWeight={800} data-cy={`${title}-stats-box`}>
              {value || '$0.00'}
            </Text>
          </Fade>
        </Skeleton>
      </Flex>
    </Flex>
  );
};
