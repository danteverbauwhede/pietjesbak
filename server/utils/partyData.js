const parties = []

function GameData() {
  this.users = [],
  this.gameStarted = false,
  this.actionBusy = false,
  this.dobbels = {
    dobbel1: 1,
    dobbel2: 1,
    dobbel3: 1,
  },
  this.adkDobbels = {
    adkDobbel1: 0,
    adkDobbel2: 0,
    adkDobbel3: 0,
  },
  this.worpArray = [],
  this.tempWorp = {
    stenen: "",
    waarde: "",
    punten: 0
  },
  this.hoogste = {
    waarde: "0",
    door: "",
    punten: 0
  },
  this.laagste = {
    waarde: "0",
    door: "",
    punten: 0
  },
  this.maxAantalWorpen = {
    waarde: 0,
    door: "",
    herkans: false
  },
  this.rondeWorpen = {
    waarde: 0,
    door: ""
  },
  this.gesmetenSpelers = [],
  this.gameEnded = false
}

function createParty(user, room) {

  const users = [];
  users.push(user);

  users.forEach($user => {
    if ($user.userId === user.userId) {
      $user.admin = true
    }
  });

  const gameData = new GameData();
  const createdRoom = {
    name: room,
    users,
    gameData
  };

  parties[room] = createdRoom

  return createdRoom
}

function restartGame(users, room) {
  const gameData = new GameData();
  const createdRoom = {
    name: room,
    users,
    gameData
  };

  parties[room] = createdRoom

  return createdRoom
}

module.exports = {
  createParty,
  restartGame
}