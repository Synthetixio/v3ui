import { getCouncilContract } from './contracts';

const councils: {
  title: string;
  slug: CouncilSlugs;
  image: string;
  address: string;
  description: string;
  stipends: string;
  docLink: string;
}[] = [
  {
    title: 'Spartan Council',
    slug: 'spartan',
    image: '/councils/sc.svg',
    address: getCouncilContract('spartan').address,
    description:
      'The Spartan Council (SC), established via SIP-93, is the central governing body of the Synthetix protocol. The SC votes on Synthetix Improvement Proposals (SIPs) and Synthetix Configuration Change Proposal (SCCPs). The SC is responsible for conducting SIP/SCCP interviews, debating the implications of proposed changes, coordinating protocol changes with core contributors, and hosting periodic community governance meetings.',
    stipends: '2,000 SNX',
    docLink: 'https://docs.synthetix.io/v3/synthetix-v3',
  },
  {
    title: 'Ambassador Council',
    slug: 'ambassador',
    image: '/councils/ac.svg',
    address: getCouncilContract('ambassador').address,
    description:
      "The Ambassador Council, established via SIP 157 is responsible for promoting Synthetix's interest in the DeFi ecosystem. This advocation comes through two primary means: governance and partnerships. Governance includes seeking governance power in protocols that may be beneficial for Synthetix, and voting for proposals in the interest of the community. Partnerships include working with Synthetix integrators to help them integrate within the Synthetix Ecosystem.",
    stipends: '2,000 SNX',
    docLink: 'https://docs.synthetix.io/v3/synthetix-v3',
  },
  {
    title: 'Treasury Council',
    slug: 'treasury',
    image: '/councils/tc.svg',
    address: getCouncilContract('treasury').address,
    description:
      "The Treasury Council, established via SIP 155, provides resources for the protocol's growth and expansion. This includes managing the treasury in a way that allows continuity of funding for protocol costs (on-chain/off-chain), council and Core Contributor Stipends, ecosystem incentives, including Grants Council funding, and other discretionary incentives. The members of the council manage the treasury through a gnosis-safe multi-sig.",
    stipends: '2,000 SNX',
    docLink: 'https://docs.synthetix.io/v3/synthetix-v3',
  },
];

export type Council = (typeof councils)[number];

export type CouncilSlugs = 'spartan' | 'ambassador' | 'treasury';

export default councils;
