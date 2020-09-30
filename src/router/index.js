import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: 'content',
    children: [
      {
        path: '/content',
        name: 'content',
        component: () =>
          import(/* webpackChunkName: "about" */ '../layouts/Content.vue'),
        children: [
          {
            path: '/list/:id',
            name: 'list',
            component: () => import('../views/List.vue'),
          },
          {
            path: '/detail/:classid/:id',
            name: 'detail',
            component: () => import('../views/Detail.vue'),
          },
        ],
      },
    ],
  },
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
});

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

router.beforeEach((to, from, next) => {
  NProgress.start(); // 显示进度条
  next();
});

router.afterEach(() => {
  NProgress.done(); //完成进度条
});

export default router;
