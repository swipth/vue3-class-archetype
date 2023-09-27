export interface AjaxRes {
  code: number;
  data: any | null;
  result?: any | null;
  success: boolean;
  timestamp: string;
  message: string;
}

export interface UserListType {
  id: string;
  isAdmin: number;
  status: number;
  userCode: string;
  userName: string;
  userPwd: string;
}
export interface GatwayListType {
  id: string;
  uId: string;
  appCode: string;
  appName: string;
  appSecret: string;
  appMemo: string;
  enableMail: boolean;
  enableSMS: boolean;
  enableWechat: boolean;
  enableWecom: boolean;
  fromEmail: string;
  smtp: string;
  port: string;
  fromName: string;
  fromPwd: string;
  smsId: string;
  smsSignId: string;
  wechatId: string;
  wecomId: string;
  enableWarn: true;
  warnUser: string;
  warnPhone: string;
  warnMail: string;
  warnCorpwechatId: string;
}
export interface WechatListType {
  id: string;
  wechatName: string;
  wechatType: string;
  appId: string;
  appSecret: string;
  agentId: string;
}
export interface SmsListType {
  id: "";
  supplierName: string;
  smscode: string;
  key: string;
  secret: string;
  endpoint: string;
}
export interface EmailTemplateListType {
  id: string;
  templateName: string;
  uId: string;
  templateCode: string;
  templateType: string;
  templateContent: string;
}
export interface SmsTemplateListType {
  id: string;
  remark: string;
  smsId: string;
  status: number;
  templateCode: string;
  templateContent: string;
  templateName: string;
  templateStatus: string;
  templateType: number;
}
export interface MessageListType {
  appId: string;
  email: { to: string; cc: string; bcc: string; templatecode: string; title: string };
  id: string;
  sms: { to: string; sign: string; content: string; templatecode: string };
  status: number;
  wechat: { to: string; templatecode: string; content: string };
  corpwechat: { to: string; content: string };
  _COMWECHAT: { code: number; msg: string; receiptId: string; channel: number };
  _EMAIL: { code: number; msg: string; receiptId: string; channel: number };
  _SMS: { code: number; msg: string; receiptId: string; channel: number };
  _WECHAT: { code: number; msg: string; receiptId: string; channel: number };
  _COMWECHAT: { code: number; msg: string; receiptId: string; channel: number };
}

