<template>
  <div>
    <div class="field has-addons is-fullwidth">
      <div
        class="control is-expanded is-large"
        :class="{ 'is-loading': isLoading }"
      >
        <input
          class="input"
          :class="{ 'is-danger': $v.$invalid }"
          :disabled="isLoading"
          v-model="inputCep"
          @keypress.enter="foundNewInputCep"
          type="text"
          placeholder="Digite o CEP"
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
        <button
          class="button"
          @click="foundNewInputCep"
          :disabled="isLoading || $v.$invalid"
        >
          Buscar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { searchCep } from "@/services/ceps";
import { maxLength, numeric, minLength } from "vuelidate/lib/validators";
import { getValidatorMessages } from "@/utils/validators";

export default {
  data() {
    return {
      isLoading: false,
      inputCep: ""
    };
  },
  methods: {
    foundNewInputCep() {
      this.isLoading = true;
      if (this.inputCep && !this.$v.$invalid) {
        searchCep(this.inputCep)
          .then(({ data }) => {
            if (data.length === 0) {
              this.$emit("infoInputCep", { length: 0, cep: this.inputCep });
            } else {
              this.$emit("infoInputCep", data);
            }
          })
          .finally(() => {
            this.inputCep = "";
            this.isLoading = false;
          });
      } else {
        this.isLoading = false;
      }
    }
  },
  validations: {
    inputCep: {
      noWhitespaces: inputCep => !inputCep.includes(" "),
      maxLength: maxLength(8),
      minLength: minLength(8),
      numeric
    }
  },
  computed: {
    filterErrorMessages() {
      return getValidatorMessages(this.$v.inputCep);
    }
  }
};
</script>

<style lang="scss" scoped>
.is-fullwidth {
  width: 100vh;
}
</style>
