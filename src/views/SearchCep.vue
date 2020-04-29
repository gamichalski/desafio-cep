<template>
  <div class>
    <div class="hero is-light search-form">
      <div class="hero-body has-text-centered">
        <h2 class="title">{{ title }}</h2>
        <div class="center">
          <search-form @address-found="addAddress"></search-form>
        </div>
      </div>
    </div>
    <search-result
      v-if="result.showResult"
      :title="resultTitle"
      :address="resultAddress"
      :error="result.notFoundText"
    ></search-result>
    <search-history :history="history" :address="address"></search-history>
  </div>
</template>

<script>
import { formatCep } from "@/utils/format";
import SearchForm from "@/components/SearchForm";
import SearchHistory from "@/components/SearchHistory";
import SearchResult from "@/components/SearchResult";

export default {
  components: {
    SearchForm,
    SearchHistory,
    SearchResult
  },
  data() {
    return {
      title: "Encontre seu endereço pelo CEP",
      address: "",
      history: [],
      result: {
        showResult: false,
        notFoundText: "Nenhum endereço encontrado para esse CEP"
      }
    };
  },
  methods: {
    addAddress(value) {
      this.address = "";

      if (Object.keys(value).length) {
        const resultItem = `<strong>${formatCep(
          value.cep
        )}</strong>&nbsp;- ${this.formatAddress(value)}`;

        this.address = value;
        this.history.unshift(resultItem);

        if (this.history.length > 5) this.history.pop();
      }

      this.result.showResult = true;
    },
    formatAddress(address) {
      const { bairro, cidade, logradouro, uf } = address;

      return `${logradouro}, ${bairro}, ${cidade} - ${uf}`;
    }
  },
  computed: {
    resultAddress() {
      if (this.address) {
        return this.formatAddress(this.address);
      }

      return "";
    },
    resultTitle() {
      if (this.address) {
        return `Resultado para o CEP ${formatCep(this.address.cep)}`;
      }

      return "";
    }
  }
};
</script>

<style>
.hero {
  border-radius: 0.5rem;
}
.center {
  display: flex;
  justify-content: center;
}
.search-form {
  margin-bottom: 2em;
}
</style>
