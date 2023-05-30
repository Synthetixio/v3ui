/* eslint-disable react/display-name */
import { TextEncoder, TextDecoder } from 'util';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// jest.mock('../assets/svg/app/loader.svg', () => () => null);
