const MAIN_NET_URL = `https://api.boardroom.info`;

const BASE_URL = MAIN_NET_URL;

// POST
export const BOARDROOM_SIGNIN_API_URL = `${BASE_URL}/v1/siwe/signIn?key=${process.env.NEXT_PUBLIC_BOARDROOM_KEY}`;
// POST
export const BOARDROOM_SIGNOUT_API_URL = `${BASE_URL}/v1/siwe/signOut?key=${process.env.NEXT_PUBLIC_BOARDROOM_KEY}`;
// POST
export const NONCE_API_URL = `${BASE_URL}/v1/siwe/nonce?key=${process.env.NEXT_PUBLIC_BOARDROOM_KEY}`;
// POST
export const VALID_UUID_API_URL = `${BASE_URL}/v1/siwe/me?key=${process.env.NEXT_PUBLIC_BOARDROOM_KEY}`;
// POST
export const GET_USER_DETAILS_API_URL = (address: string) =>
  `${BASE_URL}/v1/userDetails/${address}?key=${process.env.NEXT_PUBLIC_BOARDROOM_KEY}`;
// POST
export const GET_BATCH_USER_DETAILS_API_URL = (addresses: string) =>
  `${BASE_URL}/v1/batchUserDetails?addresses=${addresses}&key=${process.env.NEXT_PUBLIC_BOARDROOM_KEY}`;
// GET
export const GET_USER_PITCH_FOR_PROTCOL_API_URL = (protocol: string, address: string) =>
  `${BASE_URL}/v1/getDelegationPitch/${protocol}/${address}?key=${process.env.NEXT_PUBLIC_BOARDROOM_KEY}`;
// GET
export const GET_PITCHES_FOR_PROTOCOL_API_URL = (protocol: string) =>
  `${BASE_URL}/v1/getDelegationPitchesByProtocol/${protocol}?key=${process.env.NEXT_PUBLIC_BOARDROOM_KEY}`;
// GET
export const GET_PITCHES_FOR_USER_API_URL = (address: string, randomNumber: number) =>
  `${BASE_URL}/v1/getDelegationPitchesByAddress/${address}?${randomNumber}&key=${process.env.NEXT_PUBLIC_BOARDROOM_KEY}`;
// POST
export const UPDATE_USER_DETAILS_API_URL = (address: string) =>
  `${BASE_URL}/v1/updateUserDetails/${address}?key=${process.env.NEXT_PUBLIC_BOARDROOM_KEY}`;
// POST
export const UPDATE_USER_PITCH_FOR_PROTOCOL = `${BASE_URL}/v1/updateDelegationPitch?key=${process.env.NEXT_PUBLIC_BOARDROOM_KEY}`;
