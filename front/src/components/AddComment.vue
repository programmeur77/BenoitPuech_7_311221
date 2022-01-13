<template>
  <section class="add-post">
    <form method="post" class="add-post__form" @submit="postComment">
      <textarea
        name="postContent"
        class="form__write-post"
        id="postContent"
        placeholder="Dites quelque chose"
        v-model="comment.commentContent"
      ></textarea>
      <button
        class="form__submit"
        @click.prevent="publishPost"
        @click="postComment"
      >
        Commenter
      </button>
    </form>
  </section>
</template>

<script>
const user = JSON.parse(localStorage.getItem('userSession'));
const userId = user.userId;

export default {
  name: 'AddCommentForm',
  props: {
    postId: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      comment: {
        userId: userId,
        postId: parseInt(this.postId),
        commentContent: ''
      }
    };
  },
  methods: {
    postComment: function (event) {
      event.preventDefault();
      this.$store.dispatch('addComment', this.comment);
      this.$router.go();
    }
  }
};
</script>

<style scoped>
.add-post {
  width: 30vw;
  margin: 10px auto;
  padding: 10px;
  background: rgba(138, 185, 241, 0.4);
  display: flex;
  position: -webkit-sticky;
  position: sticky;
}

.add-post .form__write-post {
  width: 28vw;
  height: 50px;
  padding: 10px;
  resize: none;
  font-family: 'Poppins';
  border: none;
  background: rgba(212, 226, 243, 0.4);
  outline: none;
}

.add-post .form__add-image {
  margin: 5px 20px;
}

.add-post .form__add-image:hover {
  cursor: pointer;
}

.add-post .form__add-image .add-image__icon-legend {
  vertical-align: center;
  font-size: 0.85rem;
}

.add-post .form__submit {
  width: 29vw;
  border: none;
  padding: 10px;
  background: #003171;
  font-size: 1rem;
  font-weight: bolder;
  color: white;
  border-radius: 10px;
  cursor: pointer;
}
</style>
