const path = require('path');
const webpack = require('webpack');
const UglifyPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  // watch: true,
  devtool: false,
  mode: 'development',
  entry: {
    zense: ['./src/index.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'zense.min.js'
  },
  optimization: {
    minimizer: [
      new UglifyPlugin({
        sourceMap: true,
        extractComments: true,
        uglifyOptions: {
          mangle: true,
          output: {
            comments: false
          }
        }
      })
    ]
  },
  module: {
    rules: [
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
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: '[name].map'
    })
  ]
};
