import {ajax} from "@/api/ajax";

export const checkVersion = () => ajax({ url: process.env.VUE_APP_BASE_URL + "static/version.json", method: "GET", baseURL: "/" });
