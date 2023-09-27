<!--
 * @Author: swipth
 * @Description:501
-->
<template>
  <div class="box">
    <img src="@/assets/images/exception/501.png" alt="" width="488" height="200" />
    <div class="title">页面尚未实现</div>
    <div class="subTitle">服务器无法完成请求，请尝试重新加载页面！</div>
    <div class="btn" @click="toHome">返回主页</div>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import { Vue } from "vue-property-decorator";
@Component({
  components: {},
})
export default class Page501 extends Vue {
  toHome() {
    this.$router.replace("/");
  }
}
</script>

<style scoped lang="less">
@import "./style/exception.less";
</style>
