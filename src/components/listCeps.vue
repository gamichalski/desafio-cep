<template>
  <div v-show="listCeps.length > 0">
    <h4 class="subtitle is-5">{{ title }}</h4>
    <ul>
      <li v-for="(ceps, index) in listCeps" :key="index">
        <h5 v-if="ceps.length === 0" class="subtitle is-5">
          Nenhum CEP encontrado para {{ ceps.cep }}
        </h5>
        <h5 v-else class="subtitle is-5">
          {{ ceps.logradouro }}, {{ ceps.bairro }}, {{ ceps.cidade }} -
          {{ ceps.uf }}
        </h5>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "Histórico de Buscas:"
    };
  },
  props: {
    listCeps: Array
  }
};
</script>

<style lang="scss">
li {
  list-style-type: disc;
}
</style>
