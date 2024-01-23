import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from "axios";
import axiosRetry from "axios-retry";
import {networkKey} from "@/api/config/network";
import {handleAxiosResponseAction} from "@/api/tip";
// 接口返回
export interface AjaxRes {
  code: number;
  data: any | null;
  result?: any | null;
  success: boolean;
  timestamp: string;
  message: string;
}

//* ************************axios配置  拦截器*****************************//
axios.defaults.baseURL = process.env.VUE_APP_BASE_API;
// 前端超时限制
axios.defaults.timeout = networkKey.requestTimeout;
axios.defaults.headers["Content-Type"] = networkKey.contentType;
// http请求拦截器
axios.interceptors.request.use(
  (config) => {
    if (handleAxiosResponseAction.getToken()) {
      config.headers![networkKey.Authorization] = handleAxiosResponseAction.getToken();
    }
    // 去除传递参数空格操作
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
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);
// http响应拦截器
axios.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.headers["InterfaceToken"] && response.config.url !== networkKey.loginInterfacePath) {
      handleAxiosResponseAction.setToken(response.headers["InterfaceToken"])
    }
    handleAxiosResponseAction.handelServiceResponse(response)
    return response;
  },
  (error: AxiosError) => {
    handleAxiosResponseAction.handleStatusError(error.response)
    return Promise.reject(error);
  }
);
//* ************************axios配置  拦截器*****************************//
// const params = new URLSearchParams();
// params.append('param1', 'value1');
// params.append('param2', 'value2');
axiosRetry(axios, {
  retries: 3,
  retryDelay: (retryCount: number) => {
    return retryCount * 1500; // 重复请求延迟(毫秒)
  },
  shouldResetTimeout: true, //  重置超时时间
  retryCondition: (error: AxiosError) => {
    //true为打开自动发送请求，false为关闭自动发送请求
    return error.message.includes("timeout") || error.message.includes("Network Error");
  },
});
/**
 *  封装 axios 自定义请求
 * @param url
 * @param Method
 * @param params
 * @param data
 */
export const ajax = ({url, method = "GET", params = {}, data = {}, baseURL = undefined, headers = {}, responseType = "json"}: AxiosRequestConfig): Promise<AjaxRes> => {
  return new Promise((resolve, reject) => {
    axios({
      url,
      method,
      params,
      baseURL,
      headers,
      data,
      withCredentials: true,
      auth: networkKey.auth,//basic认证和bearer认证二选一
      responseType, // default json  options are: 'arraybuffer', 'document', 'json', 'text', 'stream'  browser only: 'blob'
      validateStatus: function (status: number) {
        return status >= 200 && status < 300; // default
      },
    })
      .then((response: AxiosResponse) => {
        resolve(response.data);
      })
      .catch((error: AxiosError) => {
        // 错误信息reject出去 在catch中接受
        reject(error.response);
      });
  });
};
