import Vue from 'vue'
import Router from 'vue-router'
import index from "@/components/goods/HomePage"
import Reg from "@/components/user/RegComponent"
import Login from "@/components/user/LoginComponent"
import GoodsDetail from "@/components/goods/GoodsDetail"
import ShopCart from "@/components/goods/ShopCart"
import Personal from "@/components/user/PersonalComponent"
import  Address from "@/components/user/AddressComponent"
import  UpdatePersonalPwd from "@/components/user/UpdatePersonalPwd"
import  UserInfomation from "@/components/user/UserInfoComponent"
import  OrderList from "@/components/order/OrderListComponent"
import  OrderdetaLis from "@/components/order/OrderdetalisComponent"
import  ysmgDetails from "@/components/goods/ysmgDetails"
import  mgzbDetails from "@/components/goods/mgzbDetails"
import  mgspDetails from "@/components/goods/mgspDetails"
import  mgxfDetails from "@/components/goods/msxfDetails"
import  toBuy from "@/components/order/OrderpayprofromComponent"
import  orderClose from "@/components/order/OrderCloseComponent"
import  orderPay from "@/components/order/OrderPayComponent"
import  orderReceive from "@/components/order/OrderReceiveComponent"
import  orderPayUpdateAddress from "@/components/order/OrderPayUpdateAddress"
import  ToupdateAddrss from "@/components/user/ToUpdateComponent"
import  UserUpdateAddress from "@/components/user/UserUpdateAddressComponent"
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component:index
    },{
      path: '/user/Reg',
      name: 'Reg',
      component:Reg,
    },{
      path: '/user/Login',
      name: 'Login',
      component:Login,
    },{
      path: '/goods/GoodsDetail',
      name: 'GoodsDetail',
      component:GoodsDetail,
    },{
      path: '/goods/ysmgDetails',
      name: 'ysmgDetails',
      component:ysmgDetails,
    },{
      path: '/goods/mgzbDetails',
      name: 'mgzbDetails',
      component:mgzbDetails,
    },{
      path: '/goods/mgspDetails',
      name: 'mgspDetails',
      component:mgspDetails,
    },{
      path: '/goods/mgxfDetails',
      name: 'mgxfDetails',
      component:mgxfDetails,
    },
    {
      path:"/goods/ShopCart",
      name:"ShopCart",
      component:ShopCart,
    },{
      path:"/user/Personal",
      name:"Personal",
      component:Personal,
    },{
      path:"/user/Address",
      name:"Address",
      component:Address,
    },{
      path:"/user/UpdatePersonalPwd",
      name:"UpdatePersonalPwd",
      component:UpdatePersonalPwd,
    },{
      path:"/user/UserInfomation",
      name:"UserInfomation",
      component:UserInfomation,
    },
    {
      path:"/user/ToupdateAddrss",
      name:"ToupdateAddrss",
      component:ToupdateAddrss,
    },{
      path:"/user/UserUpdateAddress",
      name:"UserUpdateAddress",
      component:UserUpdateAddress,
    },
    {
      path:"/order/OrderList",
      name:"OrderList",
      component:OrderList,
    },
    {
      path:"/order/OrderdetaLis",
      name:"OrderdetaLis",
      component:OrderdetaLis,
    },{
      path:"/order/toBuy",
      name:"toBuy",
      component:toBuy,
    },{
      path:"/order/orderClose",
      name:"orderClose",
      component:orderClose,
    },{
      path:"/order/orderPay",
      name:"orderPay",
      component:orderPay,
    },{
      path:"/order/orderReceive",
      name:"orderReceive",
      component:orderReceive,
    },{
      path:"/order/orderPayUpdateAddress",
      name:"orderPayUpdateAddress",
      component:orderPayUpdateAddress,
    }
  ]
})
