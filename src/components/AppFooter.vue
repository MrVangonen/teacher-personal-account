<template>
    <v-footer class="pa-0">
        <v-card
            flat
            tile
            class="footer lighten-1 white--text text-center"
            width="100%"
        >
            <v-card-text class="d-flex flex-wrap justify-center">
                <v-btn
                    href="mailto:dospeh@petrsu.ru"
                    class="mx-4 mb-4 mb-md-0"
                    width="250"
                    height="70"
                    dark
                    outlined
                >
                    <v-icon class="mr-auto" large>mdi-phone</v-icon>
                    <span class="text-right">
                        <span class="subtitle-1">
                            Учебный отдел
                        </span>
                        <br />
                        <span class="caption">
                            (8142) 71-10-24
                        </span>
                        <br />
                        <span class="caption">
                            dospeh@petrsu.ru
                        </span>
                    </span>
                </v-btn>
                <v-btn
                    href="mailto:dospeh@petrsu.ru"
                    width="250"
                    height="70"
                    dark
                    outlined
                >
                    <v-icon class="mr-auto" large>mdi-message-alert</v-icon>
                    <span class="text-right">
                        <span class="subtitle-2">
                            Сообщить об ошибке
                        </span>
                        <br />
                        <span class="caption">
                            lk-help@gmail.com
                        </span>
                    </span>
                </v-btn>
            </v-card-text>
            <v-divider dark class="mx-4"></v-divider>
            <v-card-text class="white--text d-flex flex-wrap justify-center align-center">
                <span>
                    {{ new Date().getFullYear() }} —
                    <strong>Личный кабинет Преподавателя ПетрГу</strong>
                </span>
                <div>
                    <v-btn
                        v-for="icon in icons"
                        :key="icon.name"
                        class="mx-4 white--text"
                        :href="icon.link"
                        target="blank"
                        icon
                    >
                        <v-icon size="24">{{ icon.name }}</v-icon>
                    </v-btn>
                </div>
            </v-card-text>
        </v-card>
    </v-footer>
</template>

<script>
export default {
    data: () => ({
        icons: [
            {
                name: "mdi-vk",
                link: "https://vk.com/petrsu_ru"
            },
            {
                name: "mdi-facebook",
                link: "https://www.facebook.com/petrsunews"
            },
            {
                name: "mdi-youtube",
                link: "https://www.youtube.com/channel/UCF6X8SpjmB8v2X6KGZBJNwA"
            }
        ]
    })
};
</script>

<style lang="scss">
.footer {
    background: url("../assets/img/footer_bg2.jpg") no-repeat scroll 50% 50%
        transparent;
}
</style>
