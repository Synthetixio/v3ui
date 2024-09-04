import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSigner } from '../queries/useWallet';
import { getCouncilContract } from '../utils/contracts';
import { CouncilSlugs } from '../utils/councils';
import { useToast } from '@chakra-ui/react';
import { utils } from 'ethers';
import { useMulticall } from '../hooks/useMulticall';

export default function useEditNomination({
  currentNomination,
  nextNomination,
}: {
  currentNomination?: CouncilSlugs;
  nextNomination?: CouncilSlugs | null;
}) {
  const query = useQueryClient();
  const signer = useSigner();
  const toast = useToast();
  const multicall = useMulticall();
  return useMutation({
    mutationFn: async () => {
      if (signer) {
        const txs = [];
        if ((nextNomination && currentNomination) || (!nextNomination && currentNomination)) {
          txs.push({
            target: getCouncilContract(currentNomination).address,
            callData:
              getCouncilContract(currentNomination).interface.encodeFunctionData(
                'withdrawNomination'
              ),
          });
        }
        if (nextNomination) {
          txs.push({
            target: getCouncilContract(nextNomination).address,
            callData: getCouncilContract(nextNomination).interface.encodeFunctionData('nominate'),
          });
        }
        await multicall.connect(signer).aggregate(txs, {
          maxPriorityFeePerGas: utils.parseUnits('1', 'gwei'),
          maxFeePerGas: utils.parseUnits('2', 'gwei'),
        });
      }
    },
    mutationKey: ['editNomination', currentNomination, nextNomination],
    onSuccess: async () => {
      await Promise.all([
        query.invalidateQueries({ queryKey: ['isNominated'] }),
        query.invalidateQueries({ queryKey: ['nominees'] }),
        query.invalidateQueries({ queryKey: ['nominees'] }),
        query.invalidateQueries({ queryKey: ['nomineesDetails'] }),
        query.invalidateQueries({ queryKey: ['nomineesDetails'] }),
      ]);
      await Promise.all([
        query.refetchQueries({ queryKey: ['nominees'], exact: false }),
        query.refetchQueries({ queryKey: ['nominees'], exact: false }),
        query.refetchQueries({ queryKey: ['isNominated'], exact: false }),
        query.refetchQueries({
          queryKey: ['nomineesDetails'],
          exact: false,
        }),
        query.refetchQueries({
          queryKey: ['nomineesDetails'],
          exact: false,
        }),
      ]);
      toast({
        description: 'Nomination successfully edited.',
        status: 'success',
        isClosable: true,
      });
    },
  });
}
