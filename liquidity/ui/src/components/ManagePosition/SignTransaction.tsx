import { Button, Divider, Flex, Heading, Spinner, Text } from '@chakra-ui/react';
import Wei from '@synthetixio/wei';

export interface Transaction {
  loading: boolean;
  done: boolean;
  title: string;
  subline: string;
  exec: (arg?: any) => Promise<any>;
  arg?: Wei | boolean;
}

export function SignTransaction({
  transactions,
  buttonText,
  actionButtonClick,
  header,
  isFirstDeposit,
}: {
  transactions: Transaction[];
  buttonText: string;
  actionButtonClick: (action: string) => void;
  header: string;
  isFirstDeposit: boolean;
}) {
  if (isFirstDeposit) {
    return (
      <>
        <Flex
          flexDir="column"
          gap="6"
          border="1px solid"
          borderColor="gray.900"
          rounded="base"
          p="6"
          h="fit-content"
        >
          <Heading color="gray.50" fontSize="20px">
            {header}
          </Heading>
          <Divider />
          {transactions.map((transaction, index) => (
            <Flex
              key={transaction.title.concat(index.toString())}
              bg="rgba(0,0,0,0.3)"
              border="1px solid"
              borderColor={transaction.done ? 'green.500' : 'gray.900'}
              rounded="base"
              px="3"
              py="4"
              gap="2"
              alignItems="center"
            >
              <Flex
                rounded="50%"
                minW="40px"
                minH="40px"
                bg={transaction.done ? 'green.500' : 'gray.900'}
                justifyContent="center"
                alignItems="center"
                fontWeight={700}
                color="white"
              >
                {transaction.loading ? <Spinner colorScheme="cyan" /> : index + 1}
              </Flex>
              <Flex flexDir="column">
                <Text color="white" fontWeight={700}>
                  {transaction.title}
                </Text>
                <Text fontSize="12px" color="gray.500">
                  {transaction.subline}
                </Text>
              </Flex>
            </Flex>
          ))}

          {transactions.some((transaction) => transaction.loading) ? (
            <Spinner colorScheme="cyan" alignSelf="center" />
          ) : (
            <Button
              onClick={() => {
                actionButtonClick('createPosition');
              }}
              data-cy="sign-transaction-button"
            >
              {buttonText}
            </Button>
          )}
        </Flex>
      </>
    );
  }
  return (
    <Flex flexDir="column" gap="6" rounded="base" p="6" h="fit-content">
      {transactions.map((transaction, index) => (
        <Flex
          key={transaction.title.concat(index.toString())}
          rounded="base"
          px="3"
          py="4"
          gap="2"
          alignItems="center"
          border="1px solid"
          borderColor="gray.900"
          mb="4"
        >
          <Flex
            rounded="50%"
            minW="40px"
            minH="40px"
            bg={transaction.done ? 'green.500' : 'gray.900'}
            justifyContent="center"
            alignItems="center"
            fontWeight={700}
            color="white"
          >
            {transaction.loading ? <Spinner colorScheme="cyan" /> : index + 1}
          </Flex>
          <Flex flexDir="column">
            <Text color="white" fontWeight={700}>
              {transaction.title}
            </Text>
            <Text fontSize="12px" color="gray.500">
              {transaction.subline}
            </Text>
          </Flex>
        </Flex>
      ))}

      {transactions.some((transaction) => transaction.loading) ? (
        <Spinner colorScheme="cyan" alignSelf="center" />
      ) : (
        <Button
          onClick={() => {
            actionButtonClick('createPosition');
          }}
          data-cy="sign-transaction-button"
        >
          {buttonText}
        </Button>
      )}
    </Flex>
  );
}
