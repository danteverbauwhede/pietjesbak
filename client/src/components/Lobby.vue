<template>
  <div class="lobby">
    <ul>
      <p>Playing</p>
      <li
        v-for="player in this.gameSpelers"
        :key="player.username"
        v-bind:class="{ actieve_speler: player.active }"
        class="speler"
      >
        <p class="actieve_speler--naam">{{ player.username }}</p>
        <p v-if="player.worp !== 0">{{ player.worp }}</p>
        <p>{{ player.totaalPunten }}</p>
      </li>
    </ul>
    <ul>
      <p>Spectating</p>
      <li
        v-for="player in this.lobbySpelers"
        :key="player.username"
        class="speler"
      >
        <p class="actieve_speler--naam">{{ player.username }}</p>
        <p v-if="player.worp !== 0">{{ player.worp }}</p>
        <p>{{ player.totaalPunten }}</p>
      </li>
    </ul>
    <div class="lobby__buttons">
      <router-link
        to="/"
        v-on:click.native="leaveLobby"
        class="button button--sec"
        >Party verlaten</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "Lobby",
  props: ["socket", "gameData", "lobbySpelers"],
  data() {
    return {
      gameSpelers: [],
      lobbyId: "",
      player: ""
    };
  },
  created() {
    this.gameSpelers = this.gameData.users;
    this.lobbyId = this.$route.params.lobbyId;
    this.player = this.$route.params.userName;
    this.socket.on("connect", () => {});
  },
  mounted() {
    this.socket.on("lobbyData", data => {
      this.gameSpelers = data.gameData.users;
    });
  }, methods: {
    leaveLobby() {
      const room = this.lobbyId;
      const player = this.player;
      this.socket.emit('leaveLobby', {
        room,
        player
      })
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
