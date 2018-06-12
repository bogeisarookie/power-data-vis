<template>
  <div class="leaflet-wrapper">
    <!-- <div class="map-title">
      <span>当前层级{{current_zoom}}</span>
    </div> -->
    <div id="map" class="map">
      <div class="typemessage">
        <ul class='type-list'>
          <li>
            <span class="zb"></span> 主变
          </li>
          <li>
            <span class="gb"></span> 公变
          </li>
          <li>
            <span class="yh"></span> 用户
          </li>
          <li>
            <span class="xl"></span> 线路
          </li>
          <li>
            <span class="yk"></span> 业扩
          </li>
        </ul>
      </div>
    </div>
    <div class='control'>
      <button class='control-button' @click="selectPowerData">测试</button>
    </div>
  </div>
</template>
<script>
import "leaflet/dist/leaflet.css";
import "leaflet/dist/leaflet.js";
import "../../common/leaflet.ChineseTmsProviders.js";
import geojson from "../../common/anhui.json";
// import "../../common/loadMap.js";
import test_data from "../../common/data.js";
import url from "../../common/URLconf.js";
import Vue from "vue";
import axios from "axios";
import "leaflet.pm";
import "leaflet.pm/dist/leaflet.pm.css";
import leafletPip from "@mapbox/leaflet-pip";
import '../../common/leaflet-heat.js'

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
      points:[],
      data:'',
      map: null,
      current_zoom: 12,
      poly: [],
      hefeiGeo: ""
    };
  },

  created() {
    this.$nextTick(function() {
      /**
       * 加载离线地图或者在线地图
       */
      this._initmap();
      // this.initGeoJson();
      this.initDrawTool();
      this.heatmap()

      // this._initCustomeMap();
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
        zoom: 16, //默认展示的缩放级别
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
    },
    _initmap() {
      var normalMap = L.tileLayer.chinaProvider("Google.Normal.Map", {
          maxZoom: 18,
          minZoom: 5
        }),
        satelliteMap = L.tileLayer.chinaProvider("Google.Satellite.Map", {
          maxZoom: 18,
          minZoom: 5
        });
      let baseLayers = {
        地图: normalMap,
        影像: satelliteMap
      };
      let overlayLayers = {};
      this.map = L.map("map", {
        center: [31.863125, 117.283773],
        zoom: 13,
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
        console.log("当前层级：" + this.current_zoom);
      });
      this.map.on("click", ev => {
        console.log("点击的经纬度坐标" + ev.latlng);
      });
      /**
       * 绘制模拟数据
       *
       */
      this.data = test_data.mockData();
      console.log(this.data);
      this.data.forEach(element => {
        this.points.push([element.lat,element.lng,element.level*2])
        L.circle([element.lat, element.lng], {
          radius: 30,
          stroke: false,
          fillOpacity: (function(element) {
            if (element.level === 1) {
              return 0.2;
            }
            if (element.level === 2) {
              return 0.4;
            }
            if (element.level === 3) {
              return 0.8;
            }
          })(element),
          color: (function(element) {
            if (element.type === "主变") {
              return "red";
            }

            if (element.type === "公变") {
              return "blue";
            }

            if (element.type === "线路") {
              return "green";
            }
            if (element.type === "用户") {
              return "yellow";
            }
            if (element.type === "业扩") {
              return "purple";
            }
          })(element)
        }).addTo(this.map);
      });
    },
    initDrawTool() {
      // define toolbar options
      let options = {
        position: "topleft", // toolbar position, options are 'topleft', 'topright', 'bottomleft', 'bottomright'
        drawMarker: false, // adds button to draw markers
        drawPolyline: false, // adds button to draw a polyline
        drawRectangle: true, // adds button to draw a rectangle
        drawPolygon: true, // adds button to draw a polygon
        drawCircle: false, // adds button to draw a cricle
        cutPolygon: false, // adds button to cut a hole in a polygon
        editMode: true, // adds button to toggle edit mode for all layers
        removalMode: true // adds a button to remove layers
      };

      // add leaflet.pm controls to the map
      this.map.pm.addControls(options);
      this.map.on("pm:drawend", e => {
        this.poly = L.polygon(this.poly);
        let geoLayer = L.geoJSON(this.poly.toGeoJSON());
        // console.log("poly");
        // console.log(this.poly);
        this.map.eachLayer(layer => {
          // console.log(layer);
          if (layer.options.radius === 30) {
            let results = leafletPip.pointInLayer(layer._latlng, geoLayer);
            // console.log(results);
            if (results) {
              if (results.length) {
                console.log(layer);

                layer.setStyle({ stroke: true, weight: 1 });
                layer.setRadius(60);
              }
            }
          }
        });
      });
      this.map.on("pm:drawstart", e => {
        let layer = e.workingLayer;
        layer.on("pm:vertexadded", e => {
          // e includes the new vertex, it's marker
          // the index in the coordinates array
          // the working layer and shape
          this.poly.push([e.latlng.lat, e.latlng.lng]);
        });

        // check self intersection
        layer.pm.hasSelfIntersection();
      });
    },
    initGeoJson() {
      this.hefeiGeo = L.geoJSON(geojson, {
        style: function(feature) {
          return { color: "white" };
        }
      }).addTo(this.map);
    },
    heatmap(){
      let heat=L.heatLayer(this.points,{radius:25}).addTo(this.map)
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
    .typemessage
      position absolute
      top 10px
      right 70px
      z-index 500
      .type-list
        list-style-type none
        font-size 16px
      .type-list span
        display inline-block
        width 10px
        height 10px
        border-radius 5px
        &.zb
          background-color red
        &.gb
          background-color blue
        &.yh
          background-color green
        &.xl
          background-color yellow
        &.yk
          background-color purple
  .control
    position relative
</style>

