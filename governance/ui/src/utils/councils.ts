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
    title: 'Spartan Council',
    slug: 'spartan',
    seats: 8,
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
    seats: 5,
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
    seats: 4,
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
