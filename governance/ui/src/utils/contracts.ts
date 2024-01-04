import { Contract } from 'ethers';
import { electionModuleABI } from './abi';
import { CouncilSlugs } from './councils';

export const SpartanCouncilContract = new Contract(
  process.env.DEV
    ? '0x62F424908BEaF103d0Dd1e0b230356A3785e409d'
    : process.env.TESTNET
      ? '0x62F424908BEaF103d0Dd1e0b230356A3785e409d'
      : '0x62F424908BEaF103d0Dd1e0b230356A3785e409d',
  electionModuleABI
);
export const AmbassadorCouncilContract = new Contract(
  process.env.DEV
    ? '0x62F424908BEaF103d0Dd1e0b230356A3785e409d'
    : process.env.TESTNET
      ? '0x62F424908BEaF103d0Dd1e0b230356A3785e409d'
      : '0x62F424908BEaF103d0Dd1e0b230356A3785e409d',
  electionModuleABI
);
export const GrantsCouncilContract = new Contract(
  process.env.DEV
    ? '0x62F424908BEaF103d0Dd1e0b230356A3785e409d'
    : process.env.TESTNET
      ? '0x62F424908BEaF103d0Dd1e0b230356A3785e409d'
      : '0x62F424908BEaF103d0Dd1e0b230356A3785e409d',
  electionModuleABI
);
export const TreasuryCouncilContract = new Contract(
  process.env.DEV
    ? '0x62F424908BEaF103d0Dd1e0b230356A3785e409d'
    : process.env.TESTNET
      ? '0x62F424908BEaF103d0Dd1e0b230356A3785e409d'
      : '0x62F424908BEaF103d0Dd1e0b230356A3785e409d',
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
