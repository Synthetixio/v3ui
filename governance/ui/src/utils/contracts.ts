import { Contract } from 'ethers';
import { electionModuleABITest } from './abi';
import { CouncilSlugs } from './councils';

const SpartanCouncilContract = new Contract(
  '0xfD6a975e197d6C4c6a8616E37f7F178eE141a560',
  process.env.DEV ? electionModuleABITest : electionModuleABITest
);

const AmbassadorCouncilContract = new Contract(
  '0xd6F3798a695038783EB83227A5770f0DDf2A0605',
  process.env.DEV ? electionModuleABITest : electionModuleABITest
);

const TreasuryCouncilContract = new Contract(
  '0x8960892BC4B3bdFb2CdC98b0cABc07F15f6c364A',
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
