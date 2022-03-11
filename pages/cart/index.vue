<template>
  <section class="w-full md:px-8">
    <h3 class="mt-2 text-lg mb-4 font-bold tracking-widest" v-if="cartList.length >= 1">購物車</h3>
    <CartList :cartList="cartList" v-if="cartList.length >= 1"/>
    <div class="flex justify-center lg:justify-end" v-if="cartList.length >= 1">
      <button data-mdb-ripple="true" data-mdb-ripple-color="light" class="mt-8 py-3.5 px-20 shadow-md text-white text-lg tracking-widest rounded-xl bg-gradient-to-r from-[#FF6D3F] to-[#FA5936] hover:shadow-inner disabled:cursor-not-allowed disabled:opacity-80" @click="toCheckout()">立即結帳</button>
    </div>
    <div v-else class="flex flex-col justify-center items-center mt-20">
      <fa class="text-7xl text-[#a3a3a3]" icon="fa-solid fa-cart-shopping"></fa>
      <h3 class="text-lg text-[#a3a3a3] mt-3 tracking-widest">目前購物車沒有任何商品</h3>
    </div>
  </section>
</template>

<script>
export default {
  name: "cart-index",
  data() {
    return {
      cartList: [
        {
          id: 1,
          checked: false,
          imgUrl: require('~/static/images/product_example.png'),
          title: '縱谷間的茶・經典有機紅烏龍',
          quantity: 1,
          sale: 890
        },
        {
          id: 2,
          checked: false,
          imgUrl: require('~/static/images/product_example.png'),
          title: '縱谷間的茶・經典有機紅烏龍',
          quantity: 2,
          sale: 980
        },
        {
          id: 3,
          checked: false,
          imgUrl: require('~/static/images/product_example.png'),
          title: '縱谷間的茶・經典有機紅烏龍',
          quantity: 5,
          sale: 690
        }
      ]
    }
  },
  methods: {
    toCheckout() {
      let isChecked = 0
      this.cartList.forEach((item) => {
        if (item.checked) {
          isChecked += 1
        }
      })
      if (isChecked === 0) {
        this.$swal
        .fire({
          icon: 'warning',
          title: '您尚未選擇任何商品',
          timer: 1000,
          showConfirmButton: false
        })
      } else {
        this.$router.push('/cart/checkout')
      }
    }
  }
};
</script>