
module.exports = {
    lintOnSave: false,
    devServer: {
        host: '127.0.0.1',
        port: 8080,
        https: false,
        hotOnly: false,
        proxy: {
            '/api': {
                target: 'http://bmmqcrhhtgv6.kegate-xq.cloudappl.com/',
                changeOrigin:true,
                pathRewrite:{
                    '^/api':''
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