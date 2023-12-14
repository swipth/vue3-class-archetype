import {message, Modal} from "ant-design-vue";
import {TranslateResult} from "vue-i18n";

export const showMessage = (content: string, type = "error") => {
  if (type == "error")
    message.error(content)
  message.success(content)
}

export const showErrorModal = (content: string | TranslateResult) => {
  Modal.error({content, centered: true, title: "Error",})
}

export const showInfoModal = (config: { title: string; content: string, okText: string }) => {
  return Modal.info({content: config, centered: true, title: config.title, okText: config.okText})
}
