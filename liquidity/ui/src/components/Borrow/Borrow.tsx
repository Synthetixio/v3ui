import { Alert, AlertIcon, Button, Collapse, Flex, Text } from '@chakra-ui/react';
import { Amount } from '@snx-v3/Amount';
import { BorderBox } from '@snx-v3/BorderBox';
import { DollarCircle } from '@snx-v3/icons';
import { SUSDCIcon } from '@snx-v3/icons/SUSDCIcon';
import { isBaseAndromeda } from '@snx-v3/isBaseAndromeda';
import { ManagePositionContext } from '@snx-v3/ManagePositionContext';
import { NumberInput } from '@snx-v3/NumberInput';
import { useNetwork } from '@snx-v3/useBlockchain';
import { useCollateralType } from '@snx-v3/useCollateralTypes';
import { LiquidityPosition } from '@snx-v3/useLiquidityPosition';
import { useParams } from '@snx-v3/useParams';
import { useSystemToken } from '@snx-v3/useSystemToken';
import { validatePosition } from '@snx-v3/validatePosition';
import { wei } from '@synthetixio/wei';
import { useContext } from 'react';
import { ZEROWEI } from '@snx-v3/constants';

export const Borrow = ({ liquidityPosition }: { liquidityPosition?: LiquidityPosition }) => {
  const params = useParams();
  const { network } = useNetwork();
  const { data: systemToken } = useSystemToken();

  const isBase = isBaseAndromeda(network?.id, network?.preset);

  const { debtChange, collateralChange, setDebtChange } = useContext(ManagePositionContext);

  const { data: collateralType } = useCollateralType(params.collateralSymbol);

  const { maxDebt: actualMaxDebt } = validatePosition({
    issuanceRatioD18: collateralType?.issuanceRatioD18,
    collateralAmount: liquidityPosition?.collateralAmount,
    collateralPrice: liquidityPosition?.collateralPrice,
    debt: liquidityPosition?.debt,
    collateralChange: collateralChange,
    debtChange: debtChange,
  });

  const maxDebt = wei(actualMaxDebt.toBN().sub(1));
  const symbol = isBase ? params.collateralSymbol : systemToken?.symbol;

  return (
    <Flex flexDirection="column">
      <Text fontSize="md" fontWeight="700" mb="2">
        {isBase ? 'Claim' : 'Borrow'}
      </Text>

      <BorderBox display="flex" p={3} mb="6">
        <Text display="flex" gap={2} alignItems="center" fontWeight="600" mx="2">
          {isBase ? <SUSDCIcon /> : <DollarCircle />}
          {symbol}
        </Text>
        <Flex flexDirection="column" justifyContent="flex-end" flexGrow={1}>
          <NumberInput
            InputProps={{
              isRequired: true,
              'data-testid': 'borrow amount input',
              'data-max': maxDebt.toString(),
              type: 'number',
              min: 0,
            }}
            value={debtChange}
            onChange={(val) => setDebtChange(val)}
            max={maxDebt}
            min={ZEROWEI}
          />
          <Flex flexDirection="column" alignItems="flex-end" fontSize="xs" color="whiteAlpha.700">
            <Flex
              gap="1"
              cursor="pointer"
              onClick={() => {
                if (!maxDebt) {
                  return;
                }
                setDebtChange(maxDebt);
              }}
            >
              <Text>Max:</Text>
              <Amount value={maxDebt} /> {isBase ? 'USDC' : systemToken?.symbol}
            </Flex>
          </Flex>
        </Flex>
      </BorderBox>

      <Collapse in={debtChange.gt(0)} animateOpacity>
        <Alert borderRadius="6px" colorScheme="orange" mb="6">
          <AlertIcon />
          <Text>
            As a security precaution, borrowed assets can only be withdrawn to your wallet after 24
            hs since your previous account activity.
          </Text>
        </Alert>
      </Collapse>

      <Button isDisabled={debtChange.lte(0)} data-testid="borrow submit" type="submit">
        {debtChange.lte(0) ? 'Enter Amount' : isBase ? 'Claim' : 'Borrow'}
      </Button>
    </Flex>
  );
};
