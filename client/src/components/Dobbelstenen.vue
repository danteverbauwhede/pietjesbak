<template>
  <div class="pietjesbak__stenen">
    <div class="pietjesbak__stenen__head">
      <p>Te smijten dobbelstenen.</p>
      <p>
        Worpen: {{ this.rondeWorpen.waarde }}/<span
          v-if="this.maxAantalWorpen.waarde !== 0"
          >{{ this.maxAantalWorpen.waarde }}</span
        ><span v-else>3</span>
      </p>
    </div>
    <div class="pietjesbak__stenen__rij__wrap">
      <div class="pietjesbak__stenen__rij">
        <div
          id="dobbel1"
          class="dobbelsteen"
          v-if="adkDobbels.adkDobbel1 === 0"
          v-on:click="adkDobbel(1)"
        >
          {{ dobbels.dobbel1 }}
        </div>
        <div
          id="dobbel2"
          class="dobbelsteen"
          v-if="adkDobbels.adkDobbel2 === 0"
          v-on:click="adkDobbel(2)"
        >
          {{ dobbels.dobbel2 }}
        </div>
        <div
          id="dobbel3"
          class="dobbelsteen"
          v-if="adkDobbels.adkDobbel3 === 0"
          v-on:click="adkDobbel(3)"
        >
          {{ dobbels.dobbel3 }}
        </div>
      </div>
      <div
        id="smijt"
        class="button button--prim pietjesbak__stenen__gooi"
        v-on:click="gooiStenen"
        v-if="
          ((this.maxAantalWorpen.waarde === 0 && this.rondeWorpen.waarde < 3) ||
            (this.maxAantalWorpen.waarde !== 0 &&
              this.rondeWorpen.waarde < this.maxAantalWorpen.waarde)) && 
              (this.aanDeBeurt.naam === this.player)
        "
      >
        Rol de dajs
      </div>
      <div
        id="max-worpen"
        class="button button--sec button--inactive pietjesbak__stenen__gooi"
        v-if="
          (((this.maxAantalWorpen.waarde !== 0 &&
            this.rondeWorpen.waarde === this.maxAantalWorpen.waarde) ||
            (this.maxAantalWorpen.waarde === 0 &&
              this.rondeWorpen.waarde === 3 &&
              this.maxAantalWorpen.herkans))) &&
              (this.aanDeBeurt.naam === this.player)
        "
      >
        max worpen
      </div>
      <div
        id="smijt"
        class="button button--prim pietjesbak__stenen__gooi"
        v-on:click="opnieuwGooien"
        v-if="
          this.maxAantalWorpen.waarde === 0 &&
          this.rondeWorpen.waarde === 3 &&
          this.maxAantalWorpen.herkans === false  && 
          this.aanDeBeurt.naam === this.player
        "
      >
        herdoen (- punt)
      </div>
      <div
        id="smijt"
        class="button button--prim pietjesbak__stenen__gooi button--inactive"
        v-if="
          this.aanDeBeurt.naam !== this.player
        "
      >
        pas à toi eh, erpel
      </div>
    </div>
    <p style="text-align: start">Aan de kant gehouden dobbelstenen.</p>
    <div class="pietjesbak__stenen__rij__wrap">
      <div class="pietjesbak__stenen__rij">
        <div
          id="adk_dobbel1"
          class="dobbelsteen"
          v-if="adkDobbels.adkDobbel1 !== 0"
          v-on:click="resetDobbel(1)"
        >
          {{ adkDobbels.adkDobbel1 }}
        </div>
        <div
          id="adk_dobbel2"
          class="dobbelsteen"
          v-if="adkDobbels.adkDobbel2 !== 0"
          v-on:click="resetDobbel(2)"
        >
          {{ adkDobbels.adkDobbel2 }}
        </div>
        <div
          id="adk_dobbel3"
          class="dobbelsteen"
          v-if="adkDobbels.adkDobbel3 !== 0"
          v-on:click="resetDobbel(3)"
        >
          {{ adkDobbels.adkDobbel3 }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import io from "socket.io-client";
export default {
  name: "Dobbelstenen",
  props: [
    "socket",
    "gameData",
    "lobbySpelers"
  ],
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
      this.checkActivePlayer(data.gameData.users);
    });
  },
  methods: {
    checkActivePlayer(spelers) {
      spelers.forEach(speler => {
        if(speler.active === true) { 
          this.aanDeBeurt.naam = speler.username; 
        }
      });
    },
    gooiStenen() {
      if (this.gameData.actionBusy && this.gameData.gameStarted) {
        window.alert("Je moet wachten tot alle dobbelstenen gesmeten zijn!");
        return;
      } else if (this.gameData.actionBusy && !this.gameData.gameStarted) {
        window.alert("Je moet wachten tot een speler gekozen is.");
        return;
      }

      this.rolStenen();

      this.addRondeWorp();
    },
    opnieuwGooien() {
      if (this.gameData.actionBusy) {
        window.alert("Je moet wachten tot alle dobbelstenen gesmeten zijn!");
        return;
      }

      this.toggleHerkans();
      this.chooseNum();
      this.berekenStenen();
      this.herdoenMinpunten();
      this.gooiStenen();
      this.resetAllDobbels();
    },
    toggleActionBusy() {
      this.socket.emit("toggleActionBusy", this.lobbyId);
    },
    toggleActionDone() {
      this.socket.emit("toggleActionDone", this.lobbyId);
    },
    chooseNum() {
      this.socket.emit("chooseNum", this.lobbyId);
    },
    berekenStenen() {
      this.socket.emit("berekenStenen", this.lobbyId);
    },
    toggleHerkans() {
      this.socket.emit("toggleHerkans", this.lobbyId);
    },
    herdoenMinpunten() {
      this.socket.emit("herdoenMinpunten", this.lobbyId);
    },
    addMaxWorpen() {
      this.socket.emit("addMaxWorpen", this.lobbyId);
    },
    addRondeWorp() {
      this.socket.emit("addRondeWorp", this.lobbyId);
    },
    adkDobbel(steen) {      
      if (this.rondeWorpen.waarde !== 0) {
        this.socket.emit("adkDobbel", ({room:this.lobbyId, steen:steen}));
      }
    },
    resetDobbel(steen) {
      this.socket.emit("resetDobbel", ({room:this.lobbyId, steen:steen}));
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
    },
    rolStenen() {
      this.socket.emit("rolStenen", (this.lobbyId));
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
