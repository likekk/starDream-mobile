<!--
  处理修改收货地址的全部信息
  2019-3-3
  邹吉权
-->
<template>
  <div>
    <Header></Header>
    <div class="m_newadd_content">
      <div class="m_order_nav">
        <div class="goback">
          <a href="javascript:void(0);" id="backPic" @click="back"></a>
        </div>
        <span id="optionText">修改</span>收货地址
      </div>
      <!--标题-->
      <div class="m_new_add">
        <div class="love_name">
          <ul>
            <li style="padding-top:2px">收礼人名
              <input id="contactname" maxlength="10" v-model="name" type="text" placeholder="请填写收礼人名" style="color:#414141">
            </li>

            <li>手机号码
              <input id="mobile" maxlength="11" v-model="phone" type="text" placeholder="请输入手机号">
            </li>

            <li class="love_dq" @click="popup()">所在地区
              <span id="addspan" style="padding-left: 30px;color:#414141">{{detailUpdateAddress}}</span>
            </li>

            <li class="add_xx">详细地址
              <input id="address" v-model="address" maxlength="100" class="add_xx_txt" placeholder="请输入详细地址">
            </li>
            <li>邮编
              <input id="zip" class="zip" maxlength="6" v-model="email" type="text" style="margin-left:57px;height:30px; width:60%" placeholder="请输入邮编">
            </li>
          </ul>
        </div>
      </div>
      <!--表单1-->
      <div class="sendmobile-box">
        <div class="sendmobile" style="width:90%; margin:0 auto; border-top:1px solid #EFEFEF ">
          订货人手机 <input id="userMobile" v-model="phone" type="text" style="width:60%;display: inline-block; color:#414141" disabled="disabled">
        </div>
      </div>
      <!--收获人手机-->
      <div class="userinfo" style="margin-top: 28%">
        <div class="new_add_yzm" style="display: none;">
          <div class="new_add_hq">
            <div class="yzm_txt">
              <input type="text" id="yzMobile" style="background: #fff;width:100%;height:100%;margin:0" placeholder="请输入手机号">
            </div>
            <div class="yzm_btn">
              <span class="yzm_before" id="getSms">获取验证码</span>
              <div class="yzm_bj" style="width: 104%;"></div>
            </div>
          </div>
          <div class="new_add_sure">
            <div class="yzm_txt">
              <input type="text" id="code" maxlength="6" style="background: #fff;width:100%;height:100%;margin:0">
            </div>
            <div class="yzm_btn2">
              <input type="button" id="addUserMobile" value="确定" style="margin:0; line-height:40px">
              <div class="sure_bj" style="width: 104%"></div>
            </div>
          </div>
        </div>
        <div class="new_add_btn">
          <div class="new_add_cancel">
            <input id="toback" type="button" value="返回" onclick="history.back()" style="transform-origin: 0px 0px; opacity: 1; transform: scale(1, 1);">
            <div class="cancel_bj" style="width: 102.5%;"></div>
          </div>
          <div class="new_add_user">
            <input id="btnNewAddrSave" type="button" @click="privateupdateAddress" style="background-color: #e1e1e1" value="保存并使用">
            <div class="ceng_bj" style="width:103.5%"></div>
          </div>
        </div>
        <div style="width:100%;height:80px;"></div>
        <!--收货地址弹出层列表-->
        <van-popup v-model="show" position="bottom">
          <van-area :area-list="areaList" title="地址选择"  @confirm="confirm" @cancel="closeArea"/>
        </van-popup>
      </div>
    </div>
  </div>
</template>

<script>
  import {URL} from "@/assets/js/URL";
  import Header from  '../common/HeaderComponent';
  import area from "@/assets/js/area"
  import { Area, Popup,Toast } from "vant"
  export default {
    name: "UserUpdateAddressComponent",
    components:{
      Header,
      [Area.name]:Area,
      [Popup.name]:Popup,
      [Toast.name]:Toast,
    },
    data(){
      return{
        address:"",
        area:"",
        city:"",
        did:"",
        name:"",
        uno:"",
        domit:"",
        phone:"",
        email:"",
        areaList:area,//收货地址列表
        show:false,
        detailUpdateAddress:""//详细收货地址
      }
    },
    methods:{
      back:function () {
        history.back();
      },
      getAddress:function () {
        this.detailUpdateAddress=this.$route.query.domit+"  "+this.$route.query.city+"  "+this.$route.query.area
        this.address=this.$route.query.address;
        this.domit=this.$route.query.domit;
        this.area=this.$route.query.area;
        this.city=this.$route.query.city;
        this.did=this.$route.query.did;
        this.name=this.$route.query.name;
        this.uno=this.$route.query.uno;
        this.phone=this.$route.query.phone;
        this.email=this.$route.query.email;
      },
      popup:function () {
        if(!this.show){
          this.show = true;
        }else{
          this.show = false;
        }
      },
      confirm:function (arr) {//获取收货地址并关闭弹层
        var areaList=[];//接收省市区
        $.each(arr,function (i,v) {
          areaList.push(v.name);
        })
        // console.log(areaList[0]);
        // console.log(areaList[1]);
        // console.log(areaList[2]);
        this.domit=areaList[0];
        this.city=areaList[1];
        this.area=areaList[2];
        this.detailUpdateAddress=areaList[0]+"  "+areaList[1]+"  "+areaList[2];//选中时修改收货地址
        this.address=areaList[0]+""+areaList[1]+""+areaList[2];//选中更换收货地址
        this.show=false;
      },
      closeArea:function () {//关闭弹层
        this.show=false;
      },
      privateupdateAddress:function () {//修改收货地址
        if(this.name==""||this.name.length<0){
          Toast.fail({
            message:"请填写收件人",
          })
          return false;
        }if(this.phone==""||this.phone.length<0){
          Toast.fail({
            message:"请填写联系方式",
          })
          return false;
        }if(this.detailUpdateAddress==""||this.detailUpdateAddress.length<0){
          Toast.fail({
            message:"请填写收货地址",
          })
          return false;
        }if(this.email==""||this.email.length<0){
          Toast.fail({
            message:"请填写邮政编码",
          })
          return false;
        }
       // console.log(this.did,this.uno,this.phone,this.name,this.domit,this.city,this.area,this.address,this.email)
        $.ajax({
          url:URL+"DeliveryAddress/updateAddress",
          type:"post",
          data:{cdid:this.did,cdno:this.uno,cdname:this.name,cdphone:this.phone,cdomit:this.domit,
            cdcity:this.city,cdarea:this.area,cdaddress:this.address,cemail:this.email},
        }).done(function (data) {
          if(data.code==1){
            Toast.success({
              message:"修改成功",
              duration:1000
            })
          }
        })
      }
    },
    mounted:function () {
      this.getAddress();
    },
  }
</script>

<style scoped>
  body, div, p, ul, li, table, tbody, tr, td, textarea, form, input, h1, h2, h3, h4, h5, dl, dt, dd, img, iframe, header, nav, section, article, footer, figure, figcaption, menu {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .m_newadd_content {
    padding-top: 20px;
    /*padding-top: 80px;*/
    max-width: 750px;
    margin: 0 auto;
    position: relative;
  }
  .m_order_nav {
    position: relative;
    background: #f5f5f5;
    padding: 15px;
    font-size: 19px;
    font-weight: bold;
    text-align: center;
    border-top: 1px solid #e1e1e1;
    border-bottom: 1px solid #e1e1e1;
    color: #444;
  }
  .goback {
    position: absolute;
    width: 19px;
    height: 27px;
    background: url(../../assets/static_image/MyInfo_back_01.png) no-repeat 0 23%;
    background-size: 55% 70%;
  }
  .m_order_nav a {
    display: block;
    width: 19px;
    height: 30px;
  }
  a {
    text-decoration: none;
    color: #3174c7;
  }
  /*标题*/
  .m_newadd_content .m_new_add {
    width: 100%;
  }
  .m_newadd_content .m_new_add .love_name {
    width: 100%;
    height: 130px;
  }
  .m_newadd_content .m_new_add .love_name ul {
    background: #fff;
    margin-top: 3%;
  }
  .m_newadd_content .m_new_add .love_name ul li {
    width: 95%;
    margin-left: 5%;
    font-size: 15px;
    font-weight: bold;
    color: #414141;
    height: 37px;
    line-height: 37px;
    border-bottom: 1px solid #EFEFEF;
  }
  .m_newadd_content .m_new_add .love_name .love_dq {
    background: url(../../assets/static_image/goshipping.png) 95% 50% no-repeat;
    background-size: 3% auto;
  }
  .m_newadd_content .m_new_add .love_name .add_xx {
    position: relative;
  }
  .m_newadd_content .m_new_add .love_name input {
    width: 70%;
  }

  .m_newadd_content .m_new_add .love_name input {
    width: 65%;
    border: none;
    font-size: 14px;
    display: inline-block;
    background: #fff;
    margin-top: 0;
    margin-left: 25px;
    color: #414141;
  }
  input[type=text], input[type=password], input[type=number], input[type=tel], textarea {
    margin: 10px 0;
    border-radius: 3px;
    width: 100%;
    height: 35px;
    display: block;
    background: #e2e2df;
    border: 0;
    text-indent: 2%;
  }
  .m_newadd_content .m_new_add .love_name .add_xx textarea {
    font-size: 14px;
    position: absolute;
    line-height: 14px;
    padding-top: 5px;
    overflow: hidden;
    right: 8%;
    padding-top: 15px;
    -webkit-box-sizing: border-box;
    padding-left: 6px;
  }
  .m_newadd_content .m_new_add .love_name .love_dq span {
    font-weight: normal;
    font-size: 14px;
  }
  textarea {
    background: none;
    border: none;
    -webkit-appearance: none!important;
    outline: none;
  }
  .m_newadd_content .m_new_add .love_name .add_xx textarea {
    width: 68%;
    /* height: 30px; */
    font-size: 13.5px;
    position: absolute;
    line-height: 13px;
    padding-top: 5px;
    overflow: hidden;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    margin: 0;
    min-height: 0;
    top: 0;
    padding-top: 17px;
    -webkit-box-sizing: border-box;
  }
  /*表单*/
  .sendmobile-box {
    margin-top: 60px;
    width: 100%;
    background-color: #fff;
  }
  .sendmobile {
    width: 100%;
    font-size: 15px;
    font-weight: bold;
    color: #414141;
    background: #fff;
    height: 50px;
    line-height: 50px;
  }
  .sendmobile-box input {
    background: #fff;
    font-size: 14px;
    padding-left: 10px;
  }
  /*收货人手机end*/
  .new_add_yzm {
    margin-top: 5%;
  }
  .new_add_btn {
    width: 90%;
    margin-top: 10%;
    margin-left: 5%;
  }
  .new_add_yzm .new_add_hq {
    width: 92%;
    margin: 0 auto;
    height: 30px;
    position: relative;
    margin-left: 4.5%;
  }
  .new_add_yzm .new_add_sure {
    width: 92%;
    height: 25px;
    position: relative;
    margin-top: 5%;
    margin-left: 4.5%;
  }
  .new_add_btn .new_add_cancel {
    width: 40%;
    margin-right: 8%;
    position: absolute;
  }
  .new_add_btn .new_add_user {
    width: 40%;
    position: absolute;
    right: 5%;
  }
  .new_add_yzm .yzm_txt {
    position: absolute;
    left: 0;
    top: 0;
    width: 75%;
    border: 1px solid #aaaaaa;
    height: 38px;
    border-radius: 3px;
  }
  .new_add_yzm .yzm_btn {
    position: absolute;
    right: 2%;
    top: 0%;
    width: 25%;
    background: #c2c2c2;
  }
  .new_add_yzm .yzm_txt {
    position: absolute;
    left: 0;
    top: 0;
    width: 75%;
    border: 1px solid #aaaaaa;
    height: 38px;
    border-radius: 3px;
  }
  .yzm_btn2 {
    text-align: center;
    background: #838383;
    color: #FFFFFF;
    position: absolute;
    right: 2%;
    top: 0%;
    width: 25%;
    height: 40px;
    line-height: 40px;
    -webkit-border-top-right-radius: 4px;
    -webkit-border-bottom-right-radius: 4px;
  }
  .new_add_yzm .yzm_txt input {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    background: none;
    border: none;
    outline: none;
    font-size: 14px;
    display: inline-block;
  }
  .yzm_before {
    position: absolute;
    display: inline-block;
    width: 100%;
    top: 0;
    right: 0;
    text-align: center;
    background: #838383;
    color: #fff;
    font-size: 14px;
    height: 40px;
    line-height: 40px;
    -webkit-border-top-right-radius: 4px;
    -webkit-border-bottom-right-radius: 4px;
  }
  .yzm_bj, .sure_bj {
    height: 40px;
    background-color: rgba(0,0,0,0.2);
    position: absolute;
    top: -2px;
    left: -2px;
    border-radius: 3px;
    display: none;
  }
  .new_add_yzm .yzm_txt input {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    background: none;
    border: none;
    outline: none;
    font-size: 14px;
    display: inline-block;
  }
  .yzm_btn2 input {
    background: none;
    border: none;
    outline: none;
    text-align: center;
    color: #fff;
    -webkit-appearance: none;
    width: 100%;
    font-size: 14px;
  }
  .new_add_btn div {
    float: left;
  }
  .new_add_btn div > input {
    height: 40px;
    background: #838383;
    -webkit-appearance: none;
    appearance: none;
    font-size: 15px;
    font-weight: bold;
    color: #fff;
    line-height: 40px;
    border: none;
    width: 100%;
    outline: none;
  }
  .new_add_btn div > input {
    height: 40px;
    background: #838383;
    -webkit-appearance: none;
    appearance: none;
    font-size: 15px;
    font-weight: bold;
    color: #fff;
    line-height: 40px;
    border: none;
    width: 100%;
    outline: none;
  }
  .cancel_bj, .ceng_bj {
    width: 100%;
    height: 44px;
    background-color: rgba(0,0,0,0.2);
    position: absolute;
    top: -2px;
    left: -2px;
    border-radius: 3px;
    display: none;
  }
  .new_add_btn div > input {
    height: 40px;
    background: #838383;
    -webkit-appearance: none;
    appearance: none;
    font-size: 15px;
    font-weight: bold;
    color: #fff;
    line-height: 40px;
    border: none;
    width: 100%;
    outline: none;
  }
</style>


