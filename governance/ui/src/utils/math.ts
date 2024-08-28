import { BigNumber } from 'ethers';

export function sqrt(value?: BigNumber): BigNumber {
  if (!value) return BigNumber.from(0);
  if (value.isZero()) {
    return BigNumber.from(0);
  }

  let z: BigNumber = value;
  let x: BigNumber = value.add(BigNumber.from(1)).div(BigNumber.from(2));

  while (x.lt(z)) {
    z = x;
    x = value.div(x).add(x).div(BigNumber.from(2));
  }

  return z;
}
