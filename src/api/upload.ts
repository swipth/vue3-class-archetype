import {Modal} from "ant-design-vue";
import axios, {AxiosError, AxiosResponse, Method} from "axios";
import NProgress from "nprogress";

let modal: any;
export const ajaxUpload = ({url, file, method = "PUT", params, data}: { url: string, file: File, params: Record<string, any>, data: Record<string, any>, method: Method }) => {
  const formData = new FormData();
  formData.append("file", file);
  Object.keys((key: string) => {
    formData.append("key", data[key]);
  })
  return new Promise((resolve, reject) => {
    NProgress.start();
    if (file.size > 10 * 1024 * 1024) modal = Modal.info({title: "File Upload", content: "Starting Upload", centered: true, okText: "Close"});
    axios({
      url, method, params, data: formData, timeout: 120000, headers: {"Content-Type": "multipart/form-data"}, onUploadProgress(e: any) {
        if (e.lengthComputable) {
          if (file.size > 10 * 1024 * 1024) modal.update({content: "Current Progress ：" + ((e.loaded / e.total) * 100).toFixed(2) + "%"});
          if (e.loaded === e.total) {
            NProgress.set(e.loaded / e.total);
            Modal.destroyAll();
          }
        }
      },
    }).then((response: AxiosResponse) => {
      resolve(response.data);
    }).catch((err: AxiosError) => {
      NProgress.done();
      Modal.destroyAll();
      reject(err);
      Modal.error({content: "Upload Error", centered: true});
    });
  });
};
