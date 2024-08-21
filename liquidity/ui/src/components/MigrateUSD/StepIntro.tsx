import React from 'react';
import { VStack, Text, Button, Flex } from '@chakra-ui/react';
import { NumberInput } from '@snx-v3/NumberInput';
import { useV2sUSD } from '../../../../lib/useV2sUSD';
import { Network } from '@snx-v3/useBlockchain';
import { useTokenBalance } from '@snx-v3/useTokenBalance';
import Wei from '@synthetixio/wei';
import { ZEROWEI } from '../../utils/constants';
import { Amount } from '@snx-v3/Amount';
import { BorderBox } from '@snx-v3/BorderBox';
import { TokenIcon } from '../TokenIcon';
import { useUSDProxyForChain } from '@snx-v3/useUSDProxy';

export const StepIntro = ({
  onClose,
  onConfirm,
  setAmount,
  amount,
  network,
}: {
  onClose: () => void;
  onConfirm: () => void;
  setAmount: (val: Wei) => void;
  amount: Wei;
  network: Network;
}) => {
  const { data: v2_sUSD } = useV2sUSD(network);
  const { data: v2_balance } = useTokenBalance(v2_sUSD, network);
  const { data: v3_sUSD } = useUSDProxyForChain(network);
  const { data: v3_balance } = useTokenBalance(v3_sUSD?.address, network);

  return (
    <VStack gap={2.5}>
      <Text width="100%" textAlign="left" fontSize="14px">
        Convert your sUSD to V3 compatible sUSD. You will need V3 compatible sUSD to interact with
        the new Synthetix products.
      </Text>

      <BorderBox width="100%" display="flex" flexDirection="column" p={3}>
        <Flex alignItems="center">
          <Flex flexDir="column" gap="1">
            <BorderBox
              display="flex"
              justifyContent="center"
              alignItems="center"
              py={1.5}
              px={2.5}
              width="fit-content"
            >
              <Text display="flex" gap={2} alignItems="center" fontWeight="600">
                <TokenIcon symbol="susd" width={16} height={16} />
                V2 sUSD
              </Text>
            </BorderBox>
            <Flex fontSize="xs" color="whiteAlpha.700" gap="1">
              Balance: <Amount value={v2_balance} />
            </Flex>
          </Flex>
          <Flex flexDir="column" flexGrow={1}>
            <NumberInput
              InputProps={{
                isRequired: true,
                'data-max': v2_balance?.toString(),
                type: 'number',
                min: 0,
              }}
              value={amount}
              onChange={(val) => setAmount(val)}
              max={v2_balance}
              min={ZEROWEI}
            />
          </Flex>
        </Flex>
      </BorderBox>

      <BorderBox width="100%" display="flex" flexDirection="column" p={3}>
        <Flex alignItems="center">
          <Flex flexDir="column" gap="1">
            <BorderBox
              display="flex"
              justifyContent="center"
              alignItems="center"
              py={1.5}
              px={2.5}
              width="fit-content"
            >
              <Text display="flex" gap={2} alignItems="center" fontWeight="600">
                <TokenIcon symbol="susd" width={16} height={16} />
                V3 sUSD
              </Text>
            </BorderBox>
            <Flex fontSize="xs" color="whiteAlpha.700" gap="1">
              Balance: <Amount value={v3_balance} />
            </Flex>
          </Flex>
          <Flex flexDir="column" flexGrow={1}>
            <NumberInput disabled value={amount} />
          </Flex>
        </Flex>
      </BorderBox>

      <Button
        isDisabled={v2_balance?.lt(amount) || amount.lte(0)}
        mt={3}
        width="100%"
        onClick={onConfirm}
      >
        Convert
      </Button>
      <Button variant="outline" colorScheme="gray" onClick={onClose} width="100%">
        Later
      </Button>
    </VStack>
  );
};
