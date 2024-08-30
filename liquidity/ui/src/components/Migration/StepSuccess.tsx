import React, { useState } from 'react';
import { VStack, Text, Button, Alert, Flex, Tooltip } from '@chakra-ui/react';
import { CheckIcon, CopyIcon } from '@chakra-ui/icons';
import { TransactionSummary } from '../TransactionSummary/TransactionSummary';

export const StepSuccess = ({
  onConfirm,
  collateral,
  cRatio,
  accountId,
}: {
  onConfirm: () => void;
  cRatio: string;
  collateral: string;
  accountId: string;
}) => {
  const [toolTipLabel, setTooltipLabel] = useState('Copy');
  return (
    <VStack spacing={6}>
      <Text width="100%" textAlign="left" fontSize="14px">
        Your <b>Collateral</b> has been migrated to Synthetix V3 System
      </Text>

      <Alert rounded="base" colorScheme="green" borderRadius="6px">
        <Flex bg="green.500" p="1" rounded="full" mr="3.5">
          <CheckIcon w="12px" h="12px" color="green.900" />
        </Flex>
        <Text fontSize="16px">
          <b>Collateral</b> successfully migrated
        </Text>
      </Alert>

      <TransactionSummary
        width="100%"
        items={[
          {
            label: 'Total Collateral',
            value: collateral,
          },
          {
            label: 'C-ratio',
            value: `${cRatio}%`,
          },
          {
            label: 'Account Id',
            value: (
              <>
                {`#${accountId}`}
                <Tooltip label={toolTipLabel} closeOnClick={false}>
                  <CopyIcon
                    ml="2"
                    onClick={() => {
                      navigator.clipboard.writeText(accountId);
                      setTooltipLabel('Copied');
                      setTimeout(() => {
                        setTooltipLabel('Copy');
                      }, 10000);
                    }}
                    cursor="pointer"
                  />
                </Tooltip>
              </>
            ),
          },
        ]}
      />

      <Button width="100%" onClick={onConfirm}>
        Continue
      </Button>
    </VStack>
  );
};
