import { RouteMeta } from "vue-router";

import { getLanguage } from "@/config/clientStorage";
import {projectGlobalKey} from "@/config/setting";

/**
 * @description 设置标题
 * @returns {string}
 * @param meta
 */
export default function setPageTitle(meta: RouteMeta): string {
  const language = getLanguage();
  const pageTitle = language === "zh" ? meta.title : meta.englishTitle;
  let newTitles = ["PharmaBlock"];
  if (pageTitle) newTitles.unshift(pageTitle);
  if (projectGlobalKey.titleReverse) newTitles = newTitles.reverse();
  return newTitles.join(projectGlobalKey.titleSeparator);
}
