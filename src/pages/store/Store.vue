<template>
  <div class="store">
    <NavBar :isBack="true"
            title="附近门店" />
    <!-- <Swiper /> -->
    <Menu @toggleList="toggleList"
          @sortChange="sortChange"
          :shopSortTypeEnum="shopSortTypeEnum" />
    <div class="content">
      <van-list v-model="loading"
                v-show="!isShowMap"
                class="scroll"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad">
        <StoreCard v-for="item in list"
                   :key="item.id"
                   :detail="item" />
      </van-list>
    </div>
    <div id="container"
         v-show="isShowMap"></div>
  </div>
</template>

<script>
import Swiper from './components/Swiper.vue'
import Menu from './components/Menu.vue'
import StoreCard from './components/StoreCard.vue'
import NavBar from '@/components/base/NavBar.vue'

// 获取附近门店
import { getNearShopList } from '../../services/services_shop'

export default {
  name: "store",
  components: {
    Swiper,
    Menu,
    StoreCard,
    NavBar
  },
  mixins: [],
  props: {

  },
  data: function () {
    return {
      current: 0,
      size: 10,
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      isShowMap: false,
      longitude: 120.022728,
      latitude: 30.298773,
      shopSortTypeEnum: '1', // 排序方式  1智能方式  2距离方式
      map: null
    }
  },
  created: function () {

  },
  mounted: function () {
    // this.getLocation();
    this.map = new BMapGL.Map("container");          // 创建地图实例 
    let point = new BMapGL.Point(120.022728, 30.298773);  // 创建点坐标 
    this.map.centerAndZoom(point, 15);

    let geolocation = new BMapGL.Geolocation();
    geolocation.getCurrentPosition(function (r) {
      if (this.getStatus() == BMAP_STATUS_SUCCESS) {
        console.log(r.point.lng + "__" + r.point.lat);
        alert(r.point.lng + "__" + r.point.lat)
        getAddress(r.point.lng, r.point.lat);
      }
      else {
        console.log('BMAP_STATUS---' + this.getStatus());
        alert('BMAP_STATUS---' + this.getStatus());
      }
    }, { enableHighAccuracy: true })
    //BMAP_STATUS_SUCCESS	检索成功。对应数值“0”。
    //BMAP_STATUS_CITY_LIST	城市列表。对应数值“1”。
    //BMAP_STATUS_UNKNOWN_LOCATION	位置结果未知。对应数值“2”。
    //BMAP_STATUS_UNKNOWN_ROUTE	导航结果未知。对应数值“3”。
    //BMAP_STATUS_INVALID_KEY	非法密钥。对应数值“4”。
    //BMAP_STATUS_INVALID_REQUEST	非法请求。对应数值“5”。
    //BMAP_STATUS_PERMISSION_DENIED	没有权限。对应数值“6”。(自 1.1 新增)
    //BMAP_STATUS_SERVICE_UNAVAILABLE	服务不可用。对应数值“7”。(自 1.1 新增)
    //BMAP_STATUS_TIMEOUT	超时。对应数值“8”。(自 1.1 新增)
  },
  computed: {

  },
  methods: {
    onLoad () {
      this.current += 1
      this.feachList()
    },
    onRefresh () {
      this.current = 0
      this.list = []
      // 清空列表数据
      this.finished = false;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
    async feachList () {
      try {
        this.loading = true;
        const res = await getNearShopList(
          {
            current: this.current,
            size: this.size,
            latitude: this.latitude,
            longitude: this.longitude,
            shopSortTypeEnum: this.shopSortTypeEnum
          }
        )
        if (res.code != 0) {
          this.$toast(res.msg)
          // console.log(res.msg);
          this.loading = false;
        } else {
          this.list = this.list.concat(res.data.records)
          this.getMarke(this.list)
          this.loading = false;
          if (res.data.records.length == 0) {
            this.finished = true
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    // 地图打点
    getMarke (list) {
      list.forEach(item => {
        // console.log(item);
        const { longitude, latitude } = item
        let point = new BMapGL.Point(longitude, latitude);
        let marker = new BMapGL.Marker(point);        // 创建标注   
        this.map.addOverlay(marker);

        marker.addEventListener("click", () => {
          let opts = {
            width: 150,     // 信息窗口宽度
            height: 80,    // 信息窗口高度
            // title: item.name, // 信息窗口标题
          }
          var sContent = `<h4 style='margin:0 0 5px 0;'>${item.name}门</h4>` +
            `<p style='margin:0;line-height:1.5;font-size:13px;'> 店铺类型：${item.typeText}</p>` +
            "<p style='margin:0;line-height:1.5;font-size:13px;'>" +
            `详细地址：${item.detailAddress}` +
            "</p>"
            + "</div>";
          let infoWindow = new BMapGL.InfoWindow(sContent, opts);  // 创建信息窗口对象
          this.map.openInfoWindow(infoWindow, point);

        });
      })
    },
    // 切换列表地图
    toggleList (isShowMap) {
      this.isShowMap = isShowMap
    },
    // 切换排序顺序
    sortChange (val) {
      this.shopSortTypeEnum = val
      this.onRefresh()
    },
    // --------------定位-------------------
    //通过经纬度获取地址信息
    getLocation () {
      var options = {
        enableHighAccuracy: true,
        maximumAge: 1000
      };
      alert('获取位置信息开始--------->');
      if (navigator.geolocation) {
        // 走到这里说明，浏览器支持geolocation，参数里有两个回调函数，一个是定位成功后的处理操作，一个是定位失败后的处理操作，另外一个参数没有研究过
        navigator.geolocation.getCurrentPosition(this.onSuccess, this.onError, options);
      } else {
        // 否则浏览器不支持geolocation
        alert('您的浏览器不支持地理位置定位！');
      }
    },
    // 成功时的回调函数
    // 第一步获取定位成功返回的经纬度数据，然后结合百度那边提供的接口进行具体位置的转换，最后还有一个数据提交的方法，要跟自己的业务操作了
    onSuccess (position) {
      console.log(position.coords);
      // 返回用户位置
      // 经度
      var longitude = position.coords.longitude;
      // 纬度
      var latitude = position.coords.latitude;
      alert('您的当前地址的经纬度：经度' + longitude + '，纬度' + latitude);
      // 根据经纬度获取地理位置，不太准确，获取城市区域还是可以的
      var map = new BMap.Map("allmap");
      var point = new BMap.Point(longitude, latitude);
      var gc = new BMap.Geocoder();
      gc.getLocation(point, function (rs) {
        var addComp = rs.addressComponents;
        alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
      });
      // 这里后面可以写你的后续操作了
      handleData(longitude, latitude);
    },
    onError (error) {
      switch (error.code) {
        case 1:
          alert("位置服务被拒绝！");
          break;
        case 2:
          alert("暂时获取不到位置信息！");
          break;
        case 3:
          alert("获取信息超时！");
          break;
        case 4:
          alert("未知错误！");
          break;
      }
      // 这里后面可以写你的后续操作了，下面的经纬度是杭州师范的具体位置
      // 经度
      var longitude = 120.022728;
      // 纬度
      var latitude = 30.298773;
      handleData(longitude, latitude);
    }
  },



}
</script>

<style scoped lang="scss">
.store {
  background-color: #f6f6f6;

  .content {
    padding: 0 0.1rem;
    overflow: hidden;

    .scroll {
      height: calc(100vh - 0.9rem);
      overflow: auto;
    }
  }

  #container {
    height: calc(100vh - 90px);
    background-color: #fff;
  }
}
</style>
