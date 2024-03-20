import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../views/FrontView.vue'),
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import('../views/FrontView/HomeView.vue')
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('../views/FrontView/AboutView.vue')
      },
      {
        path: '/products',
        name: 'Products',
        component: () => import('../views/FrontView/ProductsView.vue')
      },
      {
        path: '/product/:id',
        name: 'Product',
        component: () => import('../views/FrontView/ProductView.vue')
      },
      {
        path: '/cart',
        name: 'Cart',
        component: () => import('../views/FrontView/CartView.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/admin',
    component: () => import('../views/DashBoardView/DashboardView.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/DashBoardView/ProductsView.vue')
      },
      {
        path: 'order',
        component: () => import('../views/DashBoardView/OrderView.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes
})

export default router
