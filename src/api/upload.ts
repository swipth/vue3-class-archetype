/**
 * @Author: swipth
 * @Description: 自定义文件上传
 * 下载请求示例  默认post请求 参照此示例 不要在组件中直接调用  ajaxUpload
 *  const uploadFile =()=>ajaxUpload("/api/vi/upload",{name:"zs},{})
 */
import { Modal } from "ant-design-vue";
import axios, { AxiosError, AxiosResponse, Method } from "axios";
import NProgress from "nprogress";
import i18n from "@/locales/i18n";
import { ModalConfirm } from "ant-design-vue/types/modal";

let modal: ModalConfirm;
/**
 * 自定义上传
 * @param url
 * @param file
 * @param method
 */
export const ajaxUpload = (url: string, file: File, method: Method = "PUT") => {
  //单个图片上传
  const formData = new FormData();
  formData.append("file", file);
  return new Promise((resolve, reject) => {
    NProgress.start();
    if (file.size > 10 * 1024 * 1024) modal = Modal.info({ title: i18n.t("文件上传"), content: i18n.t("开始上传"), centered: true, okText: i18n.t("关闭") as string });
    axios({
      url,
      method,
      data: formData,
      timeout: 120000, //上传大文件比较耗时需要增加超时时间
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress(e) {
        if (e.lengthComputable) {
          // 文件大小大于10M 显示进度弹窗
          if (file.size > 10 * 1024 * 1024) modal.update({ content: i18n.t("当前文件上传进度") + "：" + ((e.loaded / e.total) * 100).toFixed(2) + "%" });
          if (e.loaded === e.total) {
            NProgress.set(e.loaded / e.total);
            // modal.destroy()
            Modal.destroyAll();
            // message.success(`上传进度完成用时：${e.timeStamp.toFixed(0)/1000}s`)
          }
        }
      },
    })
      .then((response: AxiosResponse) => {
        resolve(response.data);
      })
      .catch((err: AxiosError) => {
        NProgress.done();
        Modal.destroyAll();
        // modal.destroy();
        reject(err);
        Modal.error({ content: i18n.t("文件上传失败"), centered: true });
      });
  });
};

//ProgressEvent.lengthComputable 只读
// 是一个 Boolean 标志，表示底层流程将需要完成的总工作量和已经完成的工作量是否可以计算。换句话说，它告诉我们进度是否可以被测量。
// ProgressEvent.loaded 只读
// 是一个 long 类型数据，表示底层流程已经执行的工作总量。可以用这个属性和 ProgressEvent.total 计算工作完成比例。当使用 HTTP 下载资源，它只表示内容本身的部分，不包括首部和其它开销。
// ProgressEvent.total 只读
// 是一个 long 类型数据，表示正在执行的底层流程的工作总量。当使用 HTTP 下载资源，它只表示内容本身的部分，不包括首部和其它开销。
