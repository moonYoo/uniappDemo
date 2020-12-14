const path = require('path')
const pxtorem = require('postcss-pxtorem')
const postcss = require('postcss')
const px2rpx = postcss.plugin('px2rpx', (opts = {}) => {
    const { proportion = 1 } = opts
    const pxRegExp = /\b(\d+(\.\d+)?)px\b/g
    return (css) => {
        css.replaceValues(pxRegExp, { fast: 'px' }, (string) => {
            return `${proportion * parseInt(string)}rpx`
        })
    }
})

module.exports = {
    parser: require('postcss-comment'),
    plugins: [
        require('postcss-import')({
          resolve (id, basedir, importOptions) {
            if (id.startsWith('~@/')) {
              return path.resolve(process.env.UNI_INPUT_DIR, id.substr(3))
            } else if (id.startsWith('@/')) {
              return path.resolve(process.env.UNI_INPUT_DIR, id.substr(2))
            } else if (id.startsWith('/') && !id.startsWith('//')) {
              return path.resolve(process.env.UNI_INPUT_DIR, id.substr(1))
            }
            return id
          }
        }),
        require('autoprefixer')({
            remove: process.env.UNI_PLATFORM !== 'h5'
        }),
        require('@dcloudio/vue-cli-plugin-uni/packages/postcss'),
        process.env.VUE_APP_PLATFORM === 'h5'
            ? pxtorem({
                  rootValue: 37.5,
                  unitPrecision: 5,
                  //   propList: ['*'],
                  propList: ['*', '!border*1px', , '!border*2px'],
                  selectorBlackList: [],
                  replace: true,
                  mediaQuery: false,
                  minPixelValue: 0
              })
            : px2rpx()
    ]
}
