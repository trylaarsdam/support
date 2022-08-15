<template>
  <div id="app">
    <header>
      <AppBar :user="this.$store.state.signedInUser" />
    </header>
    <router-view style="padding: 1rem;"/>
  </div>
</template>

<script>
import AppBar from "@/components/nav/AppBar.vue";

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
