<template>
  <div id="wrapper" :style="utils.getCssColors()">
    <app-bar v-if="mounted"/>
    <router-view/>
  </div>
</template>

<script>
  import store from './store'
  import {utils} from '@/modules/utils.js'
  import AppBar from '@/components/AppBar.vue'

  export default {
      store,

      components: {
        AppBar
      },

      data: () => ({
          utils: utils,
          mounted: false,
      }),

      mounted(){

        // This is a workaround to avoid AppBar
        // being rendered and trying to access
        // $store before the app is properly
        // set up.
        this.mounted = true;
      }
  }
</script>

<style>
  @import url('./App.css');
</style>
