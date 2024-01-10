import { Flex } from '@chakra-ui/react';
import CouncilTabs from '../components/CouncilTabs/CouncilTabs';
import { CouncilSlugs } from '../utils/councils';
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
      <Flex maxW="1440px" w="100%" justifyContent="center" gap={{ base: 0, md: '4' }}>
        <Flex flexDir="column" maxW="735px" w="100%" px={{ base: 4, md: 2 }}>
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
