<template>
  <div />
</template>

<script>
import {auth} from "@/functions/auth"

export default ({
  name: "ProfileView",
  setup() {
    
  },
  mounted() {
    if(!auth.currentUser) {
      this.$router.push("login?redirect=/me")
    }
  },
})
</script>
