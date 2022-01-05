<template>
  <form class="login" @submit="postData" method="post">
    <div id="form__errorMsg"></div>

    <div class="form__identity" id="formIdentity" v-if="signupStatus === false">
      <div class="form__names">
        <label for="nom" class="form__legend">Nom :</label><br />
        <input
          type="text"
          name="lastName"
          id="lastName"
          placeholder="Nom"
          class="form__field form__field--larger"
        />
      </div>

      <div class="form__name">
        <label for="prenom" class="form__legend">Prénom :</label><br />
        <input
          type="text"
          name="firstName"
          id="firstName"
          placeholder="Prénom"
          class="form__field form__field--larger"
        />
      </div>
    </div>
    <label for="email" class="form__legend">Email :</label>
    <input
      type="text"
      name="email"
      id="email"
      placeholder="exemple@exemple.com"
      class="form__field"
      v-model="posts.email"
    />
    <div id="password_error"></div>

    <label for="password" class="form__legend">Mot de passe :</label>
    <input
      type="password"
      name="password"
      id="password"
      placeholder="Mot de passe"
      class="form__field"
      v-model="posts.password"
    />
    <div id="password_error"></div>

    <div class="form__text">
      <p class="form__signup" v-if="signupStatus === true">
        Vous n'avez pas encore de compte ?
        <span class="form__link" @click="signupStatus = false">S'inscrire</span>
      </p>
      <p class="form__signup" v-if="signupStatus === false">
        Vous avez déjà un compte ?
        <span class="form__link" @click="signupStatus = true"
          >Se connecter</span
        >
      </p>
    </div>
    <div class="form__submition">
      <button class="form__submit" id="submit" v-if="signupStatus === true">
        Se connecter
      </button>
      <button class="form__submit" id="submit" v-else>S'inscrire</button>
    </div>
  </form>
</template>

<script>
import axios from 'axios';
export default {
  name: 'LoginForm',
  data() {
    return {
      posts: {
        lastName: '',
        firstName: '',
        email: '',
        password: ''
      },
      signupStatus: true
    };
  },
  methods: {
    postData: function (event) {
      event.preventDefault();
      if (this.signupStatus === true) {
        axios
          .post('http://localhost:3000/api/user/login', this.posts)
          .then((data) => {
            if (data.status === 200) {
              this.$router.push('/welcome');
            } else {
              alert(data.status);
            }
          })
          .catch((error) => console.log(error));
      }
    }
  }
};
</script>

<style>
form {
  width: 100%;
  margin-top: 30px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.form__identity {
  width: 30%;
  margin-top: -30px;
  margin-left: 28px;
  display: flex;
  flex-wrap: wrap;
  gap: -1rem;
  justify-content: center;
}

.form__legend {
  width: 100%;
  text-align: center;
}

.form__field {
  width: 24%;
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 20px;
  border: none;
  border-bottom: 1px solid #003171;
  outline: none;
  font-size: 1rem;
  font-family: 'Poppins';
}

.form__field--larger {
  width: 80%;
}

.form__signup {
  margin-bottom: 20px;
  font-size: 1rem;
}

.form__submition,
.form__text {
  width: 100%;
  display: flex;
  justify-content: center;
}

.form__link {
  text-decoration: underline;
  color: #0000ee;
}

.form__link:hover,
.form__submit:hover {
  cursor: pointer;
}

.form__link:visited {
  color: #551a8b;
}

.form__submit {
  width: 21%;
  padding: 15px;
  border: none;
  background: #003171;
  color: white;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 1rem;
  border-radius: 5px;
}
</style>
