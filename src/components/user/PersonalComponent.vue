<template>
    <div>
        <!--顶部公共导航-->
        <div class="header">
          <van-row>
            <van-col span="24">
              <Header></Header>
            </van-col>
          </van-row>
        </div>
        <!--主内容区开始-->
        <div class="content">
          <div class="order-nav">
            <span class="back" onclick="history.back()"></span>个人中心
          </div>
          <div class="contentbg" style="margin-top: 3%">
            <div class="userinfo">
              <div class="fl">
                <p class="username">账户：<span id="username">{{loginPhone}}</span></p>
              </div>
            </div>
            <div class="userdiv">
              <div class="user">
                <van-row class="user-links">
                  <van-col span="6">
                    <van-icon name="pending-payment" @click="linkToOrderPay"/>
                    待支付
                  </van-col>
                  <van-col span="6">
                    <van-icon name="logistics" @click="linkToOrderReceive"/>
                    待收货
                  </van-col>
                  <van-col span="6">
                    <van-icon name="debit-pay" @click="linkToOrderClose"/>
                    已收货
                  </van-col>
                  <van-col span="6">
                    <van-icon name="orders-o"  @click="linkToOrderList"/>
                    全部
                  </van-col>
                </van-row>
              </div>
            </div>
            <div class="list_type">
              <van-row>
                <van-col span="24">
                  <van-cell-group class="user-group">
                    <van-cell icon="records" title="我的纪念日" is-link  to=""/>
                  </van-cell-group>
                  <van-cell-group class="user-group">
                    <van-cell icon="exchange" title="我的信息" is-link to="/user/UserInfomation"/>
                  </van-cell-group>
                  <van-cell-group class="user-group">
                    <van-cell icon="gold-coin" title="收货地址管理" is-link  to="/user/Address"/>
                  </van-cell-group>
                  <van-cell-group class="user-group">
                    <van-cell icon="gift" title="修改登录密码" is-link  to="/user/UpdatePersonalPwd"/>
                  </van-cell-group>
                  <van-cell-group class="user-group">
                    <van-cell icon="gift" title="我的评价" is-link />
                  </van-cell-group>
                </van-col>
              </van-row>
            </div>
            <div class="mt20"></div>
            <div class="mt20">
              <van-button size="large" @click="userQuit()">退出登录</van-button>
            </div>
          </div>
        </div>
      <!--底部公共消息-->
      <div>
        <FooterMessage></FooterMessage>
      </div>
    </div>
</template>

<script>
  import { Row, Col, NavBar,Icon, Cell, CellGroup,Button,Toast } from 'vant';
  import Header from "../common/HeaderComponent"
  import FooterMessage from "../common/FooterMessage"
    export default {
        name: "PersonalComponent",
        components:{
          Header,
          [Row.name]:Row,
          [Col.name]:Col,
          [NavBar.name]:NavBar,
          [Icon.name]: Icon,
          [Cell.name]: Cell,
          [CellGroup.name]: CellGroup,
          [Button.name]:Button,
          FooterMessage,
          [Toast.name]:Toast,
        },
      data(){
        return{
          loginPhone:"",
        }
      },
      mounted:function(){//初始化获取用户信息
        this.loginPhone=JSON.parse(localStorage.getItem("user")).cutel;//获取用户联系方式
      },
      methods:{
        linkToOrderList:function () {//路由链接到订单
          this.$router.push({
            path:"/order/OrderList",
          })
        },
        linkToOrderPay:function(){
          this.$router.push({
            path:"/order/orderPay",
            query:{ostate:1}
          })
        },
        linkToOrderReceive:function(){
         this.$router.push({
           path:"/order/orderReceive",
           query:{ostate:2}
         })
        },
        linkToOrderClose:function(){
         this.$router.push({
           path:"/order/orderClose",
           query:{ostate:3}
         })
        },
        userQuit:function () {//用户退出
          //清除本地存储
          localStorage.removeItem("user");
          Toast.success({
            message:"操作成功!",
            duration:3000,
          })
          this.$router.push({
            path:"/",
          })
        }
      }
    }
</script>

<style scoped>
.content{
  padding-bottom: 0;
  background: #f6f6f6;
  text-align: left;
}
.order-nav{
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
.order-nav .back{
  position: absolute;
  left: 0;
  width: 19px;
  height: 30px;
  top: 5px;
  line-height: 45px;
  background: url("../../assets/static_image/left_arrow.png") no-repeat 100% 100%;
  background-size: 60% 60%;
}
  .userinfo{
    padding: 12px 14px;
    line-height: 18px;
    background-color: #fff;
  }
  .userdiv{
  background: #fff;
  margin: 0 0 10px;
  position: relative;
  border-top: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
  overflow: hidden;
}
  .user-group {
   margin-bottom:2px;
 }
  .van-icon {
    display: block;
    font-size: 30px;
  }
  .user-links {
    padding: 15px 0;
    text-align: center;
    background-color: #fff;
  }
  .mt20{
    margin-top: 20px;
  }
  .van-button{
    background: #838383;
    color: #fff;
    border-radius: 3px;
  }
</style>
