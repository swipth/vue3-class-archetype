<!--
 * @Author: swipth
 * @Description:工作台
-->
<template>
  <div>
    <div class="nav">
      <h2 class="title">工作台</h2>
      <div class="header-content">
        <div class="header-content-item1">
          <img src="https://img01.pharmablock.com/images/pwp/userCenter/info.png" alt="" />
        </div>
        <div class="header-content-item2">
          <p>您好，{{username||"管理员"}}，祝你开心每一天！</p>
          <p>市场部</p>
        </div>
        <div class="header-content-item3">
          <div>
            <p class="statistic-title">用户</p>
            <p class="statistic-value">{{ customerCount||520 }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  name: "Workbench"
})
export default class Workbench extends Vue {
  username=""
  customerCount=0
}
</script>

<style scoped lang="less">
.nav {
  width: 100%;
  height: 100px;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 20px;

  .dashboard-a {
    color: rgb(0 0 0 / 45%);
  }
  .header-content {
    display: flex;

    .header-content-item1 {
      width: 80px;
      text-align: center;
      img{
        width: 100%;
      }
    }

    .header-content-item2 {
      padding-left: 20px;
      width: calc(100% - 230px);
      display: flex;
      flex-direction: column;
      justify-content: center;

      p {
        &:first-child {
          color: #000;
          margin-bottom: 5px;
        }

        &:last-child {
          margin-bottom: 0;
          font-size: 12px;
        }
      }
    }

    .header-content-item3 {
      width: 250px;
      text-align: center;
      display: flex;
      justify-content: space-around;
      position: relative;

      .statistic-title {
        color: #000;
        font-size: 14px;
        margin-bottom: 5px;
      }

      .statistic-value {
        color: rgb(0 0 0 / 85%);
        font-size: 18px;
        margin-bottom: 0;
      }
    }
  }
}
</style>
