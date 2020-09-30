// vue.config.js
module.exports = {
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  runtimeCompiler: true,
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://lian.xkmov.net/', //对应自己的接口
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': '/api',
        },
      },
    },
  },
};
