import { Box, Flex } from '@chakra-ui/react';
import CouncilTabs from '../components/CouncilTabs/CouncilTabs';
import { CouncilSlugs } from '../utils/councils';
import { useParams, useSearchParams } from 'react-router-dom';
import UserActionBox from '../components/UserActionBox/UserActionBox';
import CouncilInformation from '../components/CouncilInformation/CouncilInformation';
import { useGetCurrentPeriod } from '../queries/useGetCurrentPeriod';
import CouncilNominees from '../components/CouncilNominees/CouncilNominees';

export default function Councils() {
  const [searchParams] = useSearchParams();
  const { council } = useParams();
  const activeCouncil = council as CouncilSlugs;
  const { data: councilPeriod } = useGetCurrentPeriod(activeCouncil);

  return (
    <Flex flexDirection="column" alignItems="center">
      <CouncilTabs activeCouncil={activeCouncil} />
      <Flex maxW="1440px" justifyContent="flex-start" w="100%" gap={{ base: 0, md: '4' }}>
        <CouncilInformation activeCouncil={activeCouncil} />
      </Flex>
      <Flex maxW="1440px" w="100%" justifyContent="space-between" gap={{ base: 0, md: '4' }}>
        <Flex flexDir="column" maxW="735px" w="100%" px={{ base: 4, md: 2 }}>
          {(councilPeriod === '1' || councilPeriod === '2') && (
            <CouncilNominees activeCouncil={activeCouncil} />
          )}
          {/* <PassedElectionAccordion
            activeCouncil={councils.find(
              (council) => council.slug === (activeCouncil)
            )}
          /> */}
        </Flex>
        <Box
          position={{ md: 'sticky' }}
          top="100px"
          height={{ md: '644px' }}
          width={{ md: '483px' }}
          mr="4"
        >
          <UserActionBox
            editNomination={searchParams.get('editNomination') === 'true' ? true : false}
            nominate={searchParams.get('nominate') === 'true' ? true : false}
            selectedUserAddress={searchParams.get('view') as string}
            activeCouncil={activeCouncil}
            editProfile={searchParams.get('editProfile') === 'true' ? true : false}
          />
        </Box>
      </Flex>
    </Flex>
  );
}
