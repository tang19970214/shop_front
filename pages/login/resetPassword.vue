<template>
  <section class="w-full">

    <ValidationObserver ref="form">
      <div class="form-group relative pb-6">
        <ValidationProvider name="密碼" rules="required" v-slot="{ errors }" class="w-full">
          <input v-model="password" type="email" class="form-control w-full px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:border-blue-600 focus:outline-none" :class="{'border-red-500': errors.length > 0}" placeholder="請輸入至少8個字元, 數字和大小寫字母的密碼">
          <span v-if="errors.length > 0" class="absolute left-0 bottom-1 text-red-500 text-xs">{{ errors[0] }}</span>
        </ValidationProvider>
      </div>

      <div class="form-group relative pb-6">
        <ValidationProvider name="再次輸入密碼" rules="required" v-slot="{ errors }" class="w-full">
          <input v-model="passwordAgain" type="email" class="form-control w-full px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:border-blue-600 focus:outline-none" :class="{'border-red-500': errors.length > 0}" placeholder="再次輸入密碼">
          <span v-if="errors.length > 0" class="absolute left-0 bottom-1 text-red-500 text-xs">{{ errors[0] }}</span>
        </ValidationProvider>
      </div>

      <button type="submit" class="w-full p-1.5 rounded-lg shadow-md text-white text-lg tracking-widest bg-gradient-to-r from-[#FA5936] to-[#FF6D3F] hover:shadow-inner" @click="handleSubmit()">送出</button>
    </ValidationObserver>
  </section>
</template>

<script>
export default {
  name: "login-forgetPassword",
  data() {
    return {
      password: "",
      passwordAgain: "",
    };
  },
  methods: {
    async handleSubmit() {
      const status = await this.$refs.form.validate();

      if (status) {
        console.log(this.password, this.passwordAgain);
        this.$router.push({ name: "login-resetFinish" });
      }
    },
  },
};
</script>