const path = require('path');

module.exports = {
  entry: {
    zense: './src/framework/index.js',
    app: {
      dependOn: 'zense',
      import: './src/app/app.js',
    },
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    asyncChunks: true,
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    alias: {
      '@zense': path.resolve(__dirname, 'src/framework/index.js'),
    },
  },

  optimization: {
    runtimeChunk: 'single',
  },
};
