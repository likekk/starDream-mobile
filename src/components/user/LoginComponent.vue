<template>
    <div>
      <div>
        <van-row>
          <van-col span="24">
            <Header></Header>
          </van-col>
        </van-row>
      </div>
      <div class="content">
        <van-row>
          <van-col span="24">
            <van-nav-bar title="用户登录" left-arrow   @click-left="onClickLeft">
            </van-nav-bar>
          </van-col>
        </van-row>
        <van-tabs color="rgb(76,76,76)">
          <van-tab title="手机密码登录">
            <van-cell-group>
              <van-field
                placeholder="请输入手机号"
                v-model="userName"
              />
              <van-field
                type="password"
                placeholder="请输入密码"
                v-model="userPwd"
              />
              <van-button size="large" type="primary" style="background: #4c4c4c;border:1px solid #4c4c4c"  @click="userLogin()">立即登录</van-button>
            </van-cell-group>

          </van-tab>
          <van-tab title="手机短信登录">

            <van-cell-group>
              <van-field
                placeholder="请输入11位数字的手机号码"
                type="tel"
              />
              <van-field
                center
                placeholder="请输入短信验证码"
              >
                <van-button slot="button" size="small" type="primary" style="background: #4c4c4c;border:1px solid #4c4c4c">发送验证码</van-button>
              </van-field>
              <van-button size="large" type="primary" style="background: #4c4c4c;border:1px solid #4c4c4c">立即登录</van-button>
            </van-cell-group>
          </van-tab>
        </van-tabs>
        <div class="m_login_q">
          <div>
            <router-link to="/user/reg">快速注册</router-link>
          </div>
        </div>
        <div class="" style="font-size:13px;color:#767676;text-align: left;padding:120px 0 0 20px;line-height: 18px;">
          立即领取50元优惠券
          <br>
          微信关注roseonly诺誓商城，激活成为会员即可领取
        </div>
      </div>
      <FooterMessage></FooterMessage>
    </div>
</template>
<script>
  import {NavBar,Field,Row, Col,Icon,Button,
    CellGroup,Tab, Tabs,Toast } from "vant"
  import {URL} from "@/assets/js/URL";
  import Header from "../common/HeaderComponent"
  import FooterMessage from "../common/FooterMessage"
    export default {
        name: "LoginComponent",
      components:{
        [NavBar.name]:NavBar,
        [Field.name]:Field,
        [Row.name]:Row,
        [Col.name]:Col,
        [Icon.name]:Icon,
        [Button.name]:Button,
        [CellGroup.name]:CellGroup,
        [Tabs.name]:Tabs,
        [Tab.name]:Tab,
        Header,
        FooterMessage,
        [Toast.name]:Toast,
      },
      data(){
        return{
          userName:"",
          userPwd:"",
        }
      },
      methods:{
        onClickLeft:function () {
          window.history.back();
        },
        userLogin:function () {
          if(this.userName==""||this.userName.length<0){
            Toast.fail({
              message:"请输入手机号",
              duration:500
            })
            return false;
          }
          // var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;//校验手机号
          // var patrn=/^(\w){6,20}$/;//校验密码
          // if (!myreg.test(this.regPhone)) {
          //   Toast("手机格式错误")
          //   return false;
          // }
          if(this.userPwd==""||this.userPwd.length<0){
            Toast.fail({
              message:"请输入密码"
            })
            return false;
          }
          // if (!patrn.exec(this.regPwd)) {
          //   Toast("只能输入6-20个字母、数字、下划线")
          //   return false
          // }
          $.ajax({
            url:URL+"customeruser/selectcustomer",
            type:"post",
            data:{cutel:this.userName,cupwd:this.userPwd},
          }).done((data)=>{
              if(data.data!=null){
                localStorage.setItem("user",JSON.stringify(data.data));//将用户信息保存在本地存储中
                this.$router.push({
                  name:"Personal"
                })
              }else {
                Toast("账号或密码错误!")
              }
          })
        }
      }
    }
</script>

<style scoped>
  .m_login_q{
    margin-top: 10px;
    text-align: center;
  }

</style>
