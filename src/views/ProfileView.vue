<template>
  <div v-if="!this.loading">
    <h1>Welcome, {{$store.state.signedInUser.firstName}} {{$store.state.signedInUser.lastName}}</h1>
    <h4>Primary email: {{$store.state.signedInUser.email}}</h4>
    <TicketTable style="padding: 1rem; padding-top: 2rem;" />
  </div>
</template>

<script>
import {auth} from "@/functions/auth"
import TicketTable from "@/components/TicketTable.vue"

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default ({
  name: "ProfileView",
  components: {
    TicketTable
  },
  data () {
    return {
      authUser: auth.currentUser,
      user: this.$store.state.signedInUser,
      loading: true
    }
  },
  async mounted() {
    await delay(500)
    if (auth.currentUser != null) {
      this.authUser = auth.currentUser
      this.loading = false
    }
    else {
      this.$router.push("/login")
    }
  },
})
</script>
