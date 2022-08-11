<template>
  <div>
    <h1>Login to your account</h1>
    <vs-row vs-justify="center" style="padding-top: 2rem;">
      <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="6">
        <vs-input label-placeholder="Email" style="padding-right: 1rem; width: 100%;" v-model="email"/>
        <vs-input @submit="login" label-placeholder="Password" type="password" style="padding-right: 1rem; padding-top: 1rem; padding-bottom: 1rem; width: 100%;" v-model="password"/>
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
    login() {

    }
  }
};
</script>
