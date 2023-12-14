import Moment from "moment";

// 获取最近几天
function getRecentDay(num: number) {
  return Moment(new Date()).subtract(num, "days").format("YYYY-MM-DD");
}
// 获取最近几个月
function getRecentMonth(num: number) {
  return Moment(new Date()).subtract(num, "months").format("YYYY-MM-DD");
}

// 当天
export const CurrentDate = Moment(new Date()).format("YYYY-MM-DD");
// 最近7天
export const RecentDay = getRecentDay(7);
// 最近一个月
export const RecentOneMonth = getRecentMonth(1);
// 最近3个月
export const RecentThreeMonth = getRecentMonth(3);
