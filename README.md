
# About

此项目是 vue + vant 构建的前台管理系统，是后台项目[后面添加]的管理系统，所有的数据都是从服务器实时获取的真实数据，具有注册、登陆、管理数据、权限验证等功能。


# 说明

>  如果对您对此项目有兴趣，可以点 "Star" 支持一下 谢谢！ ^_^

>  如有问题请直接在 Issues 中提，或者您发现问题并有非常好的解决方案，欢迎 PR 👍

>  传送门：[前端项目地址](https://github.com/manzqy/toutiao_vue.git)



## 技术栈

vue2 + vue-router + webpack + ES6/7 + less + vant


## 项目运行


```
git clone https://github.com/manzqy/toutiao_vue.git 

cd taotiao_vue  

npm install 或 yarn(推荐)

npm run serve (访问前台系统)


访问: http://localhost:3000(后台端口,代码待更新)

```



### 前端项目网址
[前端网址请戳这里](https://github.com/manzqy/toutiao_vue.git )（请用chrome手机模式预览）


# 功能列表
学习中小体会,展示每个模块完成的流程
- 静态文件准备，`vue create toutiao_vue` 删除多余的文件，下载`vue-router` 创建一些需要的文件夹,引入初始化样式，创建`Login.vue`,配置路由，引入到`main.js`
- 封装 `button` 组件, `input`组件
- 引入`vant`框架，按需引入toast轻提示框
- 引入 `axios`,封装 `axios`,设置axios拦截器(interceptors)
- 注册login页面的提交事件，使用正则进行验证，拿到token之后保存在本地存储
- 创建个人中心页面组件，注册路由


# 部分截图
...






