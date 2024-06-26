import { TranslateResult } from "vue-i18n";

import { AddressType } from "./apiResponse";
export interface TitleType {
  title: string | TranslateResult;
  id: string | number;
  imgUrl: string;
  activeUrl: string;
  width: string;
  className: string;
  subTitle: string | TranslateResult;
  type: number;
  addressData: Partial<AddressType>;
}
export interface UserMenuType {
  title: string | TranslateResult;
  id: string;
  imgUrl?: string;
  activeUrl?: string;
  width?: string;
  className?: string;
  subTitle?: string | TranslateResult;
  type?: number;
}
export interface TabTitleType {
  title: string | TranslateResult;
  id: string | number;
  imgUrl?: string;
  activeUrl?: string;
  width?: string;
  className?: string;
  subTitle?: string | TranslateResult;
}
