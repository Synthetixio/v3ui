import { Button, Flex, FlexProps, Heading } from '@chakra-ui/react';
import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';

export const MigrateBanner: FC<FlexProps> = (props) => {
  const [, setSearchParams] = useSearchParams();
  return (
    <Flex
      mt={4}
      flexGrow="1"
      h="fit-content"
      border="1px solid"
      borderColor="gray.900"
      rounded="base"
      width="100%"
      px="6"
      py="8"
      bg="navy.700"
      alignItems="center"
      justifyContent="space-between"
      {...props}
    >
      <Heading fontSize="18px">Migrating from Synthetix V2x?</Heading>
      <Button onClick={() => setSearchParams({ v2xmigrate: 'true' })}>Migrate to V3</Button>
    </Flex>
  );

  return null;
};
