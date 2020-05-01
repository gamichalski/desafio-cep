<template>
  <search-cep />
</template>

<script>
import SearchCep from "./views/search-cep.vue";

export default {
  name: "App",
  components: {
    SearchCep
  }
};
</script>

<style lang="scss">
@import "~bulma";
</style>
