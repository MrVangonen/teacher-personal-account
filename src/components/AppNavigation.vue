<template>
    <v-navigation-drawer
        app
        v-bind="isMobileDevice"
        v-model="navOptions.isNavButtonMobileClicked"
        class="navigation-drawer"
    >
        <template v-slot:prepend>
            <v-list>
                <v-list-item>
                    <v-list-item-avatar size="60">
                        <v-img
                            :src="require('@/assets/musk.png')"
                        ></v-img>
                        <!-- <v-icon dark>mdi-account-circle</v-icon> -->
                    </v-list-item-avatar>
                </v-list-item>
                <v-list-group>
                    <template v-slot:activator>
                        <v-list-item-content>
                            <v-list-item-title class="title">
                                Илья Петрович
                            </v-list-item-title>
                            <v-list-item-subtitle>
                                преподаватель ПетрГУ
                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </template>
                    <v-list-item
                        v-for="(item, index) in personMenuItems"
                        :key="index"
                        router
                        :to="item.link"
                        dense
                        link
                    >
                        <v-list-item-title v-text="item.text">
                        </v-list-item-title>
                        <v-list-item-icon>
                            <v-icon v-text="item.icon"></v-icon>
                        </v-list-item-icon>
                    </v-list-item>
                </v-list-group>
            </v-list>
        </template>
        <v-divider></v-divider>
        <v-list>
            <v-list-item-group v-model="activeRouteIndex">
                <v-list-item
                    v-for="(item, index) in menuItems"
                    :key="index"
                    router
                    active-class="primary--text"
                    :to="item.link"
                    :href="item.href"
                >
                    <v-list-item-icon>
                        <v-icon v-text="item.icon"></v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title
                            v-text="item.text"
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
            icon: "mdi-folder",
            personMenuItems: [
                {
                    icon: "mdi-account-lock",
                    text: "Личные данные",
                    link: ""
                },
                {
                    icon: "mdi-settings",
                    text: "Настройки",
                    link: ""
                }
            ],
            menuItems: [
                {
                    icon: "mdi-view-list",
                    text: "Расписание",
                    link: "/"
                },
                {
                    icon: "mdi-briefcase",
                    text: "Дисциплины",
                    link: "/disciplines"
                },
                {
                    icon: "mdi-account-group",
                    text: "Студенты",
                    link: "/students"
                },
                {
                    icon: "mdi-cloud",
                    text: "Научная деятельность",
                    href: "https://petrsu.ru/page/science/organization"
                },
                {
                    icon: "mdi-inbox",
                    text: "Заявки в подразделения",
                    link: "/appeals"
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

<style lang="scss">
.navigation-drawer {
    z-index: 999!important;
    height: 100%!important;
}
</style>
