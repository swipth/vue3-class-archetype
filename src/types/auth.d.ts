export interface UserLoginType {
  userName: string;
  username: string;
  userPwd: string;
  password: string;
  passwordKey: string;
  verifyCode: string;
  verifyCodeKey: string;
  userPhone: string;
  phoneCode: string;
}

export interface CheckPwd {
  oldPwd: string;
  showOldPwd: boolean;
  newPwd: string;
  showNewPwd: boolean;
  confirmPwd: string;
  showConfirmPwd: boolean;
}

export interface UserRegisterType {
  userSource: string;
  userType: number;
  userCode: string;
  userName: string;
  email: string;
  emailCode: number;
  customerName: string;
  passWord: string;
  captchaCode: number;
  captchaId: string;
  region?: string;
}

export interface UserInfoDataType {
  address: string;
  city: string;
  country: string;
  customerId: string;
  customerName: string;
  district: string;
  email: string;
  firstName: string;
  id: string;
  jobTitle: string;
  lastName: string;
  mobile: string;
  pinYinUserName: string;
  province: string;
  telephone: string;
  telephoneArea: string;
  userCode: string;
  userName: string;
  userSource: string;
  zipCode: string;
  isDone: number;
  status: number;
  useStatus: number;
  userType: number;
  lastLogin: {
    createDate: string;
    ipAddress: string;
    urlAddress: string;
    urlReferrer: string;
    userId: string;
  };
}
