<template>
    <div>
        <div class="Header">
            <Header></Header>
        </div>
        <div class="content">
          <div class="user">
            <div class="order-nav">
              <span class="back" onclick="javascript:history.back();"></span>
              修改登录密码
            </div>
          </div>
          <div class="content-inner">
            <form id="userPwdForm">
              <dl>
                <dd>
                  <input name="oldpass" type="password"  v-model="oldPassword" id="oldpass" maxlength="50" class="text_input" placeholder="旧密码">
                  <div class="checkRes">请输入旧密码</div>
                </dd>
                <dd>
                  <input name="userpass" type="password" v-model="newPassword" id="userpass" placeholder="新密码" maxlength="50" class="text_input">
                  <div class="checkRes">请输入新密码</div>
                </dd>
                <dd>
                  <input name="newpass" type="password"  v-model="surePassword" class="text_input" id="newpass" placeholder="确认新密码">
                  <div class="checkRes">请输入新密码</div>
                </dd>
              </dl>
            </form>
            <div class="mt20" style="text-align: center;">
              <a class="button red" id="btnUpdate" style="height:40px;line-height:40px" @click="updatePwd">修改</a>
            </div>
          </div>
        </div>
        <div class="footer">
          <Footer></Footer>
        </div>
    </div>
</template>

<script>
    import Header from "../common/HeaderComponent"
    import  Footer from "../common/FooterMessage"
    import {Toast} from "vant"
    import {URL} from "../../assets/js/URL";
    export default {
        name: "UpdatePersonalPwd",
        components:{
          Header,
          Footer,
          [Toast.name]:Toast,
        },
      data(){
        return{
          oldPassword:"",
          newPassword:"",
          surePassword:"",
        }
      },
      methods:{
        updatePwd:function () {
          var userId=JSON.parse(localStorage.getItem("user")).cuno;//获取用户编号
          if(this.oldPassword.length<=0&&this.oldPassword.length==""){
            Toast.fail({
              message:"请输入旧密码"
            })
            return false;
          }
          if(this.newPassword.length<=0&&this.newPassword.length==""){
            Toast.fail({
              message:"请输入新密码"
            })
            return false;
          }
          if(this.surePassword.length<=0&&this.surePassword.length==""){
            Toast.fail({
              message:"请确认密码"
            })
            return false;
          }
          if(this.newPassword!=this.surePassword){
            Toast.success({
              message:"两次密码不一致"
            })
            return false;
          }
          $.ajax({
            url:URL+"customeruser/updatepassword",
            type:"post",
            data:{cuno:userId,cupwd:this.surePassword},
          }).done((data)=>{
              if(data.code==1){
                Toast.success({
                  message:"修改成功",
                  duration:1000
                })
                this.oldPassword="";
                this.newPassword="";
                this.surePassword="";
              }else {
                Toast.fail({
                  message:"修改失败",
                  duration:1000
                })
              }
          })
        }
      }
    }
</script>

<style scoped>
  body, div, p, ul, li, table, tbody, tr, td, textarea, form, input, h1, h2, h3, h4, h5, dl, dt, dd, img, iframe, header, nav, section, article, footer, figure, figcaption, menu {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  a {
    text-decoration: none;
    color: #3174c7;
  }
  /*全局设置 end*/
  .content {
    padding-top: 20px;
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
  .content-inner {
    margin: 20px 5px;
    text-align: left;
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
  .checkRes {
    color: #CC212C;
    display: none;
  }
  .mt20 {
    margin-top: 20px;
  }a.red {
     margin: 0 auto;
   }

  a.button {
    /* padding: 0 20px 0px 20px; */
    background: #838383;
    color: #fff;
    border-radius: 3px;
    display: block;
  }
  .red {
    color: #CC212C;
  }

</style>
