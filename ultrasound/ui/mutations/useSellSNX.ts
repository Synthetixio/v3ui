import { useMutation } from '@tanstack/react-query';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { useUSDProxy } from '@snx-v3/useUSDProxy';
import { useSpotMarketProxy } from '@snx-v3/useSpotMarketProxy';
import Wei from '@synthetixio/wei';
import { Contract, constants, utils } from 'ethers';
import { getGasPrice } from '@snx-v3/useGasPrice';
import { useNetwork, useProvider, useSigner } from '@snx-v3/useBlockchain';
import { useCollateralPriceUpdates } from '@snx-v3/useCollateralPriceUpdates';
import { withERC7412 } from '@snx-v3/withERC7412';
import { formatGasPriceForTransaction } from '@snx-v3/useGasOptions';
import { useGasSpeed } from '@snx-v3/useGasSpeed';

const BuyBack = new Contract('0x632cAa10A56343C5e6C0c066735840c096291B18', [
  'function processBuyback(uint256 snxAmount) external',
]);

export function useSellSNX() {
  const { data: CoreProxy } = useCoreProxy();
  const { data: UsdProxy } = useUSDProxy();
  const { data: SpotProxy } = useSpotMarketProxy();
  const provider = useProvider();
  const { data: priceUpdateTx } = useCollateralPriceUpdates();
  const { network } = useNetwork();
  const signer = useSigner();
  const { gasSpeed } = useGasSpeed();

  return useMutation({
    mutationKey: ['sell-snx'],
    mutationFn: async (amount: Wei) => {
      const gasPricesPromised = getGasPrice({ provider });

      const sellSNX = BuyBack.connect(signer).populateTransaction.processBuyback(amount.toBN());

      const snxUSDApproval = UsdProxy?.populateTransaction.approve(
        SpotProxy.address,
        amount.toBN()
      );

      const buy_SUSD = SpotProxy.populateTransaction.buy(
        1,
        amount.toBN(),
        0,
        constants.AddressZero
      );

      const unwrapTxnPromised = SpotProxy.populateTransaction.unwrap(
        1,
        amount.toBN(),
        //2% slippage
        Number(
          utils.formatUnits(amount.toBN().mul(98).div(100).toString(), 12).toString()
        ).toFixed()
      );
      const [gasPrices, sellSNX_Txn, sUSDCApproval_Txn, buy_SUSD_Txn, unwrapTxn] =
        await Promise.all([
          gasPricesPromised,
          sellSNX,
          snxUSDApproval,
          buy_SUSD,
          unwrapTxnPromised,
        ]);

      const allCalls = [sellSNX_Txn, sUSDCApproval_Txn, buy_SUSD_Txn, unwrapTxn];

      if (priceUpdateTx) {
        allCalls.unshift(priceUpdateTx as any);
      }

      const erc7412Tx = await withERC7412(network, allCalls, 'useWithdraw', CoreProxy.interface);

      const gasOptionsForTransaction = formatGasPriceForTransaction({
        gasLimit: erc7412Tx.gasLimit,
        gasPrices,
        gasSpeed,
      });

      const txn = await signer.sendTransaction({ ...erc7412Tx, ...gasOptionsForTransaction });
      await txn.wait();
    },
  });
}
