<template>
    <v-app class="d-flex">
        <Nav :navOptions="navOptions" />
        <main :class="changePadding">
            <Header :navOptions="navOptions" />
            <div class="container container_full-height">
                <router-view></router-view>
            </div>
            <Footer />
        </main>
    </v-app>
</template>

<script>
import Header from "./components/app/Header";
import Nav from "./components/app/Nav";
import Footer from "./components/app/Footer";

export default {
    name: "App",
    components: {
        Header,
        Nav,
        Footer
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
