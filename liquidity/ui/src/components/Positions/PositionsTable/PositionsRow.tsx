import { Badge, Button, Fade, Flex, Td, Text, Tr } from '@chakra-ui/react';
import { TokenIcon } from '../../TokenIcon';
import { LiquidityPositionType } from '@snx-v3/useLiquidityPositions';
import { useLiquidityPosition } from '@snx-v3/useLiquidityPosition';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGetBorrow } from '@snx-v3/useGetBorrow';
import { utils } from 'ethers';

interface PositionRow extends LiquidityPositionType {
  final: boolean;
  isBase: boolean;
  apr?: string;
}
[];

export function PositionRow({
  accountId,
  poolId,
  collateralType,
  debt,
  final,
  cRatio,
  isBase,
  apr,
}: PositionRow) {
  const [queryParams] = useSearchParams();
  const navigate = useNavigate();
  const { data: liquidityPosition } = useLiquidityPosition({
    tokenAddress: collateralType.tokenAddress,
    accountId,
    poolId,
  });
  const { data: borrow } = useGetBorrow({
    accountId,
    poolId,
    collateralTypeAddress: collateralType.tokenAddress,
  });

  const parsedCRatio = collateralType.issuanceRatioD18.gt(cRatio) ? 'MANAGE' : 'HEALTHY';
  return (
    <Tr borderBottomWidth={final ? 'none' : '1px'}>
      <Td border="none">
        <Fade in>
          <Flex alignItems="center">
            <TokenIcon symbol={collateralType.symbol} />
            <Flex flexDirection="column" ml={3}>
              <Text color="white" fontWeight={700} lineHeight="1.25rem" fontFamily="heading">
                {collateralType.symbol}
              </Text>
              <Text color="gray.500" fontFamily="heading" fontSize="0.75rem" lineHeight="1rem">
                {collateralType.displaySymbol}
              </Text>
            </Flex>
          </Flex>
        </Fade>
      </Td>
      <Td border="none">
        <Fade in>
          <Flex flexDirection="column" alignItems="flex-end">
            <Text color="white" lineHeight="1.25rem" fontFamily="heading">
              {liquidityPosition?.collateralAmount
                .toNumber()
                .toLocaleString('en-US', { maximumFractionDigits: 2 })}
            </Text>
            <Text
              color="gray.500"
              fontWeight={700}
              fontFamily="heading"
              fontSize="0.75rem"
              lineHeight="1rem"
            >
              {collateralType.symbol.toString()}
            </Text>
          </Flex>
        </Fade>
      </Td>
      <Td border="none">
        <Fade in>
          <Flex flexDirection="column" alignItems="flex-end">
            <Text color="white" lineHeight="1.25rem" fontFamily="heading">
              {apr?.concat('%') || '-'}
            </Text>
          </Flex>
        </Fade>
      </Td>
      {!isBase && (
        <>
          <Td border="none">
            <Fade in>
              <Flex flexDirection="column" alignItems="flex-end">
                <Text color="white" lineHeight="1.25rem" fontFamily="heading">
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
                <Text color="white" lineHeight="1.25rem" fontFamily="heading">
                  {parseFloat(
                    utils.formatEther(borrow?.position.net_issuance.toString() || '0')
                  ).toFixed(2)}
                </Text>
                <Text color="gray.500" fontFamily="heading" fontSize="0.75rem" lineHeight="1rem">
                  {parseFloat(
                    utils.formatEther(borrow?.position.net_issuance.toString() || '0')
                  ).toFixed(2)}{' '}
                  snxUSD
                </Text>
              </Flex>
            </Fade>
          </Td>
        </>
      )}
      <Td border="none">
        <Fade in>
          <Flex flexDirection="column" alignItems="flex-end">
            <Text color="white" lineHeight="1.25rem" fontFamily="heading">
              ${debt.toNumber().toLocaleString('en-US', { maximumFractionDigits: 2 })}
            </Text>
            <Text
              color="cyan.500"
              fontFamily="heading"
              fontSize="0.75rem"
              lineHeight="1rem"
              cursor="pointer"
              onClick={() => {
                queryParams.set('manageAction', debt.gt(0) ? 'deposit' : 'repay');
                navigate({
                  pathname: `/positions/${collateralType.symbol}/${poolId}`,
                  search: queryParams.toString(),
                });
              }}
            >
              {debt.gt(0) ? 'Repay Debt' : 'Claim Credit'}
            </Text>
          </Flex>
        </Fade>
      </Td>
      {!isBase && (
        <Td border="none">
          <Fade in>
            <Flex flexDirection="column" alignItems="flex-end">
              <Text color="white" fontWeight={700} lineHeight="1.25rem" fontFamily="heading">
                {(cRatio.toNumber() * 100).toFixed(2) + '%'}
              </Text>
              <Badge
                colorScheme={parsedCRatio === 'MANAGE' ? 'red' : 'green'}
                border="1px solid"
                bg={parsedCRatio === 'MANAGE' ? 'red.900' : 'green.900'}
              >
                {parsedCRatio}
              </Badge>
            </Flex>
          </Fade>
        </Td>
      )}
      <Td border="none">
        <Flex justifyContent="flex-end">
          <Button
            fontSize="0.75rem"
            lineHeight="1rem"
            height="1.75rem"
            fontWeight={700}
            borderWidth="1px"
            borderColor="gray.900"
            borderRadius="4px"
            w="100px"
            onClick={() => {
              navigate({
                pathname: `/positions/${collateralType.displaySymbol}/${poolId}`,
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
