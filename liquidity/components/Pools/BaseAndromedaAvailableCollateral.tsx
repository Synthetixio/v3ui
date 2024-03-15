import { useState, Suspense, useMemo, useCallback } from 'react';
import { Amount } from '@snx-v3/Amount';
import { Button, Fade, Flex, Td, Text, Tr, useToast } from '@chakra-ui/react';
import { CollateralIcon } from '@snx-v3/icons';
import { AccountCollateralWithSymbol } from '@snx-v3/useAccountCollateral';
import { WithdrawModalUi } from '@snx-v3/WithdrawModal';
import { useSearchParams } from 'react-router-dom';
import { useNetwork } from '@snx-v3/useBlockchain';
import { useUnWrapEth } from '@snx-v3/useWrapEth';
import { useWithdrawBaseAndromeda } from '../../lib/useWithdrawBaseAndromeda';
import { useQueryClient } from '@tanstack/react-query';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { useContractErrorParser } from '@snx-v3/useContractErrorParser';
import { useMachine } from '@xstate/react';
import {
  Events,
  ServiceNames,
  State,
  WithdrawMachine,
} from '@snx-v3/WithdrawModal/WithdrawMachine';
import { ContractError } from '@snx-v3/ContractError';

export type BaseAndromedaAvailableCollateralProps = {
  accountCollateralUnlockDate?: Date;
  accountCollaterals: AccountCollateralWithSymbol[];
};

export function BaseAndromedaAvailableCollateral({
  accountCollaterals,
  accountCollateralUnlockDate,
}: BaseAndromedaAvailableCollateralProps) {
  const [isOpen, setIsOpen] = useState(false);

  const usdcCollateral = useMemo(
    () => accountCollaterals.find((item) => item.symbol === 'USDC'),
    [accountCollaterals]
  );

  const snxUSDCollateral = useMemo(
    () => accountCollaterals.find((item) => item.symbol === 'snxUSD'),
    [accountCollaterals]
  );

  const isDisabled = useMemo(
    () =>
      !accountCollateralUnlockDate ||
      accountCollateralUnlockDate.getTime() > Date.now() ||
      snxUSDCollateral?.availableCollateral.add(usdcCollateral?.availableCollateral).eq(0),
    [
      accountCollateralUnlockDate,
      snxUSDCollateral?.availableCollateral,
      usdcCollateral?.availableCollateral,
    ]
  );

  return (
    <Tr data-testid="available collateral row">
      <Td>
        <Flex flexDir="row" py={4}>
          <Fade in>
            <CollateralIcon width="32px" height="32px" symbol="USDC" />
          </Fade>
          <Flex flexDirection="column" justifyContent="center" ml={2}>
            <Fade in>
              <Text fontSize="lg" color="gray.500" data-testid="available-collateral">
                <Amount
                  value={usdcCollateral?.availableCollateral.add(
                    snxUSDCollateral?.availableCollateral
                  )}
                />{' '}
                USDC
              </Text>
            </Fade>
          </Flex>
        </Flex>
      </Td>
      <Td textAlign="end">
        <Fade in>
          <Button
            isDisabled={isDisabled}
            data-testid="withdraw-button"
            onClick={() => setIsOpen(true)}
          >
            Withdraw
          </Button>
        </Fade>
        <Suspense fallback={null}>
          {isOpen && usdcCollateral && snxUSDCollateral ? (
            <WithdrawModal
              usdcCollateral={usdcCollateral}
              snxUSDCollateral={snxUSDCollateral}
              onClose={() => setIsOpen(false)}
              isOpen={isOpen}
            />
          ) : null}
        </Suspense>
      </Td>
    </Tr>
  );
}

function WithdrawModal({
  usdcCollateral,
  snxUSDCollateral,
  onClose,
  isOpen,
}: {
  usdcCollateral: AccountCollateralWithSymbol;
  snxUSDCollateral: AccountCollateralWithSymbol;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [searchParams] = useSearchParams();
  const toast = useToast({ isClosable: true, duration: 9000 });
  const { network } = useNetwork();

  const { exec: unwrap } = useUnWrapEth();

  const { exec: execWithdraw } = useWithdrawBaseAndromeda({
    usdcCollateral,
    snxUSDCollateral,
    accountId: searchParams.get('accountId') || '',
  });

  const queryClient = useQueryClient();

  const { data: CoreProxy } = useCoreProxy();
  const errorParserCoreProxy = useContractErrorParser(CoreProxy);

  const amount = useMemo(
    () => snxUSDCollateral.availableCollateral.add(usdcCollateral.availableCollateral),
    [snxUSDCollateral.availableCollateral, usdcCollateral.availableCollateral]
  );

  const [state, send] = useMachine(WithdrawMachine, {
    context: {
      amount,
    },
    services: {
      [ServiceNames.withdraw]: async () => {
        try {
          await execWithdraw();

          await queryClient.invalidateQueries({
            queryKey: [`${network?.id}-${network?.preset}`, 'AccountSpecificCollateral'],
            exact: false,
          });

          await queryClient.invalidateQueries({
            queryKey: [`${network?.id}-${network?.preset}`, 'AccountCollateral'],
            exact: false,
          });
          await queryClient.invalidateQueries({
            queryKey: [`${network?.id}-${network?.preset}`, 'LiquidityPosition'],
            exact: false,
          });
        } catch (error: any) {
          const contractError = errorParserCoreProxy(error);
          if (contractError) {
            console.error(new Error(contractError.name), contractError);
          }
          toast.closeAll();
          toast({
            title: 'Withdraw failed',
            description: contractError ? (
              <ContractError contractError={contractError} />
            ) : (
              'Please try again.'
            ),
            status: 'error',
          });
          throw Error('Withdraw failed', { cause: error });
        }
      },
      [ServiceNames.unwrap]: async () => {
        try {
          toast({
            title: 'Unwrap',
            description: 'Unwrapping WETH to ETH.',
            status: 'info',
          });

          await unwrap(state.context.amount);
        } catch (e) {
          toast.closeAll();
          toast({ title: 'Unwrap failed', description: 'Please try again.', status: 'error' });
          throw Error('Unwrap failed', { cause: e });
        }
      },
    },
  });

  const onSubmit = useCallback(async () => {
    if (state.matches(State.success)) {
      send(Events.RESET);
      onClose();
      return;
    }
    if (state.context.error) {
      send(Events.RETRY);
      return;
    }
    send(Events.RUN);
  }, [onClose, send, state]);

  return (
    <WithdrawModalUi
      amount={state.context.amount}
      isOpen={isOpen}
      onClose={onClose}
      accountCollateral={usdcCollateral}
      state={state}
      error={state.context.error}
      onSubmit={onSubmit}
    />
  );
}
