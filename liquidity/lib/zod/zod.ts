import { BigNumber } from 'ethers';
import { z } from 'zod';
import { wei } from '@synthetixio/wei';

export const ZodBigNumber = z.custom<BigNumber>((val) => BigNumber.isBigNumber(val));

export const SmallIntSchema = ZodBigNumber.transform((x) => wei(x, 0).toNumber());
export const WeiSchema = ZodBigNumber.transform((x) => wei(x));
