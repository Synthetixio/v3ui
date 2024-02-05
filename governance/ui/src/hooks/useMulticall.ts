import { useCallback } from 'react';
import { useProvider, useWallet } from '@snx-v3/useBlockchain';
import { BigNumber, Transaction, ethers } from 'ethers';
import { multicallInterface } from '../utils/abi';

const multicallAddress = '0xE2C5658cC5C448B48141168f3e475dF8f65A1e3e';

export const useMulticall = () => {
  const provider = useProvider();
  const wallet = useWallet();

  const makeMulticall = useCallback(
    async (calls: Transaction[]) => {
      const encodedData = multicallInterface.encodeFunctionData('aggregate3Value', [
        calls.map((call) => ({
          target: call.to,
          callData: call.data,
          value: call.value || ethers.BigNumber.from(0),
          requireSuccess: true,
        })),
      ]);

      let totalValue = ethers.BigNumber.from(0);

      for (const call of calls) {
        totalValue = totalValue.add(call.value || ethers.BigNumber.from(0));
      }

      let gas = BigNumber.from(1000);

      try {
        gas = await provider.estimateGas({
          to: multicallAddress,
          data: encodedData,
          value: totalValue,
        });
      } catch (error) {
        console.error(error);
      }

      return {
        from: wallet?.address,
        to: multicallAddress,
        data: encodedData,
        value: totalValue,
        gasLimit: gas.mul(11).div(10),
      } as Transaction;
    },
    [provider, wallet?.address]
  );

  return {
    makeMulticall,
  };
};
