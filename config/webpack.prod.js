const common = require('./webpack.common.js')
const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const merge = require('webpack-merge')


const serverURL = process.env['SERVER_URL']
const appURL = process.env['APP_URL']

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'SERVER_URL': JSON.stringify(serverURL),
        'APP_URL': JSON.stringify(appURL),
      },
    }),
  ],
})