/*
 * 配置编译环境和线上环境之间的切换
 * baseUrl: 域名地址
 * routerMode: 路由模式
 */
let baseUrl = "";
let routerMode = "history";
let DEBUG = false;
let cancleHTTP = []; // 取消请求头设置；

console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === "development") {
  baseUrl = "http://x.waiqin.co/api/";
  DEBUG = true;
} else if (process.env.NODE_ENV === "production") {
  baseUrl = "http://x.waiqin.co/api/";
  DEBUG = false;
} else if (process.env.NODE_ENV === "testing") {
  baseUrl = "http://x.waiqin.co/api/";
  DEBUG = false;
}
window.BASEURL = baseUrl;

export default {
  baseUrl,
  routerMode,
  DEBUG,
  cancleHTTP
};
