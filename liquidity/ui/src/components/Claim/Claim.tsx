import { Alert, AlertIcon, Box, Button, Collapse, Flex, Text } from '@chakra-ui/react';
import { Amount } from '@snx-v3/Amount';
import { BorderBox } from '@snx-v3/BorderBox';
import { NumberInput } from '@snx-v3/NumberInput';
import { ManagePositionContext } from '@snx-v3/ManagePositionContext';
import { FC, useContext, useMemo } from 'react';
import { LiquidityPosition } from '@snx-v3/useLiquidityPosition';
import Wei, { wei } from '@synthetixio/wei';
import { useNetwork } from '@snx-v3/useBlockchain';
import { isBaseAndromeda } from '@snx-v3/isBaseAndromeda';
import { ZEROWEI } from '../../utils/constants';
import { useSystemToken } from '@snx-v3/useSystemToken';
import { TokenIcon } from '../TokenIcon';
import { validatePosition } from '@snx-v3/validatePosition';
import { useCollateralType } from '@snx-v3/useCollateralTypes';
import { useParams } from 'react-router-dom';
import { useTokenPrice } from '../../../../lib/useTokenPrice';

const ClaimUi: FC<{
  maxClaimble: Wei;
  maxDebt: Wei;
  debtChange: Wei;
  setDebtChange: (val: Wei) => void;
}> = ({ maxDebt, debtChange, setDebtChange, maxClaimble }) => {
  const { network } = useNetwork();
  const isBase = isBaseAndromeda(network?.id, network?.preset);
  const { data: systemToken } = useSystemToken();
  const max = useMemo(() => maxClaimble.add(maxDebt), [maxClaimble, maxDebt]);
  const price = useTokenPrice(isBase ? 'USDC' : systemToken?.symbol);

  return (
    <Flex flexDirection="column">
      <Text color="gray./50" fontSize="sm" fontWeight="700" mb="3">
        Claim{isBase ? '' : '/Borrow'}
      </Text>

      <BorderBox display="flex" p={3} mb="6">
        <Flex alignItems="flex-start" flexDir="column" gap="1">
          <BorderBox display="flex" py={1.5} px={2.5}>
            <Text display="flex" gap={2} fontSize="16px" alignItems="center" fontWeight="600">
              <TokenIcon symbol={isBase ? 'USDC' : systemToken?.symbol} width={16} height={16} />
              {isBase ? 'USDC' : systemToken?.symbol}
            </Text>
          </BorderBox>

          <Flex fontSize="12px" gap="1">
            <Text>Credit:</Text>
            <Amount value={maxClaimble} />
            {maxClaimble?.gt(0) && (
              <Text
                cursor="pointer"
                onClick={() => {
                  if (!maxClaimble) {
                    return;
                  }
                  setDebtChange(maxClaimble);
                }}
                color="cyan.500"
                fontWeight={700}
              >
                &nbsp; Max
              </Text>
            )}
          </Flex>
        </Flex>
        <Flex flexDir="column" flexGrow={1}>
          <NumberInput
            InputProps={{
              isRequired: true,
              'data-testid': 'claim amount input',
              'data-max': maxClaimble.toString(),
              type: 'number',
              min: 0,
            }}
            value={debtChange}
            onChange={(val) => setDebtChange(val)}
            max={max}
            min={ZEROWEI}
          />
          <Flex fontSize="xs" color="whiteAlpha.700" alignSelf="flex-end" gap="1">
            {price.gt(0) && <Amount prefix="$" value={debtChange.abs().mul(price)} />}
          </Flex>
        </Flex>
      </BorderBox>

      <Collapse in={debtChange.lte(0) && maxClaimble.gt(0)} animateOpacity>
        <Alert colorScheme="green" mb="4">
          <AlertIcon />
          <Text>
            Positive market performance has credited your position. Claim up to{' '}
            <Box
              onClick={() => {
                if (!maxClaimble) {
                  return;
                }
                setDebtChange(maxClaimble);
              }}
              cursor="pointer"
              as="span"
              textDecoration="underline"
            >
              <Amount value={maxClaimble} prefix="$" />
            </Box>
            &nbsp;without accruing debt.
          </Text>
        </Alert>
      </Collapse>

      <Collapse in={debtChange.gt(0)} animateOpacity>
        <Alert status="info" mb="4">
          <AlertIcon />
          <Text>
            Assets will be available to withdraw 24 hours after your last interaction with this
            position.
          </Text>
        </Alert>
        <Alert status="warning" mb="4">
          <AlertIcon />
          <Text>This action will reset the withdrawal waiting period to 24 hours </Text>
        </Alert>
      </Collapse>

      <Collapse in={debtChange.lte(0) && !isBase && maxDebt.gt(0)} animateOpacity>
        <Alert colorScheme="blue" mb="4">
          <AlertIcon />
          <Text>
            You can take an interest-free loan up to &nbsp;
            <Box
              onClick={() => {
                if (!maxDebt) {
                  return;
                }
                setDebtChange(maxDebt);
              }}
              cursor="pointer"
              as="span"
              textDecoration="underline"
            >
              <Amount value={maxDebt} prefix="$" />
            </Box>
          </Text>
        </Alert>
      </Collapse>

      <Button
        isDisabled={debtChange.lte(0) || debtChange.gt(max)}
        data-testid="claim submit"
        type="submit"
      >
        {debtChange.lte(0)
          ? 'Enter Amount'
          : debtChange.gt(maxClaimble) && !isBase
            ? 'Borrow'
            : 'Claim'}
      </Button>
    </Flex>
  );
};

export const Claim = ({ liquidityPosition }: { liquidityPosition?: LiquidityPosition }) => {
  const params = useParams();
  const { network } = useNetwork();
  const { debtChange, collateralChange, setDebtChange } = useContext(ManagePositionContext);
  const maxClaimble = useMemo(() => {
    if (!liquidityPosition || liquidityPosition?.debt.gte(0)) {
      return ZEROWEI;
    } else {
      return wei(liquidityPosition.debt.mul(-1).toBN().sub(1));
    }
  }, [liquidityPosition]);

  const { data: collateralType } = useCollateralType(params.collateralSymbol);

  const { maxDebt } = validatePosition({
    issuanceRatioD18: collateralType?.issuanceRatioD18,
    collateralAmount: liquidityPosition?.collateralAmount,
    collateralPrice: liquidityPosition?.collateralPrice,
    debt: liquidityPosition?.debt,
    collateralChange: collateralChange,
    debtChange: debtChange,
  });
  return (
    <ClaimUi
      setDebtChange={setDebtChange}
      debtChange={debtChange}
      maxClaimble={maxClaimble}
      maxDebt={isBaseAndromeda(network?.id, network?.preset) ? ZEROWEI : maxDebt}
    />
  );
};
