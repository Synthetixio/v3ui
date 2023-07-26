const councils = [
  {
    title: 'Spartan Council',
    slug: 'spartan',
    image: '/councils/sc.svg',
  },
  {
    title: 'Grants Council',
    slug: 'grants',
    image: '/councils/gc.svg',
  },
  {
    title: 'Ambassador Council',
    slug: 'ambassador',
    image: '/councils/ac.svg',
  },
  {
    title: 'Treasury Council',
    slug: 'treasury',
    image: '/councils/tc.svg',
  },
];

export type Council = (typeof councils)[number];

export default councils;
