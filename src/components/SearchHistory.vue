<template>
  <section v-if="oldHistory.length">
    <div class="panel is-shadowless">
      <h2 class="panel-heading">{{ title }}</h2>
      <a
        v-for="(address, index) in oldHistory"
        :key="index"
        class="panel-block"
        v-html="address"
      ></a>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    history: Array,
    address: String
  },
  computed: {
    oldHistory() {
      const oldHistory = [...this.history];

      if (this.address) {
        oldHistory.shift();
      }

      return oldHistory;
    }
  },
  data() {
    return {
      title: "Histórico de buscas:"
    };
  }
};
</script>

<style scoped>
.panel {
  margin-top: 2em;
  margin-bottom: 2em;
}
.panel-block {
  border: 1px solid #ededed;
}
</style>
