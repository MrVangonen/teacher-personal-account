<template>
    <v-footer class="pa-0">
        <v-card
            flat
            tile
            class="footer lighten-1 white--text text-center"
            width="100%"
        >
            <v-card-text>
                <v-btn
                    v-for="icon in icons"
                    :key="icon.name"
                    class="mx-4 white--text"
                    :href="icon.link"
                    target="blank"
                    icon
                >
                    <v-icon size="24px">{{ icon.name }}</v-icon>
                </v-btn>
            </v-card-text>
            <v-divider dark class="mx-4"></v-divider>
            <v-card-text class="white--text">
                {{ new Date().getFullYear() }} —
                <strong>Личный кабинет Преподавателя ПетрГу</strong>
            </v-card-text>
        </v-card>
    </v-footer>
</template>

<script>
export default {
    data: () => ({
        icons: [
            {
                name: "fab fa-vk",
                link: "https://vk.com/petrsu_ru"
            },
            {
                name: "fab fa-facebook",
                link: "https://www.facebook.com/petrsunews"
            },
            {
                name: "fab fa-youtube",
                link: "https://www.youtube.com/channel/UCF6X8SpjmB8v2X6KGZBJNwA"
            }
        ]
    })
};
</script>

<style lang="scss">
.footer {
    background: url('../assets/footer_bg2.jpg') no-repeat scroll 50% 50%
        transparent;
}
</style>
