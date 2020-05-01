<template>
  <div class="">
    <div
      v-if="this.isPlayerAdmin"
      class="button button--sec"
      v-bind:class="{ 'hidden': !this.iedereenGesmeten }"
      v-on:click="volgendeRonde"
    >
      Door naar volgende ronde.
    </div>
    <div
      v-else
      class="button button--sec button--inactive"
      v-bind:class="{ 'hidden': !this.iedereenGesmeten }"
    >
      Wachten op admin om door te gaan.
    </div>
  </div>
</template>

<script>
//met een v-if bij dobbelsteen div en de cijfers in store zetten
export default {
  name: "VolgendeRonde",
  props: ["socket", "gameData", "lobbySpelers"],
  data() {
    return {
      maxAantalWorpen: {},
      hoogste: {},
      laagste: {},
      spelers: {},
      adkDobbels: {},
      gesmetenSpelers: [],
      lobbyId: "",
      admin: ""
    };
  },
  created() {
    this.maxAantalWorpen = this.gameData.maxAantalWorpen;
    this.hoogste = this.gameData.hoogste;
    this.laagste = this.gameData.laagste;
    this.spelers = this.gameData.users;
    this.adkDobbels = this.gameData.adkDobbels;
    this.gesmetenSpelers = this.gameData.gesmetenSpelers;
  },
  mounted() {
    this.lobbyId = this.$route.params.lobbyId;
    this.socket.on("lobbyData", data => {
      this.maxAantalWorpen = data.gameData.maxAantalWorpen;
      this.hoogste = data.gameData.hoogste;
      this.laagste = data.gameData.laagste;
      this.spelers = data.gameData.users;
      this.adkDobbels = data.gameData.adkDobbels;
      this.gesmetenSpelers = data.gameData.gesmetenSpelers;
      data.gameData.users.forEach(user => {
        if (user.admin) {
          this.admin = user.userId;
        }
      });
    });
  },
  computed: {
    iedereenGesmeten: function() {
      if (this.gesmetenSpelers.length === this.spelers.length) {
        return true;
      } else {
        return false;
      }
    },
    isPlayerAdmin: function() {
      let bool = false;
      this.spelers.forEach(speler => {
        if (speler.admin & (speler.username === this.$route.params.userName)) {
          if (this.gesmetenSpelers.length === this.spelers.length) {
            bool = true;
          } else {
            bool = false;
          }
        }
      });

      return bool;
    }
  },
  methods: {
    volgendeRonde() {
      if (!this.iedereenGesmeten) {
        let str = "";
        let moet = " moet";
        this.spelers.forEach(speler => {
          if (!this.gesmetenSpelers.includes(speler.username) && str !== "") {
            str = str + " en " + speler.username;
            moet = " moeten";
          } else if (!this.gesmetenSpelers.includes(speler.username)) {
            str = speler.username;
          }
        });
        window.alert(
          "Nog niet iedereen heeft gesmeten,\n" + str + moet + " nog gooien!"
        );
        return;
      }
      this.socket.emit("volgendeRonde", this.lobbyId);
      this.resetMaxWorpen();
      this.resetAllDobbels();
      this.resetGesmetenSpelers();
    },
    resetMaxWorpen() {
      this.socket.emit("resetMaxWorpen", this.lobbyId);
    },
    resetGesmetenSpelers() {
      this.socket.emit("resetGesmetenSpelers", this.lobbyId);
    },
    resetDobbel(steen) {
      this.socket.emit("resetDobbel", { room: this.lobbyId, steen: steen });
    },
    resetAllDobbels() {
      if (this.adkDobbel1 !== 0) {
        this.resetDobbel(1);
      }
      if (this.adkDobbel2 !== 0) {
        this.resetDobbel(2);
      }
      if (this.adkDobbel3 !== 0) {
        this.resetDobbel(3);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
