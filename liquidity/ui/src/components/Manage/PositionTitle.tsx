import { Flex, Heading } from '@chakra-ui/react';
import { FC } from 'react';
import { useCollateralDisplayName } from '../../pages';
import { NetworkIcon, useNetwork } from '@snx-v3/useBlockchain';
import { TokenIcon } from '../TokenIcon';

export const PositionTitle: FC<{
  collateralSymbol?: string;
  poolName?: string;
  isOpen?: boolean;
}> = ({ collateralSymbol, poolName, isOpen }) => {
  const collateralDisplayName = useCollateralDisplayName(collateralSymbol);
  const { network } = useNetwork();

  return (
    <Flex alignItems="center">
      <Flex
        bg="linear-gradient(180deg, #08021E 0%, #1F0777 100%)"
        height="34px"
        width="34px"
        justifyContent="center"
        alignItems="center"
        borderRadius="100%"
        display="flex"
      >
        <TokenIcon
          symbol={collateralSymbol?.toUpperCase() || ''}
          width={42}
          height={42}
          fill="#0B0B22"
          color="#00D1FF"
        />
      </Flex>
      <Flex direction="column" gap={0.5}>
        <Heading
          ml={4}
          fontWeight={700}
          fontSize="24px"
          color="gray.50"
          display="flex"
          alignItems="center"
          data-cy="manage-position-title"
        >
          {isOpen ? 'Open ' : ''} {collateralDisplayName} Liquidity Position
        </Heading>
        <Heading
          ml={4}
          fontWeight={700}
          fontSize="16px"
          color="gray.50"
          display="flex"
          alignItems="center"
          data-cy="manage-position-subtitle"
        >
          {poolName}
          <Flex
            ml={2}
            alignItems="center"
            fontSize="12px"
            color="gray.500"
            gap={1}
            fontWeight="bold"
          >
            <NetworkIcon size="14px" networkId={network?.id} />
            {network?.label} Network
          </Flex>
        </Heading>
      </Flex>
    </Flex>
  );
};
