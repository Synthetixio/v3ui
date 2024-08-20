import { Contract } from 'ethers';
import { electionModuleABITest } from './abi';
import { CouncilSlugs } from './councils';

const SpartanCouncilContract = new Contract(
  '0xBC85F11300A8EF619592fD678418Ec4eF26FBdFD',
  process.env.DEV ? electionModuleABITest : electionModuleABITest
);

const AmbassadorCouncilContract = new Contract(
  '0xC82e8284F6f3Dc0388C4c25B73A4D0908624ee00',
  process.env.DEV ? electionModuleABITest : electionModuleABITest
);

const TreasuryCouncilContract = new Contract(
  '0x0A7B42E8b43eA1FaD074E6FB18d2807DEb94375d',
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
    case 2192: {
      switch (council) {
        case 'spartan':
          return new Contract(
            process.env.DEV === 'true'
              ? '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9'
              : '0x64dD8f5578C38cbe6066906161f51118f59BB3DD',
            [
              'function balanceOfOnPeriod(address, uint256) view returns (uint256)',
              'function setBalanceOfOnPeriod(address, uint256, uint256) external',
            ]
          );
        case 'ambassador':
          return new Contract(
            process.env.DEV === 'true'
              ? '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9'
              : '0x7BaE0d0Bf556B2C8F3BFd250D7c63B1B2711652B',
            [
              'function balanceOfOnPeriod(address, uint256) view returns (uint256)',
              'function setBalanceOfOnPeriod(address, uint256, uint256) external',
            ]
          );
        case 'treasury':
          return new Contract(
            process.env.DEV === 'true'
              ? '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9'
              : '0x5A11B387988cCc19f26E7d434dFF6A8c896273C9',
            [
              'function balanceOfOnPeriod(address, uint256) view returns (uint256)',
              'function setBalanceOfOnPeriod(address, uint256, uint256) external',
            ]
          );
      }
    }
  }
};
