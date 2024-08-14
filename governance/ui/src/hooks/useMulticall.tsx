import { Contract } from 'ethers';
import { multicallABI } from '../utils/abi';

export const useMulticall = () => {
  const multicall = new Contract('0xE2C5658cC5C448B48141168f3e475dF8f65A1e3e', multicallABI);
  return multicall;
};
