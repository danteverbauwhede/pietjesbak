<template>
  <div class="party__wrap">
    <div v-if="this.gameStarted">
      <Pietjesbak
        v-bind:socket="this.socket"
        v-bind:gameData="this.gameData"
        v-bind:lobbySpelers="this.lobbySpelers"
      />
    </div>
    <div v-if="this.gameEnded">
      <GameEnded
        v-bind:socket="this.socket"
        v-bind:gameData="this.gameData"
        v-bind:lobbySpelers="this.lobbySpelers"
      />
    </div>
    <div v-else class="home">
      <header>
        <h2>Welgekomen</h2>
      </header>
      <div>
        <h3>Deze patchoelies zitten in uwen party!</h3>
        <br />
        <ul class="home__player-list">
          <li
            v-for="player in lobbySpelers"
            :key="player.naam"
            class="home__player-list__player"
          >
            <div class="home__player-list__player__img">
              <img
                src="@/assets/matties.jpeg"
                alt="profile pic"
                width="150"
                height="150"
              />
            </div>
            <p>{{ player.username }}</p>
          </li>
        </ul>
      </div>
      <div class="home__game-options">
        <h3>Welk spelleke wilde spelen?</h3>
        <ul>
          <li
            v-on:click="this.startPB"
            class="button button--prim home__game-options__button"
            v-bind:class="{ 'button--inactive': this.admin !== this.socket.id }"
          >
            Pietjesbakken
          </li>
          <!-- <router-link
            to="/about"
            class="button button--sec home__game-options__button"
            >Driemannen</router-link
          > -->
        </ul>
      </div>
      <div class="partycode">
        <p>Partycode</p>
        <p> {{ this.lobbyId }} </p>
      </div>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";
import Pietjesbak from "../components/Pietjesbak.vue";
import GameEnded from "../components/GameEnded.vue";

export default {
  name: "Party",
  components: {
    Pietjesbak,
    GameEnded
  },
  props: [
    "port"
  ],
  data() {
    return {
      socket: {},
      userName: "",
      lobbyId: "",
      lobbySpelers: [],
      player: {},
      gameData: {},
      admin: "",
      gameStarted: false,
      gameEnded: false
    };
  },
  created() {
    this.lobbyId = this.$route.params.lobbyId;
    this.userName = this.$route.params.userName;
    const player = {
      username: this.userName,
      room: this.lobbyId
    };
    this.socket = io(this.port);
    this.socket.on("connect", () => {
      this.socket.emit("joinRoom", player);
    });
  },
  mounted() {
    this.socket.on("lobbyData", data => {
      this.lobbySpelers = data.users;
      this.gameData = data.gameData;

      data.users.forEach(user => {
        if (user.admin) {
          this.admin = user.userId;
        }
      });
      this.gameStarted = data.gameData.gameStarted;
      this.gameEnded = data.gameData.gameEnded;
    });
    this.socket.on("logData", poepie => {
      console.log(poepie);
    });
  },
  methods: {
    startPB() {
      if (this.admin === this.socket.id) {
        this.socket.emit("startPb", this.lobbyId);
      }
    },
    leaveRoom() {
      this.socket.emit("leaveRoom", this.lobbyId);
    }
  }
};
</script>
