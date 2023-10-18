#!/usr/bin/env ts-node

// @ts-ignore
import { getSnx } from '../cypress/tasks/getSnx';
const [address, amount] = process.argv.slice(2);
if (!address || !amount) {
  throw new Error('Usage: ./getSnx.ts <address> <amount>');
}
getSnx({ address, amount: parseFloat(amount) });
