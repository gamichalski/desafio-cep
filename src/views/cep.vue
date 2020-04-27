<template>
  <div class="container is-fullheight is-fullcenter">
    <h1 class="title">Buscador de CEP</h1>
    <search-bar @add-history="onAddHistory" />
    <ceps-list v-if="hasHistory" class="list" :ceps="ceps" />
  </div>
</template>

<script>
import CepsList from "@/components/cep-list";
import SearchBar from "@/components/search-bar";
export default {
  components: {
    CepsList,
    SearchBar
  },
  data() {
    return {
      ceps: []
    };
  },

  computed: {
    hasHistory() {
      return !!this.ceps.length;
    }
  },

  methods: {
    onAddHistory(cepInfo) {
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

.list {
  margin-top: 20px;
}
</style>
