<template>
  <div class="box">
    <p class="has-text-centered title is-4">Histórico de pesquisa:</p>
    <div v-for="(cep, index) in ceps" :key="index">
      <p>
        <span class="has-text-weight-bold">{{ cep.cep }}</span> -
        {{ cep.logradouro }}, {{ cep.bairro }}. {{ cep.cidade }} - {{ cep.uf }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "CepList",

  props: {
    ceps: Array
  }
};
</script>

<style lang="scss" scoped></style>
