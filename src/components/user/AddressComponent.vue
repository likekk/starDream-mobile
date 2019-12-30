<template>
  <div>
    <div id="header">
      <div id="slide">
        <div class="nav_back" @click="back()"></div>
        <div class="nav_logo">
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

    <div class="m_newadd_content">

      <div class="m_order_nav">
        <div class="goback"><a href="javascript:history.back();"></a></div> 收货地址
      </div>
      <div class="add_con" id="addrList">
        <div class="addr_list" style="transform-origin: 0px 0px 0px; opacity: 1; transform: scale(1, 1);">
          <input  value-275756315="" type="hidden">
          <ul>
            <template v-for="(obj,index) of PersonalAddressArray">
            <li class="new_sh_list" value="237208">
              <div class="sh_list_l">
                <p class="first_p">
                  {{obj.cdname}}
                  <span class="txt_pone">{{obj.cdphone}}</span>
                </p>
                <p class="two_p" style="margin-top: 9px;color: #a1a1a1;font-size: 14px;">{{obj.cdaddress}}</p>
              </div>

              <a @click="linktoUpdateAddress(obj.cdaddress,obj.cdarea,obj.cdcity,obj.cdid,
              obj.cdname,obj.cdno,obj.cdomit,obj.cdphone,obj.cemail)" class="list_img">
                <img src="../../assets/static_image/bq_03.png"></a>
            </li>
            </template>
          </ul>
          <a href="javascript:void(0)">
            <div class="m_order_naddress" @click="linkToAddAddress">+添加roseonly专属地址</div>
          </a>
          <div class="addr_ft"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {URL} from "@/assets/js/URL";
  export default {
    name: "OrderPayUpdateAddress",
    data(){
      return{
        PersonalAddressArray:[],//存储全部收货地址的数组
      }
    },
    methods:{
      back:function () {
        history.back();
      },
      linkToAddAddress:function () {
        this.$router.push({//路由跳转到新增收货地址
          path:"/user/ToupdateAddrss",
        })
      },
      linktoUpdateAddress:function (address,area,city,did,name,uno,domit,phone,email) {//路由跳转到修改收货地址
        this.$router.push({
          path:"/user/UserUpdateAddress",
          query:{
            address:address,
            area:area,
            city:city,
            did:did,
            name:name,
            uno:uno,
            domit:domit,
            phone:phone,
            email:email,
          }
        })
      },
      findAllAddressByUserId:function () {//根据用户编号查询出全部的收货地址
        var userId=JSON.parse(localStorage.getItem("user")).cuno;//获取用户编号
        $.ajax({
          url:URL+"DeliveryAddress/findAddrsssById",
          type:"get",
          data:{id:userId},
          dataType:"json"
        }).done((data)=>{
            //console.log(data.data);
            this.PersonalAddressArray=data.data;
        })
      }
    },
    mounted:function () {
      this.findAllAddressByUserId();
    }
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

  /*内容开始*/
  .m_newadd_content {
    max-width: 750px;
    margin: 0 auto;
    position: relative;
    /*padding-top: 50px;*/
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

  .goback {
    display: none;
    background: url(../../assets/static_image/back_03.png) 0 23% no-repeat;
    background-size: 60% 60%;
  }

  .m_order_nav a {
    display: block;
  }
  .goback, .m_order_nav a {
    width: 19px;
    height: 30px;
  }
  a {
    text-decoration: none;
    color: #3174c7;
  }

  .m_newadd_content .ps {
    width: 100%;
    height: 80px;
  }

  .m_newadd_content .ps h1 {
    height: 30px;
    line-height: 30px;
    padding-left: 5%;
    font-size: 14px;
    font-weight: bold;
  }

  .m_newadd_content .ps .add_list ul {
    width: 80%;
    height: 40px;
    margin-left: 15%;
  }
  ol, ul {
    margin: 0;
    padding: 0;
  }

  .m_newadd_content .ps .add_list ul .add_li_hover {
    width: 40%;
    background: url(../../assets/static_image/gx_07.png) 5% 50% no-repeat;
    background-size: auto 30%;
    border: 1px solid #414141;
    height: 30px;
    line-height: 30px;
    padding-left: 0;
    color: #414141;
    font-weight: bold;
    border-radius: 4px;
  }
  .m_newadd_content .ps .add_list ul li {
    float: left;
    width: 40%;
    height: 30px;
    border: 1px solid #626262;
    text-align: center;
    line-height: 30px;
    font-size: 15px;
    color: #626262;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    border-radius: 3px;
  }

  .m_newadd_content .ps .add_list ul li {
    float: left;
    width: 40%;
    height: 30px;
    border: 1px solid #626262;
    text-align: center;
    line-height: 30px;
    font-size: 15px;
    color: #626262;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    border-radius: 3px;
  }

  .m_newadd_content .addr_list ul {
    background: #FFFFFF;
    margin-top: 5px;
  }

  .m_newadd_content .new_sh_list {
    width: 100%;
    height: 80px;
    position: relative;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    border-top: 1px solid #ccc;
  }
  .m_newadd_content .new_sh_list:first-child {
    border-top:none;
  }
  .m_newadd_content .new_sh_list .sh_list_l {
    width: 70%;
    margin: 0% 0 0 5%;
    padding-top: 2%;
  }

  .m_newadd_content .new_sh_list .list_img {
    position: absolute;
    top: 17%;
    right: 4%;
    width: 35px;
    height: 64px;
    display: block;
  }
  a {
    text-decoration: none;
    color: #3174c7;
  }

  .m_newadd_content .new_sh_list .list_img img {
    width: 100%;
    height: auto;
  }

  .m_newadd_content .m_order_naddress {
    height: 40px;
    color: #FFFFFF;
    font-size: 15px;
    font-weight: bold;
    text-align: center;
    background: #838383;
    line-height: 40px;
    width: 90%;
    margin: 0 auto;
    margin-top: 40px;
    letter-spacing: 1px;
    border-radius: 3px;
  }

  .addr_ft {
    width: 100%;
    height: 100px;
  }
  /*内容结束*/
</style>

