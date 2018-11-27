const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  // target: 'web',
  watch: true,
  // mode: 'development',
  entry: {
    app: ['./src/app/app.entry.js']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  devServer: {
    publicPath: './dist',
    contentBase: path.resolve(__dirname, 'dist'),
    watchContentBase: true,
    compress: true,
    port: 8000
  },
  module: {
    rules: [
      { 
        test: /\.css$/,
        use: [ MiniCssExtractPlugin.loader, 'css-loader' ]
      },
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
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ]
};
