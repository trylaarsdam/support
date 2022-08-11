<template>
  <div id="firebaseui-auth-container"></div>
  <!-- <div id="loader">Loading...</div> -->

  <!-- <h1>Create an Account</h1>
  <p><input type="text" placeholder="Email" v-model="email" /></p>
  <p><input type="password" placeholder="Password" v-model="password" /></p>
  <p><button @click="register">Submit</button></p> -->
</template>

<script setup>
  import { ref } from 'vue'
  import { getAuth, createUserWithEmailAndPassword, EmailAuthProvider, isSignInWithEmailLink } from "firebase/auth";  
  import { useFirebaseAppStore } from '@/stores/firebase'
  // var firebaseui = require('firebaseui');
  import "firebaseui"

  const firebase = useFirebaseAppStore()

  const auth = getAuth(firebase.app);

  var ui = new firebaseui.auth.AuthUI(auth);
  ui.start('#firebaseui-auth-container', {
    signInOptions: [
      EmailAuthProvider.PROVIDER_ID
    ],
    // Other config options...
  });

  // Is there an email link sign-in?
  if (ui.isPendingRedirect()) {
    ui.start('firebaseui-auth-container', uiConfig);
  }

  import { useRouter } from 'vue-router' // import router
  const email = ref('')
  const password = ref('')
  const router = useRouter() // get a reference to our vue router
  const register = () => {
     // get the auth api
    createUserWithEmailAndPassword(auth, email.value, password.value) // need .value because ref()
      .then((data) => {
        console.log('Successfully registered!');
        // router.push('/feed') // redirect to the feed
      })
      .catch(error => {
        console.log(error.code)
        alert(error.message);
      });
  }
</script>

<style scoped>

</style>