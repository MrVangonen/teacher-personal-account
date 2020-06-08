<template>
  <v-app class="app d-flex">
    <div v-if="login">
      <AppNavigation :navOptions="navOptions" />
      <main :class="changeLeftPadding">
        <AppHeader :navOptions="navOptions" />
        <div class="container container_full-height">
          <router-view></router-view>
        </div>
        <AppFooter />
      </main>
    </div>
    <Start v-else />
  </v-app>
</template>

<script>
import AppHeader from "./components/AppHeader";
import AppNavigation from "./components/AppNavigation";
import AppFooter from "./components/AppFooter";
import style from "./scss/main.scss";
import Start from "./views/Start";

export default {
  name: "App",
  components: {
    AppHeader,
    AppNavigation,
    AppFooter,
    Start
  },
  data() {
    return {
      navOptions: {
        isNavButtonDesktopClicked: Boolean(
          Number(localStorage.getItem("NavButtonClicked"))
        ),
        isNavButtonMobileClicked: false
      },
      login: false
    };
  },
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.xsOnly;
    },
    changeLeftPadding() {
      if (this.isMobile) {
        return "main-container_mobile-version";
      } else {
        return {
          "main-container_small-pl": this.navOptions.isNavButtonDesktopClicked,
          "main-container_big-pl": !this.navOptions.isNavButtonDesktopClicked
        };
      }
    }
  }
};
</script>

<style lang="scss">
.main-container_mobile-version {
  padding-top: 0;
  margin-top: 56px;
}

.main-container_small-pl {
  padding-left: 80px;
}

.main-container_big-pl {
  padding-left: 260px;
}

.container_full-height {
  min-height: 100vh;
}

//data-table default style fix
.v-data-table__wrapper tbody tr {
  // custom vuetify дата-table, с ховером
  height: 100px;

  &:hover {
    background-color: var(--v-lightning-base) !important;
  }
}

.progress-container {
  min-height: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
