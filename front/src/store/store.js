import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
  state: {
    userSession: [],
    publications: [],
    onePublication: [],
    comments: []
  },
  mutations: {
    SET_USER_SESSION(state, userSessionData) {
      state.userSession = userSessionData;
    },

    SET_PUBLICATIONS(state, publicationsGot) {
      state.publications = publicationsGot;
    },
    POST_PUBLICATION(state, publicationToAdd) {
      state.publications.push(publicationToAdd);
    },
    GET_ONE_PUBLICATION(state, publicationToGet) {
      state.onePublication = publicationToGet;
    },

    GET_PUBLICATION_COMMENTS(state, commentsToGet) {
      state.comments = commentsToGet;
    },

    POST_COMMENT(state, commentToPost) {
      state.comments.push(commentToPost);
    },
    DELETE_COMMENT(state, comments) {
      state.comments.filter((item) => {
        return item.comments.id !== comments.commentId;
      });
    }
  },
  actions: {
    setUserSession({ commit }, userLoginData) {
      axios
        .post('http://localhost:3000/api/user/login', userLoginData)
        .then((response) => commit('SET_USER_SESSION', response.data))
        .catch((error) => console.log(error));
    },
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
    },

    getOnePublication({ commit }, publicationId) {
      axios
        .get(`http://localhost:3000/api/publications/${publicationId}`)
        .then((response) => {
          commit('GET_ONE_PUBLICATION', response.data);
        });
    },

    getPublicationComments({ commit }, publicationId) {
      axios
        .get(`http://localhost:3000/api/comments/${publicationId}`)
        .then((response) => {
          commit('GET_PUBLICATION_COMMENTS', response.data);
        });
    },

    addComment({ commit }, commentToPost) {
      axios
        .post('http://localhost:3000/api/comments/post', commentToPost)
        .then((response) => {
          commit('POST_COMMENT', response.data);
        })
        .catch((error) => console.log(error));
    },

    removeComment({ commit }, userId, commentToRemoveId) {
      axios
        .delete(
          `http://localhost:3000/api/comments/${commentToRemoveId}`,
          userId
        )
        .then((response) => {
          commit('DELETE_COMMENT', response.data);
          console.log(response.data);
        })
        .catch((error) => console.log(error));
    }
  }
});

export default store;
