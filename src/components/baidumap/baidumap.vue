<template>
  <!--地图容器-->
  <div class="content">
    <div id="baidumap" class="map" style="width: 100%;height:575px;"></div>
    <div class="addTarget" @click="addTarget"></div>
  </div>

</template>
<script>
  import BMap from "BMap";
  import axios from 'axios'
  Vue.prototype.$http = axios
  let map;
  export default {
    mounted() {
      // 百度地图API功能
      // 创建Map实例
      map = new BMap.Map("baidumap", {
        enableMapClick: true
      });
      // 初始化地图,设置中心点坐标和地图级别
      map.centerAndZoom(new BMap.Point(116.4035, 39.915), 11);
      // 添加地图类型控件
      map.addControl(new BMap.MapTypeControl());
      // 设置地图显示的城市 此项是必须设置的
      map.setCurrentCity("杭州");
      map.enableScrollWheelZoom(true);
      this.Geocoder_init();
    },
    methods: {
      Geocoder_init() {
        let geoc = new BMap.Geocoder();
        map.addEventListener("click", function (e) {
          var pt = e.point;
          geoc.getLocation(pt, function (rs) {
            var addComp = rs.addressComponents;
            alert(
              addComp.province +
              ", " +
              addComp.city +
              ", " +
              addComp.district +
              ", " +
              addComp.street +
              ", " +
              addComp.streetNumber
            );
          });
        });
      },
      addTarget() {
        this.$http({
          method: 'post',
          url: '/api/target/addTarget',
          data: {
            id:1, 
            batch_id:123, 
            proj_id:6,
            radar_id:31
          }
        })
      }
    }
  };

</script>

<style lang="stylus" scoped>
  .content
    height 1080px
    width 100%
</style>
