import { Flex, Heading, Image, Text } from '@chakra-ui/react';
import { Council } from '../../utils/councils';
import { User } from '../../utils/types';
import { prettyString } from '@snx-v3/format';

function renderText(action: 'nominate' | 'edit') {
  switch (action) {
    case 'nominate': {
      return {
        header: 'Nominate Self',
        subline:
          'Nominate yourself to represent one of the Synthetix Governing Bodies. Your will be nominating the wallet below:',
      };
    }
    case 'edit': {
      return {
        header: 'Edit Nomination',
        subline:
          'Nominate yourself to represent one of the Synthetix Governing Bodies. Your will be nominating the wallet below:',
      };
    }
  }
}

export function NominateSelf({
  activeCouncil,
  action,
  user,
}: {
  activeCouncil: Council;
  action: 'nominate' | 'edit';
  user: User;
}) {
  return (
    <Flex flexDir="column">
      <Heading color="whiteAlpha.900" fontSize="20px" lineHeight="24px">
        {renderText(action).header}
      </Heading>
      <Text fontSize="14px" fontWeight={400} color="gray.600">
        {renderText(action).subline}
      </Text>
      <Flex>
        <Flex
          borderColor="gray.900"
          borderWidth="1px"
          borderStyle="solid"
          borderRadius="base"
          alignItems="center"
          mr="2"
        >
          <Image src={user.pfpUrl} alt="Users Avatar" w="40px" h="40px" />
          <Heading fontSize="14px" lineHeight="20px" fontWeight={700}>
            {user.username}
          </Heading>
        </Flex>
        <Flex
          flexDir="column"
          borderColor="gray.900"
          borderWidth="1px"
          borderStyle="solid"
          borderRadius="base"
          alignItems="center"
        >
          <Text fontSize="12px" lineHeight="16px" color="gray.500">
            Nomination Wallet
          </Text>
          <Text color="whiteAlpha.800" fontSize="14px" lineHeight="20px">
            {prettyString(user.address)}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
