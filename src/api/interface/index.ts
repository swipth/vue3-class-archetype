import { ajax } from "@/api/ajax";
import { paramsSerialize } from "@/api/serialize";
import { AjaxRes } from "@/types/common";
import {networkKey} from "@/api/config/network";

export const ajaxGet = (url: string, params = {}): Promise<AjaxRes> => ajax({ method: "get", url, params });

export const ajaxDelete = (url: string, params = {}, data = {}): Promise<AjaxRes> => ajax({ method: "delete", url, params, data });

export const ajaxPost = (url: string,  data = {}, paramsSerialization = false,params = {}): Promise<AjaxRes> =>
  ajax({
    method: "post",
    url,
    params,
    data: paramsSerialize(paramsSerialization, data),
    headers: {
      "Content-Type": paramsSerialization ? networkKey.contentType : networkKey.contentJsonType,
    },
  });

export const ajaxPut = (url: string, data = {}, paramsSerialization = false, params = {}): Promise<AjaxRes> =>
  ajax({
    method: "put",
    url,
    params,
    data: paramsSerialize(paramsSerialization, data),
    headers: {
      "Content-Type": paramsSerialization ? networkKey.contentType : networkKey.contentJsonType,
    },
  });

export const ajaxPatch = (url: string, data = {}, paramsSerialization = false, params = {}): Promise<AjaxRes> =>
  ajax({
    method: "patch",
    url,
    params,
    data: paramsSerialize(paramsSerialization, data),
    headers: {
      "Content-Type": paramsSerialization ? networkKey.contentType : networkKey.contentJsonType,
    },
  });
