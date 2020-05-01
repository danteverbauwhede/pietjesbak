<template>
  <div class="welcome">
    <div>
      <p>What's your name?<br />Yu fuhukfees!</p>
      <input
        type="text"
        @input="handleNaamInput($event.target.value)"
        name="naam"
        placeholder="Uw naam"
        class="button input"
      />
    </div>
    <div>
      <p>Heb je al een party?<br />Type hieronder de code.</p>
      <input
        type="text"
        @input="handleLobbyInput($event.target.value)"
        name="naam"
        placeholder="Partycode"
        class="button input"
      />
      <div
        v-if="this.username === '' || this.giftedLobbyId === ''"
        class="button button--inactive"
      >
        Vul eerst een naam in.
      </div>
      <router-link
        v-if="this.username !== '' && this.giftedLobbyId !== ''"
        :to="'lobby/' + this.giftedLobbyId + '/' + this.username"
        class="button button--prim"
        >Join Party</router-link
      >
    </div>
    <div>
      <p>Nog geen party?<br />Maak er nu een aan!</p>
      <div v-if="this.username === ''" class="button button--inactive">
        Vul eerst een naam in.
      </div>
      <router-link
        v-if="this.username !== ''"
        v-bind:to="'lobby/' + this.lobbyId + '/' + this.username"
        class="button button--prim"
        >Maak Party</router-link
      >
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";
export default {
  name: "Home",
  data() {
    return {
      socket: {},
      lobbyId: "",
      username: "",
      giftedLobbyId: ""
    };
  },
  created() {
    this.socket = io("/");
    this.socket.on("connect", () => {
      this.lobbyId = this.socket.id;
    });
  },
  computed: {
    spelers() {
      return this.$store.state.spelers;
    }
  },
  methods: {
    handleNaamInput(naam) {
      this.username = naam;
    },
    handleLobbyInput(naam) {
      this.giftedLobbyId = naam;
    }
  }
};
</script>
