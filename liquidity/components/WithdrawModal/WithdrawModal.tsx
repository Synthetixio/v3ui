import { Button, Divider, Text, useToast } from '@chakra-ui/react';
import React, { FC, useCallback, useContext, useState } from 'react';
import { Multistep } from '@snx-v3/Multistep';
import { Wei } from '@synthetixio/wei';
import { useWithdraw } from '@snx-v3/useWithdraw';
import { useAccountCollateral } from '@snx-v3/useAccountCollateral';
import { useContractErrorParser } from '@snx-v3/useContractErrorParser';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { ContractError } from '@snx-v3/ContractError';
import { useQueryClient } from '@tanstack/react-query';
import { useNetwork } from '@snx-v3/useBlockchain';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { LiquidityPositionUpdated } from '../../ui/src/components/Manage/LiquidityPositionUpdated';
import { LiquidityPosition } from '@snx-v3/useLiquidityPosition';
import { isBaseAndromeda } from '@snx-v3/isBaseAndromeda';
import { ZEROWEI } from '../../ui/src/utils/constants';
import { useWithdrawBaseAndromeda } from '@snx-v3/useWithdrawBaseAndromeda';
import { ManagePositionContext } from '@snx-v3/ManagePositionContext';
import { useCollateralType } from '@snx-v3/useCollateralTypes';
import { useParams } from '@snx-v3/useParams';
import { Amount } from '@snx-v3/Amount';

export const WithdrawModalUi: FC<{
  amount: Wei;
  isOpen: boolean;
  onClose: () => void;
  symbol?: string;
  state: {
    step: number;
    status: string;
  };
  onSubmit: () => void;
}> = ({ amount, isOpen, onClose, onSubmit, state, symbol }) => {
  const { data: collateralType } = useCollateralType(symbol);

  if (isOpen) {
    if (state.step > 1) {
      return (
        <LiquidityPositionUpdated
          onClose={onSubmit}
          title="Collateral successfully Withdrawn"
          subline={
            <>
              Your <b>Collateral</b> has been withdrawn, read more about it in the Synthetix V3
              Documentation.
            </>
          }
          alertText="Collateral successfully Withdrawn"
        />
      );
    }

    return (
      <div>
        <Text color="gray.50" fontSize="20px" fontWeight={700}>
          <ArrowBackIcon cursor="pointer" onClick={onClose} mr={2} />
          Manage Collateral
        </Text>
        <Divider my={4} />

        <Multistep
          step={1}
          title="Withdraw"
          subtitle={
            <Text as="div">
              <Amount value={amount} />
              {collateralType?.displaySymbol} will be withdrawn
            </Text>
          }
          status={{
            failed: state.step === 1 && state.status === 'error',
            success: state.step > 1,
            loading: state.step === 1 && state.status === 'pending',
          }}
        />

        <Button
          isDisabled={state.status === 'pending'}
          onClick={onSubmit}
          width="100%"
          mt="4"
          data-testid="withdraw confirm button"
        >
          {(() => {
            switch (true) {
              case state.status === 'error':
                return 'Retry';
              case state.status === 'pending':
                return 'Processing...';
              case state.step > 1:
                return 'Done';
              default:
                return 'Execute Transaction';
            }
          })()}
        </Button>
      </div>
    );
  }
};

export function WithdrawModal({
  liquidityPosition,
  onClose,
  isOpen,
}: {
  liquidityPosition?: LiquidityPosition;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [txState, setTxState] = useState({
    step: 1,
    status: 'idle',
  });
  const { withdrawAmount } = useContext(ManagePositionContext);
  const params = useParams();
  const toast = useToast({ isClosable: true, duration: 9000 });
  const { network } = useNetwork();
  const queryClient = useQueryClient();
  const { data: CoreProxy } = useCoreProxy();
  const errorParserCoreProxy = useContractErrorParser(CoreProxy);
  const accountId = liquidityPosition?.accountId;

  const { data: accountCollaterals } = useAccountCollateral({
    accountId,
  });

  const { mutation: withdrawMain } = useWithdraw({
    amount: withdrawAmount,
    accountId,
    collateralTypeAddress: liquidityPosition?.accountCollateral.tokenAddress,
  });

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
    amountToWithdraw: withdrawAmount,
  });

  const onSubmit = useCallback(async () => {
    try {
      if (txState.step === 1) {
        setTxState({
          step: 1,
          status: 'pending',
        });

        if (!isBaseAndromeda(network?.id, network?.preset)) {
          await withdrawMain.mutateAsync();
        } else {
          await withdrawAndromeda.mutateAsync();
        }

        setTxState({
          step: 2,
          status: 'success',
        });

        await queryClient.invalidateQueries({
          queryKey: [`${network?.id}-${network?.preset}`, 'AccountSpecificCollateral'],
        });
      } else {
        onClose();
      }
    } catch (error) {
      setTxState((state) => ({
        ...state,
        status: 'error',
      }));

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
  }, [
    errorParserCoreProxy,
    network?.id,
    network?.preset,
    onClose,
    queryClient,
    toast,
    txState.step,
    withdrawAndromeda,
    withdrawMain,
  ]);

  return (
    <WithdrawModalUi
      amount={withdrawAmount}
      isOpen={isOpen}
      onClose={onClose}
      symbol={params.collateralSymbol}
      state={txState}
      onSubmit={onSubmit}
    />
  );
}
