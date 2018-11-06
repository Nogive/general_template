const constants = {
  publicKey:
    "MFswDQYJKoZIhvcNAQEBBQADSgAwRwJAb6sVJ1LaIIpRR3U20ZbQPDvMkGy7A4ac7rAFz9QWW8pamYzGyfloIDER7OYj5C5S/YkMqXLMBTfc6SeTK9142QIDAQAB",
  prefixOfPic: "http://xfield.oss-cn-hangzhou.aliyuncs.com",
  account: {
    deviceType_android: "ANDROID",
    deviceType_ios: "IOS",
    deviceType_web: "WEB",
    deviceType_ding_android: "DING_ANDROID",
    deviceType_ding_ios: "DING_IOS"
  },
  apiCode: {
    ok: 200,
    noAuth: 401,
    noPermission: 403,
    error: 400,
    notFound: 404,
    internalError: 500,
    serverError: 502
  }
};
export default constants;
