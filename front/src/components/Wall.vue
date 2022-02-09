<template>
  <div v-if="publications.length > 0">
    <AddPostForm />
    <section
      v-for="post in publications"
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

        <div class="publications__delete" v-if="user.admin === 1">
          <p class="publications__delete-txt" @click="deletePost(post.postId)">
            Supprimer
          </p>
        </div>
        <div
          class="publications__like-comment-count"
          v-if="post.comment_count > 0"
        >
          <div
            class="publications__comment-count"
            @click="goToComments(post.userId, post.postId)"
            v-if="post.comment_count === 1"
          >
            {{ post.comment_count }} commentaire
          </div>

          <div
            class="publications__comment-count"
            @click="goToComments(post.userId, post.postId)"
            v-else
          >
            {{ post.comment_count }} commentaires
          </div>
        </div>

        <div class="publications__like-comment">
          <div class="like-comment__like">
            <FaSolidHeart />
            <span class="icon__legend">&nbsp;J'aime</span>
          </div>

          <div class="like-comment__comment" @click="comment = true">
            <FaSolidComment />
            <span
              class="icon__legend"
              @click="goToComments(post.userId, post.postId)"
              >&nbsp;Commenter</span
            >
          </div>
        </div>
      </div>
    </section>
  </div>
  <div v-else-if="publications.length === 0">
    <p>Aucune publication pour le moment</p>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';

import FaSolidHeart from './Heart.vue';
import FaSolidComment from './CommentIcon.vue';
import AddPostForm from './AddPost.vue';

const userSessionData = JSON.parse(localStorage.getItem('userSession'));
const sessionToken = userSessionData.token;
if (sessionToken) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionToken;
}

export default {
  name: 'Wall',
  components: {
    FaSolidHeart,
    FaSolidComment,
    AddPostForm
  },
  data() {
    return {
      comment: false,
      user: [],
      commentCount: 0
    };
  },
  beforeMount() {
    this.getResult();
    this.getSession();
  },
  methods: {
    getResult: function () {
      this.$store.dispatch('setPublications');
    },
    goToProfile: function (userId) {
      this.$router.push(`/profile/${userId}`);
    },
    goToComments: function (userId, postId) {
      this.$router.push(`/comments/${userId}/${postId}`);
    },
    getSession: function () {
      if (localStorage.userSession) {
        this.user = JSON.parse(localStorage.userSession);
      }
    },
    deletePost: function (postId) {
      axios
        .delete(`http://localhost:3000/api/publications/${postId}`)
        .then(() => this.$router.go())
        .catch((error) => console.log(error));
    },
    getComments: function (postId) {
      this.$store.dispatch('getPublicationComments', postId);
    }
  },
  computed: {
    ...mapState(['publications', 'comments']),
    getCommentCount: function (postId) {
      return postId;
    }
  }
};
</script>

<style scoped>
.publications {
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

.publications__card .publications__author:hover {
  cursor: pointer;
}

.publications__card .publications__date-time {
  margin-top: -20px;
  font-size: 0.8rem;
  color: grey;
}

.publications__card .publications__delete .publications__delete-txt {
  margin-top: -5px;
  font-size: 0.85rem;
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
.publications__card .publications__comment-count:hover,
.publications__card .publications__delete .publications__delete-txt:hover {
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
