import { Button, Divider, Text, useToast } from '@chakra-ui/react';
import { Amount } from '@snx-v3/Amount';
import { ContractError } from '@snx-v3/ContractError';
import { parseUnits } from '@snx-v3/format';
import { isBaseAndromeda } from '@snx-v3/isBaseAndromeda';
import { ManagePositionContext } from '@snx-v3/ManagePositionContext';
import { Multistep } from '@snx-v3/Multistep';
import { useApprove } from '@snx-v3/useApprove';
import { useNetwork } from '@snx-v3/useBlockchain';
import { useCollateralType } from '@snx-v3/useCollateralTypes';
import { useContractErrorParser } from '@snx-v3/useContractErrorParser';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { useGetUSDTokens } from '@snx-v3/useGetUSDTokens';
import { useParams } from '@snx-v3/useParams';
import { useRepay } from '@snx-v3/useRepay';
import { useRepayBaseAndromeda } from '@snx-v3/useRepayBaseAndromeda';
import { useSpotMarketProxy } from '@snx-v3/useSpotMarketProxy';
import { useTokenBalance } from '@snx-v3/useTokenBalance';
import { useSystemToken } from '@snx-v3/useSystemToken';
import Wei from '@synthetixio/wei';
import { useQueryClient } from '@tanstack/react-query';
import { useMachine } from '@xstate/react';
import { useCallback, useContext, useEffect } from 'react';
import type { StateFrom } from 'xstate';
import { Events, RepayMachine, ServiceNames, State } from './RepayMachine';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { LiquidityPositionUpdated } from '../../ui/src/components/Manage/LiquidityPositionUpdated';
import { ZEROWEI } from '../../ui/src/utils/constants';

export const RepayModalUi: React.FC<{
  onClose: () => void;
  debtChange: Wei;
  isOpen: boolean;
  onSubmit: () => void;
  state: StateFrom<typeof RepayMachine>;
  setInfiniteApproval: (x: boolean) => void;
}> = ({ onClose, isOpen, debtChange, state, onSubmit, setInfiniteApproval }) => {
  const isProcessing = state.matches(State.approve) || state.matches(State.repay);
  const { infiniteApproval, requireApproval, error } = state.context;
  const { data: systemToken } = useSystemToken();

  const { network } = useNetwork();
  const isBase = isBaseAndromeda(network?.id, network?.preset);
  const symbol = isBase ? ' USDC' : ` ${systemToken?.symbol}`;

  if (isOpen) {
    if (state.matches(State.success)) {
      return (
        <LiquidityPositionUpdated
          onClose={onSubmit}
          title="Debt successfully Updated"
          subline={
            <>
              Your <b>debt</b> has been updated, read more about it in the Synthetix V3
              Documentation.
            </>
          }
          alertText={
            <>
              <b>Debt</b> successfully Updated
            </>
          }
        />
      );
    }

    return (
      <div>
        <Text color="gray.50" fontSize="20px" fontWeight={700}>
          <ArrowBackIcon cursor="pointer" onClick={onClose} mr={2} />
          Manage Debt
        </Text>
        <Divider my={4} />
        <Multistep
          step={1}
          title={`Approve ${symbol} transfer`}
          status={{
            failed: error?.step === State.approve,
            success: !requireApproval || state.matches(State.success),
            loading: state.matches(State.approve) && !error,
          }}
          checkboxLabel={
            requireApproval ? `Approve unlimited ${symbol} transfers to Synthetix.` : undefined
          }
          checkboxProps={{
            isChecked: infiniteApproval,
            onChange: (e) => setInfiniteApproval(e.target.checked),
          }}
        />
        <Multistep
          step={2}
          title="Repay"
          subtitle={
            <Text>
              Repay <Amount value={debtChange.abs()} suffix={` ${symbol}`} />
            </Text>
          }
          status={{
            failed: error?.step === State.repay,
            success: state.matches(State.success),
            loading: state.matches(State.repay) && !error,
          }}
        />

        <Button
          isDisabled={isProcessing}
          onClick={onSubmit}
          width="100%"
          mt="6"
          data-testid="repay confirm button"
        >
          {(() => {
            switch (true) {
              case Boolean(error):
                return 'Retry';
              case isProcessing:
                return 'Processing...';
              case state.matches(State.success):
                return 'Continue';
              default:
                return 'Execute Transaction';
            }
          })()}
        </Button>
      </div>
    );
  }
};

export const RepayModal: React.FC<{
  onClose: () => void;
  isOpen: boolean;
  availableCollateral?: Wei;
}> = ({ onClose, isOpen, availableCollateral }) => {
  const { debtChange, setDebtChange } = useContext(ManagePositionContext);
  const params = useParams();

  const { network } = useNetwork();
  const { data: usdTokens } = useGetUSDTokens();
  const queryClient = useQueryClient();

  const { data: collateralType } = useCollateralType(params.collateralSymbol);
  const { data: systemToken } = useSystemToken();
  const { data: balance } = useTokenBalance(systemToken?.address);

  const { exec: execRepay, settle: settleRepay } = useRepay({
    accountId: params.accountId,
    poolId: params.poolId,
    collateralTypeAddress: collateralType?.tokenAddress,
    debtChange,
    availableUSDCollateral: availableCollateral,
    balance,
  });

  const { exec: execRepayBaseAndromeda, settle: settleRepayBaseAndromeda } = useRepayBaseAndromeda({
    accountId: params.accountId,
    poolId: params.poolId,
    collateralTypeAddress: collateralType?.tokenAddress,
    debtChange,
    availableUSDCollateral: availableCollateral,
  });

  const toast = useToast({ isClosable: true, duration: 9000 });

  const { data: CoreProxy } = useCoreProxy();
  const { data: SpotProxy } = useSpotMarketProxy();

  const errorParserCoreProxy = useContractErrorParser(CoreProxy);
  const amountToDeposit = debtChange.abs().sub(availableCollateral || 0);

  const collateralAddress = isBaseAndromeda(network?.id, network?.preset)
    ? usdTokens?.USDC
    : systemToken?.address;

  const { approve, requireApproval } = useApprove({
    contractAddress: collateralAddress,
    amount: isBaseAndromeda(network?.id, network?.preset)
      ? //Base USDC is 6 decimals
        parseUnits(amountToDeposit.toString(), 6)
      : amountToDeposit.toBN(),
    spender: isBaseAndromeda(network?.id, network?.preset)
      ? SpotProxy?.address
      : CoreProxy?.address,
  });

  const [state, send] = useMachine(RepayMachine, {
    services: {
      [ServiceNames.approveSUSD]: async () => {
        try {
          toast({
            title: `Approve ${systemToken?.symbol} for transfer`,
            description: 'The next transaction will repay your debt.',
            status: 'info',
            variant: 'left-accent',
          });

          await approve(Boolean(state.context.infiniteApproval));
        } catch (error: any) {
          const contractError = errorParserCoreProxy(error);
          if (contractError) {
            console.error(new Error(contractError.name), contractError);
          }
          toast.closeAll();
          toast({
            title: 'Approval failed',
            description: contractError ? (
              <ContractError contractError={contractError} />
            ) : (
              'Please try again.'
            ),
            status: 'error',
            variant: 'left-accent',
          });
          throw Error('Approve failed', { cause: error });
        }
      },

      [ServiceNames.executeRepay]: async () => {
        try {
          toast.closeAll();
          toast({ title: 'Repaying...', variant: 'left-accent' });
          if (isBaseAndromeda(network?.id, network?.preset)) {
            await execRepayBaseAndromeda();
          } else {
            await execRepay();
          }
          setDebtChange(ZEROWEI);

          await Promise.all([
            queryClient.invalidateQueries({
              queryKey: [`${network?.id}-${network?.preset}`, 'TokenBalance'],
            }),
            queryClient.invalidateQueries({
              queryKey: [`${network?.id}-${network?.preset}`, 'Allowance'],
            }),
            queryClient.invalidateQueries({
              queryKey: [`${network?.id}-${network?.preset}`, 'LiquidityPosition'],
            }),
          ]);

          toast.closeAll();
          toast({
            title: 'Success',
            description: 'Your debt has been repaid.',
            status: 'success',
            duration: 5000,
            variant: 'left-accent',
          });
        } catch (error: any) {
          const contractError = errorParserCoreProxy(error);
          if (contractError) {
            console.error(new Error(contractError.name), contractError);
          }
          toast({
            title: 'Could not complete repaying',
            description: contractError ? (
              <ContractError contractError={contractError} />
            ) : (
              'Please try again.'
            ),
            status: 'error',
            variant: 'left-accent',
          });
          throw Error('Repay failed', { cause: error });
        }
      },
    },
  });
  const needToDeposit = amountToDeposit.gt(0);

  useEffect(() => {
    send(Events.SET_REQUIRE_APPROVAL, { requireApproval: requireApproval && needToDeposit });
  }, [needToDeposit, requireApproval, send]);

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

  if (!params.poolId || !params.accountId || !collateralType) return null;

  return (
    <RepayModalUi
      state={state}
      onSubmit={onSubmit}
      debtChange={debtChange}
      setInfiniteApproval={(infiniteApproval) => {
        send(Events.SET_INFINITE_APPROVAL, { infiniteApproval });
      }}
      onClose={() => {
        settleRepay();
        settleRepayBaseAndromeda();
        onClose();
      }}
      isOpen={isOpen}
    />
  );
};
