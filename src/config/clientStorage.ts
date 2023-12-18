// 本地化存储的KEY 需要大写
const localStorageKey = {
  tokenKey: "ACCESS_TOKEN_{{key}}".toLocaleUpperCase(),
  // 语言 en 英文 zh 中文
  defaultLanguage: navigator.language === "zh-CN" ? "zh" : "en",
  languageKey: "LOCAL_LANGUAGE",
  websiteKey: "LOCAL_WEBSITE",
  defaultWebsite: "cn",
  ErrorModalNumber:"ERROR_MODAL_NUMBER"
}

export const getLanguage = () => window.$wujie?.props?.language || localStorageKey.defaultLanguage;

export const getToken = () => window.$wujie?.props?.token
