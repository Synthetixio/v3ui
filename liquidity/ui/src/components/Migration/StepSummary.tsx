import React, { useState } from 'react';
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
} from '@chakra-ui/react';
import { wei } from '@synthetixio/wei';
import { useV2Position } from '../../../../lib/useV2Position';
import { Network } from '@snx-v3/useBlockchain';
import { InfoIcon } from '@chakra-ui/icons';
import { useMigrate } from '../../../../lib/useMigrate';

export const StepSummary = ({
  onClose,
  onConfirm,
  network,
}: {
  onClose: () => void;
  onConfirm: () => void;
  network: Network;
}) => {
  const [isUnderstanding, setIsUnderstanding] = useState(false);
  const { data } = useV2Position(network);
  const { migrate, transaction, isLoading } = useMigrate();

  return (
    <VStack spacing={2.5} align="start" fontSize="12px">
      <Heading size="sm">Summary of your migration</Heading>

      <Box p={3.5} borderRadius="4px" background="#1F1F34" width="100%">
        <HStack fontWeight="700" justifyContent="space-between">
          <Text>C-Ratio</Text>
          <HStack>
            <Text>
              {wei(1)
                .div(data?.cratio || wei(1))
                .mul(100)
                .toString(0)}
              %
            </Text>
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
        <VStack align="stretch" spacing={4} mt={4}>
          <HStack fontWeight="700" justifyContent="space-between">
            <Text>
              SNX Collateral{' '}
              <Tooltip label="Your SNX Collateral will not appear on your wallet anymore as it will be deposited into your V3 Account. You can see the details on the Dashboard after migration.">
                <InfoIcon />
              </Tooltip>
            </Text>
            <Text>
              {data?.collateral?.toString(2)} SNX (${0})
            </Text>
          </HStack>
          <HStack justifyContent="space-between">
            <Text>Balance</Text>
            <Text>
              {data?.balance?.toString(2)} SNX (${0})
            </Text>
          </HStack>
          <HStack justifyContent="space-between">
            <Text>
              Escrowed{' '}
              <Tooltip label="Escrowed SNX will be locked in the V3 system until the escrowed date. It can still be delegated but not withdrawn.">
                <InfoIcon />
              </Tooltip>
            </Text>
            <Text>
              {data?.collateral?.sub(data?.balance)?.toString(2)} SNX (${0})
            </Text>
          </HStack>
          <HStack fontWeight="700" justifyContent="space-between">
            <Text>
              Debt{' '}
              <Tooltip label="Your debt will be the same on V3. However, post migration, your debt will fluctuate based on the amount of collateral deposited, instead of debt. Learn more about the V3 system.">
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

      <Box p={3.5} borderRadius="4px" background="#1F1F34" width="100%">
        <HStack justifyContent="space-between">
          <Text>Estimated Gas</Text>
          <Text>
            {transaction?.gasLimit && transaction?.gasLimit.gt(0) ? (
              transaction?.gasLimit.toString() + ' ETH (${0})'
            ) : (
              <Text color="red">Transaction error occured, please seek support</Text>
            )}
          </Text>
        </HStack>
      </Box>

      {!isLoading ? (
        <>
          <Button
            width="100%"
            isDisabled={!(transaction?.gasLimit && transaction?.gasLimit.gt(0) && isUnderstanding)}
            onClick={() => migrate()}
          >
            Migrate
          </Button>
          <Button variant="outline" colorScheme="gray" onClick={onClose} width="100%">
            Cancel
          </Button>
        </>
      ) : (
        <HStack>
          <Spinner />
          Transaction in progress...
        </HStack>
      )}
    </VStack>
  );
};
