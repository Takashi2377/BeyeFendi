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
        path: '/product',
        name: 'Product',
        component: () => import('../views/FrontView/ProductView.vue')
      },
      {
        path: '/cart',
        name: 'Cart',
        component: () => import('../views/FrontView/CartView.vue')
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
