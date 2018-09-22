import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '@/pages/HomePage';
import GroupInfoPage from '@/pages/GroupInfoPage';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: '/',
      component: HomePage
    }, {
      path: '/group-info/:id',
      name: 'group-info',
      component: GroupInfoPage
    }
  ]
});
