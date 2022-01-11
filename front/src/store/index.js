import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
  state: {
    publications: []
  },
  mutations: {
    SET_PUBLICATIONS(state, publicationsGot) {
      this.publications = publicationsGot;
    }
  },
  actions: {
    setPublications({ commit }) {
      axios
        .get('http://localhost:3000/api/publications')
        .then((response) => {
          commit('SET_PUBLICATIONS', response.data);
        })
        .catch((error) => console.log(error));
    }
  }
});

export default store;
