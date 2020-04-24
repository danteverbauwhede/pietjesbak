import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // spelers: [
    //   {
    //     naam: "Tuur",
    //     bijNaam: "Geltboas",
    //     totaalPunten: 0,
    //     worp: 0,
    //     punten: 0,
    //     active: false,
    //     profielPic: require("@/assets/tuur.jpeg")
    //   },
    //   {
    //     naam: "Dante",
    //     bijNaam: "Vetbol",
    //     totaalPunten: 0,
    //     worp: 0,
    //     punten: 0,
    //     active: false,
    //     profielPic: require("@/assets/dante.jpeg")
    //   },
    //   {
    //     naam: "Karel",
    //     bijNaam: "Kampeerder",
    //     totaalPunten: 0,
    //     worp: 0,
    //     punten: 0,
    //     active: false,
    //     profielPic: require("@/assets/karel.jpeg")
    //   },
    //   // {
    //   //   naam: "Eli",
    //   //   bijNaam: "Hoofdslet",
    //   //   totaalPunten: 0,
    //   //   worp: 0,
    //   //   punten: 0,
    //   //   active: false,
    //   //   profielPic: require("@/assets/eli.jpeg")
    //   // },
    //   // {
    //   //   naam: "Thibo",
    //   //   bijNaam: "Thibeloe <3 J",
    //   //   totaalPunten: 0,
    //   //   worp: 0,
    //   //   punten: 0,
    //   //   active: false,
    //   //   profielPic: require("@/assets/thibo.jpeg")
    //   // },
    //   // {
    //   //   naam: "Molle",
    //   //   bijNaam: "Sanitair De Baere, ma geen familde",
    //   //   totaalPunten: 0,
    //   //   worp: 0,
    //   //   punten: 0,
    //   //   active: false,
    //   //   profielPic: require("@/assets/tibo.jpeg")
    //   // },
    //   // {
    //   //   naam: "Kamiel",
    //   //   bijNaam: "Kamelenteen",
    //   //   totaalPunten: 0,
    //   //   worp: 0,
    //   //   punten: 0,
    //   //   active: false,
    //   //   profielPic: require("@/assets/kamiel.jpeg")
    //   // },
    //   // {
    //   //   naam: "Matties",
    //   //   bijNaam: "Jaimie",
    //   //   totaalPunten: 0,
    //   //   worp: 0,
    //   //   punten: 0,
    //   //   active: false,
    //   //   profielPic: require("@/assets/matties.jpeg")
    //   // },
    //   {
    //     naam: "Axel",
    //     bijNaam: "Belleke",
    //     totaalPunten: 0,
    //     worp: 0,
    //     punten: 0,
    //     active: false,
    //     profielPic: require("@/assets/axel.jpeg")
    //   },
    //   {
    //     naam: "Victor",
    //     bijNaam: "Big Jossa",
    //     totaalPunten: 0,
    //     worp: 0,
    //     punten: 0,
    //     active: false,
    //     profielPic: require("@/assets/victor.jpeg")
    //   }
    //   // {
    //   //   naam: "Louis",
    //   //   bijNaam: "Putmandre",
    //   //   totaalPunten: 0,
    //   //   worp: 0,
    //   //   punten: 0,
    //   //   active: false,
    //   //   profielPic: require("@/assets/louis.jpeg")
    //   // }
    // ],
    // actionBusy: false,
    // dobbel1: 1,
    // dobbel2: 4,
    // dobbel3: 6,
    adkDobbel1: 0,
    adkDobbel2: 0,
    adkDobbel3: 0,
    gameStarted: false,
    worpArray: [],
    tempWorp: {
      stenen: "",
      waarde: "",
      punten: 0
    },
    hoogste: {
      waarde: "",
      door: "",
      punten: 0
    },
    laagste: {
      waarde: "0",
      door: "",
      punten: 0
    },
    maxAantalWorpen: {
      waarde: 0,
      door: "",
      herkans: false
    },
    rondeWorpen: {
      waarde: 0,
      door: ""
    },
    gesmetenSpelers: []
  },
  mutations: {
    toggleActionBusy(state) {
      state.actionBusy = true;
    },
    toggleActionDone(state) {
      state.actionBusy = false;
    },
    startPietjesbak(state) {
      state.spelers.forEach(speler => {
        speler.totaalPunten = 15;
      });
    },
    startPB(state) {
      state.gameStarted = true;
    },
    leaveLobby(state) {
      state.gameStarted = false;
    },
    // rolD1(state) {
    //   const newInt = Math.floor(Math.random() * 6) + 1;
    //   state.dobbel1 = newInt;
    // },
    // rolD2(state) {
    //   const newInt = Math.floor(Math.random() * 6) + 1;
    //   state.dobbel2 = newInt;
    // },
    // rolD3(state) {
    //   const newInt = Math.floor(Math.random() * 6) + 1;
    //   state.dobbel3 = newInt;
    // },
    addRondeWorp(state) {
      state.rondeWorpen.waarde++;
      state.spelers.forEach(speler => {
        if (speler.active) {
          state.rondeWorpen.door = speler.naam;
        }
      });
    },
    addMaxWorpen(state) {
      state.maxAantalWorpen.waarde = state.rondeWorpen.waarde;
      state.rondeWorpen.waarde = 0;
      state.maxAantalWorpen.door = state.rondeWorpen.door;
    },
    resetRondeWorpen(state) {
      state.rondeWorpen.waarde = 0;
    },
    resetMaxWorpen(state) {
      state.maxAantalWorpen.waarde = 0;
      state.maxAantalWorpen.door = "";
      state.maxAantalWorpen.herkans = false;
    },
    resetGesmetenSpelers(state) {
      state.gesmetenSpelers = [];
    },
    toggleHerkans(state) {
      state.rondeWorpen.waarde = 0;
      state.maxAantalWorpen.herkans = true;
    },
    adkDobbel(state, steen) {
      switch (steen) {
        case 1:
          state.adkDobbel1 = state.dobbel1;
          break;
        case 2:
          state.adkDobbel2 = state.dobbel2;
          break;
        case 3:
          state.adkDobbel3 = state.dobbel3;
          break;
        default:
          break;
      }
    },
    resetDobbel(state, steen) {
      switch (steen) {
        case 1:
          state.dobbel1 = state.adkDobbel1;
          state.adkDobbel1 = 0;
          break;
        case 2:
          state.dobbel2 = state.adkDobbel2;
          state.adkDobbel2 = 0;
          break;
        case 3:
          state.dobbel3 = state.adkDobbel3;
          state.adkDobbel3 = 0;
          break;
        default:
          break;
      }
    },
    chooseNum(state) {
      let a, b, c;
      if (state.adkDobbel1 === 0) {
        a = state.dobbel1;
      } else {
        a = state.adkDobbel1;
      }
      if (state.adkDobbel2 === 0) {
        b = state.dobbel2;
      } else {
        b = state.adkDobbel2;
      }
      if (state.adkDobbel3 === 0) {
        c = state.dobbel3;
      } else {
        c = state.adkDobbel3;
      }
      state.worpArray = [a, b, c];
    },
    makeActive(state, naam) {
      state.spelers.forEach(speler => {
        speler.active = false;
      });
      state.spelers.forEach(speler => {
        if (speler.naam === naam) {
          speler.active = !speler.active;
        }
      });
    },
    addWorp(state) {
      state.spelers.forEach(speler => {
        if (speler.active) {
          speler.worp = state.tempWorp.waarde;
        }
      });
    },
    addPunten(state) {
      state.spelers.forEach(speler => {
        if (speler.active) {
          speler.punten = state.tempWorp.punten;
        }
      });
    },
    herdoenMinpunten(state) {
      state.spelers.forEach(speler => {
        if (speler.active) {
          speler.totaalPunten -= state.tempWorp.punten;
        }
      });
      state.spelers.forEach(speler => {
        speler.punten = 0;
        speler.worp = 0;
      });
    },
    selectNextPlayer(state) {
      let i = 0;
      state.spelers.forEach((speler, index) => {
        if (speler.active) {
          speler.active = false;
          if (index !== state.spelers.length - 1) {
            i = index + 1;
          } else {
            i = 0;
          }
        }
      });
      state.spelers[i].active = true;
    },
    deselectAllPlayers(state) {
      state.spelers.forEach(speler => {
        if (speler.active) {
          speler.active = false;
        }
      });
    },
    berekenStenen(state) {
      state.worpArray.sort((a, b) => b - a);
      state.tempWorp.stenen =
        state.worpArray[0].toString() +
        state.worpArray[1].toString() +
        state.worpArray[2].toString();

      switch (state.tempWorp.stenen) {
        case "421":
          state.tempWorp.waarde = "4-21";
          state.tempWorp.punten = 8;
          break;
        case "111":
          state.tempWorp.waarde = "Pietje 7";
          state.tempWorp.punten = 7;
          break;
        case "611":
          state.tempWorp.waarde = "Pietje 6";
          state.tempWorp.punten = 6;
          break;
        case "511":
          state.tempWorp.waarde = "Pietje 5";
          state.tempWorp.punten = 5;
          break;
        case "411":
          state.tempWorp.waarde = "Pietje 4";
          state.tempWorp.punten = 4;
          break;
        case "311":
          state.tempWorp.waarde = "Pietje 3";
          state.tempWorp.punten = 3;
          break;
        case "211":
          state.tempWorp.waarde = "Pietje 2";
          state.tempWorp.punten = 2;
          break;
        case "666":
          state.tempWorp.waarde = "Trieske";
          state.tempWorp.punten = 3;
          break;
        case "555":
          state.tempWorp.waarde = "Trieske";
          state.tempWorp.punten = 3;
          break;
        case "444":
          state.tempWorp.waarde = "Trieske";
          state.tempWorp.punten = 3;
          break;
        case "333":
          state.tempWorp.waarde = "Trieske";
          state.tempWorp.punten = 3;
          break;
        case "222":
          state.tempWorp.waarde = "Trieske";
          state.tempWorp.punten = 3;
          break;
        case "654":
          state.tempWorp.waarde = "Straatje";
          state.tempWorp.punten = 2;
          break;
        case "543":
          state.tempWorp.waarde = "Straatje";
          state.tempWorp.punten = 2;
          break;
        case "432":
          state.tempWorp.waarde = "Straatje";
          state.tempWorp.punten = 2;
          break;
        case "321":
          state.tempWorp.waarde = "Straatje";
          state.tempWorp.punten = 2;
          break;
        default:
          state.tempWorp.waarde = state.tempWorp.stenen;
          state.tempWorp.punten = 1;
          break;
      }
    },
    completeStats(state) {
      // --- HOOGSTE --- //
      if (
        state.hoogste.punten < state.tempWorp.punten ||
        (state.tempWorp.waarde === "Pietje 2" &&
          state.hoogste.waarde === "Trieske")
      ) {
        if (
          !(
            state.hoogste.waarde === "Pietje 2" &&
            state.tempWorp.waarde === "Trieske"
          )
        ) {
          state.hoogste.waarde = state.tempWorp.waarde;
          state.hoogste.punten = state.tempWorp.punten;
          state.spelers.forEach(speler => {
            if (speler.active) {
              state.hoogste.door = speler.naam;
            }
          });
        }
      } else if (
        state.tempWorp.waarde === "Pietje 2" &&
        state.hoogste.waarde === "Straatje"
      ) {
        state.hoogste.waarde = state.tempWorp.waarde;
        state.hoogste.punten = state.tempWorp.punten;
        state.spelers.forEach(speler => {
          if (speler.active) {
            state.hoogste.door = speler.naam;
          }
        });
      } else if (
        state.hoogste.punten === state.tempWorp.punten &&
        state.tempWorp.punten === 1 &&
        parseInt(state.hoogste.waarde) < parseInt(state.tempWorp.waarde)
      ) {
        state.hoogste.waarde = state.tempWorp.waarde;
        state.hoogste.punten = state.tempWorp.punten;
        state.spelers.forEach(speler => {
          if (speler.active) {
            state.hoogste.door = speler.naam;
          }
        });
      }

      // --- LAAGSTE --- //
      if (
        state.laagste.punten > state.tempWorp.punten ||
        (state.tempWorp.waarde === "Trieske" &&
          state.laagste.waarde === "Pietje 2") ||
        (state.tempWorp.waarde === "Straatje" &&
          state.laagste.waarde === "Pietje 2")
      ) {
        if (
          !(
            state.tempWorp.waarde === "Pietje 2" &&
            state.laagste.waarde === "Trieske"
          )
        ) {
          state.laagste.waarde = state.tempWorp.waarde;
          state.laagste.punten = state.tempWorp.punten;
          state.spelers.forEach(speler => {
            if (speler.active) {
              state.laagste.door = speler.naam;
            }
          });
        }
      } else if (
        state.laagste.punten === state.tempWorp.punten &&
        state.tempWorp.punten === 1 &&
        parseInt(state.laagste.waarde) > parseInt(state.tempWorp.waarde)
      ) {
        state.laagste.waarde = state.tempWorp.waarde;
        state.laagste.punten = state.tempWorp.punten;
        state.spelers.forEach(speler => {
          if (speler.active) {
            state.laagste.door = speler.naam;
          }
        });
      } else if (state.laagste.waarde === "0") {
        state.laagste.waarde = state.tempWorp.waarde;
        state.laagste.punten = state.tempWorp.punten;
        state.spelers.forEach(speler => {
          if (speler.active) {
            state.laagste.door = speler.naam;
          }
        });
      }
    },
    addGesmetenSpelers(state, naam) {
      state.gesmetenSpelers.push(naam);
    },
    volgendeRonde(state) {
      state.spelers.forEach(speler => {
        if (speler.naam === state.laagste.door) {
          speler.totaalPunten -= state.hoogste.punten;
        }
      });
      state.spelers.forEach(speler => {
        speler.punten = 0;
        speler.worp = 0;
      });

      state.spelers.forEach(speler => {
        if (speler.active) {
          speler.active = false;
        }
      });

      state.spelers.forEach(speler => {
        if (speler.naam === state.laagste.door) {
          speler.active = true;
        }
      });

      state.laagste.door = "";
      state.laagste.waarde = "0";
      state.laagste.punten = 0;
      state.hoogste.door = "";
      state.hoogste.waarde = "0";
      state.hoogste.punten = 0;
      state.aantalWorpen = 0;
    }
  },
  actions: {},
  modules: {}
});
