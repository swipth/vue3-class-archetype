/**
 * @description 导出网络配置
 **/

export const networkKey = {
  // 网络传输类型 // form-data 一般配合qs
  contentType: "application/x-www-form-urlencoded;charset=UTF-8",
  // json
  contentJsonType: "application/json;charset=UTF-8",
  // text
  contentTextType: "text/plain;charset=UTF-8",
  // form-data  一般用于含有二进制文件上传
  contentMultipartFormType: "multipart/form-data;charset=UTF-8",
  // form-data  上传
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
  noShowApiMessage: [""],
  // 后台登录接口
  loginInterfacePath: "/auth/login",
  // 刷新token接口
  refreshTokenInterfacePath: "/api/admin/auth/refresh",
  // 登录地址
  loginPath: "/auth/login",
  // 服务端响应头返回token字段名称
  InterfaceToken: "InterfaceToken",
  // 请求头令牌字段
  Authorization: "Authorization",
  // 消息框消失时间
  messageDuration: 3000,
  // 用户静默退出时间
  defaultLogoutTime: 2 * 60 * 60 * 1000,
  auth: undefined
}

