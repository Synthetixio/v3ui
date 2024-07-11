import { Alert, AlertIcon, Button, Collapse, Flex, Text } from '@chakra-ui/react';
import { Amount } from '@snx-v3/Amount';
import { BorderBox } from '@snx-v3/BorderBox';
import { DollarCircle } from '@snx-v3/icons';
import { NumberInput } from '@snx-v3/NumberInput';
import { ManagePositionContext } from '@snx-v3/ManagePositionContext';
import { FC, useContext, useMemo } from 'react';
import { LiquidityPosition } from '@snx-v3/useLiquidityPosition';
import Wei from '@synthetixio/wei';
import { useNetwork } from '@snx-v3/useBlockchain';
import { isBaseAndromeda } from '@snx-v3/isBaseAndromeda';
import { SUSDCIcon } from '@snx-v3/icons/SUSDCIcon';
import { ZEROWEI } from '../../utils/constants';
import { useSystemToken } from '@snx-v3/useSystemToken';

const ClaimUi: FC<{
  debtChange: Wei;
  maxClaimble: Wei;
  setDebtChange: (val: Wei) => void;
}> = ({ debtChange, setDebtChange, maxClaimble }) => {
  const { network } = useNetwork();
  const { data: systemToken } = useSystemToken();

  const isBase = isBaseAndromeda(network?.id, network?.preset);

  return (
    <Flex flexDirection="column">
      <Text fontSize="md" fontWeight="700" mb="2">
        Claim Profit
      </Text>

      <BorderBox display="flex" py={2} px={3} mb="4">
        <Text display="flex" gap={2} alignItems="center" fontWeight="600" mx="2">
          {isBase ? <SUSDCIcon /> : <DollarCircle />}
          {isBase ? 'USDC' : systemToken?.symbol}
        </Text>
        <Flex flexDirection="column" justifyContent="flex-end" flexGrow={1}>
          <NumberInput
            InputProps={{
              isRequired: true,
              'data-testid': 'claim amount input',
              'data-max': maxClaimble.toString(),
            }}
            value={debtChange}
            onChange={(val) => setDebtChange(val)}
            max={maxClaimble}
          />
          <Flex flexDirection="column" alignItems="flex-end" fontSize="xs" color="whiteAlpha.700">
            <Flex
              gap="1"
              cursor="pointer"
              onClick={() => {
                if (!maxClaimble) {
                  return;
                }
                setDebtChange(maxClaimble);
              }}
            >
              <Text>Max:</Text>
              <Amount value={maxClaimble} /> {isBase ? 'USDC' : systemToken?.symbol}
            </Flex>
          </Flex>
        </Flex>
      </BorderBox>

      {maxClaimble.gt(0) && (
        <Collapse in={debtChange.lte(0)} animateOpacity>
          <Alert colorScheme="green" mb="4">
            <AlertIcon />
            <Text>
              Positive market performance has credited your position. Claim up to{' '}
              {maxClaimble.toString()} without accruing debt.
            </Text>
          </Alert>
        </Collapse>
      )}

      <Collapse in={debtChange.gt(0)} animateOpacity>
        <Alert colorScheme="blue" mb="4">
          <AlertIcon />
          <Text>
            As a security precaution, claimed assets can only be withdrawn to your wallet after 24
            hs since your previous account activity.
          </Text>
        </Alert>
      </Collapse>

      <Button isDisabled={debtChange.lte(0)} data-testid="claim submit" type="submit">
        {debtChange.gt(0) ? 'Claim' : 'Enter Amount'}
      </Button>
    </Flex>
  );
};

export const Claim = ({ liquidityPosition }: { liquidityPosition?: LiquidityPosition }) => {
  const { debtChange, setDebtChange } = useContext(ManagePositionContext);

  const maxClaimble = useMemo(() => {
    if (liquidityPosition?.debt.gte(0)) {
      return ZEROWEI;
    } else {
      return liquidityPosition?.debt.mul(-1) || ZEROWEI;
    }
  }, [liquidityPosition?.debt]);

  return (
    <ClaimUi setDebtChange={setDebtChange} debtChange={debtChange} maxClaimble={maxClaimble} />
  );
};
