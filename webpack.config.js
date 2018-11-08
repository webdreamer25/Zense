const path = require('path');

module.exports = {
  target: 'web',
  mode: 'development',
  entry: {
    app: ['./src/app.js'],
    zense: ['./src/zense.js']
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js'
  },
  devServer: {
    publicPath: '/dist',
    contentBase: path.resolve(__dirname, './dist'),
    watchContentBase: true,
    compress: true,
    port: 8000
  },
  module: {
    rules: [
      { 
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ]
          }
        }
      }
    ]
  }
};
