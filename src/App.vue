<template>
  <a-config-provider :locale="locale" componentSize="small" :theme="{
     token: {
        colorPrimary: '#293891',
     },
    }">
    <div :class="{'content':inner}">
      <router-view/>
    </div>
  </a-config-provider>
</template>

<script lang="ts">
import zhCN from "ant-design-vue/es/locale/zh_CN";
import en from "ant-design-vue/es/locale/en_US";
import { Options, Vue } from "vue-class-component";
import { getLanguage } from "@/config/clientStorage";

const lang = getLanguage();
@Options({
  watch: {
    // 在 vue3-sub 路由下主动告知主应用路由跳转，主应用也跳到相应路由高亮菜单栏
    $route: {
      handler() {
        window.$wujie?.bus.$emit("sub-route-change", "{{key}}", this.$route.path);
      },
      immediate: true,
      deep: true,
    },
  },
})
export default class App extends Vue {
  get locale() {
    return lang === "zh" ? zhCN : en;
  }
  mounted() {
    window.$wujie?.bus.$on("{{key}}-router-change", (path: string) =>this.$router.push(path));
  }
  get inner() {
    return window.__POWERED_BY_WUJIE__
  }
}
</script>
<style lang="less" scoped>
.content {
  padding: 5px;
  background: #fff;
}
</style>
