<template>
  <section class="w-full">
    <ValidationObserver ref="form">
      <div class="form-group relative pb-6">
        <label class="form-label inline-block mb-2 text-gray-700" for="accountId">帳號</label>
        <ValidationProvider name="帳號" rules="required" v-slot="{ errors }" class="w-full">
          <input v-model="formInfo.account" id="accountId" type="text" class="form-control w-full px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:border-blue-600 focus:outline-none" :class="{ 'border-red-500': errors.length > 0 }" placeholder="請輸入手機 / Email" />
          <span v-if="errors.length > 0" class="absolute left-0 bottom-1 text-red-500 text-xs">{{ errors[0] }}</span>
        </ValidationProvider>
      </div>

      <div class="form-group relative pb-6">
        <label class="form-label inline-block mb-2 text-gray-700" for="pwdId">密碼</label>
        <ValidationProvider name="密碼" rules="required" v-slot="{ errors }" class="w-full">
          <div class="w-full relative">
            <input v-model="formInfo.password" id="pwdId" type="password" class="form-control w-full pl-3 pr-8 py-1.5 text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:border-blue-600 focus:outline-none" :class="{ 'border-red-500': errors.length > 0 }" placeholder="請輸入密碼" @keypress.enter="handleLogin()" />
            <fa class="absolute right-2 top-3 cursor-pointer text-base text-gray-600" :icon="['fas', `${pwdType === 'password' ? 'eye-slash' : 'eye'}`]" @click="showPassword()" />
          </div>
          <span v-if="errors.length > 0" class="absolute left-0 bottom-1 text-red-500 text-xs">{{ errors[0] }}</span>
        </ValidationProvider>
      </div>

      <button type="submit" data-mdb-ripple="true" data-mdb-ripple-color="light" class="w-full p-1.5 rounded-lg shadow-md text-white text-lg tracking-widest bg-gradient-to-r from-[#FA5936] to-[#FF6D3F] hover:shadow-inner disabled:cursor-not-allowed disabled:opacity-80 mb-4" :disabled="disLoginBtn" @click="handleLogin()">
        <fa v-if="disLoginBtn" class="animate-spin text-xl mr-2" :icon="['fas', 'spinner']" />登入
      </button>

      <div class="flex justify-end items-center mb-6">
        <a @click="$router.push({ name: 'login-forgetPassword' })" class="text-[#0EA5E9] hover:underline cursor-pointer">忘記密碼？</a>
      </div>

      <div class="w-full">
        <div class="relative w-full flex items-center justify-center mb-2">
          <span class="absolute left-0 top-1/2 w-full h-px border"></span>
          <div class="relative text-[#A3A3A3] text-lg px-3 bg-white">或</div>
        </div>

        <!-- 第三方登入 -->
        <div class="w-full grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-5">
          <button class="px-1.5 flex items-center gap-1 bg-white border border-[#A3A3A3] rounded-lg cursor-pointer transition duration-300 hover:bg-[#CCCCCC] hover: bg-opacity-40" @click="facebookLogin()">
            <img src="~/static/images/icon/facebook.svg" alt="Facebook" width="36px" />
            <p>Facebook</p>
          </button>

          <g-signin-button class="px-1.5 flex items-center gap-1 bg-white border border-[#A3A3A3] rounded-lg cursor-pointer transition duration-300 hover:bg-[#CCCCCC] hover: bg-opacity-40" :params="googleSignInParams" @success="onSignInSuccess" @error="onSignInError">
            <img src="~/static/images/icon/google.svg" alt="Google" width="36px" />
            <p>Google</p>
          </g-signin-button>

          <button class="px-1.5 flex items-center gap-1 bg-white border border-[#A3A3A3] rounded-lg cursor-pointer transition duration-300 hover:bg-[#CCCCCC] hover: bg-opacity-40" @click="lineLogin()">
            <img src="~/static/images/icon/line.svg" alt="LINE帳號" width="36px" />
            <p>LINE帳號</p>
          </button>
        </div>
      </div>

      <p class="text-gray-800 mt-6 text-center">
        還沒加入會員？
        <a class="text-[#0EA5E9] hover:underline cursor-pointer" @click="$router.push({ name: 'register' })">前往註冊</a>
      </p>
    </ValidationObserver>
  </section>
</template>
<script>
export default {
  name: "login-index",
  middleware: ["checkMemberAuth"],
  data() {
    return {
      pwdType: "password",
      disLoginBtn: false,
      formInfo: {
        source: "computer",
        account: "",
        password: "",
        provider: "",
      },

      googleSignInParams: {
        client_id: "133220704045-n7apgpp07hs37pc1iu6ngcshc5c7sm3v.apps.googleusercontent.com",
      },
    };
  },
  methods: {
    showPassword() {
      let x = document.getElementById("pwdId");
      if (x.type === "password") {
        x.type = "text";
      } else {
        x.type = "password";
      }
      this.pwdType = x.type;
    },
    async handleLogin() {
      this.disLoginBtn = true;
      const status = await this.$refs.form.validate();

      if (status) {
        this.$store
          .dispatch("Login", this.formInfo)
          .then((status) => {
            if (status === "success") {
              this.$swal
                .fire({
                  icon: "success",
                  title: "登入成功！",
                  timer: 1000,
                  showConfirmButton: false,
                })
                .then(() => {
                  this.$router.push("/");
                });
            } else {
              this.$swal.fire({
                icon: "error",
                title: status,
                timer: 1000,
                showConfirmButton: false,
              });
              this.disLoginBtn = false;
            }
          })
          .catch(() => {
            this.disLoginBtn = false;
          });
      } else {
        this.disLoginBtn = false;
      }
    },
    async facebookLogin() {
      await FB.login(
        () => {
          FB.getLoginStatus((res) => {
            const { authResponse, status } = res;
            console.log(authResponse);
            if (status === "connected") {
              FB.api(
                "/me",
                {
                  fields: "id, name, email, picture",
                },
                function (profileRes) {
                  const { id, name, email, picture } = profileRes;
                  console.log(profileRes);
                }
              );
            }
          });
        },
        {
          scope: "email",
          auth_type: "rerequest",
        }
      );
    },
    onSignInSuccess(googleUser) {
      const profile = googleUser.getBasicProfile();
      const { sf, zv } = profile;
      const { access_token, expires_at, expires_in, id_token } = googleUser.wc;
      console.log(sf, zv);
      console.log(id_token);
    },
    onSignInError(error) {
      console.log(error);
    },
    lineLogin() {
      let client_id = "1656841233";
      let redirect_uri = `${process.env.VUE_APP_REDIRECTURI}`;
      let link = "https://access.line.me/oauth2/v2.1/authorize?response_type=code";
      link += `&client_id=${client_id}&redirect_uri=${redirect_uri}&state=login&scope=profile%20openid%20email`;
      window.location.href = link;
    },
    async getLineToken(lineCode) {
      try {
        let client_id = "1656841233";
        let client_secret = "83d6a4c1fc49c5f9dac7e29b017cd0c0";
        let redirect_uri = `${process.env.VUE_APP_REDIRECTURI}`;
        let params = {
          grant_type: "authorization_code",
          code: lineCode,
          redirect_uri: redirect_uri,
          client_id: client_id,
          client_secret: client_secret,
        };
        const { data } = await this.api.members.getLineToken(params);
        const { access_token, expires_in, id_token, refresh_token, scope, token_type } = data;
        console.log(access_token);
        this.getLineProfiles(access_token);
      } catch (error) {
        console.log(error);
      }
    },
    async getLineProfiles(idToken) {
      try {
        const { data } = await this.api.members.getLineProfiles(idToken);
        const { userId, displayName, pictureUrl, statusMessage } = data;
        console.log(displayName, pictureUrl, userId);
      } catch (error) {
        console.log(error);
      }
    },
  },
  // FIXME:@ryan => mounted
  created() {
    const params = new URLSearchParams(window.location.search);
    const lineCode = params.get("code");
    if (lineCode !== null) {
      this.getLineToken(lineCode);
    }
  },
};
</script>
