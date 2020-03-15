# 学习Vue项目记录

项目部署地址：[www.imoyu.xyz](http://www.imoyu.xyz)（手机端食用更加）

项目简介：根据已有后端数据，复现蘑菇街移动端网页。

## 技术栈：

- Vue Cli3
- Vue-router 前端路由
- Axios 网络请求
- Vuex 状态管理
- Better-Scroll 实现滚动

## 文件整体结构

```
src文件整体结构
├─src
  ├─assets  // 存放img文件与css文件
  ├─common  // 存放公共函数：混入，导出的常量，时间格式化，
  ├─components  // 组件
  │  ├─common  // 一些公共组件，其他项目亦可调用
  │  └─content  // 本项目相关组件，在多个页面会调用
  ├─network 	// 网络请求相关
  ├─router	// 路由跳转相关
  ├─store		// Vuex状态管理
  └─views		// 各个页面视图
      ├─cart  // 购物车页面
      ├─category  // 分类页面
      ├─detail  // 详情页面
      ├─home  // 首页页面
      └─profile  // 我的页面
   
```

## 总结

1. 熟悉了Vue框架基本开发
2. 利用阿里云和tomcat将网页初步部署



# supermall

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
