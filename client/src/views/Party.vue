<template>
  <div class="party__wrap">
    <div v-if="this.gameStarted">
      <Pietjesbak
        v-bind:socket="this.socket"
        v-bind:gameData="this.gameData"
        v-bind:lobbySpelers="this.lobbySpelers"
      />
    </div>
    <div v-else-if="this.gameEnded">
      <GameEnded
        v-bind:socket="this.socket"
        v-bind:gameData="this.gameData"
        v-bind:loser="this.loser"
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
            v-bind:class="{ 'button--inactive': this.admin !== this.userName }"
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
        <div v-on:click="this.endTemp">end</div>
        <div>
          <p>Partycode:</p>
          <p> {{ this.lobbyId }} </p>
        </div>
        <div>
          <p>Admin:</p>
          <p> {{ this.admin }} </p>
        </div>
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
      gameEnded: false,
      loser: ""
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
    window.addEventListener(`beforeunload`, e => this.leaveLobby(e));
  },
  mounted() {
    this.socket.emit("startPartey", this.$route.params.lobbyId);
    
    this.socket.on("lobbyData", data => {
      this.lobbySpelers = data.users;
      this.gameData = data.gameData;

      this.gameStarted = data.gameData.gameStarted;
      this.gameEnded = data.gameData.gameEnded;

      let adminAanw = false;
      if (this.gameStarted) {
        data.gameData.users.forEach(speler => {
          if(speler.admin) {
            adminAanw = true;
          }
        })
      } else {
        data.users.forEach(speler => {
          if(speler.admin) {
            adminAanw = true;
          }
        })
      }

      if (!adminAanw) {
        this.socket.emit("makeAdmin", this.lobbyId);
      }

      if (data.users) {
        data.users.forEach(user => {
          if (user.admin) {
            this.admin = user.username;
          }
        });
      }
    });
    this.socket.on("logData", poepie => {
      console.log(poepie);
    });
    this.socket.on("loser", $loser => {
      this.loser = $loser
    });
  },
  methods: {
    startPB() {      
      if (this.admin === this.userName) {
        this.socket.emit("startPb", this.lobbyId);
      }
    },
    leaveLobby() {
      this.gameData.users.forEach(speler => {
        if (speler.active && speler.username === this.userName) {
          this.socket.emit("selectNextPlayer", this.lobbyId);
        }
      });
      const room = this.lobbyId;
      const player = this.userName;
      this.socket.emit('leaveLobby', {
        room,
        player
      })
    },
    endTemp() {
      this.socket.emit("tempEndBut", this.lobbyId);
    }
  }
};
</script>
