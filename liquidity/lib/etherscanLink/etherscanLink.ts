export function etherscanLink({
  chain,
  address,
  isTx = false,
}: {
  chain: string;
  address: string;
  isTx?: boolean;
}): string {
  switch (chain) {
    case 'sepolia':
      return `https://sepolia.etherscan.io/${isTx ? 'tx' : 'address'}/${address}`;
    case 'arbitrum':
      return `https://arbiscan.io/${isTx ? 'tx' : 'address'}/${address}`;
    case 'optimism':
      return `https://optimistic.etherscan.io/${isTx ? 'tx' : 'address'}/${address}`;
    case 'base':
      return `https://basescan.org/${isTx ? 'tx' : 'address'}/${address}`;
    case 'base-sepolia':
      return `https://sepolia.basescan.org/${isTx ? 'tx' : 'address'}/${address}`;
    case 'mainnet':
    default:
      return `https://etherscan.io/${isTx ? 'tx' : 'address'}/${address}`;
  }
}
