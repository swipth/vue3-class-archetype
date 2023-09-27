<!--
 * @Author: swipth
 * @Description:404
-->
<template>
  <div class="box">
    <img src="@/assets/images/exception/404.png" alt="" width="488" height="200" />
    <div class="title">未找到页面</div>
    <div class="subTitle">哎呀，这个页面似乎有些问题。请稍后再试！</div>
    <div class="btn" @click="toHome">返回主页</div>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import { Vue } from "vue-property-decorator";
@Component({
  components: {},
})
export default class Page404 extends Vue {
  toHome() {
    this.$router.replace("/");
  }
}
</script>

<style scoped lang="less">
@import "./style/exception.less";
</style>
