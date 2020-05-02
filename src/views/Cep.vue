<template>
  <div class="container is-fullheight is-fullcenter">
    <h3 class="title is-3">{{ title }}</h3>
    <search-cep-form @infoInputCep="infoInputCep" />
    <info-cep :infoInputCep="listCeps[0]" />
    <div class="margin-top-listCeps">
      <list-ceps :listCeps="filteredCeps" />
    </div>
  </div>
</template>

<script>
import SearchCepForm from "@/components/SearchCepForm";
import infoCep from "@/components/infoCep";
import listCeps from "@/components/listCeps";

export default {
  components: {
    SearchCepForm,
    infoCep,
    listCeps
  },
  data() {
    return {
      title: "Buscador de CEPS",
      listCeps: []
    };
  },
  methods: {
    infoInputCep(infoCep) {
      console.log(infoCep);
      this.listCeps.unshift(infoCep);
    }
  },
  computed: {
    filteredCeps() {
      return this.listCeps.slice(0, 5);
    }
  }
};
</script>

<style lang="scss" scoped>
.is-fullheight {
  height: 100vh;
}
.is-fullcenter {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.margin-top-listCeps {
  margin-top: 50px;
}
</style>
