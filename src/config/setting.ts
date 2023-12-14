import {getLanguage} from "@/config/clientStorage";

export const companyInfoKey = {
  companyName: "南京药石科技股份有限公司",
  TELEPHONE_NUMBER_CHINA: "400 025 5188",
  TELEPHONE_NUMBER_US: "1-877 878 5226",
  EMAIL_CHINA: "sales_china@pharmablock.com",
  EMAIL_US: "salesusa@pharmablock.com",
  officeWebsite: "https://www.pharmablock.com"
}

export const projectGlobalKey = {
  systemName: "Pharmablock Product",
  // 标题分隔符
  titleSeparator: "-",
  // 标题是否反转  如果为false: "page - title"  如果为ture : "title - page"
  titleReverse: false,
  // 加载时显示文字
  loadingText: getLanguage() === "zh" ? "正在加载中..." : "Loading...",
  // 在哪些环境下显示高亮错误 ['development', 'production']
  errorEnv: "development",

}
