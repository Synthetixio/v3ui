import { Flex } from '@chakra-ui/react';
import CouncilTabs from '../components/CouncilTabs/CouncilTabs';
import { PassedElectionAccordion } from '../components/PassedElectionAccordion';
import councils, { CouncilSlugs } from '../utils/councils';
import { useSearchParams } from 'react-router-dom';
import UserActionBox from '../components/UserActionBox/UserActionBox';
import CouncilInformation from '../components/CouncilInformation/CouncilInformation';

export default function Councils() {
  const [searchParams] = useSearchParams();
  return (
    <>
      <CouncilTabs activeCouncil={searchParams.get('active') as CouncilSlugs} />
      <Flex>
        <Flex flexDir="column" w="735px">
          <CouncilInformation activeCouncil={searchParams.get('active') as CouncilSlugs} />
        </Flex>

        <UserActionBox
          nominationModalIsOpen={searchParams.get('nominateModal') === 'true' ? true : false}
          activeCouncil={searchParams.get('active') as CouncilSlugs}
        />
      </Flex>
      <PassedElectionAccordion activeCouncil={councils[0]} />
    </>
  );
}
