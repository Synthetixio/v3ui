import { useQuery } from '@tanstack/react-query';
import { useNetwork, useSigner } from '@snx-v3/useBlockchain';
import { CouncilSlugs } from '../utils/councils';
import { getCouncilContract } from '../utils/contracts';
import { BigNumber, providers } from 'ethers';

export default function useGetUserBallot<T extends CouncilSlugs | CouncilSlugs[]>(council: T) {
  const network = useNetwork();
  const signer = useSigner();

  return useQuery({
    queryFn: async () => {
      if (signer) {
        return await getBallot(council, signer, network.id);
      }
    },
    enabled: !!signer,
    queryKey: ['userBallot', council.toString()],
    staleTime: 900000,
  });
}

async function getBallot<T extends CouncilSlugs | CouncilSlugs[]>(
  council: T,
  signer: providers.JsonRpcSigner,
  chianId: number
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
  let ballot;
  if (Array.isArray(council)) {
    ballot = (await Promise.all(
      council.map(async (c) => {
        const electionModule = getCouncilContract(c).connect(signer!);
        const voter = await signer!.getAddress();
        const electionId = electionModule.getEpochIndex();
        const temp = await electionModule.getBallot(voter, chianId, electionId);
        return { ...temp, council: c };
      })
    )) as { votingPower: BigNumber; votedCandidates: string[]; amounts: BigNumber[] }[];
  } else {
    const electionModule = getCouncilContract(council).connect(signer!);
    const voter = await signer!.getAddress();
    const electionId = electionModule.getEpochIndex();
    const temp = (await electionModule.getBallot(voter, chianId, electionId)) as {
      votingPower: BigNumber;
      votedCandidates: string[];
      amounts: BigNumber[];
    };
    ballot = { ...temp, council };
  }
  // @ts-ignore
  // TODO @MF check why TS is acting up
  return ballot;
}
