import { Contract } from 'ethers';
import { electionModuleABITest } from './abi';
import { CouncilSlugs } from './councils';

const SpartanCouncilContract = new Contract(
  '0xEdC8BCE858f3b504dd9DFdD2017339638A3FEC6c',
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

// TODO @dev respect also the council, have different contracts?
export const SnapshotRecordContract = (chainId: number) => {
  switch (chainId) {
    case 421614:
      return new Contract(
        process.env.DEV === 'true'
          ? '0x854AeE030eFEB8f9C4c778999174A33921613A4F'
          : process.env.TESTNET === 'true'
            ? '0x652e3a72945eDC8d2784c320771ffE0d090fa949'
            : '0x652e3a72945eDC8d2784c320771ffE0d090fa949',
        [
          'function balanceOfOnPeriod(address, uint256) view returns (uint256)',
          'function setBalanceOfOnPeriod(address, uint256, uint256) external',
        ]
      );
    case 11155420:
      return new Contract(
        process.env.DEV === 'true'
          ? '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9'
          : process.env.TESTNET === 'true'
            ? '0x652e3a72945eDC8d2784c320771ffE0d090fa949'
            : '0x652e3a72945eDC8d2784c320771ffE0d090fa949',
        [
          'function balanceOfOnPeriod(address, uint256) view returns (uint256)',
          'function setBalanceOfOnPeriod(address, uint256, uint256) external',
        ]
      );
    case 2192:
      return new Contract(
        process.env.DEV === 'true'
          ? '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9'
          : '0xaC5a365297424E686390f4101B4022be506f2a33',
        [
          'function balanceOfOnPeriod(address, uint256) view returns (uint256)',
          'function setBalanceOfOnPeriod(address, uint256, uint256) external',
        ]
      );
  }
};
