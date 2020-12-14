const PARAMS_STORAGE_NAME = 'current-route-params'
/**
 * 获取路由信息, params会通过localstorage传送一份
 * @returns {URL, params}
 */
export const getCurrentRoute = () => {
    const pages = getCurrentPages()
    const page: any = pages[pages.length - 1]
    const local = uni.getStorageSync(PARAMS_STORAGE_NAME)
    if (local.url === page.route) {
        return local
    } else {
        return { url: page.route, params: page.options }
    }
}

export const switchTab = switchT as IRouter
export const navigateTo = navTo as IRouter
export const redirectTo = redTo as IRouter
export const reLaunch = reLaun as IRouter

// 定义调用方式
interface IRouter {
    (url: string, params?: PlainObject): Promise<void>
}

// 针对不同页面的处理钩子，默认返回路径，返回函数则不走默认跳转流程
const hooks = {
}

function navTo(url: any, params: PlainObject | undefined): Promise<void> {
    return to('navigateTo', url, params)
}

function redTo(url: any, params: PlainObject | undefined): Promise<void> {
    return to('redirectTo', url, params)
}

function reLaun(url: string, params: PlainObject | undefined): Promise<void> {
    return to('reLaunch', url, params)
}

function switchT(url: any, params: PlainObject | undefined): Promise<void> {
    return to('switchTab', url, params)
}

const all = {
    navigateTo,
    redirectTo,
    reLaunch,
    switchTab
}

const pages = Object.keys(hooks)
pages.forEach((page: string) => {
    Object.keys(all).forEach((item) => {
        const res =
            typeof (hooks as any)[page] === 'string' ? (hooks as any)[page] : (hooks as any)[page](item)
            (hooks as any)[item][page] = (params?: PlainObject) => {
            if (typeof res === 'function') {
                res(params)
            } else if (typeof res === 'string') {
                return (hooks as any)[item](res, params)
            } else {
                throw new Error('页面跳转hook不正确')
            }
        }
    })
})

declare type navType = 'navigateTo' | 'redirectTo' | 'reLaunch' | 'switchTab'

const to = (type: navType, url: string, params: PlainObject = {}): Promise<void> => {
    return new Promise((r, rj) => {
        const query = Object.keys(params)
            .reduce((res, key) => {
                return res + `&${key}=${encodeURIComponent(params[key])}`
            }, '?')
            .replace(/\?\&/, '?')
        uni[type]({
            url: url + (query.length > 2 ? query : ''),
            success() {
                r()
            },
            fail(e) {
                console.error(e)
                rj(e)
            }
        })
        uni.setStorageSync(PARAMS_STORAGE_NAME, { url, params })
    })
}

export default all
