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
import { Amount } from '@snx-v3/Amount';
import { ContractError } from '@snx-v3/ContractError';
import { Multistep } from '@snx-v3/Multistep';
import { useApprove } from '@snx-v3/useApprove';
import { CollateralType } from '@snx-v3/useCollateralTypes';
import { useContractErrorParser } from '@snx-v3/useContractErrorParser';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { useTeleport } from '@snx-v3/useTeleport';
import { useUSDProxy } from '@snx-v3/useUSDProxy';
import { Wei } from '@synthetixio/wei';
import { useMachine } from '@xstate/react';
import { FC, useCallback, useEffect } from 'react';
import type { StateFrom } from 'xstate';
import { TeleportMachine, Events, ServiceNames, State } from './TeleporterMachine';
import { Contract, ethers } from 'ethers';
import { useEthBalance } from '@snx-v3/useEthBalance';

export const TeleporterModalUi: FC<{
  amount: Wei;
  isOpen: boolean;
  onClose: () => void;
  collateralType?: CollateralType;
  state: StateFrom<typeof TeleportMachine>;
  setInfiniteApproval: (x: boolean) => void;
  onSubmit: () => void;
  toNetworkName: string;
  txnHash: string | null;
}> = ({
  amount,
  isOpen,
  onClose,
  setInfiniteApproval,
  onSubmit,
  state,
  toNetworkName,
  txnHash,
}) => {
  const infiniteApproval = state.context.infiniteApproval;
  const requireApproval = state.context.requireApproval;
  const error = state.context.error;
  const isProcessing = state.matches(State.approve) || state.matches(State.teleport);

  return (
    <Modal size="lg" isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent bg="black" color="white">
        <ModalHeader>Complete this action</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb="2">Please execute the following transactions:</Text>

          <Multistep
            step={1}
            title="Approve snxUSD"
            status={{
              failed: error?.step === State.approve,
              success: !requireApproval || state.matches(State.success),
              loading: state.matches(State.approve) && !error,
            }}
            checkboxLabel="Approve unlimited"
            checkboxProps={{
              isChecked: infiniteApproval,
              onChange: (e) => setInfiniteApproval(e.target.checked),
            }}
          />

          <Multistep
            step={2}
            title="Teleport snxUSD"
            subtitle={
              <>
                {state.matches(State.success) ? (
                  <Text>
                    Teleport for <Amount value={amount} suffix={` snxUSD`} /> to {toNetworkName}{' '}
                    executed. Check https://ccip.chain.link/tx/{txnHash} for status.
                  </Text>
                ) : (
                  <Text>
                    This will teleport <Amount value={amount} suffix={` snxUSD`} /> to{' '}
                    {toNetworkName}
                  </Text>
                )}
              </>
            }
            status={{
              failed: error?.step === State.teleport,
              disabled: state.matches(State.success) && requireApproval,
              success: state.matches(State.success),
              loading: state.matches(State.teleport) && !error,
            }}
          />

          <Button isDisabled={isProcessing} onClick={onSubmit} width="100%" my="4">
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

const ccipErrors = [
  'error TokenMaxCapacityExceeded(uint256 capacity, uint256 requested, address tokenAddress)',
  'error TokenRateLimitReached(uint256 minWaitInSeconds, uint256 available, address tokenAddress)',
  'error AggregateValueMaxCapacityExceeded(uint256 capacity, uint256 requested)',
  'error AggregateValueRateLimitReached(uint256 minWaitInSeconds, uint256 available)',
  'error UnsupportedDestinationChain(uint64 destinationChainSelector)',
  'error SenderNotAllowed(address sender)',
  'error InsufficientFeeTokenAmount()',
  'error InvalidMsgValue()',
];
export type TeleportModalProps = FC<{
  amount: Wei;
  toNetworkName: string;
  toNetworkId: number;
  isOpen: boolean;
  onClose: () => void;
}>;
export const TeleporterModal: TeleportModalProps = ({
  onClose,
  isOpen,
  amount,
  toNetworkName,
  toNetworkId,
}) => {
  const { data: CoreProxy } = useCoreProxy();
  const { data: USDProxy } = useUSDProxy();
  const { data: ethBalance } = useEthBalance();
  const { approve, requireApproval, refetchAllowance } = useApprove({
    contractAddress: USDProxy?.address,
    amount: amount.toBN(),
    spender: CoreProxy?.address,
  });

  const toast = useToast({ isClosable: true, duration: 9000 });

  const { exec: execTeleport, txnState } = useTeleport({
    amount,
    toNetworkId,
    ethBalance,
  });
  const coreProxyAbi = CoreProxy?.interface.format(ethers.utils.FormatTypes.full) || [];

  const errorParsingContract = new Contract(
    '0x0000000000000000000000000000000000000000',
    ccipErrors.concat(coreProxyAbi)
  );
  const errorParserCoreProxy = useContractErrorParser(errorParsingContract);

  const [state, send] = useMachine(TeleportMachine, {
    services: {
      [ServiceNames.approve]: async () => {
        try {
          toast({
            title: 'Approve snxUSD',
            description: 'The next transaction will teleport.',
            status: 'info',
          });

          await approve(Boolean(state.context.infiniteApproval));
          await refetchAllowance();
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
          });
          throw Error('Approve failed', { cause: error });
        }
      },

      [ServiceNames.teleport]: async () => {
        try {
          toast.closeAll();
          toast({
            title: 'Teleporting',
            description: '',
          });
          await execTeleport();
          toast.closeAll();
          toast({
            title: 'Success',
            description: 'Teleportation executed.',
            status: 'success',
            duration: 5000,
          });
        } catch (error: any) {
          const contractError = errorParserCoreProxy(error);
          if (contractError) {
            console.error(new Error(contractError.name), contractError);
          }
          toast({
            title: 'Teleport failed',
            description: contractError ? (
              <ContractError contractError={contractError} />
            ) : (
              'Please try again.'
            ),
            status: 'error',
          });
          throw Error('Teleport failed', { cause: error });
        }
      },
    },
  });

  useEffect(() => {
    send(Events.SET_REQUIRE_APPROVAL, { requireApproval });
  }, [requireApproval, send]);

  const handleClose = useCallback(() => {
    send(Events.RESET);
    onClose();
  }, [send, onClose]);

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

  return (
    <TeleporterModalUi
      amount={amount}
      isOpen={isOpen}
      onClose={onClose}
      toNetworkName={toNetworkName}
      state={state}
      setInfiniteApproval={(infiniteApproval) => {
        send(Events.SET_INFINITE_APPROVAL, { infiniteApproval });
      }}
      txnHash={txnState.txnHash}
      onSubmit={onSubmit}
    />
  );
};
