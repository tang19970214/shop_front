<template>
  <section class="w-full">
    <ValidationObserver ref="form">
      <div class="form-group relative pb-6">
        <label
          class="form-label inline-block mb-2 text-gray-700"
          for="fogetInputId"
          >請輸入手機或信箱</label
        >
        <ValidationProvider
          name="手機或信箱"
          rules="required"
          v-slot="{ errors }"
          class="w-full"
        >
          <input
            v-model="field"
            id="fogetInputId"
            class="form-control w-full px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:border-blue-600 focus:outline-none"
            :class="{ 'border-red-500': errors.length > 0 }"
            placeholder="請輸入手機 / Email"
            @keypress.enter="handleNext()"
          />
          <span
            v-if="errors.length > 0"
            class="absolute left-0 bottom-1 text-red-500 text-xs"
            >{{ errors[0] }}</span
          >
        </ValidationProvider>
      </div>

      <button
        type="submit"
        data-mdb-ripple="true"
        data-mdb-ripple-color="light"
        class="w-full p-1.5 rounded-lg shadow-md text-white text-lg tracking-widest bg-gradient-to-r from-[#FA5936] to-[#FF6D3F] hover:shadow-inner disabled:cursor-not-allowed disabled:opacity-80"
        :disabled="disNextBtn"
        @click="handleNext()"
      >
        <fa
          v-if="disNextBtn"
          class="animate-spin text-xl mr-2"
          :icon="['fas', 'spinner']"
        />下一步
      </button>
    </ValidationObserver>
  </section>
</template>

<script>
export default {
  name: "login-forgetPassword",
  data() {
    return {
      disNextBtn: false,
      field: "",
    };
  },
  methods: {
    async handleNext() {
      this.disNextBtn = true;
      const status = await this.$refs.form.validate();

      if (status) {
        // TODO: 接api
        this.$router.push({ name: "login-resetPassword" });
      } else {
        this.disNextBtn = false;
      }
    },
  },
};
</script>
