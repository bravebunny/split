'use strict'

const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './index.js',
  output: {
    path: 'dist',
    filename: 'game.js',
    hash: true
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
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
  node: {
    fs: 'empty'
  }
}
