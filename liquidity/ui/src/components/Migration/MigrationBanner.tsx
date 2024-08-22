import {
  Alert,
  AlertIcon,
  Button,
  Divider,
  Fade,
  Flex,
  Heading,
  Image,
  Text,
} from '@chakra-ui/react';
import { FC, useCallback, useState } from 'react';
import { useV2Position } from '../../../../lib/useV2Position';
import { Network, useNetwork, useWallet } from '@snx-v3/useBlockchain';
import { Amount } from '@snx-v3/Amount';
import { MigrationDialog } from './MigrationDialog';
import { MigrateUSDModal } from '../MigrateUSD/MigrateUSDModal';

interface Props {
  network: Network;
  type?: 'banner' | 'alert';
}

export const MigrationBanner: FC<Props> = ({ network, type = 'banner' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUSDModalOpen, setIsUSDModalOpen] = useState(false);
  const { data } = useV2Position(network);
  const { network: currentNetwork, setNetwork } = useNetwork();
  const { connect, activeWallet } = useWallet();

  const onClick = useCallback(async () => {
    try {
      if (!activeWallet) {
        connect();
        return;
      }

      if (!currentNetwork || currentNetwork.id !== network.id) {
        if (!(await setNetwork(network.id))) {
          return;
        }
      }

      setIsOpen(true);
    } catch (error) {}
  }, [activeWallet, connect, currentNetwork, network.id, setNetwork]);

  if (!data || data?.collateral.lte(0)) {
    return (
      <MigrationDialog
        onSuccess={() => setIsUSDModalOpen(true)}
        network={network}
        onClose={() => setIsOpen(false)}
        isOpen={isOpen}
      />
    );
  }

  return (
    <>
      <MigrationDialog
        onSuccess={() => setIsUSDModalOpen(true)}
        network={network}
        onClose={() => setIsOpen(false)}
        isOpen={isOpen}
      />
      <MigrateUSDModal
        network={network}
        onClose={() => setIsUSDModalOpen(false)}
        isOpen={isUSDModalOpen}
      />

      <Fade in>
        {type === 'banner' && (
          <>
            <Divider my={4} />

            <Flex
              alignItems="center"
              justifyContent={['center', 'space-between']}
              w="100%"
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
                onClick={onClick}
              >
                {!activeWallet
                  ? 'Connect'
                  : currentNetwork?.id !== network.id
                    ? 'Switch Network'
                    : 'Migrate to V3'}
              </Button>
            </Flex>
          </>
        )}

        {type === 'alert' && (
          <Alert mb={6} borderLeftColor="cyan.500" borderRadius="6px">
            <AlertIcon color="cyan.500" />
            <Text color="white" fontFamily="heading" fontSize="16px" lineHeight="24px">
              You have a <Amount value={data?.collateral} /> SNX active staking position on V2.
              <Text onClick={onClick} as="span" color="cyan.500" cursor="pointer">
                &nbsp; Migrate to V3
              </Text>
            </Text>
          </Alert>
        )}
      </Fade>
    </>
  );
};
