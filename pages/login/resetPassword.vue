<template>
  <section class="w-full">
    <ValidationObserver ref="form">
      <div class="form-group relative pb-6">
        <ValidationProvider name="密碼" rules="required" v-slot="{ errors }" class="w-full">
          <div class="w-full relative">
            <input v-model="password" id="pwdId" type="password" class="form-control w-full pl-3 pr-8 py-1.5 text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:border-blue-600 focus:outline-none" :class="{ 'border-red-500': errors.length > 0 }" placeholder="請輸入至少8個字元, 數字和大小寫字母的密碼" @keypress.enter="$refs.pwdAgain.focus()" />
            <fa class="absolute right-2 top-3 cursor-pointer text-base text-gray-600" :icon="['fas', `${pwdType === 'password' ? 'eye-slash' : 'eye'}`]" @click="showPassword('pwdId', 'pwdType')" />
          </div>
          <span v-if="errors.length > 0" class="absolute left-0 bottom-1 text-red-500 text-xs">{{ errors[0] }}</span>
        </ValidationProvider>
      </div>

      <div class="form-group relative pb-6">
        <ValidationProvider name="再次輸入密碼" rules="required" v-slot="{ errors }" class="w-full">
          <div class="w-full relative">
            <input ref="pwdAgain" v-model="passwordAgain" id="againPwdId" type="password" class="form-control w-full pl-3 pr-8 py-1.5 text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:border-blue-600 focus:outline-none" :class="{ 'border-red-500': errors.length > 0 }" placeholder="再次輸入密碼" @keypress.enter="handleSubmit()" />
            <fa class="absolute right-2 top-3 cursor-pointer text-base text-gray-600" :icon="['fas', `${againPwdType === 'password' ? 'eye-slash' : 'eye'}`]" @click="showPassword('againPwdId', 'againPwdType')" />
          </div>
          <span v-if="errors.length > 0" class="absolute left-0 bottom-1 text-red-500 text-xs">{{ errors[0] }}</span>
        </ValidationProvider>
      </div>

      <button type="submit" class="w-full p-1.5 rounded-lg shadow-md text-white text-lg tracking-widest bg-gradient-to-r from-[#FA5936] to-[#FF6D3F] hover:shadow-inner disabled:cursor-not-allowed disabled:opacity-80" :disabled="disSubmitBtn" @click="handleSubmit()"><fa v-if="disSubmitBtn" class="animate-spin text-xl mr-2" :icon="['fas', 'spinner']" />送出</button>
    </ValidationObserver>
  </section>
</template>

<script>
export default {
  name: "login-forgetPassword",
  data() {
    return {
      pwdType: "password",
      againPwdType: "password",
      disSubmitBtn: false,
      password: "",
      passwordAgain: "",
    };
  },
  methods: {
    showPassword(id, type) {
      let x = document.getElementById(id);
      if (x.type === "password") {
        x.type = "text";
      } else {
        x.type = "password";
      }
      this[type] = x.type;
    },
    async handleSubmit() {
      this.disSubmitBtn = true;
      const status = await this.$refs.form.validate();

      if (status) {
        // TODO: 接api
        console.log(this.password, this.passwordAgain);
        this.$router.push({ name: "login-resetFinish" });
      } else {
        this.disSubmitBtn = false;
      }
    },
  },
};
</script>
