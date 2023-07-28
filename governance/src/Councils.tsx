import { PassedElectionAccordion } from '../components/PassedElectionAccordion';
import councils from '../utils/councils';

export default function Councils() {
  return (
    <>
      <PassedElectionAccordion activeCouncil={councils[0]} />
    </>
  );
}
