<template>
    <v-app-bar>
        <v-btn icon @click="changeNavButtonDesktopMobileState()">
            <v-icon
                v-if="
                    navOptions.isNavButtonDesktopClicked ||
                        $vuetify.breakpoint.xsOnly
                "
                >mdi-dots-vertical</v-icon
            >
            <v-icon v-else>mdi-view-quilt</v-icon>
        </v-btn>
        <v-toolbar-title>{{ navOptions.appNavTitle }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn class="mr-sm-12" icon>
            <v-icon>mdi-email-outline</v-icon>
        </v-btn>
        <v-btn class="mr-sm-12" icon>
            <v-icon>mdi-bell-outline</v-icon>
        </v-btn>
        <v-btn icon>
            <v-icon>mdi-logout-variant</v-icon>
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
    methods: {
        changeNavButtonDesktopMobileState() {
            if (this.$vuetify.breakpoint.xsOnly) {
                this.navOptions.isNavButtonMobileClicked = !this.navOptions
                    .isNavButtonMobileClicked;
            } else {
                this.navOptions.isNavButtonDesktopClicked = !this.navOptions
                    .isNavButtonDesktopClicked;
            }
        }
    }
};
</script>
