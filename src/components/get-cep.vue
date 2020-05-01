<template>
  <div>
    <div class="container">
      <div class="notification columns">
        <div class="column is-11">
          <input
            :class="{ 'is-danger': $v.$invalid }"
            class="input is-info"
            type="number"
            placeholder="Digite o CEP"
            :disabled="isLoading"
            v-model="cep"
            @keyup.enter="searchCep"
          />
        </div>
        <div class="column">
          <button
            :class="{ 'is-loading': isLoading }"
            class="button is-info"
            :disabled="$v.$invalid"
            @click="searchCep"
          >
            Buscar
          </button>
        </div>
      </div>
    </div>
    <br />
    <div class="tile is-parent is-4 centered is-11" v-if="cepFound">
      <article class="tile is-child notification is-info">
        {{ showCep }}
      </article>
    </div>
  </div>
</template>

<script>
import { searchCep } from "@/services/cep-api";
import { maxLength } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      cep: null,
      isLoading: false,
      cepFound: null
    };
  },
  validations: {
    cep: {
      maxLength: maxLength(8),
      onlyNumbers: value => /[0-9]+/.test(value)
    }
  },
  computed: {
    showCep() {
      let showCep = "";
      if (this.cepFound.cidade) {
        if (this.cepFound.logradouro) {
          showCep = `${this.cepFound.logradouro}, ${this.cepFound.bairro}, `;
        }
        showCep += `${this.cepFound.cidade} - ${this.cepFound.uf}`;
      } else {
        showCep = "O endereço para este CEP não foi encontrado";
      }
      return showCep;
    }
  },
  watch: {
    cep(value) {
      if (value === "" && this.cepFound && this.cepFound.cidade) {
        this.$emit("found", this.cepFound);
        this.cepFound = "";
      }
    }
  },
  methods: {
    searchCep() {
      this.isLoading = true;
      searchCep(this.cep)
        .then(({ data }) => {
          this.cepFound = data;
        })
        .finally(() => {
          this.isLoading = false;
        });
    }
  }
};
</script>

<style lang="scss">
.centered {
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  font-weight: bold;
}
</style>
