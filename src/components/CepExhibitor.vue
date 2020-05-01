<template>
  <div>
    <div class="container" v-if="cepSearched.logradouro">
      <h3 class="title is-3">
        {{ cepSearched.logradouro }}, {{ cepSearched.bairro }},
        {{ cepSearched.cidade }} - {{ cepSearched.uf }}, {{ cepSearched.cep }}2
      </h3>
    </div>
    <br />
    <section class="section" v-if="cepHistory.length > 0">
      <div v-for="(cep, index) in cepHistory" :key="index">
        <div>
          {{ cep.logradouro }}, {{ cep.bairro }},
          {{ cep.cidade }}
          -
          {{ cep.uf }},
          {{ cep.cep }}
        </div>
        <br />
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "CepExhibitor",
  props: {
    cepHistory: Array,
    cepSearched: Object
  }
};
</script>
