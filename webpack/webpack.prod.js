const { merge } = require('webpack-merge');
const  { CleanWebpackPlugin }  = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new ESLintPlugin(),
    new CleanWebpackPlugin(),
  ],
  devtool: 'source-map',
});
