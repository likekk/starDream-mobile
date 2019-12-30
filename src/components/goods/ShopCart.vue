<template>
  <div>
    <!--头部公共部分-->
    <div class="header">
      <Header></Header>
    </div>
    <!--主内容区开始-->
    <div class="new_shop_car_content">
      <!--导航头-->
      <div class="m_order_nav">
        <div class="goback"><a href="javascript:history.back();"></a></div>
        购物车
      </div>
      <!--购物车列表-->
      <div class="shop_car_gx" id="cartList">
        <dl class="shop_car_gx_dl mui-table-view-cell" v-for="(obj,index) in CommodityList">
          <div class="mui-slider-right mui-disabled"></div>
          <div class="mui-slider-handle">
            <dt>
              <input type="checkbox" :alt="obj.shprice*obj.shsum" :data-value=obj.shsum  :value="obj.shid" checked="checked" name="check" @click="CheckByClicks($event)">
              <label></label>
            </dt>
            <dd class="shop_car_f">
              <a href="javascript:void(0)">
                <!--<img :src="require('../../assets/products/picture/'+obj.shpicute)">-->
                <img :src="url+'/list/images/products/picture/'+obj.shpicute">
              </a>
            </dd>

            <dd class="shop_car_price">
              <p>
                {{obj.shparameterone}}
                <br>
                {{obj.shparametertwo}} {{obj.shparameterthree}}
              </p>
              <div class="shop_car_count">
                <span class="count_reduce" @click="sub(obj.shid,obj.shsum)"></span>
                <input type="text" class="count_input" style="margin-top: 0" v-model="obj.shsum">
                <span class="count_add" @click="add(obj.shid,obj.shsum)"></span>
              </div>
            </dd>
            <dd class="removeShopping" @click="remove(obj.shid)">
              ×
            </dd>
            <p class="shop_price">¥{{obj.shprice*obj.shsum}}</p>
            <div style="clear:both"></div>
          </div>
        </dl>
      </div>
      <template v-if="CommodityList.length<=0">
      <!--当商品列表为空时，显示并提醒用户可以区购物-->
      <div id="nullcart" style="display:block">
        <p class="shop_car_word">
          购物袋还是空的哟
          <br>
          去挑选精美的礼品吧！
        </p>
        <div class="shop_car_btn">
          <input type="button" id="hang" value="去逛逛" @click="returnIndex()">
        </div>
      </div>
      </template>
      <p class="pro_rmtj">
        <span style="display: none">最近浏览</span>
      </p>
      <div class="zbj_dl">
        <div style="clear: both"></div>
      </div>
      <div class="shop_car_footer"></div>
    </div>
    <!--底部结算-->
    <div class="account" id="account">
      <div class="choice_all">
        <input type="checkbox" id="checkAllBtn" class="checkAll" checked="checked" @click="CheckAlls">
        <label for="checkAllBtn"></label>全选
      </div>
      <div class="choice_font">
        合计:<span style="margin-left: 5%" id="totalPrice">￥{{sum}}</span>
      </div>
      <div class="pay" id="payBtn" style="background: rgb(193, 12, 6);" @click="toBuy">
        去结算(<span id="proCount">{{ListNumber}}</span>)
      </div>
    </div>
  </div>
</template>

<script>
  import  Header from "../common/HeaderComponent";
  import FooterMessage from "../common/FooterMessage";
  import {URL} from "@/assets/js/URL";
  import { Toast } from 'vant';
  export default {
    name: "ShopCart",
    data(){
      return{
        CommodityList:[],//用于存放购物车中的商品信息
        url:URL,//服务器地址
      }
    },
    mounted:function(){
      this.getShoppingList();//初始化商品信息
    },
    components:{
      Header,
      FooterMessage,
    },
    computed:{
      sum:function () {//计算总价格
        var sums = 0;
        for (var i = 0;i < this.CommodityList.length;i++){
          sums+=parseInt(this.CommodityList[i].shsum*this.CommodityList[i].shprice);
        }
        return sums;
      },
      ListNumber:function () {//结算数量
        var sums = 0;
        for (var i = 0;i < this.CommodityList.length;i++){
          sums+=parseInt(this.CommodityList[i].shsum);
        }
        return sums;
      }
    },
    methods:{
      returnIndex:function(){
        this.$router.push({
          path:"/",
        })
      },
      //获取购物车数据
      getShoppingList:function () {
        var id=JSON.parse(localStorage.getItem("user")).cuno;//获取用户编号
        $.ajax({
          type:"get",
          url:URL+"shoppinggood/selectshopping",
          dataTye:"json",
          data:{cuno:id},
        }).done((data)=>{
          this.CommodityList=data.data;
        })
      },
      CheckAlls:function () {//全选和反选
        if ($("#checkAllBtn").prop("checked")==true){
          $("input[name=check]").each(function () {
            $("input[name=check]").prop("checked",true);
          })
        }else {
          $("input[name=check]").each(function () {
            $("input[name=check]").prop("checked",false);
          })
        }
        var sum = 0;
        var listNumber = 0;
        $("input[name=check]").each(function () {
          if ($(this).prop("checked")==true) {
            sum+=parseInt($(this).prop("alt"));
            listNumber+=parseInt($(this).attr("data-value"));
          }
        });
        $("#totalPrice").text("￥"+sum);
        $("#proCount").text(listNumber);
      },
      CheckByClicks:function (event) {//判断是否全选
        var sum = 0;
        var listNumber = 0;
        $(event.target).each(function (i,v) {
          if($(v).prop("checked")==false){
            $("#checkAllBtn").prop("checked",false);
          }else {
            $("#checkAllBtn").prop("checked",true);
          }
        });
        $("input[name=check]").each(function () {
          if ($(this).prop("checked")==true) {
            sum+=parseInt($(this).prop("alt"));
            listNumber+=parseInt($(this).attr("data-value"));
          }
        });
        $("#totalPrice").text("￥"+sum);
        $("#proCount").text(listNumber);
      },
      toBuy:function () {//结算获取id集合
        var ids=[];//存放购物车编号id;
        var check = $("input[name=check]");
        $(check).each(function () {
          if ($(this).prop("checked")==true){
            ids.push($(this).val());
          }
        })
       if(ids.length<=0){
         Toast.fail({
           message:"请勾选商品",
           duration:1000,
         })
         return false;
       }
       localStorage.setItem("shopCart",JSON.stringify(ids));//将购物车选中的编号放在本地存储
        this.$router.push({
          path:"/order/toBuy",
        })
      },
      remove:function (id) {//根据编号移除购物车中的信息
        $.ajax({
          url:URL+"shoppinggood/deleteShopCartById",
          type:"post",
          data:{id:id},
        }).done((data)=>{
          if(data.code==1){
            this.getShoppingList();
            Toast.success({
              message:"移除成功",
              duration:1000,
            })
          }
        })
      },
      add:function (id,count) {//购物车数量增加
        var sum = 0;
        var listNumber = 0;
        if(count>=3){
            Toast("商品超过最大购买限制!")
          return false;
        }
        $.ajax({
          url:URL+"shoppinggood/addCount",
          type:"get",
          data:{id:id},
        }).done((data)=>{})
        for (var i = 0;i<this.CommodityList.length;i++){
          if (id==this.CommodityList[i].shid&&this.CommodityList[i].shsum<10){
            this.CommodityList[i].shsum++;
            var checks = document.getElementsByName("check");
            for (var x=0;x<checks.length;x++) {
              if(checks[x].checked == true){
                listNumber+=this.CommodityList[x].shsum;
                sum+=this.CommodityList[x].shsum*this.CommodityList[x].shprice;
              }
            }
          }
        }
        if (sum>0){
          $("#totalPrice").text("￥"+sum);
          $("#proCount").text(listNumber);
        }
      },
      sub:function (id,count) {//购物车数量减少
        var sum = 0;
        var listNumber = 0;
          if(count<=1){
            Toast("亲，商品数量不能再少了!")
            return false;
          }
        $.ajax({
          url:URL+"shoppinggood/subCount",
          type:"get",
          data:{id:id},
        }).done((data)=>{})
        for (var i = 0;i<this.CommodityList.length;i++){
          if (id==this.CommodityList[i].shid&&this.CommodityList[i].shsum>1){
            this.CommodityList[i].shsum--;
            var checks = document.getElementsByName("check");
            for (var x=0;x<checks.length;x++) {
              if(checks[x].checked == true){
                listNumber+=this.CommodityList[x].shsum;
                sum+=this.CommodityList[x].shsum*this.CommodityList[x].shprice;
              }
            }
          }
        }
        if (sum>0){
          $("#totalPrice").text("￥"+sum);
          $("#proCount").text(listNumber);
        }
      }
    }
  }
</script>

<style scoped>
  .new_shop_car_content{
    max-width: 750px;
    /*测试用例*/
    /*padding-top: 80px;*/
    padding-top: 20px;
    margin: 0 auto;
  }
  .m_order_nav{
    position: relative;
    background: #f5f5f5;
    padding: 15px;
    font-size: 19px;
    font-weight: bold;
    text-align: center;
    border-top: 1px solid #e1e1e1;
    border-bottom: 1px solid #e1e1e1;
  }
  .goback{
    position: absolute;
    width: 19px;
    height: 27px;
    background: url("../../assets/static_image/left_arrow.png") no-repeat 0 23%;
    background-size: 55% 70%;
  }
  .m_order_nav a{
    display: block;
    width: 19px;
    height: 30px;
  }
  .new_shop_car_content .shop_car_gx_dl{
    width: 100%;
    height: 175px;
    position: relative;
    background: #FFFFFF;
    margin-top: 3%;
    padding: 0;
  }
  .mui-table-view-cell>.mui-slider-handle{
    position: relative;
    background-color: #fff;
  }
  .new_shop_car_content .shop_car_gx_dl dt{
    float: left;
    width: 20%;
    margin-top: 20%;
    box-sizing: border-box;
    text-align: center;
  }
  .new_shop_car_content .shop_car_gx_dl dt input{
    position: absolute;
  }
  .new_shop_car_content .shop_car_gx_dl dt>input{
    opacity: 0;
  }
  input[type=checkbox], input[type=radio]{
    box-sizing: border-box;
    padding: 0;
  }
  .new_shop_car_content .shop_car_gx_dl dt>input:checked+label{
    background-position: left bottom;
  }
  .new_shop_car_content .shop_car_gx_dl dt>label{
    width: 20px;
    height: 20px;
    /*background: red;*/
    display: inline-block;
    background: url("../../assets/static_image/check.png") no-repeat;
    background-size: 100% auto;
    border-radius: 50%;
  }
  .new_shop_car_content .shop_car_gx_dl .shop_car_f{
    width: 82px;
    height: 82px;
    border: 1px solid #aaaaaa;
    margin: 10% 0 0 0;
    text-align: center;
  }
  .new_shop_car_content .shop_car_gx_dl dd{
    float: left;
  }
  .new_shop_car_content .shop_car_gx_dl .shop_car_f img{
    width: auto;
    height: 100%;
  }
  .new_shop_car_content .shop_car_gx_dl .shop_car_price{
    margin-top: 9%;
    width: 40%;
    padding-left: 15px;
    box-sizing: border-box;
  }
  .new_shop_car_content .shop_car_gx_dl .shop_car_price p{
    font-weight: bold;
    font-size: 13px;
    line-height: 18px;
    height: 35px;
    color: #444;
  }
  .new_shop_car_content .shop_car_gx_dl .shop_car_price .shop_car_count{
    width: 70%;
    height: 30px;
    margin-top: 14%;
    border: 1px solid #aaaaaa;
  }
  .new_shop_car_content .shop_car_gx_dl .shop_car_price .shop_car_count .count_reduce{
    height: 31px;
    width: 30%;
    text-align: center;
    color: #444;
    float: left;
    display: block;
    line-height: 33px;
    border-right: 1px solid #aaaaaa;
    background: url("../../assets/static_image/jian.jpg") no-repeat 50% 45%;
    background-size: 40% auto;
  }
  input[type=text], input[type=password], input[type=number], input[type=tel], textarea{
    margin: 10px 0;
    border-radius: 3px;
    width: 100%;
    height: 35px;
    display: block;
    background: #e2e2df;
    border: 0;
    text-indent: 2%;
  }
  .new_shop_car_content .shop_car_gx_dl .shop_car_price .shop_car_count .count_input{
    width: 20%;
    height: 30px;
    line-height: 30px;
    color: #343434;
    text-align: center;
    z-index: 2;
    border: none;
    float: left;
    background: none;
    margin-top: 3px;
    font-size: 15px;
    padding: 0 0 0 9px;
  }
  .new_shop_car_content .shop_car_gx_dl .shop_car_price .shop_car_count .count_add{
    height: 31px;
    width: 30%;
    text-align: center;
    color: #444;
    float: right;
    display: block;
    line-height: 33px;
    border-left: 1px solid #aaaaaa;
    background: url("../../assets/static_image/jia.jpg") no-repeat 50% 45%;
    background-size: 40% auto;
  }
  .new_shop_car_content .shop_car_gx_dl .shop_price{
    position: absolute;
    right: 7%;
    top: 110%;
    color: #414141;
    font-size: 20px;
  }
  .removeShopping{
    display: block;
    height: 50px;
    width: 40px;
    font-size: 20px;
    position: absolute;
    right: 0;
    float: left;
    text-align: center;
    line-height: 40px;
  }
  /*空购物车样式开始*/
  .new_shop_car_content .shop_car_word{
    width: 80%;
    margin: 40% auto;
    height: 50px;
    text-align: center;
    line-height: 24px;
    font-size: 15px;
    color: #414141;
    font-weight: bold;
  }
  .new_shop_car_content .shop_car_btn{
    width: 90%;
    margin: 10% auto;
    height: 40px;
  }
  .new_shop_car_content .shop_car_btn input{
    height: 40px;
    width: 100%;
    text-align: center;
    color: #ffffff;
    font-size: 18px;
    background: #838383;
    outline: none;
    border: 0;
    font-weight: bold;
    border-radius: 2px;
  }
  /*空购物车结束*/
  .pro_rmtj{
    height: 40px;
    text-align: center;
    line-height: 60px;
    font-size: 18px;
    letter-spacing: 2px;
  }
  .zbj_dl{
    background: #f5f5f5;
    width: 100%;
    float: left;
  }
  .shop_car_footer{
    width: 100%;
    height: 60px;
    clear: both;
  }
  /*底部结算*/
  .account{
    position: fixed;
    bottom: 0;
    right: 0;
    height: 58px;
    width: 100%;
    background: #414141;
  }
  .account .choice_all{
    width: 20%;
    height: 58px;
    font-size: 14px;
    color: #ffffff;
    line-height: 58px;
    margin: 0 5%;
    font-weight: bold;
    padding-left: 2%;
  }
  .account div{
    float: left;
  }
  .account .choice_all>input{
    opacity: 0;
  }
  .account .choice_all>input:checked+label{
    background-position: left bottom;
  }
  .account .choice_all>label{
    width: 20px;
    height: 20px;
    background: red;
    display: inline-block;
    background: url("../../assets/static_image/check.png") no-repeat 0 1%;
    background-size: 100% auto;
    position: absolute;
    left: 5%;
    top: 20px;
    border-radius: 50%;
  }
  .account .choice_font{
    width: 40%;
    height: 58px;
    font-size: 14px;
    color: #ffffff;
    line-height: 58px;
    font-weight: bold;
  }
  .account .pay{
    width: 132px;
    height: 98px;
    background: #c10c06;
    font-size: 18px;
    color: #FFFFFF;
    text-align: center;
    line-height: 60px;
    cursor: pointer;
    position: absolute;
    right: 0;
  }
</style>
