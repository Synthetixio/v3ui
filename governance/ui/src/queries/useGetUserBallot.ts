import { useQuery } from '@tanstack/react-query';
import { BigNumber } from 'ethers';
import { CouncilSlugs } from '../utils/councils';
import { getCouncilContract } from '../utils/contracts';
import { useNetwork, useSigner } from './useWallet';
import { motherShipProvider } from '../utils/providers';

export function useGetUserBallot<T extends CouncilSlugs | CouncilSlugs[]>(
  council: T,
  epochIndex?: number
) {
  const { network } = useNetwork();
  const signer = useSigner();

  return useQuery({
    queryFn: async () => {
      if (signer && network?.id) {
        const address = await signer.getAddress();
        return await getBallot(council, address, network.id, epochIndex);
      }
    },
    enabled: !!signer,
    queryKey: ['userBallot', council.toString(), network?.id, epochIndex],
    staleTime: 900000,
  });
}

async function getBallot<T extends CouncilSlugs | CouncilSlugs[]>(
  council: T,
  address: string,
  chainId: number,
  epochIndex?: number
): Promise<
  T extends CouncilSlugs
    ? {
        votingPower: BigNumber;
        votedCandidates: string[];
        amounts: BigNumber[];
        council: CouncilSlugs;
      }
    : {
        votingPower: BigNumber;
        votedCandidates: string[];
        amounts: BigNumber[];
        council: CouncilSlugs;
      }[]
> {
  const provider = motherShipProvider(chainId);
  let ballot;
  if (Array.isArray(council)) {
    ballot = (await Promise.all(
      council.map(async (c) => {
        const electionModule = getCouncilContract(c).connect(provider);
        const electionId = epochIndex ?? (await electionModule.getEpochIndex());
        const temp = await electionModule.getBallot(address, chainId, electionId);
        return { ...temp, council: c };
      })
    )) as { votingPower: BigNumber; votedCandidates: string[]; amounts: BigNumber[] }[];
  } else {
    const electionModule = getCouncilContract(council).connect(provider);
    const electionId = epochIndex ?? (await electionModule.getEpochIndex());
    const temp = (await electionModule.getBallot(address, chainId, electionId)) as {
      votingPower: BigNumber;
      votedCandidates: string[];
      amounts: BigNumber[];
    };
    ballot = { ...temp, council };
  }
  // @ts-ignore
  // TODO @dev check why TS is acting up
  return ballot;
}
