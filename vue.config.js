module.exports = {
  devServer: {
    port: '8081'
  },
  chainWebpack: config => {
    config.plugin('define').tap(definitions => {
      definitions[0].__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = true
      return definitions
    })
  }
}
