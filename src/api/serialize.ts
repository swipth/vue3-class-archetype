import qs from "qs";

/**
 * 数据是否进行序列化转换
 * @param paramsSerialization 是否进行序列化
 * @param data 数据
 * @returns {*}
 */
export const paramsSerialize = (paramsSerialization: boolean, data: Record<string, unknown>) => (paramsSerialization ? qs.stringify(data) : data);
