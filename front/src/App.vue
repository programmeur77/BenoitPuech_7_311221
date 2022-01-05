<template>
  <div>
    <header>
      <img src="./assets/logo.png" alt="White logo" class="header__logo" />
    </header>
    <LoginForm />
  </div>
</template>

<script>
import LoginForm from './components/LoginForm.vue';
export default {
  name: 'App',
  components: {
    LoginForm
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200&display=swap');
header {
  width: 100%;
  height: 1%;
  display: flex;
  justify-content: center;
  background: #003171;
}

.header__logo {
  width: 200px;
  height: 200px;
}
</style>
