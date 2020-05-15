<template>
  <div class="width main game__ended">
    <div v-if="this.aftellen === 12" class="game__ended__content">
      <div>
        <h3>Salamanderen</h3>
        <p>Proficiat <strong>{{ loser }}</strong>, pakt u een pintje.</p>
        <br>
        <p>Als ge een pintje hebt moogde op onderstaand knopke drukken.</p>
      </div>
      <div 
        v-if="loser === this.player"
        class="button button--prim" 
        v-on:click="this.pintObtainedHandler"
      >
        Oké, kheb een pintje
      </div>
      <div 
        v-else
        class="button button--inactive" 
      >
        Wachten tot {{loser}} een pintje gepakt heeft...
      </div>
    </div>
    <div v-else class="game__ended__content">
      <h3 v-if="this.aftellen === 0">EN UIT!</h3>
      <h3 v-else-if="this.aftellen === 11">u ready?</h3>
      <h3 v-else>{{ this.aftellen }}</h3>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>

<script>

export default {
  name: "GameEnded",
  props: ["socket","loser", "gameData"],
  data() {
    return {
      player: "",
      lobbyId: "",
      aftellen: 12
    }
  },
  mounted() {
    this.player = this.$route.params.userName;
    this.lobbyId = this.$route.params.lobbyId;
    this.socket.on("lobbyData", data => {
      this.aftellen = data.gameData.aftellen;
    });
  },
  methods: {
    pintObtainedHandler() {
      this.socket.emit("restartGameAfterEnd", this.lobbyId);
    }
  },
};
</script>
