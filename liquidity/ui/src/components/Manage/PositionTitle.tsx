import { Flex, Heading, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { useCollateralDisplayName } from '../../pages';
import { NetworkIcon, useNetwork } from '@snx-v3/useBlockchain';
import { useNavigate } from 'react-router-dom';
import { TokenIcon } from '../TokenIcon';

export const PositionTitle: FC<{
  collateralSymbol?: string;
  poolName?: string;
  isOpen?: boolean;
  poolId?: string;
}> = ({ collateralSymbol, poolName, isOpen, poolId }) => {
  const collateralDisplayName = useCollateralDisplayName(collateralSymbol);
  const { network } = useNetwork();
  const navigate = useNavigate();

  return (
    <Flex alignItems="center">
      <TokenIcon
        symbol={collateralDisplayName || ''}
        height={42}
        width={42}
        fill="#0B0B22"
        color="#00D1FF"
      />
      <Flex direction="column" gap={0.5}>
        <Heading
          ml={4}
          fontWeight={700}
          fontSize={['18px', '20px', '24px']}
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
          fontSize={['12px', '16px']}
          color="gray.50"
          display="flex"
          alignItems="center"
          data-cy="manage-position-subtitle"
          _hover={{ cursor: 'pointer' }}
          onClick={() => navigate(`/pools/${network?.id}/${poolId}`)}
        >
          {poolName && <Text mr={2}>{poolName}</Text>}
          <Flex
            mt={0.25}
            alignItems="center"
            fontSize={['10px', '12px']}
            color="gray.500"
            fontWeight="500"
          >
            <NetworkIcon size="14px" networkId={network?.id} mr={1} />
            <Text mt={0.5}>{network?.label} Network</Text>
          </Flex>
        </Heading>
      </Flex>
    </Flex>
  );
};
