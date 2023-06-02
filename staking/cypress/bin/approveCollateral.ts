#!/usr/bin/env ts-node

// @ts-ignore
import { approveCollateral } from '../cypress/tasks/approveCollateral';
const [privateKey, symbol] = process.argv.slice(2);
if (!privateKey || !symbol) {
  throw new Error('Usage: ./approveCollateral.ts <privateKey> <symbol>');
}
approveCollateral({ privateKey, symbol });
