import { Button, Flex, Image, Td, Text, Tr } from '@chakra-ui/react';
import { prettyString } from '@snx-v3/format';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CouncilSlugs } from '../../utils/councils';
import { renderCorrectBorder } from '../../utils/table-border';
import { ProfilePicture } from '../UserProfileCard/ProfilePicture';

export function MemberTableView({
  name,
  activeCouncil,
  place,
  address,
  image,
}: {
  place?: string;
  name: string;
  activeCouncil: CouncilSlugs;
  address: string;
  image: string;
}) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isSelected = searchParams.get('view') === address;

  return (
    <Tr
      cursor="pointer"
      onClick={() => navigate(`/councils/${activeCouncil}?view=${address}`)}
      _hover={{ background: 'rgba(255,255,255,0.12)' }}
    >
      <Td
        borderTop="1px solid"
        borderLeft={renderCorrectBorder('place', 'left', isSelected)}
        borderBottom={renderCorrectBorder('place', 'bottom', isSelected)}
        borderColor={isSelected ? 'cyan.500' : 'gray.900'}
        borderLeftRadius={isSelected ? 'base' : ''}
      >
        <Text color="white" fontSize="sm" fontWeight={700}>
          {place}
        </Text>
      </Td>
      <Td
        color="white"
        textTransform="unset"
        px="3"
        borderTop="1px solid"
        borderBottom={renderCorrectBorder('name', 'bottom', isSelected)}
        borderColor={isSelected ? 'cyan.500' : 'gray.900'}
      >
        <Flex gap="2" alignItems="center">
          {image ? (
            <Image src={image} w="9" h="9" />
          ) : (
            <ProfilePicture address={address} size={9} mr="0" />
          )}

          <Text
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
            maxW="200px"
            data-cy={`user-table-view-${address}`}
            fontSize="sm"
            fontWeight={700}
          >
            {name ? name : prettyString(address)}
          </Text>
        </Flex>
      </Td>

      <Td
        textAlign="end"
        borderTop="1px solid"
        borderBottom={isSelected ? '1px solid' : ''}
        borderRight={isSelected ? '1px solid' : ''}
        borderRightRadius={isSelected ? 'base' : ''}
        borderColor={isSelected ? 'cyan.500' : 'gray.900'}
        fontSize="sm"
        fontWeight={700}
      >
        <Button
          size="xs"
          colorScheme="gray"
          variant="outline"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/councils/${activeCouncil}?view=${address}`);
          }}
          color="white"
          rounded="base"
          data-cy={`user-table-view-button-${address}`}
        >
          View
        </Button>
      </Td>
    </Tr>
  );
}
