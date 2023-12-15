import {ajaxGet, ajaxPost} from "./index";

// 参考示例编写http请求
export const ExampleApi = {
  // 参数名称简洁详细列出参数分界线为4个
  receive: (orderId: string) => ajaxGet("/api/mall/outstock", {orderId}),
  // 以下为超出4个参数显示情况  使用filterParams省略显示 需要做类型控制
  receive2: (filterParams: {name:string;age:number;sex:number;nation:string}) => ajaxPost("/api/mall/outstock", filterParams)
}

