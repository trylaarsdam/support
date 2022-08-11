<template>
  <div>
    <h1>Login to your account</h1>
    <vs-row vs-justify="center" style="padding-top: 2rem;">
      <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="6">
        <vs-input v-on:keyup.enter="login" label-placeholder="Email" style="padding-right: 1rem; width: 100%;" v-model="email"/>
        <vs-input v-on:keyup.enter="login" label-placeholder="Password" type="password" style="padding-right: 1rem; padding-top: 1rem; padding-bottom: 1rem; width: 100%;" v-model="password"/>
        <vs-button @click="login" style="width: 50%;" color="success">Login</vs-button>
      </vs-col>
      <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="6" style="padding-top: 1rem;">
        <p>Use the credentials you used to sign up for an account at support.toddr.org.
          <br/>
          If you need to make an account, <router-link to="signup">signup here</router-link>.
        </p>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
const auth = require("@/functions/auth")
export default {
  name: "LoginView",
  components: {},
  data () {
    return {
      email: "",
      password: ""
    }
  },
  methods: {
    async login() {
      console.log("Logging in...")
      let response = await auth.signIn(this.email, this.password)
      if(response.user) {
        this.$router.push("/me")
      } else {
        console.log(response.code)
        switch(response.code) {
          case "auth/user-not-found":
            this.$vs.notify({
              title: "User not found",
              text: "The user you are trying to log in to does not exist.",
              color: "danger",
              iconPack: "feather",
              icon: "icon-alert-circle"
            })
            break;
          case "auth/wrong-password":
            this.$vs.notify({
              title: "Wrong password",
              text: "The password you entered is incorrect.",
              color: "danger",
              iconPack: "feather",
              icon: "icon-alert-circle"
            })
            break;
          case "auth/invalid-email":
            this.$vs.notify({
              title: "Invalid email",
              text: "The email you entered is invalid.",
              color: "danger",
              iconPack: "feather",
              icon: "icon-alert-circle"
            })
            break;
          case "auth/user-disabled":
            this.$vs.notify({
              title: "User disabled",
              text: "The user you are trying to log in to is disabled.",
              color: "danger",
              iconPack: "feather",
              icon: "icon-alert-circle"
            })
            break;
          case "auth/internal-error":
            this.$vs.notify({
              title: "Login Error",
              text: "An error occurred trying to log you in.",
              color: "danger",
              iconPack: "feather",
              icon: "icon-alert-circle"
            })
            break;
          default:
            this.$vs.notify({
              title: "Login Error",
              text: "An unknown error occurred trying to log you in.",
              color: "danger",
              iconPack: "feather",
              icon: "icon-alert-circle"
            })
            break;
        }
      }
    }
  }
};
</script>
