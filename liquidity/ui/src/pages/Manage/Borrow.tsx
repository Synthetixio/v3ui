import { Button, Flex, Text } from '@chakra-ui/react';
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

const BorrowUi: FC<{
  debtChange: Wei;
  maxDebt: Wei;
  setDebtChange: (val: Wei) => void;
}> = ({ debtChange, setDebtChange, maxDebt }) => {
  const { network } = useNetwork();
  const isBase = isBaseAndromeda(network?.id, network?.preset);
  return (
    <Flex flexDirection="column">
      <Text fontSize="md" fontWeight="700" mb="0.5">
        {isBase ? 'Claim USDC' : 'Borrow snxUSD'}
      </Text>
      <Text fontSize="sm" color="gray.400" mb="4">
        Take an interest-free loan of {isBase ? 'USDC' : 'snxUSD'} against your collateral. This
        increases your debt and decreases your C-Ratio.
      </Text>
      <BorderBox display="flex" py={2} px={3} mb="4">
        <Text display="flex" gap={2} alignItems="center" fontWeight="600" mx="2">
          <DollarCircle />

          {isBase ? 'USDC' : 'snxUSD'}
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
              <Amount value={maxDebt} /> {isBase ? 'USDC' : 'snxUSD'}
            </Flex>
          </Flex>
        </Flex>
      </BorderBox>
      <Button data-testid="borrow submit" type="submit">
        {isBase ? 'Claim USDC' : 'Borrow snxUSD'}
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
