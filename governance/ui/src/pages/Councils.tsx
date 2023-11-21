import { Flex } from '@chakra-ui/react';
import CouncilTabs from '../components/CouncilTabs/CouncilTabs';
import { CouncilSlugs } from '../utils/councils';
import { useSearchParams } from 'react-router-dom';
import UserActionBox from '../components/UserActionBox/UserActionBox';
import CouncilInformation from '../components/CouncilInformation/CouncilInformation';
import { useGetCurrentPeriod } from '../queries/useGetCurrentPeriod';
import CouncilNominees from '../components/CouncilNominees/CouncilNominees';
import { PassedElectionAccordion } from '../components/PassedElectionAccordion';
import { useEffect, useState } from 'react';

export default function Councils() {
  const [searchParams] = useSearchParams();
  // const [params, setParams] = useState<{ view: string }>({ view: '' });
  const { data: councilPeriod } = useGetCurrentPeriod(searchParams.get('active') as CouncilSlugs);

  // useEffect(() => {
  //   setParams({ view: searchParams.get('view') as string });
  // }, [searchParams.get('view')]);

  // console.log(params);

  return (
    <>
      <CouncilTabs activeCouncil={searchParams.get('active') as CouncilSlugs} />
      <Flex>
        <Flex flexDir="column" w="735px">
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
    </>
  );
}
