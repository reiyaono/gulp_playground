const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');
const path = require('path');
const glob = require("glob");

const mode = process.env.NODE_ENV || 'development'

module.exports = {
  entry: glob.sync('./src/scss/*.scss'),
  output: {
    path: __dirname + '/dist'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
          {
            loader: 'sass-loader',
            options: {
              // dart-sass を優先
              implementation: require("sass")
            }
          }
        ]
      }
    ]
  },
  mode,
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css'
    }),
    new RemoveEmptyScriptsPlugin()
  ],
}
