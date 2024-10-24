import { Flex, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import councils, { CouncilSlugs } from '../../utils/councils';
import { useNavigate } from 'react-router-dom';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { CouncilImage } from '../CouncilImage';

export const CouncilsSelect = ({ activeCouncil }: { activeCouncil: CouncilSlugs }) => {
  const navigate = useNavigate();
  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton w="100%" minW="240px" maxW={{ base: '278px', lg: '350px' }}>
            <Flex
              flexDirection="row"
              justifyContent="space-between"
              height="48px"
              bg="navy.700"
              borderWidth="1px"
              px="12px"
              borderRadius="3px"
              borderColor="gray.900"
              alignItems="center"
              data-cy="menu-button-flex-council-select"
              w="100%"
            >
              <CouncilImage imageUrl={slugToImageUrl(activeCouncil)} mr="10px" />
              <Text
                fontFamily="heading"
                fontSize={{ base: 'xs', md: 'md' }}
                lineHeight="28px"
                fontWeight={700}
                mr="12px"
                data-cy="council-select-mobile"
              >
                {slugToName(activeCouncil)}
              </Text>
              <Flex alignItems="center" height="100%">
                {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
              </Flex>
            </Flex>
          </MenuButton>
          <MenuList>
            <Flex
              bg="navy.700"
              borderWidth="1px"
              borderRadius="3px"
              borderColor="gray.900"
              flexDir="column"
              mt="3"
              w="100%"
              h="100%"
            >
              {councils.map((council) => (
                <MenuItem
                  key={council.slug}
                  value={council.slug}
                  onClick={() => navigate(`/councils/${council.slug}`)}
                >
                  <Flex py="10px" px="12px" alignItems="space-between" w="100%" h="100%">
                    <CouncilImage imageUrl={council.image} bg="none" />
                    <Text
                      fontFamily="heading"
                      fontSize={{ base: 'sm', md: 'medium' }}
                      lineHeight="28px"
                      fontWeight={700}
                      mr="14px"
                      mt="2px"
                    >
                      {council.title}
                    </Text>
                  </Flex>
                </MenuItem>
              ))}
            </Flex>
          </MenuList>
        </>
      )}
    </Menu>
  );
};

function slugToName(slug: CouncilSlugs) {
  return councils.find((council) => council.slug === slug)?.title;
}

function slugToImageUrl(slug: CouncilSlugs) {
  return councils.find((council) => council.slug === slug)?.image || '';
}
