import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { useMutation } from '@tanstack/react-query';
import { useNetwork, useProvider, useSigner } from '@snx-v3/useBlockchain';
import { BigNumber, Contract, PopulatedTransaction, constants } from 'ethers';
import { formatGasPriceForTransaction } from '@snx-v3/useGasOptions';
import { getGasPrice } from '@snx-v3/useGasPrice';
import { useGasSpeed } from '@snx-v3/useGasSpeed';
import { useAllCollateralPriceIds } from '@snx-v3/useAllCollateralPriceIds';
import { fetchPriceUpdates, priceUpdatesToPopulatedTx } from '@snx-v3/fetchPythPrices';
import { withERC7412 } from '@snx-v3/withERC7412';
import { Wei } from '@synthetixio/wei';
import { USDC_BASE_MARKET, isBaseAndromeda } from '@snx-v3/isBaseAndromeda';
import { LiquidityPosition } from '@snx-v3/useLiquidityPosition';
import { useSpotMarketProxy } from '@snx-v3/useSpotMarketProxy';
import { notNil } from '@snx-v3/tsHelpers';
import { approveAbi } from '@snx-v3/useApprove';
import { useUSDProxy } from '@snx-v3/useUSDProxy';
import { useGetUSDTokens } from '@snx-v3/useGetUSDTokens';

export const useClosePosition = ({
  accountId,
  collateralTypeAddress,
  poolId,
  liquidityPosition,
  accountCollateral,
}: {
  poolId: string;
  accountId?: string;
  collateralTypeAddress?: string;
  liquidityPosition: LiquidityPosition;
  accountCollateral?: Wei;
}) => {
  const { data: CoreProxy } = useCoreProxy();
  const { data: SpotMarketProxy } = useSpotMarketProxy();
  const { data: UsdProxy } = useUSDProxy();
  const { data: collateralPriceIds } = useAllCollateralPriceIds();
  const { network } = useNetwork();
  const { data: usdTokens } = useGetUSDTokens();

  const { gasSpeed } = useGasSpeed();
  const signer = useSigner();
  const provider = useProvider();

  const mutation = useMutation({
    mutationFn: async () => {
      if (!signer || !network || !provider) throw new Error('No signer or network');
      if (
        !(
          CoreProxy &&
          UsdProxy &&
          accountCollateral &&
          collateralTypeAddress &&
          collateralPriceIds &&
          accountId &&
          liquidityPosition &&
          usdTokens?.sUSD
        )
      )
        return;

      const walletAddress = await signer.getAddress();

      try {
        const gasPricesPromised = getGasPrice({ provider });

        const undelegatePromise = CoreProxy.populateTransaction.delegateCollateral(
          BigNumber.from(accountId),
          BigNumber.from(poolId),
          collateralTypeAddress,
          new Wei(0).toBN(),
          new Wei(1).toBN()
        );

        let debtTransactions: Promise<PopulatedTransaction[]> | undefined = undefined;
        if (liquidityPosition.debt.lt(0)) {
          if (isBaseAndromeda(network.id, network.preset)) {
            debtTransactions = Promise.all([
              CoreProxy.populateTransaction.mintUsd(
                accountId,
                poolId,
                collateralTypeAddress,
                liquidityPosition.debt.abs().toBN()
              ),
              undelegatePromise,
            ]);
          } else {
            debtTransactions = Promise.all([
              CoreProxy.populateTransaction.claimRewards(
                BigNumber.from(accountId),
                BigNumber.from(poolId),
                collateralTypeAddress,
                constants.AddressZero
              ),
              undelegatePromise,
            ]);
          }
        } else {
          if (isBaseAndromeda(network.id, network.preset)) {
            if (SpotMarketProxy) {
              const needsWrapping = accountCollateral?.lt(liquidityPosition.debt);
              const amountToWrap = new Wei(liquidityPosition.debt.toString(), 6).toBN();
              const debtBNAbs = liquidityPosition.debt.abs().toBN();
              // USDC => sUSDC
              const wrap = needsWrapping
                ? SpotMarketProxy.populateTransaction.wrap(USDC_BASE_MARKET, amountToWrap, 0)
                : undefined;

              const sUSDC_ADDRESS = usdTokens.sUSD;
              const sUSDC_Contract = new Contract(sUSDC_ADDRESS, approveAbi, signer);

              const sUSDC_Approval = needsWrapping
                ? sUSDC_Contract.populateTransaction.approve(SpotMarketProxy.address, amountToWrap)
                : undefined;

              // sell sUSDC => sUSD
              const sell = needsWrapping
                ? SpotMarketProxy.populateTransaction.sell(
                    USDC_BASE_MARKET,
                    amountToWrap,
                    0,
                    constants.AddressZero
                  )
                : undefined;

              // approve sUSD to Core
              const sUSD_Contract = new Contract(UsdProxy.address, approveAbi, signer);

              const sUSD_Approval = needsWrapping
                ? sUSD_Contract.populateTransaction.approve(CoreProxy.address, debtBNAbs)
                : undefined;

              // Only deposit if user doesn't have enough sUSD collateral
              const deposit = needsWrapping
                ? undefined
                : CoreProxy.populateTransaction.deposit(
                    BigNumber.from(accountId),
                    UsdProxy.address,
                    debtBNAbs
                  );

              const burn = CoreProxy.populateTransaction.burnUsd(
                BigNumber.from(accountId),
                BigNumber.from(poolId),
                collateralTypeAddress,
                debtBNAbs
              );

              debtTransactions = Promise.all(
                [
                  wrap,
                  sUSDC_Approval,
                  sell,
                  sUSD_Approval,
                  deposit,
                  burn,
                  undelegatePromise,
                ].filter(notNil)
              );
            }
          } else {
            const deposit = accountCollateral.lt(liquidityPosition.debt)
              ? undefined
              : CoreProxy.populateTransaction.deposit(
                  BigNumber.from(accountId),
                  UsdProxy.address,
                  liquidityPosition.debt.toBN()
                );

            const burn = CoreProxy.populateTransaction.burnUsd(
              BigNumber.from(accountId),
              BigNumber.from(poolId),
              collateralTypeAddress,
              liquidityPosition.debt.toBN()
            );

            debtTransactions = Promise.all([deposit, burn, undelegatePromise].filter(notNil));
          }
        }

        const collateralPriceCallsPromise = fetchPriceUpdates(
          collateralPriceIds,
          network.isTestnet
        ).then((signedData) =>
          priceUpdatesToPopulatedTx(walletAddress, collateralPriceIds, signedData)
        );

        const [gasPrices, txs, collateralPriceCalls] = await Promise.all([
          gasPricesPromised,
          debtTransactions,
          collateralPriceCallsPromise,
        ]);
        const allCalls = txs ? collateralPriceCalls.concat(txs) : collateralPriceCalls;

        const erc7412Tx = await withERC7412(
          network,
          allCalls,
          'useClosePosition',
          CoreProxy.interface
        );

        const gasOptionsForTransaction = formatGasPriceForTransaction({
          gasLimit: erc7412Tx.gasLimit,
          gasPrices,
          gasSpeed,
        });

        const txn = await signer.sendTransaction({ ...erc7412Tx, ...gasOptionsForTransaction });
        await txn.wait();
      } catch (error: any) {
        throw error;
      }
    },
  });
  return {
    mutation,
    isLoading: mutation.isPending,
    exec: mutation.mutateAsync,
  };
};
