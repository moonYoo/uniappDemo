export default function toThousands(number: any) {
    var result: string[] = [],
        counter = 0
    let num: string = (number || 0).toString().split('')
    for (var i = num.length - 1; i >= 0; i--) {
        counter++
        result.unshift(num[i])
        if (!(counter % 3) && i != 0) {
            result.unshift(',')
        }
    }
    return result.join('')
}
