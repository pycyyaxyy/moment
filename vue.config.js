const { defineConfig } = require("@vue/cli-service")
module.exports = defineConfig({
  transpileDependencies: true,

  //配置方式1-1 使用cli提供的属性
  outputDir: "./build",
  // publicPath: './',
  //配置方式1-2 和webpack属性完全一致 会进行合并
  devServer: {
    proxy: {
      "^/api": {
        target: "http://120.77.57.62:8000",
        pathRewrite: {
          "^/api": "",
        },
        changeOrigin: true,
      },
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        views: "@/views",
        components: "@/components",
      },
    },
  },
  //配置方式2：通过configureWebpack修改webpack的配置：可以是一个函数，会接收一个config，可以通过config来修改配置；
  // configureWebpack: (config) => {
  //   config.resolve.alias = {
  //     '@': path.resolve(__dirname, 'src'),
  //     views: '@/views'
  //   }
  // }

  //配置方式3：通过chainWebpack修改webpack的配置：
  // chainWebpack: (config) => {
  //   config.resolve.alias
  //     .set('@', path.resolve(__dirname, 'src'))
  //     .set('views', '@/views')
  // }
})
