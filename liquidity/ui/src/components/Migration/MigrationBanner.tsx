import { Button, Fade, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { FC, useState } from 'react';
import { useV2Position } from '../../../../lib/useV2Position';
import { Network, useNetwork, useWallet } from '@snx-v3/useBlockchain';
import { Amount } from '@snx-v3/Amount';
import { MigrationDialog } from './MigrationDialog';

interface Props {
  network: Network;
}

export const MigrationBanner: FC<Props> = ({ network }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useV2Position(network);
  const { network: currentNetwork, setNetwork } = useNetwork();
  const { connect } = useWallet();

  if (!data || data?.collateral.lte(0)) {
    return null;
  }

  return (
    <>
      <MigrationDialog network={network} onClose={() => setIsOpen(false)} isOpen={isOpen} />
      <Fade in>
        <Flex
          alignItems="center"
          justifyContent={['center', 'space-between']}
          w="100%"
          border="1px solid"
          borderColor="gray.900"
          rounded="base"
          bg="navy.700"
          p="6"
          mt="4"
          flexWrap="wrap"
          gap={4}
        >
          <Image src="/Rocket.png" />
          <Flex flexDir="column" gap={6}>
            <Heading fontSize="lg" fontWeight={700} color="white">
              You have a <Amount value={data?.collateral} /> SNX position on Synthetix V2
            </Heading>
            <Text fontSize="14px" color="gray.500">
              Migrate your SNX to Synthetix V3 to earn fees from both V2 and V3 markets and much
              more.
            </Text>
          </Flex>

          <Button
            px={3}
            py={2}
            fontSize="sm"
            fontWeight={700}
            lineHeight="20px"
            variant="outline"
            alignContent="center"
            borderWidth="1px"
            borderColor="gray.900"
            _hover={{ textTransform: 'none', opacity: 0.9 }}
            borderRadius="4px"
            color="white"
            textAlign="center"
            alignSelf="flex-end"
            onClick={async () => {
              try {
                if (!currentNetwork) {
                  connect();
                  return;
                }

                if (currentNetwork.id !== network.id) {
                  if (!(await setNetwork(network.id))) {
                    return;
                  }
                }

                setIsOpen(true);
              } catch (error) {}
            }}
          >
            {currentNetwork?.id !== network.id ? 'Switch Network' : 'Migrate to V3'}
          </Button>
        </Flex>
      </Fade>
    </>
  );
};