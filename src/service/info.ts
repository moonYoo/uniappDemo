import parseUrl from '@/utils/parseUrl'
export const DEV = process.env.NODE_ENV !== 'production'
export const DEBUG =
    DEV ||
    ((window && window.location && window.location.href) || '').includes(
        'debug'
    )
export const SYS_INFO = uni.getSystemInfoSync()
export const OS_VERSION = (SYS_INFO.system || '').toLowerCase() // android 9 / ios 11
export const OS: any = (SYS_INFO.platform === 'devtools'
    ? 'ios'
    : SYS_INFO.platform) as any // android / ios
export const SCREEN_WIDTH = SYS_INFO.screenWidth
export const SCREEN_HEIGHT = SYS_INFO.screenHeight
export const WIN_WIDTH = SYS_INFO.windowWidth
export const WIN_HEIGHT = SYS_INFO.windowHeight
export const STATUSE_BAR_HEIGHT = SYS_INFO.statusBarHeight
export const WIFI = SYS_INFO.wifiEnabled

export const MP_WEIXIN = !!SYS_INFO.SDKVersion

export const pro_sourceid = () => {
    const model = (SYS_INFO.model || '').toLowerCase()
    const plat = (SYS_INFO.platform || '').toLowerCase()
    if (model.indexOf('iphone') >= 0) {
        return 103
    } else if (model.indexOf('ipad') >= 0) {
        return 109
    } else if (plat.indexOf('android') >= 0) {
        if (model.indexOf('pad') >= 0) {
            return 110
        } else {
            return 104
        }
    } else {
        return 105
    }
}

export const device_src = () => {
    const model = (SYS_INFO.model || '').toLowerCase()
    const plat = (SYS_INFO.platform || '').toLowerCase()
    if (plat.indexOf('android') >= 0) {
        if (model.indexOf('pad') >= 0) {
            return 4
        } else {
            return 3
        }
    } else if (plat.indexOf('wp') >= 0) {
        return 5
    } else if (plat.indexOf('ipod') >= 0 || model.indexOf('ipod') >= 0) {
        return 6
    } else {
        return 2
    }
}

let platform
// #ifdef H5
platform = 'h5'
// #endif
// #ifdef MP-WEIXIN
platform = 'mp-weixin'
// #endif
export const PLATFORM = platform

export const IN_H5 = platform === 'h5'

export const IN_MP_WEIXIN = platform === 'mp-weixin'

/**
 * 只有 IN_H5 的时候才有数据
 */
export const URL_INFO: {
    params: PlainObject
    protocol?: string
    host?: string
    port?: string
    query?: string
    hash?: string
    path?: string
} = IN_H5 ? parseUrl() : { params: {} }

// 在微信浏览器
export const IN_WEIXIN =
    IN_H5 &&
    ((window.navigator && window.navigator.userAgent) || '').includes(
        'MicroMessenger'
    )

/**
 * 基于750宽度的1像素的实际宽度
 * 用于js基于750宽度计算实际尺寸
 */
export const RPX = (WIN_WIDTH || SCREEN_WIDTH || 750) / 750
/**
 * 1rem = WIN_WIDTH / 40
 */
export const REM = (WIN_WIDTH || SCREEN_WIDTH || 750) / 20

const info = {
    URL_INFO,
    DEV,
    DEBUG,
    SYS_INFO,
    OS_VERSION,
    OS,
    SCREEN_HEIGHT,
    SCREEN_WIDTH,
    WIN_HEIGHT,
    WIN_WIDTH,
    WIFI,
    PLATFORM,
    IN_H5,
    IN_MP_WEIXIN,
    IN_WEIXIN,
}

console.log(info)

export default info
