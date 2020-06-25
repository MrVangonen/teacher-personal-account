<template>
  <div class="box">
    <div class="img-container mr-4">
      <div v-show="isMeditatorImgLoaded">
        <img
          id="meditator"
          class="meditator"
          :src="require('@/assets/img/meditator.png')"
          @load="onImgLoaded()"
        />
        <div class="oval"></div>
      </div>
      <v-progress-circular v-show="!isMeditatorImgLoaded" indeterminate></v-progress-circular>
    </div>
    <div>
      <div class="ma-2">
        <h1>Ошибка</h1>
        <p>страница не найдена</p>
      </div>
      <v-btn href="/" color="primary" class="ma-2 white--text">
        Перейти на главную
        <v-icon right dark>mdi-reload</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isMeditatorImgLoaded: false
    };
  },
  methods: {
    onImgLoaded() {
      this.isMeditatorImgLoaded = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: 100vh;

  .img-container {
    width: 150px;
    display: flex;
    justify-content: center;
    align-items: center;

    .meditator {
      width: 150px;
      animation: levitating 10s ease-in-out infinite;
    }

    .oval {
      width: 150px;
      height: 20px;
      border-radius: 75px/10px;
      background-color: rgba(0, 0, 0, 0.85);
      animation: scaling 10s ease-in-out infinite;
    }
  }
}

@keyframes levitating {
  0% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-50px);
  }

  100% {
    transform: translateY(0px);
  }
}

@keyframes scaling {
  0% {
    transform: scale(1);
    background-color: rgba(0, 0, 0, 0.85);
  }

  50% {
    transform: scale(0.7);
    background-color: rgba(0, 0, 0, 0.65);
  }

  100% {
    transform: scale(1);
    background-color: rgba(0, 0, 0, 0.85);
  }
}
</style>