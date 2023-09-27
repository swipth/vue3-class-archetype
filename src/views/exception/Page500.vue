<!--
 * @Author: swipth
 * @Description:500
-->
<template>
  <div class="box">
    <img src="@/assets/images/exception/500.png" alt="" width="488" height="200" />
    <div class="title">服务器错误</div>
    <div class="subTitle">服务器发生异常，正在紧急修复中，请稍后再试！</div>
    <div class="btn" @click="toHome">返回主页</div>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import { Vue } from "vue-property-decorator";
@Component({
  components: {},
})
export default class Page500 extends Vue {
  toHome() {
    this.$router.replace("/");
  }
}
</script>

<style scoped lang="less">
@import "./style/exception.less";
</style>
