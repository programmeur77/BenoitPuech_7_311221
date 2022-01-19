<template>
  <div>
    <section
      v-for="post in onePublication"
      :key="post.postId"
      class="publications"
    >
      <div v-bind:data-id="post.postId" class="publications__card">
        <div class="publications__author" :data-user-id="post.userId">
          <img :src="post.avatarUrl" alt="Photo de profil" />&nbsp;
          <span
            class="publications__author-profile"
            @click="goToProfile(post.userId)"
          >
            {{ post.firstName }} {{ post.lastName }}
          </span>
        </div>

        <div
          class="publications__content"
          v-if="post.postContent !== null && post.postContent !== ''"
        >
          <p>{{ post.postContent }}</p>
        </div>

        <div
          class="publications__content"
          v-else-if="
            post.postContent === null ||
            (post.postContent === '' &&
              (post.imageUrl !== null || post.imageUrl !== ''))
          "
        >
          <img :src="post.imageUrl" alt="Image de publication" />
        </div>

        <div
          class="publications__content"
          v-else-if="
            (post.postContent !== null || post.postContent !== '') &&
            (post.imageUrl !== null || post.imageUrl !== '')
          "
        >
          <p>{{ post.postContent }}</p>
          <img :src="post.imageUrl" alt="Image de publication" />
        </div>

        <div class="publications__date-time">
          <p>Publié le {{ post.post_date }}</p>
        </div>

        <div
          class="publications__like-comment-count"
          v-if="comments.length > 0"
        >
          <div class="publications__comment-count">
            {{ comments.length }}
            <span v-if="comments.length === 1"> commentaire</span>
            <span v-else>commentaires</span>
          </div>
        </div>
      </div>
    </section>

    <AddCommentForm :postId="this.$route.params.postId" />

    <div v-if="comments.length > 0">
      <section
        v-for="comment in comments"
        :key="comment.commentId"
        class="publications publications--comments"
      >
        <div class="publications__card publications__card--comment">
          <div class="publications__author">
            <img :src="comment.avatarUrl" alt="Photo de profil" />&nbsp;
            <span
              class="publications__author-profile"
              @click="goToProfile(comment.userId)"
            >
              {{ comment.firstName }} {{ comment.lastName }}
            </span>
          </div>

          <div class="publications__content">
            <p>{{ comment.commentContent }}</p>
          </div>

          <div class="publications__date-time">
            <p>Publié le {{ comment.comment_date }}</p>
          </div>
          <div
            class="publications__delete"
            v-if="comment.userId == this.$route.params.userId"
            @click="removeComment(comment.commentId)"
          >
            Supprimer
          </div>
        </div>
      </section>
    </div>
    <div v-else>
      <p class="comment__text">Aucun commentaire pour le moment</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';

import AddCommentForm from './AddComment.vue';

const userSessionData = JSON.parse(localStorage.getItem('userSession'));
const sessionToken = userSessionData.token;
if (sessionToken) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionToken;
}

export default {
  name: 'PublicationComments',
  components: {
    AddCommentForm
  },
  data() {
    return {
      userId: localStorage.userId
    };
  },
  beforeMount() {
    this.getPublication(this.$route.params.postId);
    this.getPublicationComments(this.$route.params.postId);
  },
  methods: {
    getPublication: function (postId) {
      this.$store.dispatch('getOnePublication', postId);
    },
    getPublicationComments: function (postId) {
      this.$store.dispatch('getPublicationComments', postId);
    },

    removeComment: function (commentId) {
      this.$store.dispatch('removeComment', this.userId, commentId);
    }
  },
  computed: {
    ...mapState(['onePublication', 'comments'])
  }
};
</script>

<style scoped>
.publications,
.comment__text {
  width: 30%;
  margin: 10px auto;
}

.publications__card {
  width: 99%;
  padding: 10px;
  padding-left: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: rgba(138, 185, 241, 0.4);
}

.publications__card--comment {
  margin-bottom: -10px;
  border-top: 5px solid white;
}

.publications__card .publications__author:hover {
  cursor: pointer;
}

.publications__card .publications__date-time {
  margin-top: -20px;
  font-size: 0.8rem;
  color: grey;
}

.publications__card .publications__like-comment-count {
  width: 92%;
  height: fit-content;
  margin: auto 0;
  padding: 5px;
  border-top: 1px solid white;
}

.publications__card .publications__comment-count {
  margin-right: 15px;
  text-align: right;
}

.publications__card .publications__like-comment {
  width: 95%;
  height: fit-content;
  margin: auto 0;
  padding-top: 10px;
  display: flex;
  justify-content: space-around;
  border-top: 1px solid white;
}

.publications__card .like-comment__like:hover,
.publications__card .like-comment__comment:hover,
.publications__card .publications__comment-count:hover {
  cursor: pointer;
  color: #4b77be;
}

.publications__card .publications__add-comment {
  width: 95%;
  padding-top: 5px;
  border-top: 1px solid white;
}

.publications__card .publications__add-comment .add-comment__field {
  width: 98%;
  height: 25px;
  margin-top: 5px;
  padding-top: 0px;
  padding: 13px;
  border-radius: 50px;
  resize: none;
  font-family: 'poppins';
  outline: none;
}
</style>
