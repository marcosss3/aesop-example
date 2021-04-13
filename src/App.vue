<template>
  <div id="app">
    <aesop-cart :cart-open="cartOpen" v-on:toggleCart="cartOpen = !cartOpen" />
    <aesop-header v-on:toggleCart="cartOpen = !cartOpen" />
    <aesop-pdp-header />
  </div>
</template>

<script>
import AesopCart from "@/layouts/AesopCart.vue";
import AesopHeader from "@/layouts/AesopHeader.vue";
import AesopPdpHeader from "@/layouts/AesopPdpHeader.vue";

export default {
  name: "App",
  components: {
    AesopCart,
    AesopHeader,
    AesopPdpHeader
  },
  data() {
    return {
      cartOpen: false
    };
  }
};
</script>

<style scoped lang="scss"></style>
