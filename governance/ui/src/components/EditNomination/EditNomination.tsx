import { Flex } from '@chakra-ui/react';
import { useWallet } from '@snx-v3/useBlockchain';
import { CouncilSlugs } from '../../utils/councils';

export default function EditNomination({ activeCouncil }: { activeCouncil: CouncilSlugs }) {
  const wallet = useWallet();
  return <Flex>Edit nomiation</Flex>;
}
