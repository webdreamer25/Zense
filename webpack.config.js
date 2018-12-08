const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  // target: 'web',
  watch: true,
  // mode: 'development',
  entry: {
    app: ['@babel/polyfill', './src/app/app.entry.js'],
    styles: './src/zense.css'
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
        use: ['style-loader','css-loader']
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
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
    modules: [
      'node_modules'
    ]
  }
};
