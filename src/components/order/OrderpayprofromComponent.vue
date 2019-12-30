<template>
    <div>
      <div id="header">

        <div id="slide">
          <div class="nav_back"></div>
          <div class="nav_logo" @click="back()">
            <img src="../../assets/static_image/nav_logo_03.png">
          </div>
          <div class="nav_btn" style="display:none;">
            <a href="javascript:void(0)">
              <span class="cur_nav"></span>
            </a>
          </div>
          <p id="moveDiv" style="display:none;">
            <span>
            	<img src="../../assets/static_image/nav_car_cur.png" alt="">
                <i class="moveDiv_mark" id="cartProCount" style="display:block;font-style:normal;"></i>
            </span>
          </p>
          <p id="btn_center" style="left:82%;display:none;">
            <img id="btn_myinfo" src="../../assets/static_image/nav_orde_01.png" alt="">
          </p>
        </div>
      </div>

      <div id="div_order" class="content">
    <!-- 导航头 -->
    <div class="m_order_nav">确认订单</div>
    <div id="orderCon">
      <template v-for="(obj,index) of shopCartArray">
      <div class="m_order_item">
        <div class="item_content">
          <div class="item_left">
            <!--<img :src="require('../../assets/products/picture/'+obj.shpicute)">-->
            <img :src="url+'/list/images/products/picture/'+obj.shpicute">
          </div>
          <div class="item_right">
            <div class="o_info" >{{obj.shparameterone}}-{{obj.shparametertwo}}-{{obj.shparameterthree}}</div><!-- 需动态-->
            <div class="o_all">
              <span class="o_price">¥{{obj.shprice}}</span><!-- 需动态-->
              <span class="o_count">x{{obj.shsum}}</span><!-- 需动态-->
            </div>
          </div>
        </div>
        <div class="m_order_info">
          <!-- 收货人方式 -->
          <div   class="m_consignee">
            <div class="l_name">
              收件人：{{receiveName}} {{receivePhone}}
            </div><!-- 需动态-->
            <div class="add_name">
              {{receiveProvince}} {{receivecity}} {{receivearea}} {{receiveAddress}}
            </div><!-- 需动态-->
            <div class="info_img" @click="linkToUpdateAddress">
              <img src="../../assets/static_image/go_03.png">
            </div>
          </div>
          <!-- 送达方式 -->
          <!-- 送达时间 -->
          <div class="m_set_time">
            <div class="m_set_time_con">
              <div class="demo-cont">
                请选择送达时间
              </div>
            </div>
            <div  class="m_set_time_sign" @click="popup">
              <img src="../../assets/static_image/date_03.png">
            </div>
          </div>
          <!-- 临时商品描述 -->
        </div>
      </div>
      </template>
      <!--时间显示弹出层-->
      <van-popup v-model="show" position="bottom">
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          title="送达日期"
          @confirm="closeTimer"
          @change="getTime"
          @cancel="cancelTime"
        />
      </van-popup>
    </div>
    <!-- 爱的留言 -->
    <div class="m_less">
        <div class="m_less_tit">
            祝福语留言
        </div>
        <div class="m_less_con">
            <div><img src="../../assets/static_image/order_less_code.png"></div>
            <div>送礼物前留下你的专属真爱誓言！微信搜索roseonly诺誓商城，或长按保存微信打开。</div>
        </div>
    </div>
    <!-- 支付方式 -->
    <div class="m_pay">
        <div class="m_pay_type">
            <span>支付方式</span><span>在线支付</span>
        </div>
    </div>
    <!-- 优惠券 -->
    <div id="couponDetail" class="m_discount" style="display: block; transform-origin: 0px 0px 0px; opacity: 1; transform: scale(1, 1);">
        <div class="m_choose m_right" data-type="0" type="1">
            <div class="m_choose_name">
                请选择优惠券:<span id="coupon"></span>
            </div>
        </div>
    </div>
    <!-- 礼品卡 -->
    <div id="div_giftcard" class="m_discount" style="display: block; transform-origin: 0px 0px 0px; opacity: 1; transform: scale(1, 1);">
        <div class="m_choose m_right" type="1">
            <div class="m_choose_name">
                礼品卡:<span id="sp_gift"></span>
            </div>
        </div>
    </div>
    <!-- 底部结算 -->
    <div id="account" class="account">
      <div class="money_all">
        <ul>
          <li class="jz">实付款:¥{{total}}</li><!-- 需动态-->
          <li>商品总额:¥<span id="totalPrice">{{total}}</span></li><!-- 需动态-->
        </ul>
        <ul>
          <li >含运费:¥0</li><!-- 需动态-->
          <li>优惠券:¥0</li><!-- 需动态-->
        </ul>
      </div>
      <div  class="pay" @click="payOrder">提交订单</div>
    </div>
</div>
    </div>
</template>

<script>
  import { DatetimePicker,Popup,Button} from 'vant';
  import {URL} from "@/assets/js/URL";
  export default {
        name: "OrderpayprofromComponent",
        data(){
          return{
            shopCartArray:[],//购物车数组
            show:false,
            currentDate: new Date(),
            //获取收获地址信息
            receiveName:"",//收件人姓名
            receiveProvince:"",//省份
            receivecity:"", //市区
            receivearea:"", //地区
            receiveAddress:"",//详细地址
            receivePhone:"",//收件人联系方式
            receiveEmail:"",//收件人邮编
            receiveId:"",//收件人编号
            userId:"",//用户编号
            url:URL,//服务器路径
          }
        },
      components:{
        [DatetimePicker.name]:DatetimePicker,
        [Popup.name]:Popup,
        [Button.name]:Button,
      },
        mounted:function(){//初始化的时候渲染数据
          this.findShopCartGoods();
          this.findAddressById();
        },
        computed:{
            total:function () {//计算总价
              var sum=0;
              for(var i=0;i<this.shopCartArray.length;i++){
                sum+=this.shopCartArray[i].shsum*this.shopCartArray[i].shprice;
              }
              return sum;
            }
        },
        methods:{
          closeTimer:function(e){//关闭时间弹出层
            this.show=false;
          },
          cancelTime:function(){
           this.show=false;
          },
          getTime:function(e){//获取当前时间
            var time=[];//接收时间
            var timeStr="";//接收时间变化后的值
            time.push(e.getValues())
            timeStr=time[0].join("-");
            $(".demo-cont").html(timeStr);
          },
          popup:function(){//切换弹出层
            if(!this.show){
              this.show = true;
            }else{
              this.show = false;
            }
          },
          back:function () {//返回上一级
           this.$router.push({
             path:"/goods/ShopCart",
           })
          },
          findShopCartGoods:function () {//根据编号查询查询购物车中的商品
           var ids=localStorage.getItem("shopCart");
            $.ajax({
              url:URL+"shoppinggood/findShopCartByIdsMobile",
              type:"post",
              data:ids,
              contentType:"application/json;charset=utf-8",
            }).done((data)=>{
              if(data.code==1){
                this.shopCartArray=data.data;
              }
            })
          },
          findAddressById:function () {
            var id=JSON.parse(localStorage.getItem("user")).cuno;//获取用户编号
            this.userId=id;
            $.ajax({
              url:URL+"DeliveryAddress/findAddrsssById",
              type:"get",
              data:{id:id},
              dataTye:"json"
            }).done((data)=>{
              if(data.code==1){
                var privateAddressArray=[];//用于保存收货地址的第一位
                $.each(data.data,function (i,v) {
                  privateAddressArray.push(v)
                })
                this.receiveName=privateAddressArray[0].cdname
                this.receiveProvince=privateAddressArray[0].cdomit;
                this.receivecity=privateAddressArray[0].cdcity;
                this.receivearea=privateAddressArray[0].cdarea;
                this.receiveAddress=privateAddressArray[0].cdaddress;
                this.receivePhone=privateAddressArray[0].cdphone;
                this.receiveEmail=privateAddressArray[0].cemail;
                this.receiveId=privateAddressArray[0].cdid;
              }
            })
          },
          linkToUpdateAddress:function () {//调转到收货地址部分
            this.$router.push({
              path:"/order/orderPayUpdateAddress",
            })
          },
          payOrder:function () {
            console.log(this.userId,this.receiveId,$("#totalPrice").html())
            var orderid="";
            var arr=[];
            $.ajax({
              url:URL+"OrderInfo/addOrderInfo",
              type:"post",
              data:{uid:this.userId,aid:this.receiveId,totalPrice:$("#totalPrice").html()},
            }).done((data)=>{//添加订单信息
              orderid=data.orderid;
              for(var i=0;i<this.shopCartArray.length;i++){
                arr.push(
                  {
                    detailname:this.shopCartArray[i].shparameterone+""+this.shopCartArray[i].shparametertwo+""+this.shopCartArray[i].shparameterthree,
                    detailprice:this.shopCartArray[i].shprice,
                    detailpicture:this.shopCartArray[i].shpicute,
                    detailcount:this.shopCartArray[i].shsum,
                    otaketime:$(".demo-cont").html(),
                    detailoid:orderid}
                );
              }
            }).done((data)=>{
              $.ajax({
                url:URL+"OrderDetail/addOrdetail",
                type:"post",
                data:JSON.stringify(arr),
                contentType:"application/json;charset=utf-8",
              }).done((data)=>{
                var id=JSON.parse(localStorage.getItem("user")).cuno;//获取用户编号
                $.ajax({
                  url:URL+"shoppinggood/deleteShopCartByCusmoterId",
                  type:"post",
                  data:{id:id},
                }).done((data)=>{
                  localStorage.removeItem("shopCart");
                  this.$router.push({
                    path:"/order/OrderList",
                  })
                })
              })
            })
          }
        },
    }
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
  }

  body {
    font-family: SimSun,Arial,Helvetica,"Microsoft YaHei",STHeiti,"Droid Sans Fallback",sans-serif;
     -webkit-user-select: none;
     -webkit-text-size-adjust: none;
    line-height: 25px;
    color: #444;
  }

  article, body, dd, div, dl, dt, figcaption, figure,
  footer, form, h1, h2, h3, h4, h5, header, iframe,
  img, input, li, menu, nav, p, section, table,
  tbody, td, textarea, tr, ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  #slide {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-size: 100% 100%;
    z-index: 9998;
    background-color: rgba(0,0,0,.75);
  }

  #slide, .clear {
    clear: both;
  }

  .nav_back {
    width: 30px;
    height: 16px;
    top: 17px;
    left: 15px;
    background: url(../../assets/static_image/nav_back.png) no-repeat;
    background-size: auto 100%;
  }

  #wrapper_nav p, .moveDiv_mark, .nav_back, .nav_btn {
    position: absolute;
  }

  .nav_logo {
    height: 50px;
    text-align: center;
    line-height: 65px;
  }

  .nav_logo img {
    width: auto;
    height: 50%;
    display: inline-block;
  }

  .nav_btn {
    display: inline-block;
    width: 100px;
    height: 50px;
    opacity: initial;
    top: 0;
  }
  #wrapper_nav p, .moveDiv_mark, .nav_back, .nav_btn {
    position: absolute;
  }

  a {
    text-decoration: none;
    color: #3174c7;
  }

  .cur_nav, .hover_nav {
    position: relative;
    display: inline-block;
    height: 4px;
    width: 20px;
    top: 12px;
    margin-left: 15%;
  }

  #wrapper_nav p {
    width: 45px;
    height: 35px;
    line-height: 66px;
    top: 0;
    left: 90%;
  }
  #wrapper_nav p, .moveDiv_mark, .nav_back, .nav_btn {
    position: absolute;
  }

  #wrapper_nav p img {
    width: 50%;
    height: auto;
    display: inline-block;
  }

  .moveDiv_mark {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    top: 29px;
    line-height: 12px;
    color: #fff;
    font-size: 14px;
    text-align: center;
    right: 27px;
  }
  #wrapper_nav p, .moveDiv_mark, .nav_back, .nav_btn {
    position: absolute;
  }

  #wrapper_nav p {
    width: 45px;
    height: 35px;
    line-height: 66px;
    top: 0;
    left: 90%;
  }

  #wrapper_nav p img {
    width: 50%;
    height: auto;
    display: inline-block;
  }

  .content {
    max-width: 750px;
    margin: 0 auto;
    text-align: left;
    padding: 50px 0 55px 0;
  }
  .content {
    padding: 50px 0;
    text-align: center;
  }

  .m_order_nav {
    background: #f5f5f5;
    padding: 15px 0;
    font-size: 19px;
    font-weight: 700;
    text-align: center;
    border-top: 1px solid #e1e1e1;
    border-bottom: 1px solid #e1e1e1;
  }

  .content .m_order_item {
    margin-bottom: 10px;
    margin-top: 10px;
  }

  .content .m_order_item .item_content {
    height: 100px;
    background: #FFFFFF;
     -webkit-box-sizing: border-box;
    padding-left: 15px;
    padding-right: 15px;
  }

  .content .m_order_item .item_content .item_left {
    width: 80px;
    max-width: 120px;
    height: 80px;
    float: left;
    border: 1px solid #aaaaaa;
    margin-top: 10px;
    margin-right: 14px;
    text-align: center;
  }

  .content .m_order_item .item_content .item_left img {
    width: auto;
    height: 100%;
  }

  .content .m_order_item .item_content .item_right {
    width: 66%;
    height: 80px;
    float: right;
    margin-top: 10px;
    line-height: 20px;
  }

  .content .m_order_item .item_content .item_right .o_info {
    width: 65%;
    height: 80px;
    font-size: 15px;
    font-weight: bold;
    float: left;
  }

  .content .m_order_item .item_content .item_right .o_all {
    width: 32%;
    height: 80px;
    float: right;
  }

  .content .m_order_item .item_content .item_right .o_all span {
    font-size: 15px;
    font-weight: bold;
    text-align: right;
    display: block;
  }

  .content .m_order_item .item_content .item_right .o_all span {
    font-size: 15px;
    font-weight: bold;
    text-align: right;
    display: block;
  }

  .content .m_order_item .m_order_info {
    width: 100%;
  }

  .content .m_order_item .m_order_info .m_consignee {
    height: 70px;
    margin-top: 10px;
    padding: 15px 15px 0 15px;
    background: #FFFFFF;
    position: relative;
    border-top: 1px solid #efefef;
  }

  .content .m_order_item .m_order_info .m_consignee .l_name {
    width: 62%;
    line-height: 20px;
    font-size: 15px;
    font-weight: bold;
  }

  .content .m_order_item .m_order_info .m_consignee .add_name {
    width:80%;
    padding-top: 10px;
    font-size: 13px;
    color: #aaaaaa;
    line-height: 20px;
  }

  .info_img {
    position: absolute;
    right: 30px;
    top: 38%;
    width: 10px;
    height: 20px;
  }

  .info_img img {
    width: 100%;
    height: auto;
  }

  .content .m_order_item .m_set_time {
    width: 90%;
    height: 40px;
    background: #838383;
    margin: 10px auto 0px auto;
    position: relative;
    border-radius: 2px;
  }

  .content .m_order_item .m_set_time .m_set_time_con {
    width: 85%;
    height: 38px;
    position: absolute;
  }

  .content .m_order_item .m_set_time .m_set_time_con input {
    border: 0;
    height: 40px;
    background: #838383;
    text-align: center;
    font-size: 15px;
    font-weight: bold;
    width: 100%;
    color: #FFFFFF;
    line-height: 40px;
  }



  .content .m_order_item .m_set_time .m_set_time_sign {
    width: 10%;
    height: 30px;
    position: absolute;
    right: 8%;
    top: 13%;
  }

  .content .m_order_item .m_set_time .m_set_time_sign img {
    width: 100%;
    height: 100%;
  }

  .demo-cont{
    line-height: 40px;
    color: #fff;
  }

  .content .m_less {
    padding-top: 10px;
    background-color: #e8e8e8;
  }

  .m_less .m_less_tit {
    height: 40px;
    line-height: 40px;
    font-size: 15px;
    font-weight: bold;
    padding-left: 20px;
    background-color: #fff;
    text-align: left;
  }

  .m_less .m_less_con {
    font-size: 13px;
    display: flex;
    background-color: #fff;
  }

  .m_less .m_less_con div:first-child {
    width: 130px;
    max-width: 130px;
    min-width: 130px;
    text-align: center;
    padding: 0;
  }
  .m_less .m_less_con div {
    flex: 1;
    font-size: 13px;
    line-height: 25px;
    padding-right: 10px;
    padding-top: 13px;
  }

  .m_less .m_less_con div img {
    width: 100px;
    max-width: 100px;
  }

  .m_less .m_less_con div {
    flex: 1;
    font-size: 13px;
    line-height: 25px;
    padding-right: 10px;
    padding-top: 13px;
  }

  .content .m_pay {
    padding: 10px 0;
    background: #e8e8e8;
  }

  .content .m_pay .m_pay_type {
    height: 40px;
    background: #fff;
    font-size: 15px;
    font-weight: bold;
    line-height: 40px;
    padding: 0 20px 0 20px;
  }

  .content .m_pay .m_pay_type span:first-child {
    float: left;
  }

  .content .m_pay .m_pay_type span:last-child {
    float: right;
  }

  .content .m_discount .m_choose {
    height: 36px;
    line-height: 36px;
    position: relative;
  }

  .content .m_discount .m_choose .m_choose_name {
    font-size: 15px;
    font-weight: bold;
  }

  .content .m_discount .m_choose span {
    float: right;
    font-weight: normal;
    margin-right: 30px;
    font-size: 12px;
    font-family: "Microsoft YaHei";
  }

  .content .m_discount {
    background: #fff;
    padding: 10px 15px;
    border-bottom: 1px solid #ccc;
    display: none;
    text-align: left;
  }

  .content .m_discount .m_choose {
    height: 36px;
    line-height: 36px;
    position: relative;
  }

  .content .m_discount .m_choose .m_choose_name {
    font-size: 15px;
    font-weight: bold;
  }

  .content .m_discount .m_choose span {
    float: right;
    font-weight: normal;
    margin-right: 30px;
    font-size: 12px;
    font-family: "Microsoft YaHei";
  }

  .account {
    position: fixed;
    bottom: 0;
    height: 58px;
    width: 100%;
    background: #414141;
    opacity: 0.9;
  }

  .account .money_all {
    width: 65%;
    height: 58px;
    text-align: left;
    color: #FFFFFF;
    float: left;
    font-family: "Microsoft YaHei";
  }

  .account .money_all ul {
    width: 100%;
    height: 18px;
    margin: 8px 0;
  }

  .account .money_all ul li:first-child {
    text-align: center;
  }

  .account .money_all ul li {
    width: 50%;
    float: left;
    line-height: 20px;
    font-size: 12px;
  }

  .account .money_all ul li {
    width: 50%;
    float: left;
    line-height: 20px;
    font-size: 12px;
  }

  .account .pay {
    width: 35%;
    height: 58px;
    background: #e1e1e1;
    font-size: 18px;
    font-weight: bold;
    color: #FFFFFF;
    text-align: center;
    line-height: 60px;
    cursor: pointer;
    float: right;
    position: absolute;
    right: 0;
  }

  .content .m_discount .m_right:after {
    content: '';
    position: absolute;
    right: 0;
    top: 13px;
    width: 16px;
    height: 10px;
    transform: rotate(90deg);
    background: url(../../assets/static_image/top_03.png) no-repeat center;
    background-size: 100% 100%;
  }


</style>
