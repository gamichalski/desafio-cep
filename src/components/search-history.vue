<template>
  <div>
    <div
      class="tile is-parent is-4 centered is-11"
      v-if="cepHistory && cepHistory.length > 0"
    >
      <article class="tile is-child notification is-info">
        <p class="title">Histórico de buscas</p>
        <div v-for="(item, index) in cepHistory" :key="index">
          <p class="subtitle">{{ showCep(item) }}</p>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cep: Object
  },
  data() {
    return {
      cepHistory: []
    };
  },
  watch: {
    cep(value) {
      this.history(value);
    }
  },
  methods: {
    history(cep) {
      if (this.cepHistory.length === 5) {
        this.cepHistory.shift(cep);
      }
      this.cepHistory.push(cep);
    },
    showCep(cep) {
      let showCep = "";
      if (cep.cidade) {
        if (cep.logradouro) {
          showCep = `${cep.logradouro}, ${cep.bairro}, `;
        }
        showCep += `${cep.cidade} - ${cep.uf}`;
      }
      return showCep;
    }
  }
};
</script>
