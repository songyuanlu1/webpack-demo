const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack');

module.exports = {
  entry: {
    // main: './src/main.js'
    // page1: ['./src/page1/index.js'],
    index: './src/index.js',
    another: './src/another-module.js',
    vendor: ['lodash']
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new CleanWebpackPlugin(['dist'])
    , new HtmlWebpackPlugin({
      title: 'Code Splitting'
    })
    // ,new HtmlWebpackPlugin({
    //   template: 'index.html',
    //   filename: 'index-vue.html'
    // })
    , new VueLoaderPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.vue$/,
        use: ['vue-loader']
      }
    ]
  }
  ,optimization: {
    // 合并重复的代码块
    mergeDuplicateChunks: true,
    // 移除父模块中已经存在的模块
    removeAvailableModules: true,
    splitChunks: {
      // chunks: "initial", // 必须三选一： "initial" | "all"(默认就是all) | "async" 
      // minSize: 0, // 最小尺寸，默认0
      // minChunks: 1, // 最小 chunk ，默认1
      // maxAsyncRequests: 1, // 最大异步请求数， 默认1
      // maxInitialRequests: 1, // 最大初始化请求书，默认1
      // name: function () { }, // 名称，此选项可接收 function
      cacheGroups: { // 这里开始设置缓存的 chunks
        // priority: 0, // 缓存组优先级
        another: { // key 为entry中定义的 入口名称
          // chunks: "initial", // 必须三选一： "initial" | "all" | "async"(默认就是异步) 
          // test: /react|lodash/, // 正则规则验证，如果符合就提取 chunk
          name: "vendor", // 要缓存的 分隔出来的 chunk 名称 
          // minSize: 0,
          // minChunks: 1,
          // enforce: true,
          // maxAsyncRequests: 1, // 最大异步请求数， 默认1
          // maxInitialRequests: 1, // 最大初始化请求书，默认1
          // reuseExistingChunk: true // 可设置是否重用该chunk（查看源码没有发现默认值）
        }
      }
    }
  }
};