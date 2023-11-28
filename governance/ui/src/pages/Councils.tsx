import { Flex } from '@chakra-ui/react';
import CouncilTabs from '../components/CouncilTabs/CouncilTabs';
import councils, { CouncilSlugs } from '../utils/councils';
import { useSearchParams } from 'react-router-dom';
import UserActionBox from '../components/UserActionBox/UserActionBox';
import CouncilInformation from '../components/CouncilInformation/CouncilInformation';
import { useGetCurrentPeriod } from '../queries/useGetCurrentPeriod';
import CouncilNominees from '../components/CouncilNominees/CouncilNominees';

export default function Councils() {
  const [searchParams] = useSearchParams();
  const { data: councilPeriod } = useGetCurrentPeriod(searchParams.get('active') as CouncilSlugs);

  return (
    <Flex flexDirection="column" alignItems="center">
      <CouncilTabs activeCouncil={searchParams.get('active') as CouncilSlugs} />
      <Flex>
        <Flex flexDir="column" maxW="735px" mr={{ base: 0, md: '4' }} w="100%" px={{ base: 4 }}>
          <CouncilInformation activeCouncil={searchParams.get('active') as CouncilSlugs} />
          {(councilPeriod === '1' || councilPeriod === '2') && (
            <CouncilNominees activeCouncil={searchParams.get('active') as CouncilSlugs} />
          )}
          {/* <PassedElectionAccordion
            activeCouncil={councils.find(
              (council) => council.slug === (searchParams.get('active') as CouncilSlugs)
            )}
          /> */}
        </Flex>

        <UserActionBox
          editNomination={searchParams.get('editNomination') === 'true' ? true : false}
          nominate={searchParams.get('nominate') === 'true' ? true : false}
          selectedUserAddress={searchParams.get('view') as string}
          activeCouncil={searchParams.get('active') as CouncilSlugs}
          editProfile={searchParams.get('editProfile') === 'true' ? true : false}
        />
      </Flex>
    </Flex>
  );
}
