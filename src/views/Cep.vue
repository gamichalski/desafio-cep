<template>
  <div class="container is-fullheight is-fullcenter">
    <search-cep-form />
  </div>
</template>

<script>
import SearchCepForm from "@/components/SearchCepForm";

export default {
  components: {
    SearchCepForm
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
</style>
