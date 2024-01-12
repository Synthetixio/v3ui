import { getCouncilContract } from './contracts';

const councils: {
  title: string;
  slug: CouncilSlugs;
  image: string;
  address: string;
  description: string;
  stipends: string;
}[] = [
  {
    title: 'Spartan Council',
    slug: 'spartan',
    image: '/councils/sc.svg',
    address: getCouncilContract('spartan').address,
    description: 'Lorem Ipsum',
    stipends: '2,000 SNX',
  },
  {
    title: 'Grants Council',
    slug: 'grants',
    image: '/councils/gc.svg',
    address: getCouncilContract('grants').address,
    description: 'Lorem Ipsum',
    stipends: '2,000 SNX',
  },
  {
    title: 'Ambassador Council',
    slug: 'ambassador',
    image: '/councils/ac.svg',
    address: getCouncilContract('ambassador').address,
    description: 'Lorem Ipsum',
    stipends: '2,000 SNX',
  },
  {
    title: 'Treasury Council',
    slug: 'treasury',
    image: '/councils/tc.svg',
    address: getCouncilContract('treasury').address,
    description: 'Lorem Ipsum',
    stipends: '2,000 SNX',
  },
];

export type Council = (typeof councils)[number];

export type CouncilSlugs = 'spartan' | 'grants' | 'ambassador' | 'treasury';

export default councils;
