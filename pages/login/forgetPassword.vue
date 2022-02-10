<template>
  <section class="w-full">

    <ValidationObserver ref="form">
      <div class="form-group relative pb-6">
        <label class="form-label inline-block mb-2 text-gray-700">請輸入手機或信箱</label>
        <ValidationProvider name="手機或信箱" rules="required" v-slot="{ errors }" class="w-full">
          <input v-model="field" class="form-control w-full px-3 py-1.5 text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" :class="{'border-red-500': errors.length > 0}" placeholder="請輸入手機 / Email">
          <span v-if="errors.length > 0" class="absolute left-0 bottom-1 text-red-500 text-xs">{{ errors[0] }}</span>
        </ValidationProvider>
      </div>

      <button type="submit" class="w-full p-1.5 rounded-lg shadow-md text-white text-lg tracking-widest bg-gradient-to-r from-[#FA5936] to-[#FF6D3F] hover:shadow-inner" @click="handleNext()">下一步</button>
    </ValidationObserver>
  </section>
</template>

<script>
export default {
  name: "login-forgetPassword",
  data() {
    return {
      field: "",
    };
  },
  methods: {
    async handleNext() {
      const status = await this.$refs.form.validate();

      if (status) {
        // const checkType = this.field.slice(0, 2);
        // console.log(checkType);

        this.$router.push({ name: "login-resetPassword" });
      }
    },
  },
};
</script>