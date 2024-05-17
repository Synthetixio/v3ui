import {
  Button,
  Divider,
  Flex,
  Input,
  MenuButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Menu,
  MenuList,
  MenuItem,
  Text,
} from '@chakra-ui/react';
import Wei from '@synthetixio/wei';
import { useState } from 'react';
import { useWithdraw } from '@snx-v3/useWithdraw';
import { useWithdrawBaseAndromeda } from '@snx-v3/useWithdrawBaseAndromeda';
import { isBaseAndromeda } from '@snx-v3/isBaseAndromeda';
import { useNetwork } from '@snx-v3/useBlockchain';
import { ONEWEI, ZEROWEI } from '../../utils/constants';
import { useParams } from '@snx-v3/useParams';
import { useCollateralTypes } from '@snx-v3/useCollateralTypes';
import { useCollateralPrices } from '@snx-v3/useCollateralPrices';
import { useAccountCollateral } from '@snx-v3/useAccountCollateral';
import { useQueryClient } from '@tanstack/react-query';
import { CloseIcon, InfoIcon } from '@chakra-ui/icons';
import { Tooltip } from '@snx-v3/Tooltip';
import { TokenIcon } from '../';
import { ChevronDown, ChevronUp } from '@snx-v3/icons';
import { useGetUSDTokens } from '@snx-v3/useGetUSDTokens';

export function WithdrawModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { accountId } = useParams();
  const [amount, setAmount] = useState<Wei>(ZEROWEI);
  const { data: collateralTypes } = useCollateralTypes();
  const { data: usdTokens } = useGetUSDTokens();

  const [selectedCollateralType, setSelectedCollateralType] = useState<string>(
    collateralTypes && collateralTypes[0] ? collateralTypes[0].tokenAddress : ''
  );

  const queryClient = useQueryClient();
  const { network } = useNetwork();
  const isBase = isBaseAndromeda(network?.id, network?.preset);

  const { data: accountCollaterals } = useAccountCollateral({
    accountId,
  });

  const { data: collateralPrices } = useCollateralPrices();

  const { mutation: withdrawMain } = useWithdraw({
    amount,
    accountId,
    collateralTypeAddress: selectedCollateralType,
  });

  const activeCollateral = isBase
    ? accountCollaterals?.reduce((cur, prev, index) => {
        //ignore the first iteration cause we are starting witht the first index of the
        // array as a default
        if (!index) return cur;
        return {
          ...cur,
          availableCollateral: cur.availableCollateral.add(prev.availableCollateral),
        };
      }, accountCollaterals[0])
    : accountCollaterals?.find((collateral) => collateral.tokenAddress === selectedCollateralType);

  const { mutation: withdrawAndromeda } = useWithdrawBaseAndromeda({
    accountId,
    sUSDCCollateral:
      accountCollaterals && accountCollaterals[0]
        ? accountCollaterals[0].availableCollateral
        : ZEROWEI,
    snxUSDCollateral:
      accountCollaterals && accountCollaterals[1]
        ? accountCollaterals[1].availableCollateral
        : ZEROWEI,
    amountToWithdraw: amount,
  });

  const withdraw = async () => {
    if (!isBaseAndromeda(network?.id, network?.preset)) {
      await withdrawMain.mutateAsync();
    } else {
      await withdrawAndromeda.mutateAsync();
    }
    queryClient.clear();
  };

  // Replace out sUSDC with USDC for Andromeda
  const collateralTypesHydated = collateralTypes?.map((type) => {
    if (isBase && type.symbol === 'sUSDC') {
      return {
        ...type,
        symbol: 'USDC',
        displaySymbol: 'USDC',
        name: 'USD Coin',
      };
    }

    return type;
  });

  const collateralTypeDisplayName = collateralTypesHydated?.find(
    (item) => item.tokenAddress === selectedCollateralType
  )?.symbol;

  return (
    <Modal
      isOpen={isOpen}
      isCentered
      onClose={() => {
        setAmount(new Wei(0));
        onClose();
      }}
    >
      <ModalOverlay />
      <ModalContent pb={10} bg="transparent">
        <Flex
          flexDirection="column"
          p={6}
          bg="navy.700"
          border="1px solid"
          rounded="base"
          borderColor="gray.900"
        >
          <Flex justifyContent="space-between" alignItems="center">
            <Text
              width="50%"
              color="gray.50"
              fontFamily="heading"
              fontSize="20px"
              fontWeight={700}
              lineHeight="28px"
            >
              Withdraw Assets
            </Text>
            <Button variant="unstyled" onClick={() => onClose()}>
              <CloseIcon />
            </Button>
          </Flex>
          <ModalBody p={0}>
            <Flex flexDir="column">
              <Divider my="18px" />
              <Text
                fontWeight={700}
                fontSize="14px"
                lineHeight="20px"
                fontFamily="heading"
                color="gray.50"
              >
                Withdraw Assets
                <Tooltip label="You can Withdraw your assets from your Synthetix Account to your Wallet Balance.">
                  <InfoIcon ml={1} w="10px" h="10px" mb={0.25} />
                </Tooltip>
              </Text>
              <Flex
                mt={3}
                border="1px solid"
                borderColor="gray.900"
                rounded="base"
                justifyContent="space-between"
                bg="navy.900"
                flexDirection="column"
                p="12px"
              >
                <Flex width="100%" mb={1}>
                  <Menu>
                    {({ isOpen }) => (
                      <>
                        <MenuButton
                          borderWidth="1px"
                          borderColor="gray.900"
                          as={Button}
                          variant="unstyled"
                          textAlign="start"
                        >
                          <Flex alignItems="center" px="10px">
                            {collateralTypeDisplayName && (
                              <TokenIcon
                                height={16}
                                width={16}
                                symbol={collateralTypeDisplayName}
                              />
                            )}
                            <Text
                              mx={1}
                              color="whiteAlpha.900"
                              fontSize="16px"
                              fontWeight={700}
                              lineHeight="24px"
                            >
                              {collateralTypeDisplayName}
                            </Text>
                            {isOpen ? (
                              <ChevronUp mr={1} color="white" />
                            ) : (
                              <ChevronDown mr={1} color="white" />
                            )}
                          </Flex>
                        </MenuButton>
                        <MenuList>
                          {collateralTypesHydated?.map((type) => (
                            <MenuItem
                              onClick={() => setSelectedCollateralType(type.tokenAddress)}
                              key={type.tokenAddress}
                            >
                              <TokenIcon mr={1} height={16} width={16} symbol={type.symbol} />
                              {type.symbol}
                            </MenuItem>
                          ))}
                          {!isBase && (
                            <MenuItem
                              onClick={() => setSelectedCollateralType(usdTokens?.snxUSD || '')}
                              key={usdTokens?.snxUSD.concat('-base')}
                            >
                              <TokenIcon mr={1} height={16} width={16} symbol="sUSD" />
                              sUSD
                            </MenuItem>
                          )}
                        </MenuList>
                      </>
                    )}
                  </Menu>
                  <Flex>
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
                        setAmount(new Wei(e.target.value ? e.target.value : 0, 18));
                      }}
                    />
                  </Flex>
                </Flex>
                <Flex justifyContent="space-between" mt="5px">
                  <Text
                    fontSize="12px"
                    display="flex"
                    color="gray.500"
                    data-cy="manage-input-balance-max-button"
                  >
                    Account Available :&nbsp;
                    <Text
                      data-cy="withdraw-modal-max-button"
                      cursor="pointer"
                      onClick={() => {
                        if (activeCollateral) {
                          setAmount(activeCollateral.availableCollateral);
                          const node = document.getElementById('input-deposit') as HTMLInputElement;
                          node.value = activeCollateral.availableCollateral.toNumber().toFixed(2);
                        }
                      }}
                    >
                      {activeCollateral?.availableCollateral.toNumber().toFixed(2)}
                    </Text>
                  </Text>
                  <Flex flexDir="column" alignItems="end" justifyContent="end">
                    <Text fontSize="12px" color="gray.500">
                      $
                      {amount.eq(0)
                        ? '00.00'
                        : amount
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
              </Flex>
              <Button
                isDisabled={amount.eq(0)}
                mt={6}
                mb="2"
                onClick={() => {
                  withdraw();
                }}
              >
                {amount.eq(0) ? 'Enter Amount' : 'Withdraw'}
              </Button>
            </Flex>
          </ModalBody>
        </Flex>
      </ModalContent>
    </Modal>
  );
}
