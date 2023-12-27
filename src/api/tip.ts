import {message, Modal} from "ant-design-vue";
import {TranslateResult} from "vue-i18n";
import store from "@/store";
import router from "@/router";
import {networkKey} from "@/api/config/network";
import {AxiosResponse} from "axios";
import {clearToken, getToken, setLoginToken} from "@/config/clientStorage";

export const handleAxiosResponseAction = {
  // 获取登录令牌
  getToken: (): string => getToken(),
  clearToken: (): void => clearToken(),
  setToken: (token:string): void => setLoginToken(token),
  /**
   * 处理接口服务器自动以返回消息提示
   * @param response
   */
  handelServiceResponse: (response: AxiosResponse) => {
    switch (response.data[networkKey.statusName]) {
      case 500:
        // @ts-ignore
        !networkKey.noShowApiMessage.includes(response.config.url as string) && this.showErrorModal(response.data[networkKey.messageName] || "Interface Error");
        break;
      default:
        if (response.data[networkKey.messageName] && response.data[networkKey.successName] && !response.data[networkKey.dataName]) {
          // @ts-ignore
          this.showMessage(response.data[networkKey.messageName] || "Action Success", "success");
        }
        if (response.data[networkKey.messageName] && !response.data[networkKey.successName] && !response.data[networkKey.dataName]) {
          // @ts-ignore
          this.showErrorModal(response.data[networkKey.messageName] || "Interface Error");
        }
        break;
    }
  },
  /**
   * 消息提示
   * @param content
   * @param type
   */
  showMessage: (content: string, type = "error") => {
    if (type == "success")
      return message.success(content)
    else if (type == "warn")
      return message.warning(content)
    else
      return message.error(content)
  },
  /**
   * 消息弹窗
   * @param content
   */
  showErrorModal: (content: string | TranslateResult) => {
    Modal.error({content, centered: true, title: "Error",})
  },
  /**
   * 处理异常响应错误
   * @param response
   */
  handleStatusError: (response: AxiosResponse<unknown, any> | undefined) => {
    if (response) {
      let message = ""
      const {status} = response
      switch (status) {
        case 302:
          message = "Interface redirection";
          break;
        case 400:
          message = "The parameter is incorrect";
          break;
        case 401:
          message = "Authentication failed";
          store.commit("user/logout");
          router
            .push({
              path: networkKey.loginPath
            })
            .then(() => {
            });
          break;
        case 403:
          message = "No Permission";
          break;
        case 404:
          message = "Url Error：" + response.config.url;
          break;
        case 405:
          message = "Request Method Not Allowed"
          break;
        case 408:
          message = "Request Timeout ";
          break;
        case 409:
          message = "The same data already exists in the system";
          break;
        case 415:
          message = "Unsupported Media Type";
          break;
        case 500:
          message = "Internal Interface Error";
          router.push("/500").then(() => {
          });
          break;
        case 501:
          message = "Internal Interface Not implemented";
          router.push("/501").then(() => {
          });
          break;
        case 502:
          message = "Gateway error";
          break;
        case 503:
          message = "Service is unavailable";
          break;
        case 504:
          message = "The service is temporarily unaccessible, please try again later";
          break;
        case 505:
          message = "The HTTP version is not supported";
          break;
        default:
          message = "Abnormal problems, please contact the webmaster";
          break;
      }
      return message;
    }
  }
}
