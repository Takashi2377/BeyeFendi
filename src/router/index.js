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
      },
      {
        path: '/checkout/:orderId',
        name: 'Checkout',
        component: () => import('../views/FrontView/CheckoutView.vue')
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
        path: 'orders',
        component: () => import('../views/DashBoardView/OrdersView.vue')
      },
      {
        path: 'coupons',
        component: () => import('@/views/DashBoardView/CouponsView.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../views/FrontView/HomeView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes
})

export default router
