<template>
  <div class="is-fullwidth">
    <div class="field has-addons is-fullwidth">
      <div class="control is-expanded is-large" :class="{ 'is-loading': isLoading }">
        <input
          class="input is-large"
          :class="{ 'is-danger': this.searchPhrase && $v.$invalid }"
          @keyup.enter="procurar"
          v-model="searchPhrase"
          :disabled="isLoading"
        />

        <p
          class="help is-danger"
          v-for="(errorMessage, index) in filterErrorMessages"
          :key="index"
        >{{ errorMessage }}</p>
      </div>
      <div class="control">
        <a class="button is-large" @click="procurar" :disabled="$v.$invalid">Buscar</a>
      </div>
    </div>
    <div v-if="mensagem" class="has-text-centered title">
      <p>{{ mensagem }}</p>
    </div>
  </div>
</template>

<script>
import { maxLength } from "vuelidate/lib/validators";
import { getCep } from "@/services/ceps";
import { getValidatorMessages } from "@/utils/validator";
export default {
  data() {
    return {
      searchPhrase: "",
      isLoading: false,
      mensagem: ""
    };
  },
  validations: {
    searchPhrase: {
      onlyNumbers: value => !isNaN(value),
      maxLength: maxLength(8)
    }
  },
  computed: {
    filterErrorMessages() {
      return getValidatorMessages(this.$v.searchPhrase);
    }
  },
  methods: {
    procurar() {
      if (!this.$v.$invalid) {
        this.isLoading = true;
        getCep(this.searchPhrase)
          .then(({ data }) => {
            if (data.cep) {
              this.mensagem = `${data.logradouro}, ${data.bairro}, ${data.cidade} - ${data.uf}`;
              this.searchPhrase = "";
              this.$emit("cep-encontrado", data);
            } else {
              this.mensagem = "CEP não encontrado";
            }
          })
          .finally(() => {
            this.isLoading = false;
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.is-fullwidth {
  width: 100%;
}
</style>
