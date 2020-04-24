<template>
  <div class="main__wrap">
    <header class="header">
      <h1>Dobbelen met Vita</h1>
    </header>
    <section class="width main">
      <router-view />
    </section>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="scss">
@import "./scss/style.scss";
</style>
