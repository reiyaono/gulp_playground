const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const glob = require("glob");

// const mode = process.env.NODE_ENV || 'development'
// const prod = mode === 'production'

module.exports = {
  entry: {
    bundle: './src/index.js',
    global: glob.sync('./src/scss/*.scss')
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].js',
    chunkFilename: '[name].[id].js'
  },
  module: {
    rules: [
      {
        test: /\.svelte$/,
        use: {
          loader: 'svelte-loader',
          options: {
            preprocess: require('svelte-preprocess')({
              scss: true,
              postcss: ({
                plugins: [
                  require('autoprefixer')
                ]
              })
            }),
            emitCss: true,
            hotReload: true
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
          { loader: 'sass-loader' }
        ]
      }
    ]
  },
  mode,
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ],
}
