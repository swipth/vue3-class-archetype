<!--
 * @Author: swipth
 * @Description:分页组件外包装
-->
<template>
  <div class="pagination-footer">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "PaginationFooter"
})
export default class PaginationFooter extends Vue {
}
</script>

<style scoped lang="scss">
.pagination-footer {
  padding: 6px 0;
  background-color: #f9f9f9;
  border: 1px solid #ebeef5;
  border-top: none;
  display: flex;
  flex-direction: row-reverse;
}
</style>
