<template>
  <div class="hero is-bold" :class="heroClass">
    <div v-if="address" class="hero-body has-text-centered">
      <h3 class="title">{{ title }}</h3>
      <div class="subtitle">{{ address }}</div>
    </div>
    <div v-else class="hero-body has-text-centered">
      <h3 class="title">{{ error }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    address: String,
    error: String
  },
  computed: {
    heroClass() {
      return this.address ? "is-primary" : "is-warning";
    }
  }
};
</script>

<style></style>
