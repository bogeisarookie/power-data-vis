<template>
  <div class="leaflet-wrapper">
    <!-- <div class="map-title">
      <span>当前层级{{current_zoom}}</span>
    </div> -->
    <div id="map" class="map"></div>
    <div class='control'>
      <button class='control-button' @click="selectPowerData">测试</button>
    </div>
  </div>
</template>
<script>
import "leaflet/dist/leaflet.css";
import "leaflet/dist/leaflet.js";
import "../../common/leaflet.ChineseTmsProviders.js";
import "../../common/loadMap.js";
import test_data from "../../common/data.js";
import url from "../../common/URLconf.js";
import Vue from "vue";
import axios from "axios";
import func from "./vue-temp/vue-editor-bridge.js";

Vue.prototype.$http = axios;
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});
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
      let mapcenter = new L.latLng(31.843368, 117.296133);
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
        console.log("当前层级：" + this.current_zoom);
      });
      this.map.on("click", ev => {
        console.log("点击的经纬度坐标" + ev.latlng);
      });
      /**
       * 绘制模拟数据
       *
       */
      // let data = test_data.mockData();
      // console.log(data);
      data.forEach(element => {
        // L.circle([element.lat, element.lng], {
        //   radius: 200,
        //   color: function(element) {
        //     if (element.type == 0) {
        //       return "red";
        //     }

        //     if (element.type == 1) {
        //       return "blue";
        //     }

        //     if (element.type == 2) {
        //       return "green";
        //     }
        //   }
        // }).addTo(this.map);
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
  display inline-block
  height 100%
  width 830px
  .map
    position relative
    top 10px
    margin 10px 0px
    height 600px
    width 790
    border 5px solid white
    border-radius 5px
  .control
    position relative
</style>

