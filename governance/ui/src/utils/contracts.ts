import { Contract } from 'ethers';
import { electionModuleABITest } from './abi';
import { CouncilSlugs } from './councils';

const SpartanCouncilContract = new Contract(
  '0xD9fA68AD1Cc69EB1e72B043ABe313c0191a38cB1',
  process.env.DEV ? electionModuleABITest : electionModuleABITest
);

const AmbassadorCouncilContract = new Contract(
  '0xD9fA68AD1Cc69EB1e72B043ABe313c0191a38cB1',
  process.env.DEV ? electionModuleABITest : electionModuleABITest
);

const TreasuryCouncilContract = new Contract(
  '0xD9fA68AD1Cc69EB1e72B043ABe313c0191a38cB1',
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

export const SnapshotRecordContractAddress = process.env.DEV
  ? '0x854AeE030eFEB8f9C4c778999174A33921613A4F'
  : '0xCb31766607a28bb381064d82C8146B8245f2c3c0';
