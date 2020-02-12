<template>
    <v-app class="app d-flex">
        <AppNavigation :navOptions="navOptions" />
        <main :class="changeLeftPadding">
            <AppHeader :navOptions="navOptions" />
            <div class="container container_full-height">
                <router-view></router-view>
            </div>
            <AppFooter />
        </main>
    </v-app>
</template>

<script>
import AppHeader from "./components/AppHeader";
import AppNavigation from "./components/AppNavigation";
import AppFooter from "./components/AppFooter";
import style from './scss/main.scss'

export default {
    name: "App",
    components: {
        AppHeader,
        AppNavigation,
        AppFooter
    },
    data() {
        return {
            navOptions: {
                isNavButtonDesktopClicked: Boolean(
                    Number(localStorage.getItem("NavButtonClicked"))
                ),
                isNavButtonMobileClicked: false,
            }
        };
    },
    computed: {
        changeLeftPadding() {
            if (this.$vuetify.breakpoint.xsOnly) {
                return "pl-0";
            } else {
                return {
                    "main-container_small-pl": this.navOptions
                        .isNavButtonDesktopClicked,
                    "main-container_big-pl": !this.navOptions
                        .isNavButtonDesktopClicked
                };
            }
        }
    }
};
</script>

<style lang="scss">
.main-container_small-pl {
    padding-left: 80px;
}

.main-container_big-pl {
    padding-left: 260px;
}

.container_full-height {
    min-height: 100vh;
}
</style>
