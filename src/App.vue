<template>
  <div id="app">
    <header>
      <AppBar :user="this.$store.state.signedInUser" />
    </header>
    <SideBar />
    <router-view style="padding: 1rem;"/>
  </div>
</template>

<script>
import AppBar from "@/components/nav/AppBar.vue";
import SideBar from "@/components/nav/SideBar.vue"

export default({
  setup() {
    
  },
  components: {
    AppBar,
    SideBar
  }
})
</script>


<style lang="scss">

</style>
