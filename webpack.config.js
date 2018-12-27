const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

const DIST_DIR = path.join(__dirname, 'dist');
const SRC_DIR = path.resolve(__dirname, 'src', 'index.js');

module.exports = (env, argv) => ({
  mode: env.production ? 'production' : 'development',
  entry: SRC_DIR,
  output: {
    path: DIST_DIR,
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: path.resolve(__dirname, 'node_modules'),
        loader: 'babel-loader',
      },

      {
        test: /\.(s?css)$/,
        exclude: /node_modules/,
        loaders: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 1,
              localIdentName: '[local]___[hash:base64:5]',
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  devtool: env.production ? false : 'source-map',
  devServer: {
    contentBase: DIST_DIR,
    hot: true,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: env.development ? '[name].css' : '[name].[hash].css',
      chunkFilename: env.development ? '[id].css' : '[id].[hash].css',
    }),
  ],
});
