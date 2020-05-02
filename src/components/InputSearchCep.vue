<template>
  <div class="row justify-content-center">
    <div
      class="col-12 d-flex flex-column justify-content-center align-items-center"
    >
      <h1>CEP Search</h1>
      <div class="input-group mb-0">
        <input
          type="text"
          class="form-control"
          placeholder="Ex: 01311922"
          aria-label="Ex: "
          aria-describedby="basic-addon2"
          v-model="filter"
          maxlength="8"
          :disabled="isLoading"
          @keypress="verifyDigit($event)"
        />

        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="searchCep"
            :disabled="filter == '' || !$v.filter.minLength"
            ref="oi"
          >
            <span
              v-if="isLoading"
              class="spinner-border spinner-border-sm"
            ></span>
            Buscar
          </button>
        </div>
      </div>
      <div
        v-if="cepSelected.length == 0"
        class="d-flex justify-content-start w-100"
        role="alert"
      >
        <p v-if="!foundCep" class="text-danger">
          <small>Não foi possível encontrar o CEP informado.</small>
        </p>
      </div>

      <div
        v-if="cepSelected.length > 0"
        class="card shadow-lg p-3 mb-5 mt-3 bg-white rounded w-100"
      >
        <div class="card-body d-flex justify-content-center">
          {{ verifiedTextCep }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { minLength, numeric } from "vuelidate/lib/validators";
import { getCeps } from "@/services/ceps";
import { textValidate, ctrlA, ctrlC, ctrlV } from "@/utils/utils";

export default {
  data() {
    return {
      filter: "",
      foundCep: true,
      cepSelected: [],
      historyCep: [],
      isLoading: false
    };
  },
  validations: {
    filter: {
      minLength: minLength(8),
      numeric
    }
  },
  computed: {
    verifiedTextCep: function() {
      var str = "";

      if (textValidate(this.cepSelected[0].bairro)) {
        str += `${this.cepSelected[0].bairro}, `;
      }

      if (textValidate(this.cepSelected[0].logradouro)) {
        str += `${this.cepSelected[0].logradouro}, `;
      }

      if (textValidate(this.cepSelected[0].cidade)) {
        str += `${this.cepSelected[0].cidade} - `;
      }

      if (textValidate(this.cepSelected[0].uf)) {
        str += `${this.cepSelected[0].uf} `;
      }

      return str;
    }
  },
  methods: {
    searchCep: function() {
      var self = this;
      self.cepSelected = [];
      self.isLoading = true;
      var response = getCeps(self.filter);

      response.onreadystatechange = function() {
        if (
          (response.readyState == 0 || response.readyState == 4) &&
          response.status == 200
        ) {
          if (self.historyCep.length == 5 && response.responseText != "[]") {
            self.historyCep.pop();
          }

          if (response.responseText != "[]" && self.historyCep.length < 6) {
            self.cepSelected.push(JSON.parse(response.responseText));
            self.historyCep.unshift(self.cepSelected[0]);
            self.foundCep = true;
          } else {
            self.foundCep = false;
          }
        }

        self.isLoading = false;
      };

      response.send(null);

      self.filter = "";
      this.$refs.oi.focus();
      this.$emit("found", self.historyCep);
    },
    verifyDigit: function(event) {
      if (
        this.$v.filter.numeric &&
        this.$v.filter.minLength &&
        this.filter != ""
      ) {
        if (event.key == "Enter") {
          this.searchCep();
        }
      }

      if (!this.$v.filter.numeric) {
        this.filter = "";
      }

      if (
        event.keyCode != 8 &&
        event.keyCode != 37 &&
        event.keyCode != 39 &&
        !ctrlA(event) &&
        !ctrlC(event) &&
        !ctrlV(event) &&
        !Number.isInteger(parseInt(event.key))
      ) {
        event.preventDefault();
      }
    }
  }
};
</script>

<style></style>
