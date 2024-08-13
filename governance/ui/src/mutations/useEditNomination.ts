import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSigner } from '../queries/useWallet';
import { getCouncilContract } from '../utils/contracts';
import { CouncilSlugs } from '../utils/councils';
import { CustomToast } from '../components/CustomToast';
import { useToast } from '@chakra-ui/react';
import { devSigner } from '../utils/providers';
import { Contract, utils } from 'ethers';
import { multicallABI } from '../utils/abi';

export default function useEditNomination({
  currentNomination,
  nextNomination,
}: {
  currentNomination?: CouncilSlugs;
  nextNomination?: CouncilSlugs;
}) {
  const query = useQueryClient();
  const signer = useSigner();
  const toast = useToast();
  // TODO @dev implement it
  const multicall = new Contract('0xE2C5658cC5C448B48141168f3e475dF8f65A1e3e', multicallABI);

  return useMutation({
    mutationFn: async () => {
      if (signer) {
        if ((nextNomination && currentNomination) || (!nextNomination && currentNomination)) {
          const tx1 = await getCouncilContract(currentNomination)
            .connect(process.env.DEV === 'true' ? devSigner : signer)
            .withdrawNomination({
              maxPriorityFeePerGas: utils.parseUnits('1', 'gwei'),
              maxFeePerGas: utils.parseUnits('2', 'gwei'),
            });
          await tx1.wait();
        }
        if (nextNomination) {
          const tx2 = await getCouncilContract(nextNomination)
            .connect(process.env.DEV === 'true' ? devSigner : signer)
            .nominate({
              maxPriorityFeePerGas: utils.parseUnits('1', 'gwei'),
              maxFeePerGas: utils.parseUnits('2', 'gwei'),
            });
          await tx2.wait();
        }
      }
    },
    mutationKey: ['editNomination', currentNomination, nextNomination],
    onSuccess: async () => {
      const address = await signer?.getAddress();
      await query.invalidateQueries({
        queryKey: ['isNominated', address?.toLowerCase()],
        exact: false,
      });
      await query.invalidateQueries({ queryKey: ['nominees', currentNomination] });
      await query.invalidateQueries({ queryKey: ['nominees', nextNomination] });
      await query.invalidateQueries({ queryKey: ['nomineesDetails', currentNomination] });
      await query.invalidateQueries({ queryKey: ['nomineesDetails', nextNomination] });
      await query.refetchQueries({ queryKey: ['nominees', currentNomination], exact: false });
      await query.refetchQueries({ queryKey: ['nominees', nextNomination], exact: false });
      await query.refetchQueries({
        queryKey: ['nomineesDetails', currentNomination],
        exact: false,
      });
      await query.refetchQueries({ queryKey: ['nomineesDetails', nextNomination], exact: false });
      toast({
        description: 'Nomination successfully edited.',
        status: 'success',
        render: CustomToast,
      });
    },
  });
}
