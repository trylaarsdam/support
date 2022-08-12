<template>
  <div>
    <h1>Welcome, {{user.firstName}} {{user.lastName}}</h1>
    <h4>Contact email: {{authUser.email}}</h4>
  </div>
</template>

<script>
import {auth} from "@/functions/auth"

export default ({
  name: "ProfileView",
  data: () => ({
    authUser: auth.currentUser,
    user: this.$store.state.signedInUser
  }),
  setup() {
    
  },
  mounted() {
    if(!auth.currentUser) {
      this.$router.push("login?redirect=/me")
    }
  },
})
</script>
