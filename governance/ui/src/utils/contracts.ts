import { Contract } from 'ethers';
import { electionModuleABI } from './abi';
import { CouncilSlugs } from './councils';

export const SpartanCouncilContract = new Contract(
  '0x62F424908BEaF103d0Dd1e0b230356A3785e409d',
  electionModuleABI
);

export const AmbassadorCouncilContract = new Contract(
  '0x7bcE99fd5B548974a56062EFAc519B11d736D3AA',
  electionModuleABI
);
export const GrantsCouncilContract = new Contract(
  '0x14F4d1a2Cc1553d55A86623A468C9Cd452176361',
  electionModuleABI
);
export const TreasuryCouncilContract = new Contract(
  '0x3e6C2487242DB3Ee685Bf2Bb646420CCa2243c8f',
  electionModuleABI
);

export function getCouncilContract(council: CouncilSlugs) {
  switch (council) {
    case 'spartan':
      return SpartanCouncilContract;
    case 'grants':
      return GrantsCouncilContract;
    case 'ambassador':
      return AmbassadorCouncilContract;
    case 'treasury':
      return TreasuryCouncilContract;
    default:
      throw new Error('could not find contract');
  }
}

export const SnapshotRecordContractAddress = '0x2f415c16d5527f630398bB4d787cd679726DaCE2';
