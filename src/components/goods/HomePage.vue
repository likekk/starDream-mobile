<template>
    <div>
      <Header></Header>
      <div id="main">
        <div class="content">
          <!--图片轮播-->
          <div id="swipe">
            <van-row>
              <van-col span="24">
                <van-swipe :autoplay="5000" indicator-color="white">
                  <van-swipe-item><img src="../../assets/static_image/swipe_01.jpg" alt=""></van-swipe-item>
                  <van-swipe-item><img src="../../assets/static_image/swipe_02.jpg" alt=""></van-swipe-item>
                  <van-swipe-item><img src="../../assets/static_image/swipe_03.jpg" alt=""></van-swipe-item>
                  <van-swipe-item><img src="../../assets/static_image/swipe_04.jpg" alt=""></van-swipe-item>
                </van-swipe>
              </van-col>
            </van-row>
          </div>
          <!--选项卡-->
          <div id="tabs">
            <van-row>
              <van-col span="24">
                <van-tabs color="#414141" @click="findGoodsById">
                  <van-tab title="鲜花玫瑰">
                    <div class="content_new_list">
                      <dl class="new_list_l" v-for="(obj,index) in goods">
                        <dt>
                          <router-link :to="{name:'GoodsDetail',query: {id:obj.stid}}">
                            <!--<img :src="require('../../assets/products/home/'+obj.stpicture)" alt="">-->
                            <img :src="url+'/list/images/products/home/'+obj.stpicture">
                          </router-link>
                        </dt>
                        <dd>
                          <span>{{obj.stname}}</span>
                          <span>{{obj.parameteroneid}} {{obj.parametertwoid}} {{obj.parameterthreeid}}</span>
                          <span>¥{{obj.stprice}}</span>
                        </dd>
                      </dl>
                    </div>
                    <GoodListFooter></GoodListFooter>
                  </van-tab>
                  <van-tab title="永生玫瑰">
                    <div class="content_new_list">
                      <dl class="new_list_l" v-for="(obj,index) in goods">
                        <dt>
                          <router-link :to="{name:'ysmgDetails',query: {id:obj.stid}}">
                            <!--<img :src="require('../../assets/products/home/'+obj.stpicture)" alt="">-->
                            <img :src="url+'/list/images/products/home/'+obj.stpicture">
                          </router-link>
                        </dt>
                        <dd>
                          <span>{{obj.stname}}</span>
                          <span>{{obj.parameteroneid}} {{obj.parametertwoid}} {{obj.parameterthreeid}}</span>
                          <span>¥{{obj.stprice}}</span>
                        </dd>
                      </dl>
                    </div>
                    <GoodListFooter></GoodListFooter>
                  </van-tab>
                  <van-tab title="玫瑰珠宝">
                    <div class="content_new_list">
                      <dl class="new_list_l" v-for="(obj,index) in goods">
                        <dt>
                          <router-link :to="{name:'mgzbDetails',query: {id:obj.stid}}">
                            <!--<img :src="require('../../assets/products/home/'+obj.stpicture)" alt="">-->
                            <img :src="url+'/list/images/products/home/'+obj.stpicture">
                          </router-link>
                        </dt>
                        <dd>
                          <span>{{obj.stname}}</span>
                          <span>{{obj.parameteroneid}} {{obj.parametertwoid}} {{obj.parameterthreeid}}</span>
                          <span>¥{{obj.stprice}}</span>
                        </dd>
                      </dl>
                    </div>
                    <GoodListFooter></GoodListFooter>
                  </van-tab>
                  <van-tab title="玫瑰饰品">
                    <div class="content_new_list">
                      <dl class="new_list_l" v-for="(obj,index) in goods">
                        <dt>
                          <router-link :to="{name:'mgspDetails',query: {id:obj.stid}}">
                            <!--<img :src="require('../../assets/products/home/'+obj.stpicture)" alt="">-->
                            <img :src="url+'/list/images/products/home/'+obj.stpicture">
                          </router-link>
                        </dt>
                        <dd>
                          <span>{{obj.stname}}</span>
                          <span>{{obj.parameteroneid}} {{obj.parametertwoid}} {{obj.parameterthreeid}}</span>
                          <span>¥{{obj.stprice}}</span>
                        </dd>
                      </dl>
                    </div>
                    <GoodListFooter></GoodListFooter>
                  </van-tab>
                  <van-tab title="玫瑰香氛">
                    <div class="content_new_list">
                      <dl class="new_list_l" v-for="(obj,index) in goods">
                        <dt>
                          <router-link :to="{name:'mgxfDetails',query: {id:obj.stid}}">
                            <!--<img :src="require('../../assets/products/home/'+obj.stpicture)" alt="">-->
                            <img :src="url+'/list/images/products/home/'+obj.stpicture">
                          </router-link>
                        </dt>
                        <dd>
                          <span>{{obj.stname}}</span>
                          <span>{{obj.parameteroneid}} {{obj.parametertwoid}} {{obj.parameterthreeid}}</span>
                          <span>¥{{obj.stprice}}</span>
                        </dd>
                      </dl>
                    </div>
                    <GoodListFooter></GoodListFooter>
                  </van-tab>
                </van-tabs>
              </van-col>
            </van-row>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
</template>

<script>
  import { Tab, Tabs,Row, Col,Swipe, SwipeItem } from 'vant';
  import Footer from "../common/FooterComponent"
  import Header from "../common/HeaderComponent"
  import GoodListFooter from "../common/GoodsListFooter"
  import FooterMessage from "../common/FooterMessage"
  import {URL} from "@/assets/js/URL";
  export default {
        name: "HomePage",
        data(){
          return{
            navigation:[],
            goods:[],
            url:URL,
          }
        },
      components:{
          Footer,
          Header,
          FooterMessage,
          [Tab.name]:Tab,
          [Tabs.name]:Tabs,
          [Row.name]:Row,
          [Col.name]:Col,
          [Swipe.name]:Swipe,
          [SwipeItem.name]:SwipeItem,
           GoodListFooter
      },
      mounted:function () {
        $.ajax({
          url:URL+"xhmg/selectstargoodparameterserven",
          type:"get",
          data:{id:2},
        }).done((data)=>{
          this.goods=data.data;
          console.log(data.data);
        })
      },
      methods:{
        findGoodsById:function (index,title) {
          //console.log(JSON.parse(localStorage.getItem("user")).cuno)
          var id=index+2;
          $.ajax({
            url:URL+"StarGoodItem/findAllStargood",
            dataType: "json",
            type:"get",
            data:{parameterserven:id},
          }).done((data)=>{
            this.goods=data.data;
          })
        },
      }
    }
</script>

<style scoped>
  .content{
    padding-bottom: 0;
    padding-top: 0;
  }
 #swipe img{
  width: 100%;
}
 .content_new_list{
   width: 100%;
   margin: 0 auto;
 }
 .content_new_list>dl{
   width: 46%;
   margin-top: 20px;
   margin-left: 2.7%;
   height: 290px;
 }
 .new_list_l{
   float: left;
   background: #ffffff;
 }
 .content_new_list>dl>dt{
   background: #FFFFFF;
   line-height: 0px;
 }
 .content_new_list>dl>dd{
   text-align: left;
   font-size: 13px;
   margin: 15px 0 0 0;
   line-height: 14px;
   color: #444;
   background: #FFFFFF;
   text-align: center;
   padding-bottom: 8px;
 }
 .content_new_list img{
   width: 100%;
   height: auto;
   display: block;
 }
 .content_new_list>dl>dd>span{
   display: block;
   margin-top: 3px;
   overflow: hidden;
   line-height: 22px;
 }
 .content_new_list>dl>dd>span:last-child{
   font-weight: bold;
   font-size: 15px;
 }
</style>
