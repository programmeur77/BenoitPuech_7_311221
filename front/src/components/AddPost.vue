<template>
  <section class="add-post">
    <form method="post" class="add-post__form" @submit="postContent">
      <textarea
        name="postContent"
        class="form__write-post"
        id="postContent"
        placeholder="Dites quelque chose"
        v-model="publication.postContent"
      ></textarea>
      <div class="form__add-image">
        <div class="add-image__icon">
          <ImageIcon />
          <span class="add-image__icon-legend">Ajouter une image</span>
        </div>
      </div>
      <button
        class="form__submit"
        @click.prevent="publishPost"
        @click="postContent"
      >
        Publier
      </button>
    </form>
  </section>
</template>

<script>
import ImageIcon from './ImageIcon.vue';

const user = JSON.parse(localStorage.getItem('userSession'));
const userId = user.userId;

export default {
  name: 'AddPostForm',
  components: {
    ImageIcon
  },
  data() {
    return {
      publication: {
        userId: userId,
        postContent: '',
        imageUrl: ''
      }
    };
  },
  methods: {
    postContent: function (event) {
      event.preventDefault();
      this.$store.dispatch('addPublication', this.publication);
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
