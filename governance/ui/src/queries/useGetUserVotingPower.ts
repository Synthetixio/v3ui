import { useQuery } from '@tanstack/react-query';
import { useNetwork } from '@snx-v3/useBlockchain';
import { CouncilSlugs } from '../utils/councils';
import { SnapshotRecordContract, getCouncilContract, isMotherchain } from '../utils/contracts';
import { useProvider, useWallet } from './';
import { BigNumber, ethers, providers } from 'ethers';
import { motherShipProvider } from '../utils/providers';

export function useGetUserVotingPower(council: CouncilSlugs) {
  const { network } = useNetwork();
  const provider = useProvider();
  const { activeWallet } = useWallet();

  return useQuery({
    queryFn: async () => {
      return await fetchVotingPower(council, activeWallet?.address, provider, network?.id);
    },
    enabled: !!provider && !!activeWallet && !!network?.id,
    queryKey: ['votingPower', council.toString(), activeWallet?.address, network?.id],
    staleTime: 900000,
  });
}

export function useGetUserVotingPowerForAllChains(council: CouncilSlugs) {
  const L1Provider = new providers.JsonRpcProvider(
    'https://mainnet.infura.io/v3/23087ce9f88c44d1b1c54fd7c07c65fb'
  );
  const OptimismProvider = new providers.JsonRpcProvider(
    'https://optimism-mainnet.infura.io/v3/23087ce9f88c44d1b1c54fd7c07c65fb'
  );
  const { activeWallet } = useWallet();
  return useQuery({
    queryFn: async () => {
      return {
        L1: await fetchVotingPower(council, activeWallet?.address, L1Provider, 1),
        Optimism: await fetchVotingPower(council, activeWallet?.address, OptimismProvider, 10),
      };
    },
    enabled: !!activeWallet,
    queryKey: ['votingPowerForAllChains', council.toString(), activeWallet?.address],
    staleTime: 900000,
  });
}

async function fetchVotingPower(
  council: CouncilSlugs,
  activeWallet?: string,
  provider?: providers.JsonRpcProvider,
  networkId?: number
) {
  if (!activeWallet || !provider || !networkId) return;
  const isCI = process.env.CI === 'true';
  try {
    const electionModule = getCouncilContract(council).connect(motherShipProvider(networkId));
    const isMC = isMotherchain(networkId);

    const snapshotContract = SnapshotRecordContract(networkId, council);
    const electionId = await electionModule.getEpochIndex();
    const ballot: { votingPower: BigNumber } | undefined = await electionModule.getBallot(
      activeWallet,
      networkId,
      electionId
    );

    const periodId = await snapshotContract?.connect(provider).currentPeriodId();

    const votingPowerFromMotherchain: BigNumber = isCI
      ? BigNumber.from(0)
      : await electionModule
          .connect(provider)
          .getVotingPowerForUser(snapshotContract?.address, activeWallet, periodId);

    if (ballot?.votingPower?.gt(0)) {
      return {
        power: isCI ? (ballot.votingPower as BigNumber) : votingPowerFromMotherchain,
        isDeclared: true,
      };
    }

    const votingPower: BigNumber = isCI
      ? isMC
        ? await electionModule
            .connect(provider)
            .callStatic.prepareBallotWithSnapshot(snapshotContract?.address, activeWallet)
        : BigNumber.from(0)
      : votingPowerFromMotherchain;

    return {
      power: votingPower,
      isDeclared: false,
    };
  } catch (error) {
    console.error('ERROR IS', { error });
    return { power: ethers.BigNumber.from(0), isDeclared: false };
  }
}
