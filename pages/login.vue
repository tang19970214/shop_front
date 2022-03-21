<template>
  <section class="w-full flex flex-col items-center justify-center px-5">
    <h3 class="text-2xl mb-6" v-if="$route.name !== 'login-resetFinish'">{{setTitle()}}</h3>

    <Nuxt-child class="md:max-w-[460px]" />
  </section>
</template>

<script>
export default {
  name: "login",
  middleware: ['checkMemberAuth'],
  computed: {
    setTitle() {
      return () => {
        switch (this.$route.name) {
          case "login-index":
            return "登入";
          case "login-forgetPassword":
            return "忘記密碼";
          case "login-resetPassword":
            return "重設密碼";
          default:
            return "登入";
        }
      };
    },
  },
  mounted() {
    window.fbAsyncInit = () => {
      FB.init({
        appId: "1289081708257437",
        cookie: true,
        xfbml: true,
        version: "v12.0",
      });
      FB.AppEvents.logPageView();
    }
  }
};
</script>