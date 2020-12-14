import request from './request'
import { toast } from '@/service/uni'
const HOST = ''

const ERR_MSG: PlainObject = {
    '4XX': '请求出错，请稍后再试',
    '5XX': '服务器繁忙，请稍后重试！'
}

/**
 * @data 要发送的数据
 * @silent 不自动显示提示message
 * @rejectMode 请求失败以promise reject处理，默认失败resolve({error})
 */
declare interface IApiModule {
    [key: string]: (
        data: PlainObject,
        silent?: boolean,
        rejectMode?: boolean
    ) => Promise<PlainObject>
}

// 自动挂载模块
const modules: { [key: string]: IApiModule } = {}
const _modules = require.context('./modules', true, /\.ts$/)
_modules.keys().forEach((item: string) => {
    const _module = _modules(item).default
    const path = item.split(/[\\\/]/g)
    const moduleName = path[path.length - 1].split(/\./g)[0]
    if (modules[moduleName]) {
        throw new Error(
            'The file name as api module name should be unique in api moudles.'
        )
    }
    modules[moduleName] = packageReq(_module) as IApiModule
})

export default Object.assign({}, modules)

// http get method
export function get<T>(
    url: string,
    data?: PlainObject,
    filter?: any,
    silent?: boolean,
    showLoading?: boolean
): Promise<T> {
    return request.get(url, data, {}, showLoading).then((res: any) => {
        return preHandle(res, filter, silent)
    })
}

// http post method
export function post<T>(
    url: string,
    data?: PlainObject,
    filter?: any,
    silent?: boolean,
    showLoading?: boolean
): Promise<T> {
    return request.post(url, data, {}, showLoading).then((res: any) => {
        return preHandle(res, filter, silent)
    })
}

function preHandle(res: PlainObject, filter: (arg0: any) => any, silent?: boolean) {
    const code = res.statusCode
    const status = (res.header && res.header['api-status']) || '1'

    if (!silent) {
        let message = ''
        if (code >= 400 && code < 500) {
            message = ERR_MSG['4XX']
        } else if (code >= 500 && code < 600) {
            message = ERR_MSG['5XX']
        } else if (code !== 200 && code !== 304) {
            message = ERR_MSG['0']
        } else if (!isNaN(status) && status === '0') {
            message = res.data && res.data.message
        }
        if (message) {
            handlerError({ message })
        }
    }

    if (res.data && typeof res.data === 'object') {
        res.data.code = res.data.code || res.data.errorCode || 0
    }

    if (res.data && res.data.code && res.data.code === 999999997) {
        handlerError({ message: '登录失效，请重新登录' })
    }
    if (!res.data) {
        handlerError({ message: '请求失败' })
        return {}
    }
    return filter ? filter(res.data) : res.data
}

function handlerError(e: any) {
    const { message } = e
    toast(message, 'error')
}

function packageReq(_module: {
    [key: string]: {
        url: string
        method: string
        filter: (responseData: PlainObject) => PlainObject
        before?: (requestData: PlainObject) => PlainObject
        debug?: boolean
        postJson?: boolean
        showLoading: boolean
    }
}): IApiModule {
    const __module: IApiModule = {}
    let k: string
    for (k in _module) {
        if (_module[k]) {
            ;((moduleName, req) => {
                let url: string
                const filter = req.filter
                const before = req.before
                const debug = req.debug
                const showLoading = req.showLoading || false
                if (!req.method) {
                    req.method = 'GET'
                }

                if (req.url.indexOf('http') === -1) {
                    url = HOST + req.url
                } else {
                    url = req.url
                }
                req.method = req.method.toUpperCase()
                if (!__module[moduleName]) {
                    __module[moduleName] = async (
                        data: PlainObject, // 请求参数
                        silent: boolean = false, // 设为true屏蔽默认请求出错提示
                        rejectMode: boolean = false // 设为true请求出错将会reject处理，默认 resolve({error:e})
                    ) => {
                        if (debug) {
                            const res = filter({})
                            console.warn(
                                `[DEV] The response data is from filter, ${url}`,
                                data,
                                res
                            )
                            return res
                        }
                        const allMethods: PlainObject = {
                            GET: get,
                            POST: post
                        }
                        const _method: any = allMethods[req.method]
                        if (!_method) {
                            throw `[DEV] undefined request method ${req.method}`
                        }
                        if (rejectMode) {
                            const array = url.split('/')
                            const parse = array.map((item) => {
                                if (item.substr(0, 1) === ':') {
                                    return data[item.substr(1)]
                                } else {
                                    return item
                                }
                            })
                            url = parse.join('/')
                            return await _method(
                                url,
                                before ? before(data) : data,
                                filter,
                                silent,
                                showLoading
                            )
                        } else {
                            const array = url.split('/')
                            const parse = array.map((item) => {
                                if (item.substr(0, 1) === ':') {
                                    return data[item.substr(1)]
                                } else {
                                    return item
                                }
                            })
                            url = parse.join('/')
                            let res: object
                            try {
                                res = await _method(
                                    url,
                                    before ? before(data) : data,
                                    filter,
                                    silent,
                                    showLoading
                                )
                            } catch (e) {
                                if (!silent) {
                                    handlerError(e)
                                }
                                console.error(e)
                                res = { error: e }
                            }
                            return res
                        }
                    }
                }
            })(k, _module[k])
        }
    }
    return __module
}
