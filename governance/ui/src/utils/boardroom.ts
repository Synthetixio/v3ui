import { getAddress } from 'ethers/lib/utils';
// 'https://api.boardroom.info';
const MAIN_NET_URL = 'https://staging-api.boardroom.info/';
const STAGING_URL = 'https://staging-api.boardroom.info/';

const BASE_URL = window.location.hostname === 'localhost' ? STAGING_URL : MAIN_NET_URL;

const BOARDROOM_KEY = 'd9abe7a1ab45ace58e6bd91bb9771586';

// POST
export const BOARDROOM_SIGNIN_API_URL = `${BASE_URL}/v1/siwe/signIn?key=${BOARDROOM_KEY}`;
// POST
export const BOARDROOM_SIGNOUT_API_URL = `${BASE_URL}/v1/siwe/signOut?key=${BOARDROOM_KEY}`;
// POST
export const NONCE_API_URL = `${BASE_URL}/v1/siwe/nonce?key=${BOARDROOM_KEY}`;
// POST
export const VALID_UUID_API_URL = `${BASE_URL}/v1/siwe/me?key=${BOARDROOM_KEY}`;
// POST
export const GET_USER_DETAILS_API_URL = (address: string) =>
  `${BASE_URL}/v1/userDetails/${getAddress(address)}?key=${BOARDROOM_KEY}`;
// POST
export const GET_BATCH_USER_DETAILS_API_URL = (addresses: string) =>
  `${BASE_URL}/v1/batchUserDetails?addresses=${addresses}&key=${BOARDROOM_KEY}`;
// GET
export const GET_USER_PITCH_FOR_PROTCOL_API_URL = (protocol: string, address: string) =>
  `${BASE_URL}/v1/getDelegationPitch/${protocol}/${getAddress(address)}?key=${BOARDROOM_KEY}`;
// GET
export const GET_PITCHES_FOR_PROTOCOL_API_URL = (protocol: string) =>
  `${BASE_URL}/v1/getDelegationPitchesByProtocol/${protocol}?key=${BOARDROOM_KEY}`;
// GET
export const GET_PITCHES_FOR_USER_API_URL = (address: string, randomNumber: number) =>
  `${BASE_URL}/v1/getDelegationPitchesByAddress/${getAddress(
    address
  )}?${randomNumber}&key=${BOARDROOM_KEY}`;
// POST
export const UPDATE_USER_DETAILS_API_URL = (address: string) =>
  `${BASE_URL}/v1/updateUserDetails/${getAddress(address)}?key=${BOARDROOM_KEY}`;
// POST
export const UPDATE_USER_PITCH_FOR_PROTOCOL = `${BASE_URL}/v1/updateDelegationPitch?key=${'d9abe7a1ab45ace58e6bd91bb9771586'}`;
