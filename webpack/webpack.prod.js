const { merge } = require('webpack-merge');
const  { CleanWebpackPlugin }  = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new ESLintPlugin(),
    new CleanWebpackPlugin(),
    // new CompressionPlugin(),
  ],
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'all',
      minSize: 0,
      cacheGroups: {
        vendors: false,
        vendor: {
          chunks: 'all',
          name: 'vendors',
          test: /node_modules/,
        },
        default: {
          reuseExistingChunk: true,
        },
      },    
    },
  },
});
