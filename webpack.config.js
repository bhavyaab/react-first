'use strict'

require('dotenv').config({ path: `${__dirname}/.dev.env` })
const production = process.env.NODE_ENV === 'production'

const {DefinePlugin, EnvironmentPlugin} = require('webpack')
const HtmlPlugin = require('html-webpack-plugin')
const CleanPlugin = require('clean-webpack-plugin')
const UglifyPlugin = require('uglifyjs-webpack-plugin')
const ExtractPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
let plugins = [
  new EnvironmentPlugin(['NODE_ENV']),
  new ExtractPlugin('bundle.css'),
  new HtmlPlugin({ template: `${__dirname}/src/index.html` }),
  new DefinePlugin({
    __DEBUG__: JSON.stringify(!production),
  }),
  new CopyWebpackPlugin([{
    from: `${__dirname}/src/image/`,
    to: `${__dirname}/build/image/`,
  },{
    from: `${__dirname}/src/audio/`,
    to: `${__dirname}/build/audio/`,
  }]),
]

if (production) {
  // plugins = plugins.concat([ new CleanPlugin(), new UglifyPlugin() ])
}

module.exports = {
  plugins,
  entry: `${__dirname}/src/main.js`,
  devServer: {
    historyApiFallback: true,
  },
  devtool: production ? undefined : 'eval',
  output: {
    path: `${__dirname}/build`,
    filename: 'bundle.js',
    publicPath: process.env.CDN_URL,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-2'],
        },
      },
      {
        test: /\.scss$/,
        loader: ExtractPlugin.extract(['css-loader', 'sass-loader']),
      },
      {
        test: /\.(woff|woff2|ttf|eot|glyph|\.svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'font/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(jpg|jpeg|gif|png|tiff|svg)$/,
        exclude: /\.glyph.svg/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 6000,
              name: `${__dirname}/image/[name].[ext]`,
            },
          },
        ],
      },
      {
        test: /\.(mp3|aac|aiff|wav|flac|m4a|mp4|ogg)$/,
        exclude: /\.glyph.svg/,
        use: [
          {
            loader: 'file-loader',
            options: { name: `${__dirname}/src/audio/[name].[ext]` },
          },
        ],
      },
    ],
  },
}
