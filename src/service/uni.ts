import { DEBUG, IN_H5 } from './info'

console.log(uni.getSystemInfoSync())

export const setTitle = (title: string) => {
    if (IN_H5) {
        document && (document.title = title)
    }
    uni.setNavigationBarTitle({ title })
}

export const toast = (
    title: string,
    type: 'error' | 'success' | 'info' = 'info'
) => {
    DEBUG && console.log('toast', title, type)
    uni.showToast({ title, icon: 'none' })
}
export const showLoading = (title: string) => {
    DEBUG && console.log('showLoading', title)
    uni.showLoading({ title })
}
export const hideLoading = (title: string) => {
    DEBUG && console.log('hideLoading', title)
    uni.showLoading({ title })
}
export const login = () => {
    return new Promise((r, rj) => {
        r('')
    })
}

export default {
    toast,
    showLoading,
    hideLoading,
    open
}
