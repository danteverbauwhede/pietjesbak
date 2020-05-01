<template>
  <div class="main__wrap">
    <header class="header">
      <h1>Dobbelen met Vita</h1>
    </header>
    <section class="width main">
      <router-view v-bind:port="this.port" />
    </section>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      port: "http://localhost:3000"
    }
  },
};
</script>

<style lang="scss">
@import "./scss/style.scss";
</style>
