<template>
  <div class="pietjesbak__stats">
    <div class="pietjesbak__stats__data__wrap">
      <p>Hoogste worp:</p>
      <p>
        <span class="pietjesbak__stats__data">{{ this.hoogste.waarde }}</span>
      </p>
      <p class="pietjesbak__stats__data__extra">door {{ this.hoogste.door }}</p>
    </div>
    <div class="pietjesbak__stats__data__wrap">
      <p>Laagste worp:</p>
      <p>
        <span class="pietjesbak__stats__data">{{ this.laagste.waarde }}</span>
      </p>
      <p class="pietjesbak__stats__data__extra">door {{ this.laagste.door }}</p>
    </div>
    <div class="pietjesbak__stats__data__wrap">
      <p>Aantal worpen:</p>
      <p>
        <span class="pietjesbak__stats__data">{{
          this.maxAantalWorpen.waarde
        }}</span>
      </p>
      <p class="pietjesbak__stats__data__extra">
        door {{ this.maxAantalWorpen.door }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "GameStats",
  props: ["socket", "gameData", "lobbySpelers"],
  data() {
    return {
      maxAantalWorpen: {},
      hoogste: {},
      laagste: {},
      spelers: {}
    };
  },
  created() {
    this.maxAantalWorpen = this.gameData.maxAantalWorpen;
    this.hoogste = this.gameData.hoogste;
    this.laagste = this.gameData.laagste;
    this.spelers = this.gameData.users;
  },
  mounted() {
    this.socket.on("lobbyData", data => {
      this.maxAantalWorpen = data.gameData.maxAantalWorpen;
      this.hoogste = data.gameData.hoogste;
      this.laagste = data.gameData.laagste;
      this.spelers = data.gameData.users;
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
