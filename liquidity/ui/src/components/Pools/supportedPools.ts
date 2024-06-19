import { ReactNode } from 'react';

interface Tag {
  label: string;
  type: string;
}

interface Pool {
  id: string;
  name: string;
  chainId: number;
  tags?: Tag[];
  logo?: ReactNode;
  returnType: 'APR' | 'APY';
  returnTooltip: string;
  tvl: number;
}

export const supportedPools: Pool[] = [
  {
    id: '1',
    name: 'Spartan Council Pool',
    chainId: 8453,
    returnType: 'APR',
    returnTooltip: 'Lalalalal awesome returns',
    tvl: 0,
  },
];
