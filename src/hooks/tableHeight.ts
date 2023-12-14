import {onMounted, onUnmounted, ref} from "vue";

/**
 * 固定表格高度
 */
export function useTableHeight(externalHeight = 220) {
  const height = ref(620)
  const setHeight = () => {
    height.value = window.innerHeight - externalHeight;
  }
  const resize = () => {
    window.addEventListener("resize", () => {
      requestAnimationFrame(setHeight);
    });
  }
  onMounted(() => {
    resize()
    setHeight();
  })
  onUnmounted(() => {
    window.removeEventListener("resize", setHeight);
  })
  return {height}
}
