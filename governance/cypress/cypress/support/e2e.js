import '@cypress/code-coverage/support';
import { ethers } from 'ethers';
import { metamask } from '../lib/metamask';

beforeEach(() => {
  cy.intercept('https://analytics.synthetix.io/matomo.js', { statusCode: 204 }).as('matomo');

  [
    'mainnet',
    'sepolia',
    'optimism-mainnet',
    'optimism-sepolia',
    'base-mainnet',
    'base-sepolia',
    'arbitrum-mainnet',
    'arbitrum-sepolia',
  ].forEach((networkName) => {
    cy.intercept(`https://${networkName}.infura.io/v3/*`, (req) => {
      req.url = 'http://127.0.0.1:8545';
      req.continue();
    }).as(networkName);
  });

  cy.on('window:before:load', async (win) => {
    win.sessionStorage.setItem('TERMS_CONDITIONS_ACCEPTED', 'true');
    win.localStorage.setItem(
      'DEFAULT_NETWORK',
      `${Cypress.env('CHAIN_ID')}-${Cypress.env('PRESET')}`
    );
    win.localStorage.setItem('UNSAFE_IMPORT', 'true');
    win.localStorage.setItem('connectedWallets', '"MetaMask"');
    win.localStorage.setItem('CONTRACT_ERROR_OPEN', 'true');
  });
});

Cypress.Commands.add('connectWallet', (namespace = 'wallet') => {
  const wallet = new ethers.Wallet(
    '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'
  );
  const privateKey = wallet.privateKey;
  const address = wallet.address;
  cy.on('window:before:load', (win) => {
    win.ethereum = metamask({ privateKey, address });
  });

  return cy.wrap(wallet).as(namespace);
});
