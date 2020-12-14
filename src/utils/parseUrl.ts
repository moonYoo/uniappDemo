export default (url: string = window.location.href) => {
    const a = document.createElement('a')
    a.href = url
    return {
        protocol: a.protocol.replace(':', ''),
        host: a.hostname,
        port: a.port,
        query: a.search,
        params: (function() {
            let params:any = {}
            let urls = url.split('?')
            let arr = (urls[1] || '').split('&')
            for (var i = 0, l = arr.length; i < l; i++) {
                var a = arr[i].split('=')
                params[a[0]] = a[1]
            }
            return params
        })(),
        hash: a.hash.replace('#', ''),
        path: a.pathname.replace(/^([^\/])/, '/$1')
    }
}
