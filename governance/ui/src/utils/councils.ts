const councils: {
  title: string;
  slug: CouncilSlugs;
  image: string;
  address: string;
}[] = [
  {
    title: 'Spartan Council',
    slug: 'spartan',
    image: '/councils/sc.svg',
    address: '0xE832C302D1160EAe57045eb9d9Ea14daBd2E229c',
  },
  {
    title: 'Grants Council',
    slug: 'grants',
    image: '/councils/gc.svg',
    address: '0x6891FfAA59c0Ce04b4E3C6eaa50CFc5E2fc77b77',
  },
  {
    title: 'Ambassador Council',
    slug: 'ambassador',
    image: '/councils/ac.svg',
    address: '0x37fAc8c146889333734015B0C942b620aCfeeff8',
  },
  {
    title: 'Treasury Council',
    slug: 'treasury',
    image: '/councils/tc.svg',
    address: '0x6cC6050bE3214D14DB46188e5df59bDEAE97a42a',
  },
];

export type Council = (typeof councils)[number];

type CouncilSlugs = 'spartan' | 'grants' | 'ambassador' | 'treasury';

export default councils;
