<template>
  <section>
    <h1 class="section__title">
      Bienvenue sur votre réseau social d'entreprise
    </h1>
    <LoginForm />
  </section>
</template>

<script>
import LoginForm from './../components/LoginForm.vue';

document.title = "Home | Groupomania - Votre réseau social d'entreprise";

export default {
  name: 'Home',
  components: {
    LoginForm
  }
};
</script>

<style scoped>
section {
  width: 100%;
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  border-radius: 5px;
}

.section__title {
  width: 100%;
  text-align: center;
}
</style>
