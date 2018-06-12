<template>
  <div id="app">
    <leaflet></leaflet>
    <projectview></projectview>
    <!-- <baidumap></baidumap> -->
    <!-- <router-view/> -->
  </div>
</template>

<script>
import leaflet from "./components/leaflet/leaflet.vue"
import projectview from './components/projectview/projectview'
// import baidumap from './components/baidumap/baidumap'
export default {
  // name: 'App'
  components:{
    leaflet,
    projectview

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
  background-color: #DDDDDD;
  margin-top: 0px;
  list-style-type:none;
}
</style>
