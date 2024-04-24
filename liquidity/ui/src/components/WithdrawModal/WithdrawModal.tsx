import {
  Button,
  Divider,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
} from '@chakra-ui/react';
import Wei from '@synthetixio/wei';
import { useState } from 'react';
import { TokenIcon } from '../TokenIcon';
import { useWithdraw } from '@snx-v3/useWithdraw';
import { useWithdrawBaseAndromeda } from '@snx-v3/useWithdrawBaseAndromeda';
import { getSNXUSDAddress, isBaseAndromeda } from '@snx-v3/isBaseAndromeda';
import { useNetwork } from '@snx-v3/useBlockchain';
import { ONEWEI, ZEROWEI } from '../../utils/constants';
import { useParams } from '@snx-v3/useParams';
import { useCollateralTypes } from '@snx-v3/useCollateralTypes';
import { useCollateralPrices } from '@snx-v3/useCollateralPrices';
import { useAccountCollateral } from '@snx-v3/useAccountCollateral';

// TODO @DEV
// let's say you have 50 sUSDC and 40 snxUSD
// user enters an amount
// you should start by taking the amount from sUSDC
// if the user enters 50 or less you don't have to withdraw any snxUSD
// just withdraw sUSDC  and unwrap it
// if the user enters a number between 50 - 90
// you take 50 from sUSDC
// and the rest for withdraw snxUSD -> buy sUSDC -> unwraping
// so basically it's fairly simple now that i think about it
// define two values
// sUSDCAmount = amount - availbleSUSDC
// snxUSDAmount = amount - sUSDCAmount
// then use these varible in the hook

export function WithdrawModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { accountId } = useParams();
  const [amount, setAmount] = useState<Wei>(ZEROWEI);
  const [selectedCollateralType, setSelectedCollateralType] = useState<string>('');
  const { network } = useNetwork();
  const isBase = isBaseAndromeda(network?.id, network?.preset);
  const { data: accountCollaterals } = useAccountCollateral({
    accountId,
  });
  const { data: collateralPrices } = useCollateralPrices();
  const { data: collateralTypes } = useCollateralTypes();
  const { mutation: withdrawMain } = useWithdraw({
    amount,
    accountId,
    collateralTypeAddress: selectedCollateralType,
  });
  const activeCollateral = accountCollaterals?.find(
    (collateral) => collateral.tokenAddress === selectedCollateralType
  );
  const { mutation: withdrawAndromeda } = useWithdrawBaseAndromeda({
    accountId,
    snxUSDCollateral: ZEROWEI,
    usdcCollateral: ZEROWEI,
  });
  const withdraw = async () => {
    if (!isBaseAndromeda(network?.id, network?.preset)) {
      await withdrawMain.mutateAsync();
    } else {
      await withdrawAndromeda.mutateAsync();
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setAmount(new Wei(0));
        onClose();
      }}
    >
      <ModalOverlay />
      <ModalContent bg="navy.700" border="1px solid" rounded="base" borderColor="gray.900">
        <ModalHeader>Withdraw Assets</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDir="column" gap="2">
            <Divider />
            <Text fontWeight={700} fontSize="14px">
              Withdraw Assets
            </Text>
            <Flex
              border="1px solid"
              borderColor="gray.900"
              rounded="base"
              justifyContent="space-between"
              bg="navy.900"
            >
              <Flex p="2" flexDir="column" gap="1" w="100%">
                <Select
                  w="150px"
                  onChange={(e) => {
                    setSelectedCollateralType(e.target.value);
                  }}
                >
                  {collateralTypes?.map((type) => (
                    <option value={type.tokenAddress} key={type.tokenAddress.concat(type.symbol)}>
                      <TokenIcon symbol={type.symbol} /> {type.displaySymbol}
                    </option>
                  ))}
                  {!isBase && <option value={getSNXUSDAddress(network?.id)}>sUSD</option>}
                </Select>

                <Text
                  fontSize="12px"
                  display="flex"
                  color="gray.500"
                  data-cy="manage-input-balance-max-button"
                >
                  Account Available :&nbsp;
                  {activeCollateral?.availableCollateral.toNumber().toFixed(2)}
                  <Text
                    data-cy="withdraw-modal-max-button"
                    color="cyan.500"
                    fontSize="12px"
                    fontWeight={700}
                    ml="2"
                    cursor="pointer"
                    onClick={() => {
                      if (activeCollateral) {
                        setAmount(activeCollateral.availableCollateral);
                        const node = document.getElementById('input-deposit') as HTMLInputElement;
                        node.value = activeCollateral.availableCollateral.toNumber().toFixed(2);
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
                  data-cy="manage-input"
                  onChange={(e) => {
                    setAmount(new Wei(e.target.value ? e.target.value : 0, amount.p));
                  }}
                />
                <Text fontSize="12px" color="gray.500">
                  $
                  {amount
                    .mul(
                      collateralPrices && collateralPrices[selectedCollateralType]
                        ? collateralPrices[selectedCollateralType]
                        : ONEWEI
                    )
                    .toNumber()
                    .toLocaleString('en-US', { maximumFractionDigits: 2 })}
                </Text>
              </Flex>
            </Flex>
            <Button
              isDisabled={amount.eq(0)}
              mb="2"
              onClick={() => {
                withdraw();
              }}
            >
              {amount.eq(0) ? 'Enter Amount' : 'Withdraw'}
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
