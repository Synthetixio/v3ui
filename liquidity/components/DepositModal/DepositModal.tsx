import { Button, Divider, Text, useToast, Link } from '@chakra-ui/react';
import { Amount } from '@snx-v3/Amount';
import { ContractError } from '@snx-v3/ContractError';
import { getStataUSDCAddress, isBaseAndromeda } from '@snx-v3/isBaseAndromeda';
import { Multistep } from '@snx-v3/Multistep';
import { useApprove } from '@snx-v3/useApprove';
import { useNetwork } from '@snx-v3/useBlockchain';
import { CollateralType, useCollateralType } from '@snx-v3/useCollateralTypes';
import { useContractErrorParser } from '@snx-v3/useContractErrorParser';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { useDeposit } from '@snx-v3/useDeposit';
import { useDepositBaseAndromeda } from '@snx-v3/useDepositBaseAndromeda';
import { useGetUSDTokens } from '@snx-v3/useGetUSDTokens';
import { useParams } from '@snx-v3/useParams';
import { usePool } from '@snx-v3/usePools';
import { useSpotMarketProxy } from '@snx-v3/useSpotMarketProxy';
import { useWrapEth } from '@snx-v3/useWrapEth';
import { Wei, wei } from '@synthetixio/wei';
import { useQueryClient } from '@tanstack/react-query';
import { useMachine } from '@xstate/react';
import { utils } from 'ethers';
import { FC, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { generatePath, useLocation, useNavigate } from 'react-router-dom';
import type { StateFrom } from 'xstate';
import { DepositMachine, Events, ServiceNames, State } from './DepositMachine';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { LiquidityPositionUpdated } from '../../ui/src/components/Manage/LiquidityPositionUpdated';
import { ZEROWEI } from '../../ui/src/utils/constants';
import { ManagePositionContext } from '@snx-v3/ManagePositionContext';
import { LiquidityPosition } from '@snx-v3/useLiquidityPosition';
import { ChangeStat } from '../../ui/src/components';
import { CRatioChangeStat } from '../../ui/src/components/CRatioBar/CRatioChangeStat';
import { TransactionSummary } from '../../ui/src/components/TransactionSummary/TransactionSummary';
import { currency } from '@snx-v3/format';

export const DepositModalUi: FC<{
  collateralChange: Wei;
  isOpen: boolean;
  onClose: () => void;
  collateralType?: CollateralType;
  state: StateFrom<typeof DepositMachine>;
  setInfiniteApproval: (x: boolean) => void;
  onSubmit: () => void;
  availableCollateral: Wei;
  poolName: string;
  title?: string;
  txSummary?: ReactNode;
}> = ({
  collateralChange,
  isOpen,
  onClose,
  collateralType,
  setInfiniteApproval,
  onSubmit,
  state,
  availableCollateral,
  poolName,
  title = 'Manage Collateral',
  txSummary,
}) => {
  const wrapAmount = state.context.wrapAmount;
  const infiniteApproval = state.context.infiniteApproval;
  const requireApproval = state.context.requireApproval;
  const error = state.context.error;
  const isProcessing =
    state.matches(State.approve) || state.matches(State.deposit) || state.matches(State.wrap);

  const isWETH = collateralType?.symbol === 'WETH';

  const stepNumbers = {
    wrap: isWETH ? 1 : 0,
    approve: isWETH ? 2 : 1,
    deposit: isWETH ? 3 : 2,
  };

  if (isOpen) {
    if (state.matches(State.success)) {
      return (
        <LiquidityPositionUpdated
          onClose={onSubmit}
          title="Collateral successfully Updated"
          subline={
            <>
              Your <b>Collateral</b> has been updated, read more about it in the{' '}
              <Link
                href="https://docs.synthetix.io/v/synthetix-v3-user-documentation"
                target="_blank"
                color="cyan.500"
              >
                Synthetix V3 Documentation
              </Link>
            </>
          }
          alertText={
            <>
              <b>Collateral</b> successfully Updated
            </>
          }
          summary={txSummary}
        />
      );
    }

    return (
      <div>
        <Text color="gray.50" fontSize="20px" fontWeight={700}>
          <ArrowBackIcon cursor="pointer" onClick={onClose} mr={2} />
          {title}
        </Text>
        <Divider my={4} />
        {isWETH ? (
          <Multistep
            step={stepNumbers.wrap}
            title="Wrap"
            subtitle={
              wrapAmount.eq(0) ? (
                <Text as="div">
                  <Amount value={collateralChange} suffix={` ${collateralType?.symbol}`} /> from
                  balance will be used.
                </Text>
              ) : (
                <Text as="div">
                  You must wrap additional <Amount value={wrapAmount} suffix=" ETH" /> before
                  depositing.
                </Text>
              )
            }
            status={{
              failed: error?.step === State.wrap,
              disabled: collateralType?.symbol !== 'WETH',
              success: wrapAmount.eq(0) || state.matches(State.success),
              loading: state.matches(State.wrap) && !error,
            }}
          />
        ) : null}

        <Multistep
          step={stepNumbers.approve}
          title={`Approve ${collateralType?.symbol} transfer`}
          status={{
            failed: error?.step === State.approve,
            success: !requireApproval || state.matches(State.success),
            loading: state.matches(State.approve) && !error,
          }}
          checkboxLabel={
            requireApproval
              ? `Approve unlimited ${collateralType?.symbol} transfers to Synthetix.`
              : undefined
          }
          checkboxProps={{
            isChecked: infiniteApproval,
            onChange: (e) => setInfiniteApproval(e.target.checked),
          }}
        />

        <Multistep
          step={stepNumbers.deposit}
          title={`Deposit & Lock ${collateralType?.symbol}`}
          subtitle={
            <>
              {state.matches(State.success) ? (
                <Text>
                  <Amount value={collateralChange} suffix={` ${collateralType?.symbol}`} />{' '}
                  deposited & locked in {poolName}.
                </Text>
              ) : (
                <>
                  {availableCollateral && availableCollateral.gt(wei(0)) ? (
                    <>
                      {availableCollateral.gte(collateralChange) ? (
                        <Text>
                          This will deposit & lock{' '}
                          <Amount value={collateralChange} suffix={` ${collateralType?.symbol}`} />{' '}
                          in {poolName}.
                        </Text>
                      ) : (
                        <>
                          <Text>
                            This will deposit & lock{' '}
                            <Amount
                              value={availableCollateral}
                              suffix={` ${collateralType?.symbol}`}
                            />{' '}
                            to {poolName}.
                          </Text>
                          <Text>
                            An additional{' '}
                            <Amount
                              value={collateralChange.sub(availableCollateral)}
                              suffix={` ${collateralType?.symbol}`}
                            />{' '}
                            will be deposited and locked from your wallet.
                          </Text>
                        </>
                      )}
                    </>
                  ) : (
                    <Text>
                      This will deposit and lock{' '}
                      <Amount value={collateralChange} suffix={` ${collateralType?.symbol}`} /> to{' '}
                      {poolName}.
                    </Text>
                  )}
                </>
              )}
            </>
          }
          status={{
            failed: error?.step === State.deposit,
            disabled: state.matches(State.success) && requireApproval,
            success: state.matches(State.success),
            loading: state.matches(State.deposit) && !error,
          }}
        />
        <Button
          isDisabled={isProcessing}
          onClick={onSubmit}
          width="100%"
          mt="6"
          data-cy="deposit-confirm-button"
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

export type DepositModalProps = FC<{
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  liquidityPosition?: LiquidityPosition;
}>;

export const DepositModal: DepositModalProps = ({ onClose, isOpen, title, liquidityPosition }) => {
  const { collateralChange, setCollateralChange } = useContext(ManagePositionContext);
  const currentCollateral = liquidityPosition?.collateralAmount ?? ZEROWEI;
  const availableCollateral = liquidityPosition?.accountCollateral.availableCollateral ?? ZEROWEI;

  const [txSummary, setTxSummary] = useState({
    currentCollateral: ZEROWEI,
    collateralChange: ZEROWEI,
    currentDebt: ZEROWEI,
  });

  const navigate = useNavigate();
  const { collateralSymbol, poolId, accountId } = useParams();
  const queryClient = useQueryClient();
  const { network } = useNetwork();

  const { data: CoreProxy } = useCoreProxy();
  const { data: SpotProxy } = useSpotMarketProxy();
  const { data: usdTokens } = useGetUSDTokens();
  const { data: collateralType } = useCollateralType(collateralSymbol);

  const isBase = isBaseAndromeda(network?.id, network?.preset);

  const collateralAddress = isBaseAndromeda(network?.id, network?.preset)
    ? collateralSymbol === 'USDC'
      ? usdTokens?.USDC
      : getStataUSDCAddress()
    : collateralType?.tokenAddress;

  const collateralNeeded = collateralChange.sub(availableCollateral);

  const { approve, requireApproval } = useApprove({
    contractAddress: collateralAddress,
    amount: collateralNeeded.gt(0)
      ? isBase
        ? // Base USDC and Base stataUSDC are 6 decimals
          utils.parseUnits(collateralNeeded.toString(), 6)
        : utils.parseUnits(collateralNeeded.toString(), collateralType?.decimals)
      : 0,
    spender: isBase ? SpotProxy?.address : CoreProxy?.address,
  });

  const toast = useToast({ isClosable: true, duration: 9000 });

  // TODO: Update logic on new account id
  const newAccountId = useMemo(() => `${Math.floor(Math.random() * 1000000000000)}`, []);

  const { exec: wrapEth, wethBalance } = useWrapEth();

  const wrapAmount =
    collateralType?.symbol === 'WETH' && collateralNeeded.gt(wethBalance || 0)
      ? collateralNeeded.sub(wethBalance || 0)
      : wei(0);

  const { data: pool } = usePool(poolId);

  const { exec: execDeposit } = useDeposit({
    accountId: accountId,
    newAccountId,
    poolId: poolId,
    collateralTypeAddress: collateralAddress,
    collateralChange,
    currentCollateral,
    availableCollateral: availableCollateral || wei(0),
    decimals: Number(collateralType?.decimals) || 18,
  });

  const { exec: depositBaseAndromeda } = useDepositBaseAndromeda({
    accountId,
    newAccountId,
    poolId,
    collateralTypeAddress: collateralAddress,
    collateralChange,
    currentCollateral,
    availableCollateral: availableCollateral || wei(0),
    collateralSymbol,
  });

  const errorParserCoreProxy = useContractErrorParser(CoreProxy);

  const [state, send] = useMachine(DepositMachine, {
    services: {
      [ServiceNames.wrapEth]: async () => {
        try {
          await wrapEth(state.context.wrapAmount);
        } catch (error: any) {
          const contractError = errorParserCoreProxy(error);
          if (contractError) {
            console.error(new Error(contractError.name), contractError);
          }

          toast.closeAll();
          toast({
            title: 'Wrapping ETH failed',
            description: contractError ? (
              <ContractError contractError={contractError} />
            ) : (
              error.message || 'Please try again.'
            ),
            status: 'error',
            variant: 'left-accent',
          });
          throw Error('Wrapping failed', { cause: error });
        }
      },
      [ServiceNames.approveWETH]: async () => {
        try {
          toast({
            title: 'Approve collateral for transfer',
            description: accountId
              ? 'The next transaction will lock this collateral.'
              : 'The next transaction will create your account and and lock this collateral',
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
      [ServiceNames.executeDeposit]: async () => {
        try {
          toast.closeAll();
          toast({
            title: Boolean(accountId)
              ? 'Locking your collateral'
              : 'Creating your account and locking your collateral',
            description: '',
            variant: 'left-accent',
          });

          setTxSummary({
            currentCollateral,
            currentDebt: liquidityPosition?.debt || ZEROWEI,
            collateralChange,
          });

          if (isBase) {
            await depositBaseAndromeda();
          } else {
            await execDeposit();
          }

          await Promise.all([
            queryClient.invalidateQueries({
              queryKey: [`${network?.id}-${network?.preset}`, 'EthBalance'],
            }),
            queryClient.invalidateQueries({
              queryKey: [`${network?.id}-${network?.preset}`, 'LiquidityPosition'],
            }),
            collateralType?.symbol === 'SNX'
              ? queryClient.invalidateQueries({
                  queryKey: [`${network?.id}-${network?.preset}`, 'TransferableSynthetix'],
                })
              : Promise.resolve(),
            queryClient.invalidateQueries({
              queryKey: [`${network?.id}-${network?.preset}`, 'Allowance'],
            }),
            queryClient.invalidateQueries({
              queryKey: [`${network?.id}-${network?.preset}`, 'LiquidityPositions'],
            }),
            !accountId
              ? queryClient.invalidateQueries({
                  queryKey: [`${network?.id}-${network?.preset}`, 'Accounts'],
                })
              : Promise.resolve(),
          ]);

          setCollateralChange(ZEROWEI);

          toast.closeAll();
          toast({
            title: 'Success',
            description: 'Your locked collateral amount has been updated.',
            status: 'success',
            duration: 5000,
            variant: 'left-accent',
          });
        } catch (error: any) {
          const contractError = errorParserCoreProxy(error);
          if (contractError) {
            console.error(new Error(contractError.name), contractError);
          }

          toast.closeAll();
          toast({
            title: 'Could not complete locking collateral',
            description: contractError ? (
              <ContractError contractError={contractError} />
            ) : (
              'Please try again.'
            ),
            status: 'error',
            variant: 'left-accent',
          });
          throw Error('Lock collateral failed', { cause: error });
        }
      },
    },
  });

  const wrapAmountString = wrapAmount.toString();
  const isSuccessOrDeposit = state.matches(State.success) || state.matches(State.deposit);

  useEffect(() => {
    if (isSuccessOrDeposit) {
      // We do this to ensure the success state displays the wrap amount used before deposit
      return;
    }
    send(Events.SET_WRAP_AMOUNT, { wrapAmount: wei(wrapAmountString) });
  }, [wrapAmountString, send, isSuccessOrDeposit]);

  useEffect(() => {
    send(Events.SET_REQUIRE_APPROVAL, { requireApproval });
  }, [requireApproval, send]);

  const location = useLocation();

  const handleClose = useCallback(() => {
    const isSuccess = state.matches(State.success);

    if (isSuccess && poolId && collateralType?.symbol) {
      send(Events.RESET);
      onClose();
      navigate({
        pathname: generatePath('/positions/:collateralType/:poolId', {
          collateralType: collateralType.symbol,
          poolId,
        }),
        search: location.search,
      });
    }
    send(Events.RESET);
    onClose();
  }, [location.search, send, onClose, state, poolId, collateralType?.symbol, navigate]);

  const onSubmit = useCallback(async () => {
    if (state.matches(State.success)) {
      handleClose();
      return;
    }
    if (state.context.error) {
      send(Events.RETRY);
      return;
    }
    send(Events.RUN);
  }, [handleClose, send, state]);

  const txSummaryItems = useMemo(() => {
    const items = [
      {
        label: 'Total Collateral',
        value: (
          <ChangeStat
            value={txSummary.currentCollateral}
            newValue={txSummary.currentCollateral.add(txSummary.collateralChange)}
            formatFn={(val: Wei) => currency(val)}
            hasChanges={txSummary.collateralChange.abs().gt(0)}
            size="sm"
          />
        ),
      },
    ];

    if (isBase) {
      return items;
    }

    return [
      ...items,
      {
        label: 'C-ratio',
        value: (
          <CRatioChangeStat
            currentCollateral={txSummary.currentCollateral}
            currentDebt={txSummary.currentDebt}
            collateralChange={txSummary.collateralChange}
            collateralPrice={liquidityPosition?.collateralPrice ?? ZEROWEI}
            debtChange={ZEROWEI}
            size="sm"
          />
        ),
      },
    ];
  }, [
    isBase,
    liquidityPosition?.collateralPrice,
    txSummary.collateralChange,
    txSummary.currentCollateral,
    txSummary.currentDebt,
  ]);

  return (
    <DepositModalUi
      collateralChange={collateralChange}
      isOpen={isOpen}
      onClose={onClose}
      collateralType={collateralType}
      state={state}
      setInfiniteApproval={(infiniteApproval) => {
        send(Events.SET_INFINITE_APPROVAL, { infiniteApproval });
      }}
      onSubmit={onSubmit}
      poolName={pool?.name || ''}
      availableCollateral={availableCollateral || wei(0)}
      title={title}
      txSummary={<TransactionSummary items={txSummaryItems} />}
    />
  );
};
