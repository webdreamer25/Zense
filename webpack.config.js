const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const config = {
  devtool: false,
  // type: 'default',
  mode: 'development',
  entry: {
    zense: ['./src/index.js'],
    app: ['./src/app/app.js']
  },
  output: {
    path: __dirname,
    filename: '[name].js'
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
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/app/index.html',
      filename: './index.html',
      excludeAssets: [/app.min.js/]
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
    modules: [
      'node_modules'
    ]
  }
}

// Needed for test app
// if (config.type === 'testing') {
//   config.entry = {
//     app: './src/app/app.js'
//   };

//   config.output = {
//     path: path.resolve(__dirname, 'app'),
//     filename: this.mode ? '[name].js' : '[name].min.js'
//   };

//   config.optimization = {
//     minimizer: [
//       new UglifyJsPlugin({
//         parallel: true,
//         extractComments: true,
//         uglifyOptions: {
//           mangle: true,
//           output: {
//             comments: false
//           }
//         }
//       }),
//       new OptimizeCSSAssetsPlugin()
//     ]
//   };

//   config.plugins = [
//     new HtmlWebpackPlugin({
//       template: './src/app/index.html',
//       filename: './index.html',
//       excludeAssets: [/app.min.js/]
//     })
//   ];
// }

module.exports = config;

