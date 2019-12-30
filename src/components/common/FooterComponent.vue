<template>
    <div>
      <!--底部导航-->
      <div>
        <van-tabbar
          active-color="#4c4c4c"
          :z-index="9999"
        >
          <van-tabbar-item icon="home-o" to="/">主页</van-tabbar-item>
          <van-tabbar-item icon="orders-o" to="">分类</van-tabbar-item>
          <van-tabbar-item icon="shopping-cart-o" to="/goods/ShopCart">购物车</van-tabbar-item>
          <van-tabbar-item icon="user-o" to="user/Reg">我的</van-tabbar-item>
        </van-tabbar>
      </div>
    </div>
</template>

<script>
  import {Tabbar, TabbarItem } from "vant"
    export default {
        name: "FooterComponent",
      components:{
          [Tabbar.name]:Tabbar,
          [TabbarItem.name]:TabbarItem,
      }
    }
</script>

<style scoped>

</style>
