import { Alert, Button, Divider, Flex, Heading, Link, Text } from '@chakra-ui/react';
import { useRecoilState } from 'recoil';
import { amountState } from '../../state/amount';
import { CheckIcon } from '@snx-v3/Multistep';
import Wei from '@synthetixio/wei';

export function LiquidityPositionUpdated({
  debt,
  currentCRatio,
  header,
  subline,
  alertText,
}: {
  debt: Wei;
  currentCRatio: string;
  header?: string;
  subline: string;
  alertText: string;
}) {
  const [amountToDeposit] = useRecoilState(amountState);
  return (
    <Flex flexDir="column" gap="6">
      <Heading color="gray.50" fontSize="20px">
        {header}
      </Heading>
      <Divider />
      <Text color="white" fontSize="14px">
        {subline}
      </Text>
      <Alert colorScheme="green" rounded="base">
        <Flex bg="green.500" p="1" rounded="full" mr="2">
          <CheckIcon w="12px" h="12px" color="green.900" />
        </Flex>
        {alertText}
      </Alert>
      <Flex w="100%" p="3" bg="gray.900" flexDir="column">
        <Flex justifyContent="space-between">
          <Text color="white" fontWeight={700} fontSize="12px">
            Total Collateral
          </Text>
          <Text color="white" fontWeight={700} fontSize="12px">
            {debt.toNumber().toFixed(2)} &rarr;
            {debt.add(amountToDeposit).toNumber().toFixed(2)}
          </Text>
        </Flex>
        <Flex justifyContent="space-between">
          <Text color="white" fontWeight={700} fontSize="12px">
            C-ratio
          </Text>
          <Text color="white" fontWeight={700} fontSize="12px">
            {currentCRatio === '0.0' ? 'N/A' : currentCRatio} &rarr; Infinite
          </Text>
        </Flex>
      </Flex>
      <Link href="/">
        <Button w="100%">Continue</Button>
      </Link>
    </Flex>
  );
}
