<template>
  <div>
    <!--引入头部公共组件-->
    <div>
      <div>
        <van-row>
          <van-col span="24"><Header></Header></van-col>
        </van-row>
      </div>
    </div>
    <!--主内容区开始-->
    <div>
      <div class="content">
        <!--轮播开始-->
        <div id="detail_img">
          <van-row>
            <van-col span="24">
              <van-swipe :autoplay="5000" indicator-color="#c71f2c">
                <van-swipe-item v-for="(obj, index) in pictureDetailsArray" :key="index">
                  <!--<img :src="require('../../assets/products/picture/'+obj.pictureroute)" />-->
                  <img :src="url+'/list/images/products/picture/'+obj.pictureroute">
                </van-swipe-item>
              </van-swipe>
            </van-col>
          </van-row>
        </div>
        <!--图片详细信息-->
        <div class="detail" id="detail">
          <div class="detail">
            <div class="info-right">
              <div class="li_left_name f20">{{detailsName}}
                <span>{{standard}}</span>
              </div>
              <span class="info-pay"> 价格：¥{{detailsPrice}}</span>
              <div class="info-color" id="color">
                <div class="color-select">
                  <div style="line-height:40px; font-size:14px; display: inline-block; float:left;">颜色：</div>
                  <template v-for="(obj,index) of colorPicture">
                    <!--<img :src="require('../../assets/products/color/'+obj.colorinfroute)" alt="" class="select_color"-->
                         <!--@click="findPictureByColorId(obj.colorinfid,$event)">-->
                    <img :src="url+'/list/images/products/color/'+obj.colorinfroute" alt="" class="select_color"
                         @click="findPictureByColorId(obj.colorinfid,$event)">
                  </template>
                </div>
              </div>
              <span class="info-wl"></span>
            </div>
            <!--promise承若送达-->
            <div class="pro_m">服务承诺：官方正品   免邮配送   同城速递</div>
            <div class="pro_data" id="hytz_title"
                 style="transform-origin: 0px 0px 0px; opacity: 1; transform: scale(1, 1);display: none">优惠套餐</div>
            <dl class="pro_yhtz" id="hytz_body" style="transform-origin: 0px 0px 0px; opacity: 1; transform: scale(1, 1);display: none">
              <div>
                <dt>
                  <div id="div_yzpro">
                    <img src="../../assets/static_image/taocan_01.png" alt="">
                    <p>经典永续经典19支</p>
                    <span>¥1999</span>
                  </div>
                  <span class="zh_img">
                      <img src="../../assets/static_image/add.png" alt="">
                    </span>
                  <div id="div_tzpro">
                    <img src="../../assets/static_image/taocan_02.png" alt="">
                    <p>一生一世一生一世单朵版</p>
                    <span>¥1314</span>
                  </div>
                </dt>
                <dd>
                  <a href="javascript:void(0)" class="tc_num">共<span>2</span>个套餐</a>
                  <div class="tc_price1">
                    组合价：<span>¥2999</span>
                  </div>
                  <div class="tc_price2">
                    价值：<span>¥3313</span>
                  </div>
                </dd>
                <div class="clear"></div>
              </div>
            </dl>
            <template v-if="parameter!=null">
              <div class="pro_data">产品参数</div>
            </template>
            <!--产品参数-->
            <div class="pro_data_con">
              <template v-if="parameter!=null">
                <li>
                  <b>适用场景：</b>
                  <span>{{parameter.parameterone}}</span>
                </li>
                <li>
                  <b>鲜花朵数：</b>
                  <span>{{parameter.parametertwo}}</span>
                </li>
                <li>
                  <b>适用对象：</b>
                  <span>{{parameter.parameterthree}}</span>
                </li>
                <li>
                  <b>颜色分类：</b>
                  <span>{{parameter.parameterfour}}</span>
                </li>
                <li>
                  <b>适用节日：</b>
                  <span>{{parameter.parameterfive}}</span>
                </li>
                <li>
                  <b>产品规格：</b>
                  <span>{{parameter.parametersix}}</span>
                </li>
              </template>
            </div>
            <!--商品图片列表-->
            <div id="imgs">
              <div class="detail-img">
                <template v-for="(obj,index) in detailsPictureArray">
                  <!--<img :src="require('../../assets/products/details/'+obj.gpdaterotue)">-->
                  <img :src="url+'/list/images/products/details/'+obj.gpdaterotue">
                </template>
              </div>
            </div>
            <div class="item_b" style="width:100%;height:50px"></div>
          </div>
        </div>
      </div>
      <!--热卖推荐-->
      <p class="pro_rmtj">
        <span class="hot cur">热卖推荐</span>
      </p>
      <div class="zbj_dl">
        <dl class="new_list_l">
          <dt>
            <a href="javascritp:void(0)"><img src="../../assets/static_image/tuijian_01.png" alt=""></a>
          </dt>
          <dd>
            永生玫瑰 - 全世爱系列<span>水晶嫣红 中型心形</span>￥<span>2699</span>
          </dd>
        </dl>
        <dl class="new_list_l">
          <dt>
            <a href="javascritp:void(0)"><img src="../../assets/static_image/tuijian_01.png" alt=""></a>
          </dt>
          <dd>
            永生玫瑰 - 全世爱系列<span>水晶嫣红 中型心形</span>￥<span>2699</span>
          </dd>
        </dl>
        <dl class="new_list_l">
          <dt>
            <a href="javascritp:void(0)"><img src="../../assets/static_image/tuijian_01.png" alt=""></a>
          </dt>
          <dd>
            永生玫瑰 - 全世爱系列<span>水晶嫣红 中型心形</span>￥<span>2699</span>
          </dd>
        </dl>
        <dl class="new_list_l">
          <dt>
            <a href="javascritp:void(0)"><img src="../../assets/static_image/tuijian_01.png" alt=""></a>
          </dt>
          <dd>
            永生玫瑰 - 全世爱系列<span>水晶嫣红 中型心形</span>￥<span>2699</span>
          </dd>
        </dl>
      </div>
      <div class="pro_bt" style="height:50px;width:100%;clear:both;"></div>
    </div>
    <!--购买组件-->
    <div>
      <van-row>
        <van-col span="24">
          <van-goods-action>
            <van-goods-action-mini-btn
              icon="cart-o"
              text="购物车"
              to="ShopCart"
            />
            <van-goods-action-big-btn
              @click="onClickBigBtn"
              text="加入购物车"

            />
            <van-goods-action-big-btn
              primary
              text="立即购买"
            />
          </van-goods-action>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
  import { Row, Col,Swipe, SwipeItem,GoodsAction, GoodsActionBigBtn, GoodsActionMiniBtn,Notify,Toast } from 'vant';
  import Header from "../common/HeaderComponent"
  import {URL} from "@/assets/js/URL";

  export default {
    name: "GoodsDetail",
    components:{
      [Row.name]:Row,
      [Col.name]:Col,
      Header,
      [Swipe.name]:Swipe,
      [SwipeItem.name]:SwipeItem,
      [GoodsAction.name]:GoodsAction,
      [GoodsActionBigBtn.name]:GoodsActionBigBtn,
      [GoodsActionMiniBtn.name]:GoodsActionMiniBtn,
      [Notify.name]:Notify,
      [Toast.name]:Toast,
    },
    data(){
      return{
        detailsPrice:"",//商品价格
        detailsName:"",//商品名称
        standard:"",//规格
        toShopCartparameterone:"",//添加到购物车参数一
        toShopCartparametertwo:"",//添加到购物车参数二
        toShopCartparameterthree:"",//添加到购物车参数三
        colorPicture:[],//颜色数组
        pictureDetailsArray:[],//图片详情
        detailsPictureArray:[],//图片详细
        parameter:{},           //参数对象
        detailsPicture:"",//商品图片
        url:URL,//服务器地址
      }
    },
    mounted:function () {
      var colorArray=[];//定义颜色数组用于收集
      var  savePictureOne=[];//加入购物车数据保存图片
      var id=this.$route.query.id;//从路由种获取参数
      $.ajax({
        url:URL+"/StarGoodItem/selectstargood",
        type:"get",
        dataType:"json",
        data:{stid:id},
      }).done((data)=>{//根据商品编号查询出颜色
        this.detailsName=data.data.stname.substring(6,data.data.stname.length-2)+data.data.parameteroneid+data.data.parametertwoid;
        this.detailsPrice=data.data.stprice;//参数四
        this.standard=data.data.parameterthreeid;
        //以下三个参数用于添加到购物车页面的数据
        this.toShopCartparameterone=data.data.stname.substring(6,data.data.stname.length-2)+data.data.parameteroneid;//参数一
        this.toShopCartparametertwo=data.data.parametertwoid;//参数二
        this.toShopCartparameterthree=data.data.parameterthreeid;//参数三
        this.colorPicture=data.data.colorinformationList;
        $.each(this.colorPicture,function (i,v) {
          colorArray.push(v.colorinfid);//颜色数组存放颜色数据的编号
        })
        $.ajax({//根据商品编号查询出商品详细图片信息
          url:URL+"StarGoodItem/selectstargooddata",
          type:"get",
          dataType:"json",
          data:{stid:id},
        }).done((data)=>{
          this.detailsPictureArray=data.data.goodppicdateList;
        })
        $.ajax({//根据颜色编号查询出商品图片
          url:URL+"stargoodcolor/selectstargoodcolor",
          type:"get",
          dataType:"json",
          data:{colorinfid:colorArray[0]}
        }).done((data)=>{
          this.pictureDetailsArray=data.data.stgoodpictureList;
          $.each(this.pictureDetailsArray,function (i,v) {
            savePictureOne.push(v.pictureroute);//直接加入购物车时的图片
          })
          this.detailsPicture=savePictureOne[0];
          $(".select_color:first").addClass("selected")
        })
        $.ajax({//根据商品编号查询出商品参数
          url:URL+"StarGoodItem/selectgoodParameterinformation",
          type:"get",
          dataType:"json",
          data:{stid:id}
        }).done((data)=>{
          if(data.data==null){
            this.parameter=data.data;
            return false;
          }
          this.parameter=data.data.parameterinformation;
        })
      })
    },
    methods:{
      onClickBigBtn:function () {
        if(localStorage.getItem("user")==null){//判断本地存储是否为空
          this.$router.push({
            name:"Login"
          })
          return false;
        }
        var id=JSON.parse(localStorage.getItem("user")).cuno;//获取用户编号
        console.log(this.toShopCartparameterone)
        console.log(this.toShopCartparametertwo);
        console.log(this.toShopCartparameterthree);
        console.log(this.detailsPicture);
        console.log(this.detailsPrice);
        $.ajax({
          type:"post",
          url:URL+"/shoppinggood/insertshoppinggood",
          data:{
            shbrand:"roseonly",
            shparameterone:this.toShopCartparameterone,
            shparametertwo:this.toShopCartparametertwo,
            shparameterthree:this.toShopCartparameterthree,
            shprice:this.detailsPrice,
            shpicute:this.detailsPicture,shuid:id},
        }).done(function (data) {
          if(data.code==1){
            Toast.success({
              message:"在购物车等亲",
              duration:1000,
            })
          }
        })
      },
      findPictureByColorId:function (id,event) {//点击颜色时，根据颜色编号查询图片
        var savePictureTwo=[];
        $.ajax({
          url:URL+"stargoodcolor/selectstargoodcolor",
          type:"get",
          dataType:"json",
          data:{colorinfid:id},
        }).done(data=>{
          this.pictureDetailsArray=data.data.stgoodpictureList;
          console.log(this.pictureDetailsArray);
          $.each(this.pictureDetailsArray,function (i,v) {
            savePictureTwo.push(v.pictureroute);
          })
          this.detailsPicture=savePictureTwo[0];//用户点击图片详情时加入购物车图片
          $(event.target).addClass("selected").siblings().removeClass("selected")
        })
      }
    }
  }
</script>

<style scoped>
  .content{
    padding-top: 80px;
    text-align: center;
    padding-bottom: 0;
  }
  #detail_img img{
    width: 100%;
  }
  .detail{
    padding-top: 20px;
  }
  .detail .info-right{
    width: 95%;
    margin: -6px auto 8px;
    display: table;
  }
  .li_left_name{
    font-size: 14px;
    line-height: 30px;
    margin: 5px 0;
    font-weight: bold;
    color: #414141;
  }
  .f20{
    font-size: 18px;
  }
  .detail .info-pay, .detail .info-wl{
    display: block;
    margin: 8px 0 0 0;
    font-size: 24px;
  }
  .detail .info-pay{
    position: relative;
    top: -3px;
    font-size: 14px;
    display: block;
    text-align: center;
  }
  .detail .info-pay, .detail .info-wl{
    margin: 10px;
  }
  .info-color{
    font-size: 16px;
    position: relative;
    line-height: 25px;
    min-height: 12.5px;
    width: 100%;
    text-align: center;
  }
  .info-color .color-select{
    display: inline-block;
    vertical-align: sub;
  }
  .select_color{
    width: 40px;
    height: 40px;
    border: solid 1px #b5b5b5;
    display: inline-block;
    margin-right: 5px;
    cursor: pointer;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
  }
  .color-select .selected{
    border: solid 2px #7e7e7e;
  }
  .pro_m{
    width: 100%;
    height: 40px;
    background: #f6f6f6;
    line-height: 40px;
    text-align: center;
    margin-bottom: 10px;
  }
  .pro_data{
    width: 100%;
    height: 40px;
    background: #e9e9e9;
    line-height: 40px;
    text-align: center;
    letter-spacing: 2px;
    font-weight: bold;
  }
  .pro_yhtz{
    width: 100%;
    height: 150px;
    background: #fff;
  }
  .pro_yhtz>div{
    display: block;
    color: #414141;
    padding: 20px 15px;
    box-sizing: border-box;
  }
  .pro_yhtz dt{
    width: 65%;
    float: left;
  }
  .zh_img{
    float: left;
    display: block;
    width: 10%;
    height: 15px;
    margin-top: 28px;
  }
  .pro_yhtz dd{
    float: right;
    text-align: left;
    color: #9d9d9d;
    font-size: 13px;
    padding-top: 26px;
  }
  .pro_yhtz dt div{
    float: left;
    width: 45%;
    height: 70px;
    line-height: 10px;
  }
  .pro_yhtz dt div img, .zh_img img{
    width: auto;
    height: 100%;
  }
  .clear{
    clear: both;
  }
  .pro_yhtz dt div p{
    width: 100%;
    height: 24px;
    line-height: 24px;
    font-size: 13px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .pro_yhtz dt div span{
    display: block;
    text-align: center;
    font-size: 13px;
    line-height: 24px;
  }
  .tc_num{
    color: #666666;
    background: url("../../assets/static_image/right_arrow.jpg") no-repeat right center;
    background-size: 10%;
    padding-right: 10px;
  }
  .tc_price1{
    color: #414141;
    line-height: 20px;
    height: 20px;
    margin-top: 18px;
  }
  .tc_price1 span{
    color: #414141;
    font-size: 18px;
  }
  .tc_price2{
    line-height: 20px;
    padding-top: 7px;
  }
  .pro_data_con{
    padding-top: 16px;
    background: #f6f6f6;
    overflow: hidden;
    margin-bottom: 15px;
    padding-bottom: 10px;
  }
  .pro_data_con li{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 28px;
    text-align: left;
    float: left;
    width: 40%;
    padding-left: 27px;
    font-size: 12px;
    text-indent: 1px;
  }
  .pro_data_con li{
    line-height: 28px;
    text-align: left;
    float: left;
    padding-left: 32px;
    font-size: 12px;
  }
  .detail .detail-img{
    line-height: 0;

  }
  .detail .detail-img img{
    width: 100%;
  }
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
  .zbj_dl > dl{
    width: 47%;
    margin: 10px 0 0 2%;
    background: #fff;
  }
  .new_list_l{
    float: left;
  }
  .zbj_dl > dl > dd{
    padding-top: 10px;
    margin: 0;
    line-height: 20px;
    color: #414141;
    background: #FFFFFF;
    text-align: center;
    padding-bottom: 8px;
    font-size: 13px;
  }
  .zbj_dl img{
    width: 100%;
    display: block;
  }
  .zbj_dl > dl > dd >span:first-child{
    display: block;
    font-weight: normal;
    font-size: 12px;
  }
</style>
