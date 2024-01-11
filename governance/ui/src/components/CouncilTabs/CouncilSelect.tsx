import { Button, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import councils, { CouncilSlugs } from '../../utils/councils';
import { useNavigate } from 'react-router-dom';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';

export const CouncilsSelect = ({ activeCouncil }: { activeCouncil: CouncilSlugs }) => {
  const navigate = useNavigate();
  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton
            w="248px"
            isActive={isOpen}
            as={Button}
            variant="unstyled"
            bg=""
            rightIcon={isOpen ? <ChevronDownIcon /> : <ChevronUpIcon />}
          >
            {slugToName(activeCouncil)}
          </MenuButton>
          <MenuList>
            {councils.map((council) => (
              <MenuItem
                key={council.address}
                value={council.slug}
                onClick={() => navigate(`/councils/${council.slug}`)}
              >
                <Text>{council.title}</Text>
              </MenuItem>
            ))}
          </MenuList>
        </>
      )}
    </Menu>
  );
};

function slugToName(slug: CouncilSlugs) {
  return councils.find((council) => council.slug === slug)?.title;
}
