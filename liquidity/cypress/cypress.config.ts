import { defineConfig } from 'cypress';
import webpackConfig from '@snx-v3/liquidity/webpack.config';

import { default as codeCoverageTask } from '@cypress/code-coverage/task';
import { printBrowserLogs } from '@snx-cy/printBrowserLogs';

export default defineConfig({
  reporter: 'junit',
  reporterOptions: {
    mochaFile: './cypress/reports/junit-results.[hash].xml',
    toConsole: false,
  },

  component: {
    watchForFileChanges: false,
    specPattern: ['../**/*.cy.{js,jsx,ts,tsx}'],
    devServer: {
      framework: 'react',
      bundler: 'webpack',
      webpackConfig,
    },
    setupNodeEvents(on, config) {
      codeCoverageTask(on, config);
      return config;
    },
  },

  e2e: {
    watchForFileChanges: false,
    specPattern: ['../**/*.e2e.{js,jsx,ts,tsx}'],
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      if (process.env.CI) {
        on('before:browser:launch', printBrowserLogs);
        codeCoverageTask(on, config);
      }
      on('task', {
        automineBlocks: (...args) =>
          import('./cypress/tasks/automineBlocks').then((m) => m.automineBlocks(...args)),
        mineBlock: () => import('./cypress/tasks/mineBlock').then((m) => m.mineBlock()),
        setEthBalance: (...args) =>
          import('./cypress/tasks/setEthBalance').then((m) => m.setEthBalance(...args)),
        wrapEth: (...args) => import('./cypress/tasks/wrapEth').then((m) => m.wrapEth(...args)),
        getCollateralConfig: (...args) =>
          import('./cypress/tasks/getCollateralConfig').then((m) => m.getCollateralConfig(...args)),
        getSnx: (...args) => import('./cypress/tasks/getSnx').then((m) => m.getSnx(...args)),
        createAccount: (...args) =>
          import('./cypress/tasks/createAccount').then((m) => m.createAccount(...args)),
        approveCollateral: (...args) =>
          import('./cypress/tasks/approveCollateral').then((m) => m.approveCollateral(...args)),
        depositCollateral: (...args) =>
          import('./cypress/tasks/depositCollateral').then((m) => m.depositCollateral(...args)),
        delegateCollateral: (...args) =>
          import('./cypress/tasks/delegateCollateral').then((m) => m.delegateCollateral(...args)),
        borrowUsd: (...args) =>
          import('./cypress/tasks/borrowUsd').then((m) => m.borrowUsd(...args)),
        setConfig: (...args) =>
          import('./cypress/tasks/setConfig').then((m) => m.setConfig(...args)),
        getSUSDC: (...args) => import('./cypress/tasks/getSUSDC').then((m) => m.getSUSDC(...args)),
        getUSDC: (...args) => import('./cypress/tasks/getUSDC').then((m) => m.getUSDC(...args)),
        isBase: () => import('./cypress/tasks/isBase').then((m) => m.isBase()),
      });

      return config;
    },

    retries: {
      runMode: 1,
      openMode: 0,
    },
    defaultCommandTimeout: 90_000,
    execTimeout: 120_000,
    taskTimeout: 300_000, // sometimes Anvil needs quite a bit of time to complete impersonating tx
  },
});
