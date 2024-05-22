import Wei from '@synthetixio/wei';
import { ReactNode, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { amountState } from '../../state/amount';
import { Button, Flex, Input, Text, Tooltip } from '@chakra-ui/react';
import { TokenIcon } from '../TokenIcon';

export function ManageInputUi({
  collateralSymbol,
  collateral = new Wei(0),
  title,
  inputSubline,
  buttonText,
  handleButtonClick,
  children,
  tooltip,
  inputIsDisabled = false,
  price,
}: {
  collateralSymbol: string;
  collateral?: Wei;
  price: Wei;
  title: string;
  inputSubline: string;
  buttonText: string;
  handleButtonClick: () => void;
  inputIsDisabled?: boolean;
  tooltip?: ReactNode;
  children?: ReactNode;
}) {
  const [amount, setAmount] = useRecoilState(amountState);
  useEffect(() => {
    if (inputIsDisabled) {
      setAmount(collateral);
      const node = document.getElementById('input-deposit') as HTMLInputElement;
      node.value = collateral.toNumber().toFixed(2);
    }
  }, [inputIsDisabled, setAmount, collateral]);
  return (
    <Flex flexDir="column" gap="3">
      <Text fontSize="14px" fontWeight={700} color="white">
        {title}
      </Text>
      <Flex
        border="1px solid"
        borderColor="gray.900"
        rounded="base"
        justifyContent="space-between"
        bg="navy.900"
      >
        <Flex p="2" flexDir="column" gap="1" w="100%">
          <TokenIcon symbol={collateralSymbol} />
          <Text
            fontSize="12px"
            display="flex"
            color="gray.500"
            data-cy="manage-input-balance-max-button"
          >
            {tooltip ? <Tooltip label={tooltip}>{inputSubline}</Tooltip> : inputSubline}
            :&nbsp;
            {collateral.toNumber().toFixed(2)}
            <Text
              data-cy="manage-input-ui-max-button"
              color={inputIsDisabled ? 'gray.900' : 'cyan.500'}
              fontSize="12px"
              fontWeight={700}
              ml="2"
              cursor={!inputIsDisabled ? 'pointer' : 'not-allowed'}
              onClick={() => {
                if (!inputIsDisabled) {
                  setAmount(collateral);
                  const node = document.getElementById('input-deposit') as HTMLInputElement;
                  node.value = collateral.toNumber().toFixed(2);
                }
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
            placeholder="0.00"
            textAlign="end"
            fontSize="24px"
            color="white"
            type="number"
            overflow="scroll"
            fontWeight={700}
            isDisabled={inputIsDisabled}
            data-cy="manage-input"
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
      <Button
        onClick={() => handleButtonClick()}
        isDisabled={amount.eq(0)}
        data-cy="manage-input-ui-button"
      >
        {amount.eq(0) ? 'Enter Amount' : buttonText}
      </Button>
    </Flex>
  );
}
