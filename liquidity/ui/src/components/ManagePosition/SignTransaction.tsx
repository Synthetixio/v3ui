import { Button, Flex, Spinner, Text } from '@chakra-ui/react';

interface Transaction {
  loading: boolean;
  done: boolean;
  title: string;
  subline: string;
}

export function SignTransaction({
  transactions,
  buttonText,
  actionButtonClick,
}: {
  transactions: Transaction[];
  buttonText: string;
  actionButtonClick: (action: string) => void;
}) {
  return (
    <>
      <Flex flexDir="column" gap="6">
        {transactions.map((transaction, index) => (
          <Flex
            key={transaction.title.concat(index.toString())}
            bg="rgba(0,0,0,0.3)"
            border="1px solid"
            borderColor={transaction.done ? 'gray.900' : 'green.500'}
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
              bg={transaction.done ? 'gray.900' : 'green.500'}
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
          >
            {buttonText}
          </Button>
        )}
      </Flex>
    </>
  );
}
