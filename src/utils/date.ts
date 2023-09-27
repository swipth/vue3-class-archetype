import Moment from "moment";

function getRecentDay(num: number) {
  return Moment(new Date()).subtract(num, "days").format("YYYY-MM-DD");
}
function getRecentMonth(num: number) {
  return Moment(new Date()).subtract(num, "months").format("YYYY-MM-DD");
}
export const CurrentDate = Moment(new Date()).format("YYYY-MM-DD");
export const RecentDay = getRecentDay(7);
export const RecentOneMonth = getRecentMonth(1);
export const RecentThreeMonth = getRecentMonth(3);
