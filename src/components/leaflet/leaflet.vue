<template>
  <div class="leaflet-wrapper">
    <div class="map-title">
      <span>当前层级{{current_zoom}}</span>
    </div>
    <div id="map" class="map"></div>
    <div class='control'>
      <button class='control-button' @click="selectPowerData">测试</button>
    </div>
  </div>
</template>
<script>
import "leaflet/dist/leaflet.js";
import "leaflet/dist/leaflet.css";
import "../../libs/leaflet.ChineseTmsProviders.js";
import Vue from "vue";
import axios from "axios";
Vue.prototype.$http = axios;


export default {
  data() {
    return {
      map: null,
      current_zoom: 12
    };
  },
  created() {
    this.$nextTick(function() {
      this._initmap();
    });
  },
  methods: {
    selectPowerData() {
      this.$http({
        method: "get",
        url: BASEURL+"/api/powerData/selectPowerData"
      }).then(response => {
        console.log(response.data);
      });
    },
    _initmap() {
      let normalMap = L.tileLayer.chinaProvider("Google.Normal.Map", {
          maxZoom: 20,
          minZoom: 1
        }),
        satelliteMap = L.tileLayer.chinaProvider("Google.Satellite.Map", {
          maxZoom: 20,
          minZoom: 1
        });
      let baseLayers = {
        地图: normalMap,
        影像: satelliteMap
      };
      let overlayLayers = {};
      this.map = L.map("map", {
        center: [31.59, 120.29],
        zoom: 12,
        layers: [normalMap],
        zoomControl: false
      });
      this.current_zoom = this.map.getZoom();
      L.control.layers(baseLayers, overlayLayers).addTo(this.map);
      L.control
        .zoom({
          zoomInTitle: "放大",
          zoomOutTitle: "缩小"
        })
        .addTo(this.map);
      this.map.on("zoomend", ev => {
        this.current_zoom = this.map.getZoom(); // ev is an event object (MouseEvent in this case)
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.leaflet-wrapper {
  height: 600px;

  .map-title {
    height: 50px;
  }

  .map {
    height: 550px;
  }
}
</style>

