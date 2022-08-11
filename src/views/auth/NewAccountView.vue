<template>
  <div>
    <h1>Create a new account</h1>
    <vs-row vs-justify="center" style="padding-top: 2rem;">
      <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="6">
        <vs-input v-on:keyup.enter="login" label-placeholder="Your Name" style="padding-right: 1rem; width: 100%;" v-model="name"/>
        <vs-input v-on:keyup.enter="login" label-placeholder="Email" style="padding-right: 1rem; padding-top: 1rem; width: 100%;" v-model="email"/>
        <vs-input v-on:keyup.enter="login" label-placeholder="Password" type="password" style="padding-right: 1rem; padding-top: 1rem; padding-bottom: 1rem; width: 100%;" v-model="password"/>
        <vs-button @click="login" style="width: 50%;" color="success">Sign Up</vs-button>
      </vs-col>
      <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="6" style="padding-top: 1rem;">
        <p>
          If you already have an account, <router-link to="signin">signin here</router-link>.
        </p>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
const auth = require("@/functions/auth")
export default {
  name: "NewAccountView",
  components: {},
  data () {
    return {
      name: "",
      email: "",
      password: ""
    }
  },
  methods: {
    async login() {
      console.log("Logging in...")
      let response = await auth.signUp(this.email, this.password)
      if(response.user) {
        this.$router.push("/me")
      } else {
        console.log(response.code)
        switch(response.code) {
          case "auth/invalid-email":
            this.$vs.notify({
              title: "Invalid email",
              text: "The email you entered is invalid.",
              color: "danger",
              iconPack: "feather",
              icon: "icon-alert-circle"
            })
            break;
          case "auth/email-already-in-use":
            this.$vs.notify({
              title: "Email already in use",
              text: "The email you entered is already in use.",
              color: "danger",
              iconPack: "feather",
              icon: "icon-alert-circle"
            })
            break;
          case "auth/weak-password":
            this.$vs.notify({
              title: "Weak password",
              text: "The password you entered is too weak.",
              color: "danger",
              iconPack: "feather",
              icon: "icon-alert-circle"
            })
            break;
          case "auth/internal-error":
            this.$vs.notify({
              title: "Signup error",
              text: "There was an internal error.",
              color: "danger",
              iconPack: "feather",
              icon: "icon-alert-circle"
            })
            break;
          default:
            console.log(response.code)
            break;
        }
      }
    }
  }
};
</script>
