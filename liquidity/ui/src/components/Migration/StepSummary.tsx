import React, { useCallback, useState } from 'react';
import {
  VStack,
  Text,
  Heading,
  Box,
  HStack,
  Tooltip,
  Checkbox,
  Button,
  Spinner,
  Link,
  Flex,
} from '@chakra-ui/react';
import { wei } from '@synthetixio/wei';
import { useV2Position } from '@snx-v3/useV2Position';
import { Network } from '@snx-v3/useBlockchain';
import { InfoIcon } from '@chakra-ui/icons';
import { useMigrate } from '@snx-v3/useMigrate';
import { useSNXPrice } from '@snx-v3/useSNXPrice';
import { StepSuccess } from './StepSuccess';
import { formatEther } from 'ethers/lib/utils';
import { Amount } from '@snx-v3/Amount';

export const StepSummary = ({
  onClose,
  network,
  onConfirm,
}: {
  onClose: () => void;
  onConfirm: () => void;
  network: Network;
}) => {
  const [isUnderstanding, setIsUnderstanding] = useState(false);
  const { data } = useV2Position(network);
  const { migrate, transaction, isLoading, isSuccess } = useMigrate();

  const { data: snxPrice } = useSNXPrice(network);

  const [txSummary, setTxSummary] = useState({
    collateral: '0',
    cRatio: '0',
  });

  const cRatio = data?.cratio.eq(0)
    ? '0'
    : wei(1)
        .div(data?.cratio || wei(1))
        .mul(100)
        .toString(2);

  const handleSubmit = useCallback(() => {
    setTxSummary({
      cRatio,
      collateral: data?.stakedBalance?.toString(2) || '0',
    });

    migrate();
  }, [cRatio, data?.stakedBalance, migrate]);

  if (isSuccess) {
    return (
      <StepSuccess
        onConfirm={onConfirm}
        cRatio={txSummary.cRatio}
        collateral={txSummary.collateral}
      />
    );
  }

  return (
    <VStack spacing={2.5} align="start" fontSize="12px">
      <Heading size="sm">Summary of your migration</Heading>

      <Box p={3.5} borderRadius="4px" background="#1F1F34" width="100%">
        <HStack fontWeight="700" justifyContent="space-between">
          <Text>C-Ratio</Text>
          <HStack>
            <Text>{cRatio}%</Text>
            {/* <Tag colorScheme="green">HEALTHY</Tag> */}
          </HStack>
        </HStack>
      </Box>

      <Text fontSize="12px" fontWeight="400" color="gray" as="i">
        Warning: if your c-ratio is below V3 liquidation ratio (300%), your account will be{' '}
        <Text as="span" color="cyan.500">
          liquidated
        </Text>{' '}
        during the migration. We recommend to commence this migration only if you have a healthy
        c-ratio.
      </Text>

      <Box p={3.5} borderRadius="4px" background="#1F1F34" width="100%">
        <VStack align="stretch" spacing={3}>
          <HStack fontWeight="700" justifyContent="space-between">
            <Text>
              SNX Collateral{' '}
              <Tooltip
                hasArrow
                textAlign="left"
                label="Your SNX Collateral will not appear on your wallet anymore as it will be deposited in your Account. You can see the details on your Dashboard."
              >
                <InfoIcon />
              </Tooltip>
            </Text>
            <Text>
              {data?.stakedBalance?.toString(2)} SNX &nbsp;
              {snxPrice?.gt(0) && <>(${snxPrice.mul(data?.stakedBalance).toString(2)})</>}
            </Text>
          </HStack>
          <HStack color="gray" justifyContent="space-between">
            <Text>Balance</Text>
            <Text>
              {data?.balance?.toString(2)} SNX &nbsp;
              {snxPrice?.gt(0) && <>(${snxPrice.mul(data?.balance).toString(2)})</>}
            </Text>
          </HStack>
          <HStack color="gray" justifyContent="space-between">
            <Text>
              Escrowed{' '}
              <Tooltip
                hasArrow
                textAlign="left"
                label="Escrowed SNX will be locked in the V3 system until the escrowed date. It can still be delegated but not withdrawn."
              >
                <InfoIcon />
              </Tooltip>
            </Text>
            <Text>
              {data?.collateral?.sub(data?.balance)?.toString(2)} SNX &nbsp;
              {snxPrice?.gt(0) && (
                <>(${snxPrice.mul(data?.stakedBalance?.sub(data?.balance)).toString(2)})</>
              )}
            </Text>
          </HStack>
          <HStack fontWeight="700" justifyContent="space-between">
            <Text>
              Debt{' '}
              <Tooltip
                hasArrow
                label={
                  <Text textAlign="left">
                    Your debt amount will be the same on V3. Debt is however now determined by the
                    collateral deposited. Learn more about the{' '}
                    <Link
                      target="_blank"
                      color="cyan.500"
                      href="https://docs.synthetix.io/v/synthetix-v3-user-documentation"
                    >
                      V3 system.
                    </Link>
                  </Text>
                }
              >
                <InfoIcon />
              </Tooltip>
            </Text>
            <Text>${data?.debt?.toString(2)}</Text>
          </HStack>
        </VStack>
      </Box>

      <Checkbox size="sm" onChange={(e) => setIsUnderstanding(e.currentTarget.checked)}>
        I understand that this action cannot be undone
      </Checkbox>

      <Box mb={3.5} p={3.5} borderRadius="4px" background="#1F1F34" width="100%">
        <HStack justifyContent="space-between">
          <Text>Estimated Gas</Text>

          {transaction !== undefined && (
            <>
              {transaction?.gasLimit && transaction?.gasLimit.gt(0) ? (
                <Text>
                  <Amount
                    value={wei(
                      formatEther(
                        transaction?.gasLimit.mul(transaction.gasPrice || 1).toString() || 0
                      )
                    )}
                    suffix=" ETH"
                  />
                </Text>
              ) : (
                <Text color="red">Transaction error occured, please seek support</Text>
              )}
            </>
          )}
        </HStack>
      </Box>

      {!isLoading ? (
        <>
          <Button
            width="100%"
            isDisabled={!(transaction?.gasLimit && transaction?.gasLimit.gt(0) && isUnderstanding)}
            onClick={handleSubmit}
          >
            Migrate
          </Button>
          <Button variant="outline" colorScheme="gray" onClick={onClose} width="100%">
            Cancel
          </Button>
        </>
      ) : (
        <Flex
          fontSize="14px"
          fontWeight={700}
          alignItems="center"
          justifyContent="center"
          width="100%"
          gap={2}
          p={3}
          color="cyan.500"
        >
          <Spinner />
          Loading
        </Flex>
      )}
    </VStack>
  );
};