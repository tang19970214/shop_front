<template>
  <section class="fixed top-0 left-0 w-full p-5 lg:p-5 bg-white shadow-xl z-20">
    <div class="w-full h-full box-border flex items-center justify-between">
      <h1 class="text-2xl font-bold cursor-pointer" @click="$router.push('/'), (page = '')">首頁</h1>
      <div class="flex items-center justify-end gap-2">
        <p class="duration-300 cursor-pointer" :class="{ 'text-[#fa5936]': page === 'login' }" @click="$router.push({ name: 'login' }), (page = 'login')">登入</p>
        |
        <p class="duration-300 cursor-pointer" :class="{ 'text-[#fa5936]': page === 'register' }" @click="$router.push({ name: 'register' }), (page = 'register')">註冊</p>
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
    // FIXME:@ryan ================================
    // active效果有更好的做法，不需要寫這一段，思考一下，想完後先跟我討論再修改
    const path = window.location.pathname;
    if (path.indexOf("login") !== -1) {
      this.page = "login";
    } else if (path.indexOf("register") !== -1) {
      this.page = "register";
    } else {
      this.page = "";
    }
    // ============================================

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