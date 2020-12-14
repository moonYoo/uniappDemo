import scriptLoader from '@/utils/scriptLoader'
const GLOBAL_HEADERS = {}

export default function request(
    url: any,
    data: any = { auth: '' },
    method:
        | 'OPTIONS'
        | 'GET'
        | 'HEAD'
        | 'POST'
        | 'PUT'
        | 'DELETE'
        | 'TRACE'
        | 'CONNECT'
        | undefined = 'GET',
    dataType = 'json',
    header: PlainObject = {},
    showLoading: any
) {
    return new Promise((r, rj) => {
        const auth = uni.getStorageSync('token')
        if (!data.auth) {
            data.auth = auth
        }
        if (showLoading) {
            uni.showLoading({
                title: '加载中...'
            })
        }

        uni.request({
            url,
            data,
            header,
            method,
            dataType,
            success(res) {
                r(res)
            },
            fail(error) {
                console.error(error)
                r({ error })
            },
            complete() {
                if (showLoading) {
                    uni.hideLoading()
                }
            }
        })
    })
}

request.auth = uni.getStorageSync('token') || ''
declare interface request {
    auth: string
}

let functionId = 0
export const jsonpRequest = async (url: string, data: { [x: string]: string | number | boolean }) => {
    return new Promise((r) => {
        const funcName = 'func' + functionId++
        data = { ...data, callback: funcName }
        const params = Object.keys(data)
            .reduce((res, key) => {
                return res + `&${key}=${encodeURIComponent(data[key])}`
            }, '?')
            .replace(/\?\&/, '?');
        (window as any)[funcName] = (data:any) => {
            r({ data });
            (window as any)[funcName] = null
        }
        console.log('request-jsonp', url + params)
        scriptLoader(url + params).catch((e) => {
            r({ error: e })
        })
        // setTimeout()
    })
}

export const setGlobalHeaders = (headers: any) => {
    Object.assign(GLOBAL_HEADERS, headers)
}

request.get = (url: any, data?: any, header?: PlainObject | undefined, showLoading?: any): Promise<any> => {
    return request(
        url,
        data,
        'GET',
        'json',
        { ...GLOBAL_HEADERS, ...header },
        showLoading
    )
}
request.post = (url: any, data?: any, header?: PlainObject | undefined, showLoading?: any): Promise<any> => {
    return request(
        url,
        data,
        'POST',
        'json',
        { ...GLOBAL_HEADERS, ...header },
        showLoading
    )
}
