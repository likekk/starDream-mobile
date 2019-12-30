<template>
    <div>
      <div class="header">
        <Header></Header>
      </div>
      <div class="content">
        <div class="order-nav">
          <span class="back" @click="back()"></span>
          订单详情
        </div>
        <div id="orderDetail">
          <div class="order-detail">
            <template v-for="(obj,index) of orderDetailsArrays">
            <div class="part">
              <p>订单号:{{obj.orderid}}
                <br>订单金额: ¥
                <label id="lbl_amount">{{obj.ototalprice}}</label>
                <br>
                下单时间: {{obj.odate}}
                <br>
                支付方式: 在线支付
                <br>
                <template v-if="obj.ostate=='1'">
                  订单状态: 等待付款
                </template>
                <template v-if="obj.ostate=='2'">
                  订单状态: 等待收货
                </template>
                <template v-if="obj.ostate=='4'">
                  订单状态: 交易关闭
                </template>
                <template v-if="obj.ostate=='3'">
                  订单状态: 交易成功
                </template>
              </p>
            </div>
                <template v-if="(obj.ostate=='1')">
                <a class="button red pay btnPay" style="width:85%;" href="javascript:void(0)">去付款</a>
                </template>
              <template v-if="(obj.ostate=='2')">
                <a class="button red pay btnPay" style="width:85%;" href="javascript:void(0)">已付款</a>
              </template>
              <template v-if="(obj.ostate=='4')">
                <a class="button red pay btnPay" style="width:85%;" href="javascript:void(0)">已失效</a>
              </template>
              <template v-if="obj.ostate=='3'">
                <a class="button red pay btnPay" style="width:85%;" href="javascript:void(0)">去评价</a>
              </template>
            </template>
            <template v-for="(obj, index) in orderDetailsArrays">
            <div class="part" v-for="(details,index) in obj.orderdetailList">
              <div class="pro">
                <a class="wg_o_name" href="javascript:void(0)">
                  <!--<img :src="require('../../assets/products/picture/'+details.detailpicture)" alt="">-->
                  <img :src="url+'/list/images/products/picture/'+details.detailpicture">
                  <div class="pro-info">
                    名称:{{details.detailname}}
                    <br>
                    <!--买赠的商品-->
                    数量:{{details.detailcount}}
                    <br>
                    单价: ¥ {{details.detailprice}}
                    <br>
                  </div>
                </a>
                <p class="clear"></p>
              </div>
              <div class="pro-ctime">
                <h5>送达日期:</h5>
                <span >{{details.otaketime}}</span>
                <p class="clear"></p>
              </div>
              <div class="pro-address">
                <h5>配送地址:</h5>
                <span>
                  {{obj.deliveryaddress.cdname}} {{obj.deliveryaddress.cdphone}}
                  <br>
                  {{obj.deliveryaddress.cdaddress}}
                </span>
                <p class="clear"></p>
              </div>
              <div class="pro-other">
                <h5>配送方式:</h5>
                <span>快递运输  (免运费)</span>
                <p class="clear"></p>
              </div>
              <div class="pro-other last" style="position: relative;">
                  <h5>爱的留言:</h5>
                  <span>
                    Dear:
                    <br>
                    爱的留言:
                    <br>
                    签名:
                  </span>
                  <span class="arrow">
                    <img src="../../assets/static_image/orderlist03.png">
                  </span>
                <p class="clear"></p>
              </div>
            </div>
            </template>
            <template v-for="(obj,index) in orderDetailsArrays">
            <div class="mt20 mb10 tc" style="margin-top:10px">
              <template v-if="obj.ostate=='1'">
              <a href="javascript:void(0)" class="link btnCancelOrder" @click="cancelOrder(obj.orderid)">取消订单</a>
              </template>
              <template v-if="obj.ostate=='2'">
                <a href="javascript:void(0)" class="link btnCancelOrder" @click="getOrder(obj.orderid)">确认收货</a>
              </template>
              <template v-if="obj.ostate=='3'">
                <a href="javascript:void(0)" class="link btnCancelOrder">已收货</a>
              </template>
              <template v-if="obj.ostate=='4'">
                <a href="javascript:void(0)" class="link btnCancelOrder">已关闭</a>
              </template>
            </div>
            </template>
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
  import {Toast,Dialog} from "vant"
  import {URL} from "../../assets/js/URL";
  export default {
        name: "OrderdetalisComponent",
      components:{
        Header,
        Footer,
        [Toast.name]:Toast,
        [Dialog.name]:Dialog,
      },
      data(){
          return{
              orderDetailsArrays:[],//订单详情数组
            url:URL,//服务器路径
          }
      },
      mounted:function(){
          this.findOrderDetailsByOrderId();
      },
      methods:{
          back:function () {
            window.history.back();
          },
        findOrderDetailsByOrderId:function () {//根据订单编号查询订单详情
          var orderId=this.$route.query.id;
          $.ajax({
            url:URL+"OrderInfo/findOrderDetailsById",
            type:"get",
            data:{orderId:orderId},
            dataType:"json"
          }).done((data)=>{
            this.orderDetailsArrays=data.data;
            console.log(this.orderDetailsArrays);
          })
        },
        cancelOrder:function (id) {//取消订单
            $.ajax({
              url:URL+"OrderInfo/updateStatus",
              type:"post",
              data:{orderId:id},
            }).done((data)=>{
              if(data.code==1){
                Toast.success({
                  message:"已取消",
                })
                this.findOrderDetailsByOrderId();
              }
            })
        },
        getOrder:function (id) {//签收订单
          $.ajax({
            url:URL+"OrderInfo/receiveOrder",
            type:"post",
            data:{orderId:id},
          }).done((data)=>{
            if(data.code==1){
              Toast.success({
                message:"已收货"
              })
              this.findOrderDetailsByOrderId();
            }
          })
        }
      },
    }
</script>

<style scoped>
  .content {
    background: #f5f5f5;
    text-align: left;
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
    background: url(../../assets/static_image/orderlist01.png) no-repeat 100% 100%;
    background-size: 60% 60%;
  }

  .order-detail .part {
    margin: 10px 0;
    background: #fff;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    padding: 10px 0 10px 10px;
  }

  p {
    padding: 0;
    margin: 0;
  }

  a.pay, a.btnSeeWay {
    padding: 8px 10px;
    text-align: center;
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

  .order-detail .part {
    margin: 10px 0;
    background: #fff;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    padding: 10px 0 10px 10px;
  }

  .order-detail .pro {
    position: relative;
    min-height: 80px;
    padding: 10px 0;
    border-bottom: 1px solid #efefef;
  }

  a {
    color: #414141;
  }

  .order-detail .pro img {
    position: absolute;
    top: 0px;
    height: 90px;
  }

  .order-detail .pro .wg_o_name .pro-info {
    background: url(../../assets/static_image/orderlist03.png) no-repeat right;
    background-size: 12px;
    background-position-x: 96%;
  }

  .order-detail .pro .pro-info {
    width: 70%;
    float: right;
    padding-right: 30px;
    box-sizing: border-box;
  }

  .clear {
    clear: both;
  }

  .order-detail .pro-wl, .order-detail .pro-ctime, .order-detail .pro-address, .order-detail .pro-other {
    padding: 10px 0;
    border-bottom: 1px solid #efefef;
  }
  .pro-ctime, .pro-other {
    height: 30px;
  }

  .order-detail .part h5 {
    float: left;
    font-size: 14px;
  }

  .order-detail .part span {
    float: right;
    width: 65%;
    margin-right: 5%;
  }

  .order-detail .last {
    border-bottom: 0;
    height: initial;
  }
  .order-detail .pro-wl, .order-detail .pro-ctime, .order-detail .pro-address, .order-detail .pro-other {
    padding: 10px 0;
    border-bottom: 1px solid #efefef;
  }
  .last {
    height: 40px;
  }
  .pro-ctime, .pro-other {
    height: 30px;
  }

  .order-detail .part h5 {
    float: left;
    font-size: 14px;
  }

  .order-detail .part span {
    float: right;
    width: 65%;
    margin-right: 5%;
  }
  .arrow {
    display: block;
    height: 45px;
    line-height: 45px;
    font-weight: normal;
    font-size: 16px;
    position: absolute;
    right: 10px;
    top: 50%;
    width: 45px;
    text-align: right;
    margin-top: -22.5px;
    color: #999;
  }

  .arrow img {
    height: 40%;
    margin-top: 20px;
  }

  .tc {
    text-align: center;
  }
  .mb10 {
    margin-bottom: 10px;
  }
  .mt20 {
    margin-top: 20px;
  }

  a.link {
    background: #838383;
    width: 85%;
    display: block;
    color: #fff;
    margin: 0 auto;
    padding: 8px 10px;
    border-radius: 3px;
  }





















































































































</style>
