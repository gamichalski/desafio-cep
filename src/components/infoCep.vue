<template>
  <div class="has-text-weight-bold has-text-centered">
    <h5 v-if="infoInputCep.length === 0" class="title is-5">
      Nenhum CEP encontrado para {{ infoInputCep.cep }}
    </h5>
    <h5 v-else class="title is-5">
      {{ infoInputCep.logradouro }}, {{ infoInputCep.bairro }},
      <br />
      {{ infoInputCep.cidade }} - {{ infoInputCep.uf }}
    </h5>
  </div>
</template>

<script>
export default {
  props: {
    infoInputCep: Object
  },
  methods: {}
};
</script>
