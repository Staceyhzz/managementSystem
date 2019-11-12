# vue-manage-system

<a href="https://github.com/vuejs/vue">
    <img src="https://img.shields.io/badge/vue-2.6.10-brightgreen.svg" alt="vue">
  </a>
  <a href="https://github.com/ElemeFE/element">
    <img src="https://img.shields.io/badge/element--ui-2.8.2-brightgreen.svg" alt="element-ui">
  </a>

基于 Vue + Element UI 的后台管理系统解决方案。线上地址：暂无！
<!-- 基于 Vue + Element UI 的后台管理系统解决方案。[线上地址](https://lin-xin.gitee.io/example/work/) -->


## 项目截图

### 登录

![Image text](https://github.com/Staceyhzz/managementSystem/raw/master/screenshots/wms3.png)

### 默认皮肤

![Image text](https://github.com/Staceyhzz/managementSystem/raw/master/screenshots/wms1.png)

### 浅绿色皮肤

![Image text](https://github.com/Staceyhzz/managementSystem/raw/master/screenshots/wms2.png)


## 前言

该方案作为一套多功能的后台框架模板，适用于绝大部分的后台管理系统（Web Management System）开发。基于 vue.js，使用 vue-cli3 脚手架，引用 Element UI 组件库，方便开发快速简洁好看的组件。分离颜色样式，支持手动切换主题色，而且很方便使用自定义主题色。

## 功能

-   [x] Element UI
-   [x] 登录/注销
-   [x] Dashboard
-   [x] 头部tabs路由切换，超出宽度会自动计算宽度（支持关闭单个/其他/关闭全部）
-   [x] 表单相关（各种用法）
-   [x] 图片上传（宽高等验证实现）/裁剪上传
-   [x] 富文本编辑器
-   [x] markdown 编辑器
-   [x] 列表相关（各种用法）
-   [x] 报表打印
-   [x] 图表Echart（各种用法）
-   [x] tabs消息中心
-   [x] 列表拖拽排序
-   [x] 可拖拽弹窗
-   [x] 自定义图标
-   [x] 国际化
-   [x] 权限测试
-   [x] 404 / 403
-   [x] 三级菜单
-   [x] 不同环境打包相关
-   [x] 支持切换主题色 :sparkles:

## 安装步骤

```
git clone https://github.com/Staceyhzz/managementSystem.git      // 把模板下载到本地
cd managementSystem    // 进入模板目录
npm install         // 安装项目依赖，等待安装完成之后，安装失败可用 cnpm
建议安装使用淘宝镜像  npm install -g cnpm --registry=https://registry.npm.taobao.org
cnpm install

// 开启服务器，浏览器访问 http://localhost:8080
npm run serve

// 执行构建命令，生成的dist文件夹放在服务器下即可访问（可以constans.js中配置）
npm run alpha  // 测试环境
npm run build  // 生产环境
```

## 组件使用说明与演示

### Echart

EChart.js 的图表组件。访问地址：[Echart](https://www.echartsjs.com/zh/index.html)

<!-- <p><a href="https://www.npmjs.com/package/vue-schart"><img src="https://img.shields.io/npm/dm/vue-schart.svg" alt="Downloads"></a></p> -->

```html
<template>
    <div>
        <div class="schart" id="myCharnt"></div>
    </div>
</template>

<script>
    import echarts from "echarts"; // 导入Echart组件
    export default {
        data() {
            return {
                chart: null
            };
        },
        mounted () {
            this.chartSet();
            this.accclist();
        },
        methods: {
            // 绘制基础4个图表
            chartSet() {
                let self = this;
                // 柱状图
                let el = document.getElementById('myCharnt');
                self.chart = echarts.init(el);
            },
            accclist() {
                this.setEcharts();
            },
            // 图标绘制
            setEcharts() {
                let option = {
                    color: ['#3398DB'],
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    legend: {
                        data: ['直接访问']
                    },
                    xAxis : [
                        {
                            type : 'category',
                            data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                            axisTick: {
                                alignWithLabel: true
                            }
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series : [
                        {
                            name:'直接访问',
                            type:'bar',
                            barWidth: '60%',
                            data:[10, 52, 200, 334, 390, 330, 220]
                        }
                    ]
                }
                this.chart.setOption(option, true);
            }
        }
    };
</script>
<style>
    .schart {
        width: 100%;
        height: 300px;
    }
</style>
```

## 其他注意事项

### 一、如果我不想用到上面的某些组件呢，那我怎么在模板中删除掉不影响到其他功能呢？

举个栗子，我不想用 Vue-Quill-Editor 这个组件，那我需要分四步走。

第一步：删除该组件的路由，在目录 src/router/index.js 中，找到引入改组件的路由，删除下面这段代码。

```JavaScript
{
    // 富文本编辑器组件
    path: '/editor',
    component: resolve => require(['../components/page/VueEditor.vue'], resolve)
},
```

第二步：删除引入该组件的文件。在目录 src/components/page/ 删除 VueEditor.vue 文件。

第三步：删除该页面的入口。在目录 src/components/common/Sidebar.vue 中，找到该入口，删除下面这段代码。

```js
{
	index: 'editor',
	title: '富文本编辑器'
},
```

第四步：卸载该组件。执行以下命令：
npm un vue-quill-editor -S

完成。

### 二、如何切换主题色呢？

第一步：打开 src/main.js 文件，找到引入 element 样式的地方，换成浅绿色主题。

```javascript
import 'element-ui/lib/theme-default/index.css'; // 默认主题
// import './assets/css/theme-green/index.css';       // 浅绿色主题
```

第二步：打开 src/App.vue 文件，找到 style 标签引入样式的地方，切换成浅绿色主题。

```javascript
@import "./assets/css/main.css";
@import "./assets/css/color-dark.css";     /*深色主题*/
/*@import "./assets/css/theme-green/color-green.css";   !*浅绿色主题*!*/
```

第三步：打开 src/components/common/Sidebar.vue 文件，找到 el-menu 标签，把 background-color/text-color/active-text-color 属性去掉即可。

## License

[MIT](https://github.com/Staceyhzz/managementSystem/issues)
# managementSystem
