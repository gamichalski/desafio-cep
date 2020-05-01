<template>
  <div class="field has-addons is-fullwidth">
    <div class="control is-expanded">
      <input
        class="input"
        v-model="inputCep"
        @keypress.enter="foundNewInputCep"
        type="text"
        placeholder="Digite o CEP"
      />
    </div>
    <div class="control">
      <a class="button" @click="foundNewInputCep">Buscar</a>
    </div>
  </div>
</template>

<script>
import { searchCep } from "@/services/ceps";

export default {
  data() {
    return {
      inputCep: ""
    };
  },
  methods: {
    foundNewInputCep() {
      searchCep("65081264").then(data => {
        console.log(data);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.is-fullwidth {
  width: 100vh;
}
</style>
