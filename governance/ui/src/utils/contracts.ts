import { Contract } from 'ethers';
import { electionModuleABITest } from './abi';
import { CouncilSlugs } from './councils';

export const isMotherchain = (chainId?: string | number) => {
  if (!chainId) return false;
  const parsedChainId = chainId.toString();
  if (parsedChainId === '13001') return true;
  if (parsedChainId === '2192') return true;
  return false;
};

const SpartanCouncilContract = new Contract(
  '0xd2866fbEFfD8AE158B29690D5425674DfF6D0E95',
  electionModuleABITest
);

const AmbassadorCouncilContract = new Contract(
  '0x9984A9a5699A66BCB25cbCBa9b09007DB6C969F9',
  electionModuleABITest
);

const TreasuryCouncilContract = new Contract(
  '0x689d5De527Bc35e604006cc42a34678e5b79e9D8',
  electionModuleABITest
);

export function getCouncilContract(council: CouncilSlugs) {
  switch (council) {
    case 'spartan':
      if (process.env.CI === 'true')
        return SpartanCouncilContract.connect('0xBC85F11300A8EF619592fD678418Ec4eF26FBdFD');
      return SpartanCouncilContract;
    case 'ambassador':
      if (process.env.CI === 'true')
        return AmbassadorCouncilContract.connect('0xCdbEf5753cE3CEbF361e143117e345ADd7498F80');
      return AmbassadorCouncilContract;
    case 'treasury':
      if (process.env.CI === 'true')
        return TreasuryCouncilContract.connect('0xe3aB2C6F1C9E46Fb53eD6b297c6fff68e935B161');
      return TreasuryCouncilContract;
    default:
      throw new Error('could not find contract');
  }
}

export const SnapshotRecordContract = (chainId: number, council: CouncilSlugs) => {
  switch (chainId) {
    case 13001: {
      switch (council) {
        case 'spartan':
          return new Contract('0x552E469B7C88cd501C08e7759d35dC58f08C9648', abiForSnapshotMock);
        case 'ambassador':
          return new Contract('0x3a0186E03137B9b971EC911350A0F2D88D24FDF2', abiForSnapshotMock);
        case 'treasury':
          return new Contract('0xC0bFA9aC792cF691734F7b2BD252d1c2B9fBa343', abiForSnapshotMock);
      }
    }
    case 10: {
      switch (council) {
        case 'spartan':
          return new Contract('0x7EBF54FD78Ced402c200A6C3c1A10506B83Fb419', abiForSnapshotMock);
        case 'ambassador':
          return new Contract('0x7EBF54FD78Ced402c200A6C3c1A10506B83Fb419', abiForSnapshotMock);
        case 'treasury':
          return new Contract('0x7EBF54FD78Ced402c200A6C3c1A10506B83Fb419', abiForSnapshotMock);
      }
    }
  }
};

const abiForSnapshotMock = [
  'function balanceOfOnPeriod(address, uint256) view returns (uint256)',
  'function setBalanceOfOnPeriod(address, uint256, uint256) external',
];
