<template>
  <section class="w-full md:px-8">
    <FinishOrder />

    <div class="flex justify-center my-20">
      <button data-mdb-ripple="true" data-mdb-ripple-color="light" class="py-3.5 px-20 rounded-xl shadow-md text-white text-lg tracking-widest bg-gradient-to-r from-[#FA5936] to-[#FF6D3F] hover:shadow-inner disabled:cursor-not-allowed disabled:opacity-80" @click="viewOrder()">查看我的訂單</button>
    </div>
  </section>
</template>

<script>
export default {
  name: "cart-finish",
  data() {
    return {

    }
  },
  methods: {
    viewOrder() {
      this.$router.push('/member/order')
      console.log("查看訂單");
    }
  }
};
</script>