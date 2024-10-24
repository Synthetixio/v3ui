import { Flex, Show, useColorMode } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SNXHeaderIcon, SNXHeaderIconSmall } from '../Icons';

export function Header() {
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    if (colorMode === 'light') {
      toggleColorMode();
    }
  }, [colorMode, toggleColorMode]);

  return (
    <Flex
      as="header"
      bg="navy.700"
      h="65px"
      alignItems="center"
      px={{ base: '4', md: 6 }}
      py={{ base: '4' }}
      borderBottomWidth="1px"
      borderStyle="solid"
      borderBottomColor="gray.900"
      justifyContent="center"
    >
      <Flex maxW="1440px" w="100%" alignItems="center">
        <Flex cursor="pointer" onClick={() => navigate('/')} mr="auto" alignItems="center">
          <SNXHeaderIconSmall />
          <Show above="md">
            <SNXHeaderIcon />
          </Show>
        </Flex>
      </Flex>
    </Flex>
  );
}
