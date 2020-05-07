<template>
  <div class="">
    <p>Shootout:</p>
      <ul class="home__player-list">
        <li
          v-for="player in spelers"
          :key="player.username"
          class="home__player-list__player"
          v-bind:class="{ 'shootout__actieve-speler': player.active }"
        >
          <div class="home__player-list__player__img">
            <img
              src="@/assets/matties.jpeg"
              alt="profile pic"
              width="150"
              height="150"
            />
          </div>
          <div>
            <p>{{ player.username }}</p>
          </div>
          <div>{{ player.worp }}</div>
        </li>
      </ul>
  </div>
</template>

<style scoped lang="scss"></style>

<script>
// @ is an alias to /src

export default {
  name: "Pietjesbak",
  props: ["socket", "gameData"],
  data() {
    return {
      lobbyId: "",
      spelers: [],
      dupliqueVanToep: false
    };
  },
  created() {
    this.socket.on("connect", () => {});
  },
  mounted() {
    this.socket.on("lobbyData", data => {
      this.spelers = data.gameData.dupliqué.users;
      this.dupliqueVanToep = data.gameData.dupliqué.vanToepassing;
    });
  },
};
</script>
