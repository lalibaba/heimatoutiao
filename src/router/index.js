import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
//如果子路由的path 没有 / 那么会把父亲path和儿子path拼接
// 如果子路由的path有 /，不会拼接
const routes = [
  // {
  //   path: '/',
  //   redirect: '/login'
  // },
  {
    path: '/login',
    component: () => import('@/views/login'),
    meta: {
      index: 2
    }
  },
  //获取文章信息
  {
    path: '/detail/:id',
    component: () => import('@/views/articleInfo'),
    meta: {
      index: 2
    }
  },
  {
    path: '/search',
    component: () => import('@/views/Search'),
    meta: {
      index: 2
    }
  },
  {
    path: '/profile',
    component: () => import('@/views/User'),
    meta: {
      index: 2
    }
  },
  {
    path: '/',
    component: () => import('@/views/layout'),
    redirect: '/ ',
    meta: {
      index: 0
    },
    children: [
      {
        path: '/ ',
        component: () => import('@/views/Home'),
        meta: {
          index: 1
        }
      },
      {
        path: '/video',
        component: () => import('@/views/video'),
        meta: {
          index: 1
        }
      },
      {
        path: '/qa',
        component: () => import('@/views/QA'),
        meta: {
          index: 1
        }
      },
      {
        path: '/my',
        component: () => import('@/views/My'),
        meta: {
          index: 1
        }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
