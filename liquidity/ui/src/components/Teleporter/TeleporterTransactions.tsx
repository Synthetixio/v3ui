import { Button, Text, useToast, Link } from '@chakra-ui/react';
import { Amount } from '@snx-v3/Amount';
import { ContractError } from '@snx-v3/ContractError';
import { Multistep } from '@snx-v3/Multistep';
import { useApprove } from '@snx-v3/useApprove';
import { useContractErrorParser } from '@snx-v3/useContractErrorParser';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { useUSDProxy } from '@snx-v3/useUSDProxy';
import { Wei } from '@synthetixio/wei';
import { FC, useCallback, useState } from 'react';
import { Contract, ethers } from 'ethers';
import { useEthBalance } from '@snx-v3/useEthBalance';
import { useTeleport } from '../../../../lib/useTeleport';

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

type Props = FC<{
  amount: Wei;
  toNetworkName: string;
  toNetworkId: number;
  onClose: () => void;
}>;

export const TeleporterTransactions: Props = ({ onClose, amount, toNetworkName, toNetworkId }) => {
  const { data: CoreProxy } = useCoreProxy();
  const { data: USDProxy } = useUSDProxy();
  const { data: ethBalance } = useEthBalance();
  const [infiniteApproval, setInfiniteApproval] = useState(false);

  const [txState, setTxState] = useState({
    step: 1,
    status: 'idle',
  });

  const { approve, refetchAllowance } = useApprove({
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

  const onSubmit = useCallback(async () => {
    try {
      if (txState.step > 2) {
        onClose();
        return;
      }

      if (txState.step === 1) {
        await approve(infiniteApproval);
        refetchAllowance();
      }

      setTxState({
        step: 2,
        status: 'pending',
      });

      await execTeleport();

      setTxState({
        step: 2,
        status: 'success',
      });

      toast.closeAll();
      toast({
        title: 'Success',
        description: 'Teleportation executed.',
        status: 'success',
        duration: 5000,
      });
    } catch (error) {
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
    }
  }, [
    approve,
    errorParserCoreProxy,
    execTeleport,
    infiniteApproval,
    onClose,
    refetchAllowance,
    toast,
    txState.step,
  ]);

  return (
    <>
      <Multistep
        step={1}
        title="Approve snxUSD"
        status={{
          failed: txState.step === 1 && txState.status === 'error',
          success: txState.step > 1,
          loading: txState.step === 1 && txState.status === 'pending',
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
            {txState.status === 'success' ? (
              <Text>
                Teleport for <Amount showTooltip value={amount} suffix={` snxUSD`} /> to{' '}
                {toNetworkName} executed. Check{' '}
                <Link
                  color="cyan.500"
                  href={`https://ccip.chain.link/tx/${txnState.txnHash}`}
                  target="_blank"
                >
                  ccip explorer
                </Link>{' '}
                for status.
              </Text>
            ) : (
              <Text>
                This will teleport <Amount value={amount} suffix={` snxUSD`} /> to {toNetworkName}
              </Text>
            )}
          </>
        }
        status={{
          failed: txState.step === 2 && txState.status === 'error',
          success: txState.step === 2 && txState.status === 'sucess',
          loading: txState.step === 2 && txState.status === 'pending',
        }}
      />

      <Button isDisabled={txState.status === 'pending'} onClick={onSubmit} width="100%" my="4">
        {(() => {
          switch (true) {
            case txState.status === 'error':
              return 'Retry';
            case txState.status === 'pending':
              return 'Processing...';
            case txState.step === 2 && txState.status === 'sucess':
              return 'Done';
            default:
              return 'Execute Transaction';
          }
        })()}
      </Button>
    </>
  );
};
