import Wei from '@synthetixio/wei';
import { ReactNode } from 'react';
import { useRecoilState } from 'recoil';
import { amountState } from '../../state/amount';
import { Button, Flex, Input, Text, Tooltip } from '@chakra-ui/react';
import { TokenIcon } from '../TokenIcon';

export function ManageInputUi({
  collateralSymbol,
  collateral = new Wei(0),
  price,
  title,
  inputSubline,
  buttonText,
  handleButtonClick,
  children,
  tooltip,
}: {
  collateralSymbol: string;
  collateral?: Wei;
  price: Wei;
  title: string;
  inputSubline: string;
  buttonText: string;
  handleButtonClick: () => void;
  tooltip?: ReactNode;
  children?: ReactNode;
}) {
  const [amount, setAmount] = useRecoilState(amountState);
  return (
    <Flex flexDir="column" gap="3">
      <Text fontSize="14px" fontWeight={700} color="white">
        {title}
      </Text>
      <Flex border="1px solid" borderColor="gray.900" rounded="base" justifyContent="space-between">
        <Flex p="2" flexDir="column" gap="1" w="100%">
          <TokenIcon symbol={collateralSymbol} />
          <Text fontSize="12px" display="flex" color="gray.500">
            {tooltip ? <Tooltip label={tooltip}>{inputSubline}</Tooltip> : inputSubline}
            :&nbsp;
            {collateral.toNumber().toFixed(2)}
            <Text
              color="cyan.500"
              fontSize="12px"
              fontWeight={700}
              ml="2"
              cursor="pointer"
              onClick={() => {
                setAmount(collateral);
                const node = document.getElementById('input-deposit') as HTMLInputElement;
                node.value = collateral.toNumber().toFixed(2);
              }}
            >
              Max
            </Text>
          </Text>
        </Flex>
        <Flex p="2" flexDir="column" alignItems="end" justifyContent="end">
          <Input
            id="input-deposit"
            variant="unstyled"
            placeholder="00.00"
            textAlign="end"
            fontSize="24px"
            color="white"
            type="number"
            overflow="scroll"
            fontWeight={700}
            onChange={(e) => {
              setAmount(new Wei(e.target.value ? e.target.value : 0, collateral.p));
            }}
          />
          <Text fontSize="12px" color="gray.500">
            ${amount.mul(price).toNumber().toLocaleString('en-US', { maximumFractionDigits: 2 })}
          </Text>
        </Flex>
      </Flex>
      {children}
      <Button onClick={() => handleButtonClick()} isDisabled={amount.eq(0)}>
        {amount.eq(0) ? 'Enter Amount' : buttonText}
      </Button>
    </Flex>
  );
}
