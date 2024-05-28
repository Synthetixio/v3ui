import { CopyIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import { Flex, Tooltip } from '@chakra-ui/react';
import { etherscanLink } from '@snx-v3/etherscanLink';
import { prettyString } from '@snx-v3/format';
import { useNetwork } from '@snx-v3/useBlockchain';
import { FC, useMemo } from 'react';

interface AddressProps {
  address: string;
}

export const Address: FC<AddressProps> = ({ address }) => {
  const { network } = useNetwork();
  const link = useMemo(
    () =>
      etherscanLink({
        chain: network?.name || '',
        address,
      }),
    [address, network?.name]
  );
  return (
    <Flex alignItems="center" gap={2}>
      <Tooltip label={address}>{prettyString(address)}</Tooltip>
      <CopyIcon
        onClick={() => {
          navigator.clipboard.writeText(address);
        }}
        cursor="pointer"
        _hover={{
          color: 'cyan',
        }}
      />
      <a target="_blank" href={link} rel="noreferrer">
        <ExternalLinkIcon
          _hover={{
            color: 'cyan',
          }}
        />
      </a>
    </Flex>
  );
};
