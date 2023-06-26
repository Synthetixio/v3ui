require.resolve('babel-jest');
require.resolve('jest-environment-jsdom');

module.exports = {
  roots: ['<rootDir>'],
  modulePaths: ['<rootDir>'],
  globalSetup: '<rootDir>/jest.global.js',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  testMatch: ['<rootDir>/**/*.test.{js,jsx,ts,tsx}'],
  testPathIgnorePatterns: [],
  collectCoverageFrom: [
    '<rootDir>/theme/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/libs/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/staking/ui/**/*.{js,jsx,ts,tsx}',
    '!<rootDir>/**/*.d.ts',
    '!<rootDir>/**/*.test.{js,jsx,ts,tsx}',
  ],
};
