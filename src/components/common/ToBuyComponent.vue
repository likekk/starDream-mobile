<template>
    <div>
      <!--商品购买组件-->
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
  import { Row, Col,GoodsAction, GoodsActionBigBtn, GoodsActionMiniBtn,Notify,Toast} from 'vant';
    export default {
        name: "ToBuyComponent",
        components:{
          [Row.name]:Row,
          [Col.name]:Col,
          [GoodsAction.name]:GoodsAction,
          [GoodsActionBigBtn.name]:GoodsActionBigBtn,
          [GoodsActionMiniBtn.name]:GoodsActionMiniBtn,
          [Notify.name]:Notify,
          [Toast.name]:Toast,
        },
        methods:{
          onClickBigBtn:function () {
          }
        }
    }
</script>

<style scoped>

</style>
