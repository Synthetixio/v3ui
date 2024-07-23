import { useMutation } from '@tanstack/react-query';
import { useGetUserVotingPower, useNetwork, useSigner, useWallet } from '../queries';
import { CouncilSlugs } from '../utils/councils';
import {
  getCouncilContract,
  getWormwholeChainId,
  SnapshotRecordContractAddress,
} from '../utils/contracts';
import { BigNumber, Contract, utils } from 'ethers';
import { multicallABI } from '../utils/abi';

export function useCastVotes(
  councils: CouncilSlugs[],
  candidates: { spartan?: string; ambassador?: string; treasury?: string }
) {
  const signer = useSigner();
  const { network } = useNetwork();
  const { activeWallet } = useWallet();
  const multicall = new Contract('0xE2C5658cC5C448B48141168f3e475dF8f65A1e3e', multicallABI);
  const { data: spartanVotingPower } = useGetUserVotingPower('spartan');
  const { data: ambassadorVotingPower } = useGetUserVotingPower('ambassador');
  const { data: treasuryVotingPower } = useGetUserVotingPower('treasury');

  return useMutation({
    mutationFn: async () => {
      if (signer && network && multicall) {
        const getVotingPowerByCouncil = (council: CouncilSlugs) => {
          switch (council) {
            case 'spartan':
              return spartanVotingPower;
            case 'ambassador':
              return ambassadorVotingPower;
            case 'treasury':
              return treasuryVotingPower;
            default:
              return spartanVotingPower;
          }
        };
        const isMotherchain = network.id === 11155420;
        try {
          const electionModules = councils.map((council) =>
            getCouncilContract(council).connect(signer)
          );

          const prepareBallotData = councils
            .map((council) => {
              if (!getVotingPowerByCouncil(council)?.isDeclared) {
                return isMotherchain
                  ? {
                      target: electionModules[0].address,
                      callData: electionModules[0].interface.encodeFunctionData(
                        'prepareBallotWithSnapshot',
                        [SnapshotRecordContractAddress(network.id), activeWallet?.address]
                      ),
                    }
                  : {
                      target: electionModules[0].address,
                      callData: electionModules[0].interface.encodeFunctionData(
                        'prepareBallotWithSnapshot',
                        [SnapshotRecordContractAddress(network.id), activeWallet?.address]
                      ),
                      value: 0,
                      requireSuccess: true,
                    };
              }
              return '';
            })
            .filter((call) => !!call);
          let quote: BigNumber = BigNumber.from(0);
          if (!isMotherchain) {
            quote = await electionModules[0].quoteCrossChainDeliveryPrice(10005, 0, 1_000_000);
          }
          const castData = councils.map((council) => {
            return isMotherchain
              ? {
                  target: electionModules[0].address,
                  callData: electionModules[0].interface.encodeFunctionData('cast', [
                    [candidates[council]],
                    [getVotingPowerByCouncil(council)?.power],
                  ]),
                }
              : {
                  target: electionModules[0].address,
                  callData: electionModules[0].interface.encodeFunctionData('cast', [
                    [candidates[council]],
                    [getVotingPowerByCouncil(council)?.power],
                  ]),
                  value: quote,
                  requireSuccess: true,
                };
          });

          await multicall
            .connect(signer)
            [isMotherchain ? 'aggregate' : 'aggregate3Value']([...prepareBallotData, ...castData], {
              gasLimit: 1_250_000,
            });
        } catch (error) {
          console.error(error);
        }
      } else {
        console.error('signer not connected');
      }
    },
  });
}
