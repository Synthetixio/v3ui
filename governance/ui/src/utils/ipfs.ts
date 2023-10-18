import { create } from 'ipfs-http-client';

const projectId = process.env.IPFS_INFURA_KEY;
const projectSecret = process.env.IPFS_INFURA_SECRET;
const authorization = 'Basic ' + btoa(projectId + ':' + projectSecret);

export const ipfs = create({
  url: 'https://ipfs.infura.io:5001',
  headers: {
    authorization,
  },
});
