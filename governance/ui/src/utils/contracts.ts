import { Contract } from 'ethers';
import { electionModuleABI } from './abi';
import { CouncilSlugs } from './councils';

export const SpartanCouncilContract = new Contract(
  '0x62F424908BEaF103d0Dd1e0b230356A3785e409d',
  electionModuleABI
);
export const AmbassadorCouncilContract = new Contract(
  '0x62F424908BEaF103d0Dd1e0b230356A3785e409d',

  electionModuleABI
);
export const GrantsCouncilContract = new Contract(
  '0x62F424908BEaF103d0Dd1e0b230356A3785e409d',

  electionModuleABI
);
export const TreasuryCouncilContract = new Contract(
  '0x62F424908BEaF103d0Dd1e0b230356A3785e409d',
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
