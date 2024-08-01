import { Contract } from 'ethers';
import { electionModuleABITest } from './abi';
import { CouncilSlugs } from './councils';

const SpartanCouncilContract = new Contract(
  '0x0AFb5ef6DBe62702142Fa018BE0D21196E666796',
  process.env.DEV ? electionModuleABITest : electionModuleABITest
);

const AmbassadorCouncilContract = new Contract(
  '0xB5BBEa9D6c0d57cc0061ee5A005F0863c0a43aad',
  process.env.DEV ? electionModuleABITest : electionModuleABITest
);

const TreasuryCouncilContract = new Contract(
  '0x43028D9Cc7e3BD425b15Ba335059F64595c3E000',
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

export const SnapshotRecordContract = (chainId: number) => {
  switch (chainId) {
    case 421614:
      return new Contract(
        process.env.DEV === 'true'
          ? '0x854AeE030eFEB8f9C4c778999174A33921613A4F'
          : process.env.TESTNET === 'true'
            ? '0x652e3a72945eDC8d2784c320771ffE0d090fa949'
            : '',
        ['function balanceOfOnPeriod(address, uint256) view returns (uint256)']
      );
    case 11155420:
      return new Contract(
        process.env.DEV === 'true'
          ? '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9'
          : process.env.TESTNET === 'true'
            ? '0x652e3a72945eDC8d2784c320771ffE0d090fa949'
            : '',
        ['function balanceOfOnPeriod(address, uint256) view returns (uint256)']
      );
  }
};
