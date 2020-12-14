const modules: { [key: string]: { [key: string]: () => {}}} = {}

const _modules = require.context('./modules', true, /\.ts$/)

_modules.keys().forEach((item: string) => {
  const __module = _modules(item).default
  const path = item.split(/]\\\//g)
  const moduleName = path[path.length-1].split(/\./g)[0]
  __module.namespaced = true
  if(modules[moduleName]) {
    throw new Error('The file name as store module name should be unique in store moudles.')
  }
  modules[moduleName] = __module
})

export default modules