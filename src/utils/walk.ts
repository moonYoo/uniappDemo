/**
 * 树结构遍历函数
 * @param nodeList 节点数组
 * @param callback 遍历节点回调，传入：节点，节点索引，父级节点数组，控制器{stop:设置为true时，可以停止遍历}
 * @param parents 各级父级节点
 * @param ctrl 控制是否停止遍历
 */
export default function walk(
    nodeList: any,
    callback: any,
    parents: PlainObject[] = [],
    ctrl = {
        stop: false
    }
) {
    if (typeof nodeList === 'object' && nodeList.constructor === Array) {
        for (let i = 0, l = nodeList.length; i < l; i++) {
            callback(nodeList[i], i, parents, ctrl)
            if (!ctrl.stop) {
                const children = nodeList[i].children || nodeList[i].items
                const node = nodeList[i]
                parents.push(node)
                if (children && children.length) {
                    walk(
                        nodeList[i].children || nodeList[i].items,
                        callback,
                        [...parents],
                        ctrl
                    )
                }
                parents.pop()
            } else {
                break
            }
        }
    }
}

export const findNode = (tree: any, idOrValue: any) => {
    const theNode: PlainObject = {}
    walk(tree, (node: any, index: any, parents: any, ctrl: any) => {
        if (node.id === idOrValue || node.value === idOrValue) {
            theNode.node = node
            theNode.index = index
            theNode.parents = parents
            ctrl.stop = true
        }
    })
    return theNode
}
export const findNodeBy = (tree: any, key: any, value: any) => {
    const theNode: PlainObject = {}
    walk(tree, (node: any, index: any, parents: any, ctrl: any) => {
        if (node[key] === value) {
            theNode.node = node
            theNode.index = index
            theNode.parents = parents
            ctrl.stop = true
        }
    })
    return theNode
}
