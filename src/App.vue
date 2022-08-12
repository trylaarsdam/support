<template>
  <div id="app">
    <header>
      <AppBar />
    </header>
    <router-view style="padding: 1rem;"/>
  </div>
</template>

<script>
import AppBar from "@/components/nav/AppBar.vue";
import {auth, onAuthStateChanged} from "@/functions/auth"

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    console.log(`Signed in UID: ${uid}`);
 
    // if(!user.emailVerified) { //TODO make server handle this
    //   try {
    //     sendEmailVerification(user)
    //   } catch (err) {
    //     this.$vs.notify({
    //       title: "Email Verification Failed",
    //       text: "We tried to send you an email to verify your account, but something went wrong. Please create a ticket and include this code: " + err.code,
    //       color: "danger",
    //       iconPack: "feather",
    //       icon: "icon-alert-circle"
    //     })
    //   }
    // }
    // // ...
  } else {
    // User is signed out
    // ...
    console.log("No user signed in");
  }
});

export default({
  setup() {
    
  },
  components: {
    AppBar
  }
})
</script>


<style lang="scss">

</style>
