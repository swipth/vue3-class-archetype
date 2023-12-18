import "nprogress/nprogress.css";
import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from "axios";
import axiosRetry from "axios-retry";
import NProgress from "nprogress"; // Progress 进度条
import {networkKey} from "@/api/config/network";
import router from "@/router/index";
import store from "@/store";
import {AjaxRes} from "@/types/common/apiResponse";
import {getToken} from "@/config/clientStorage";
import {showErrorModal, showMessage} from "@/api/tip";

NProgress.configure({showSpinner: false});

//* ************************axios配置  拦截器*****************************//
axios.defaults.baseURL = process.env.VUE_APP_BASE_API;
// 前端超时限制
axios.defaults.timeout = networkKey.requestTimeout;
// @ts-ignore
axios.defaults.headers["Content-Type"] = networkKey.contentType;

// http请求拦截器
axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    NProgress.start();
    if (getToken()) {
      config.headers = {
        Authorization: getToken(),
      };
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
    if (response.headers._token && response.config.url !== "/api/base/v1/simplelogin") {
      store.commit("user/setTokenInfo", response.headers._token);
    }
    NProgress.done(); // 结束Progress
    switch (response.data[networkKey.statusName]) {
      case 401:
        break;
      case 403:
        break;
      case 404:
        showErrorModal(response.data[networkKey.messageName]);
        break;
      case 500:
        !networkKey.noShowApiMessage.includes(response.config.url as string) && showErrorModal(response.data[networkKey.messageName] || "接口发生异常");
        break;
      default:
        if (response.data[networkKey.messageName] && response.data[networkKey.successName] && !response.data[networkKey.dataName]) {
          showMessage(response.data[networkKey.messageName] || "操作成功");
        }
        if (response.data[networkKey.messageName] && !response.data[networkKey.successName] && !response.data[networkKey.dataName]) {
          showErrorModal(response.data[networkKey.messageName] || "接口发生异常");
        }
        break;
    }
    return response;
  },
  (error: AxiosError) => {
    NProgress.done(); // 结束Progress

    if (error.response && error.response.status === 401) {
      store.commit("user/logout");
      router
        .push({
          path: networkKey.loginPath
        })
        .then(() => {
        });
    }
    // 403 无权限
    if (error.response && error.response.status === 403) {
      showMessage(error.response.statusText);
    }
    // 404 请求不存在
    if (error.response && error.response.status === 404) {
      showMessage(error.response.statusText);
    }
    // 405 请求方法不允许
    if (error.response && error.response.status === 405) {
      showMessage(error.response.statusText);
    }
    // 415 Unsupported Media Type co
    if (error.response && error.response.status === 415) {
      showMessage(error.response.statusText);
    }
    //服务器没有能力完成请求
    if (error.response && error.response.status === 501) {
      //跳到 501 页面
      router.push("/501").then(() => {
      });
    }
    if (error.response && [504, 502, 500, 400].includes(error.response.status)) {
      //跳到 500 页面
      router.push("/500").then(() => {
      });
    }
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
