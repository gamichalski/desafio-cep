<template>
  <div class="field has-addons">
    <div class="control">
      <input
        class="input is-medium"
        type="text"
        :class="{ 'is-danger': !input.isValid }"
        v-model="cep"
        :placeholder="input.placeholder"
        @keyup.enter="searchCep"
      />
      <div v-if="!input.isValid">
        <p v-for="(error, i) in input.errors" :key="i" class="help is-danger">
          {{ error }}
        </p>
      </div>
    </div>
    <div class="control">
      <a
        class="button is-link is-medium"
        :class="button.status"
        @click="searchCep"
        >{{ button.label }}</a
      >
    </div>
  </div>
</template>

<script>
import { getAddress } from "@/service/api.js";
import { getErrorMessage } from "@/utils/validator.js";
import {
  required,
  minLength,
  maxLength,
  numeric
} from "vuelidate/lib/validators";

export default {
  data() {
    return {
      cep: "",
      input: {
        placeholder: "Digite seu CEP",
        isValid: true,
        errors: ""
      },
      button: {
        label: "Buscar CEP",
        status: ""
      }
    };
  },
  validations: {
    cep: {
      required,
      numeric,
      minLength: minLength(8),
      maxLength: maxLength(8)
    }
  },
  methods: {
    searchCep() {
      this.input.errors = getErrorMessage(this.$v.cep);
      this.button.status = "is-loading";

      if (this.input.errors.length) {
        this.input.isValid = false;
        this.button.status = "";
      } else {
        return getAddress(this.cep)
          .then(data => {
            if (data && data.data) {
              this.$emit("address-found", data.data);
              this.cep = "";
              this.input.errors = "";
            }
          })
          .catch(err => {
            console.error(err);
          })
          .finally(() => {
            this.button.status = "";
          });
      }
    }
  }
};
</script>
