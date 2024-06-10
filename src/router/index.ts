import { createRouter, createWebHashHistory } from "vue-router"

const routes = [
  {
    path: '/',
    redirect: '/home/dash'  // 默认重定向到 /home
  },
  {
    path: '/home',
    name: "home",
    component: () => import('@/views/HomeView.vue'),
    children: [
    //   {
    //     path: '',
    //     redirect: 'dashboard'  // 重定向到 dashboard 路由
    //   },
      {
        path: '/home/dash',
        meta: { title: 'Dashboard' },
        component: () => import('@/pages/Dashboard.vue')
      },
      {
        path: '/home/leader',
        meta: { title: 'Leaderboard' },
        component: () => import('@/pages/Leaderboard.vue')
      },
      {
        path: '/home/order',
        meta: { title: 'Order' },
        
        component: () => import('@/pages/Order.vue')
      },
      {
        path: '/home/product',
        meta: { title: 'Products' },
        
        component: () => import('@/pages/Products.vue')
      },
      {
        path: '/home/report',
        meta: { title: 'Sales Report' },
        
        component: () => import('@/pages/Salesreport.vue')
      },
      {
        path: '/home/message',
        meta: { title: 'Message' },
        
        component: () => import('@/pages/Message.vue')
      }
    ]
  },
  {
    path: '/det',
    name: "det",
    component: () => import('@/views/det.vue')   
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
});

export default router;
