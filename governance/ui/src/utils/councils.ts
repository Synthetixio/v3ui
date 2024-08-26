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
      "The Spartan Council is Synthetix's main governing body. It votes on SIPs and SCCPs, conducts interviews, debates changes, coordinates with core contributors, and hosts community governance meetings.",
    stipends: '2,000 SNX',
    docLink: 'https://docs.synthetix.io/dao/governance-framework/spartan-council',
  },
  {
    title: 'Ambassador Council',
    slug: 'ambassador',
    image: '/councils/ac.svg',
    address: getCouncilContract('ambassador').address,
    description:
      'The Ambassador Council advocates for Synthetix in DeFi through governance and partnerships. They gain influence in key protocols, vote on proposals, and assist integrators in joining the Synthetix ecosystem.',
    stipends: '2,000 SNX',
    docLink: 'https://docs.synthetix.io/dao/governance-framework/ambassador-council',
  },
  {
    title: 'Treasury Council',
    slug: 'treasury',
    image: '/councils/tc.svg',
    address: getCouncilContract('treasury').address,
    description:
      "The Treasury Council's main role is to fund the protocol's growth and operations. This includes managing treasury resources for costs, stipends, ecosystem incentives, and grants. The council members manage the treasury via a Gnosis-safe multi-sig.",
    stipends: '2,000 SNX',
    docLink: 'https://docs.synthetix.io/dao/governance-framework/treasury-council',
  },
];

export type Council = (typeof councils)[number];

export type CouncilSlugs = 'spartan' | 'ambassador' | 'treasury';

export default councils;
