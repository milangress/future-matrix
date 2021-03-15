// const OptimizePlugin = require('optimize-plugin')
module.exports = {
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions = {
          ...(options.compilerOptions || {}),
          isCustomElement: tag => tag.startsWith('a-') // /^x-/.test(tag)
        }
        return options
      })
  },
  devServer: {
    disableHostCheck: true
  }
}
