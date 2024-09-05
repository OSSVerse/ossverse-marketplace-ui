const actions = {
  async onAuthStateChangedAction(state, { authUser }) {
    if (!authUser) {
      // remove state
      state.commit('SET_USER', null);

      // redirect from here
      this.$router.push({
        path: '/Login'
      });
    } else {
      const { uid, email, Aa } = authUser;
      localStorage.setItem('token', Aa);
      state.commit('SET_USER', {
        uid,
        email,
        Aa
      });
      this.$router.go(-2);
    }
  }
};

const mutations = {
  SET_USER(state, user) {
    state.user = user;
  }
};

const state = () => ({
  user: null
});

const getters = {
  getUser(state) {
    return state.user;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
