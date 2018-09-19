import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/pages/HomePage'
import VkAuthRes from '@/components/VkAuthRes'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HomePage',
      props: {
        testName1: 'alo',
      },
      component: HomePage
    },
    {
      path: '/vk-auth-res',
      name: 'VkAuthRes',
      component: VkAuthRes
    }
  ]
})
