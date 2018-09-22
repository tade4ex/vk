import VkApiProfile from '../../classes/VkApiProfile';


const state = {
  photo: '',
  firstName: '',
  lastName: ''
};

/* getters */
const getters = {};

/* actions */
const actions = {
  getProfile({commit}, accessToken) {
    let vkProfile = new VkApiProfile(accessToken);
    vkProfile.getProfile().then((data) => {
      commit('setProfile', data[0]);
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
