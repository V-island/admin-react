import { defineConfig } from 'umi';

export default defineConfig({
  define: {
    'process.env.sentry_open': false, //是否开启错误追踪
  },
  mock: false,
  hash: true,
  nodeModulesTransform: {
    type: 'none',
  },
  dva: {
    hmr: true,
  },
  locale: {
    default: 'zh-CN',
    antd: true,
    title: true,
    baseNavigator: true,
    baseSeparator: '-',
  },
  theme: {
    '@primary-color': '#0070FF',
  },
  proxy: {
    '/api': {
      // target: 'http://192.168.50.201:8888/',
      // target: 'http://192.168.50.182:8888',
      changeOrigin: true,
    },
  },
  routes: [
    {
      path: '/',
      component: '@/layouts/BaseLayout',
      routes: [
        { exact: true, path: '/', redirect: '/template/control' },
        {
          title: 'routes.control',
          path: '/template/control',
          component: '@/pages/template/control',
        },
        {
          title: 'routes.kit',
          path: '/template/kit',
          component: '@/pages/template/kit',
        },
        {
          title: 'routes.process',
          path: '/template/process',
          component: '@/pages/template/process',
        },
        {
          title: 'routes.process.oaDesigner',
          path: '/template/process/oaDesigner',
          component: '@/pages/template/process/oaDesigner',
          hideInMenu: true,
        },
        {
          title: 'routes.preview',
          path: '/template/preview',
          component: '@/pages/template/preview',
        },
      ],
    },
  ],
  fastRefresh: {},
});
