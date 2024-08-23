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
      const address = await signer?.getAddress();
      await query.invalidateQueries({
        queryKey: ['isNominated', address?.toLowerCase()],
        exact: false,
      });
      await Promise.all([
        await query.invalidateQueries({ queryKey: ['nominees', currentNomination] }),
        await query.invalidateQueries({ queryKey: ['nominees', nextNomination] }),
        await query.invalidateQueries({ queryKey: ['nomineesDetails', currentNomination] }),
        await query.invalidateQueries({ queryKey: ['nomineesDetails', nextNomination] }),
        await query.refetchQueries({ queryKey: ['nominees', currentNomination], exact: false }),
        await query.refetchQueries({ queryKey: ['nominees', nextNomination], exact: false }),
        await query.refetchQueries({
          queryKey: ['nomineesDetails', currentNomination, address],
          exact: false,
        }),
        await query.refetchQueries({
          queryKey: ['nomineesDetails', nextNomination, address],
          exact: false,
        }),
      ]);
      toast({
        description: 'Nomination successfully edited.',
        status: 'success',
      });
    },
  });
}
