import React from 'react';
import { wei } from '@synthetixio/wei';
import { useReducer, useState } from 'react';
import { initialState, reducer } from '@snx-v3/txnReducer';
import { formatGasPriceForTransaction } from '@snx-v3/useGasOptions';
import { useSigner, useNetwork } from '@snx-v3/useBlockchain';
import { useGasSpeed } from '@snx-v3/useGasSpeed';
import { getGasPrice } from '@snx-v3/useGasPrice';
import { withERC7412 } from '@snx-v3/withERC7412';
import { ethers } from 'ethers';
import {
  VStack,
  Heading,
  Text,
  HStack,
  Box,
  Tag,
  Checkbox,
  Button,
  Tooltip,
  Spinner,
} from '@chakra-ui/react';

import { useQuery, useMutation } from '@tanstack/react-query';

import type { MigrateEvents } from './MigrateMachine';

import { useLegacyMarket } from '@snx-v3/useLegacyMarket';

import { Events } from './MigrateMachine';
import { InfoIcon } from '@chakra-ui/icons';

function StepSummary({
  onClose,
  send,
}: {
  onClose: () => void;
  send: (event: MigrateEvents) => void;
}) {
  const [isUnderstanding, setIsUnderstanding] = useState(false);
  const { gasSpeed } = useGasSpeed();
  const [txnState, dispatch] = useReducer(reducer, initialState);
  const legacyMarketQuery = useLegacyMarket();

  const { network } = useNetwork();
  const signer = useSigner();
  const legacyMarketData = useQuery({
    queryKey: ['MigrateModal', 'legacyMarketData'],
    queryFn: async () => {
      const signerAddress = await signer!.getAddress();
      let txn: Awaited<ReturnType<typeof withERC7412>> | null;
      try {
        const populateTransaction =
          await legacyMarketQuery.data!.LegacyMarket.populateTransaction.migrate(
            Math.floor(Math.random() * 10000000000000),
            {
              from: signerAddress,
            }
          );
        txn = await withERC7412(network!, [populateTransaction], 'migrate');
      } catch (err) {
        console.error('error for migration', err);
        txn = null;
      }

      return {
        collateral: wei(await legacyMarketQuery.data!.V2xSynthetix.collateral(signerAddress)),
        balance: wei(await legacyMarketQuery.data!.V2xSynthetix.balanceOf(signerAddress)),
        debt: wei(
          await legacyMarketQuery.data!.V2xSynthetix.debtBalanceOf(
            signerAddress,
            ethers.utils.formatBytes32String('sUSD')
          )
        ),
        cratio: wei(
          await legacyMarketQuery.data!.V2xSynthetix.collateralisationRatio(signerAddress)
        ),
        txn,
        estimatedMigrateGas: wei(txn?.gasLimit || 0),
      };
    },
    enabled: legacyMarketQuery.isFetched && !!signer && !!network,
  });

  console.log('queries', legacyMarketQuery.data);
  console.log('datas', legacyMarketData.data);

  const doMigrate = useMutation({
    mutationFn: async () => {
      try {
        dispatch({ type: 'prompting' });
        const gasPrices = await getGasPrice({ provider: signer!.provider });
        const gasOptionsForTransaction = formatGasPriceForTransaction({
          gasLimit: legacyMarketData.data!.estimatedMigrateGas.toBN(),
          gasPrices,
          gasSpeed,
        });
        const txn = await legacyMarketQuery
          .data!.LegacyMarket.connect(signer!)
          .migrate({ ...gasOptionsForTransaction });
        dispatch({ type: 'pending', payload: { txnHash: txn.hash } });
        await txn.wait();
        dispatch({ type: 'success' });

        // move on to the last page
        send({ type: Events.CONFIRM });
      } catch (err: any) {
        dispatch({ type: 'error', payload: { error: err } });
        throw err;
      }
    },
  });

  return (
    <VStack spacing={6} align="start" fontSize="12px">
      <Heading size="sm">Summary of your migration</Heading>

      <Box p={4} bg="rgba(255,255,255,0.08)" borderRadius="md" width="100%">
        <HStack fontWeight="700" justifyContent="space-between">
          <Text>C-Ratio</Text>
          <HStack>
            <Text>
              {wei(1)
                .div(legacyMarketData.data?.cratio || wei(1))
                .mul(100)
                .toString(0)}
              %
            </Text>
            <Tag colorScheme="green">HEALTHY</Tag>
          </HStack>
        </HStack>
      </Box>

      <Text fontSize="12px" fontWeight="400" color="gray" as="i">
        Warning: if your c-ratio is below V3 liquidation ratio (160%), your account will be
        liquidated quickly after the migration. We recommend to commence this migration only if you
        have a healthy c-ratio.
      </Text>

      <Box p={4} bg="rgba(255,255,255,0.08)" borderRadius="md" width="100%">
        <VStack align="stretch" spacing={4} mt={4}>
          <HStack fontWeight="700" justifyContent="space-between">
            <Text>
              SNX Collateral{' '}
              <Tooltip label="Your SNX Collateral will not appear on your wallet anymore as it will be deposited into your V3 Account. You can see the details on the Dashboard after migration.">
                <InfoIcon />
              </Tooltip>
            </Text>
            <Text>
              {legacyMarketData.data?.collateral?.toString(2)} SNX (${0})
            </Text>
          </HStack>
          <HStack justifyContent="space-between">
            <Text>Balance</Text>
            <Text>
              {legacyMarketData.data?.balance?.toString(2)} SNX (${0})
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
              {legacyMarketData.data?.collateral?.sub(legacyMarketData.data?.balance)?.toString(2)}{' '}
              SNX (${0})
            </Text>
          </HStack>
          <HStack fontWeight="700" justifyContent="space-between">
            <Text>
              Debt{' '}
              <Tooltip label="Your debt will be the same on V3. However, post migration, your debt will fluctuate based on the amount of collateral deposited, instead of debt. Learn more about the V3 system.">
                <InfoIcon />
              </Tooltip>
            </Text>
            <Text>${legacyMarketData.data?.debt?.toString(2)}</Text>
          </HStack>
        </VStack>
      </Box>

      <Checkbox mt={4} onChange={(e) => setIsUnderstanding(e.currentTarget.checked)}>
        I understand that this action cannot be undone
      </Checkbox>

      <Box p={4} bg="rgba(255,255,255,0.08)" borderRadius="md" width="100%">
        <HStack justifyContent="space-between">
          <Text>Estimated Gas</Text>
          <Text>
            {legacyMarketData.data?.estimatedMigrateGas.gt(0) ? (
              legacyMarketData.data?.estimatedMigrateGas.toString() + ' ETH (${0})'
            ) : (
              <Text color="red">Transaction error occured, please seek support</Text>
            )}
          </Text>
        </HStack>
      </Box>

      {txnState.txnStatus === 'unsent' ? (
        <>
          <Button
            width="100%"
            isDisabled={
              !(
                legacyMarketData.isFetched &&
                legacyMarketData.data!.estimatedMigrateGas.gt(0) &&
                isUnderstanding
              )
            }
            onClick={() => doMigrate.mutate()}
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
}

export default StepSummary;
