const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = (env) => {
  return merge(common(env), {
    mode: 'production',
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin(),
        new CssMinimizePlugin({
          minimizerOptions: {
            preset: ['default', {
              calc: true,
              convertValues: true,
              discardComments: {
                removeAll: true
              },
              discardDuplicates: true,
              discardEmpty: true,
              mergeRules: true,
              normalizeCharset: true,
              svg: true
            }]
          }
        })
      ]
    },

    splitChunks: {
      cacheGroups: {
        main: {
          chunks: 'all',
          name: 'site',
          test: 'main',
          enforce: true
        },

        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true
        }
      }
    },

    performance: {
      hints: false
    }
  });
}
