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
import "../../common/leaflet.ChineseTmsProviders.js";
import "../../common/loadMap.js";
import url from "../../common/URLconf.js";
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
      /**
       * 加载离线地图或者在线地图
       */
      // this._initmap();
      this._initCustomeMap();
    });
  },
  methods: {
    selectPowerData() {
      this.$http({
        method: "get",
        url: url.BASEURL + "/api/powerData/selectPowerData"
      }).then(response => {
        console.log(response.data);
      });
    },
    _initCustomeMap() {
      let mapcenter = new L.latLng(31.8255035997894, 117.180128945313);
      let tileLayer = new L.TileLayer.zhbLoadGuge(
        "http://localhost:8080/testmap",
        {
          maxZoom: 18,
          minZoom: 9,
          center: mapcenter
        }
      );
      this.map = L.map("map", {
        center: mapcenter,
        zoom: 14, //默认展示的缩放级别
        opacity: 0.1 //图层的不透明度
      });
      tileLayer.addTo(this.map);
      this.map.on("zoomend", ev => {
        this.current_zoom = this.map.getZoom(); // ev is an event object (MouseEvent in this case)
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
  },
  components: {
    url
  }
};
</script>

<style lang="stylus" scoped>
.leaflet-wrapper
  height 600px
  .map-title
    height 50px
  .map
    height 550px
</style>

