import { NominateSelf } from '../components/NominateSelf';
import { PassedElectionAccordion } from '../components/PassedElectionAccordion';
import { UserProfileCard } from '../components/UserProfileCard';
import councils from '../utils/councils';

export default function Councils() {
  return (
    <>
      <PassedElectionAccordion activeCouncil={councils[0]} />
      <UserProfileCard walletAddress="0x" />
      <NominateSelf
        activeCouncil={councils[1]}
        action="nominate"
        user={{
          about: 'Hey its me Mario',
          address: '0x47872B16557875850a02C94B28d959515F894913',
          delegationPitch: 'Gimme yo votes',
          discord: '',
          github: '',
          pfpUrl: '',
          twitter: '',
          username: 'Andy',
        }}
      />
    </>
  );
}
