import { Flex, Spinner, Text, FlexProps } from '@chakra-ui/react';
import './UserProfileCard.css';
import useGetUserDetailsQuery from '../../queries/useGetUserDetailsQuery';
import { useGetIsNominated } from '../../queries/useGetIsNominated';
import { useGetCurrentPeriod } from '../../queries/useGetCurrentPeriod';
import { CouncilSlugs } from '../../utils/councils';
import { UserProfileDetails } from './UserProfileDetails';

interface UserProfileCardInterface extends FlexProps {
  walletAddress: string;
  activeCouncil: CouncilSlugs;
  isOwn?: boolean;
}

export function UserProfileCard({
  walletAddress,
  activeCouncil,
  isOwn,
  ...props
}: UserProfileCardInterface) {
  const {
    data: userData,
    error,
    isLoading: useDataLoading,
  } = useGetUserDetailsQuery(walletAddress);
  const { data: councilPeriod, isLoading: councilPeriodLoading } =
    useGetCurrentPeriod(activeCouncil);
  const { data: isNominated, isLoading: isNominatedLoading } = useGetIsNominated(
    isOwn ? walletAddress : ''
  );

  const isLoading = useDataLoading || councilPeriodLoading || isNominatedLoading;

  return (
    <Flex
      flexDir="column"
      bg="navy.700"
      borderRadius="base"
      borderStyle="solid"
      borderColor="cyan.500"
      borderWidth="1px"
      p="4"
      w="100%"
      maxW="483px"
      h="612px"
      {...props}
    >
      {error && <Text>{error.message}</Text>}
      {isLoading ? (
        <Spinner colorScheme="cyan" />
      ) : (
        <UserProfileDetails
          activeCouncil={activeCouncil}
          councilPeriod={councilPeriod}
          walletAddress={walletAddress}
          isOwn={isOwn}
          isNominated={isNominated}
          userData={userData}
        />
      )}
    </Flex>
  );
}
