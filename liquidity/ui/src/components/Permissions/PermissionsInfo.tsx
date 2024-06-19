/* eslint-disable react/no-unescaped-entities */
import { Text, Tooltip } from '@chakra-ui/react';
import { InfoIcon } from '@chakra-ui/icons';

export default function PermissionsInfo() {
  return (
    <Tooltip
      label={
        <>
          <Text fontWeight={600} textAlign="left">
            ADMIN: Full control over the account, except for transferring ownership <br />
            WITHDRAW: Ability to withdraw collateral from the account
            <br />
            REWARDS: Ability to claim rewards on behalf of the account
            <br />
            MINT: Ability to mint snxUSD using the account's collateral
            <br />
            DELEGATE: Ability to delegate the account's collateral to pools
          </Text>
        </>
      }
    >
      <InfoIcon ml={1.5} w="10px" h="10px" />
    </Tooltip>
  );
}
