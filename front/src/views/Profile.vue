<template>
  <Profile />
</template>

<script>
import Profile from './../components/Profile.vue';

document.title = 'Profile';

export default {
  name: 'ProfileView',
  components: {
    Profile
  }
};
</script>
