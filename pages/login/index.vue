<template>
  <section class="w-full">
    <ValidationObserver ref="form">
      <div class="form-group relative pb-6">
        <label class="form-label inline-block mb-2 text-gray-700">帳號</label>
        <ValidationProvider name="帳號" rules="required" v-slot="{ errors }" class="w-full">
          <input v-model="formInfo.account" type="email" class="form-control w-full px-3 py-1.5 text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" :class="{'border-red-500': errors.length > 0}" placeholder="請輸入手機 / Email">
          <span v-if="errors.length > 0" class="absolute left-0 bottom-1 text-red-500 text-xs">{{ errors[0] }}</span>
        </ValidationProvider>
      </div>

      <div class="form-group relative pb-6">
        <label class="form-label inline-block mb-2 text-gray-700">密碼</label>
        <ValidationProvider name="密碼" rules="required" v-slot="{ errors }" class="w-full">
          <input v-model="formInfo.password" type="password" class="form-control w-full px-3 py-1.5 text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" :class="{'border-red-500': errors.length > 0}" placeholder="請輸入密碼" @keypress.enter="handleLogin()">
          <span v-if="errors.length > 0" class="absolute left-0 bottom-1 text-red-500 text-xs">{{ errors[0] }}</span>
        </ValidationProvider>
      </div>

      <button type="submit" class="w-full p-1.5 rounded-lg shadow-md text-white text-lg tracking-widest bg-gradient-to-r from-[#FA5936] to-[#FF6D3F] hover:shadow-inner mb-4" @click="handleLogin()">登入</button>

      <div class="flex justify-end items-center mb-6">
        <a @click="$router.push({name: 'login-forgetPassword'})" class="text-[#0EA5E9] hover:underline cursor-pointer">忘記密碼？</a>
      </div>

      <div class="w-full">
        <div class="relative w-full flex items-center justify-center mb-2">
          <span class="absolute left-0 top-1/2 w-full h-px border"></span>
          <div class="relative text-[#A3A3A3] text-lg px-3 bg-white">或</div>
        </div>

        <!-- 第三方登入 -->
        <div class="w-full grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-5">
          <button class="px-1.5 flex items-center gap-1 bg-white border border-[#A3A3A3] rounded-lg cursor-pointer transition duration-300 hover:bg-[#CCCCCC] hover: bg-opacity-40" @click="facebookLogin()">
            <img src="~/static/images/icon/facebook.svg" alt="Facebook" width="36px">
            <p>Facebook</p>
          </button>

          <g-signin-button class="px-1.5 flex items-center gap-1 bg-white border border-[#A3A3A3] rounded-lg cursor-pointer transition duration-300 hover:bg-[#CCCCCC] hover: bg-opacity-40" :params="googleSignInParams" @success="onSignInSuccess" @error="onSignInError">
            <img src="~/static/images/icon/google.svg" alt="Google" width="36px">
            <p>Google</p>
          </g-signin-button>

          <button class="px-1.5 flex items-center gap-1 bg-white border border-[#A3A3A3] rounded-lg cursor-pointer transition duration-300 hover:bg-[#CCCCCC] hover: bg-opacity-40" @click="lineLogin()">
            <img src="~/static/images/icon/line.svg" alt="LINE帳號" width="36px">
            <p>LINE帳號</p>
          </button>
        </div>
      </div>

      <p class="text-gray-800 mt-6 text-center">還沒加入會員？ <a class="text-[#0EA5E9] hover:underline cursor-pointer" @click="$router.push({name: 'register'})">前往註冊</a>
      </p>
    </ValidationObserver>
  </section>
</template>

<script>
export default {
  name: "login-index",
  asyncData() {
    console.log($api);
  },
  data() {
    return {
      formInfo: {
        account: "",
        password: "",
        provider: "",
      },

      googleSignInParams: {
        client_id:
          "133220704045-n7apgpp07hs37pc1iu6ngcshc5c7sm3v.apps.googleusercontent.com",
      },
    };
  },
  methods: {
    async handleLogin() {
      const status = await this.$refs.form.validate();

      if (status) {
        console.log("登入", this.formInfo);
        this.$store.dispatch("Login", this.formInfo).then((res) => {
          console.log(res);
        });
      }
    },

    facebookLogin() {
      FB.login((res) => {
        console.log(res);
      });
    },
    onSignInSuccess(googleUser) {
      const profile = googleUser.getBasicProfile();
      console.log(googleUser, profile);
    },
    onSignInError(error) {
      console.log(error);
    },
    lineLogin() {
      let client_id = "1656841233";
      let redirect_uri = `${process.env.VUE_APP_REDIRECTURI}`;
      let link = "https://access.line.me/oauth2/v2.1/authorize?";
      link += "response_type=code";
      link += `&client_id=${client_id}`;
      link += `&redirect_uri=${redirect_uri}`;
      link += "&state=login";
      link += "&scope=profile%20openid";
      window.location.href = link;
    },
  },
  mounted() {
    // console.log($api);

    window.fbAsyncInit = () => {
      FB.init({
        appId: "1289081708257437",
        cookie: true,
        xfbml: true,
        version: "v12.0",
      });
      FB.AppEvents.logPageView();

      // Get FB Login Status
      FB.getLoginStatus((res) => {
        console.log("res", res);
        const { status, authResponse } = res;
        if (status === "connected") {
          console.log(authResponse.accessToken);
        }
      });
    };
  },
};
</script>