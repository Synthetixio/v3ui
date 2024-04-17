import { Badge, Button, Fade, Flex, Td, Text, Tr } from '@chakra-ui/react';
import { TokenIcon } from '../../TokenIcon';
import { LiquidityPositionType } from '@snx-v3/useLiquidityPositions';
import { useLiquidityPosition } from '@snx-v3/useLiquidityPosition';
import { useLocation, useNavigate } from 'react-router-dom';

interface PositionRow extends LiquidityPositionType {
  final: boolean;
}
[];

export function PositionRow({ accountId, poolId, collateralType, debt, final }: PositionRow) {
  const navigate = useNavigate();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const { data: liquidityPosition } = useLiquidityPosition({
    tokenAddress: collateralType.tokenAddress,
    accountId,
    poolId,
  });

  return (
    <Tr borderBottomWidth={final ? 'none' : '1px'}>
      <Td border="none">
        <Fade in>
          <Flex alignItems="center">
            <TokenIcon symbol={collateralType.symbol} />
            <Flex flexDirection="column" ml={3}>
              <Text color="white" fontWeight={700} lineHeight="1.25rem" fontFamily="heading">
                {collateralType.displaySymbol}
              </Text>
              <Text color="gray.500" fontFamily="heading" fontSize="0.75rem" lineHeight="1rem">
                {collateralType.symbol}
              </Text>
            </Flex>
          </Flex>
        </Fade>
      </Td>
      <Td border="none">
        <Fade in>
          <Flex flexDirection="column" alignItems="flex-end">
            <Text color="white" fontWeight={700} lineHeight="1.25rem" fontFamily="heading">
              {liquidityPosition?.collateralAmount.toNumber().toLocaleString()}
            </Text>
            <Text color="gray.500" fontFamily="heading" fontSize="0.75rem" lineHeight="1rem">
              {/* {delegated.toNumber()} */}
              {collateralType.symbol.toString()}
            </Text>
          </Flex>
        </Fade>
      </Td>
      <Td border="none">
        <Fade in>
          <Flex flexDirection="column" alignItems="flex-end">
            <Text color="white" fontWeight={700} lineHeight="1.25rem" fontFamily="heading">
              TODO%
            </Text>
          </Flex>
        </Fade>
      </Td>
      <Td border="none">
        <Fade in>
          <Flex flexDirection="column" alignItems="flex-end">
            <Text color="white" fontWeight={700} lineHeight="1.25rem" fontFamily="heading">
              ${liquidityPosition?.debt.toNumber().toLocaleString()}
            </Text>
            <Text color="gray.500" fontFamily="heading" fontSize="0.75rem" lineHeight="1rem">
              {liquidityPosition?.debt.toNumber().toLocaleString()}
            </Text>
          </Flex>
        </Fade>
      </Td>
      <Td border="none">
        <Fade in>
          <Flex flexDirection="column" alignItems="flex-end">
            <Text color="white" fontWeight={700} lineHeight="1.25rem" fontFamily="heading">
              {/* {borrowed$.eq(0) ? 'N/A' : `$${borrowed$.toNumber().toLocaleString()}`} */}
            </Text>
            <Text color="gray.500" fontFamily="heading" fontSize="0.75rem" lineHeight="1rem">
              {/* {borrowed.toNumber()} {token} */}
            </Text>
          </Flex>
        </Fade>
      </Td>
      <Td border="none">
        <Fade in>
          <Flex flexDirection="column" alignItems="flex-end">
            <Text color="white" fontWeight={700} lineHeight="1.25rem" fontFamily="heading">
              ${debt.toNumber().toLocaleString()}
            </Text>
            <Text color="cyan.500" fontFamily="heading" fontSize="0.75rem" lineHeight="1rem">
              {debt.gt(0) ? 'Repay Debt' : 'Claim Credit'}
            </Text>
          </Flex>
        </Fade>
      </Td>
      <Td border="none">
        <Fade in>
          <Flex flexDirection="column" alignItems="flex-end">
            <Text color="white" fontWeight={700} lineHeight="1.25rem" fontFamily="heading">
              {/* {cRatio === Infinity ? 'Infinite' : cRatio}% */}
            </Text>
            <Badge colorScheme="green" border="1px solid" bg="green.900">
              HEALTHY
            </Badge>
          </Flex>
        </Fade>
      </Td>
      <Td border="none">
        <Flex flexDirection="column">
          <Button
            fontSize="0.75rem"
            lineHeight="1rem"
            height="1.75rem"
            fontWeight={700}
            borderWidth="1px"
            borderColor="gray.900"
            borderRadius="4px"
            onClick={() => {
              queryParams.set('tab', '0');
              queryParams.set('tabAction', 'deposit');
              queryParams.set('step', 'deposit');
              navigate({
                pathname: `/manage/${collateralType.symbol}/${collateralType.tokenAddress}/${poolId}`,
                search: queryParams.toString(),
              });
            }}
            data-cy="manage-position-row-button"
          >
            Manage
          </Button>
        </Flex>
      </Td>
    </Tr>
  );
}
