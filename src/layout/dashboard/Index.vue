<template>
  <div>
    <h3>首页</h3>
    <el-row>
      <!-- <el-input
        v-model="keyword"
        class="w-50 m-2"
        size="small"
        placeholder="请输入详细地址"
        :suffix-icon="Search"
        width="200px"
        id="place"
      /> -->
      <el-autocomplete
        class="inline-input"
        id="place"
        v-model="keyword"
        :fetch-suggestions="querySearch"
        placeholder="请输入详细地址"
        @select="handleSelect"
      ></el-autocomplete>
      <!-- <el-button type="primary" @click="searchAddress"> 搜索 </el-button> -->
    </el-row>
    <div id="container" class="container" />
  </div>
</template>
<script setup lang="ts">
import { Search } from "@element-plus/icons";
import { ref, reactive, onMounted } from "vue";
import axios from "axios";
const keyword = ref("");
var map = undefined;

const init = () => {
  //步骤：定义map变量 调用 qq.maps.Map() 构造函数   获取地图显示容器
  //设置地图中心点
  var center = new qq.maps.LatLng(39.984104, 116.307503);
  // 初始化地图
  map = new qq.maps.Map("container", {
    rotation: 20, //设置地图旋转角度
    pitch: 30, //设置俯仰角度（0~45）
    zoom: 12, //设置地图缩放级别
    center: center, //设置地图中心点坐标
  });
};
const searchAddress = () => {
  if (!!keyword.value) {
    console.log(keyword.value);

    // Geocoder.getLocation(hospitalName.value);
  }
};
const querySearch = (queryString: String, cb: any) => {
  console.log(queryString);
  if (!queryString) {
    axios
      .get(
        "https://apis.map.qq.com/ws/place/v1/suggestion/?region=''&keyword=浙二&key=2AHBZ-BPPKP-4UQD4-LYKE2-OHJZE-3BFTU"
      )
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
  }
};
const handleSelect = () => {
  console.log(222);
};
onMounted(() => {
  init();
});
</script>

<style scoped lang="scss">
.container {
  width: 600px;
  height: 500px;
}
</style>
