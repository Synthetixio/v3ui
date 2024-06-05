const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
require('dotenv').config();

// For depcheck to be happy
require.resolve('webpack-dev-server');

const isProd = process.env.NODE_ENV === 'production';
const isTest = process.env.NODE_ENV === 'test';

const htmlPlugin = new HtmlWebpackPlugin({
  template: './index.html',
  scriptLoading: 'defer',
  minify: false,
  hash: false,
  xhtml: true,
  excludeChunks: ['main'],
});

const babelRule = {
  test: /\.(ts|tsx|js|jsx)$/,
  include: [
    // Need to list all the folders in v3 and outside (if used)
    /contracts/,
    /theme/,

    /liquidity\/lib/,
    /liquidity\/components/,
    /governance\/cypress/,
    /governance\/ui/,

    // fixes for borked 3rd party bundles
    /@safe-global/,
    /@web3-onboard/,
  ],
  resolve: {
    fullySpecified: false,
  },
  use: {
    loader: require.resolve('babel-loader'),
    options: {
      configFile: path.resolve(__dirname, 'babel.config.js'),
    },
  },
};

const imgRule = {
  test: /\.(png|jpg|ico|gif|woff|woff2|ttf|eot|doc|pdf|zip|wav|avi|txt|webp|svg)$/,
  type: 'asset',
  parser: {
    dataUrlCondition: {
      maxSize: 4 * 1024, // 4kb
    },
  },
};

const cssRule = {
  test: /\.css$/,
  include: [new RegExp('./src')],
  exclude: [],
  use: [
    {
      loader: require.resolve('style-loader'),
    },
    {
      loader: require.resolve('css-loader'),
    },
  ],
};

const devServer = {
  port: '3000',

  hot: !isTest,
  liveReload: false,

  historyApiFallback: true,

  devMiddleware: {
    writeToDisk: !isTest,
    publicPath: '',
  },

  client: {
    logging: 'log',
    overlay: false,
    progress: false,
  },

  static: './public',

  headers: { 'Access-Control-Allow-Origin': '*' },
  allowedHosts: 'all',
  open: false,
  compress: false,
};

module.exports = {
  //  devtool: isProd ? 'source-map' : isTest ? false : 'eval',
  devtool: isTest ? false : 'source-map',
  devServer,
  mode: isProd ? 'production' : 'development',
  entry: './src/pages/index.tsx',

  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
    filename: '[name].js',
    chunkFilename: isProd ? 'chunk/[name].[contenthash:8].js' : '[name].js',
    assetModuleFilename: '[name].[contenthash:8][ext]',
    clean: true,
  },

  optimization: {
    runtimeChunk: false,
    splitChunks: {
      chunks: 'async',
      maxAsyncRequests: 10,
      maxInitialRequests: 10,
      hidePathInfo: true,
      automaticNameDelimiter: '--',
      name: false,
    },
    moduleIds: isProd ? 'deterministic' : 'named',
    chunkIds: isProd ? 'deterministic' : 'named',
    minimize: isProd,
    minimizer: [new TerserPlugin()],
    innerGraph: true,
    emitOnErrors: false,
  },

  plugins: [htmlPlugin]
    .concat(isProd ? [new CopyWebpackPlugin({ patterns: [{ from: 'public', to: '' }] })] : [])

    .concat([
      new webpack.NormalModuleReplacementPlugin(
        /^@tanstack\/react-query$/,
        require.resolve('@tanstack/react-query')
      ),
      new webpack.NormalModuleReplacementPlugin(/^bn.js$/, require.resolve('bn.js')),
    ])

    .concat([
      new webpack.NormalModuleReplacementPlugin(
        new RegExp(`^@snx-v3/contracts$`),
        path.resolve(path.dirname(require.resolve(`@snx-v3/contracts/package.json`)), 'src')
      ),
      new webpack.NormalModuleReplacementPlugin(
        new RegExp(`^@synthetixio/v3-theme$`),
        path.resolve(path.dirname(require.resolve(`@synthetixio/v3-theme/package.json`)), 'src')
      ),
    ])

    .concat([
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
        process: 'process/browser.js',
      }),
    ])
    .concat(isProd ? [] : isTest ? [] : [new ReactRefreshWebpackPlugin({ overlay: false })])
    .concat(
      process.env.GENERATE_BUNDLE_REPORT === 'true'
        ? [
            new BundleAnalyzerPlugin({
              analyzerMode: 'static',
              reportFilename: path.resolve(__dirname, 'tmp', 'webpack.html'),
              openAnalyzer: false,
              generateStatsFile: false,
            }),
          ]
        : []
    )
    .concat(
      new webpack.DefinePlugin({
        'process.env.INFURA_KEY': JSON.stringify(process.env.INFURA_KEY),
        'process.env.DEV': JSON.stringify(process.env.DEV),
        'process.env.TESTNET': JSON.stringify(process.env.TESTNET),
        'process.env.IPFS_INFURA_KEY': JSON.stringify(process.env.IPFS_INFURA_KEY),
        'process.env.IPFS_INFURA_SECRET': JSON.stringify(process.env.IPFS_INFURA_SECRET),
        'process.env.WC_PROJECT_ID': JSON.stringify(process.env.WC_PROJECT_ID),
        'process.env.BOARDROOM_KEY': JSON.stringify(process.env.BOARDROOM_KEY),
      })
    ),
  resolve: {
    fallback: {
      buffer: require.resolve('buffer'),
      stream: require.resolve('stream-browserify'),
      crypto: require.resolve('crypto-browserify'),
      process: require.resolve('process/browser.js'),
      http: false,
      https: false,
      os: false,
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.mjs'],
  },
  module: {
    rules: [babelRule, imgRule, cssRule],
  },
};
