<template>
  <div class="user-profile" v-for="profile in userProfile" :key="profile.id">
    <h1 class="user-profile__title">
      Profil de {{ profile.firstName }} {{ profile.lastName }}
    </h1>
    <div class="user-profile__info">
      <input
        type="text"
        class="user-profile__info-modify"
        name="firstName"
        placeholder="Prénom"
        v-model="userInfo.firstName"
        v-if="modifyProfile === true"
      />
      <input
        type="text"
        class="user-profile__info-modify"
        name="lastName"
        placeholder="Nom"
        v-model="userInfo.lastName"
        @change="setNewLastName"
        v-if="modifyProfile === true"
      />
      <p class="user-profile__info-txt" v-else>
        {{ profile.firstName }} {{ profile.lastName }}
      </p>

      <p class="user-profile__info-txt">Email : {{ profile.email }}</p>

      <h3>Informations d'inscription</h3>
      <p class="user-profile__info-txt">
        Inscrit depuis le : {{ profile.signup_date }}
      </p>
    </div>
    <div class="user-profile__modify" v-if="profile.id == userId">
      <p
        @click="modifyProfile = true"
        v-if="modifyProfile === false"
        class="text-link"
      >
        Modifier le profil
      </p>

      <p
        @click="updateProfile(this.$route.params.userId)"
        v-if="modifyProfile === true"
        class="text-link"
      >
        Envoyer
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
  data() {
    return {
      userId: '',
      modifyProfile: false,
      userInfo: {
        firstName: '',
        lastName: '',
        userId: JSON.parse(userSessionData.userId)
      }
    };
  },
  beforeMount() {
    this.getProfile(this.$route.params.userId);
    this.getCurrentUserId();
  },
  methods: {
    updateProfile: function (userId) {
      axios
        .put(`http://localhost:3000/api/user/${userId}`, this.userInfo)
        .then(() => this.$router.go())
        .catch((error) => console.log(error));
    },

    getCurrentUserId: function () {
      this.userId = userSessionData.userId;
    },
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

<style scoped>
.user-profile {
  width: 90%;
  margin: 10px auto;
  padding: 10px 0;
  background: rgba(138, 185, 241, 0.4);
  text-align: center;
  font-family: 'poppins';
}

.user-profile .user-profile__info .user-profile__info-modify {
  margin-top: 10px;
  margin-right: 10px;
  padding: 10px;
}

.text-link {
  width: 10%;
  margin: 0 auto;
  padding: 10px;
  background-color: #003171;
  color: white;
}

.text-link:hover {
  cursor: pointer;
}
</style>
