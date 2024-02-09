import { ref, onMounted } from "vue";

export function useBrowserDetection() {
  const isFirefox = ref(false);

  const detectBrowser = () => {
    if (window.navigator.userAgent.indexOf("Firefox") !== -1) {
      isFirefox.value = true;
    }
  };

  onMounted(() => {
    detectBrowser();
  });

  return { isFirefox };
}
