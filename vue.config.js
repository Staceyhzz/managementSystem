module.exports = {
    baseUrl: './',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        // 设置主机地址
        host: '0.0.0.0',
        // 设置默认端口
        port: 3000,
        // 设置代理
        // proxy: {
        //   '/api': {
        //     // 目标 API 地址
        //     // 开发环境
        //     target: 'http://api.admama.com/adm/v1/',
     
        //     // 如果要代理 websockets
        //     ws: false,
        //     // 将主机标头的原点更改为目标URL(设置跨域)
        //     changeOrigin: true,
        //     pathRewrite: {
        //       '^/api': ''
        //     }
        //   }
        // }
    }
}