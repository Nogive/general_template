/**## native sdk 结合cordova*/
/**
 * 拍照
 * @method takePhoto
 * @param onSuccess 拍照成功的回调
 * @param onFail  拍照失败的回调
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
function takePhoto(onSuccess, onFail, option) {
  if (!navigator.camera) {
    Toast("Camera API not supported !");
    return;
  }
  let options = {
    quality: 50,
    destinationType: navigator.camera.DestinationType.FILE_URI,
    sourceType: navigator.camera.PictureSourceType.CAMERA,
    encodingType: navigator.camera.EncodingType.JPEG,
    mediaType: navigator.camera.MediaType.PICTURE,
    allowEdit: false, //不允许编辑
    saveToPhotoAlbum: false, //不允许保存到相册
    correctOrientation: true // Corrects Android orientation quirks
  };
  if (option) {
    options.waterMarker = option;
  }
  let successCallback = function(imgUri) {
    onSuccess(imgUri);
  };
  let errorCallback = function(message) {
    onFail(message);
  };
  navigator.camera.getPicture(successCallback, errorCallback, options);
}
/**
 * 开始定位
 * @method startLocate
 * @param successCallback 定位成功的回调
 * @param errorCallback  定位失败的回调
 * @param option 定位相关配置
 */
function startLocate(successCallback, errorCallback, option) {
  if (option) {
    cordova.exec(successCallback, errorCallback, "Location", "start", [option]);
  } else {
    cordova.exec(successCallback, errorCallback, "Location", "start", []);
  }
}
/**
 * 结束定位
 * @method startLocate
 */
function stopLocate() {
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
  takePhoto,
  startLocate,
  stopLocate,
  stopBehaviorOfBackButton,
  restoreBackButton,
  definedBackbehavior,
  getClientVersion,
  getApiVersion,
  savePhoto
};
