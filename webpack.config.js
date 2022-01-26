const config = {
  mode: 'development',
  devtool: false,
  entry: {
    zense: ['./src/index.js']
  },
  output: {
    path: __dirname,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
    modules: [
      'node_modules'
    ]
  }
}

module.exports = config;

