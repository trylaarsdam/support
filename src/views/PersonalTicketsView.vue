<template>
  <div v-if="!this.loading">
    <h1>Your Tickets</h1>
    <p>All tickets created by you are displayed here.</p>
    <vs-divider></vs-divider>
    <TicketTable tickets="12" style="padding: 0rem; padding-top: 0rem;" />
  </div>
</template>

<script>
import {auth} from "@/functions/auth"
import TicketTable from "@/components/TicketTable.vue"

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default ({
  name: "PersonalTicketsView",
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
      this.$router.push("/login?redirect=/me/tickets")
    }
  },
})
</script>
