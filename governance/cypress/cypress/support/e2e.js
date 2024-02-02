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

  ['sepolia'].forEach((networkName) => {
    cy.intercept(`https://${networkName}.infura.io/v3/*`, (req) => {
      req.url = 'http://127.0.0.1:8545';
      req.continue();
    }).as(networkName);
  });

  cy.on('window:before:load', async (win) => {
    const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
    const network = await provider.getNetwork();
    win.localStorage.setItem('DEFAULT_NETWORK', `${network.chainId}-main`);
    win.localStorage.setItem('UNSAFE_IMPORT', 'true');
    win.localStorage.setItem('connectedWallets', '["MetaMask"]');
    win.localStorage.setItem('CONTRACT_ERROR_OPEN', 'true');
  });
});

Cypress.Commands.add('connectWallet', (namespace = 'wallet') => {
  const wallet = ethers.Wallet.createRandom();
  const privateKey = wallet.privateKey;
  const address = wallet.address;
  cy.on('window:before:load', (win) => {
    win.ethereum = metamask({ privateKey, address });
  });

  return cy
    .wrap(wallet.connect(new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545')))
    .as(namespace);
});

Cypress.Commands.add('assertValueCopiedToClipboard', (value) => {
  cy.window().then((win) => {
    win.navigator.clipboard.readText().then((text) => {
      expect(text).to.eq(value);
    });
  });
});
