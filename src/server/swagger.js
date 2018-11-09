const XFieldApi = require("x_field_api");
/*---------------------API--------------------------------------------- */
//ddApi
export var ddApi = new XFieldApi.DingApi();

//dingApi里面的参数
const apiParams = {
  createMicroapp: function(body) {
    return new XFieldApi.DingAppRequest.constructFromObject(body);
  },
  dingConfig: function(url) {
    return url;
  },
  dingGetuserinfo: function(body) {
    return new XFieldApi.DingSsoRequest.constructFromObject(body);
  }
};
/**
 * 其他常用信息
 * @example setAuth  设置请求头
 * @example errorCode 错误码
 */
export var custom = {
  setAuth: key => {
    var defaultClient = XFieldApi.ApiClient.instance;
    var auth = defaultClient.authentications["ApiKeyAuth"];
    auth.apiKey = key;
  },
  errorCode: XFieldApi.Error.CodeEnum
};
//调API的方法封装
export function callApi(apiInstance, api, param) {
  return new Promise((resolve, reject) => {
    if (param) {
      let body = apiParams[api](param);
      console.log("body:", body); //打印参数
      apiInstance[api](body, (error, data, res) => {
        if (error) {
          reject(unifiedErrors(error));
        } else {
          resolve(data);
        }
      });
    } else {
      apiInstance[api]((error, data, res) => {
        if (error) {
          reject(unifiedErrors(error));
        } else {
          resolve(data);
        }
      });
    }
  });
}
//处理错误
const apiCode = {
  ok: 200,
  noAuth: 401,
  noPermission: 403,
  error: 400,
  notFound: 404,
  internalError: 500,
  serverError: 502
};
function unifiedErrors(error) {
  let err = new Error();
  if (error.status == apiCode.noAuth) {
    err.message = "身份验证已经失效，请重新登录！";
    err.code = error.status;
  } else if (error.status == apiCode.noPermission) {
    err.message = "抱歉！您没有权限访问，请联系管理员。";
    err.code = error.status;
  } else if (error.status == apiCode.internalError) {
    err.message = "服务器发生错误，请联系管理员。";
    err.code = error.status;
  } else {
    err.message = "发生错误。";
    err.code = error.status;
    err.body = error.response.body;
  }
  return err;
}
