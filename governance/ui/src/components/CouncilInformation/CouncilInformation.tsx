import { Flex, Heading, Icon, Text } from '@chakra-ui/react';
import councils, { CouncilSlugs } from '../../utils/councils';
import { CouncilImage } from '../CouncilImage';
import { Link } from 'react-router-dom';

export default function CouncilInformation({ activeCouncil }: { activeCouncil: CouncilSlugs }) {
  const council = councils.find((council) => council.slug === activeCouncil);

  return (
    <Flex
      py="5"
      maxW={{ base: '100%', xl: '735px' }}
      w="100%"
      flexDirection={{ base: 'column', md: 'row' }}
    >
      <Flex>
        <CouncilImage
          imageUrl={council?.image || ''}
          width="130px"
          height="130px"
          imageProps={{ w: '108px', h: '108px' }}
        />
      </Flex>
      <Flex
        width={{ base: '100%' }}
        flexDir="column"
        ml={{ base: 'unset', md: '24px' }}
        mt={{ base: '24px', md: 'unset' }}
      >
        <Heading fontSize="lg" mb="2">
          {council?.title}
        </Heading>
        <Text w="100%" fontSize="14px" lineHeight="20px" fontFamily="heading" color="gray.500">
          {council?.description}
        </Text>
        <Flex w="100%" mt="2" gap="2" data-cy={`council-information-${activeCouncil}`}>
          <Heading
            fontSize="xs"
            lineHeight="1rem"
            border="1px solid"
            borderColor="gray.900"
            rounded="base"
            px="2"
            py="1"
          >
            Council Seats: {council?.seats}
          </Heading>
          <Heading
            fontSize="xs"
            lineHeight="1rem"
            border="1px solid"
            borderColor="gray.900"
            rounded="base"
            px="2"
            py="1"
          >
            Stipends: {council?.stipends}/month
          </Heading>
          <Heading
            fontSize="xs"
            lineHeight="1rem"
            border="1px solid"
            borderColor="gray.900"
            rounded="base"
            px="2"
            py="1"
          >
            <Link to={council?.docLink || ''} target="_blank" rel="noopener noreferrer">
              Learn more{' '}
              <Icon width="12px" height="12px" viewBox="0 0 12 12" fill="none">
                <g clipPath="url(#clip0_7624_75578)">
                  <path
                    d="M7.78233 3.83246L3.98941 3.83246L3.98941 2.83261L9.48928 2.83262L9.48929 8.33249L8.48944 8.33249L8.48944 4.53957L3.52888 9.70711L2.82178 9L7.78233 3.83246Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_7624_75578">
                    <rect width="12" height="12" fill="white" />
                  </clipPath>
                </defs>
              </Icon>
            </Link>
          </Heading>
        </Flex>
      </Flex>
    </Flex>
  );
}
