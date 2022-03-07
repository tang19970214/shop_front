<template>
  <section class="w-full md:px-8">
    <button data-mdb-ripple="true" data-mdb-ripple-color="light" class="py-3.5 px-20 shadow-md text-white text-lg tracking-widest bg-gradient-to-r from-[#FA5936] to-[#FF6D3F] hover:shadow-inner disabled:cursor-not-allowed disabled:opacity-80" @click="$router.push({ name: 'cart-checkout' })">立即結帳</button>
  </section>
</template>

<script>
export default {
  name: "cart-index",
};
</script>