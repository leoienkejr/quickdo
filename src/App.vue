<template>
  <router-view/>
</template>

<script>
  import store from './store'
  import {utils} from '@/modules/utils.js'

  export default {
      store,
      data: () => ({
          utils: utils,
      })
  }
</script>

<style>
  @import url('./App.css');
</style>
