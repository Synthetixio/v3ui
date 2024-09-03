import { Button, Text, useToast, VStack } from '@chakra-ui/react';
import { Amount } from '@snx-v3/Amount';
import { Multistep } from '@snx-v3/Multistep';
import { useApprove } from '@snx-v3/useApprove';
import { Wei } from '@synthetixio/wei';
import { FC, useCallback, useState } from 'react';
import { Network } from '@snx-v3/useBlockchain';
import { useV2sUSD } from '@snx-v3/useV2sUSD';
import { useLegacyMarket } from '@snx-v3/useLegacyMarket';
import { useMigrateUSD } from '@snx-v3/useMigrateUSD';
import { StepSuccess } from './StepSuccess';
import { ZEROWEI } from '../../utils/constants';
import { useTokenBalance } from '@snx-v3/useTokenBalance';
import { useUSDProxyForChain } from '@snx-v3/useUSDProxy';

type Props = FC<{
  amount: Wei;
  network: Network;
  onSuccess: () => void;
  onBack: () => void;
}>;

export const MigrateUSDTransaction: Props = ({ onSuccess, amount, network, onBack }) => {
  const { data: legacyMarket } = useLegacyMarket();

  const { data: v2_sUSD } = useV2sUSD(network);
  const { data: v2_balance } = useTokenBalance(v2_sUSD, network);
  const { data: v3_sUSD } = useUSDProxyForChain(network);
  const { data: v3_balance } = useTokenBalance(v3_sUSD?.address, network);

  const [infiniteApproval, setInfiniteApproval] = useState(false);
  const [txState, setTxState] = useState({
    step: 1,
    status: 'idle',
  });
  const [txSummary, setTxSummary] = useState({
    amount: ZEROWEI,
    v2Balance: ZEROWEI,
    v3Balance: ZEROWEI,
  });

  const { approve, refetchAllowance, requireApproval } = useApprove({
    contractAddress: v2_sUSD,
    amount: amount.toBN(),
    spender: legacyMarket?.address,
  });

  const toast = useToast({ isClosable: true, duration: 9000 });

  const { migrate, isSuccess } = useMigrateUSD({
    amount,
  });

  const onSubmit = useCallback(async () => {
    try {
      if (txState.step > 2) {
        onSuccess();
        return;
      }

      if (txState.step === 1 && requireApproval) {
        setTxState({
          step: 1,
          status: 'pending',
        });

        await approve(infiniteApproval);
        refetchAllowance();
      }

      setTxState({
        step: 2,
        status: 'pending',
      });

      setTxSummary({
        amount,
        v2Balance: v2_balance || ZEROWEI,
        v3Balance: v3_balance || ZEROWEI,
      });
      await migrate();

      setTxState({
        step: 2,
        status: 'success',
      });

      toast.closeAll();
      toast({
        title: 'Success',
        description: 'Migration executed.',
        status: 'success',
        duration: 5000,
        variant: 'left-accent',
      });
    } catch (error) {
      setTxState((state) => ({
        step: state.step,
        status: 'error',
      }));
      toast({
        title: 'Migration failed',
        description: 'Please try again.',
        status: 'error',
        variant: 'left-accent',
      });
    }
  }, [
    amount,
    approve,
    infiniteApproval,
    migrate,
    onSuccess,
    refetchAllowance,
    requireApproval,
    toast,
    txState.step,
    v2_balance,
    v3_balance,
  ]);

  if (isSuccess) {
    return <StepSuccess {...txSummary} onConfirm={onSuccess} />;
  }

  return (
    <VStack spacing={0}>
      <Multistep
        width="100%"
        step={1}
        title="Approve sUSD transfer"
        status={{
          failed: txState.step === 1 && txState.status === 'error',
          success: txState.step > 1,
          loading: txState.step === 1 && txState.status === 'pending',
        }}
        checkboxLabel="Approve unlimited sUSD transfers to Synthetix"
        checkboxProps={{
          isChecked: infiniteApproval,
          onChange: (e) => setInfiniteApproval(e.target.checked),
        }}
        mt={0}
      />

      <Multistep
        width="100%"
        step={2}
        title="Convert sUSD"
        mb={4}
        mt={4}
        subtitle={
          <Text>
            This will convert <Amount value={amount} suffix={` v2 sUSD`} /> to v3 sUSD
          </Text>
        }
        status={{
          failed: txState.step === 2 && txState.status === 'error',
          success: txState.step === 2 && txState.status === 'sucess',
          loading: txState.step === 2 && txState.status === 'pending',
        }}
      />

      <Button isDisabled={txState.status === 'pending'} onClick={onSubmit} width="100%" mb={2}>
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

      {txState.status !== 'pending' && (
        <Button variant="outline" colorScheme="gray" width="100%" onClick={onBack}>
          Back
        </Button>
      )}
    </VStack>
  );
};
