/**
 * @description 导出网络配置
 **/
export const contentType = "application/x-www-form-urlencoded;charset=UTF-8";

// 最长请求时间 30s
export const requestTimeout = 30000;

// 状态名称
export const successName = "success";

// 操作正常code，支持String、Array、int多种类型
export const successCode = [200, 0, "200", "0"];

// 数据状态的字段名称
export const statusName = "code";

// 状态信息的字段名称
export const messageName = "message";

// 数据字段名称
export const dataName = "data";
