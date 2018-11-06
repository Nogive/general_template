<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
import { requestAuthCode } from "@/common/js/ding";
export default {
  name: 'App',
  created(){
    //console.log(this.Utils);
    //console.log(this.constants);
    this._initEnvironment();
  },
  methods:{
    _initEnvironment(){
      //判断当前处于什么环境
      this._initDingTalk();//钉钉
      this._dingError();
    },
    _initDingTalk(){
      let _this=this;
      dd.ready(function() {
        requestAuthCode().then(res=>{
          console.log("dd ready");
          console.log(res);
          _this.login(res);
        }).catch(err=>{
          console.log(err)
        })
      });
    },
    _dingError(){
      dd.error(function(error) {
        console.log("dd error: " + JSON.stringify(error));
      });
    },
    login(code){
      let _this=this;
      this.axios
      .post("/api/ding/sso", { corpId: _this.Utils.getParameterByName("corpId"),code:code })
      .then(function(response) {
        console.log("login");
        console.log(response);
        //设置请求头
        this.axios.defaults.headers.common['Authorization']=response.token;
        _this.questJsApiConfigAndSet();
      })
      .catch(function(error) {
        console.error(error);
      });
    },
    questJsApiConfigAndSet(){
      let _this=this;
      this.axios
      .get("/api/ding/config", { params: { url: _this.Utils.getFullUrl() } })
      .then(function(response) {
        console.log("config");
        console.log(response);
        let config = response.data;
        config.jsApiList = ["biz.util.uploadImageFromCamera"];
        dd.config(config);
      })
      .catch(function(error) {
        console.error(error);
      });
    },
    
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
