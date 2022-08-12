<template>
  <h1>Welcome, {{user.firstName}} {{user.lastName}}</h1>
  <h4>Contact email: {{authUser.email}}</h4>
</template>

<script>
import {auth} from "@/functions/auth"

export default ({
  name: "ProfileView",
  data: () => ({
    authUser: auth.currentUser
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
