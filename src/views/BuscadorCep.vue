<template>
  <div class="container is-fullheight is-fullcenter">
    <h1 class="title">Buscador de CEP</h1>
    <pesquisa-cep @cep-encontrado="adicionarCep" />
    <lista-cep v-if="ceps.length > 0" :ceps="ceps" class="has-margin-top" />
  </div>
</template>

<script>
import PesquisaCep from "@/components/PesquisaCep";
import ListaCep from "@/components/ListaCep";
export default {
  components: {
    PesquisaCep,
    ListaCep
  },
  data() {
    return {
      ceps: []
    };
  },
  methods: {
    adicionarCep(cepInfo) {
      this.ceps.unshift(cepInfo);

      if (this.ceps.length > 5) {
        this.ceps.pop();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.is-fullheight {
  height: 100vh;
}
.is-fullcenter {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.has-margin-top {
  margin-top: 30px;
}
</style>
