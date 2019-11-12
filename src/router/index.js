import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: { 
                        title: '系统首页',
                        keepAlive: true
                    } 
                },
                {
                    path: '/AccountManagement',
                    component: resolve => require(['../components/page/controlPanel/AccountManagement.vue'], resolve),
                    meta: { 
                        title: '账号管理',
                        keepAlive: true
                    } 
                },
                {
                    path: '/icon',
                    component: resolve => require(['../components/page/Icon.vue'], resolve),
                    meta: { 
                        title: '自定义图标',
                        keepAlive: true
                    } 
                },
                {
                    path: '/table',
                    component: resolve => require(['../components/page/BaseTable.vue'], resolve),
                    meta: { 
                        title: '基础表格',
                        keepAlive: true
                    } 
                },
                {
                    path: '/tabs',
                    component: resolve => require(['../components/page/Tabs.vue'], resolve),
                    meta: { 
                        title: '消息中心',
                        keepAlive: true
                    } 
                },
                {
                    path: '/form',
                    component: resolve => require(['../components/page/BaseForm.vue'], resolve),
                    meta: { 
                        title: '基本表单',
                        keepAlive: true
                    } 
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: resolve => require(['../components/page/VueEditor.vue'], resolve),
                    meta: { 
                        title: '富文本编辑器',
                        keepAlive: true
                    }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: resolve => require(['../components/page/Markdown.vue'], resolve),
                    meta: { 
                        title: 'markdown编辑器',
                        keepAlive: true
                    }
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: resolve => require(['../components/page/Upload.vue'], resolve),
                    meta: { 
                        title: 'upload上传',
                        keepAlive: true
                    }
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: resolve => require(['../components/page/BaseCharts.vue'], resolve),
                    meta: { 
                        title: 'Echart图表',
                        keepAlive: true
                    }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: resolve => require(['../components/page/DragList.vue'], resolve),
                    meta: { 
                        title: '拖拽列表',
                        keepAlive: true
                    }
                },
                {
                    // 拖拽Dialog组件
                    path: '/dialog',
                    component: resolve => require(['../components/page/DragDialog.vue'], resolve),
                    meta: { 
                        title: '拖拽弹框',
                        keepAlive: true
                    }
                },
                {
                    // 国际化组件
                    path: '/i18n',
                    component: resolve => require(['../components/page/I18n.vue'], resolve),
                    meta: { 
                        title: '国际化',
                        keepAlive: true
                    }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: resolve => require(['../components/page/Permission.vue'], resolve),
                    meta: { 
                        title: '权限测试',
                        keepAlive: true
                    }
                },
                {
                    path: '/404',
                    component: () => import('../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import('../components/page/403.vue'),
                    meta: { title: '403' }
                }
            ]
        },
        {
            path: '/login',
            component: () => import('../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});