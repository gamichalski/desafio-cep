<template>
  <div class="container is-fullheight is-fullcenter">
    <h1 class="title">Buscador de Cep</h1>
    <search-bar @found="onFoundCep"></search-bar>
    <cep-exhibitor
      :cepHistory="cepHistory"
      :cepSearched="cepSearched"
    ></cep-exhibitor>
  </div>
</template>

<script>
import SearchBar from "@/components/SearchBar";
import CepExhibitor from "@/components/CepExhibitor";

export default {
  components: {
    SearchBar,
    CepExhibitor
  },
  data() {
    return {
      cepHistory: [],
      cepSearched: {}
    };
  },
  methods: {
    onFoundCep(cep) {
      this.cepSearched = cep;
      this.cepHistory.unshift(cep);

      console.log(this.cepHistory);

      if (this.cepHistory.length > 5) {
        this.cepHistory.pop();
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
</style>
