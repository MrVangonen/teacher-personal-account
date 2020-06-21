<template>
  <div v-cloak class="background-wrapper">
    <section class="start-section container" ref="start">
      <div class="logo">
        <img height="82px" class="mr-4" :src="require('@/assets/img/logo.png')" alt />
        <span class="text-sm font-weight-bold display-1">
          Личный кабинет
          <br />
          <span class="accent--text">преподавателя</span>
        </span>
      </div>
      <div class="toolkit">
        <v-menu v-model="isPenColorOpen" top offset-y :close-on-content-click="false">
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" color="blue darken-2" class="color-btn" dark fab>
              <v-icon>mdi-format-color-fill</v-icon>
              <div v-show="isCanvasImgSaved" class="badge"></div>
            </v-btn>
          </template>
          <v-color-picker v-model="penColor" class="ma-2" hide-inputs></v-color-picker>
        </v-menu>
        <v-menu v-model="isPenThicknessOpen" top offset-y :close-on-content-click="false">
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" color="blue darken-2" class="thikness-btn ml-2" dark fab>
              <v-icon>mdi-pen</v-icon>
            </v-btn>
          </template>
          <div class="slidecontainer">
            <input
              v-model="penThickness"
              style="width: 200px"
              type="range"
              min="1"
              max="50"
              class="slider"
            />
          </div>
        </v-menu>
        <transition name="slide-fade">
          <v-btn
            v-show="!isCanvasImgSaved"
            @click="saveCanvasImgToLocalStorage()"
            class="save-btn ml-2"
            color="blue darken-2"
            dark
            fab
          >
            <v-icon>mdi-clippy</v-icon>
          </v-btn>
        </transition>
        <transition name="slide-fade">
          <v-btn
            v-show="!isCanvasClean"
            @click="clearCanvas()"
            class="ml-2"
            color="clear-btn blue darken-2"
            dark
            fab
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </transition>
      </div>
      <div class="form">
        <v-form
          v-if="!isRegistrationForm"
          class="form__content"
          v-model="isLoginFormValid"
          :lazy-validation="lazy"
          @submit.prevent="signIn"
        >
          <h2 class="mb-2">Вход</h2>
          <span class="d-block mb-8">Введите логин и пароль</span>
          <v-text-field
            v-model="username"
            class="mb-6"
            :rules="loginRules"
            label="Логин"
            outlined
            dense
            required
          ></v-text-field>
          <v-text-field
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            class="mb-4"
            v-model="password"
            :rules="passwordRules"
            label="Пароль"
            outlined
            dense
            counter
            @click:append="showPassword = !showPassword"
            required
          ></v-text-field>
          <v-checkbox v-model="rememberMeCheckbox" label="Запомнить меня"></v-checkbox>
          <v-btn
            class="mt-8"
            :disabled="!isLoginFormValid"
            color="success"
            elevation="2"
            block
            large
            type="submit"
          >Войти</v-btn>
          <v-btn
            class="mt-4"
            color
            elevation="2"
            block
            large
            @click="isRegistrationForm = true"
          >Зарегестрироваться</v-btn>
        </v-form>
        <v-form
          v-else
          class="form__content registration"
          v-model="isRegistrationFormValid"
          :lazy-validation="lazy"
          @submit.prevent="signUp"
        >
          <h2 class="mb-2">Регистрация</h2>
          <span class="d-block mb-8">Быстро и просто</span>
          <v-text-field
            v-model="name"
            class="mb-6"
            :rules="nameRules"
            label="Имя"
            placeholder="Иван"
            outlined
            dense
            required
          ></v-text-field>
          <v-text-field
            v-model="newLogin"
            class="mb-6"
            :rules="newLoginRules"
            label="Новый логин"
            placeholder="Ivan13001"
            @input="checkUsername()"
            outlined
            dense
            required
          ></v-text-field>
          <v-text-field
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            class="mb-6"
            v-model="newPassword"
            :rules="passwordRules"
            label="Новый пароль"
            placeholder="password109009"
            outlined
            dense
            counter
            @click:append="showPassword = !showPassword"
            required
          ></v-text-field>
          <input type="date" class="birthday" v-model="birthday" min="1900-01-01" max="2100-12-31" />
          <v-checkbox
            v-model="termsOfUserCheckbox"
            label="Я ознакомился с правилами, политикой конфиденциальности и принимаю их условия."
          ></v-checkbox>
          <v-btn
            class="mt-8"
            :disabled="!isRegistrationFormValid"
            color="success"
            elevation="2"
            type="submit"
            block
            large
          >Зарегестрироваться</v-btn>
          <v-btn
            class="mt-4"
            color
            elevation="2"
            block
            large
            @click="isRegistrationForm = false"
          >Войти</v-btn>
        </v-form>
        <div class="white-box"></div>
        <div class="rainbow" :class="{'none-animation': isRegistrationForm}"></div>
      </div>
    </section>
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
let timeout;
let newLoginValidationPromise = new Promise(function(req, res) {});

export default {
  data() {
    return {
      isNewLoginValid: true,
      isRegistrationForm: false,
      isCanvasImgSaved: true,
      isUserNameValid: false,
      isCanvasClean: true,
      snackbar: false,
      snackbarText: "",
      isPenColorOpen: false,
      isPenThicknessOpen: false,
      penColor: "#000000",
      penThickness: 3,
      vueCanvas: {},
      isLoginFormValid: true,
      isRegistrationFormValid: true,
      showPassword: false,
      username: "",
      password: "",
      rememberMeCheckbox: true,
      name: "i",
      newLogin: "i",
      newPassword: "password",
      birthday: null,
      termsOfUserCheckbox: true,
      newLoginRules: [],
      loginRules: [
        v => !!v || "Введите логин",
        v => (v && v.length <= 30) || "Логин не должен превышать 30 символов"
      ],
      nameRules: [
        v => !!v || "Введите имя",
        v => (v && v.length <= 30) || "Имя не должен превышать 30 символов"
      ],
      passwordRules: [
        v => !!v || "Введите пароль",
        v => (v && v.length <= 30) || "Пароль не должен превышать 30 символов"
      ],
      lazy: true
    };
  },
  mounted() {
    let canvas = document.getElementById("canvas");
    this.vueCanvas = canvas.getContext("2d");

    this.resize();
    this.loadCanvasImgFromLocaleStorage();
  },
  created() {
    this.newLoginRules = [
      v => !!v || "Введите логин",
      v => (v && v.length <= 30) || "Логин не должен превышать 30 символов",
      v => this.isNewLoginValidComputed || "Такой логин уже используется"
    ];
    // this.newLoginRules = this.loginRules.concat(async function(v) {
    //   console.log(newLoginValidationPromise);
    //   await newLoginValidationPromise.then(function(response){
    //     console.log(response)
    //     if(response) {
    //       return "Такой логин уже существует";
    //     }
    //   })
    // });
  },
  computed: {
    isNewLoginValidComputed() {
      return this.isNewLoginValid;
    }
  },
  methods: {
    signIn() {
      this.$store
        .dispatch("retrieveToken", {
          username: this.username,
          password: this.password
        })
        .then(response => {
          this.$router.push({ name: "schedule" });
        });
    },
    signUp() {
      this.$store
        .dispatch("registration", {
          name: this.name,
          username: this.newLogin,
          password: this.newPassword,
          birthday: this.birthday
        })
        .then(response => {
          this.$router.push({ name: "schedule" });
        });
    },
    checkUsername() {
      clearTimeout(timeout);

      if (!this.newLogin) {
        return;
      }

      let currentThis = this;
      timeout = setTimeout(function() {
        currentThis.$store
          .dispatch("checkUsername", {
            username: currentThis.newLogin
          })
          .then(response => {
            if (response.isUserRegistered) {
              currentThis.isRegistrationFormValid = false;
              currentThis.isNewLoginValid = false;

              this.newLoginRules = [
                v => !!v || "Введите логин",
                v =>
                  (v && v.length <= 30) ||
                  "Логин не должен превышать 30 символов",
                v =>
                  this.isNewLoginValidComputed || "Такой логин уже используется"
              ];
            } else {
              currentThis.isRegistrationFormValid = true;
              currentThis.isNewLoginValid = true;

              this.newLoginRules = [
                v => !!v || "Введите логин",
                v =>
                  (v && v.length <= 30) ||
                  "Логин не должен превышать 30 символов",
                v =>
                  this.isNewLoginValidComputed || "Такой логин уже используется"
              ];
            }
          });
      }, 600);
    },
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
        };
      }
    },
    clearCanvas() {
      this.vueCanvas.clearRect(0, 0, window.innerWidth, window.innerHeight);
      this.isCanvasImgSaved = true;
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
    drawPath(e) {
      if (e.buttons !== 1 || this.isPenColorOpen || this.isPenThicknessOpen) {
        this.$refs["canvas"].style.cursor = "default";
        return; // if mouse is not clicked, do not go further
      }
      this.$refs["canvas"].style.cursor = "crosshair";

      this.isCanvasImgSaved = false;
      this.isCanvasClean = false;
      this.vueCanvas.beginPath();
      this.vueCanvas.lineWidth = this.penThickness; // width of line
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
      this.isCanvasImgSaved = true;
      this.isCanvasClean = true;

      localStorage.setItem("canvasImg", canvas.toDataURL());
      this.showSnackBar("Холст сохранен");
    }
  }
};
</script>

<style lang="scss" scoped>
[v-cloak] {
  display: none;
}

$additional-gap: 20px;

.background-wrapper {
  width: 100%;
  height: 100%;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.25)),
    url("../assets/img/paper.jpg");
  background-size: cover;
}

.start-section {
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

    & * {
      margin-top: $additional-gap;
    }
  }

  .form {
    margin-top: $additional-gap;
    position: relative;
    min-width: 320px;
    height: fit-content;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 6px;
    overflow: hidden;
    z-index: 1;

    &:hover {
      animation: none;
    }

    &__content {
      position: relative;
      z-index: 3;
      padding: 34px 36px;

      &.login {
      }

      &.registration {
        max-width: 500px;

        .birthday {
          width: 100%;
          outline: 0;
          padding: 6px 10px;
          border: 1px solid rgba(0, 0, 0, 0.24);
          border-radius: 6px;

          &:focus {
            color: #000;
            border: 1px solid var(--v-primary-base);
          }
        }
      }
    }

    .white-box {
      width: calc(100% - 10px);
      height: calc(100% - 10px);
      position: absolute;
      top: 5px;
      left: 5px;
      background: white;
      border-radius: 6px;
      z-index: 2;
    }

    .rainbow {
      position: absolute;
      width: 1000px;
      height: 1000px;
      left: -75%;
      top: -20%;
      background-image: linear-gradient(
        115deg,
        #4fcf70,
        #fad648,
        #a767e5,
        #12bcfe,
        #44ce7b
      );
      animation: rotate-animation 15s ease-in-out infinite;
      transform: rotate(0deg);
      z-index: 1;
    }

    .none-animation {
      animation: none;
    }
  }

  .toolkit {
    display: flex;
    z-index: 1;
    width: fit-content;
    position: absolute;
    bottom: 40px;

    .save-btn,
    .clear-btn,
    .color-btn,
    .thikness-btn {
      &:hover::after {
        background: transparent;
        position: absolute;
        top: -25px;
        font-size: 10px;
        color: black;
        font-weight: bold;
        z-index: 3;
        padding: 2px;
        border: none;

        --webkit-box-shadow: none;
        box-shadow: none;
      }
    }

    .color-btn {
      &:hover::after {
        content: "Цвет";
      }
    }

    .thikness-btn {
      &:hover::after {
        content: "Толщина";
      }
    }

    .save-btn {
      &:hover::after {
        content: "Сохранить";
      }
    }

    .clear-btn {
      &:hover::after {
        content: "Очистить";
      }
    }

    .badge {
      position: absolute;
      width: 20px;
      height: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: var(--v-accent-base);
      border-radius: 50%;
      border: 2px solid white;
      right: -4px;
      top: -16px;
      z-index: 1;

      &::before {
        content: "\F012C";
        font: normal normal normal 24px/1 "Material Design Icons";
        font-size: 15px;
        color: white;
      }
    }
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
  .start-section {
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

@keyframes rotate-animation {
  to {
    transform: rotate(360deg);
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