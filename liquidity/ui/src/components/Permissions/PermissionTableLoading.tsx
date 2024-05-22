import { Skeleton, Td, Text, Tr } from '@chakra-ui/react';
import { prettyString } from '@snx-v3/format';
import { ethers } from 'ethers';

export function PermissionTableLoading() {
  const rows = Array.from({ length: 2 }, (_, i) => i);
  return (
    <>
      {rows.map((row) => {
        return (
          <Tr borderBottomWidth={row === 1 ? 'none' : '1px'} key={row}>
            <Td borderBottomColor="gray.900" py="4" width="200px">
              <Skeleton>
                <Text fontWeight={400} color="white" fontSize="16px">
                  {prettyString(ethers.constants.AddressZero)}{' '}
                </Text>
              </Skeleton>
            </Td>
            <Td borderBottomColor="gray.900" py="4">
              <Skeleton>-</Skeleton>
            </Td>
            <Td borderBottomColor="gray.900" py="4">
              <Skeleton>-</Skeleton>
            </Td>
          </Tr>
        );
      })}
    </>
  );
}
