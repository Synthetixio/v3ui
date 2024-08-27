import { Contract } from 'ethers';
import { electionModuleABITest } from './abi';
import { CouncilSlugs } from './councils';

export const isMothercain = (chainId?: string | number) => {
  if (!chainId) return false;
  const parsedChainId = chainId.toString();
  if (parsedChainId === '13001') return true;
  if (parsedChainId === '2192') return true;
  return false;
};

const SpartanCouncilContract = new Contract(
  '0xBC85F11300A8EF619592fD678418Ec4eF26FBdFD',
  electionModuleABITest
);

const AmbassadorCouncilContract = new Contract(
  '0xCdbEf5753cE3CEbF361e143117e345ADd7498F80',
  electionModuleABITest
);

const TreasuryCouncilContract = new Contract(
  '0xe3aB2C6F1C9E46Fb53eD6b297c6fff68e935B161',
  electionModuleABITest
);

export function getCouncilContract(council: CouncilSlugs, chainId?: string | number) {
  const parsedChainId = chainId ? Number(chainId) : 2192;
  switch (council) {
    case 'spartan':
      return parsedChainId === 2192 || parsedChainId === 10
        ? SpartanCouncilContract.attach('0xB3026a683AAC2499e70Bbd988a9411A99b00EBD2')
        : SpartanCouncilContract;
    case 'ambassador':
      return parsedChainId === 2192
        ? AmbassadorCouncilContract.attach('0xCdbEf5753cE3CEbF361e143117e345ADd7498F80')
        : AmbassadorCouncilContract;
    case 'treasury':
      return parsedChainId === 2192
        ? TreasuryCouncilContract.attach('0xe3aB2C6F1C9E46Fb53eD6b297c6fff68e935B161')
        : TreasuryCouncilContract;
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
