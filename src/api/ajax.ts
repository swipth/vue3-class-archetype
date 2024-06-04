import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from "axios";
import axiosRetry from "axios-retry";
import {networkKey} from "@/api/config/network";
import {handleAxiosResponseAction} from "@/api/tip";
import {AjaxRes} from "@/types/common/apiResponse";

axios.defaults.baseURL = process.env.VUE_APP_BASE_API;
axios.defaults.timeout = networkKey.requestTimeout;
axios.defaults.headers["Content-Type"] = networkKey.contentType;
axios.interceptors.request.use((config) => {
  if (handleAxiosResponseAction.getToken()) {
    config.headers![networkKey.Authorization] = handleAxiosResponseAction.getToken();
  }
  if (config.data && Object.keys(config.data).length > 0) {
    Object.keys(config.data).forEach((item: string) => {
      if (typeof config.data[item] === "string") config.data[item] = config.data[item].trim();
    });
  }
  if (config.params && Object.keys(config.params).length > 0) {
    Object.keys(config.params).forEach((item: string) => {
      if (typeof config.params[item] === "string") config.params[item] = config.params[item].trim();
    });
  }
  return config;
}, (error: AxiosError) => {
  return Promise.reject(error);
});
axios.interceptors.response.use((response: AxiosResponse) => {
  if (response.headers["InterfaceToken"] && response.config.url !== networkKey.loginInterfacePath) {
    handleAxiosResponseAction.setToken(response.headers["InterfaceToken"])
  }
  handleAxiosResponseAction.handelServiceResponse(response)
  return response;
}, (error: AxiosError) => {
  handleAxiosResponseAction.handleStatusError(error.response)
  return Promise.reject(error);
});
axiosRetry(axios, {
  retries: 3, retryDelay: (retryCount: number) => {
    return retryCount * 1500;
  }, shouldResetTimeout: true, retryCondition: (error: AxiosError) => {
    return error.message.includes("timeout") || error.message.includes("Network Error");
  },
});
export const ajax = ({url, method = "GET", params = {}, data = {}, baseURL = undefined, headers = {}, responseType = "json"}: AxiosRequestConfig): Promise<AjaxRes> => {
  return new Promise((resolve, reject) => {
    axios({
      url, method, params, baseURL, headers, data, withCredentials: true, auth: networkKey.auth, responseType, validateStatus: function (status: number) {
        return status >= 200 && status < 300;
      },
    }).then((response: AxiosResponse) => {
      resolve(response.data);
    }).catch((error: AxiosError) => {
      reject(error.response);
    });
  });
};
