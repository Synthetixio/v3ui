import { Contract } from 'ethers';
import { electionModuleABITest } from './abi';
import { CouncilSlugs } from './councils';

const SpartanCouncilContract = new Contract(
  '0xB5BBEa9D6c0d57cc0061ee5A005F0863c0a43aad',
  process.env.DEV ? electionModuleABITest : electionModuleABITest
);

const AmbassadorCouncilContract = new Contract(
  '0xB5BBEa9D6c0d57cc0061ee5A005F0863c0a43aad',
  process.env.DEV ? electionModuleABITest : electionModuleABITest
);

const TreasuryCouncilContract = new Contract(
  '0xB5BBEa9D6c0d57cc0061ee5A005F0863c0a43aad',
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

export const SnapshotRecordContractAddress = (chainId: number) => {
  switch (chainId) {
    case 421614:
      return process.env.DEV === 'true'
        ? '0x854AeE030eFEB8f9C4c778999174A33921613A4F'
        : process.env.TESTNET === 'true'
          ? '0x5F0aEC6455ACD77721D243020C447a49De6469d5'
          : '';
    case 11155420:
      return process.env.DEV === 'true'
        ? '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9'
        : process.env.TESTNET === 'true'
          ? '0x5F0aEC6455ACD77721D243020C447a49De6469d5'
          : '';
  }
};

export const getWormwholeChainId = (supportedNetworks: number) => {
  switch (supportedNetworks) {
    case 421614:
      return 10003;
    case 11155420:
      return 10005;
  }
};
