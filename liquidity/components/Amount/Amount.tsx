import { useMemo } from 'react';
import { currency } from '@snx-v3/format';
import Wei, { wei } from '@synthetixio/wei';
import { constants } from 'ethers';
import { Tooltip } from '@snx-v3/Tooltip';

export function Amount({
  value,
  prefix = '',
  suffix = '',
  'data-testid': testid,
  showTooltip,
}: {
  prefix?: string;
  value?: Wei;
  suffix?: string;
  'data-testid'?: string;
  showTooltip?: boolean;
}) {
  const { formattedValue, preciseValue, isMaxUint } = useMemo(() => {
    if (!value) {
      return { formattedValue: '-', preciseValue: '-' };
    }

    const formattedValue = currency(value);
    const cleanNumber = wei(formattedValue.replaceAll(',', ''));

    return {
      isMaxUint: wei(constants.MaxInt256).lte(value),
      formattedValue,
      preciseValue: value.eq(cleanNumber) ? formattedValue : value.toString(),
    };
  }, [value]);

  return (
    <Tooltip
      label={
        <>
          {isMaxUint ? (
            'You cannot borrow sUSD against this collateral'
          ) : (
            <>
              {prefix}
              {preciseValue}
              {suffix}
            </>
          )}
        </>
      }
      isDisabled={formattedValue === preciseValue || !showTooltip}
    >
      <span data-testid={testid}>
        {prefix}
        {isMaxUint ? 'Infinite' : formattedValue}
        {!isMaxUint && suffix}
      </span>
    </Tooltip>
  );
}
