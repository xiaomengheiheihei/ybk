
module.exports = {
    lintOnSave: false,
    devServer: {
        host: '127.0.0.1',
        port: 8080,
        https: false,
        hotOnly: false,
        proxy: {
            '/biz': {
                target: 'http://bmmqcrhhtgv6.kegate-xq.cloudappl.com/',
                changeOrigin:true,
                pathRewrite:{
                    '^/biz':''
                }
            }
        },
    },
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'development') {
          config.devtool = 'source-map'
          // mutate config for production...
        } 
    }
}