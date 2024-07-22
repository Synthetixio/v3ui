import { useMutation } from '@tanstack/react-query';
import { useMulticall3 } from '@snx-v3/useMulticall3';
import { useNetwork, useSigner, useWallet } from '../queries';
import { CouncilSlugs } from '../utils/councils';
import {
  getCouncilContract,
  getWormwholeChainId,
  SnapshotRecordContractAddress,
} from '../utils/contracts';
import { BigNumber } from 'ethers';

export function useCastVotes(councils: CouncilSlugs[], votingPowers: BigNumber[]) {
  const { data: multicall } = useMulticall3();
  const signer = useSigner();
  const { network } = useNetwork();
  const { activeWallet } = useWallet();

  return useMutation({
    mutationFn: async () => {
      if (signer && network && multicall) {
        const isMotherchain = network.id !== 421614;
        try {
          const electionModules = councils.map((council) =>
            getCouncilContract(council).connect(signer)
          );
          const prepareBallotData = electionModules[0].interface.encodeFunctionData(
            'prepareBallotWithSnapshot',
            [SnapshotRecordContractAddress(network.id), activeWallet?.address]
          );
          let quote: BigNumber = BigNumber.from(0);
          if (isMotherchain) {
            quote = await electionModules[0].quoteCrossChainDeliveryPrice(
              getWormwholeChainId(network.id)
            );
          }
          const castData = votingPowers.map((power) =>
            electionModules[0].interface.encodeFunctionData('cast', [
              ['0x47872B16557875850a02C94B28d959515F894913'],
              [power],
            ])
          );

          multicall[isMotherchain ? 'aggregate' : 'aggregate3Value'](
            [prepareBallotData, castData],
            {
              value: isMotherchain ? '0' : quote,
            }
          );
        } catch (error) {
          console.error(error);
        }
      } else {
        console.error('signer not connected');
      }
    },
  });
}
