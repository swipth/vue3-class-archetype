import en from "./en";
import zh from "./zh";
import {createI18n} from "vue-i18n";
import {getLanguage} from "@/config/clientStorage";
import {App} from "vue";

const lang = getLanguage();
const messages = {
  en: {
    ...en
  },
  zh: {
    ...zh
  }
};
const i18n = createI18n({
  locale: lang,
  messages
});

/**
 * 国际化翻译
 * @param title
 */
export function translateTitle(title: string) {
  const {t, te} = i18n.global;
  if (te(`${title}`)) return t(`${title}`);
  return title;
}

export function setupI18n(app: App) {
  app.use(i18n);
  app.config.globalProperties.translateTitle = translateTitle;
}

export default i18n;
