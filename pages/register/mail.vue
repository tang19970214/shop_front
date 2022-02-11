<template>
  <section class="w-full">
    <!-- step -->
    <div class="w-full flex items-center justify-center gap-10 my-7">
      <div class="flex flex-col items-center" v-for="item in stepList" :key="item.id">
        <span class="min-w-[40px] max-w-[40px] min-h-[40px] max-h-[40px] rounded-full flex items-center justify-center mb-2" :class="{'bg-[#FA5936] text-white': item.id === defaultStep, 'bg-gray-300': item.id !== defaultStep}">{{item.id}}</span>
        <label>{{item.label}}</label>
      </div>
    </div>

    <!-- form -->
    <ValidationObserver ref="form" v-if="defaultStep === 1">
      <div class="form-group relative pb-6">
        <label class="form-label inline-block mb-2 text-gray-700">Email</label>
        <ValidationProvider name="Email" rules="required" v-slot="{ errors }" class="w-full">
          <input v-model="email" type="email" class="form-control w-full px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:border-blue-600 focus:outline-none" :class="{'border-red-500': errors.length > 0}" placeholder="請輸入電子信箱 ex. user@example.com">
          <span v-if="errors.length > 0" class="absolute left-0 bottom-1 text-red-500 text-xs">{{ errors[0] }}</span>
        </ValidationProvider>
      </div>

      <button type="submit" class="w-full p-1.5 rounded-lg shadow-md text-white text-lg tracking-widest bg-gradient-to-r from-[#FA5936] to-[#FF6D3F] hover:shadow-inner mb-4" @click="nextStep()">下一步</button>

      <div class="w-full text-center mb-6 text-sm text-gray-400">
        <p>若要繼續註冊，請先閱讀並同意本商城的<a class="text-[#0EA5E9] underline hover:no-underline cursor-pointer">服務條款</a>與<a class="text-[#0EA5E9] underline hover:no-underline cursor-pointer">隱私權政策</a></p>
      </div>

      <div class="w-full">
        <div class="relative w-full flex items-center justify-center mb-2">
          <span class="absolute left-0 top-1/2 w-full h-px border"></span>
          <div class="relative text-[#A3A3A3] text-lg px-3 bg-white">快速註冊</div>
        </div>

        <!-- 第三方登入 -->
        <!-- <div class="w-full grid grid-cols-1 lg:grid-cols-3 lg:gap-5">
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
        </div> -->
      </div>

      <p class="text-gray-800 mt-6 text-center">已是會員？ <a class="text-[#0EA5E9] hover:underline cursor-pointer" @click="$router.push({name: 'login'})">前往登入</a>
      </p>
    </ValidationObserver>

    <!-- vertify -->
    <ValidationObserver ref="vertify" v-if="defaultStep === 2">
      <div class="w-full text-center mt-6 mb-4">
        <p>驗證碼已發送至</p>
        <p>{{email}}</p>
      </div>

      <div class="form-group relative pb-6">
        <label class="form-label inline-block mb-2 text-gray-700">驗證碼</label>
        <ValidationProvider name="驗證碼" rules="required" v-slot="{ errors }" class="w-full">
          <input v-model="verifyCode" type="phone" class="form-control w-full px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:border-blue-600 focus:outline-none" :class="{'border-red-500': errors.length > 0}" placeholder="請輸入簡訊內6位數驗證碼" @keypress.enter="goVerify()">
          <span v-if="errors.length > 0" class="absolute left-0 bottom-1 text-red-500 text-xs">{{ errors[0] }}</span>
        </ValidationProvider>
      </div>

      <button type="submit" class="w-full p-1.5 rounded-lg shadow-md text-white text-lg tracking-widest bg-gradient-to-r from-[#FA5936] to-[#FF6D3F] hover:shadow-inner" @click="goVerify()">驗證</button>
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

      email: "",
      verifyCode: "",
    };
  },
  methods: {
    async nextStep() {
      const status = await this.$refs.form.validate();

      if (status) {
        this.defaultStep = 2;
      }
    },
    async goVerify() {
      const status = await this.$refs.vertify.validate();

      if (status) {
        const query = {
          acc: this.phone || "0975429820",
          verifyCode: this.verifyCode,
        };
        $api.members.checkRegistVerifyCode(query).then(() => {
          this.$swal.fire({
            icon: "success",
            title: "完成註冊！",
            timer: 1500,
            showConfirmButton: false,
          });
          this.$router.push({ name: "register-finish" });
        });
      }
    },
  },
};
</script>