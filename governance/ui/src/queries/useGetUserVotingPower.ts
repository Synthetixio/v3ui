import { useQuery } from '@tanstack/react-query';
import { useNetwork } from '@snx-v3/useBlockchain';
import { CouncilSlugs } from '../utils/councils';
import { SnapshotRecordContractAddress, getCouncilContract } from '../utils/contracts';
import { useProvider, useWallet } from './';
import { BigNumber, ethers } from 'ethers';
import { motherShipProvider } from '../utils/providers';

export function useGetUserVotingPower(council: CouncilSlugs) {
  const { network } = useNetwork();
  const provider = useProvider();
  const { activeWallet } = useWallet();

  return useQuery({
    queryFn: async () => {
      if (!activeWallet || !provider || !network?.id) return;

      try {
        const electionModule = getCouncilContract(council).connect(motherShipProvider);

        const electionId = await electionModule.getEpochIndex();
        const ballot = await electionModule.getBallot(activeWallet.address, network.id, electionId);

        if (ballot && ballot.votingPower.gt(0)) {
          return { power: ballot.votingPower as BigNumber, isDeclared: true };
        }

        const votingPower: BigNumber = await electionModule
          .connect(provider)
          .callStatic.prepareBallotWithSnapshot(
            SnapshotRecordContractAddress(network.id),
            activeWallet?.address
          );
        return { power: votingPower, isDeclared: false };
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('ERROR IS', { error });
        return { power: ethers.BigNumber.from(0), isDeclared: false };
      }
    },
    enabled: !!provider && !!activeWallet,
    queryKey: ['userBallot', council.toString(), activeWallet?.address],
    staleTime: 60000,
  });
}
