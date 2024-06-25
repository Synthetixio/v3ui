import { Button, Divider, Text, useToast } from '@chakra-ui/react';
import { Amount } from '@snx-v3/Amount';
import Wei from '@synthetixio/wei';
import { TransactionStatus } from '@snx-v3/txnReducer';
import { Multistep } from '@snx-v3/Multistep';
import { useCallback, useContext } from 'react';
import { useParams } from '@snx-v3/useParams';
import { ManagePositionContext } from '@snx-v3/ManagePositionContext';
import { useCollateralType } from '@snx-v3/useCollateralTypes';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { useContractErrorParser } from '@snx-v3/useContractErrorParser';
import { ContractError } from '@snx-v3/ContractError';
import { useQueryClient } from '@tanstack/react-query';
import { useNetwork } from '@snx-v3/useBlockchain';
import { useBorrow } from '@snx-v3/useBorrow';
import { isBaseAndromeda } from '@snx-v3/isBaseAndromeda';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useStablecoin } from '@snx-v3/useStablecoin';
import { LiquidityPositionUpdated } from '../../ui/src/components/Manage/LiquidityPositionUpdated';

export const BorrowModalUi: React.FC<{
  onClose: () => void;
  debtChange: Wei;
  isOpen: boolean;
  txnStatus: TransactionStatus;
  execBorrow: () => void;
}> = ({ onClose, isOpen, debtChange, txnStatus, execBorrow }) => {
  const { network } = useNetwork();
  const isBase = isBaseAndromeda(network?.id, network?.preset);

  const stablecoin = useStablecoin();

  if (isOpen) {
    if (txnStatus === 'success') {
      return (
        <LiquidityPositionUpdated
          onClose={onClose}
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
          title="Borrow"
          subtitle={
            <Text as="div">
              {isBase ? 'Claim' : 'Borrow'}{' '}
              <Amount value={debtChange} suffix={isBase ? ' USDC' : ` ${stablecoin?.symbol}`} />
            </Text>
          }
          status={{
            failed: txnStatus === 'error',
            loading: ['prompting', 'pending'].includes(txnStatus),
          }}
        />

        <Button
          isDisabled={txnStatus === 'pending'}
          onClick={() => {
            if (['unsent', 'error'].includes(txnStatus)) {
              execBorrow();
            }
          }}
          width="100%"
          mt="4"
          data-testid="borrow confirm button"
        >
          {(() => {
            switch (txnStatus) {
              case 'error':
                return 'Retry';
              case 'pending':
              case 'prompting':
                return 'Processing...';
              default:
                return 'Execute Transaction';
            }
          })()}
        </Button>
      </div>
    );
  }
};

export const BorrowModal: React.FC<{
  onClose: () => void;
  isOpen: boolean;
}> = ({ onClose, isOpen }) => {
  const { debtChange } = useContext(ManagePositionContext);
  const queryClient = useQueryClient();
  const params = useParams();
  const { data: collateralType } = useCollateralType(params.collateralSymbol);

  const {
    exec: execBorrow,
    txnState,
    settle: settleBorrow,
  } = useBorrow({
    accountId: params.accountId,
    poolId: params.poolId,
    collateralTypeAddress: collateralType?.tokenAddress,
    debtChange,
  });

  const toast = useToast({ isClosable: true, duration: 9000 });
  const { data: CoreProxy } = useCoreProxy();
  const { network } = useNetwork();
  const errorParserCoreProxy = useContractErrorParser(CoreProxy);
  const execBorrowWithErrorParser = useCallback(async () => {
    try {
      await execBorrow();
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
        title: 'Borrow failed',
        description: contractError ? (
          <ContractError contractError={contractError} />
        ) : (
          'Please try again.'
        ),
        status: 'error',
      });
      throw Error('Borrow failed', { cause: error });
    }
  }, [execBorrow, queryClient, network?.id, network?.preset, errorParserCoreProxy, toast]);

  const { txnStatus } = txnState;

  if (!params.poolId || !params.accountId || !collateralType) return null;

  return (
    <BorrowModalUi
      execBorrow={execBorrowWithErrorParser}
      debtChange={debtChange}
      txnStatus={txnStatus}
      onClose={() => {
        settleBorrow();
        onClose();
      }}
      isOpen={isOpen}
    />
  );
};
