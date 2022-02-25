<template>
  <section class="fixed top-0 left-0 w-full h-16 lg:h-36 bg-white shadow-xl z-20">
    <div class="w-full h-full p-4 box-border flex items-center justify-between">
      <h1 class="text-2xl font-bold" @click="$router.push('/')">首頁</h1>
      <div class="flex items-center justify-end gap-2">
        <p @click="$router.push({ name: 'login' })">登入</p>
        |
        <p @click="$router.push({ name: 'register' })">註冊</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Header",
  mounted() {
    window.fbAsyncInit = () => {
      FB.init
      ({
        appId: "1289081708257437",
        cookie: true,
        xfbml: true,
        version: "v12.0"
      });
      FB.AppEvents.logPageView();
    };
  }
};
</script>