<!--
 * @Author: swipth
 * @Description:
-->
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import {
  MenuFoldOutlined,
  DesktopOutlined,
  MenuUnfoldOutlined,
  CalendarOutlined,
  UserOutlined,
  BarsOutlined,
  ProfileOutlined,
} from "@ant-design/icons-vue";

@Options({
  components: {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    DesktopOutlined,
    CalendarOutlined,
    UserOutlined,
    BarsOutlined,
    ProfileOutlined,
  },
})
export default class AdminLayout extends Vue {
  collapsed = false;
  selectedKeys = ["/workbench"];

  menuClick(item: { key: string }) {
    this.$router.push(item.key);
  }
}
</script>

<template>
  <a-layout class="container">
    <a-layout-sider
      v-model:collapsed="collapsed"
      :trigger="null"
      collapsible
      style="background: #fff"
    >
      <div class="logo">
        <img
          v-if="!collapsed"
          src="../assets/images/logo/logo_admin.png"
          width="200"
          height="60"
        />
        <img
          v-else
          src="../assets/images/logo/logo.png"
          width="50"
          height="50"
        />
      </div>
      <a-menu
        v-model:selectedKeys="selectedKeys"
        theme="light"
        mode="inline"
        @click="menuClick"
      >
        <a-menu-item key="/workbench">
          <DesktopOutlined />
          <span>工作台</span>
        </a-menu-item>
        <a-menu-item key="/dictionaryType">
          <BarsOutlined />
          <span>数据字典(大类)</span>
        </a-menu-item>
        <a-menu-item key="/dictionary">
          <ProfileOutlined />
          <span>数据字典</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: rgb(63, 76, 147); padding-left: 16px">
        <MenuUnfoldOutlined
          :style="{ color: '#ffffff', fontSize: '18px' }"
          v-if="collapsed"
          @click="() => (collapsed = !collapsed)"
        />
        <MenuFoldOutlined
          v-else
          :style="{ color: '#ffffff', fontSize: '18px' }"
          @click="() => (collapsed = !collapsed)"
        />
      </a-layout-header>
      <a-layout-content
        :style="{
          margin: '8px',
          padding: '5px',
          background: '#fff',
          minHeight: '280px',
          maxHeight: '850px'
        }"
      >
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style scoped lang="less">
.container {
  min-height: 100vh;
}

.logo {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
