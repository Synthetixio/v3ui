import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
} from '@chakra-ui/react';
import { FC, useCallback, useContext, useEffect } from 'react';
import { CollateralType, useCollateralType } from '@snx-v3/useCollateralTypes';
import { Amount } from '@snx-v3/Amount';
import { LiquidityPosition } from '@snx-v3/useLiquidityPosition';
import { Multistep } from '@snx-v3/Multistep';
import { Wei, wei } from '@synthetixio/wei';
import { useParams } from '@snx-v3/useParams';
import { Events, ServiceNames, State, UndelegateMachine } from './UndelegateMachine';
import { useMachine } from '@xstate/react';
import { useUndelegate } from '@snx-v3/useUndelegate';
import { ManagePositionContext } from '@snx-v3/ManagePositionContext';
import type { StateFrom } from 'xstate';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { useContractErrorParser } from '@snx-v3/useContractErrorParser';
import { ContractError } from '@snx-v3/ContractError';
import { useQueryClient } from '@tanstack/react-query';
import { useNetwork } from '@snx-v3/useBlockchain';

export const UndelegateModalUi: FC<{
  amount: Wei;
  isOpen: boolean;
  onClose: () => void;
  collateralType?: CollateralType;
  state: StateFrom<typeof UndelegateMachine>;
  error: { error: Error; step: string } | null;
  onSubmit: () => void;
}> = ({ amount, isOpen, onClose, collateralType, onSubmit, state, error }) => {
  const isProcessing = state.matches(State.undelegate);
  return (
    <Modal size="lg" isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent bg="black" color="white" data-testid="undelegate modal">
        <ModalHeader>Complete this action</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb="2">Please execute the following transactions:</Text>

          <Multistep
            step={1}
            title="Remove collateral"
            subtitle={
              <Text as="div">
                <Amount value={amount} suffix={` ${collateralType?.symbol}`} /> will be removed from
                the pool.
              </Text>
            }
            status={{
              failed: Boolean(error?.step === State.undelegate),
              disabled: amount.eq(0),
              success: state.matches(State.success),
              loading: state.matches(State.undelegate) && !error,
            }}
          />

          <Button
            isDisabled={isProcessing}
            onClick={onSubmit}
            width="100%"
            my="4"
            data-testid="undelegate confirm button"
          >
            {(() => {
              switch (true) {
                case Boolean(error):
                  return 'Retry';
                case isProcessing:
                  return 'Processing...';
                case state.matches(State.success):
                  return 'Done';
                default:
                  return 'Start';
              }
            })()}
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
export type UndelegateModalProps = FC<{
  isOpen: boolean;
  onClose: () => void;
  liquidityPosition?: LiquidityPosition;
}>;
export const UndelegateModal: UndelegateModalProps = ({ onClose, isOpen, liquidityPosition }) => {
  const params = useParams();
  const { collateralChange } = useContext(ManagePositionContext);
  const network = useNetwork();
  const queryClient = useQueryClient();

  const { data: collateralType } = useCollateralType(params.collateralSymbol);

  const toast = useToast({ isClosable: true, duration: 9000 });

  const currentCollateral = liquidityPosition?.collateralAmount || wei(0);
  const { exec: execUndelegate } = useUndelegate({
    accountId: params.accountId,
    poolId: params.poolId,
    collateralTypeAddress: liquidityPosition?.tokenAddress,
    collateralChange,
    currentCollateral: currentCollateral,
  });

  const { data: CoreProxy } = useCoreProxy();
  const errorParserCoreProxy = useContractErrorParser(CoreProxy);

  const [state, send] = useMachine(UndelegateMachine, {
    context: {
      amount: collateralChange.abs(),
    },
    services: {
      [ServiceNames.undelegate]: async () => {
        try {
          await execUndelegate();
          await queryClient.invalidateQueries({
            queryKey: [network.name, 'LiquidityPosition'],
            exact: false,
          });
        } catch (error: any) {
          const contractError = errorParserCoreProxy(error);
          if (contractError) {
            console.error(new Error(contractError.name), contractError);
          }
          toast.closeAll();
          toast({
            title: 'Remove collateral failed',
            description: contractError ? (
              <ContractError contractError={contractError} />
            ) : (
              'Please try again.'
            ),
            status: 'error',
          });
          throw Error('Remove collateral failed', { cause: error });
        }
      },
    },
  });

  const collateralChangeString = collateralChange.toString();

  useEffect(() => {
    send(Events.SET_AMOUNT, { amount: wei(collateralChangeString).abs() });
  }, [collateralChangeString, send]);

  useEffect(() => {
    send(Events.SET_COLLATERAL_SYMBOL, { symbol: wei(collateralChangeString).abs() });
  }, [collateralChangeString, send]);

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
    <UndelegateModalUi
      amount={state.context.amount}
      isOpen={isOpen}
      onClose={onClose}
      collateralType={collateralType}
      state={state}
      error={state.context.error}
      onSubmit={onSubmit}
    />
  );
};
