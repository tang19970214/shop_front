<template>
  <section class="fixed top-0 left-0 w-full p-5 lg:p-5 bg-white shadow-[0px_4px_4px_rgba(140,140,140,0.25)] z-20">
    <div class="w-full h-full box-border flex items-center justify-between">
      <h1 class="text-2xl font-bold cursor-pointer" @click="$router.push('/'), (page = '')">首頁</h1>

      <div class="ml-auto flex items-center gap-2">
        <div class="flex items-center justify-end gap-2">
          <p class="duration-300 cursor-pointer" :class="{ 'text-[#fa5936]': $route.name === 'login' }" @click="$router.push({ name: 'login' }), (page = 'login')">登入</p>
          |
          <p class="duration-300 cursor-pointer" :class="{ 'text-[#fa5936]': $route.name === 'register' }" @click="$router.push({ name: 'register' }), (page = 'register')">註冊</p>
        </div>

        <div class="inline-flex relative w-fit">
          <div class="absolute inline-block top-0 right-0 translate-x-1/2 -translate-y-1/2 p-0.5 px-1 text-xs leading-none whitespace-nowrap font-bold bg-red-500 text-white rounded-full z-10">2</div>
          <fa class="cursor-pointer" @click="$router.push('/cart')" :icon="['fas', 'shopping-cart']" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      page: "",
    };
  },
  mounted() {
    // FIXME:@ryan
    const path = window.location.pathname;
    if (path.indexOf("login") !== -1) {
      this.page = "login";
    } else if (path.indexOf("register") !== -1) {
      this.page = "register";
    } else {
      this.page = "";
    }

    window.fbAsyncInit = () => {
      FB.init({
        appId: "1289081708257437",
        cookie: true,
        xfbml: true,
        version: "v12.0",
      });
      FB.AppEvents.logPageView();
    };
  },
};
</script>
