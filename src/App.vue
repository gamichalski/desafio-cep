<template>
  <div id="app">
    <buscador-cep />
  </div>
</template>

<script>
import BuscadorCep from "./views/BuscadorCep";

export default {
  name: "App",
  components: {
    BuscadorCep
  }
};
</script>

<style lang="scss">
@import "~bulma";
</style>
