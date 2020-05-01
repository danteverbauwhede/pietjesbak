<template>
  <div class="welcome welcome--pt2">
    <div>
      <p>Je moeje naame noh invulln<br />Erpelwooft</p>
      <input
        type="text"
        @input="handleNaamInput($event.target.value)"
        name="naam"
        placeholder="Uw naam"
        class="button input"
      />
    </div>
    <div>
      <router-link
        :to="this.giftedLobbyId + '/' + this.username"
        class="button button--prim"
        >Join Party</router-link
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
      username: "xxx",
      giftedLobbyId: this.$route.params.lobbyId
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
    }
  }
};
</script>
