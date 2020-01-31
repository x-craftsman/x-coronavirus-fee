// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

export const asyncRouterMap = [

  {
    path: '/',
    name: 'system-service',
    component: BasicLayout,
    meta: { title: 'Code Box' },
    redirect: '/system-service/list',
    children: [
      // dashboard
      {
        path: '/dashboard',
        name: 'dashboard',
        redirect: '/dashboard/workplace',
        component: RouteView,
        meta: { title: '仪表盘', keepAlive: true, icon: 'dashboard' },
        children: [
          {
            path: '/dashboard/analysis',
            name: 'Analysis',
            component: () => import('@/views/dashboard/Analysis'),
            meta: { title: '分析页', keepAlive: false, permission: [ 'dashboard' ], icon: 'tag' }
          },
          {
            path: '/dashboard/workplace',
            name: 'Workplace',
            component: () => import('@/views/dashboard/Workplace'),
            meta: { title: '工作台', keepAlive: true, permission: [ 'dashboard' ], icon: 'tag' }
          }
        ]
      },
      // system service
      {
        path: '/system-service',
        name: 'systemService',
        meta: { title: '系统服务', keepAlive: true, icon: bxAnaalyse },
        redirect: '/system-service/list',
        component: PageView,
        children: [
          {
            path: '/system-service/list',
            name: 'system-service-list',
            component: () => import('@/views/system-service/SystemServiceList'),
            meta: { title: '系统服务维护', keepAlive: false, icon: 'tag' }
          },
          {
            path: '/system-service/subscription/list',
            name: 'system-service-subscribe-list',
            component: () => import('@/views/system-service/SubscriptionList'),
            meta: { title: '系统服务订阅', keepAlive: false, icon: 'tag' }
          },
          {
            path: '/system-service/subscription/subscribe',
            name: 'system-service-subscription-subscribe',
            component: () => import('@/views/system-service/subscribe/SystemServiceSubscribeForm'),
            meta: { title: '系统服务订阅流程', keepAlive: false, icon: 'tag' },
            hidden: true
          }
        ]
      },
      // data import
      {
        path: '/data-import',
        name: 'dataImport',
        meta: { title: '数据导入', keepAlive: true, icon: 'menu-unfold' }, // 参考图标：share-alt, menu-unfold
        redirect: '/data-import/list',
        component: PageView,
        children: [
          {
            path: '/data-import/list',
            name: 'data-import-list',
            component: () => import('@/views/data-import/DataImportFlowList'),
            meta: { title: '导入流程列表', keepAlive: false, icon: 'tag' }
          },
          {
            path: '/data-import/build-flow',
            name: 'data-import-build-flow',
            component: () => import('@/views/data-import/BuildDataImportFlow'),
            meta: { title: '构建导入流程', keepAlive: false, icon: 'tag' }
          }
        ]
      },
      // domain event
      {
        path: '/domain-event',
        name: 'domain-event',
        meta: { title: '领域事件', keepAlive: true, icon: 'sliders' },
        redirect: '/domain-event/list',
        component: PageView,
        children: [
          {
            path: '/domain-event/list',
            name: 'domain-event',
            component: () => import('@/views/domain-event/SystemEventList'),
            meta: { title: '系统事件维护', keepAlive: false, icon: 'tag' }
          },
          {
            path: '/domain-event/subscription/list',
            name: 'domain-event-subscription-list',
            component: () => import('@/views/domain-event/SystemEventSubscriberList'),
            meta: { title: '系统事件订阅', keepAlive: false, icon: 'tag' }
          },
          {
            path: '/domain-event/subscription/subscriber',
            name: 'domain-event-subscription-subscriber',
            component: () => import('@/views/domain-event/BuildEventSubscriberFlow'),
            meta: { title: '系统事件订阅', keepAlive: false, icon: 'tag' },
            hidden: true
          }
        ]
      },
      // performance analysis
      {
        path: '/performance-analysis',
        name: 'performanceAnalysis',
        component: PageView,
        redirect: '/performance-analysis/list',
        meta: { title: '性能分析', icon: 'bar-chart' },
        children: [
          {
            path: '/performance-analysis/execution-time',
            name: 'performance-analysis-execution-time',
            component: () => import('@/views/exception/403'),
            meta: { title: '执行时间分布', keepAlive: false, icon: 'tag' }
          },
          {
            path: '/performance-analysis/execution-frequency',
            name: 'performance-analysis-execution-frequency',
            component: () => import('@/views/exception/403'),
            meta: { title: '执行频率分布', keepAlive: false, icon: 'tag' }
          }
        ]
      },
      // user behavior
      {
        path: '/user-behavior',
        name: 'userBehavior',
        component: PageView,
        redirect: '/user-behavior/list',
        meta: { title: '用户行为', icon: 'solution' },
        children: [
          {
            path: '/user-behavior/high-frequency-operation',
            name: 'user-behavior-high-frequency-operation',
            component: () => import('@/views/exception/404'),
            meta: { title: '系统高频操作', keepAlive: false, icon: 'tag' }
          },
          {
            path: '/user-behavior/ticket-tracking',
            name: 'user-behavior-ticket-tracking',
            component: () => import('@/views/exception/404'),
            meta: { title: '单据跟踪记录', keepAlive: false, icon: 'tag' }
          },
          {
            path: '/user-behavior/operation-flow',
            name: 'user-behavior-operation-flow',
            component: () => import('@/views/exception/404'),
            meta: { title: '用户操作流程', keepAlive: false, icon: 'tag' }
          }
        ]
      },
      // tenant
      {
        path: '/tenant',
        name: 'tenant',
        component: PageView,
        redirect: '/tenant/list',
        meta: { title: '租户管理', icon: 'bank' },
        children: [
          {
            path: '/tenant/list',
            name: 'tenant-list',
            component: () => import('@/views/tenant/TenantList'),
            meta: { title: '租户列表', keepAlive: false, icon: 'tag' }
          },
          {
            path: '/tenant/file-servers',
            name: 'tenant-file-servers',
            component: () => import('@/views/tenant/file-server/FileServerList'),
            meta: { title: '文件服务器', keepAlive: false, icon: 'tag' }
          },
          {
            path: '/tenant/web-apis',
            name: 'tenant-web-apis',
            component: () => import('@/views/tenant/web-api/WeApiList'),
            meta: { title: 'Web Api 服务', keepAlive: false, icon: 'tag' }
          },
          {
            path: '/tenant/web-services',
            name: 'tenant-web-services',
            component: () => import('@/views/exception/404'),
            meta: { title: 'Web Services 服务', keepAlive: false, icon: 'tag' }
          }
        ]
      },

      // account
      {
        path: '/account',
        component: RouteView,
        redirect: '/account/center',
        name: 'account',
        meta: { title: '个人设置', icon: 'user', keepAlive: true },
        children: [
          {
            path: '/account/center',
            name: 'center',
            component: () => import('@/views/exception/404'),
            meta: { title: '用户设置', keepAlive: false, icon: 'tag' }
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: () => import('@/views/exception/404'),
            meta: { title: '修改密码', keepAlive: false, icon: 'tag' }
          }
        ]
      },
      // hidden route - with RouteView
      {
        path: '/',
        name: 'hidden-route',
        meta: { title: '系统服务', keepAlive: true, icon: bxAnaalyse },
        redirect: '/system-service/list',
        component: RouteView,
        hidden: true,
        children: [
          {
            path: '/system-service/subscription/detail/:id',
            name: 'system-service-subscription-detail',
            component: () => import('@/views/system-service/SubscriptionDetail'),
            meta: { title: '服务订阅明细', keepAlive: false, hiddenHeaderContent: false }
          }
        ]
      }
    ]
  },
  {
    path: '*', redirect: '/404', hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },

  {
    path: '/test',
    component: BlankLayout,
    redirect: '/test/home',
    children: [
      {
        path: 'home',
        name: 'TestHome',
        component: () => import('@/views/Home')
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }

]
