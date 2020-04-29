<template>
  <div id="app" class="container">
    <page-header></page-header>
    <search-cep></search-cep>
  </div>
</template>

<script>
import PageHeader from "@/components/PageHeader";
import SearchCep from "@/views/SearchCep";

export default {
  name: "App",
  components: {
    SearchCep,
    PageHeader
  }
};
</script>

<style lang="scss">
@import "~bulma";
</style>
