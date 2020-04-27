<template>
  <div class="is-fullwidth">
    <div class="field has-addons is-fullwidth">
      <div
        class="control is-expanded is-large"
        :class="{ 'is-loading': isLoading }"
      >
        <input
          class="input is-large"
          :class="{ 'is-danger': this.searchString && $v.$invalid }"
          v-model="searchString"
          :disabled="isLoading"
        />

        <p
          class="help is-danger"
          v-for="(errorMessage, index) in filterErrorMessages"
          :key="index"
        >
          {{ errorMessage }}
        </p>
      </div>
      <div class="control">
        <a
          class="button is-large"
          @click="onFilterSuggestions"
          :disabled="$v.$invalid"
        >
          Buscar
        </a>
      </div>
    </div>
    <div v-if="cepInfo.cep" class="box has-text-centered title">
      <p>{{ cepInfo.logradouro }}, {{ cepInfo.bairro }}</p>
      <p>{{ cepInfo.cidade }} - {{ cepInfo.uf }}</p>
    </div>
    <div
      v-if="cepInfo.error"
      class="box has-text-centered title has-text-danger"
    >
      <p>{{ cepInfo.error }}</p>
    </div>
  </div>
</template>

<script>
import { maxLength } from "vuelidate/lib/validators";
import { getCepInfo } from "@/services/api";
import { getValidatorMessages } from "@/utils/validators";

export default {
  data() {
    return {
      searchString: "",
      isLoading: false,
      cepInfo: {}
    };
  },
  validations: {
    searchString: {
      onlyNumbers: value => /^\d+$/.test(value),
      maxLength: maxLength(8)
    }
  },
  computed: {
    filterErrorMessages() {
      return (
        this.searchString.length && getValidatorMessages(this.$v.searchString)
      );
    }
  },
  methods: {
    onFilterSuggestions() {
      this.isLoading = true;
      getCepInfo(this.searchString)
        .then(({ data }) => {
          if (data.cep) {
            if (this.cepInfo.cep) {
              this.$emit("add-history", this.cepInfo);
            }
            this.cepInfo = data;
            this.searchString = "";
          } else {
            this.cepInfo = { error: "CEP não encontrado" };
          }
        })
        .finally(() => {
          this.isLoading = false;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.is-fullwidth {
  width: 100%;
}
</style>
