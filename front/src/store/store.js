import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
  state: {
    publications: []
  },
  mutations: {
    SET_PUBLICATIONS(state, publicationsGot) {
      state.publications = publicationsGot;
    },
    POST_PUBLICATION(state, publicationToAdd) {
      state.publications.push(publicationToAdd);
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
    },

    addPublication({ commit }, publicationToPost) {
      axios
        .post('http://localhost:3000/api/publications/post', publicationToPost)
        .then((response) => {
          commit('POST_PUBLICATIONS', response.data);
        })
        .catch((error) => console.log(error));
    }
  },
  getters: {
    formattedPublications: (state) => {
      return state.publications.postId;
    }
  }
});

export default store;
