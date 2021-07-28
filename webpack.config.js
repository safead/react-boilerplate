const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  entry: ['./src/index.js'],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules|packages/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|gif|jpg|svg)$/i,
        exclude: /(node_modules)/,
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: 'assets',
          },
        }],
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/i,
        exclude: /(node_modules)/,
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: 'assets',
          },
        }],
      },
    ],
  },
  plugins: [new ESLintPlugin()],
  resolve: {
    extensions: ['.js', '.jsx'],
  },

  devServer: {
    contentBase: './public',
    host: 'localhost',
    historyApiFallback: true,
    // respond to 404s with index.html
    inline: true,
  },
};
