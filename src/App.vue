<template>
  <div id="app">
    <searchPage />
  </div>
</template>

<script>
import searchPage from "./components/searchPage.vue";

export default {
  name: "App",
  components: {
    searchPage
  }
};
</script>

<style lang="scss">
@import "~bulma/bulma";
</style>
