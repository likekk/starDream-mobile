<template>
    <div>
      <div>
        <Header></Header>
      </div>
      <div class="content">
        <div>
          <van-row>
            <van-col span="24">
              <van-nav-bar title="注册账号" left-arrow   @click-left="onClickLeft">
              </van-nav-bar>
            </van-col>
          </van-row>
        </div>
        <div>
          <van-cell-group>
            <van-field
              placeholder="请输入11位数字的手机号"
              type="tel"
              v-model="regPhone"
              maxlength="11"
            />
            <van-field
              type="password"
              placeholder="请输入密码"
              v-model="regPwd"
              maxlength="20"
            />
            <van-field
              center
              placeholder="请输入短信验证码"
            >
              <van-button slot="button"  id="getCode" size="small" class="code" type="primary" style="background-color:#4c4c4c;border:#4c4c4c" @click="sendSms($event)">发送验证码</van-button>
            </van-field>
          </van-cell-group>
          <van-button  size="large" type="primary" style="background-color:#4c4c4c;border:#4c4c4c"  @click="userReg()">立即注册</van-button>
          <div class="m_reg_txt"><router-link to="/user/login">已有账号登录</router-link></div>
          <div class="" style="font-size:13px;color:#767676;text-align: left;padding:120px 0 0 20px;line-height: 18px;">
            立即领取50元优惠券
            <br>
            微信关注roseonly诺誓商城，激活成为会员即可领取
          </div>
        </div>
      </div>
      <div>
        <FooterMessage></FooterMessage>
      </div>
    </div>
</template>
<script>
  import {NavBar,Field,Row, Col,Icon,
    Button, CellGroup,Toast} from "vant"
  import Header from "../common/HeaderComponent"
  import FooterMessage from "../common/FooterMessage"
  import {URL} from "@/assets/js/URL";
  export default {
        name: "RegComponent",
      components:{
          [NavBar.name]:NavBar,
          [Field.name]:Field,
          [Row.name]:Row,
          [Col.name]:Col,
          [Icon.name]:Icon,
          [Button.name]:Button,
          [CellGroup.name]:CellGroup,
            Header,
          FooterMessage,
        [Toast.name]:Toast,
      },
      data(){
        return{
          regPhone:"",
          regPwd:"",
        }
      },
      methods:{
        onClickLeft:function () {//历史返回
          window.history.back();
        },
        userReg:function () {//用户注册
          if(this.regPhone==""||this.regPhone.length<0){
            Toast("请输入手机号码");
            return false;
          }
          if(this.regPwd==""||this.regPwd.length<0){
            Toast("请输入密码");
            return false;
          }
          var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;//校验手机号
          var patrn=/^(\w){6,20}$/;//校验密码
          if (!myreg.test(this.regPhone)) {
            Toast("手机格式错误")
            return false;
          }
          if (!patrn.exec(this.regPwd)) {
            Toast("只能输入6-20个字母、数字、下划线")
            return false
          }
          $.ajax({
            url:URL+"customeruser/insertcustomeruser",
            type:"post",
            data:{cutel:this.regPhone,cupwd:this.regPwd},
          }).done((data)=>{
            if(data.code==1){
              this.$router.push({
                name:"Login",
              })
            }
          })
        },
        sendSms:function (event) {//发送短信验证码
          //$(event.target)//获取当前j对象
          // $.ajax({
          //   url:URL+"customeruser/getCode",
          //   type:"post",
          //   data:{uTel:this.regPhone},
          // }).done(function (data) {
          //   console.log(data);
          // })
          // $("body").on("click",".code",function () {
          //   $.ajax({
          //     url:URL+"customeruser/getCode",
          //     type: "post",
          //     data: {uTel:"13169602935"},
          //   }).done(function (data) {
          //     if (data.code == 1) {
          //       var i =30;
          //       console.log(data.data);
          //       $("#getCode").removeClass("code");
          //       var time = setInterval(function () {
          //         if(i){
          //           $("#getCode").html("重新发送("+(i--)+")");
          //         }
          //        else {
          //           clearInterval(time);
          //           $("#getCode").addClass("code");
          //           $("#getCode").html("获取动态码")
          //         }
          //       },1000);
          //     }
          //   })
          // });
        }
      }
    }
</script>

<style scoped>
  .m_reg_txt{
    text-align: center;
    color: #014dae;
    font-size: 13px;
    padding-top: 10px;
  }
</style>
