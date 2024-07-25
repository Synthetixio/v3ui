import { Flex, Heading } from '@chakra-ui/react';
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
      <Flex
        bg="linear-gradient(180deg, #08021E 0%, #1F0777 100%)"
        justifyContent="center"
        alignItems="center"
        borderRadius="100%"
        display="flex"
      >
        <TokenIcon
          symbol={collateralSymbol || ''}
          height={42}
          width={42}
          fill="#0B0B22"
          color="#00D1FF"
        />
      </Flex>
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
          {poolName}
          <Flex
            alignItems="normal"
            fontSize={['10px', '12px']}
            color="gray.500"
            gap={1}
            fontWeight="500"
          >
            <NetworkIcon size="14px" networkId={network?.id} />
            {network?.label} Network
          </Flex>
        </Heading>
      </Flex>
    </Flex>
  );
};
