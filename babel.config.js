module.exports = {
  env: {
    test: {
      presets: [
        require.resolve('@babel/preset-typescript'),
        [require.resolve('@babel/preset-react'), { runtime: 'automatic' }],
        [
          require.resolve('@babel/preset-env'),
          {
            modules: 'commonjs',
            targets: { node: 'current' },
          },
        ],
      ],
      plugins: [
        [
          require.resolve('babel-plugin-module-resolver'),
          {
            root: ['.'],
            alias: {
              '@synthetixio/v3-contracts/build': './contracts/src',
              '@synthetixio/v3-theme': './theme/src',
            },
          },
        ],
      ],
    },
  },
};
