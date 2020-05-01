<template>
  <div class="width main">
    <h3>Eat shit, dingske is verloren</h3>
  </div>
</template>

<style scoped lang="scss"></style>

<script>

export default {
  name: "GameEnded",
  props: ["socket", "gameData", "lobbySpelers"],
  data() {
    return {
      lobbyId: "",
      spelers: []
    };
  },
  components: {
  },
  created() {
    this.socket.on("connect", () => {});
  },
  mounted() {
    this.socket.on("lobbyData", data => {
      this.spelers = data.users;
    });
  }
};
</script>
