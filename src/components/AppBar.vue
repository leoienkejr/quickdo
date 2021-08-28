<template>
    <div class="app-bar flex align-center justify-center"
    :style="{backgroundColor: appSettings.theme === 'light' ? 
        colors['primaryBlue'] : colors['black']}">

        <h1 :style="{color: appSettings.theme === 'light' ?
            colors['white'] : colors['primaryBlue']}">QuickDo</h1>

    </div>
</template>


<script>
    import store from '@/store'
    import {mapGetters} from 'vuex'
    import {colors} from '@/modules/vars.js'

    export default {
        store,

        components: {},

        props: {},

        name: 'AppBar',

        data: () => ({
            colors: colors,
        }),

        computed: {
            ...mapGetters({
                appSettings: 'settings/getAppSettings'
            }),
        },

        methods: {},
    }
</script>


<style scoped>
    .app-bar {
        height: 45px;
        position: relative;
        top: 0;
        left: 0;
    }
</style>