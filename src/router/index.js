import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const components = {
  login: ()=>import('@/views/login/login'),
  layout: ()=>import('@/views/layout/layout'),
  index: ()=>import('@/views/index/index'),
  users: ()=>import('@/views/users/index'),
  uploadDemo: ()=>import('@/views/uploadDemo/index'),
  userEdit: ()=>import('@/views/userEdit/index'),
  userDetail: ()=>import('@/views/users/userDetail'),
  addUser: ()=>import('@/views/addUser/index'),
  swipers: ()=>import('@/views/swiper/index'),
  addSwiper: ()=>import('@/views/swiper/addSwiper'),
  editSwiper: ()=>import('@/views/swiper/editSwiper'),
  books: ()=>import('@/views/book/index'),
  addBook: ()=>import('@/views/book/addBook'),
  editBook: ()=>import('@/views/book/editBook'),
  category: ()=>import('@/views/category/index'),
  categoryDetail: ()=>import('@/views/category/categoryDetail'),
  changeCategory: ()=>import('@/views/category/changeCategory'),
  addCategory: ()=>import('@/views/category/addCategory')
}

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      component: components.login
    },
    {
      path: '/layout',
      component: components.layout,
      redirect: '/layout/index',
      meta: {
        title: '首页'
      },
      children: [
        {
          path: 'index',
          component: components.index
        },
        {
          path: 'users',
          meta: {
            title: '用户管理'
          },
          component: components.users
        },
        {
          path: 'uploadDemo',
          meta: {
            title: '上传图片测试页'
          },
          component: components.uploadDemo
        },
        {
          path: 'userEdit',
          meta: {
            title: '修改个人信息'
          },
          component: components.userEdit
        },
        {
          path: 'userDetail',
          name: 'userDetail',
          meta: {
            title: '用户信息'
          },
          component: components.userDetail
        },
        {
          path: 'addUser',
          meta: {
            title: '添加管理员'
          },
          component: components.addUser
        },
        {
          path: 'swipers',
          meta: {
            title: '轮播图管理页面'
          },
          component: components.swipers
        },
        {
          path: 'addSwiper',
          name: 'addSwiper',
          meta: {
            title: '添加轮播图'
          },
          component: components.addSwiper
        },
        {
          path: 'editSwiper',
          name: 'editSwiper',
          meta: {
            title: '编辑轮播图'
          },
          component: components.editSwiper
        },
        {
          path: 'books',
          meta: {
            title: '图书管理页面'
          },
          component: components.books
        },
        {
          path: 'addBook',
          meta: {
            title: '添加图书'
          },
          component: components.addBook
        },
        {
          path: 'editBook',
          name: 'editBook',
          meta: {
            title: '编辑图书'
          },
          component: components.editBook
        },
        {
          path: 'category',
          name: 'category',
          meta: {
            title: '分类列表'
          },
          component: components.category
        },
        {
          path: 'addCategory',
          name: 'addCategory',
          meta: {
            title: '添加分类'
          },
          component: components.addCategory
        },
        {
          path: 'categoryDetail',
          name: 'categoryDetail',
          meta: {
            title: '分类详情'
          },
          component: components.categoryDetail
        },
        {
          path: 'changeCategory',
          name: 'changeCategory',
          meta: {
            title: '修改分类'
          },
          component: components.changeCategory
        }
      ]
    }
  ]
})
