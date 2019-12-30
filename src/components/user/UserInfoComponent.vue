<template>
    <div>
      <div class="header">
        <Header></Header>
      </div>
      <div class="content">
        <div class="order-nav">
          <span class="back" onclick="javascript:history.back();"></span>
          我的信息
        </div>
        <!--表单开始-->
        <div id="userInfo" class="contentbg">
            <ul>
              <li>
                姓名
                <input id="nickname" v-model="uName" type="text" placeholder="请输入您的昵称" maxlength="20" style="margin-left:31px;">
              </li>
              <li style="position: relative;">
                手机
                <input id="mobile" type="tel" v-model="uTel" disabled="disabled" placeholder="请输入您的手机号" maxlength="11" style="margin-left: 30px;">
              </li>
              <li>
                生日
                <input type="text" id="aDate_birthday" class="appDate" placeholder="请输入生日" v-model="uDate" style="margin-left: 30px;">
              </li>
              <li>
                <div style="float:left;">性别</div>
                <div id="babysex" class="u_dy">
                  <div class="left cur sex" data-sdid="男" @click="checkSex($event)">男</div>
                  <div class="right sex" data-sdid="女" @click="checkSex($event)">女</div>
                </div>
              </li>
              <li id="addr_list" class="tab_nav_start" @click="proup">
                所在地区
                <span id="area" type="text" style="margin-left:27px;font-size:14px">{{uAddress}}</span>
              </li>
              <li>
                地址
                <input id="address" type="text" v-model="detailsAddress" placeholder="请输入地址" maxlength="100" style="margin-left:31px;" class="">
              </li>
                <div class="user_info_line"></div>
              <!---->
              <!--<li>-->
                <!--爱人名字-->
                <!--<input id="mylove" type="text" value="" placeholder="我的爱人名,填写后不能修改" maxlength="50" class="">-->
              <!--</li>-->
              <!--<li>-->
                <!--爱人手机-->
                <!--<input id="lovemobile" type="tel" value="" placeholder="请输入爱人手机" maxlength="11" class="">-->
              <!--</li>-->
              <!--<li>-->
                <!--爱人生日-->
                <!--<input type="text" id="lover_birthday" class="appDate" placeholder="请输入爱人生日" value="">-->
              <!--</li>-->
              <!--<li>-->
                <!--<div style="float:left;">-->
                <!--爱人性别-->
                <!--</div>-->
                <!--<div id="loversex" class="u_dy" style="margin-left: 26px;">-->
                  <!--<div class="left cur" data-sdid="m">男-->
                  <!--</div>-->
                  <!--<div class="right" data-sdid="n">女-->
                  <!--</div>-->
                <!--</div>-->
              <!--</li>-->
            </ul>
        </div>
        <!--收货地址弹出层列表-->
        <van-popup v-model="show" position="bottom">
          <van-area :area-list="areaList" title="地址选择"  @confirm="confirm" @cancel="closeArea"/>
        </van-popup>
        <!--表单结束-->
        <div id="u_update" class="u_update">
          <div class="u_update_btn" @click="saveUserInfo">保存</div>
        </div>
      </div>
      <div class="footer">
        <Footer></Footer>
      </div>
    </div>
</template>

<script>
  import  Header from "../common/HeaderComponent"
  import  Footer from "../common/FooterMessage"
  import {URL} from "@/assets/js/URL";
  import { Area, Popup,Toast,RadioGroup, Radio } from "vant"
  import area from "@/assets/js/area"
  export default {
        name: "UserInfoComponent",
      components:{
        Header,
        Footer,
        [Toast.name]:Toast,
        [Popup.name]:Popup,
        [Area.name]:Area,
        [RadioGroup.name]:RadioGroup,
        [Radio.name]:Radio,
      },
    data(){
          return{
            uId:"",//用户编号
            uName:"",//用户名
            uTel:"",//联系方式
            uDate:"",//出生日期
            uAddress:"",//地址
            uSex:"男",//性别,
            areaList:area,//地址列表
            show:false,
            domit:"",
            city:"",
            area:"",
            detailsAddress:"",
          }
    },
      mounted:function(){
        this.findUserInfo();
      },
      methods:{
        proup:function(){//弹出层
          if(!this.show){
            this.show=true;
          }else {
            this.show=false;
          }
        },
        findUserInfo:function () {//查询用户个人中心
          var userId=JSON.parse(localStorage.getItem("user")).cuno;//获取用户编号
          this.uId=userId;
          $.ajax({
            url:URL+"customeruser/selectlogin",
            type:"get",
            data:{cuno:userId},
            dataType:"json",
          }).done((data)=>{
            this.uName=data.data.cuname;
            this.uTel=data.data.cutel;
            this.uDate=data.data.cdatetime;
            this.uAddress=data.data.comit+"  "+data.data.city+"  "+data.data.carea
            this.detailsAddress=data.data.cuaddress;
          })
        },
        confirm:function (arr) {//获取收货地址并关闭弹层
          var areaList=[];//接收省市区
          $.each(arr,function (i,v) {
            areaList.push(v.name);
          })
          this.domit=areaList[0];
          this.city=areaList[1];
          this.area=areaList[2];
          this.uAddress=areaList[0]+"  "+areaList[1]+"  "+areaList[2];//使用地址弹出层之后获得地址
          this.detailsAddress=areaList[0]+""+areaList[1]+""+areaList[2];//地址选中之后方便用户
          this.show=false;
        },
        closeArea:function () {//关闭弹层
          this.show=false;
        },
        checkSex:function(event){
          this.uSex=$(event.target).data("sdid");
          //$(event.target).css("background",'url("../../assets/static_image/sex.png") 5% 48% no-repeat')
        },
        saveUserInfo:function () {//点击保存时，保存用户
          $.ajax({
            url:URL+"customeruser/updatecustomer",
            type:"post",
            data:{cuname:this.uName,cdatetime:this.uDate,cusex:this.uSex,
              comit:this.domit,city:this.city,carea:this.area,cuaddress:this.detailsAddress,cuno:this.uId},
          }).done((data)=>{
            if(data.code==1){
              Toast.success({
                message:"修改成功!",
                duration:1000,
              })
              this.findUserInfo();
            }
          })
        }
      }
    }
</script>

<style scoped>
  /*全局设置 end*/
.content {
  text-align: center;
  margin: 0 auto;
}
.order-nav {
  position: relative;
  background: #f5f5f5;
  padding: 15px;
  color: #414141;
  font-size: 19px;
  text-align: center;
  font-weight: bold;
  border-top: 1px solid #e1e1e1;
  border-bottom: 1px solid #e1e1e1;
}
.order-nav .back {
  position: absolute;
  left: 0;
  width: 19px;
  height: 30px;
  top: 5px;
  line-height: 45px;
  background: url(../../assets/static_image/MyInfo_back_01.png) no-repeat 100% 100%;
  background-size: 60% 60%;
}
  /*内容开始*/
.content ul {
  width: 100%;
  padding: 0;
  background: #FFFFFF;
  border-bottom: 1px solid #efefef;
}
.content ul li {
  width: 95%;
  height: 40px;
  display: block;
  list-style: none;
  border-bottom: 1px solid #efefef;
  line-height: 40px;
  font-size: 15px;
  color: #414141;
  margin-left: 5%;
  text-align: left;
}
  .content ul li input {
    width: 65%;
    border: 0;
    font-size: 14px;
    padding-left: 15px;
    color: #414141;
    background: none;
    display: inline-block;
    margin: 3px 0;
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
  .content ul li .u_dy {
    width: 56%;
    font-size: 10px;
    display: inline-block;
    margin-left: 56px;
  }
  .content ul li .u_dy div.left {
    float: left;
  }
  .content ul li .u_dy div.right {
    float: right;
  }
  .content ul li .u_dy div.cur {
    border: 1px solid #414141;
    color: #414141;
    background: url("../../assets/static_image/sex.png") 5% 48% no-repeat;
    background-size: auto 30%;
    text-align: center;
    font-weight: bold;
    height: 25px;
    border-radius: 4px;
  }
  .content ul li .u_dy div {
    width: 45%;
    height: 25px;
    border: 1px solid #626262;
    color: #626262;
    text-align: center;
    font-weight: bold;
    border-radius: 4px;
    margin-top: 5px;
    line-height: 25px;
    -webkit-appearance: none;
  }
  .tab_nav_start {
    background: url(../../assets/static_image/MyInfo_gotosite_01.png) no-repeat 95%;
    background-size: 3% auto;
  }
  .user_info_line {
    height: 10px;
    width: 100%;
    background: #f5f5f5;
  }
/*内容结束*/
.content .u_update {
  margin: 10px auto;
  width: 100%;
}
  .content .u_update .u_update_btn {
    font-size: 18px;
    width: 90%;
    height: 40px;
    line-height: 40px;
    position: relative;
    background: #838383;
    color: #fff;
    border-radius: 3px;
    display: block;
    margin: 0 auto;
  }
  .content .u_update .u_update_btn .u_update_btn_bj {
    position: absolute;
    top: -2px;
    left: -2px;
    width: 101.5%;
    height: 44px;
    background-color: rgba(0,0,0,0.2);
    display: none;
    border-radius: 2px;
  }
/*按钮end*/

</style>
