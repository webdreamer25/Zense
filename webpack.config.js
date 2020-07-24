const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

let config = {
  devtool: false,
  mode: 'development',
  entry: {
    zense: ['./src/index.js']
  },
  output: {
    path: __dirname,
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ],
            plugins: [
              "@babel/plugin-transform-object-assign"
            ]
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
    modules: [
      'node_modules'
    ]
  }
}

//Needed for test app
if (config.mode === 'development') {
  config = Object.assign(config, {
    entry: {
      app: ['./src/app/app.js']
    },
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          parallel: true,
          extractComments: true,
          uglifyOptions: {
            mangle: true,
            output: {
              comments: false
            }
          }
        }),
        new OptimizeCSSAssetsPlugin()
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/app/index.html',
        filename: './index.html',
        excludeAssets: [/app.min.js/]
      })
    ],
  });
}

module.exports = config;

