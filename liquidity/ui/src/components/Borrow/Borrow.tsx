import { Alert, AlertIcon, Button, Collapse, Flex, Text } from '@chakra-ui/react';
import { Amount } from '@snx-v3/Amount';
import { BorderBox } from '@snx-v3/BorderBox';
import { DollarCircle } from '@snx-v3/icons';
import { NumberInput } from '@snx-v3/NumberInput';
import { ManagePositionContext } from '@snx-v3/ManagePositionContext';
import { FC, useContext } from 'react';
import { validatePosition } from '@snx-v3/validatePosition';
import { useCollateralType } from '@snx-v3/useCollateralTypes';
import { useParams } from '@snx-v3/useParams';
import { LiquidityPosition } from '@snx-v3/useLiquidityPosition';
import Wei from '@synthetixio/wei';
import { useNetwork } from '@snx-v3/useBlockchain';
import { isBaseAndromeda } from '@snx-v3/isBaseAndromeda';
import { SUSDCIcon } from '@snx-v3/icons/SUSDCIcon';
import { useStablecoin } from '@snx-v3/useStablecoin';

const BorrowUi: FC<{
  debtChange: Wei;
  maxDebt: Wei;
  setDebtChange: (val: Wei) => void;
}> = ({ debtChange, setDebtChange, maxDebt }) => {
  const { network } = useNetwork();
  const stablecoin = useStablecoin();

  const isBase = isBaseAndromeda(network?.id, network?.preset);
  return (
    <Flex flexDirection="column">
      <Text fontSize="md" fontWeight="700" mb="2">
        {isBase ? 'Claim' : 'Borrow'}
      </Text>

      <BorderBox display="flex" py={2} px={3} mb="4">
        <Text display="flex" gap={2} alignItems="center" fontWeight="600" mx="2">
          {isBase ? <SUSDCIcon /> : <DollarCircle />}
          {isBase ? 'USDC' : stablecoin?.symbol}
        </Text>
        <Flex flexDirection="column" justifyContent="flex-end" flexGrow={1}>
          <NumberInput
            InputProps={{
              isRequired: true,
              'data-testid': 'borrow amount input',
              'data-max': maxDebt.toString(),
            }}
            value={debtChange}
            onChange={(val) => setDebtChange(val)}
            max={maxDebt}
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
              <Amount value={maxDebt} /> {isBase ? 'USDC' : stablecoin?.symbol}
            </Flex>
          </Flex>
        </Flex>
      </BorderBox>

      <Collapse in={debtChange.gt(0)} animateOpacity>
        <Alert colorScheme="blue" mb="4">
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

export const Borrow = ({ liquidityPosition }: { liquidityPosition?: LiquidityPosition }) => {
  const params = useParams();
  const { debtChange, collateralChange, setDebtChange } = useContext(ManagePositionContext);

  const { data: collateralType } = useCollateralType(params.collateralSymbol);

  const { maxDebt } = validatePosition({
    issuanceRatioD18: collateralType?.issuanceRatioD18,
    collateralAmount: liquidityPosition?.collateralAmount,
    collateralPrice: liquidityPosition?.collateralPrice,
    debt: liquidityPosition?.debt,
    collateralChange: collateralChange,
    debtChange: debtChange,
  });

  return <BorrowUi setDebtChange={setDebtChange} debtChange={debtChange} maxDebt={maxDebt} />;
};
