<!--
 * @Author: swipth
 * @Description:管理后台
-->
<template>
  <div>
    <router-view/>
  </div>
</template>

<script lang="ts">
import {Vue, Options} from "vue-class-component";

@Options({
  name: "Admin"
})
export default class Admin extends Vue {
}
</script>

<style scoped lang="less">

</style>
