import {
  Button,
  Flex,
  Image,
  Link,
  Skeleton,
  Text,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import { isBaseAndromeda } from '@snx-v3/isBaseAndromeda';
import { useNetwork } from '@snx-v3/useBlockchain';
import { useSNXPrice } from '../hooks/useSNXPrice';
import burnSnxSvg from './svgs/burn-snx.svg';
import baseBadgeMinted from './svgs/base-badge.svg';
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
      w={{ base: '100%', xl: '415px' }}
    >
      <Image src={burnSnxSvg} h="284px" objectFit="cover" />
      <Flex flexDir="column" gap="2" p="4">
        <Image src={baseBadgeMinted} w="100px" h="20px" />
        <Text fontWeight={700} fontSize="18px" color="white">
          Sell SNX to the Buyback and Burn Contract on Base
        </Text>
        <Text fontSize="14px">
          Sell your SNX to the Buyback and Burn contract on Base at a premium over the oracle price
          and receive USDC in return. The contract will then burn the SNX, permanently removing it
          from circulation.
        </Text>
        <Text fontWeight={700} fontSize="20px" display="flex" alignItems="center" gap="2">
          Buyback Price:{' '}
          {!SNXPrice ? (
            <Skeleton h="20px" width="100px" ml="2" />
          ) : (
            <>
              <s>$ {SNXPrice?.toNumber().toFixed(2)}</s> $
              {SNXPrice ? (SNXPrice?.toNumber() + SNXPrice?.toNumber() * 0.01).toFixed(2) : 0}
            </>
          )}
        </Text>
        <Flex gap="4" mt="34px">
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
              Learn More
            </Button>
          </Link>
        </Flex>
      </Flex>
      <BurnSNXModal isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
}
