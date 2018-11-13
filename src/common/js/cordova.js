/**## native sdk 结合cordova*/
/**
 * 初始化 cordova
 */
function cordovaInitialize(that) {
  document.addEventListener(
    "deviceready",
    function() {
      that.$toast("device ready");
    },
    true
  );
  document.addEventListener(
    "pause",
    function() {
      console.log("pause");
      that.$store.dispatch("changeAppState", "pause");
    },
    false
  );
  document.addEventListener(
    "resume",
    function() {
      console.log("resume");
      that.$store.dispatch("changeAppState", "resume");
    },
    false
  );
}
/**
 * 拍照
 * @method takePhoto
 * @param option 拍照相关配置
 * @example option:{
 *  quality: 50,  //照片质量
    destinationType: navigator.camera.DestinationType.FILE_URI,//返回数据类型 （URL/base64）
    sourceType: navigator.camera.PictureSourceType.CAMERA,//返回源
    encodingType: navigator.camera.EncodingType.JPEG,//照片格式
    mediaType: navigator.camera.MediaType.PICTURE,//
    allowEdit: false, //不允许编辑
    saveToPhotoAlbum: false, //不允许保存到相册
    correctOrientation: true // Corrects Android orientation quirks
 * }
 */
/**
 * 拍照上传
 * @param watermark 水印信息
 * @example watermark:["2016.05.06 周六·晴转多云 16℃"]
 * @return getFullUrl() //x.waiqin.co/ding/index.html?corpId=ding7bc2e52b22faf4b2
 */
function takePhoto(watermark) {
  var options = {
    quality: 50,
    destinationType: navigator.camera.DestinationType.FILE_URI,
    sourceType: navigator.camera.PictureSourceType.CAMERA,
    encodingType: navigator.camera.EncodingType.JPEG,
    mediaType: navigator.camera.MediaType.PICTURE,
    allowEdit: false, //不允许编辑
    saveToPhotoAlbum: false, //不允许保存到相册
    correctOrientation: true // Corrects Android orientation quirks
  };
  if (watermark) {
    options.waterMarker = watermark;
  }
  return new Promise((resolve, reject) => {
    navigator.camera.getPicture(
      imgUri => {
        resolve(imgUri);
      },
      errMsg => {
        reject(errMsg);
      },
      options
    );
  });
}
/**
 * 连续获取一组位置，返回精度最低的
 * @param interval 间隔多少时间返回一组数据 ms 默认200
 * @return result {}
 * @example result:{
      lng : Number,  经度
      lat : Number,  纬度
      arc : Number, 实际定位经度半径
      adr : String, 格式化地址
      prv : String, 省
      cty : String, 市
      dist : String, 区
      time : timestamp, 时间
      lot:Number
    }
 */
function onLocation(interval) {
  var results = [];
  var time = interval ? interval : 200;
  return new Promise((resolve, reject) => {
    cordova.exec(
      data => {
        if (results.length < 5) {
          results.push(data);
        } else {
          stopCordovaLocate();
          results.sort((a, b) => {
            return a - b;
          });
          resolve(results[0]);
        }
      },
      err => {
        reject(err);
      },
      "Location",
      "start",
      [interval]
    );
  });
}
function stopCordovaLocate(sceneId) {
  cordova.exec(function() {}, function() {}, "Location", "stop", []);
}

/**
 * 阻止设备自带返回行为
 * @method stopBehaviorOfBackButton
 */
function stopBehaviorOfBackButton() {
  cordova.exec(null, null, "CoreAndroid", "overrideBackbutton", [true]);
}
/**
 * 恢复返回按钮的行为
 * @method restoreBackButton
 */
function restoreBackButton() {
  cordova.exec(null, null, "CoreAndroid", "overrideBackbutton", [false]);
}
/**
 * 自定义返回按钮的行为
 * @method definedBackbehavior
 */
function definedBackbehavior(fn) {
  document.addEventListener("backbutton", fn);
}
/**
 * 获取当前客户端版本
 * @method getClientVersion
 * @returns version
 */
function getClientVersion() {
  return new Promise(function(resolve, reject) {
    cordova.exec(
      function(data) {
        resolve(data);
      },
      function(err) {
        reject(err);
      },
      "Version",
      "client",
      []
    );
  });
}
/**
 * 获取当前api版本
 * @method getApiVersion
 * @returns version
 */
function getApiVersion() {
  return new Promise(function(resolve, reject) {
    cordova.exec(
      function(data) {
        resolve(data);
      },
      function(err) {
        reject(err);
      },
      "Version",
      "api",
      []
    );
  });
}
/**
 * 上传照片
 * @method savePhoto
 */
function savePhoto(options) {
  return new Promise(function(resolve, reject) {
    cordova.exec(
      function(data) {
        resolve(data);
      },
      function(err) {
        reject(err);
      },
      "Photo",
      "upload",
      [options.url.substring(7), options.uuid + ".jpg"]
    );
  });
}

export {
  cordovaInitialize,
  takePhoto,
  onLocation,
  stopBehaviorOfBackButton,
  restoreBackButton,
  definedBackbehavior,
  getClientVersion,
  getApiVersion,
  savePhoto
};
