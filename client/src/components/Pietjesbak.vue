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
        v-if="!this.dupliqueVanToep"
        v-bind:socket="this.socket"
        v-bind:gameData="this.gameData"
        v-bind:lobbySpelers="this.lobbySpelers"
      />
      <DupliqueBattle
        v-if="this.dupliqueVanToep"
        v-bind:socket="this.socket"
        v-bind:gameData="this.gameData"
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
import DupliqueBattle from "@/components/DupliqueBattle.vue";

export default {
  name: "Pietjesbak",
  props: ["socket", "gameData", "lobbySpelers"],
  data() {
    return {
      lobbyId: "",
      spelers: [],
      dupliqueVanToep: false
    };
  },
  components: {
    Dobbelstenen,
    GameStats,
    Next,
    VolgendeRonde,
    Lobby,
    DupliqueBattle
  },
  created() {
    this.socket.on("connect", () => {});
  },
  mounted() {
    this.socket.on("lobbyData", data => {
      this.spelers = data.users;
      this.dupliqueVanToep = data.gameData.dupliqué.vanToepassing;
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
