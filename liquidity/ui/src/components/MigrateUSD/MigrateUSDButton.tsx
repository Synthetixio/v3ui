import { Button } from '@chakra-ui/react';
import { FC, useState } from 'react';
import { Network, useWallet } from '@snx-v3/useBlockchain';
import { MigrateUSDModal } from './MigrateUSDModal';
import { useV2sUSD } from '../../../../lib/useV2sUSD';
import { useTokenBalance } from '@snx-v3/useTokenBalance';
import { TokenIcon } from '../TokenIcon';

interface Props {
  network: Network;
}

export const MigrateUSDButton: FC<Props> = ({ network }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { data: v2_sUSD } = useV2sUSD(network);
  const { data: v2_balance } = useTokenBalance(v2_sUSD, network);
  const { activeWallet } = useWallet();

  if (!activeWallet || !v2_balance || v2_balance.lte(0)) {
    return null;
  }

  return (
    <>
      <MigrateUSDModal network={network} onClose={() => setIsOpen(false)} isOpen={isOpen} />
      <Button
        variant="outline"
        colorScheme="gray"
        mr={1}
        data-cy="account-menu-button"
        px={3}
        gap={2}
        display="flex"
        alignItems="center"
        fontSize="14px"
        onClick={() => setIsOpen(true)}
      >
        <TokenIcon width={24} height={24} symbol="susd" />
        Convert sUSD
      </Button>
    </>
  );
};
