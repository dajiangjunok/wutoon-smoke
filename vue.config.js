// const configureWebpack = require('./config/webpack.config')

module.exports = {
  // configureWebpack: configureWebpack,
  assetsDir: 'static',
  publicPath: './',
  devServer: {
    public: '192.168.94.101:8080',
    // https: true,
    disableHostCheck: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    proxy: require('./config/proxy')
  }
}
