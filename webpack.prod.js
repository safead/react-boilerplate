const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: ['./src/index.js'],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules|packages/,
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['eslint-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
			{
			  test: /\.(png|gif|jpg|svg)$/i,
//			  exclude: /(node_modules)/,
			  use: [{
			    loader: 'file-loader',
			    options: {
			      outputPath: 'assets',
			    },
			  }],
			},
			{
			  test: /\.(eot|ttf|woff|woff2)$/i,
//			  exclude: /(node_modules)/,
			  use: [{
			    loader: 'file-loader',
			    options: {
			      outputPath: 'assets',
			    },
			  }],
			}
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
