import Utils from "@/Utils";

// 时间格式化
Vue.filter("formatDate", function(date, format) {
  return Utils.formatDate(date, format);
});

//字符串截取
Vue.filter("addPoint", function(value, length) {
  if (value.length > length) {
    return value.substr(0, length - 1) + "...";
  } else {
    return value;
  }
});

//获取周
Vue.filter("getWeek", function(value, tag) {
  var tt = new Date(value);
  var arr = [
    "星期天",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六"
  ];
  if (tag) {
    arr = ["日", "一", "二", "三", "四", "五", "六"];
  }
  return arr[tt.getDay()];
});

//UNIX时间戳转换为Date
Vue.filter("timestampToDate", function(timestamp) {
  return Utils.timestampToDate(timestamp);
});
//Date换为UNIX时间戳转    2016/04/17
Vue.filter("DateTotimestamp", function(timestamp) {
  var d = new Date(timestamp.replace(/-/g, "/")).getTime() / 1000;
  return d;
});
