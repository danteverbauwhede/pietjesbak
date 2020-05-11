<template>
  <div class="width main">
    <h3>Salamandraré</h3>
    <p>Proficiat {{ loser }}, pakt u een pintje.</p>
    <div>Oké, kheb een pintje</div>
  </div>
</template>

<style scoped lang="scss"></style>

<script>

export default {
  name: "GameEnded",
  props: ["loser", "gameData"],
  mounted() {
  },
};
</script>
