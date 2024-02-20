import { Contract } from 'ethers';
import { electionModuleABI, electionModuleABITest } from './abi';
import { CouncilSlugs } from './councils';

const SpartanCouncilContract = new Contract(
  '0x62F424908BEaF103d0Dd1e0b230356A3785e409d',
  process.env.DEV ? electionModuleABI : electionModuleABITest
);

const AmbassadorCouncilContract = new Contract(
  '0x7bcE99fd5B548974a56062EFAc519B11d736D3AA',
  process.env.DEV ? electionModuleABI : electionModuleABITest
);

const GrantsCouncilContract = new Contract(
  '0x14F4d1a2Cc1553d55A86623A468C9Cd452176361',
  process.env.DEV ? electionModuleABI : electionModuleABITest
);

const TreasuryCouncilContract = new Contract(
  '0x3e6C2487242DB3Ee685Bf2Bb646420CCa2243c8f',
  process.env.DEV ? electionModuleABI : electionModuleABITest
);

export function getCouncilContract(council: CouncilSlugs) {
  switch (council) {
    case 'spartan':
      if (process.env.DEV)
        return SpartanCouncilContract.attach('0xDAA5A8bFDEBcA03cCAF0d5285265A7d7Fbb42e15');
      return SpartanCouncilContract;
    case 'grants':
      if (process.env.DEV)
        return GrantsCouncilContract.attach('0x8A3bA910172c4b77BF4c52d04bA1a59b963700ec');
      return GrantsCouncilContract;
    case 'ambassador':
      if (process.env.DEV)
        return AmbassadorCouncilContract.attach('0x9abCc1d560C1af4Cf8a84D80AE5E35a24C1f38FA');
      return AmbassadorCouncilContract;
    case 'treasury':
      if (process.env.DEV)
        return AmbassadorCouncilContract.attach('0x01fa5a659da52fa0ae26bc60698b2760b745d910');
      return TreasuryCouncilContract;
    default:
      throw new Error('could not find contract');
  }
}

export const SnapshotRecordContractAddress = process.env.DEV
  ? '0x854AeE030eFEB8f9C4c778999174A33921613A4F'
  : '0xCb31766607a28bb381064d82C8146B8245f2c3c0';
