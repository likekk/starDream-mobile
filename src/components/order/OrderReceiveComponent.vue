<template>
  <div>
    <div class="header">
      <Header></Header>
    </div>
    <div class="content">
      <div class="order-nav">
        <span class="back" @click="back()"></span>
        <span >待收货订单</span>
      </div>
      <div class="ui-refresh">
        <div class="orderList" >
          <ul>
            <template v-for=" (obj,index) in orderListArray">
              <li>
                <div class="order-num">
                  <b>订单号:{{obj.orderid}}</b>
                  <br>订单金额:
                  <span class="order-price"> ¥{{obj.ototalprice}}</span>
                  <a style="margin-top: -12.5px;padding: 0px 10px;" class="button red pay btnPay">付款</a>
                </div>
                <!-- 订单中商品列表 -->
                <template v-for=" (details, index) in obj.orderdetailList">
                  <!--noborder最后一个-->
                  <div class="order-pro">
                    <a href="javascript:void(0)" class="order-img">
                      <!--<img :src="require('../../assets/products/picture/'+details.detailpicture)" width="100px">-->
                      <img :src="url+'/list/images/products/picture/'+details.detailpicture" width="100px">
                    </a>
                    <router-link  :to="{path:'/order/OrderdetaLis',query:{id:obj.orderid}}" class="linkToOrderList">
                      <div class="order-pro-info">{{details.detailname}}
                        <span class="xt">x{{details.detailcount}} ¥ {{details.detailprice}}</span>
                        <br>
                        <span class="order-yhj"> </span>
                        <br>
                        <!--买赠的商品-->
                        <span class="order-date">下单时间:{{obj.odate}}</span>
                      </div>
                      <span class="arrow">
                      <img src="../../assets/static_image/orderlist03.png">
                    </span>
                    </router-link>
                  </div>
                </template>
              </li>
            </template>
          </ul>
        </div>
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
  export default {
    name: "OrderReceiveComponent",
    components:{
      Header,
      Footer,
    },
    data(){
      return{
        orderListArray:[],//订单信息表
        orderDetailArray:[],//订单商品表
        url:URL,//服务器路径
      }
    },
    mounted:function(){
      this.findAllOrder();
    },
    methods:{
      back:function () {//后退
        window.history.back();
      },
      findAllOrder:function () {//根据用户编号查询出全部的订单信息
        var status=this.$route.query.ostate;
        var id=JSON.parse(localStorage.getItem("user")).cuno;
        $.ajax({
          url:URL+"OrderInfo/findOrderByStatus",
          data:{status:status,userId:id},
          type:"get",
          dataTye:"json",
        }).done((data)=>{
          this.orderListArray=data.data;
        })
      }
    }
  }
</script>

<style scoped>
  *{
    margin: 0;
    padding: 0;
    font-size: 14px;
  }

  .content {
    margin:0 auto ;
    text-align: center;
    padding-top: 20px;
    /*调试*/
    /*padding-top: 80px;*/
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
    background: url(../../assets/static_image/orderlist01.png) no-repeat 100% 100%;
    background-size: 60% 60%;
  }

  .ui-refresh {
    position: relative;
  }

  .orderList li {
    padding: 10px 10px;
    background: #fff;
    margin: 10px 0;
  }

  .order-num {
    position: relative;
    min-height: 35px;
    line-height: 25px;
    border-bottom: 1px dashed #ccc;
    text-align: left;
  }

  .order-price {
    color: red;
  }

  .order-status, a.pay {
    position: absolute;
    right: 0px;
    top: 30%;
    height: 25px;

  }

  a.red {
    margin: 0 auto;
  }

  a.button {
    /* padding: 0 20px 0px 20px; */
    background: #838383;
    color: #fff;
    border-radius: 3px;
    display: block;
  }

  a {
    text-decoration: none;
  }

  .order-pro.noborder {
    border-bottom: none;
  }
  .order-pro {
    position: relative;
    min-height: 80px;
    padding: 10px 0;
    border-bottom: 1px dotted #ccc;
  }

  .order-pro .order-img {
    display: inline-block;
    position: absolute;
    left: 0;
    top: 10px;
    width: 100px;
    overflow: hidden;
    max-height: 100px;
  }
  a {
    color: #414141;
  }
  a {
    text-decoration: none;
  }

  .order-pro .order-img img {
    height: 90px;
    width: auto;
  }

  .order-pro .order-pro-info {
    margin: 0 15px 0 110px;
    text-align: left;
  }

  .order-date, .order-yhj {
    color: #999;
    font-size: 12px;
  }

  .arrow {
    display: block;
    height: 45px;
    line-height: 45px;
    font-weight: normal;
    font-size: 16px;
    position: absolute;
    right: 0;
    top: 50%;
    width: 45px;
    text-align: right;
    margin-top: -22.5px;
    color: #999;
  }

  .arrow img {
    height: 40%;
  }
  li img {
    width: auto;
  }

</style>


