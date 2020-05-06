<template>
  <div>
    <h2>Volgens mij ben je op de verkeerde pagina terect gekomen...</h2>
    <p>Geen probleem, wij sturen je automatisch terug naar home.</p>
  </div>
</template>

<script>
export default {
  name: "NietsTeZien",
  mounted() {
    setTimeout(() => {
      this.$router.push({ path: '/' })
    }, 3000)
  },
};
</script>
