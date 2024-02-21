import { useQuery } from '@tanstack/react-query';
import { useNetwork } from '@snx-v3/useBlockchain';
import { CouncilSlugs } from '../utils/councils';
import { SnapshotRecordContractAddress, getCouncilContract } from '../utils/contracts';
import { useProvider, useWallet } from './';
import { ethers } from 'ethers';

export function useGetUserVotingPower(council: CouncilSlugs) {
  const { network } = useNetwork();
  const provider = useProvider();
  const { activeWallet } = useWallet();

  return useQuery({
    queryFn: async () => {
      if (!activeWallet || !provider) return;

      try {
        const electionModule = getCouncilContract(council).connect(provider);
        // const implementation = await electionModule.getImplementation();

        const electionId = electionModule.connect(provider).getEpochIndex();

        const ballot = await electionModule
          .connect(provider)
          .getBallot(activeWallet.address, network?.id, electionId);

        if (ballot && ballot.votingPower.gt(0)) {
          return ballot.votingPower;
        }

        const votingPower = await electionModule.callStatic.prepareBallotWithSnapshot(
          SnapshotRecordContractAddress,
          activeWallet?.address
        );

        return votingPower.toString();
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log('ERROR IS', { error });
        return ethers.BigNumber.from(0);
      }
    },
    enabled: !!provider && !!activeWallet,
    queryKey: ['userBallot', council.toString(), activeWallet?.address],
    staleTime: 60000,
  });
}
