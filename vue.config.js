module.exports = {
    publicPath: './',
    chainWebpack: (config) => {
        config.module
            .rule('markdown')
            .test(/\.md$/)
            .use('vue-loader')
            .loader('vue-loader')
            .end()
            .use('vue-markdown-loader')
            .loader('vue-markdown-loader/lib/markdown-compiler')
            .options({
                preset: 'default',
                breaks: true,
                raw: true,
                typographer: true,
            })
    },
}
