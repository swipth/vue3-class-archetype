import {
  getDictionaryData,
  getDictionaryTypeData,
} from "@/api/interface/dictionary";
import { DictionaryDataType, DictionaryTypeDataType } from "@/types/common";
import { AjaxRes } from "@/types/common";

interface DefaultStateType {
  dictionaryTypeTreeList: DictionaryTypeDataType[];
  dictionaryTypeList: DictionaryTypeDataType[];
  dictionaryList: DictionaryDataType[];
}

export default {
  namespaced: true,
  state: {
    dictionaryTypeTreeList: [],
    dictionaryTypeList: [],
    dictionaryList: [],
  },
  mutations: {
    setDictionaryTypeList(
      state: DefaultStateType,
      data: DictionaryTypeDataType[]
    ) {
      state.dictionaryTypeTreeList = data;
      const subDictionaryType = data.find(
        (item: DictionaryTypeDataType) => item.code === "OfficeWebsite"
      );
      if (subDictionaryType) {
        state.dictionaryTypeList = subDictionaryType.children;
      }
    },
    setDictionaryList(state: DefaultStateType, data: DictionaryDataType[]) {
      state.dictionaryList = data.map((item: DictionaryDataType) => ({
        ...item,
        value: Number(item.value),
      }));
    },
  },
  actions: {
    getDictionaryTypeAction({ commit }: any) {
      getDictionaryTypeData().then((res: AjaxRes) => {
        if (res.success) {
          commit(
            "setDictionaryTypeList",
            (res && res.data && res.data.list) || []
          );
        }
      });
    },
    getDictionaryAction({ commit }: any) {
      getDictionaryData({ pageIndex: 1, pageSize: 1000 }).then(
        (res: AjaxRes) => {
          if (res.success) {
            commit(
              "setDictionaryList",
              (res && res.data && res.data.list) || []
            );
          }
        }
      );
    },
  },
};
