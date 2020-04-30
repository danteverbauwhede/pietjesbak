<template>
  <div class="width main">
    <Lobby
      v-bind:socket="this.socket"
      v-bind:gameData="this.gameData"
      v-bind:lobbySpelers="this.lobbySpelers"
    />
    <div class="gameview__wrap pietjesbak">
      <Dobbelstenen
        v-bind:socket="this.socket"
        v-bind:gameData="this.gameData"
        v-bind:lobbySpelers="this.lobbySpelers"
      />
      <Next
        v-bind:socket="this.socket"
        v-bind:gameData="this.gameData"
        v-bind:lobbySpelers="this.lobbySpelers"
      />
      <GameStats
        v-bind:socket="this.socket"
        v-bind:gameData="this.gameData"
        v-bind:lobbySpelers="this.lobbySpelers"
      />
      <VolgendeRonde
        v-bind:socket="this.socket"
        v-bind:gameData="this.gameData"
        v-bind:lobbySpelers="this.lobbySpelers"
      />
    </div>
  </div>
</template>

<style scoped lang="scss"></style>

<script>
// @ is an alias to /src
import Dobbelstenen from "@/components/Dobbelstenen.vue";
import GameStats from "@/components/GameStats.vue";
import Next from "@/components/Next.vue";
import VolgendeRonde from "@/components/VolgendeRonde.vue";
import Lobby from "@/components/Lobby.vue";

export default {
  name: "Pietjesbak",
  props: ["socket", "gameData", "lobbySpelers"],
  data() {
    return {
      lobbyId: "",
      spelers: []
    };
  },
  components: {
    Dobbelstenen,
    GameStats,
    Next,
    VolgendeRonde,
    Lobby
  },
  created() {
    this.socket.on("connect", () => {});
  },
  mounted() {
    this.socket.on("lobbyData", data => {
      this.spelers = data.users;
    });
    this.mountBak();
  },
  methods: {
    async mountBak() {
      this.lobbyId = this.$route.params.lobbyId;
      this.socket.emit("mountPietjesbak", this.lobbyId);
    }
  }
};
</script>
