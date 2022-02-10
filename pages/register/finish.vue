<template>
  <section class="w-full">
    <div class="w-full flex items-center justify-center gap-2">
      <fa class="text-green-600 text-3xl" :icon="['far', 'check-circle']" />
      <strong class="tracking-widest text-2xl">完成註冊</strong>
    </div>

    <button type="submit" class="w-full p-1.5 rounded-lg shadow-md text-white text-lg tracking-widest bg-gradient-to-r from-[#FA5936] to-[#FF6D3F] hover:shadow-inner mt-12" @click="$router.push({name: 'login'})">立即登入</button>
  </section>
</template>

<script>
export default {
  name: "register-finish",
};
</script>