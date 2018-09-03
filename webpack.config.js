const path = require('path');
require('babel-polyfill');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

module.exports = {
  entry: ['babel-polyfill', './src/client/index.js'],
  output: {
    filename: 'client.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development',
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          fix: true,
          cache: true,
          emitError: true,
          emitWarning: true,
          configFile: path.resolve(__dirname, '.eslintrc.json'),
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
    ],
  },
  plugins: [
    new HardSourceWebpackPlugin(),
  ],
};
