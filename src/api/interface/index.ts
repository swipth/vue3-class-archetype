import { ajax } from "@/api/ajax";
import { paramsSerialize } from "@/api/serialize";
import { AjaxRes } from "@/types/common";

export const ajaxGet = (url: string, params = {}): Promise<AjaxRes> => ajax({ method: "get", url, params });

export const ajaxDelete = (url: string, params = {}, data = {}): Promise<AjaxRes> => ajax({ method: "delete", url, params, data });

export const ajaxPost = (url: string, params = {}, data = {}, paramsSerialization = false): Promise<AjaxRes> =>
  ajax({
    method: "post",
    url,
    params,
    data: paramsSerialize(paramsSerialization, data),
    headers: {
      "Content-Type": paramsSerialization ? "application/x-www-form-urlencoded;charset=UTF-8" : "application/json;charset=UTF-8",
    },
  });

export const ajaxPut = (url: string, data = {}, paramsSerialization = false, params = {}): Promise<AjaxRes> =>
  ajax({
    method: "put",
    url,
    params,
    data: paramsSerialize(paramsSerialization, data),
    headers: {
      "Content-Type": paramsSerialization ? "application/x-www-form-urlencoded;charset=UTF-8" : "application/json;charset=UTF-8",
    },
  });

export const ajaxPatch = (url: string, data = {}, paramsSerialization = false, params = {}): Promise<AjaxRes> =>
  ajax({
    method: "patch",
    url,
    params,
    data: paramsSerialize(paramsSerialization, data),
    headers: {
      "Content-Type": paramsSerialization ? "application/x-www-form-urlencoded;charset=UTF-8" : "application/json;charset=UTF-8",
    },
  });
