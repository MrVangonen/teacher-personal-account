<template>
    <v-app class="d-flex">
        <AppNavigation :navOptions="navOptions" />
        <main :class="changePadding">
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
                isNavButtonDesktopClicked: false,
                isNavButtonMobileClicked: false,
                appNavTitle: "Shedule"
            }
        };
    },
    computed: {
        changePadding() {
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
