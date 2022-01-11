<template>
  <div v-if="result.length > 0">
    <AddPostForm />
    <section
      v-for="postContent in result"
      :key="postContent.postId"
      class="publications"
    >
      <div v-bind:data-id="postContent.postId" class="publications__card">
        <div class="publications__author" :data-user-id="postContent.userId">
          <img :src="postContent.avatarUrl" alt="Photo de profil" />&nbsp;
          <span
            class="publications__author-profile"
            @click="goToProfile(postContent.userId)"
          >
            {{ postContent.firstName }} {{ postContent.lastName }}
          </span>
        </div>

        <div
          class="publications__content"
          v-if="
            postContent.postContent !== null && postContent.postContent !== ''
          "
        >
          <p>{{ postContent.postContent }}</p>
        </div>

        <div
          class="publications__content"
          v-else-if="
            postContent.postContent === null ||
            (postContent.postContent === '' &&
              (postContent.imageUrl !== null || postContent.imageUrl !== ''))
          "
        >
          <img :src="postContent.imageUrl" alt="Image de publication" />
        </div>

        <div
          class="publications__content"
          v-else-if="
            (postContent.postContent !== null ||
              postContent.postContent !== '') &&
            (postContent.imageUrl !== null || postContent.imageUrl !== '')
          "
        >
          <p>{{ postContent.postContent }}</p>
          <img :src="postContent.imageUrl" alt="Image de publication" />
        </div>

        <div class="publications__date-time">
          <p>Publié le {{ postContent.post_date }}</p>
        </div>

        <div
          class="publications__like-comment-count"
          v-if="postContent.comment_count > 0"
        >
          <div class="publications__comment-count">
            {{ postContent.comment_count }} commentaires
          </div>
        </div>

        <div class="publications__like-comment">
          <div class="like-comment__like">
            <FaSolidHeart />
            <span class="icon__legend">&nbsp;J'aime</span>
          </div>

          <div class="like-comment__comment" @click="comment = true">
            <FaSolidComment />
            <span class="icon__legend">&nbsp;Commenter</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios';
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
      result: [],
      comment: false
    };
  },
  beforeMount() {
    this.getResult();
  },
  methods: {
    getResult: function () {
      axios
        .get('http://localhost:3000/api/publications')
        .then((data) => data.data)
        .then((publication) => {
          this.result = publication;
        })
        .catch((error) => console.log(error));
    },
    goToProfile: function (userId) {
      this.$router.push(`/profile/${userId}`);
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
