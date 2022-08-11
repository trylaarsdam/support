<template>
  <div>
    <vs-navbar :color="colorNavBar"
      text-color="rgba(255,255,255,.6)"
      active-text-color="rgba(255,255,255,1)" 
      v-model="activeItem" 
      class="nabarx"
      style="padding: 0.5rem;"
      >
      <div slot="title">
        <vs-navbar-title style="color: white;">
          Support | toddr.org
        </vs-navbar-title>
      </div>

      <vs-navbar-item index="0" class="navBarItem">
        <router-link to="/" type="line">Home</router-link>
      </vs-navbar-item>
      <vs-navbar-item index="1" class="navBarItem">
        <router-link to="/me/tickets" type="line">My Tickets</router-link>
      </vs-navbar-item>
      <vs-navbar-item index="2" class="navBarItem">
        <router-link to="/new" type="line">Create Ticket</router-link>
      </vs-navbar-item>
      <vs-navbar-item index="3" class="navBarItem">
        <router-link to="signup" style="color: rgb(5, 173, 88)" type="line">Sign Up</router-link>
      </vs-navbar-item>
      <vs-navbar-item index="4" class="navBarItem">
        <router-link to="login" style="color: rgb(5, 173, 88)" type="line">Login</router-link>
      </vs-navbar-item>
    </vs-navbar>
  </div>
</template>

<style lang="css" scoped>
.navBarItem {
  padding: 0.25rem;
}
</style>

<script>
export default {
  name: "AppBar",
  data:()=>({
    activeItem: 0,
    colorNavBar: "#000000"
  })
}
</script>
