<template>
    <div>
      <van-row>
        <van-col span="24">
          <div id="top_logo" class="con">
            <router-link to="/" class="top_rose"></router-link>
            <a href="javascript:void(0)" class="top_love"></a>
          </div>
          <div id="slide" class="slide_rose">
            <div class="nav_logo"></div>
            <div class="nav_btn">
              <!--<a href="javascript:void(0)">-->
                <!--<span class="cur_nav"></span>-->
              <!--</a>-->
            </div>
            <p id="moveDiv" class="moveDiv_rose" @click="LinkToShopCart">
          <span>
            <i class="moveDiv_mark" id="cartProCount"  style="display:none;font-style:normal;"></i>
          </span>
            </p>
            <p id="btn_center" class="btn_rose" @click="LinkToUserInfo"></p>
            <!--<div class="div_lang">-->
              <!--<div class="div_CN">CN</div>-->
            <!--</div>-->
          </div>
        </van-col>
      </van-row>
    </div>
</template>

<script>
  import { Row, Col } from 'vant';
    export default {
        name: "HeaderComponent",
      components:{
          [Row.name]:Row,
          [Col.name]:Col,
      },
      methods:{
        LinkToUserInfo:function () {
          if(localStorage.getItem("user")==null){//判断本地session是否为空
            this.$router.push({
              name:"Login"
            })
            return false;
          }else {
            this.$router.push({
              path:"/user/Personal"
            })
          }
        },
        LinkToShopCart:function () {
          if(localStorage.getItem("user")==null){//判断本地存储是否为空
            this.$router.push({
              name:"Login"
            })
            return false;
          }else {
            this.$router.push({
              path:"/goods/ShopCart"
            })
          }
        }
      }
    }
</script>

<style scoped>
  #top_logo{
    width: 100%;
    height: 40px;
    position: fixed;
    top: 0;
    z-index: 999;
  }
  .top_rose{
    width: 50%;
    height: 40px;
    background: url("../../assets/static_image/logo_1.svg") no-repeat center center #414141;
    background-size: auto 55%;
    cursor: pointer;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    margin: 0 auto;
    float: left;
  }
  .top_love{
    width: 50%;
    height: 40px;
    background: url("../../assets/static_image/logo_2.svg") no-repeat center center #fbefef;
    background-size: auto 90%;
    cursor: pointer;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    margin: 0 auto;
    float: right;
  }
  .slide_rose{
    clear: both;
    width: 100%;
    position: fixed;
    top: 40px;
    left: 0;
    background-size: 100% 100%;
    z-index: 999;
    background: #414141;
  }
  .nav_logo{
    height: 40px;
    padding-right: 0px;
    text-align: center;
    line-height: 65px;
  }
  .nav_btn{
    display: inline-block;
    width: 100px;
    height: 40px;
    opacity: initial;
    position: absolute;
    top: 0;
  }
  .cur_nav, .hover_nav{
    position: relative;
    display: inline-block;
    height: 4px;
    width: 20px;
    top: 6px;
    margin-left: 15%;
  }
  .cur_nav:before{
    transition: All 0.5s ease-in-out;
    transform: translateY(-200%);
    -webkit-transform: translateY(-200%);
  }
  .cur_nav:before, .cur_nav:after,
  .hover_nav:before, .hover_nav:after{
    position: absolute;
    content: "";
    background-color: #fff;
    height: 50%;
    width: 100%;
  }
  .slide_rose .moveDiv_rose{
    width: 20px;
    height: 100%;
    line-height: 60px;
    position: absolute;
    top: -6.5px;
    background: url("../../assets/static_image/mycart.png")no-repeat center 75%;
    background-size: 100%;
    left: 82%;
  }
  #wrapper_nav p span{
    display: block;
    width: 100%;
    height: 100%;
    position: relative;
  }
  .moveDiv_mark{
    width: 100%;
    height: 14px;
    border-radius: 50%;
    position: absolute;
    top: 29px;
    line-height: 12px;
    color: #fff;
    font-size: 14px;
    text-align: center;
  }
  .slide_rose .btn_rose{
    width: 18px;
    height: 100%;
    line-height: 60px;
    position: absolute;
    top: -6.5px;
    background: url("../../assets/static_image/user.png")no-repeat center 76%;
    background-size: 105%;
    left: 73%;
  }
  .slide_rose .div_lang, .slide_rose .div_lang ul li a{
    color: #ffffff;
  }
  .div_lang{
    width: 15%;
    height: 100%;
    position: absolute;
    top: 10.5px;
    right: 0;
    font-size: 15px;
    font-family: "weiruanyahei";
    text-align: center;
  }
</style>
