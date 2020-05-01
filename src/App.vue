<template>
  <div id="app">
    <search-cep />
  </div>
</template>

<script>
import SearchCep from "@/views/SearchCep.vue";

export default {
  name: "App",
  components: {
    SearchCep
  }
};
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
