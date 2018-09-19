import jsonp from 'jsonp';

const state = {
  name: '',
  description: '',
  photo: ''
};

/* getters */
const getters = {};

/* actions */
const actions = {
  getGroup({commit}, params) {
    console.log(params);
    let url = "https://api.vk.com/method/groups.getById?v=5.85&group_id=" + params.groupId + "&fields=description&access_token=" + params.accessToken;
    jsonp(url, null, (err, data) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log(data);
        console.log(data.response);
        commit('setGroup', data.response[0]);
      }
    });
  }
};

/* mutations */
const mutations = {
  setGroup(state, group) {
    state.name = group.name;
    state.description = group.description;
    state.photo = group.photo_50;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
