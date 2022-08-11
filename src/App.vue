<template>
  <div id="app">
    <header>
      <AppBar />
    </header>
    <router-view/>
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
