<template>
  <div class="pietjesbak__step-button__wrap">
    <div
      v-if="this.aanDeBeurt.naam === this.player"
      class="button button--prim pietjesbak__step-button"
      v-bind:class="{ 'button--inactive': this.rondeWorpen.waarde === 0 }"
      v-on:click="nextButton"
    >
      't is aan de volgenden.
    </div>
    <div
      v-else
      class="button button--prim pietjesbak__step-button button--inactive"
      v-on:click="nextButton"
    >
      't is nie aan u'
    </div>
  </div>
</template>

<script>
//met een v-if bij dobbelsteen div en de cijfers in store zetten
export default {
  name: "Next",
  props: ["socket", "gameData", "lobbySpelers"],
  data() {
    return {
      player: "",
      dobbels: {
        dobbel1: 1,
        dobbel2: 1,
        dobbel3: 1
      },
      adkDobbels: {
        adkDobbel1: 0,
        adkDobbel2: 0,
        adkDobbel3: 0
      },
      maxAantalWorpen: {},
      rondeWorpen: {},
      actionBusy: {},
      gameStarted: false,
      lobbyId: "",
      hoogste: {},
      laagste: {},
      spelers: {},
      gesmetenSpelers: [],
      aanDeBeurt: {
        naam: ""
      }
    };
  },
  created() {
    this.dobbels = this.gameData.dobbels;
    this.adkDobbels = this.gameData.adkDobbels;
    this.maxAantalWorpen = this.gameData.maxAantalWorpen;
    this.rondeWorpen = this.gameData.rondeWorpen;
    this.actionBusy = this.gameData.actionBusy;
    this.gameStarted = this.gameData.gameStarted;
    this.hoogste = this.gameData.hoogste;
    this.laagste = this.gameData.laagste;
    this.spelers = this.gameData.users;
    this.gesmetenSpelers = this.gameData.gesmetenSpelers;
  },
  mounted() {
    this.player = this.$route.params.userName;
    this.lobbyId = this.$route.params.lobbyId;
    this.socket.on("lobbyData", data => {
      this.dobbels = data.gameData.dobbels;
      this.adkDobbels = data.gameData.adkDobbels;
      this.maxAantalWorpen = data.gameData.maxAantalWorpen;
      this.rondeWorpen = data.gameData.rondeWorpen;
      this.actionBusy = data.gameData.actionBusy;
      this.gameStarted = data.gameData.gameStarted;
      this.hoogste = data.gameData.hoogste;
      this.laagste = data.gameData.laagste;
      this.spelers = data.gameData.users;
      this.gesmetenSpelers = data.gameData.gesmetenSpelers;
      this.checkActivePlayer();
    });
  },
  computed: {},
  methods: {
    checkActivePlayer() {
      this.spelers.forEach(speler => {
        if (speler.active === true) {
          this.aanDeBeurt.naam = speler.username;
        }
      });
    },
    nextButton() {
      if (this.rondeWorpen.waarde === 0) {
        window.alert("Je moet minstens 1 maal werpen!");
        return;
      }
      if (this.actionBusy) {
        window.alert("Je moet wachten tot alle dobbelstenen gesmeten zijn!");
        return;
      }

      this.chooseNum();
      this.berekenStenen();
      this.addPunten();
      this.addWorp();

      if (this.maxAantalWorpen.waarde === 0) {
        this.addMaxWorpen();
      } else {
        this.resetRondeWorpen();
      }

      // this.spelers.forEach(speler => {
      //   if (speler.punten !== 0 && speler.username === this.player) {
          if (!this.gesmetenSpelers.includes(this.player)) {
            this.addGesmetenSpelers(this.player);
            console.log("nog eens:", this.gesmetenSpelers);
            
          }
        // }
      // });

      this.completeStats();

      console.log(this.gesmetenSpelers);
      
      if (this.gesmetenSpelers.length === (this.spelers.length - 1)) {
        this.deselectAllPlayers();
      } else {
        this.selectNextPlayer();
      }

      this.resetAllDobbels();
    },
    addGesmetenSpelers(naam) {
      this.socket.emit("addGesmetenSpelers", {
        room: this.lobbyId,
        naam: naam
      });
    },
    addMaxWorpen() {
      this.socket.emit("addMaxWorpen", this.lobbyId);
    },
    resetRondeWorpen() {
      this.socket.emit("resetRondeWorpen", this.lobbyId);
    },
    addPunten() {
      this.socket.emit("addPunten", this.lobbyId);
    },
    addWorp() {
      this.socket.emit("addWorp", this.lobbyId);
    },
    chooseNum() {
      this.socket.emit("chooseNum", this.lobbyId);
    },
    berekenStenen() {
      this.socket.emit("berekenStenen", this.lobbyId);
    },
    completeStats() {
      this.socket.emit("completeStats", this.lobbyId);
    },
    selectNextPlayer() {
      this.socket.emit("selectNextPlayer", this.lobbyId);
    },
    deselectAllPlayers() {
      this.socket.emit("deselectAllPlayers", this.lobbyId);
    },
    resetDobbel(steen) {
      this.socket.emit("resetDobbel", { room: this.lobbyId, steen: steen });
    },
    resetAllDobbels() {
      if (this.adkDobbels.adkDobbel1 !== 0) {
        this.resetDobbel(1);
      }
      if (this.adkDobbels.adkDobbel2 !== 0) {
        this.resetDobbel(2);
      }
      if (this.adkDobbels.adkDobbel3 !== 0) {
        this.resetDobbel(3);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
