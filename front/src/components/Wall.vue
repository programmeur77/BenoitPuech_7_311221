<template>
  <div v-if="result.length > 0">
    <section
      v-for="postContent in result"
      :key="postContent.postId"
      class="publications"
    >
      <div v-bind:data-id="postContent.postId" class="publications__card">
        <div class="publications__author" :data-user-id="postContent.userId">
          <img :src="postContent.avatarUrl" alt="Photo de profil" />&nbsp;
          <span class="publications__author-profile">
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

        <div class="publications__add-comment" v-if="comment === true">
          <textarea
            name="comment"
            class="add-comment__field"
            id="comment"
            placeholder="Commenter..."
          ></textarea>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios';
import FaSolidHeart from './Heart.vue';
import FaSolidComment from './CommentIcon.vue';

const userSessionData = JSON.parse(localStorage.getItem('userSession'));
const sessionToken = userSessionData.userToken;
if (sessionToken) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionToken;
}

export default {
  name: 'Wall',
  components: {
    FaSolidHeart,
    FaSolidComment
  },
  data() {
    return {
      result: [],
      comment: false,
      countComment: []
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
          this.getCommentCount(publication);
        })
        .catch((error) => console.log(error));
    },
    getCommentCount: function (publicationArray) {
      for (let index in publicationArray) {
        axios
          .get(
            `http://localhost:3000/api/comments/commentCount/${publicationArray[index].postId}`
          )
          .then((result) => {
            this.countComment = result.data;
            console.log(this.countComment.length);
          })
          .catch((error) => console.log(error));

        console.log(this.countComment);
      }
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

.publications__card .publications__like-comment {
  width: 95%;
  margin-bottom: 5px;
  padding-top: 5px;
  display: flex;
  justify-content: space-around;
  border-top: 1px solid white;
}

.publications__card .like-comment__like:hover,
.publications__card .like-comment__comment:hover {
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
