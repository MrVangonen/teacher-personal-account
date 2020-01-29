<template>
    <v-app-bar>
        <v-btn
            v-if="isMobile"
            icon
            @click="changeNavButtonState('isNavButtonMobileClicked')"
        >
            <v-icon>
                mdi-menu
            </v-icon>
        </v-btn>
        <v-btn
            v-else
            icon
            @click="changeNavButtonState('isNavButtonDesktopClicked')"
        >
            <v-icon v-show="navOptions.isNavButtonDesktopClicked"
                >mdi-dots-vertical</v-icon
            >
            <v-icon v-show="!navOptions.isNavButtonDesktopClicked"
                >mdi-view-quilt</v-icon
            >
        </v-btn>
        <v-toolbar-title>{{ navOptions.appNavTitle }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn class="mr-sm-12" icon>
            <v-icon>mdi-email-outline</v-icon>
        </v-btn>
        <v-btn class="mr-sm-12" icon>
            <v-icon>mdi-bell-outline</v-icon>
        </v-btn>
        <v-btn color="red lighten-2" icon>
            <v-icon color="red lighten-2">mdi-logout-variant</v-icon>
        </v-btn>
    </v-app-bar>
</template>

<script>
export default {
    props: {
        navOptions: Object
    },
    data() {
        return {};
    },
    computed: {
        isMobile() {
            return this.$vuetify.breakpoint.xsOnly;
        }
    },
    methods: {
        changeNavButtonState(buttonState) {
            this.navOptions[buttonState] = !this.navOptions[buttonState];
            localStorage.setItem(
                "NavButtonClicked",
                Number(this.navOptions[buttonState])
            );
        }
    }
};
</script>

<style lang="scss">
.test {
    background-color: red;
}
</style>
