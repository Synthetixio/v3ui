import { Flex, Td, Tr, Text, Button } from '@chakra-ui/react';
import { CollateralIcon } from '@snx-v3/icons';

interface RewardsRowInterface {
  collateralType: string;
  amount: number;
  frequency: string;
  earnings: number;
  lifetimeEarned: number;
  hasClaimed: boolean;
}

export const RewardsRow = ({
  collateralType,
  amount,
  frequency,
  earnings,
  lifetimeEarned,
  hasClaimed,
}: RewardsRowInterface) => {
  return (
    <Tr borderBottom="1px solid #2D2D38">
      <Td as={Flex} alignItems="center" px="14px" border="none" w="100%">
        <CollateralIcon height="30px" width="30px" symbol={collateralType} />
        <Flex flexDirection="column" ml="12px">
          <Text
            color="gray.50"
            fontSize="14px"
            fontFamily="heading"
            fontWeight={500}
            lineHeight="20px"
          >
            {amount}
            {` ${collateralType}`}
          </Text>
          <Text color="gray.500" fontSize="12px" fontFamily="heading" lineHeight="16px">
            {frequency}
          </Text>
        </Flex>
      </Td>
      <Td alignItems="center" px="14px" border="none">
        <Text
          color="gray.50"
          fontSize="14px"
          fontFamily="heading"
          fontWeight={500}
          lineHeight="20px"
        >
          {earnings}
          {` ${collateralType}`}
        </Text>
        <Text
          color="gray.500"
          fontSize="12px"
          fontFamily="heading"
          lineHeight="16px"
        >{`Lifetime ${lifetimeEarned} ${collateralType}`}</Text>
      </Td>
      <Td border="none" px="0px">
        <Button w="100%" disabled={hasClaimed}>
          {hasClaimed ? 'Claimed' : 'Claim'}
        </Button>
      </Td>
    </Tr>
  );
};
