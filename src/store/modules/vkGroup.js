import VkApiGroup from '../../classes/VkApiGroup';

const state = {
  dataLoading: true,
  dataStartLoading: false,
  alert: null,
  name: '',
  description: '',
  photo: '',
  ageChartSeries: [],
  ageChartCategories: [],
  sexChartSeries: [],
  sexChartCategories: [],
  userFromItems: [],
  postsLikeArg: 0,
  postsViewArg: 0,
  userMaxLikes: null,
  groupLists: null
};

/* getters */
const getters = {};

/* actions */
const actions = {
  getGroup({commit}, params) {
    commit('clearState');
    commit('setStartLoading');
    let vkGroup = new VkApiGroup(params.accessToken);
    vkGroup.getGroupStats(params.groupId).then((data) => {
      commit('setGroupStats', data);
    });
  },
  getGroupLists({commit}, params) {
    let vkGroup = new VkApiGroup(params.accessToken);
    vkGroup.getGroupList(params.userId).then((data) => {
      commit('setGroupLists', data);
    });
  }
};

/* mutations */
const mutations = {
    clearState(state) {
      state.dataLoading = true;
      state.dataStartLoading = false;
      state.alert = null;
    },
    setStartLoading(state) {
      state.dataStartLoading = true;
    },
    setAlert(state, text) {
      state.alert = text;
    },
    setGroupLists(state, data) {
      state.groupLists = data;
    },
    setGroupStats(state, data) {
      console.log(data);
      state.name = data.groupName;
      state.description = data.groupDescription;
      state.photo = data.groupPhoto;
      state.ageChartSeries = [{
        name: '',
        data: Object.keys(data.usersAge).map((key) => data.usersAge[key])
      }];
      state.ageChartCategories = Object.keys(data.usersAge);
      state.sexChartSeries = [{
        name: '',
        data: [
          data.usersSex[0] || 0,
          data.usersSex[1] || 0,
          data.usersSex[2] || 0
        ]
      }];
      state.sexChartCategories = ['incognito', 'woman', 'men'];
      state.userFromItems = Object.keys(data.usersCountryCity).map((key) => {
          return {
            place: data.countryCityNames[key],
            count: data.usersCountryCity[key]
          }
      });
      state.dataLoading = false;
      state.postsLikeArg = data.postsLikeArg.toFixed(2);
      state.postsViewArg = data.postsViewArg.toFixed(2);
      state.userMaxLikes = data.userMaxLikes;
    }
  }
;

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};






