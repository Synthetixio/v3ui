import { Button, Flex, Image, Link, Text, Tooltip, useDisclosure } from '@chakra-ui/react';
import { isBaseAndromeda } from '@snx-v3/isBaseAndromeda';
import { useNetwork } from '@snx-v3/useBlockchain';
import { useSNXPrice } from '../hooks/useSNXPrice';
import burnSnxSvg from './burn-snx.svg';
import { BurnSNXModal } from './BurnSNXModal';

export function BurnSNX() {
  const { network } = useNetwork();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: SNXPrice } = useSNXPrice();

  return (
    <Flex
      border="1px solid"
      borderColor="gray.900"
      rounded="base"
      flexDir="column"
      bg="navy.700"
      w="415px"
    >
      <Image src={burnSnxSvg} h="284px" />
      <Flex flexDir="column" gap="6" p="4">
        <Text fontWeight={700} fontSize="18px" color="white">
          Sell SNX at premium and watch it burn
        </Text>
        <Text fontSize="16px">
          Sell your SNX at a <b>premium</b> price to the Buyback and Burn contract and get USDC on
          Base
        </Text>
        <Text fontWeight={700} fontSize="20px">
          {SNXPrice?.eq(0) ? (
            'refecthing...'
          ) : (
            <>
              Buyback Price: <s>$ {SNXPrice?.toNumber().toFixed(2)}</s> $
              {SNXPrice ? (SNXPrice?.toNumber() + SNXPrice?.toNumber() * 0.01).toFixed(2) : 0}
            </>
          )}
        </Text>
        <Flex gap="4" mt="65px">
          {!isBaseAndromeda(network?.id, network?.preset) ? (
            <Tooltip label="Please conect to the Base network">
              <Button isDisabled={true}>Burn SNX</Button>
            </Tooltip>
          ) : (
            <Button onClick={() => onOpen()}>Burn SNX</Button>
          )}
          <Link
            href="https://blog.synthetix.io/the-andromeda-release-buyback-and-burn/"
            target="_blank"
            rel="noopener"
          >
            <Button variant="outline" colorScheme="gray" color="white">
              Lean More
            </Button>
          </Link>
        </Flex>
      </Flex>
      <BurnSNXModal isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
}
