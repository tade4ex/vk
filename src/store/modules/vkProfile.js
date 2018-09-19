import axios from 'axios';
import jsonp from 'jsonp';

const state = {
  photo: '',
  firstName: '',
  lastName: ''
};

/* getters */
const getters = {};

/* actions */
const actions = {
  getProfile({commit}, token) {
    let url = "https://api.vk.com/method/users.get?v=5.85&user_ids=251889655&fields=photo_50,city,verified&name_case=Nom&access_token=" + token;
    jsonp(url, null, (err, data) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log(data);
        // if (data != null || data.error != null || data.response == null || typeof data.response !== "object") {
        //   //  do error
        //   return false;
        // }
        console.log(data.response);
        commit('setProfile', data.response[0]);
      }
    });
  }
};

/* mutations */
const mutations = {
  setProfile(state, profile) {
    state.photo = profile.photo_50;
    state.firstName = profile.first_name;
    state.lastName = profile.last_name;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
