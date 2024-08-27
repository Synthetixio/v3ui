import { useQuery } from '@tanstack/react-query';
import { useNetwork } from '@snx-v3/useBlockchain';
import { CouncilSlugs } from '../utils/councils';
import { SnapshotRecordContract, getCouncilContract, isMotherchain } from '../utils/contracts';
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
        const electionModule = getCouncilContract(council).connect(motherShipProvider(network.id));
        const isMC = process.env.CI === 'true' ? true : isMotherchain(network.id);

        const electionId = await electionModule.getEpochIndex();
        const ballot = isMC
          ? await electionModule.getBallot(activeWallet.address, network.id, electionId)
          : await electionModule.connect(provider).getPreparedBallot(activeWallet.address);

        if (ballot) {
          if (ballot?.votingPower?.gt(0)) {
            return { power: ballot.votingPower as BigNumber, isDeclared: true };
          } else if ('gt' in ballot && ballot.gt(0)) {
            return { power: ballot as BigNumber, isDeclared: true };
          }
        }
        const votingPower: BigNumber = isMC
          ? await electionModule
              .connect(provider)
              .callStatic.prepareBallotWithSnapshot(
                SnapshotRecordContract(network.id, council)?.address,
                activeWallet?.address
              )
          : await SnapshotRecordContract(network.id, council)
              ?.connect(provider)
              .balanceOfOnPeriod(activeWallet.address, 1);
        return { power: votingPower, isDeclared: false };
      } catch (error) {
        console.error('ERROR IS', { error });
        return { power: ethers.BigNumber.from(0), isDeclared: false };
      }
    },
    enabled: !!provider && !!activeWallet && !!network?.id,
    queryKey: ['votingPower', council.toString(), activeWallet?.address, network?.id],
    staleTime: 60000,
  });
}
