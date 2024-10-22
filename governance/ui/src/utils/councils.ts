import { getCouncilContract } from './contracts';

const councils: {
  title: string;
  slug: CouncilSlugs;
  seats: number;
  image: string;
  address: string;
  description: string;
  stipends: string;
  docLink: string;
}[] = [
  {
    title: 'Treasury Seat',
    slug: 'treasury',
    seats: 1,
    image: '/councils/treasury.svg',
    address: getCouncilContract('treasury').address,
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
    address: getCouncilContract('advisory').address,
    description:
      "The Advisory Seats provide expert guidance and diverse perspectives to the council, offering insights on various aspects of the protocol's governance, development, and ecosystem growth.",
    stipends: '2,000 SNX',
    docLink: 'https://docs.synthetix.io/dao/governance-framework/ambassador-council',
  },
  {
    title: 'Strategy, Technical & Ops Seats',
    slug: 'strategy',
    seats: 3,
    image: '/councils/strategy.svg',
    address: getCouncilContract('strategy').address,
    description:
      "The Strategy Seat drives Synthetix's long-term vision and high-level decision-making for growth. The Technical Seat oversees protocol development, ensuring security and evaluating proposals. The Ops Seat manages daily operations, coordinating teams to execute initiatives efficiently.",
    stipends: '2,000 SNX',
    docLink: 'https://docs.synthetix.io/dao/governance-framework/treasury-council',
  },
];

export type Council = (typeof councils)[number];

export type CouncilSlugs = 'treasury' | 'advisory' | 'strategy';

export const calculateNextEpoch = (
  schedule?: {
    startDate: number;
    nominationPeriodStartDate: number;
    votingPeriodStartDate: number;
    endDate: number;
  },
  nextEpochDuration?: number
) => {
  if (nextEpochDuration) {
    const startDay = schedule?.endDate && new Date(schedule?.endDate * 1000).getUTCDate();
    const startMonth =
      schedule?.endDate &&
      new Date(schedule.endDate * 1000).toLocaleString('default', { month: 'short' });
    const startYear = schedule?.endDate && new Date(schedule.endDate * 1000).getUTCFullYear();

    const endDay =
      schedule?.endDate &&
      nextEpochDuration &&
      new Date(schedule.endDate * 1000 + nextEpochDuration * 1000).getUTCDate();
    const endMonth =
      schedule?.endDate &&
      nextEpochDuration &&
      new Date(schedule.endDate * 1000 + nextEpochDuration * 1000).toLocaleString('default', {
        month: 'short',
      });
    const endYear =
      schedule?.endDate &&
      nextEpochDuration &&
      new Date(schedule.endDate * 1000 + nextEpochDuration * 1000).getUTCFullYear();

    const startQuarter =
      schedule?.endDate && Math.floor(new Date(schedule.endDate * 1000).getMonth() / 3 + 1);

    const endQuarter =
      schedule?.endDate &&
      nextEpochDuration &&
      Math.floor(new Date(schedule.endDate * 1000 + nextEpochDuration * 1000).getMonth() / 3 + 1);

    return {
      quarter:
        startYear === endYear && startQuarter === endQuarter
          ? `Q${startQuarter} ${startYear}`
          : startYear === endYear
            ? `Q${startQuarter} - ${endYear}`
            : `Q${startQuarter} ${startYear} - Q${endQuarter} ${endYear}`,
      startDay,
      endDay,
      startMonth,
      endMonth,
      startYear,
      endYear,
    };
  }

  const startDay = schedule?.startDate && new Date(schedule?.startDate * 1000).getUTCDate();
  const startMonth =
    schedule?.startDate &&
    new Date(schedule.startDate * 1000).toLocaleString('default', { month: 'short' });
  const startYear = schedule?.startDate && new Date(schedule.startDate * 1000).getUTCFullYear();

  const endDay = schedule?.endDate && new Date(schedule.endDate * 1000).getUTCDate();
  const endMonth =
    schedule?.endDate &&
    new Date(schedule.endDate * 1000).toLocaleString('default', {
      month: 'short',
    });
  const endYear = schedule?.endDate && new Date(schedule.endDate * 1000).getUTCFullYear();

  const startQuarter =
    schedule?.endDate && Math.floor(new Date(schedule.endDate * 1000).getMonth() / 3 + 1);

  const endQuarter =
    schedule?.endDate && Math.floor(new Date(schedule.endDate * 1000).getMonth() / 3 + 1);

  return {
    quarter:
      startYear === endYear && startQuarter === endQuarter
        ? `Q${startQuarter} ${startYear}`
        : startYear === endYear
          ? `Q${startQuarter} - ${endYear}`
          : `Q${startQuarter} ${startYear} - Q${endQuarter} ${endYear}`,
    startDay,
    endDay,
    startMonth,
    endMonth,
    startYear,
    endYear,
  };
};

export default councils;
