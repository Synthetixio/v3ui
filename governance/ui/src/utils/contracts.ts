import { Contract } from 'ethers';
import { electionModuleABI } from './abi';
import { CouncilSlugs } from './councils';

export const SpartanCouncilContract = new Contract(
  '0x62f424908beaf103d0dd1e0b230356a3785e409d',
  electionModuleABI
);
export const AmbassadorCouncilContract = new Contract(
  '0x62f424908beaf103d0dd1e0b230356a3785e409d',
  electionModuleABI
);
export const GrantsCouncilContract = new Contract(
  '0x62f424908beaf103d0dd1e0b230356a3785e409d',
  electionModuleABI
);
export const TreasuryCouncilContract = new Contract(
  '0x62f424908beaf103d0dd1e0b230356a3785e409d',
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
