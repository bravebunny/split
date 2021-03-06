'use strict'

// http://olav.it/snippet/webpack-pixi-js/

const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: 'source-map',
  entry: './index.js',
  output: {
    path: 'dist',
    filename: 'game.js',
    hash: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.json$/,
        include: path.join(__dirname, 'node_modules', 'pixi.js'),
        loader: 'json',
        exclude: /assets/
      },
      {
        include: /\.js*/,
        loaders: [
          'babel-loader?stage=0'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(png|json)$/,
        include: path.join(__dirname, 'assets'),
        loader: 'file-loader?name=[path][name].[ext]&context=' +
          path.resolve(__dirname, 'assets/')
      },
      {
        test: /\.(css)$/,
        loader: 'style!css?outputStyle=expanded'
      }
    ]
  },
  devServer: {
    contentBase: './dist',
    publicPath: 'http://localhost:8080/',
    hot: true,
    inline: true,
    lazy: false,
    quiet: true,
    noInfo: false,
    headers: { 'Access-Control-Allow-Origin': '*' },
    stats: { colors: true },
    host: 'localhost'
  },
  node: {
    fs: 'empty'
  }
}
