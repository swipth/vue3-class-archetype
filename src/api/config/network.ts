/**
 * @description 导出网络配置
 **/

export const networkKey: {
  contentType: string;
  contentJsonType: string;
  requestTimeout: number;
  messageName: string;
  statusName: string;
  successName: string;
  successCode: (string | number)[];
  dataName: string;
  noShowApiMessage: string[];
  loginPath: string;
  messageDuration:number;
  defaultLogoutTime:number
} = {
  // 网络传输类型
  contentType: "application/x-www-form-urlencoded;charset=UTF-8",
  contentJsonType: "application/json;charset=UTF-8",
  // 最长请求时间 30s
  requestTimeout: 30000,
  // 状态信息的字段名称
  messageName: "message",
  // 数据状态的字段名称
  statusName: "code",
  // 状态名称
  successName: "success",
  // 操作正常code，支持String、Array、int多种类型
  successCode: [200, 0, "200", "0"],
  // 数据字段名称
  dataName: "data",
  // 后台哪些api接口不走消息提示
  noShowApiMessage: [],
  // 登录地址
  loginPath:"/auth/login",
  // 消息框消失时间
  messageDuration:3000,
  // 用户静默退出时间
  defaultLogoutTime:2 * 60 * 60 * 1000
}

