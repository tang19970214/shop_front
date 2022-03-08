<template>
  <section class="w-full md:px-8">
    <div class="w-full rounded-lg p-4 bg-[#FFF5C2] flex flex-col items-center mb-4">
      <span class="flex items-center gap-1">
        <strong>已收到您的訂單</strong>
        <fa class="text-green-500" :icon="['fas', 'check']" />
      </span>
      <p>訂單編號：21111708328107</p>
    </div>

    <button data-mdb-ripple="true" data-mdb-ripple-color="light" class="py-3.5 px-20 rounded-xl shadow-md text-white text-lg tracking-widest bg-gradient-to-r from-[#FA5936] to-[#FF6D3F] hover:shadow-inner disabled:cursor-not-allowed disabled:opacity-80" @click="viewOrder()">查看我的訂單</button>
  </section>
</template>

<script>
export default {
  name: "cart=finish",
  methods: {
    viewOrder() {
      this.$router.push('/member/order')
      console.log("查看訂單");
    },
  },
};
</script>