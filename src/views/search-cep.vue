<template>
  <div>
    <section class="section">
      <h1 class="title">Busca de CEP</h1>
      <get-cep @found="cepFound" />
      <search-history :cep="cep" />
    </section>
  </div>
</template>

<script>
import GetCep from "@/components/get-cep";
import SearchHistory from "@/components/search-history";

export default {
  components: {
    GetCep,
    SearchHistory
  },
  data() {
    return {
      cep: null
    };
  },
  methods: {
    cepFound(cep) {
      this.cep = cep;
    }
  }
};
</script>
