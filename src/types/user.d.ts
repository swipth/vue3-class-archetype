export interface UserType {
  phone: string;
  email: string;
  key: string;
  code: string;
  newPwd: string;
  oldPwd: string;
  address: string;
  district: string;
  city: string;
  country: string;
  customerCountry: string;
  customerDiscount: number;
  customerId: string;
  firstName: string;
  isAllowViewAll: number;
  isAsianDealer: number;
  isCreditAccount: number;
  isFreeTax: number;
  isInStockFirst: number;
  jobTitle: string;
  lastModifyUser: string;
  lastName: string;
  mobile: string;
  province: string;
  status: number;
  telephone: string;
  telephoneAre: string;
  userSource: string;
  userType: number;
  useStatus: number;
  websiteDiscount: number;
  zipCode: string;
  currentPage: number;
  pageSize: number;
  id: number;
  addressSource: string;
  addressType: number;
  createUser: string;
  isDefault: number;
  isSync: number;
  receiver: string;
  remark: string;
  syncReason: string;
  telephoneArea: string;
  userId: number;
  accountCode: string;
  accountExt: string;
  accountTel: string;
  carrierCompany: string;
  cardCvc: string;
  cardHolder: string;
  cardMonth: string;
  cardNum: string;
  cardYear: string;
  ipAddress: string;
  macAddress: string;
  pageUrl: string;
  productId: number;
  userCode: string;
  userName: string;
  emailCode: number;
  customerName: string;
  passWord: string;
  captchaCode: number;
  captchaId: string;
  region: string;
  filter: any;
}
export interface BindType {
  phone?: string;
  email?: string;
  code: string;
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

export interface CustomerDataType {
  axRate: number;
  byRateLess500: number;
  // eslint-disable-next-line camelcase
  byRateLess500_BackOrder: number;
  byRatemore500: number;
  // eslint-disable-next-line camelcase
  byRatemore500_BackOrder: number;
  customerId: number;
  czRate: number;
  discount: number;
  isCreditAccount: number;
  id: number;
  isFreeTax: number;
  status: number;
  webDiscount: number;
  country: string;
  customerCode: string;
  region: string;
  freeTaxPlaces: string;
  customerName: string;
  isDealer: boolean;
}
