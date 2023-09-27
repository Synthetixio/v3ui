// import { useCollateralPrices } from '@snx-v3/useCollateralPrices';
import { useLiquidityPositions } from '@snx-v3/useLiquidityPositions';
import { useParams } from '@snx-v3/useParams';

export const ERC7412TesterPage = () => {
  const { accountId } = useParams();
  // const x = useCollateralPrices();
  const x = useLiquidityPositions({ accountId });

  console.log(x.error);
  console.log(x.data);
  return (
    <pre>
      <code>{JSON.stringify(x.data, null, 4)}</code>
    </pre>
  );
};
