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
          <MenuButton as={Flex} py={2} px={3}>
            <Flex
              flexDirection="row"
              justifyContent="space-between"
              height="40px"
              width="100%"
              bg="navy.700"
              borderWidth="1px"
              px="12px"
              borderRadius="3px"
              borderColor="gray.900"
              alignItems="center"
            >
              <CouncilImage imageUrl={slugToImageUrl(activeCouncil)} mr="10px" />
              <Text
                fontFamily="heading"
                fontSize="18px"
                lineHeight="28px"
                fontWeight={700}
                mr="12px"
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
              mt="12px"
              w="100%"
              h="100%"
            >
              {councils.map((council) => (
                <MenuItem
                  key={council.address}
                  value={council.slug}
                  onClick={() => navigate(`/councils/${council.slug}`)}
                  bg="navy.700"
                >
                  <Flex
                    py="10px"
                    px="12px"
                    bg="navy.700"
                    alignItems="space-between"
                    w="100%"
                    h="100%"
                  >
                    <CouncilImage imageUrl={council.image} />
                    <Text
                      fontFamily="heading"
                      fontSize="18px"
                      lineHeight="28px"
                      fontWeight={700}
                      mr="12px"
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
