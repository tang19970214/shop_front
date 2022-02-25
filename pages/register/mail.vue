<template>
  <section class="w-full">
    <!-- step -->
    <div class="w-full flex items-center justify-center gap-10 my-7">
      <div class="flex flex-col items-center" v-for="item in stepList" :key="item.id">
        <span class="min-w-[40px] max-w-[40px] min-h-[40px] max-h-[40px] rounded-full flex items-center justify-center mb-2" :class="{ 'bg-[#FA5936] text-white': item.id === defaultStep, 'bg-gray-300': item.id !== defaultStep }">{{ item.id }}</span>
        <label>{{ item.label }}</label>
      </div>
    </div>

    <!-- form -->
    <ValidationObserver ref="form" v-if="defaultStep === 1">
      <div class="form-group relative pb-6">
        <label class="form-label inline-block mb-2 text-gray-700" for="emailField">Email</label>
        <ValidationProvider name="Email" rules="required" v-slot="{ errors }" class="w-full">
          <input ref="emailField" id="emailField" v-model="registerInfo.email" type="email" class="form-control w-full px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:border-blue-600 focus:outline-none" :class="{ 'border-red-500': errors.length > 0 }" placeholder="請輸入電子信箱 ex. user@example.com" @keypress.enter="nextStep()" />
          <span v-if="errors.length > 0" class="absolute left-0 bottom-1 text-red-500 text-xs">{{ errors[0] }}</span>
        </ValidationProvider>
      </div>

      <button type="submit" data-mdb-ripple="true" data-mdb-ripple-color="light" class="w-full p-1.5 rounded-lg shadow-md text-white text-lg tracking-widest bg-gradient-to-r from-[#FA5936] to-[#FF6D3F] hover:shadow-inner disabled:cursor-not-allowed disabled:opacity-80 mb-4" :disabled="disNextStep" @click="nextStep()"><fa v-if="disNextStep" class="animate-spin text-xl mr-2" :icon="['fas', 'spinner']" />下一步</button>

      <div class="w-full text-center mb-6 text-sm text-gray-400">
        <p>若要繼續註冊，請先閱讀並同意本商城的<a class="text-[#0EA5E9] underline hover:no-underline cursor-pointer">服務條款</a>與<a class="text-[#0EA5E9] underline hover:no-underline cursor-pointer">隱私權政策</a></p>
      </div>

      <div class="w-full">
        <div class="relative w-full flex items-center justify-center mb-2">
          <span class="absolute left-0 top-1/2 w-full h-px border"></span>
          <div class="relative text-[#A3A3A3] text-lg px-3 bg-white">快速註冊</div>
        </div>

        <!-- TODO: 第三方註冊 @YuTsung -->
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

      <p class="text-gray-800 mt-6 text-center">已是會員？ <a class="text-[#0EA5E9] hover:underline cursor-pointer" @click="$router.push({ name: 'login' })">前往登入</a></p>
    </ValidationObserver>

    <!-- vertify -->
    <ValidationObserver ref="vertify" v-if="defaultStep === 2">
      <div class="w-full text-center mt-6 mb-4">
        <p>驗證碼已發送至</p>
        <p>{{ registerInfo.email }}</p>
      </div>

      <div class="form-group relative pb-6">
        <label class="form-label inline-block mb-2 text-gray-700">驗證碼</label>
        <ValidationProvider name="驗證碼" rules="required" v-slot="{ errors }" class="w-full">
          <input v-model="registerInfo.verifyCode" type="phone" class="form-control w-full px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:border-blue-600 focus:outline-none" :class="{ 'border-red-500': errors.length > 0 }" placeholder="請輸入簡訊內6位數驗證碼" @keypress.enter="goVerify()" />
          <span v-if="errors.length > 0" class="absolute left-0 bottom-1 text-red-500 text-xs">{{ errors[0] }}</span>
        </ValidationProvider>
      </div>

      <div class="form-group relative pb-6">
        <label class="form-label inline-block mb-2 text-gray-700">設定密碼</label>
        <ValidationProvider name="設定密碼" rules="required" v-slot="{ errors }" class="w-full">
          <div class="w-full relative">
            <input v-model="registerInfo.password" id="pwdId" type="password" class="form-control w-full pl-3 pr-8 py-1.5 text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:border-blue-600 focus:outline-none" :class="{ 'border-red-500': errors.length > 0 }" placeholder="請輸入您的密碼" @keypress.enter="goVerify()" />
            <fa class="absolute right-2 top-[11px] cursor-pointer text-base text-gray-600" :icon="['fas', `${pwdType === 'password' ? 'eye-slash' : 'eye'}`]" @click="showPassword()" />
          </div>
          <span v-if="errors.length > 0" class="absolute left-0 bottom-1 text-red-500 text-xs">{{ errors[0] }}</span>
        </ValidationProvider>
      </div>

      <button type="submit" data-mdb-ripple="true" data-mdb-ripple-color="light" class="w-full p-1.5 rounded-lg shadow-md text-white text-lg tracking-widest bg-gradient-to-r from-[#FA5936] to-[#FF6D3F] hover:shadow-inner disabled:cursor-not-allowed disabled:opacity-80" :disabled="disGoVerify" @click="goVerify()"><fa v-if="disGoVerify" class="animate-spin text-xl mr-2" :icon="['fas', 'spinner']" />驗證</button>
    </ValidationObserver>
  </section>
</template>

<script>
export default {
  name: "register-mail",
  data() {
    return {
      defaultStep: 1,
      stepList: [
        { id: 1, label: "輸入信箱" },
        { id: 2, label: "輸入驗證碼" },
      ],

      pwdType: "password",
      registerInfo: {
        password: "",
        name: "",
        phone: "",
        isPhoneVerify: true,
        email: "",
        isEmailVerify: false,
        county: "",
        area: "",
        address: "",
        birthday: "",
        fbUserId: "",
        googleUserId: "",
        lineUserId: "",
        verifyCode: "",
      },

      // disabled btn
      disNextStep: false,
      disGoVerify: false,
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
    async nextStep() {
      this.disNextStep = true;
      const status = await this.$refs.form.validate();

      if (status) {
        this.api.members
          .getRegistVerifyCode({ account: this.registerInfo.email })
          .then((res) => {
            const { code } = res.data;
            if (code === 200) {
              this.defaultStep = 2;
            } else {
              this.disNextStep = false;
              this.registerInfo.email = "";
              this.$refs.emailField.focus();
            }
          })
          .catch(() => {
            this.disNextStep = false;
          });
      } else {
        this.disNextStep = false;
      }
    },
    async goVerify() {
      this.disGoVerify = true;
      const status = await this.$refs.vertify.validate();

      if (status) {
        this.api.members
          .add(this.registerInfo)
          .then((res) => {
            const { code } = res.data;
            if (code === 200) {
              this.$router.push({ name: "register-finish" });
            } else {
              this.disGoVerify = false;
            }
          })
          .catch(() => {
            this.disGoVerify = false;
          });
      } else {
        this.disGoVerify = false;
      }
    },
    async facebookLogin() {
      await FB.login(() => {
         FB.getLoginStatus((res) => {
          const { authResponse, status } = res
          console.log(authResponse)
          if (status === 'connected') {
            FB.api('/me', {
              'fields': 'id, name, email, picture'
            }, function (profileRes) {
              const { id, name, email, picture } = profileRes
              console.log(profileRes)
            });
          }
        })
      },{
        scope: 'email',
        auth_type: 'rerequest'
      });
    },
    onSignInSuccess(googleUser) {
      const profile = googleUser.getBasicProfile();
      const {
        sf,
        zv
      } = profile
      const {
        access_token,
        expires_at,
        expires_in,
        id_token
      } = googleUser.wc
      console.log(sf, zv)
      console.log(id_token)

    },
    onSignInError(err) {
      console.log(err.error);
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
        let client_secret = "83d6a4c1fc49c5f9dac7e29b017cd0c0"
        let redirect_uri = `${process.env.VUE_APP_REDIRECTURI}`;
        let params = {
          "grant_type": 'authorization_code',
          "code": lineCode,
          "redirect_uri": redirect_uri,
          "client_id": client_id,
          "client_secret": client_secret
        }
        const { data } = await this.api.members.getLineToken(params);
        const {
          access_token,
          expires_in,
          id_token,
          refresh_token,
          scope,
          token_type
        } = data
        console.log(access_token);
        this.getLineProfiles(access_token);
      } catch (error) {
        console.log(error);
      }
    },
    async getLineProfiles(idToken) {
      try {
        const { data } = await this.api.members.getLineProfiles(idToken);
        const {
          userId,
          displayName,
          pictureUrl,
          statusMessage
        } = data;
        console.log(displayName, pictureUrl, userId);
      } catch (error) {
        console.log(error)
      }
    }
  }
};
</script>