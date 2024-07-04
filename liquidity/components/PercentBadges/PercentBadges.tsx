import { FC } from 'react';
import { Flex, Button } from '@chakra-ui/react';
export const PercentBadges: FC<{
  disabled: boolean;
  onBadgePress: (num: number) => void;
  activeBadge: number;
}> = ({ onBadgePress, activeBadge, disabled }) => {
  return (
    <Flex w="100%" justifyContent="space-between" mt={2} mb={1}>
      <Button
        sx={{
          bg: activeBadge >= 0.25 ? 'cyan.500' : 'whiteAlpha.300',
          color: activeBadge >= 0.25 ? 'black' : 'cyan.500',
          cursor: disabled ? 'not-allowed' : 'pointer',
        }}
        mr={1}
        onClick={disabled ? undefined : () => onBadgePress(0.25)}
        color="cyan.500"
        bg="whiteAlpha.300"
        fontFamily="heading"
        py={1}
        px={2}
        borderRadius="base"
        borderWidth="1px"
        borderColor="transparent"
        width="100%"
        textAlign="center"
        userSelect="none"
      >
        25%
      </Button>
      <Button
        variant="percent"
        sx={{
          bg: activeBadge >= 0.5 ? 'cyan.500' : 'whiteAlpha.300',
          color: activeBadge >= 0.5 ? 'black' : 'cyan.500',
          cursor: disabled ? 'not-allowed' : 'pointer',
        }}
        mx={1}
        onClick={disabled ? undefined : () => onBadgePress(0.5)}
        data-cy="manage-percent-50"
        color="cyan.500"
        bg="whiteAlpha.300"
        fontFamily="heading"
        py={1}
        px={2}
        borderRadius="base"
        borderWidth="1px"
        borderColor="transparent"
        width="100%"
        textAlign="center"
        userSelect="none"
      >
        50%
      </Button>
      <Button
        variant="percent"
        sx={{
          bg: activeBadge >= 0.75 ? 'cyan.500' : 'whiteAlpha.300',
          color: activeBadge >= 0.75 ? 'black' : 'cyan.500',
          cursor: disabled ? 'not-allowed' : 'pointer',
        }}
        mx={1}
        onClick={disabled ? undefined : () => onBadgePress(0.75)}
        color="cyan.500"
        bg="whiteAlpha.300"
        fontFamily="heading"
        py={1}
        px={2}
        borderRadius="base"
        borderWidth="1px"
        borderColor="transparent"
        width="100%"
        textAlign="center"
        userSelect="none"
      >
        75%
      </Button>
      <Button
        variant="percent"
        sx={{
          bg: activeBadge === 1 ? 'cyan.500' : 'whiteAlpha.300',
          color: activeBadge === 1 ? 'black' : 'cyan.500',
          cursor: disabled ? 'not-allowed' : 'pointer',
        }}
        ml={1}
        onClick={disabled ? undefined : () => onBadgePress(1)}
        color="cyan.500"
        bg="whiteAlpha.300"
        fontFamily="heading"
        py={1}
        px={2}
        borderRadius="base"
        borderWidth="1px"
        borderColor="transparent"
        width="100%"
        textAlign="center"
        userSelect="none"
      >
        100%
      </Button>
    </Flex>
  );
};
