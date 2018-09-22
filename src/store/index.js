import Vue from 'vue';
import Vuex from 'vuex';
import vkProfile from './modules/vkProfile';
import vkGroup from './modules/vkGroup';
import vkAuth from './modules/vkAuth';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    vkProfile,
    vkGroup,
    vkAuth
  },
});
