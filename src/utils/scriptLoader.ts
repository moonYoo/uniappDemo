const scriptLoader = (src: string): Promise<HTMLElement> => {
    return new Promise((resolve, reject) => {
        const script: any = document.createElement('script')
        // tslint:disable-next-line
        script.onload = script.onreadystatechange = function() {
            if (
                !this.readyState ||
                this.readyState === 'loaded' ||
                this.readyState === 'complete'
            ) {
                setTimeout(() => {
                    resolve(script)
                }, 20)
            }
        }
        // tslint:disable-next-line
        script.onerror = function(error: ErrorEvent) {
            reject(error)
        }
        script.src = src
        document.body.appendChild(script)
    })
}

export default scriptLoader
