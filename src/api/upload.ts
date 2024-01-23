/**
 * @Author: swipth
 * @Description: 自定义文件上传
 * 下载请求示例  默认post请求 参照此示例 不要在组件中直接调用  ajaxUpload
 *  const uploadFile =()=>ajaxUpload("/api/vi/upload",{name:"zs},{})
 */
import {Modal} from "ant-design-vue";
import axios, {AxiosError, AxiosResponse, Method} from "axios";
import NProgress from "nprogress";

let modal: any;
/**
 * 自定义上传
 * @param url
 * @param file
 * @param method
 * @param params
 * @param data
 */
export const ajaxUpload = ({url, file, method = "PUT", params, data}: { url: string, file: File, params: Record<string, any>, data: Record<string, any>, method: Method }) => {
  //单个图片上传
  const formData = new FormData();
  formData.append("file", file);
  Object.keys((key: string) => {
    formData.append("key", data[key]);
  })
  return new Promise((resolve, reject) => {
    NProgress.start();
    if (file.size > 10 * 1024 * 1024) modal = Modal.info({title: "File Upload", content: "Starting Upload", centered: true, okText: "Close"});
    axios({
      url,
      method,
      params,
      data: formData,
      timeout: 120000, //上传大文件比较耗时需要增加超时时间
      headers: {"Content-Type": "multipart/form-data"},
      onUploadProgress(e: any) {
        if (e.lengthComputable) {
          // 文件大小大于10M 显示进度弹窗
          if (file.size > 10 * 1024 * 1024) modal.update({content: "Current Progress ：" + ((e.loaded / e.total) * 100).toFixed(2) + "%"});
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
        Modal.error({content: "Upload Error", centered: true});
      });
  });
};
//ProgressEvent.lengthComputable 只读
// 是一个 Boolean 标志，表示底层流程将需要完成的总工作量和已经完成的工作量是否可以计算。换句话说，它告诉我们进度是否可以被测量。
// ProgressEvent.loaded 只读
// 是一个 long 类型数据，表示底层流程已经执行的工作总量。可以用这个属性和 ProgressEvent.total 计算工作完成比例。当使用 HTTP 下载资源，它只表示内容本身的部分，不包括首部和其它开销。
// ProgressEvent.total 只读
// 是一个 long 类型数据，表示正在执行的底层流程的工作总量。当使用 HTTP 下载资源，它只表示内容本身的部分，不包括首部和其它开销。
