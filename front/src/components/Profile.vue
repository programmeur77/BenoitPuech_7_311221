<template>
  {{ userProfile }}
  <div class="user-profile" v-for="profile in userProfile" :key="profile.id">
    <h1 class="user-profile__title">
      Profil de {{ profile.firstName }} {{ profile.lastName }}
    </h1>
    <div class="profile-picture">
      <img
        :src="profile.avatarUrl"
        :alt="
          'Photo de profil de ' + profile.firstName + ' ' + profile.lastName
        "
        class="profile-picture__image"
      />
    </div>
    <div class="user-profile__info">
      <p class="user-profile__info-txt">
        {{ profile.firstName }} {{ profile.lastName }}
      </p>

      <p class="user-profile__info-txt">Email : {{ profile.email }}</p>

      <h3>Informations d'inscription</h3>
      <p class="user-profile__info-txt">
        Inscrit depuis le : {{ profile.signup_date }}
      </p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';

const userSessionData = JSON.parse(localStorage.getItem('userSession'));
const sessionToken = userSessionData.token;
if (sessionToken) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionToken;
}

export default {
  name: 'Profile',
  beforeMount() {
    this.getProfile(this.$route.params.userId);
  },
  methods: {
    getProfile: function (userId) {
      this.$store.dispatch('getUserProfile', userId);
    },

    checkUser: function (currentUserId) {
      if (currentUserId == localStorage.userId) {
        return true;
      } else {
        return false;
      }
    }
  },
  computed: {
    ...mapState(['userProfile'])
  }
};
</script>
