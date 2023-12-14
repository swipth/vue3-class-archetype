const localStorageKey = {
  tokenKey: "{{key}}_admin_token",
  // 语言 en 英文 zh 中文
  defaultLanguage: navigator.language === "zh-CN" ? "zh" : "en",
  languageKey: "language",
  websiteKey: "website",
  defaultWebsite: "cn",
  ErrorModalNumber:"ErrorModalNumber"
}

export const getLanguage = () => window.$wujie?.props?.language || localStorageKey.defaultLanguage;

export const getToken = () => window.$wujie?.props?.token
