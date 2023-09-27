import { RouteMeta } from "vue-router";

import { titleReverse, titleSeparator } from "@/config/setting";
import { getLanguage } from "@/utils/clientStorage";

/**
 * @description 设置标题
 * @returns {string}
 * @param meta
 */
export default function setPageTitle(meta: RouteMeta): string {
  const language = getLanguage();
  const pageTitle = language === "zh" ? meta.title : meta.englishTitle;
  let newTitles = ["PharmaBlock"];
  if (pageTitle) newTitles.unshift(pageTitle as string);
  if (titleReverse) newTitles = newTitles.reverse();
  return newTitles.join(titleSeparator);
}
