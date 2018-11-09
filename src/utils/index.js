import md5 from "js-md5";
import axios from "axios";
/**
 * h5 本地数据的操作类
 * */
var Local = {
  local: window.localStorage,
  set: function(attr, value) {
    if (typeof value === "object") {
      var temp = this.get(attr);
      for (var key in value) {
        if (value[key] == null) {
          temp.delete(key);
        } else {
          temp[key] = JSON.stringify(value[key]);
        }
      }
      this.local[attr] = JSON.stringify(temp);
    } else {
      this.local[attr] = value;
    }
  },
  get: function(attr) {
    let temp = this.local.getItem(attr);
    try {
      temp = temp ? JSON.parse(temp) : {};
    } catch (e) {
      temp = {};
    }
    return temp;
  },
  remove: function(attr) {
    this.local.removeItem(attr);
  }
};

/**
 * h5 session数据的操作类
 * */
var Session = {
  session: window.sessionStorage,
  set: function(attr, value) {
    if (typeof value === "object") {
      var temp = this.get(attr);
      for (var key in value) {
        if (value[key] == null) {
          temp.delete(key);
        } else {
          temp[key] = JSON.stringify(value[key]);
        }
      }
      this.session[attr] = JSON.stringify(temp);
    } else {
      this.session[attr] = value;
    }
  },
  get: function(attr) {
    let temp = this.session.getItem(attr);
    try {
      temp = temp ? JSON.parse(temp) : {};
    } catch (e) {
      temp = {};
    }
    return temp;
  }
};

/**
 * h5 cookie数据的操作类
 * */
var Cookie = {
  cookie: document.cookie,
  set: function(attr, value, expires, path, domain, secure) {},
  get: function(attr) {},
  remove: function(attr) {
    this.set(attr, "", -1);
  }
};

const Utils = {
  Local: Local,
  Session: Session,
  Cookie: Cookie,
  /**
   * 生成uuid
   * @param len 长度
   * @param radix  基数
   * @returns 一串随机字符串
   */
  getUuid: function(len, radix) {
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(
      ""
    );
    var uuid = [],
      i;
    radix = radix || chars.length;

    if (len) {
      // Compact form
      for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)];
    } else {
      // rfc4122, version 4 form
      var r;

      // rfc4122 requires these characters
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
      uuid[14] = "4";

      // Fill in random data.  At i==19 set the high bits of clock sequence as
      // per rfc4122, sec. 4.1.5
      for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | (Math.random() * 16);
          uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r];
        }
      }
    }

    return uuid.join("");
  },
  /**
   * UNIX时间戳转换为Date
   * @param timestamp
   * @returns {Date}
   */
  timestampToDate: function(timestamp) {
    if (timestamp <= 9999999999) {
      timestamp = timestamp * 1000;
    }
    return new Date(timestamp);
  },
  /**
   * Date转换为UNIX时间戳
   * @param timestamp
   * @returns {number}
   */
  dateTotimestamp: function(timestamp) {
    var dt;
    if (timestamp instanceof Date) {
      dt = timestamp;
    } else {
      dt = new Date(timestamp.replace(/-/g, "/"));
    }
    return isNaN(dt.getTime()) ? "" : dt.getTime();
  },
  /**
   * 格式化时间
   * @param date 原时间数据
   * @param format 时间输出的格式
   * @returns 根据指定格式输出的时间
   */
  formatDate: function(date, format) {
    if (!date) return "";
    if (!format) format = "yyyy-MM-dd";
    switch (typeof date) {
      case "string":
        date = new Date(date.replace(/-/g, "/"));
        break;
      case "number":
        if (date <= 9999999999) {
          date = date * 1000;
        }
        date = new Date(date);
        break;
    }
    if (!date instanceof Date) return;
    var dict = {
      yyyy: date.getFullYear(),
      M: date.getMonth() + 1,
      d: date.getDate(),
      H: date.getHours(),
      m: date.getMinutes(),
      s: date.getSeconds(),
      MM: ("" + (date.getMonth() + 101)).substr(1),
      dd: ("" + (date.getDate() + 100)).substr(1),
      HH: ("" + (date.getHours() + 100)).substr(1),
      mm: ("" + (date.getMinutes() + 100)).substr(1),
      ss: ("" + (date.getSeconds() + 100)).substr(1)
    };
    return format.replace(/(yyyy|MM?|dd?|HH?|mm?|ss?)/g, function() {
      return dict[arguments[0]];
    });
  },
  /**
   * 计算剩余时间
   * @param currTime 当前时间
   * @param startTime 开始时间
   * @returns {{days: number 天, hours: number 小时, minutes: number 分钟, seconds: number 秒}}
   */
  computeTime: function(currTime, startTime) {
    var surplus = startTime - currTime;
    //计算出相差天数
    var days = Math.floor(surplus / (24 * 3600 * 1000));

    //计算出小时数
    var leave1 = surplus % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
    var hours = Math.floor(leave1 / (3600 * 1000));
    //计算相差分钟数
    var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
    var minutes = Math.floor(leave2 / (60 * 1000));
    //计算相差秒数
    var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
    var seconds = Math.round(leave3 / 1000);

    return {
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds
    };
  },
  /**
   * 手机号验证
   * @param phone
   * @returns 手机号是否正确
   */
  valiPhone: function(phone) {
    let reg = /^0?1[3-9][0-9]\d{8}$/;
    return reg.test(phone);
  },

  /**
   * 身份证号验证
   * @param idcard
   * @returns 身份证号是否正确
   */
  valiIdCard: function(idcard) {
    let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    return reg.test(idcard);
  },
  /**
   * 删除数组中的元素
   */
  removeByValue: function(arr, val) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] === val) {
        arr.splice(i, 1);
        break;
      }
    }
    return arr;
  },
  /**
   * 设置页面title
   * @param title 进入页面的title
   */
  title: function(title) {
    let iTitle = "首页";
    if (title) {
      iTitle = title;
    }
    window.document.title = iTitle;
  },
  /**
   * 获取url参数
   * @param name 参数名称
   * @param url 地址
   */
  getParameterByName: function(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  },
  /**
   * 返回完整的URL (去掉末尾的 #/)
   * @example x.waiqin.co/ding/index.html?corpId=ding7bc2e52b22faf4b2#/
   * @return x.waiqin.co/ding/index.html?corpId=ding7bc2e52b22faf4b2
   */
  getFullUrl: function() {
    return (
      window.location.origin + window.location.pathname + window.location.search
    );
  },
  /**
   *
   * 判断url是否是http开头
   * @param url
   * @returns {boolean}
   */
  isHttpUrl: function(url) {
    return (
      url.toLocaleLowerCase().indexOf("http://") >= 0 ||
      url.toLocaleLowerCase().indexOf("https://") >= 0
    );
  },
  /**
   * 获取对象
   * @param obj
   * @param key
   * @returns {*}
   */
  getModel: function(obj, key) {
    if (obj && obj[key]) {
      if (obj[key] instanceof Object) {
        return obj[key];
      } else {
        return null;
      }
    } else {
      return null;
    }
  },
  /**
   * 获取数组
   * @param obj
   * @param key
   * @returns {*}
   */
  getArray: function(obj, key) {
    if (obj && obj[key]) {
      if (obj[key] instanceof Array) {
        return obj[key];
      } else {
        return new Array(obj[key]);
      }
    } else {
      return new Array();
    }
  },
  /**
   * 获取字符串直接用来页面展示
   * @param obj
   * @param key
   * @returns {*}
   */
  getString: function(obj, key) {
    if (obj && obj[key]) {
      if (typeof obj[key] == "string") {
        return obj[key];
      } else {
        return obj[key] + "";
      }
    } else {
      return "";
    }
  },
  /**
   * 获取Int值进行数据判断
   * @param obj
   * @param key
   * @returns {*}
   */
  getInt: function(obj, key) {
    if (obj && obj[key]) {
      if (typeof obj[key] == "number") {
        return obj[key];
      } else {
        var temp = parseInt(obj[key]);
        if (temp == "NaN") {
          return 0;
        }
        return temp;
      }
    } else {
      return 0;
    }
  },
  /**
   * 弹出页面loading   仅针对 vant
   * @param that 调用方的this对象
   * @param isopen 是打开还是关闭 true：打开 false：关闭
   * @param msg 提示语句
   * */
  loading: function(that, isopen, msg) {
    if (that) {
      if (isopen) {
        msg = msg ? msg : "加载中...";
        that.$toast.loading({
          mask: true,
          message: msg,
          forbidClick: false,
          duration: 0
        });
      } else {
        that.$toast.clear();
      }
    } else {
      throw new Error("that 为必填参数");
    }
  },
  /**
   * 接口错误弹窗  仅针对vant
   * @param  that 调用方的this对象 必填
   * @param  error 接口错误信息 选填
   */
  error: function(that, error) {
    if (that) {
      var code = error.response ? " 错误码:" + error.response.code : "";
      that.$toast(error.message + code);
    } else {
      throw new Error("that 为必填参数");
    }
  },
  /**
   * 统一获取页面显示值的方法，统一处理了返回值避免页面显示出现有问题的信息
   * @example val(data,'发生错误','message')   获取data里面message的内容，若没有  则返回“发生错误”
   * */
  val: function() {
    var temp = "";
    if (arguments.length > 2) {
      var data = arguments[0];
      var def = arguments[1];
      if (data) {
        for (var i = 2; i < arguments.length; i++) {
          var obj = data[arguments[i]];
          if (typeof obj === "object" && i !== arguments.length - 1) {
            data = obj;
          } else if (i === arguments.length - 1) {
            if (typeof obj === "undefined" || obj === null) {
              temp = def;
            } else {
              temp = obj;
            }
          } else {
            temp = def;
            break;
          }
        }
      }
    }
    return temp;
  },
  /**
   * 强制转换为int
   *
   * @param value 必填
   * @param def  选填
   */
  convertInt: function(value, def) {
    if (typeof def !== "number") {
      def = 0;
    }
    let result = def;
    try {
      result = parseInt(value);
      if (isNaN(result)) {
        result = def;
      }
    } catch (e) {
      result = def;
    }
    return result;
  },
  /**
   * 跳转指定的路由页面
   * @param params
   * params 示例
   * {
   *   that 调用方的this对象,  必填
   *   path 跳转的页面路由，  必填
   *   query 需要传递的参数， 选填
   * }
   */
  gotoRouter(params) {
    if (params.that) {
      params.that.$router.push({
        path: params.path,
        query: params.query ? params.query : {}
      });
    } else {
      throw Error("that 为必传字段");
    }
  },
  /**
   * 对数据进行md5加密处理
   * @param str 加密前数据
   * @returns md5后的字符串
   */
  md5(str) {
    if (typeof str === "string") {
      return md5(str);
    } else {
      return "";
    }
  },
  /**
   * 返回事件
   *
   * @param that  调用方法的当前this
   *
   */
  back(that) {
    if (that) {
      that.$router.back();
    } else {
      throw Error("that 为必传字段");
    }
  },
  User: {
    /**
     * 初始化Session数据，{
     *     user : 存储接口返回的用户数据
     *     purview ：存储权限数据
     * }
     */
    init(obj) {
      if (typeof obj === "object") {
        Tool.SessionAttr.setSessionAttr("syh_admin", {
          user: Tool.val(obj, {}, "user")
        });
        Tool.SessionAttr.setSessionAttr("syh_admin", {
          purview: Tool.val(obj, {}, "admin_purview")
        });
      }
    }
  },
  /**
   * 类型判断  null Object  Array  Undefined
   * @param str
   * @returns {string}
   */
  isNull(str) {
    var type = Object.prototype.toString;

    return type.call(str) == "[object Null]" ? "" : str;
  },

  isObj(str) {
    var type = Object.prototype.toString;

    return type.call(str) == "[object Object]" ? str : {};
  },

  isArray(str) {
    var type = Object.prototype.toString;

    return type.call(str) == "[object Array]" ? str : [];
  },

  isUndefined(str) {
    var type = Object.prototype.toString;

    return type.call(str) == "[object Undefined]" ? "" : str;
  },
  /**
   * 动态增加script
   * @param url script地址
   * @param callback 增加完成后的回调
   * @returns *
   */
  createScript(url, callback) {
    var oScript = document.createElement("script");
    oScript.type = "text/javascript";
    oScript.async = true;
    oScript.src = url;
    /*
     ** script标签的onload和onreadystatechange事件
     ** IE6/7/8支持onreadystatechange事件
     ** IE9/10支持onreadystatechange和onload事件
     ** Firefox/Chrome/Opera支持onload事件
     */

    // 判断IE8及以下浏览器
    var isIE = !-[1];
    if (isIE) {
      alert("IE");
      oScript.onreadystatechange = function() {
        if (this.readyState == "loaded" || this.readyState == "complete") {
          callback();
        }
      };
    } else {
      // IE9及以上浏览器，Firefox，Chrome，Opera
      oScript.onload = function() {
        callback();
      };
    }
    document.body.appendChild(oScript);
  },
  /**
   * 判断obj对象是否为空
   * @method isEmptyObject
   * @param { * } obj 需要判断的对象
   * @remind 如果判断的对象是NULL， 将直接返回true， 如果是数组且为空， 返回true， 如果是字符串， 且字符串为空，
   *          返回true， 如果是普通对象， 且该对象没有任何实例属性， 返回true
   * @return { Boolean } 对象是否为空
   */
  isEmptyObject: function(obj) {
    if (obj == null) return true;
    if (this.isArray(obj) || this.isString(obj)) return obj.length === 0;
    for (var key in obj) if (obj.hasOwnProperty(key)) return false;
    return true;
  },
  /**
   * 克隆对象
   * @method clone
   * @param { Object } source 源对象
   * @return { Object } source的一个副本
   */

  /**
   * 深度克隆对象，将source的属性克隆到target对象， 会覆盖target重名的属性。
   * @method clone
   * @param { Object } source 源对象
   * @param { Object } target 目标对象
   * @return { Object } 附加了source对象所有属性的target对象
   */
  clone: function(source, target) {
    var tmp;
    target = target || {};
    for (var i in source) {
      if (source.hasOwnProperty(i)) {
        tmp = source[i];
        if (typeof tmp == "object") {
          target[i] = utils.isArray(tmp) ? [] : {};
          utils.clone(source[i], target[i]);
        } else {
          target[i] = tmp;
        }
      }
    }
    return target;
  },
  /**
   * 删除字符串str的首尾空格
   * @method trim
   * @param { String } str 需要删除首尾空格的字符串
   * @return { String } 删除了首尾的空格后的字符串
   */
  trim: function(str) {
    return str.replace(/(^[ \t\n\r]+)|([ \t\n\r]+$)/g, "");
  },
  /**
   * 从服务器（m.tmall）上获取时间
   * @method getTimeFromServer
   * @return date 对象
   */
  getTimeFromServer: function() {
    return new Promise((resolve, reject) => {
      axios.head("http://m.tmall.com").then(
        res => {
          let data = { date: new Date(res.headers.date), from: "OL" };
          resolve(data);
        },
        err => {
          let data = { date: new Date(), from: "LT" };
          resolve(data);
        }
      );
    });
  },
  /**
   * 初始化经纬度对象 仅针对高德地图  需载入amap
   * @method initLngLat
   * @param lng 经度
   * @param lat 纬度
   * @return obj
   */
  initLngLat: function(lng, lat) {
    return new AMap.LngLat(lng, lat);
  },
  /**
   * 根据经纬度计算两点之间的距离
   * @method calculateDistance
   * @param lng 经度
   * @param lat 纬度
   * @return obj
   */
  calculateDistance: function(lng1, lat1, lng2, lat2) {
    let start = this.initLngLat(lng1, lat1);
    let end = this.initLngLat(lng2, lat2);
    return Math.round(start.distance(end));
  },
  /**
   * 打开vconsole
   * @method openVconsole
   */
  openVconsole: function() {
    let url =
      "http://maimang-public.oss-cn-hangzhou.aliyuncs.com/vconsole.min.js";
    this.createScript(url, function() {
      var vConsole = new VConsole();
      Vue.prototype.vConsole = vConsole;
    });
  },
  closeVConsole: function(that) {
    if (that) {
      that.vConsole.destroy();
    } else {
      throw new Error("that为必填参数");
    }
  }
};
export default Utils;
