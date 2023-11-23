import { Flex } from '@chakra-ui/react';
import CouncilTabs from '../components/CouncilTabs/CouncilTabs';
import { CouncilSlugs } from '../utils/councils';
import { useSearchParams } from 'react-router-dom';
import UserActionBox from '../components/UserActionBox/UserActionBox';
import CouncilInformation from '../components/CouncilInformation/CouncilInformation';
import { useGetCurrentPeriod } from '../queries/useGetCurrentPeriod';
import CouncilNominees from '../components/CouncilNominees/CouncilNominees';
import { PassedElectionAccordion } from '../components/PassedElectionAccordion';

export default function Councils() {
  const [searchParams] = useSearchParams();
  const { data: councilPeriod } = useGetCurrentPeriod(searchParams.get('active') as CouncilSlugs);

  return (
    <Flex flexDirection="column" alignItems="center">
      <CouncilTabs activeCouncil={searchParams.get('active') as CouncilSlugs} />
      <Flex>
        <Flex flexDir="column" w="735px" mr="4">
          <CouncilInformation activeCouncil={searchParams.get('active') as CouncilSlugs} />
          {councilPeriod === '1' && (
            <CouncilNominees activeCouncil={searchParams.get('active') as CouncilSlugs} />
          )}
          <PassedElectionAccordion activeCouncil={searchParams.get('active') as CouncilSlugs} />
        </Flex>
        <UserActionBox
          editNominationModalIsOpen={searchParams.get('editNomination') === 'true' ? true : false}
          nominationModalIsOpen={searchParams.get('nominateModal') === 'true' ? true : false}
          selectedUserAddress={searchParams.get('view') as string}
          activeCouncil={searchParams.get('active') as CouncilSlugs}
          editProfile={searchParams.get('editProfile') === 'true' ? true : false}
        />
      </Flex>
    </Flex>
  );
}
