<template>
  <div class="has-text-weight-bold has-text-centered">
    <h5 class="title is-5">
      {{ infoInputCep.logradouro }}, {{ infoInputCep.bairro }},
      <br />
      {{ infoInputCep.cidade }} - {{ infoInputCep.uf }}
    </h5>
  </div>
</template>

<script>
export default {
  props: {
    infoInputCep: Object
  }
};
</script>
