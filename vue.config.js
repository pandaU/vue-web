module.exports = {
  css: {
    sourceMap: false
  },
  productionSourceMap: false,
  runtimeCompiler: false,

  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8088',
        // target: 'http://172.16.4.252:8272/math2industry/index.php/api',
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/api/Public/': '/Public/',
          '^/api/': '/'
        }
      }
    }
  }
}
