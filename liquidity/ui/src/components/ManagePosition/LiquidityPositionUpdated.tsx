import { Alert, Button, Divider, Flex, Heading, Text } from '@chakra-ui/react';
import { useRecoilState } from 'recoil';
import { amountState } from '../../state/amount';
import { CheckIcon } from '@snx-v3/Multistep';
import Wei from '@synthetixio/wei';
import { useNavigate, useSearchParams } from 'react-router-dom';

export function LiquidityPositionUpdated({
  debt,
  currentCRatio,
  header,
  subline,
  alertText,
  collateralSymbol,
  poolId,
  collateralAddress,
  isBase,
}: {
  debt: Wei;
  currentCRatio: string;
  header?: string;
  subline: string;
  alertText: string;
  collateralSymbol: string;
  poolId: string;
  collateralAddress: string;
  isBase: boolean;
}) {
  const [queryParams] = useSearchParams();
  const navigate = useNavigate();
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

      <Button
        w="100%"
        onClick={() => {
          if (debt.lt(0)) {
            if (isBase) {
              queryParams.set('tabAction', 'claim');
            } else {
              queryParams.set('tabAction', 'repay');
            }
          } else {
            if (isBase) {
              queryParams.set('tabAction', 'repay');
            } else {
              queryParams.set('tabAction', 'borrow');
            }
          }
          queryParams.set('tab', '1');
          navigate({
            pathname: `manage/${collateralSymbol}/${collateralAddress}/${poolId}`,
            search: queryParams.toString(),
          });
        }}
      >
        Continue
      </Button>
    </Flex>
  );
}
