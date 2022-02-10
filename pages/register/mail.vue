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
          <input v-model="email" type="email" class="form-control w-full px-3 py-1.5 text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" :class="{'border-red-500': errors.length > 0}" placeholder="請輸入電子信箱 ex. user@example.com">
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
    <div class="w-full mt-8" v-if="defaultStep === 2">
      <div class="w-full text-gray-700">
        <p>我們已經將電子郵件寄送至</p>
        <p>{{email}}</p>
      </div>

      <div class="w-full mt-4 text-gray-700">
        <p>您必須驗證電子郵件才能繼續執行。</p>
        <p>如果您尚未收到驗證電子郵件，請查看【垃圾郵件】或【電子廣告郵件】檔案夾。</p>
        <p>您也可以在下面選按重寄按鈕，要求再寄一次。</p>
      </div>

      <div class="w-full mt-7 flex items-center justify-end">
        <a class="text-[#0EA5E9] cursor-pointer" @click="reSendVertify()">
          <fa :icon="['fas', 'redo']" /> 重寄驗證信
        </a>
      </div>
    </div>
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
        { id: 2, label: "收驗證信" },
      ],

      email: "",
    };
  },
  methods: {
    async nextStep() {
      const status = await this.$refs.form.validate();

      if (status) {
        this.defaultStep = 2;
      }
    },
    reSendVertify() {
      console.log("驗證");
      // this.$router.push({ name: "register-finish" });
    },
  },
};
</script>