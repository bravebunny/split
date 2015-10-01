'use strict'

// http://olav.it/snippet/webpack-pixi-js/

const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: 'source-map',
  entry: './src/index.js',
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
        loader: 'json'
      },
      {
        include: /\.js*/,
        loaders: [
          'babel-loader?stage=0'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(png|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
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
