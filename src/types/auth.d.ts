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
