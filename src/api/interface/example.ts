import {AjaxRes} from "@/types/common";
import {ajaxGet} from "@/api/interface/index";

// 查询
export const getAwardData = (): Promise<AjaxRes> => ajaxGet("/common/v1/admin/award");
