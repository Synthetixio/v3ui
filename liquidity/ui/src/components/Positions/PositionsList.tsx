import { Heading, Flex } from '@chakra-ui/react';
import { PositionsTable } from './PositionsTable';
import { useLiquidityPositions } from '@snx-v3/useLiquidityPositions';
import { calculatePositions } from '../../utils/positions';
import { useParams } from '@snx-v3/useParams';
import { useApr } from '@snx-v3/useApr';
import { isBaseAndromeda } from '@snx-v3/isBaseAndromeda';
import { useNetwork } from '@snx-v3/useBlockchain';
import { useSystemToken } from '@snx-v3/useSystemToken';

export const PositionsList = () => {
  const { accountId } = useParams();
  const { network } = useNetwork();

  const { data: positionsByKey, isLoading: isLiquidityPositionsLoading } = useLiquidityPositions({
    accountId,
  });
  const { data: apr } = useApr();
  const { data: systemToken, isLoading: isSystemTokenLoading } = useSystemToken();

  const isBase = isBaseAndromeda(network?.id, network?.preset);
  const positions = calculatePositions(positionsByKey, isBase);
  const parsedPositions = positions.filter((position) => position.collateralAmount.gt(0));

  const isLoading = isLiquidityPositionsLoading || isSystemTokenLoading;

  return (
    <Flex flexDir="column">
      <Heading fontSize="1.25rem" fontFamily="heading" lineHeight="1.75rem" mt={4}>
        Positions
      </Heading>
      <PositionsTable
        isLoading={isLoading}
        positions={parsedPositions}
        apr={apr?.combinedApr}
        systemToken={systemToken}
      />
    </Flex>
  );
};
