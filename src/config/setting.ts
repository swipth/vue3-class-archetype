// 公司名称
export const companyName = "南京药石科技股份有限公司";

// 项目名称 整体配置
export const systemName = "药石产品网站";

// 标题分隔符
export const titleSeparator = " - ";

// 标题是否反转  如果为false: "page - title"  如果为ture : "title - page"
export const titleReverse = false;

// 加载时显示文字
export const loadingText = "正在加载中...";

// 消息框消失时间
export const messageDuration = 3000;

// 在哪些环境下显示高亮错误 ['development', 'production']
export const errorEnv = "development";

export const officeWebsite = "https://www.pharmablock.com";

// 项目key
export const apikey = "{{key}}_admin";

// 令牌信息
export const tokenName = apikey + "_token";

// 语言 en 英文 zh 中文
export const defaultLanguage = navigator.language === "zh-CN" ? "zh" : "en";

// 语言key
export const languageName = "language";

// 默认站点
export const defaultWebsite = "cn";

// 站点key
export const websiteName = "site";

// 用户静默退出时间
export const defaultLogoutTime = 2 * 60 * 60 * 1000;

//联系电话和邮箱
export const TELEPHONE_NUMBER_CHINA = "400 025 5188";

export const TELEPHONE_NUMBER_US = "1-877 878 5226";

export const EMAIL_CHINA = "sales_china@pharmablock.com";

export const EMAIL_US = "salesusa@pharmablock.com";

// 是否打开版本更新弹框提示给用户
export const showVersionModal = false;
// 控制哪些接口不走统一消息提醒
export const noShowApiMessage = ["/api/base/v1/simplelogin", "/api/base/v1/phonelogin", "/api/base/v1/user/register"];
