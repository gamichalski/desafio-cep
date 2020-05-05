<template>
  <div id="app">
    <div class="columns is-centered">
      <div class="column is-offset is-narrow">
        <p class="title is-4">Digite o CEP que deseja buscar</p>
      </div>
    </div>

    <div class="columns is-centered">
      <div class="column is-offset is-narrow">
        <nav class="level">
          <div class="level-item">
            <div class="field has-addons">
              <p class="control has-icons-right">
                <input
                  class="input is-medium"
                  type="text"
                  placeholder="Busca por CEP"
                  v-model="validCep"
                  v-bind:class="{ 'is-danger': is404 }"
                  :disabled="isDisabled"
                />
                <span class="icon is-medium is-right" v-if="isLoading">
                  <i class="fas fa-circle-notch fa-spin"></i>
                </span>
              </p>
              <p class="control">
                <button @click="onFilterCep()" class="button is-info is-medium">
                  Buscar
                </button>
              </p>
            </div>
          </div>
        </nav>
      </div>
    </div>

    <div class="columns is-centered" v-if="ceps.length > 0">
      <div class="column is-offset is-narrow">
        <p v-if="ceps.length > 0" class="title is-5">
          {{
            ceps[0].invalido
              ? "CEP Inválido, verifique se digitou um CEP válido ou há presença de traços no campo de busca"
              : ceps[0].logradouro +
                ", " +
                ceps[0].bairro +
                ", " +
                ceps[0].cidade +
                " - " +
                ceps[0].uf
          }}
        </p>
      </div>
    </div>

    <div class="card historico">
      <div class="card-content">
        <div class="columns is-left">
          <div class="column is-offset is-narrow">
            <p class="title is-4">
              Histórico de buscas:
            </p>
            <p
              class="subtitle is-4"
              v-show="!cep.invalido"
              v-for="(cep, index) in ceps.slice(1, 6)"
              :key="index"
            >
              {{
                cep.invalido
                  ? "CEP Inválido, verifique se digitou um CEP válido ou há presença de traços no campo de busca"
                  : cep.logradouro +
                    ", " +
                    cep.bairro +
                    ", " +
                    cep.cidade +
                    " - " +
                    cep.uf
              }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      validCep: "",
      isLoading: false,
      is404: false,
      ceps: [],
      isDisabled: false
    };
  },
  methods: {
    validateCep() {
      return this.validCep.length <= 8 && this.validCep.match(/^[0-9]+$/);
    },
    onFilterCep() {
      if (this.validateCep()) {
        this.isLoading = true;
        this.isDisabled = true;
        axios
          .get(`http://cep.la/${this.validCep}`, {
            headers: {
              Accept: "application/json"
            }
          })
          .then(results => {
            console.log(results);
            this.isLoading = false;
            this.is404 = false;
            if (results.data && Object.keys(results.data).length > 0) {
              this.ceps.unshift(results.data);
              this.isDisabled = false;
              this.isLoading = false;
            } else {
              this.ceps.unshift({ invalido: true });
              this.isLoading = false;
              this.is404 = true;
              this.isDisabled = false;
            }
          });
      } else {
        (this.isLoading = false), (this.is404 = true);
      }
    }
  }
};
</script>

<style>
#app {
  margin: 20% 0 0 0;
}

.historico {
  height: 200px;
}
</style>
