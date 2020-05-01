<template>
  <div class="field has-addons is-fullwidth">
    <div
      class="control is-expanded is-large"
      :class="{ 'is-loading': isLoading }"
    >
      <div class="is-fullwidth">
        <input
          :disabled="disableInput"
          :class="{ 'is-danger': $v.$invalid }"
          class="input is-large is-fullwidth"
          v-model="filter"
          placeholder="Digite o CEP"
          @keyup.enter="onFilterSuggestions"
        />
      </div>
      <p
        v-show="filterErrorMessages"
        class="help is-danger"
        v-for="(errorMessage, index) in filterErrorMessages"
        :key="index"
      >
        {{ errorMessage }}
      </p>
      <p
        v-show="notFoundMessage && filter"
        class="help is-danger"
        v-for="(errorMessage, index) in notFoundMessage"
        :key="index"
      >
        {{ errorMessage }}
      </p>
    </div>
    <div class="control">
      <a class="button is-large" @click="onFilterSuggestions">Buscar</a>
    </div>
  </div>
</template>

<script>
var _ = require("lodash");
import { maxLength, minLength, numeric } from "vuelidate/lib/validators";
import { getCep } from "@/services/busca-cep";
import { getValidatorMessages } from "@/utils/validators";

export default {
  name: "SearchBar",

  data() {
    return {
      isLoading: false,
      cepNotFound: true,
      filter: "",
      disableInput: false,
      notFoundMessage: []
    };
  },
  validations: {
    filter: {
      noWhitespaces: value => !value.includes(" "),
      maxLength: maxLength(8),
      minLength: minLength(8),
      numeric: numeric
    }
  },
  computed: {
    filterErrorMessages() {
      return getValidatorMessages(this.$v.filter);
    }
  },
  watch: {
    filter(filter) {
      if (!filter) {
        this.notFoundMessage = [];
      }
    }
  },
  methods: {
    onFilterSuggestions() {
      if (this.filter && !this.$v.$invalid) {
        this.notFoundMessage = [];
        this.disableInput = true;
        this.isLoading = true;

        getCep(this.filter)
          .then(({ data }) => {
            if (_.isEmpty(data)) {
              this.notFoundMessage.push("Cep não encontrado");
              this.disableInput = false;
              this.isLoading = false;
            } else {
              this.$emit("found", data);
            }
          })
          .catch(() => {
            this.notFoundMessage.push("Cep não encontrado");
            this.disableInput = false;
            this.isLoading = false;
          })
          .finally(() => {
            this.disableInput = false;
            this.isLoading = false;
          });
      }
    }
  }
};
</script>

<style scoped>
.is-fullwidth {
  width: 100%;
}
</style>
