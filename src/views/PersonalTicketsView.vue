<template>
  <div v-if="!this.loading">
    <h1>Your Tickets</h1>
    <p>All tickets created by you are displayed here.</p>
    <vs-divider></vs-divider>
    <TicketTable :perPage="12" :tickets="tickets" style="padding: 0rem; padding-top: 0rem;" />
  </div>
</template>

<script>
import {auth} from "@/functions/auth"
import TicketTable from "@/components/TicketTable.vue"
const api = require("@/functions/api-requests.js");
const config = require("../../config.json")

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
      loading: true,
      tickets: []
    }
  },
  async mounted() {
    this.$vs.loading()
    await delay(500)
    if (auth.currentUser != null) {
      this.authUser = auth.currentUser

      await api.updateAPIAuth();   
      let response = await api.axios.get(config["api-hostname"] + "/api/v1/tickets/get/created")
      if(response.data.status == "success") {
        this.loading = false
        this.tickets = response.data.tickets
      } else {
        this.loading = false
        this.$vs.notify({
          title: 'Error loading tickets',
          text: response.data.message,
          color: 'danger',
          iconPack: 'feather',
          icon: 'icon-alert-circle'
        })
      }

      this.loading = false
      this.$vs.loading.close()
    }
    else {
      this.$vs.loading.close()
      this.$router.push("/login?redirect=/me/tickets")
    }
  },
})
</script>
