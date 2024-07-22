import { Button, Collapse, Fade, Flex, Td, Text, Tooltip, Tr } from '@chakra-ui/react';
import { TokenIcon } from '../../TokenIcon';
import { LiquidityPositionType } from '@snx-v3/useLiquidityPositions';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CRatioBadge } from '../../CRatioBar/CRatioBadge';
import { Amount } from '@snx-v3/Amount';
import { TimeIcon } from '@chakra-ui/icons';
import { useWithdrawTimer } from '../../../../../lib/useWithdrawTimer';
interface PositionRow extends LiquidityPositionType {
  final: boolean;
  isBase: boolean;
  apr?: number;
  systemTokenSymbol?: string;
}

export function PositionRow({
  poolId,
  collateralType,
  debt,
  final,
  cRatio,
  isBase,
  apr,
  collateralAmount,
  availableCollateral,
  accountId,
}: PositionRow) {
  const [queryParams] = useSearchParams();
  const navigate = useNavigate();
  const { minutes, seconds, hours, isRunning } = useWithdrawTimer(accountId);

  const onClick = () => {
    queryParams.set('manageAction', debt.gt(0) ? 'repay' : 'claim');
    navigate({
      pathname: `/positions/${collateralType.symbol}/${poolId}`,
      search: queryParams.toString(),
    });
  };

  return (
    <Tr borderBottomWidth={final ? 'none' : '1px'}>
      <Td border="none">
        <Fade in>
          <Flex
            alignItems="center"
            _hover={{ textDecoration: 'underline', cursor: 'pointer' }}
            onClick={onClick}
          >
            <TokenIcon symbol={collateralType.symbol} />
            <Flex flexDirection="column" ml={3}>
              <Text
                color="white"
                fontWeight={700}
                lineHeight="1.25rem"
                fontFamily="heading"
                fontSize="sm"
              >
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
        <Flex flexDirection="column" alignItems="flex-end">
          <Text color="white" lineHeight="1.25rem" fontFamily="heading" fontSize="sm">
            <Amount value={collateralAmount} />
          </Text>
          <Text color="gray.500" fontFamily="heading" fontSize="0.75rem" lineHeight="1rem">
            {collateralType.symbol.toString()}
          </Text>
        </Flex>
      </Td>
      <Td border="none">
        <Flex flexDirection="column" alignItems="flex-end">
          <Text
            display="flex"
            alignItems="center"
            color="white"
            lineHeight="1.25rem"
            fontFamily="heading"
            fontSize="sm"
            gap={1.5}
          >
            <Amount value={availableCollateral} />

            {availableCollateral.gt(0) &&
              isRunning &&
              !![minutes, hours, seconds].find((a) => a > 0) && (
                <Tooltip label={`Withdrawal available in ${hours}H${minutes}M`}>
                  <TimeIcon />
                </Tooltip>
              )}
          </Text>
          <Text color="gray.500" fontFamily="heading" fontSize="0.75rem" lineHeight="1rem">
            {collateralType.symbol.toString()}
          </Text>
        </Flex>
      </Td>
      <Td border="none">
        <Fade in>
          <Flex flexDirection="column" alignItems="flex-end">
            <Text color="white" lineHeight="1.25rem" fontFamily="heading" fontSize="sm">
              {!!apr ? apr.toFixed(2).concat('%') : '-'}
            </Text>
          </Flex>
        </Fade>
      </Td>

      <Td border="none">
        <Flex flexDirection="column" alignItems="flex-end">
          <Text color="white" lineHeight="1.25rem" fontFamily="heading" fontSize="sm">
            <Amount prefix="$" value={debt.abs()} />
          </Text>
          <Collapse in={!debt.eq(0)}>
            <Text
              color="cyan.500"
              fontFamily="heading"
              fontSize="0.75rem"
              lineHeight="1rem"
              cursor="pointer"
              onClick={onClick}
            >
              {debt.gt(0) ? 'Repay Debt' : 'Claim Credit'}
            </Text>
          </Collapse>
        </Flex>
      </Td>
      {!isBase && (
        <Td border="none">
          <Fade in>
            <Flex flexDirection="column" alignItems="flex-end">
              <Text color="white" fontSize="sm" lineHeight="1.25rem" fontFamily="heading">
                {debt.gt(0) ? (cRatio.toNumber() * 100).toFixed(2) + '%' : 'Infinite'}
              </Text>
              <CRatioBadge
                cRatio={cRatio.toNumber() * 100}
                liquidationCratio={(collateralType?.liquidationRatioD18?.toNumber() || 0) * 100}
                targetCratio={(collateralType?.issuanceRatioD18.toNumber() || 0) * 100}
              />
            </Flex>
          </Fade>
        </Td>
      )}
      <Td border="none" pr={0}>
        <Flex justifyContent="flex-end">
          <Button
            fontSize="0.75rem"
            lineHeight="1rem"
            height="1.75rem"
            fontWeight={700}
            borderWidth="1px"
            borderColor="gray.900"
            borderRadius="4px"
            onClick={() => {
              queryParams.set('manageAction', 'deposit');
              navigate({
                pathname: `/positions/${collateralType.symbol}/${poolId}`,
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
