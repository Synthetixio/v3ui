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
      const isCI = process.env.CI === 'true';
      try {
        const electionModule = getCouncilContract(council).connect(motherShipProvider(network.id));
        const isMC = isMotherchain(network.id);

        const electionId = await electionModule.getEpochIndex();
        const ballot = isMC
          ? await electionModule.getBallot(activeWallet.address, network.id, electionId)
          : await electionModule.connect(provider).getPreparedBallot(activeWallet.address);
        const votingPowerFromMotherchain: BigNumber = isMC
          ? await electionModule
              .connect(motherShipProvider(network.id))
              .getVotePower(activeWallet.address, network.id, electionId)
          : BigNumber.from(0);

        if (ballot) {
          if (ballot?.votingPower?.gt(0)) {
            return {
              power: isCI ? (ballot.votingPower as BigNumber) : votingPowerFromMotherchain,
              isDeclared: true,
            };
          } else if ('gt' in ballot && ballot.gt(0)) {
            return {
              power: isCI ? (ballot as BigNumber) : votingPowerFromMotherchain,
              isDeclared: true,
            };
          }
        }
        const votingPower: BigNumber = isCI
          ? isMC
            ? await electionModule
                .connect(provider)
                .callStatic.prepareBallotWithSnapshot(
                  SnapshotRecordContract(network.id, council)?.address,
                  activeWallet?.address
                )
            : await SnapshotRecordContract(network.id, council)
                ?.connect(provider)
                .balanceOfOnPeriod(activeWallet.address, 1)
          : BigNumber.from(0);
        return {
          power: process.env.CI === 'true' ? votingPower : votingPowerFromMotherchain,
          isDeclared: false,
        };
      } catch (error) {
        console.error('ERROR IS', { error });
        return { power: ethers.BigNumber.from(0), isDeclared: false };
      }
    },
    enabled: !!provider && !!activeWallet && !!network?.id,
    queryKey: ['votingPower', council.toString(), activeWallet?.address, network?.id],
    staleTime: 900000,
  });
}
