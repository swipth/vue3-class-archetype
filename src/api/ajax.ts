import "nprogress/nprogress.css";
import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from "axios";
import axiosRetry from "axios-retry";
import NProgress from "nprogress"; // Progress 进度条
import {networkKey} from "@/api/config/network";
import {AjaxRes} from "@/types/common/apiResponse";
import {handleAxiosResponseAction} from "@/api/tip";

NProgress.configure({showSpinner: false});

//* ************************axios配置  拦截器*****************************//
axios.defaults.baseURL = process.env.VUE_APP_BASE_API;
// 前端超时限制
axios.defaults.timeout = networkKey.requestTimeout;
// @ts-ignore
axios.defaults.headers["Content-Type"] = networkKey.contentType;

// http请求拦截器
axios.interceptors.request.use(
  (config) => {
    NProgress.start();
    if (handleAxiosResponseAction.getToken()) {
      config.headers![networkKey.Authorization] = handleAxiosResponseAction.getToken();
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
    NProgress.done(); // 结束Progress
    handleAxiosResponseAction.handelServiceResponse(response)
    return response;
  },
  (error: AxiosError) => {
    NProgress.done(); // 结束Progress
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
