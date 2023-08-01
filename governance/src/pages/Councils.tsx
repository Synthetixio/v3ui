import { PassedElectionAccordion } from '../components/PassedElectionAccordion';
import { UserProfileCard } from '../components/UserProfileCard';
import councils from '../utils/councils';

export default function Councils() {
  return (
    <>
      <PassedElectionAccordion activeCouncil={councils[0]} />
      <UserProfileCard walletAddress="0x" />
    </>
  );
}
