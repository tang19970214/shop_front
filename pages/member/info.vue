<template>
  <section class="w-full lg:px-[50px]">
    <h2 class="text-[18px] mb-[16px] font-bold tracking-[0.105em]">修改會員資料</h2>
    <div class="w-full rounded-xl pb-[24px] lg:p-10 lg:pb-[24px] border-none lg:border-[1px] lg:border-[#a3a3a3] lg:border-solid">
      <ValidationObserver ref="form">
        <label class="form-label tracking-[0.105em] text-[18px] inline-block mb-2 text-gray-700" for="accountId">姓名<span class="text-[#FA5936]">*</span></label>
        <div class="form-group relative pb-6">
          <ValidationProvider name="姓名" rules="required" v-slot="{ errors }" class="w-full">
            <input id="accountId" type="text" class="form-control w-full lg:w-1/2 px-3 py-1.5 text-gray-700 border-[1px] border-[#a3a3a3] rounded-[10px] transition ease-in-out focus:text-gray-700 focus:border-blue-600 focus:outline-none" :class="{ 'border-[#EF4444]': errors.length > 0 }" placeholder="請輸姓名" v-model="profile.name" />
            <span v-if="errors.length > 0" class="absolute left-0 bottom-1 text-red-500 text-xs">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <label class="form-label tracking-[0.105em] text-[18px] inline-block mb-2 text-gray-700" for="phoneId">手機號碼<span class="text-[#FA5936]">*</span></label>
        <div class="form-group relative pb-6">
          <ValidationProvider name="手機號碼" rules="required" v-slot="{ errors }" class="w-full">
            <input id="phoneId" type="tel" class="form-control w-full lg:w-1/2 px-3 py-1.5 text-gray-700 border-[1px] border-[#a3a3a3] rounded-[10px] transition ease-in-out focus:text-gray-700 focus:border-blue-600 focus:outline-none" :class="{ 'border-[#EF4444]': errors.length > 0 }" placeholder="請輸手機號碼" v-model="profile.phone" />
            <span v-if="errors.length > 0" class="absolute left-0 bottom-1 text-red-500 text-xs">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <label class="form-label tracking-[0.105em] text-[18px] inline-block mb-2 text-gray-700" for="emailId">Email<span class="text-[#FA5936]">*</span></label>
        <div class="form-group relative pb-6">
          <ValidationProvider name="email" rules="required" v-slot="{ errors }" class="w-full">
            <input id="emailId" type="email" class="form-control w-full lg:w-1/2 px-3 py-1.5 text-gray-700 border-[1px] border-[#a3a3a3] rounded-[10px] transition ease-in-out focus:text-gray-700 focus:border-blue-600 focus:outline-none" :class="{ 'border-[#EF4444]': errors.length > 0 }" placeholder="請輸Email" v-model="profile.email" />
            <span v-if="errors.length > 0" class="absolute left-0 bottom-1 text-red-500 text-xs">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <label class="form-label tracking-[0.105em] text-[18px] inline-block mb-2 text-gray-700" for="birthdayId">生日</label>
        <div class="form-group relative pb-6">
          <ValidationProvider name="生日" rules="required" v-slot="{ errors }" class="w-full">
            <input id="birthdayId" type="date" lang="fr-CA" class="form-control w-full lg:w-1/2 px-3 py-1.5 text-gray-700 border-[1px] border-[#a3a3a3] rounded-[10px] transition ease-in-out focus:text-gray-700 focus:border-blue-600 focus:outline-none" :class="{ 'border-[#EF4444]': errors.length > 0 }" v-model="profile.birthday" />
            <span v-if="errors.length > 0" class="absolute left-0 bottom-1 text-red-500 text-xs">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <label class="form-label tracking-[0.105em] text-[18px] inline-block mb-2 text-gray-700" for="addressId">取貨地點</label>
        <div class="form-group relative pb-6">
          <ValidationProvider name="取貨地點" rules="required" v-slot="{ errors }" class="w-full">
            <input id="addressId" type="text" class="form-control w-full lg:w-1/2 px-3 py-1.5 text-gray-700 border-[1px] border-[#a3a3a3] rounded-[10px] transition ease-in-out focus:text-gray-700 focus:border-blue-600 focus:outline-none" :class="{ 'border-[#EF4444]': errors.length > 0 }" v-model="profile.address" />
            <span v-if="errors.length > 0" class="absolute left-0 bottom-1 text-red-500 text-xs">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <p class="text-[18px] mb-[7px]">連結帳號</p>
        <div class="space-y-[7px]">
          <div class="w-full lg:w-1/2 px-[17px] flex justify-between border-[1px] border-solid border-[#9A9999] rounded-[10px]">
            <div class="flex items-center space-x-[9px] my-[9px]">
              <img src="../../static/images/icon/facebook.svg" alt="Facebook" width="24px" />
              <p class="text-[18px]">Facebook</p>
            </div>
            <a href="#" class="duration-150 h-100 flex items-center pl-[17px] text-[18px] border-l-[1px] border-[#9A9999] hover:text-red-500">解除連結</a>
          </div>
          <div class="w-full lg:w-1/2 px-[17px] flex justify-between border-[1px] border-solid border-[#9A9999] rounded-[10px]">
            <div class="flex items-center space-x-[9px] my-[9px]">
              <img src="../../static/images/icon/google.svg" alt="Google" width="24px" />
              <p class="text-[18px]">Google</p>
            </div>
            <a href="#" class="duration-150 h-100 flex items-center pl-[17px] text-[18px] border-l-[1px] border-[#9A9999] hover:text-red-500">解除連結</a>
          </div>
          <div class="w-full lg:w-1/2 px-[17px] flex justify-between border-[1px] border-solid border-[#9A9999] rounded-[10px]">
            <div class="flex items-center space-x-[9px] my-[9px]">
              <img src="../../static/images/icon/line.svg" alt="Line" width="24px" />
              <p class="text-[18px]">Line</p>
            </div>
            <a href="#" class="duration-150 h-100 flex items-center pl-[17px] text-[18px] border-l-[1px] border-[#9A9999] hover:text-red-500">解除連結</a>
          </div>
        </div>
        <div class="flex justify-center">
          <button type="submit" data-mdb-ripple="true" data-mdb-ripple-color="light" class="mt-[62px] duration-150 w-[236px] py-[17px] rounded-[10px] shadow-md text-white text-[18px] tracking-widest bg-gradient-to-r from-[#FF6D3F] to-[#FA5936] hover:shadow-inner disabled:cursor-not-allowed disabled:opacity-80" @click="handleSave()">儲存</button>
        </div>
      </ValidationObserver>
    </div>
  </section>
</template>
<script>
export default {
  name: "member-info",
  props: {
    profile: {
      type: Object,
    },
  },
  data() {
    return {
      member: {
        name: "",
        phone: "",
        email: "",
        birthday: "",
        address: "",
      },
    };
  },
  methods: {
    handleSave() {
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
