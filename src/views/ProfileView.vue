<template>
  <div v-if="!this.loading">
    <h1>Welcome, {{$store.state.signedInUser.firstName}} {{$store.state.signedInUser.lastName}}</h1>
    <vs-divider></vs-divider>
    <vs-row vs-justify="center" style="padding-top: 0rem;">
      <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="6">
        <h2>Account Information</h2>
        <p>Contact Email: {{$store.state.signedInUser.email}}</p>
        <p>Permission Level: {{$store.state.signedInUser.role.charAt(0).toUpperCase() + $store.state.signedInUser.role.slice(1)}}</p>
        <p>User ID: {{$store.state.signedInUser.id}}</p>
      </vs-col>
      <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="6">
        <vs-td style="position: relative; float: right;">
          <vs-button @click="$router.push('/new')">Create ticket</vs-button>
        </vs-td>
      </vs-col>
    </vs-row>
    
    <vs-divider></vs-divider>
    <TicketTable :perPage="5" :tickets="tickets" style="padding: 0rem; padding-top: 0rem;" />
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
      this.$router.push("/login?redirect=/me")
    }
  },
})
</script>
