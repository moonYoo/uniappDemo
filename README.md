# tumax-roam

## Project structure

```
api // 请求定义，自动挂载，目录不限，文件名唯一
common // 业务相关通用库，通用样式、函数等
components // 业务无关组件，第三方组件或自定义组件
Interface // TS接口定义文件
pages // 页面
service // 提供特定业务功能集
static // 静态资源
store // vuex 模块，自动挂载，目录不限，文件名唯一
utils // 业务无关工具库
sfc.d.ts // 全局定义文件

```

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
