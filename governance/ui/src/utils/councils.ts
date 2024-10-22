const councils: {
  title: string;
  slug: CouncilSlugs;
  seats: number;
  image: string;
  description: string;
  stipends: string;
  docLink: string;
}[] = [
  {
    title: 'Treasury Seat',
    slug: 'treasury',
    seats: 1,
    image: '/councils/treasury.svg',
    description:
      'The Treasury Seat manages protocol-owned assets and oversees financial stability, serving as a required signer for all Treasury-related proposals and transactions.',
    stipends: '2,000 SNX',
    docLink: 'https://docs.synthetix.io/dao/governance-framework/spartan-council',
  },
  {
    title: 'Advisory Seats',
    slug: 'advisory',
    seats: 3,
    image: '/councils/advisory.svg',
    description:
      "The Advisory Seats provide expert guidance and diverse perspectives to the council, offering insights on various aspects of the protocol's governance, development, and ecosystem growth.",
    stipends: '2,000 SNX',
    docLink: 'https://docs.synthetix.io/dao/governance-framework/ambassador-council',
  },
  {
    title: 'Strategy Seats',
    slug: 'strategy',
    seats: 3,
    image: '/councils/strategy.svg',
    description:
      "The Strategy Seat drives Synthetix's long-term vision and high-level decision-making for growth. The Technical Seat oversees protocol development, ensuring security and evaluating proposals. The Ops Seat manages daily operations, coordinating teams to execute initiatives efficiently.",
    stipends: '2,000 SNX',
    docLink: 'https://docs.synthetix.io/dao/governance-framework/treasury-council',
  },
];

export type Council = (typeof councils)[number];

export type CouncilSlugs = 'treasury' | 'advisory' | 'strategy';

export default councils;
