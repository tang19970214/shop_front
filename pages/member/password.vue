<template>
  <section class="w-full lg:px-[50px]">
    <h2 class="text-[18px] mb-[16px] font-bold tracking-[0.105em]">修改密碼</h2>
    <div class="w-full rounded-xl pb-[24px] lg:p-10 lg:pb-[24px] border-none lg:border-[1px] lg:border-[#a3a3a3] lg:border-solid">
      <ValidationObserver ref="form" v-slot="{ handleSubmit, invalid }">
        <form @submit.prevent="handleSubmit(handleChangePwd)">
          <label class="form-label tracking-[0.105em] text-[18px] inline-block mb-2 text-gray-700" for="oldPwdId">舊密碼<span class="text-[#FA5936]">*</span></label>
          <div class="form-group relative pb-6">
            <ValidationProvider name="舊密碼" rules="required" v-slot="{ errors }" class="w-full">
              <div class="w-full lg:w-1/2 relative">
                <input id="oldPwdId" type="password" class="form-control w-full lg:w-full px-3 py-1.5 text-gray-700 border-[1px] border-[#a3a3a3] rounded-[10px] transition ease-in-out focus:text-gray-700 focus:border-blue-600 focus:outline-none" :class="{ 'border-[#EF4444]': errors.length > 0 }" placeholder="請輸舊密碼" v-model="memberPwd.oldPwd" />
                <span v-if="errors.length > 0" class="absolute left-[10px] bottom-[-20px] text-red-500 text-xs">{{ errors[0] }}</span>
                <fa class="absolute right-2 top-[11px] cursor-pointer text-base text-gray-600" :icon="['fas', `${oldPwdType === false ? 'eye-slash' : 'eye'}`]" @click="changePwdInputType('oldPwd')" />
              </div>
            </ValidationProvider>
          </div>
          <label class="form-label tracking-[0.105em] text-[18px] inline-block mb-2 text-gray-700" for="newPwdId">新密碼<span class="text-[#FA5936]">*</span></label>
          <div class="form-group relative pb-6">
            <ValidationProvider name="新密碼" rules="required|min:8|max:15|requireAlphaNum" v-slot="{ errors }" class="w-full" ref="新密碼">
              <div class="w-full lg:w-1/2 relative">
                <input id="newPwdId" type="password" class="form-control w-full lg:w-full px-3 py-1.5 text-gray-700 border-[1px] border-[#a3a3a3] rounded-[10px] transition ease-in-out focus:text-gray-700 focus:border-blue-600 focus:outline-none" :class="{ 'border-[#EF4444]': errors.length > 0 }" placeholder="請輸入至少8個字元, 數字和大小寫字母的密碼" v-model="memberPwd.newPwd" />
                <span v-if="errors.length > 0" class="absolute left-[10px] bottom-[-20px] text-red-500 text-xs">{{ errors[0] }}</span>
                <fa class="absolute right-2 top-[11px] cursor-pointer text-base text-gray-600" :icon="['fas', `${newPwdType === false ? 'eye-slash' : 'eye'}`]" @click="changePwdInputType('newPwd')" />
              </div>
            </ValidationProvider>
          </div>
          <label class="form-label tracking-[0.105em] text-[18px] inline-block mb-2 text-gray-700" for="confirmPwdId">確認密碼<span class="text-[#FA5936]">*</span></label>
          <div class="form-group relative">
            <ValidationProvider name="確認密碼" rules="required|confirmed:新密碼" v-slot="{ errors }" class="w-full">
              <div class="w-full lg:w-1/2 relative">
                <input id="confirmPwdId" type="password" class="form-control w-full lg:w-full px-3 py-1.5 text-gray-700 border-[1px] border-[#a3a3a3] rounded-[10px] transition ease-in-out focus:text-gray-700 focus:border-blue-600 focus:outline-none" :class="{ 'border-[#EF4444]': errors.length > 0 }" placeholder="確認新密碼" v-model="memberPwd.confirmPwd" />
                <span v-if="errors.length > 0" class="absolute left-[10px] bottom-[-20px] text-red-500 text-xs">{{ errors[0] }}</span>
                <fa class="absolute right-2 top-[11px] cursor-pointer text-base text-gray-600" :icon="['fas', `${confirmPwdType === false ? 'eye-slash' : 'eye'}`]" @click="changePwdInputType('confirmPwd')" />
              </div>
            </ValidationProvider>
          </div>
          <div class="flex justify-center">
            <button
              type="submit"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
              class="duration-500 mt-[79px] mb-[66px] w-[236px] py-[17px] rounded-[10px] shadow-md text-white text-[18px] tracking-widest bg-[#c4c4c4] hover:shadow-inner disabled:cursor-not-allowed disabled:opacity-80"
              :disabled="invalid"
              :class="{ 'bg-gradient-to-r': !invalid, 'from-[#FF6D3F]': !invalid, 'to-[#FA5936]': !invalid }"
            >
              儲存
            </button>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </section>
</template>
<script>
export default {
  name: "member-password",
  data() {
    return {
      memberPwd: {
        oldPwd: "",
        newPwd: "",
        confirmPwd: "",
      },
      oldPwdType: false,
      newPwdType: false,
      confirmPwdType: false,
    };
  },
  methods: {
    changePwdInputType(targetInput) {
      switch (targetInput) {
        case "oldPwd":
          this.oldPwdType = !this.oldPwdType;
          const oldPwdInput = document.querySelector("#oldPwdId");
          this.oldPwdType === true ? (oldPwdInput.type = "text") : (oldPwdInput.type = "password");
          break;
        case "newPwd":
          this.newPwdType = !this.newPwdType;
          const newPwdInput = document.querySelector("#newPwdId");
          this.newPwdType === true ? (newPwdInput.type = "text") : (newPwdInput.type = "password");
          break;
        case "confirmPwd":
          this.confirmPwdType = !this.confirmPwdType;
          const confirmPwdInput = document.querySelector("#confirmPwdId");
          this.confirmPwdType === true ? (confirmPwdInput.type = "text") : (confirmPwdInput.type = "password");
          break;
      }
    },
    handleChangePwd() {
      this.$swal.fire({
        icon: "success",
        title: "會員資料已修改",
        timer: 1200,
        showConfirmButton: false,
      });
    },
  },
};
</script>
