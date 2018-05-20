const common = require('./webpack.common.js')
const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const merge = require('webpack-merge')


const serverURL = process.env['SERVER_URL']
const appURL = process.env['APP_URL']
const api_end_point = process.env['API_END_POINT']


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
        'API_END_POINT': JSON.stringify(api_end_point),
      },
    }),
  ],
})