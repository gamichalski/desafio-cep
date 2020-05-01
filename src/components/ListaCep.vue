<template>
  <div class="is-fullwidth">
    <h2 class="subtitle is-fullwidth">Histórico de buscas:</h2>
    <ul v-for="(cep, index) in ceps" :key="index">
      <li>{{ cep.logradouro }}, {{ cep.bairro }}, {{ cep.cidade }} - {{ cep.uf }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    ceps: Array
  }
};
</script>

<style lang="scss" scoped></style>
