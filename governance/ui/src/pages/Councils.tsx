import CouncilTabs from '../components/CouncilTabs/CouncilTabs';
import { PassedElectionAccordion } from '../components/PassedElectionAccordion';
import { UserProfileCard } from '../components/UserProfileCard';
import councils, { Council } from '../utils/councils';
import { useSearchParams } from 'react-router-dom';

export default function Councils() {
  const [searchParams] = useSearchParams();
  return (
    <>
      <CouncilTabs activeCouncil={searchParams.get('active') as Council['slug']} />
      <PassedElectionAccordion activeCouncil={councils[0]} />
      <UserProfileCard walletAddress="0x" />
    </>
  );
}
