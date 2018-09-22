import cookies from '../../classes/Cookies';

const state = {
  auth: false,
  accessToken: null
};

/* getters */
const getters = {};

/* actions */
const actions = {
  logout() {
    cookies.setCookie('access_token', null, -1);
    cookies.setCookie('expires_in', null, -1);
    cookies.setCookie('user_id', null, -1);
    this.dispatch('vkAuth/getAuth');
  },
  getAuthHash() {
    let hash = window.location.hash;
    if (/#access_token=.*&expires_in=86400&user_id=.*/.test(hash)) {
      cookies.setHashToCookie();
      window.location.hash = '';
      this.dispatch('vkAuth/getAuth');
    }
  },
  getAuth({commit}) {
    let auth = true;
    let accessToken = cookies.getCookie('access_token');
    if (accessToken === '') {
      accessToken = null;
      auth = false;
    }
    commit('setAuth', {
      auth,
      accessToken
    })
  }
};

/* mutations */
const mutations = {
  setAuth(state, auth) {
    state.auth = auth.auth;
    state.accessToken = auth.accessToken;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
