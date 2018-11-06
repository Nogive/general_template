import Qs from "qs";
import axios from "axios";
import Utils from "@/utils";

/**
 * 网络请求业务接口
 * params {
 *     that: 当前请求网络的页面this  必填
 *     url: 网络请求的URL 必填
 *     data: 请求接口所需要的参数 默认 {'agentid':当前登录的账户id}
 *     dataType:请求接口的参数类型(raw formdata) 默认 raw
 *     isload: 是否出现loading框 默认 true 出现
 *     type：POST or GET  网络请求方式 默认  POST
 *     headers: 请求的头部参数，默认 {}
 *     transformRequest: 请求接口前处理数据
 *     transformResponse: 拿到返回值后处理数据
 *     timeout: 接口响应时间 默认 10000
 *     responseType: 返回数据的数据类型 默认 json
 *     success: 接口数据正常回调页面处理逻辑
 *     error: 接口数据错误回调页面处理逻辑
 * }
 * @param params
 */
export function callApi(params) {
  if (params && params.that && params.url) {
    let isload = typeof params.isload === "undefined" ? true : params.isload;

    if (!params.data) {
      params.data = {};
    }
    params.data["userId"] = "000000";

    let configData = {
      method: params.type ? params.type : "POST",
      url: params.url,
      headers: params.headers ? params.headers : {},
      transformRequest: [
        function(data) {
          if (params.transformRequest) {
            data = params.transformRequest(data);
          }
          return data;
        }
      ],
      transformResponse: [
        function(data) {
          if (params.transformResponse) {
            data = params.transformResponse(data);
          }
          return data;
        }
      ],
      timeout: params.timeout ? params.timeout : 100000,
      responseType: params.responseType ? params.responseType : "json",
      data: params.dataType ? Qs.stringify(params.data) : params.data
    };

    if (isload) {
      Utils.loading(params.that, true);
    }

    axios(configData)
      .then(response => {
        if (isload) {
          Utils.loading(params.that, false);
        }
        console.log(response);
        if (response.status === 200) {
          var code = Utils.val(response.data, 0, "code");
          if (code == 0) {
            var data = Utils.val(response.data, {}, "data");
            if (Utils.isEmptyObject(data)) {
              let error = new Error("无法从服务端获取数据，请联系管理员！");
              throw error;
            } else if (params.success) {
              params.success(response.data.data, response.data);
            }
          } else {
            let error = new Error(
              Utils.val(response.data, "请求发生错误!", "message")
            );
            error.response = response.data;
            throw error;
          }
        } else {
          let error = new Error("发生网络错误！" + response.status);
          error.response = { code: response.status, data: response.data };
          throw error;
        }
      })
      .catch(error => {
        Utils.error(params.that, error);
      });
  } else {
    throw new Error("that 和 url 是必传字段");
  }
}
