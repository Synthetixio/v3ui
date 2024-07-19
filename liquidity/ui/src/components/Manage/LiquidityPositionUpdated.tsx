import { Alert, Button, Divider, Flex, Heading, Text } from '@chakra-ui/react';
import { CheckIcon } from '@snx-v3/Multistep';
import { ReactNode } from 'react';

export function LiquidityPositionUpdated({
  title,
  subline,
  alertText,
  summary,
  onClose,
}: {
  title?: ReactNode;
  subline?: ReactNode;
  alertText?: ReactNode;
  summary?: ReactNode;
  onClose: () => void;
}) {
  return (
    <Flex flexDir="column" gap="6" borderColor="gray.900" rounded="base" height="fit-content">
      {title && (
        <>
          <Heading color="gray.50" fontSize="20px" fontWeight={700}>
            {title}
          </Heading>
          <Divider />
        </>
      )}
      {subline && (
        <Text color="white" fontSize="14px" fontWeight={400}>
          {subline}
        </Text>
      )}
      <Alert colorScheme="green" rounded="base">
        <Flex bg="green.500" p="1" rounded="full" mr="2">
          <CheckIcon w="12px" h="12px" color="green.900" />
        </Flex>
        <Text color="white" fontSize="16px" fontWeight={400}>
          {alertText}
        </Text>
      </Alert>

      {summary}

      <Button w="100%" onClick={onClose} data-cy="liquidity-position-success-button">
        Continue
      </Button>
    </Flex>
  );
}
