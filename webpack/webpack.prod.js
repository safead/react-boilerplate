const { merge } = require('webpack-merge');
const  { CleanWebpackPlugin }  = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const path = require('path');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  entry: {
    preloader: path.resolve(__dirname, '../src/common/components/AppIndex/AppIndex.js'),
  },
  plugins: [
    new ESLintPlugin(),
    new CleanWebpackPlugin(),
  ],
  devtool: 'source-map',
});
