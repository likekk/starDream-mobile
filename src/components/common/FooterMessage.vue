<template>
    <div id="footer">
      <div class="footer-yyzz">
        <div>
          京ICP备13007738号 京公网安备11010502023922
          <br>
          www.roseonly.com.cn；诺誓（北京）商业股份有限公司
        </div>
        <a href="javascript:void(0)">营业执照</a>
        <a href="javascript:void(0)">食品证副本</a>
      </div>
    </div>
</template>

<script>
    export default {
        name: "FooterMessage"
    }
</script>

<style scoped>
.footer-yyzz{
  text-align: center;
  font-size: 12px;
  line-height: 18px;
  clear: both;
  color: rgb(175, 175, 175);
  height: 80px;
  padding-top: 18px;
  display: block !important;
  background: rgb(65, 65, 65);
}
.footer-yyzz a{
  padding-left: 15px;
  font-size: 12px;
  color: rgb(175, 175, 175);
  display: initial;
  margin: 0px 8px;
  background: url("../../assets/static_image/zhengshu.jpg") left center / auto 100% no-repeat;
}
</style>
