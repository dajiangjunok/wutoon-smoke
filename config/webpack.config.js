const CompressionWebpackPlugin = require('compression-webpack-plugin')
// const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')

const isProd = process.env.NODE_ENV === 'production'

module.exports = () => {

  const config = {}

  if (isProd) {
    config.devtool = false

    config.externals = {
      axios: 'axios',
      vue: 'Vue',
      vuex: 'Vuex',
      'vue-router': 'VueRouter'
    }

    config.plugins = [
      // new LodashModuleReplacementPlugin(),
      new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: /\.(js|css|scss)$/,
        threshold: 10240,
        minRatio: 0.8
      }),
      new HtmlWebpackExternalsPlugin({
        hash: true,
        files: ['index.html'],
        externals: [
          { module: 'axios', entry: 'dist/axios.min.js' },
          { module: 'vue', entry: 'dist/vue.runtime.min.js' },
          { module: 'vuex', entry: 'dist/vuex.min.js' },
          { module: 'vue-router', entry: 'dist/vue-router.min.js' }
        ]
      })
    ]
  } else {
    config.devtool = 'eval'
  }

  return config
}
