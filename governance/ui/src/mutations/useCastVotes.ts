import { useMutation } from '@tanstack/react-query';
import { useMulticall3 } from '@snx-v3/useMulticall3';
import { useNetwork, useSigner, useWallet } from '../queries';
import { CouncilSlugs } from '../utils/councils';
import {
  getCouncilContract,
  getWormwholeChainId,
  SnapshotRecordContractAddress,
} from '../utils/contracts';
import { BigNumber, utils } from 'ethers';

export function useCastVotes(council: CouncilSlugs, votingPower: BigNumber) {
  const { data: multicall } = useMulticall3();
  const signer = useSigner();
  const { network } = useNetwork();
  const { activeWallet } = useWallet();

  return useMutation({
    mutationFn: async () => {
      if (signer && network) {
        try {
          const electionModule = getCouncilContract(council).connect(signer);
          const prepareBallotData = electionModule.interface.encodeFunctionData(
            'prepareBallotWithSnapshot',
            [SnapshotRecordContractAddress(network.id), activeWallet?.address]
          );

          // TODO @dev get quote from contract
          const quote = await electionModule.quoteCrossChainDeliveryPrice(
            getWormwholeChainId(network.id)
          );

          const castData = electionModule.interface.encodeFunctionData('cast', [
            ['0x47872B16557875850a02C94B28d959515F894913'],
            [votingPower],
            { value: utils.parseEther('0.001') },
          ]);

          multicall.aggregateV3([prepareBallotData, castData]);
        } catch (error) {
          console.error(error);
        }
      } else {
        console.error('signer not connected');
      }
    },
  });
}
