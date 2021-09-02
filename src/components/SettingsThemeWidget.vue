<template>
    <div class="settings-theme-widget">
        <span class="settings-theme-widget-title">Theme</span>
        <form @input="switchOption($event)">
            <div  v-for="(option,index) in themeOptions"
            :key="index">

                <input
                type="radio" 
                name="theme-option" 
                :value="option.value"
                :checked="option.value === themePreference">

                <label :for="option.value">{{option.label}}</label>
            </div>
        </form>
    </div>
</template>


<script>
    import {mapGetters, mapActions} from 'vuex'

    export default {
        components: {},

        props: {},

        name: 'SettingsThemeWidget',

        data: () => ({
            themeOptions: [
                {
                    value: 'light',
                    label: 'Light'
                },
                {
                    value: 'dark',
                    label: 'Dark'
                },
                {
                    value: 'system',
                    label: "Use the system's theme"
                },
                {
                    value: 'time',
                    label: "Change the theme according to time"
                }
            ],

            selectedThemeOption: null,
        }),

        computed: { 
            ...mapGetters({
                themePreference: 'settings/getThemePreference'
            }),
        },

        methods: {
            ...mapActions({
                updateSetting: 'settings/updateSetting'
            }),

            switchOption(e){
                this.updateSetting({key: 'themePreference', value: e.target.value})
            }
        },
    }
</script>


<style scoped>
    .settings-theme-widget-title {
        font-size: 1.2rem;
    }
</style>