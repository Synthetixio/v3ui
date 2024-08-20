import { Contract } from 'ethers';
import { electionModuleABITest } from './abi';
import { CouncilSlugs } from './councils';

const SpartanCouncilContract = new Contract(
  '0xBC85F11300A8EF619592fD678418Ec4eF26FBdFD',
  process.env.DEV ? electionModuleABITest : electionModuleABITest
);

const AmbassadorCouncilContract = new Contract(
  '0xCdbEf5753cE3CEbF361e143117e345ADd7498F80',
  process.env.DEV ? electionModuleABITest : electionModuleABITest
);

const TreasuryCouncilContract = new Contract(
  '0xe3aB2C6F1C9E46Fb53eD6b297c6fff68e935B161',
  process.env.DEV ? electionModuleABITest : electionModuleABITest
);

export function getCouncilContract(council: CouncilSlugs) {
  switch (council) {
    case 'spartan':
      if (process.env.DEV === 'true')
        return SpartanCouncilContract.attach('0x4066a172DD5D21E4f787C07D3118D0876296750B');
      return SpartanCouncilContract;
    case 'ambassador':
      if (process.env.DEV === 'true')
        return AmbassadorCouncilContract.attach('0x4066a172DD5D21E4f787C07D3118D0876296750B');
      return AmbassadorCouncilContract;
    case 'treasury':
      if (process.env.DEV === 'true')
        return TreasuryCouncilContract.attach('0x4066a172DD5D21E4f787C07D3118D0876296750B');
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
          return new Contract(
            process.env.DEV === 'true'
              ? '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9'
              : '0x552E469B7C88cd501C08e7759d35dC58f08C9648',
            [
              'function balanceOfOnPeriod(address, uint256) view returns (uint256)',
              'function setBalanceOfOnPeriod(address, uint256, uint256) external',
            ]
          );
        case 'ambassador':
          return new Contract(
            process.env.DEV === 'true'
              ? '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9'
              : '0x3a0186E03137B9b971EC911350A0F2D88D24FDF2',
            [
              'function balanceOfOnPeriod(address, uint256) view returns (uint256)',
              'function setBalanceOfOnPeriod(address, uint256, uint256) external',
            ]
          );
        case 'treasury':
          return new Contract(
            process.env.DEV === 'true'
              ? '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9'
              : '0xC0bFA9aC792cF691734F7b2BD252d1c2B9fBa343',
            [
              'function balanceOfOnPeriod(address, uint256) view returns (uint256)',
              'function setBalanceOfOnPeriod(address, uint256, uint256) external',
            ]
          );
      }
    }
  }
};
