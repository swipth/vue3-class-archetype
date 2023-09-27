import Vue from "vue";
import VueI18n from "vue-i18n";

import { getLanguage } from "@/utils/clientStorage";

import messages from "./messages";

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: getLanguage(),
  messages,
  silentTranslationWarn: true,
});

export default i18n;
