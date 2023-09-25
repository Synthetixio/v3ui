import { ethers, utils } from 'ethers';
import { useCallback } from 'react';
import { ERC7412_ABI } from '@snx-v3/withERC7412';

export type ContractErrorType = {
  data: string;
  name: string;
  signature: string;
  args: Record<string, any>;
};

export function useContractErrorParser(Contract?: ethers.Contract) {
  return useCallback(
    (error: any): ContractErrorType | undefined => {
      if (!Contract) {
        return undefined;
      }
      try {
        const errorData = error?.error?.data?.data || error?.error?.error?.data; // add more options as we find them
        if (!errorData) {
          console.error({ error }); // intentional logging as object so we can inspect all properties
          return undefined;
        }

        const contractAbi = Contract.interface.format(utils.FormatTypes.full) as string[];
        const newContract = new ethers.Contract(
          Contract.address,
          Array.from(new Set(contractAbi.concat(ERC7412_ABI))), // uniq
          Contract.signer || Contract.provider
        );
        const errorParsed = newContract.interface.parseError(errorData);
        const errorArgs = Object.fromEntries(
          Object.entries(errorParsed.args)
            .filter(([key]) => `${parseInt(key)}` !== key)
            .map(([key, value]) => {
              if (value instanceof ethers.BigNumber) {
                // Guess wei
                const unwei = parseFloat(ethers.utils.formatEther(value.toString()));
                if (unwei > 0.001) {
                  // must be wei
                  return [key, unwei];
                }

                // Guess date
                if (
                  value.toNumber() > new Date(2000, 1, 1).getTime() / 1000 &&
                  value.toNumber() < new Date(2100, 1, 1).getTime() / 1000
                ) {
                  return [key, new Date(value.toNumber() * 1000)];
                }

                // Just a number
                return [key, parseFloat(value.toString())];
              }

              // Not a number
              return [key, value];
            })
        );

        return {
          data: errorData,
          name: errorParsed.name,
          signature: errorParsed.signature,
          args: errorArgs,
        };
      } catch (e) {
        console.error(e);
        return undefined;
      }
    },
    [Contract]
  );
}
