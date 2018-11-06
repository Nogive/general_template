import Utils from "@/utils";
/**
 * 获取ding code
 * @example corpId=ding7bc2e52b22faf4b2
 * @return code
 */
export function requestAuthCode() {
  return new Promise((resolve, reject) => {
    dd.runtime.permission.requestAuthCode({
      corpId: Utils.getParameterByName("corpId"),
      onSuccess: function(result) {
        resolve(result.code);
      },
      onFail: function(err) {
        reject(err);
      }
    });
  });
}

/**
 * 拍照上传
 * @example watermark:{
 *      time: "08:35",
        dateWeather: "2016.05.06 周六·晴转多云 16℃",
        username: "王晓",
        address: "西湖·杭州"
 * }
 * @return getFullUrl() //x.waiqin.co/ding/index.html?corpId=ding7bc2e52b22faf4b2
 */
export function uploadImageFromCamera(watermark) {
  return new Promise((resolve, reject) => {
    dd.biz.util.uploadImageFromCamera({
      compression: true, //(是否压缩，默认为true压缩)
      quality: 50, // 图片压缩质量,
      resize: 50, // 图片缩放率
      stickers: watermark,
      onSuccess: function(result) {
        resolve(result);
      },
      onFail: function(err) {
        reject(err);
      }
    });
  });
}
