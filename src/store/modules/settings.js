import {utils, storage} from '@/modules/utils.js'

// initial state
const state = () => ({
    locale: utils.getLocale(),
    theme: utils.getTheme(),
})

// getters
const getters = {
    getAppSettings(state){
        return state
    }
}

// actions
const actions = {
    fetchAppSettings(context){
        const settings = {
            locale: utils.getLocale(),
            theme: utils.getTheme(),
        }

        context.commit('SET_APP_SETTINGS', {settings: settings})
    },

    updateSetting(context, {key, value}){
        storage.setItem(key, value)
        context.dispatch('fetchAppSettings')
    },

    resetSettings(context){
        utils.resetStoredSettings()
        context.dispatch('fetchAppSettings')
    }
}

// mutations
const mutations = {
    SET_APP_SETTINGS(state, {settings}){
        for (let [key, value] of Object.entries(settings)) {
            state[key] = value
        }
    }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
