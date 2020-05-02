<template>
  <div id="app">
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div
          class="col-10 col-lg-6 d-flex align-items-center"
          style="height:100vh"
        >
          <div class="container-fluid">
            <input-search-cep @found="getHistoryCep"></input-search-cep>
            <history-search-cep :history-cep="historyCep"></history-search-cep>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InputSearchCep from "@/components/InputSearchCep";
import HistorySearchCep from "@/components/HistorySearchCep";

export default {
  name: "PainelCep",
  components: {
    InputSearchCep,
    HistorySearchCep
  },
  data: function() {
    return {
      historyCep: []
    };
  },
  methods: {
    getHistoryCep: function(data) {
      this.historyCep = data;
    }
  }
};
</script>

<style lang="scss"></style>
