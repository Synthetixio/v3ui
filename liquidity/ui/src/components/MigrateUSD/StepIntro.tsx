import React, { useEffect, useState } from 'react';
import {
  VStack,
  Text,
  Button,
  Flex,
  Collapse,
  Alert,
  AlertIcon,
  AlertDescription,
} from '@chakra-ui/react';
import { NumberInput } from '@snx-v3/NumberInput';
import { Network } from '@snx-v3/useBlockchain';
import { useTokenBalance } from '@snx-v3/useTokenBalance';
import Wei from '@synthetixio/wei';
import { ZEROWEI } from '@snx-v3/constants';
import { Amount } from '@snx-v3/Amount';
import { BorderBox } from '@snx-v3/BorderBox';
import { TokenIcon } from '../TokenIcon';
import { useUSDProxyForChain } from '@snx-v3/useUSDProxy';
import { useV2sUSD } from '@snx-v3/useV2sUSD';

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
  const [loaded, setLoaded] = useState(false);
  const { data: v2_sUSD } = useV2sUSD(network);
  const { data: v2_balance } = useTokenBalance(v2_sUSD, network);
  const { data: v3_sUSD } = useUSDProxyForChain(network);
  const { data: v3_balance } = useTokenBalance(v3_sUSD?.address, network);

  useEffect(() => {
    if (v2_balance && amount.eq(0) && !loaded) {
      setAmount(v2_balance);
      setLoaded(true);
    }
  }, [amount, loaded, setAmount, v2_balance]);

  return (
    <VStack gap={2.5}>
      <Text width="100%" textAlign="left" fontSize="14px">
        Convert your sUSD to V3 compatible sUSD. You will need V3 compatible sUSD to interact with
        the new Synthetix products.
      </Text>

      <BorderBox width="100%" display="flex" flexDirection="column" p={3}>
        <Flex alignItems="center">
          <Flex flexDir="column" gap="1">
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
                <Text
                  as="span"
                  cursor="pointer"
                  onClick={() => {
                    if (!v2_balance) {
                      return;
                    }
                    setAmount(v2_balance);
                  }}
                  color={v2_balance?.eq(amount) ? 'gray.600' : 'cyan.500'}
                  fontWeight={700}
                >
                  &nbsp;Max
                </Text>
              </Flex>
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

      <Collapse in={v2_balance?.lt(amount)} animateOpacity>
        <Alert borderRadius="6px" status="error">
          <AlertIcon />
          <AlertDescription>You cannot convert more than your v2 sUSD balance</AlertDescription>
        </Alert>
      </Collapse>

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
