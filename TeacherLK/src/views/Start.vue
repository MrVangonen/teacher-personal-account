<template>
  <div class="background-wrapper">
    <div class="registration-wrapper container" ref="start">
      <div class="logo">
        <img height="82px" class="mr-4" :src="require('@/assets/img/logo.png')" alt />
        <span class="text-sm font-weight-bold display-1">
          Личный кабинет
          <br />
          <span class="accent--text">преподавателя</span>
        </span>
      </div>
      <div class="toolkit">
        <v-menu v-model="isColorPickerMenuOpen" top offset-y :close-on-content-click="false">
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" color="blue darken-2" dark fab>
              <v-icon>mdi-format-color-fill</v-icon>
            </v-btn>
          </template>
          <v-color-picker v-model="penColor" class="ma-2" hide-inputs></v-color-picker>
        </v-menu>
        <transition name="slide-fade">
          <v-btn
            v-show="!isCanvasImgInserted"
            @click="saveCanvasImgToLocalStorage()"
            class="clearCanvas ml-2"
            color="blue darken-2"
            dark
            fab
          >
            <v-icon>mdi-clippy</v-icon>
          </v-btn>
        </transition>
        <v-badge bordered color="error" icon="mdi-lock" overlap>
          <v-btn class="white--text" color="error" depressed>Lock Account</v-btn>
        </v-badge>
        <transition name="slide-fade">
          <v-btn
            v-show="!isCanvasClean"
            @click="clearCanvas()"
            class="clearCanvas ml-2"
            color="blue darken-2"
            dark
            fab
          >
            <v-icon>mdi-clippy</v-icon>
          </v-btn>
        </transition>
      </div>
      <div class="form" ref="form">
        <v-form class="form__content" ref="form" v-model="valid" :lazy-validation="lazy">
          <div>
            <h2 class="mb-2">Вход</h2>
            <span class="d-block mb-8">Введите логин и пароль</span>
          </div>
          <v-text-field
            v-model="login"
            class="mb-6"
            :counter="10"
            :rules="loginRules"
            label="Имя пользователя"
            outlined
            dense
            required
          ></v-text-field>
          <v-text-field
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            class="mb-6"
            v-model="password"
            :rules="passwordRules"
            label="Пароль"
            outlined
            dense
            counter
            @click:append="showPassword = !showPassword"
            required
          ></v-text-field>
          <v-checkbox v-model="checkbox" label="Запомнить меня"></v-checkbox>
          <v-btn
            class="mt-12"
            :disabled="!valid"
            color="success"
            elevation="2"
            block
            large
            @click="validate"
          >Войти</v-btn>
        </v-form>
        <div class="white-box"></div>
      </div>
    </div>
    <canvas
      id="canvas"
      ref="canvas"
      class="canvas"
      @mousedown="setPosition"
      @mousemove="drawPath"
      @mouseup="setPosition"
    ></canvas>
    <v-snackbar v-model="snackbar" color="success" right :timeout="6000">
      {{ snackbarText }}
      <v-btn dark text @click="snackbar = false">Закрыть</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
let pos = { x: 0, y: 0 };
const DELETE = 46;
const BACKSPACE = 8;

export default {
  data() {
    return {
      isCanvasImgInserted: false,
      snackbar: false,
      snackbarText: "",
      isColorPickerMenuOpen: false,
      isCanvasClean: true,
      penColor: "#000000",
      vueCanvas: {},
      valid: true,
      showPassword: false,
      login: "",
      loginRules: [
        v => !!v || "Login is required",
        v => (v && v.length <= 30) || "Login must be less than 30 characters"
      ],
      password: "",
      passwordRules: [v => !!v || "Password is required"],
      checkbox: true,
      lazy: true
    };
  },
  mounted() {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    this.vueCanvas = ctx;
    this.resize();
    this.loadCanvasImgFromLocaleStorage();
  },
  created() {
    document.addEventListener("keydown", this.onDeletePressed);
  },
  methods: {
    resize() {
      this.vueCanvas.canvas.width = window.innerWidth;
      this.vueCanvas.canvas.height = window.innerHeight;
    },
    loadCanvasImgFromLocaleStorage() {
      let dataURL = localStorage.getItem("canvasImg");
      let img = new Image();

      img.onload = initImage.call(this);
      img.src = dataURL;

      function initImage() {
        let currentContext = this;

        return function onImgLoaded() {
          currentContext.vueCanvas.drawImage(img, 0, 0);
          currentContext.isCanvasClean = false;
          currentContext.isCanvasImgInserted = true;
        };
      }
    },
    clearCanvas() {
      this.vueCanvas.clearRect(0, 0, window.innerWidth, window.innerHeight);
      this.isCanvasImgInserted = true;
      this.isCanvasClean = true;

      localStorage.removeItem("canvasImg");
      this.showSnackBar("Холст очищен");
    },
    showSnackBar(text) {
      this.snackbarText = text;
      this.snackbar = true;
    },
    onDeletePressed(e) {
      if (e.keyCode === DELETE || e.keyCode === BACKSPACE) {
        this.clearCanvas();
      }
    },
    validate() {
      console.log("login");
    },
    drawPath(e) {
      if (e.buttons !== 1 || this.isColorPickerMenuOpen) {
        this.$refs["canvas"].style.cursor = "default";
        return; // if mouse is not clicked, do not go further
      }
      this.$refs["canvas"].style.cursor = "crosshair";

      this.isCanvasImgInserted = false;
      this.isCanvasClean = false;
      this.vueCanvas.beginPath();
      this.vueCanvas.lineWidth = 3; // width of line
      this.vueCanvas.lineCap = "round"; // rounded end cap
      this.vueCanvas.strokeStyle = this.penColor;

      this.vueCanvas.moveTo(pos.x, pos.y); // from position
      this.setPosition(e);
      this.vueCanvas.lineTo(pos.x, pos.y); // to position

      this.vueCanvas.stroke(); // draw it!
    },
    setPosition(e) {
      pos.x = e.offsetX;
      pos.y = e.offsetY;
    },
    saveCanvasImgToLocalStorage() {
      this.isCanvasImgInserted = true;

      localStorage.setItem("canvasImg", canvas.toDataURL());
      this.showSnackBar("Холст сохранен");
    }
  }
};
</script>

<style lang="scss" scoped>
.background-wrapper {
  width: 100%;
  height: 100%;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.25)),
    url("../assets/img/paper.jpg");
  background-size: cover;
}

.registration-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  padding: 40px;
  -webkit-user-select: none; /* Chrome all / Safari all */
  -moz-user-select: none; /* Firefox all */
  -ms-user-select: none; /* IE 10+ */
  user-select: none;

  .logo {
    position: relative;
    display: flex;
    z-index: 1;
    height: fit-content;
    flex-wrap: wrap-reverse;

    & > * {
      margin-top: 20px;
    }
  }

  .form {
    margin-top: 20px;
    position: relative;
    min-width: 320px;
    height: fit-content;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 6px;
    background-image: linear-gradient(
      115deg,
      #4fcf70,
      #fad648,
      #a767e5,
      #12bcfe,
      #44ce7b
    );
    animation: rainbow-animation 5s ease-in-out;
    z-index: 1;

    &:hover {
      animation: none;
    }

    &__content {
      position: relative;
      z-index: 1;
      padding: 34px 36px;
    }

    & .white-box {
      width: calc(100% - 10px);
      height: calc(100% - 10px);
      position: absolute;
      top: 5px;
      left: 5px;
      background-color: white;
      border-radius: 6px;
    }
  }

  .toolkit {
    display: flex;
    z-index: 1;
    width: fit-content;
    position: absolute;
    bottom: 40px;
  }
}

.container {
  max-width: 1280px;
  padding: 15px;
  margin: auto;
}

.canvas {
  position: absolute;
  top: 0;
  left: 0;
}

@media (max-width: 600px) {
  .registration-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;

    .toolkit {
      display: none;
    }

    .logo {
      display: none;
    }
  }
  .canvas {
    display: none;
  }
}

@keyframes rainbow-animation {
  0%,
  100% {
    background-image: linear-gradient(
      0deg,
      #4fcf70,
      #fad648,
      #a767e5,
      #12bcfe,
      #44ce7b
    );
  }

  25% {
    background-image: linear-gradient(
      90deg,
      #4fcf70,
      #fad648,
      #a767e5,
      #12bcfe,
      #44ce7b
    );
  }
  50% {
    background-image: linear-gradient(
      180deg,
      #4fcf70,
      #fad648,
      #a767e5,
      #12bcfe,
      #44ce7b
    );
  }
  75% {
    background-image: linear-gradient(
      270deg,
      #4fcf70,
      #fad648,
      #a767e5,
      #12bcfe,
      #44ce7b
    );
  }
}

/* Анимации появления и исчезновения могут иметь */
/* различные продолжительности и динамику.       */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.15s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active до версии 2.1.8 */ {
  transform: translateX(-10px);
  opacity: 0;
}
</style>