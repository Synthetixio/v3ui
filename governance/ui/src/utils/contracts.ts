import { Contract } from 'ethers';
import { electionModuleABITest, profileAbi } from './abi';
import { CouncilSlugs } from './councils';

export const isMotherchain = (chainId?: string | number) => {
  if (!chainId) return false;
  const parsedChainId = chainId.toString();
  if (parsedChainId === '13001') return true;
  if (parsedChainId === '2192') return true;
  return false;
};

const SpartanCouncilContract = new Contract(
  '0x2082d5A6f6F17F5e421FD6508b867D794472A42a',
  electionModuleABITest
);

const AmbassadorCouncilContract = new Contract(
  '0x93D3A11B8403C2140D0d1f1c0460601e4FBB52DE',
  electionModuleABITest
);

const TreasuryCouncilContract = new Contract(
  '0xECfA1d4B17AaCD691173b6194C3ade361ef38367',
  electionModuleABITest
);

export function getCouncilContract(council: CouncilSlugs) {
  switch (council) {
    case 'spartan':
      return SpartanCouncilContract;
    case 'ambassador':
      return AmbassadorCouncilContract;
    case 'treasury':
      return TreasuryCouncilContract;
    default:
      throw new Error('could not find contract');
  }
}

export const SnapshotRecordContract = (chainId: number, council: CouncilSlugs) => {
  switch (chainId) {
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

export const profileContract = new Contract(
  '0x76f46F9f24ED58B14854Ae6Cd2141dd1FE03fCC2',
  profileAbi
);
