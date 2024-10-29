const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = () => {
  return merge(common, {
    mode: 'development',
    devtool: 'eval-source-map',

    plugins: [
      new HtmlWebpackPlugin({
        template: 'src/app/index.html', // Source template file
        filename: 'index.html', // Output file name
      })
    ],

    devServer: {
      static: './dist',
      watchFiles: ['src/**/*'],
      client: {
        overlay: {
          errors: true,
          warnings: true,
        },
      },
      port: 8080,
      hot: true,
      liveReload: true
    }
  });
};
