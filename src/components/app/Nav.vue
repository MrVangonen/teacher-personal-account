<template>
    <v-navigation-drawer
        app
        v-bind="isMobileDevice"
        v-model="navOptions.isNavButtonMobileClicked"
    >
        <template v-slot:prepend>
            <v-list>
                <v-list-item>
                    <v-list-item-avatar>
                        <v-img
                            size="32"
                            :src="require('@/assets/logo.png')"
                        ></v-img>
                        <!-- <v-icon dark>mdi-account-circle</v-icon> -->
                    </v-list-item-avatar>
                </v-list-item>
                <v-list-item link two-line>
                    <v-list-item-content>
                        <v-list-item-title class=" title">
                            Иван Петрович
                        </v-list-item-title>
                        <v-list-item-subtitle>
                            преподаватель ПетрГУ
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </template>
        <v-divider></v-divider>
        <v-list>
            <v-list-item-group v-model="activeRouteIndex">
                <v-list-item
                    v-for="(item, index) in menuItems"
                    v-bind:key="index"
                    router
                    :to="item.link"
                >
                    <v-list-item-icon>
                        <v-icon v-text="item.icon"></v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title
                            v-text="item.title"
                        ></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
import { isNullOrUndefined } from "util";
export default {
    props: {
        navOptions: Object
    },
    watch: {
        $route(to, from) {
            this.navOptions.appNavTitle = to.name;
        }
    },
    data() {
        return {
            menuItems: [
                {
                    icon: "mdi-folder",
                    title: "Shedule",
                    link: "/"
                },
                {
                    icon: "mdi-file",
                    title: "Students",
                    link: "/students"
                },
                {
                    icon: "mdi-home",
                    title: "Home",
                    link: "/home"
                },
                {
                    icon: "mdi-sync",
                    title: "About",
                    link: "/about"
                }
            ],
            activeRouteIndex: 0
        };
    },
    computed: {
        isMobileDevice() {
            if (this.$vuetify.breakpoint.xsOnly) {
                return {
                    absolute: true
                };
            } else {
                return {
                    "expand-on-hover": this.navOptions
                        .isNavButtonDesktopClicked,
                    permanent: true
                };
            }
        }
    },
    methods: {}
};
</script>

<style lang="scss"></style>
