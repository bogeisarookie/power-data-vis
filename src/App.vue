<template>
  <div id="app">
    <!-- <leaflet></leaflet> -->
    <baidumap></baidumap>
    <!-- <router-view/> -->
  </div>
</template>

<script>
import leaflet from "./components/leaflet/leaflet"
import baidumap from './components/baidumap/baidumap'
export default {
  // name: 'App'
  components:{
    leaflet,
    baidumap
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
