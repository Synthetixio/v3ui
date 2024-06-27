import '@cypress/code-coverage/support';
import { onLogAdded } from '@snx-cy/onLogAdded';
import { ethers } from 'ethers';
import { metamask } from '../lib/metamask';
import { subgraph } from '../lib/subgraph';

beforeEach(() => {
  cy.on('log:added', onLogAdded);

  cy.intercept('https://analytics.synthetix.io/matomo.js', { statusCode: 204 }).as('matomo');

  // Because we are working with local fork, subgraph becomes irrelevant
  cy.intercept('https://api.thegraph.com/**', (req) => {
    return subgraph(req);
  }).as('subgraph');

  cy.intercept('https://subgraph.satsuma-prod.com/**', (req) => {
    return subgraph(req);
  }).as('subgraph');

  [
    'mainnet',
    'optimism-mainnet',
    'base-mainnet',
    'sepolia',
    'base-sepolia',
    'arbitrum-mainnet',
    'arbitrum-sepolia',
  ].forEach((networkName) => {
    cy.intercept(`https://${networkName}.infura.io/v3/**`, (req) => {
      req.url = 'http://127.0.0.1:8545';
      req.continue();
    }).as(networkName);
  });

  cy.on('window:before:load', (win) => {
    win.sessionStorage.setItem('TERMS_CONDITIONS_ACCEPTED', 'true');
    win.localStorage.setItem(
      'DEFAULT_NETWORK',
      `${Cypress.env('CHAIN_ID')}-${Cypress.env('PRESET')}`
    );
    win.localStorage.setItem('UNSAFE_IMPORT', 'true');
    win.localStorage.setItem('connectedWallets', '"MetaMask"');
    win.localStorage.setItem('CONTRACT_ERROR_OPEN', 'true');
    win.localStorage.setItem('DEBUG', 'true');
  });
});

Cypress.Commands.add('connectWallet', (namespace = 'wallet') => {
  const wallet = ethers.Wallet.createRandom();
  const privateKey = wallet.privateKey;
  const address = wallet.address;
  cy.on('window:before:load', (win) => {
    win.ethereum = metamask({ chainId: Cypress.env('CHAIN_ID'), privateKey, address });
  });

  return cy.wrap(wallet).as(namespace);
});
