<template>
  <div class="example">
    <van-button type="primary"  plain @click="takePhoto">测试拍照</van-button>
    <van-button type="primary"  plain @click="getGPS">测试GPS</van-button>
    <van-button @click="testAxios">testAxios</van-button>
    <van-button @click="show">show</van-button>
  </div>
</template>

<script>
import { uploadImageFromCamera} from "@/common/js/ding";
import {callApi} from "@/server/axios";
import {account} from "@/server/api";

export default {
  name: 'HelloWorld',
  data () {
    return {
     
    }
  },
  methods:{
    takePhoto(){
      let watermark={
        time: "08:35",
        dateWeather: "2016.05.06 周六·晴转多云 16℃",
        username: "王晓",
        address: "西湖·杭州"
      };
      uploadImageFromCamera(watermark).then(res=>{
        console.log(res);
      }).catch(err=>{
        console.log(err);
      })
    },
    getGPS(){
      console.log('获取GPS');
    },
    testAxios(){
      callApi({
        that:this,
        url:account.getCaptchaImage,
        type:"GET",
        success:function(data){
          console.log(data);
        }
      });
    },
    show(){
      this.Utils.loading(this,true);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
